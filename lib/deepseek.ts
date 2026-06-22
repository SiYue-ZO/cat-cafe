/** DeepSeek API 调用封装（通过 nginx 代理，无需前端传 Key） */

const API_URL = '/api/chat';
const MODEL = 'deepseek-v4-flash';

const SYSTEM_PROMPT = `你是"喵星咖啡"的店长小助手，一个热情、可爱、专业的AI助手。你的职责是：
1. 回答关于猫咪的问题（品种、性格、护理等）
2. 介绍咖啡和饮品菜单
3. 帮助用户了解预约流程
4. 推荐适合的猫咪和饮品搭配
请用温馨可爱的语气回答，适当使用猫咪相关的表情符号。回答要简洁有趣。`;

export interface DeepSeekMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

/** 流式调用 DeepSeek API（通过 nginx 代理） */
export async function streamDeepSeek(
  messages: DeepSeekMessage[],
  onChunk: (text: string) => void,
  onDone: () => void,
  onError: (error: string) => void,
  signal?: AbortSignal
): Promise<void> {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
        stream: true,
      }),
      signal,
    });

    if (!response.ok) {
      if (response.status === 401) {
        onError('API Key 无效，请检查 nginx 配置');
        return;
      }
      if (response.status === 402) {
        onError('API 余额不足，请充值后重试');
        return;
      }
      if (response.status === 429) {
        onError('请求过于频繁，请稍后再试');
        return;
      }
      onError(`请求失败：${response.status}`);
      return;
    }

    const reader = response.body?.getReader();
    if (!reader) {
      onError('无法读取响应流');
      return;
    }

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith('data: ')) continue;
        const data = trimmed.slice(6);
        if (data === '[DONE]') {
          onDone();
          return;
        }
        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) {
            onChunk(content);
          }
        } catch {
          // skip invalid JSON
        }
      }
    }
    onDone();
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      onDone();
      return;
    }
    onError(err instanceof Error ? err.message : '网络错误，请检查网络连接');
  }
}
