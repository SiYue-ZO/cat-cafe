/** 工具函数 */

/** 格式化价格 */
export function formatPrice(price: number): string {
  return `¥${price.toFixed(2)}`;
}

/** 格式化时间 */
export function formatTime(dateStr: string): string {
  const d = new Date(dateStr);
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** 生成唯一 ID */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

/** 截取文本 */
export function truncate(text: string, maxLen: number): string {
  return text.length > maxLen ? text.slice(0, maxLen) + '...' : text;
}

/** 分类标签映射 */
export const categoryLabels: Record<string, string> = {
  coffee: '咖啡',
  dessert: '甜品',
  drink: '饮品',
};

/** 时间段选项 */
export const timeSlots = [
  '10:00-12:00',
  '14:00-16:00',
  '16:00-18:00',
];
