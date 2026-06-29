'use client';

import { useState } from 'react';
import { BookOpen, X, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';

interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
}

const sections: Section[] = [
  {
    id: 'overview',
    title: '项目概述',
    content: (
      <div className="space-y-2">
        <p>《Web前端开发技术课程设计》实训项目 — <strong>猫咖预约网站</strong></p>
        <p>技术栈：Next.js 16 + TypeScript + Tailwind CSS 4 + React Context</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-1 pr-2">类别</th>
                <th className="text-left py-1">技术</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              <tr className="border-b border-gray-100"><td className="py-1 pr-2">框架</td><td>Next.js 16 App Router</td></tr>
              <tr className="border-b border-gray-100"><td className="py-1 pr-2">语言</td><td>TypeScript 严格模式</td></tr>
              <tr className="border-b border-gray-100"><td className="py-1 pr-2">样式</td><td>Tailwind CSS 4</td></tr>
              <tr className="border-b border-gray-100"><td className="py-1 pr-2">状态</td><td>React Context + Hooks</td></tr>
              <tr className="border-b border-gray-100"><td className="py-1 pr-2">存储</td><td>localStorage</td></tr>
              <tr className="border-b border-gray-100"><td className="py-1 pr-2">AI</td><td>DeepSeek API</td></tr>
              <tr><td className="py-1 pr-2">部署</td><td>Nginx + GitHub Actions</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    id: 'task1',
    title: '任务一：登录注册',
    content: (
      <div className="space-y-2">
        <p className="font-medium text-amber-700">正则校验（validators.ts）：</p>
        <ul className="text-xs space-y-1 ml-3 list-disc">
          <li>用户名：<code>/^\w{'{4,16}'}/</code> → 4~16位字母/数字/下划线</li>
          <li>密码：<code>/^(?=.*[a-zA-Z])(?=.*\d).{'{6,}'}$/</code> → ≥6位含字母和数字</li>
          <li>手机号：<code>/^1[3-9]\d{'{9}'}$/</code> → 1开头11位</li>
          <li>邮箱：<code>/^[\w.-]+@[\w.-]+\.\w+$/</code></li>
        </ul>
        <p className="font-medium text-amber-700">角色系统：</p>
        <ul className="text-xs space-y-1 ml-3 list-disc">
          <li>注册时可选"普通用户"或"管理员"角色</li>
          <li>预设账号：<code>demo/demo123</code>（用户）、<code>admin/admin123</code>（管理员）</li>
          <li>AuthContext 全局管理登录状态</li>
          <li>校验不通过：红色边框 + 红色背景提示</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'task2',
    title: '任务二：菜单栏',
    content: (
      <div className="space-y-2">
        <p className="font-medium text-amber-700">5个一级菜单：</p>
        <ul className="text-xs space-y-1 ml-3 list-disc">
          <li>首页 / 咖啡信息 / 猫咪信息 / 留言板 / 个人中心</li>
        </ul>
        <p className="font-medium text-amber-700">二级菜单：</p>
        <ul className="text-xs space-y-1 ml-3 list-disc">
          <li>咖啡信息 → 全部/咖啡/饮品/甜品</li>
          <li>猫咪信息 → 全部/橘猫/布偶猫/英短</li>
        </ul>
        <p className="font-medium text-amber-700">交互：</p>
        <ul className="text-xs space-y-1 ml-3 list-disc">
          <li>桌面端 hover 下拉展开</li>
          <li>移动端折叠汉堡菜单</li>
          <li>当前页高亮显示</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'task3',
    title: '任务三：轮播图',
    content: (
      <div className="space-y-2">
        <ul className="text-xs space-y-1 ml-3 list-disc">
          <li><code>setInterval(next, 4000)</code> 每4秒自动切换</li>
          <li>鼠标悬停暂停，离开恢复</li>
          <li>左右箭头手动切换 + 底部圆点指示器</li>
          <li>CSS <code>translateX</code> + <code>transition</code> 平滑过渡</li>
          <li>5张轮播图数据</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'task4',
    title: '任务四：猫咪预约',
    content: (
      <div className="space-y-2">
        <ul className="text-xs space-y-1 ml-3 list-disc">
          <li>卡片式网格布局 + 搜索框（名字/品种）</li>
          <li>动态路由详情页 <code>/cats/[id]</code></li>
          <li>详情页集成图片放大镜</li>
          <li>预约：日期选择 + 时间段选择（3个时段）</li>
          <li>确认弹窗 → localStorage 持久化</li>
          <li>不可预约猫咪显示蒙层</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'task5',
    title: '任务五：咖啡点单',
    content: (
      <div className="space-y-2">
        <ul className="text-xs space-y-1 ml-3 list-disc">
          <li>搜索框（名称/标签）+ 分类筛选</li>
          <li>商品详情页 <code>/menu/[id]</code> + 图片放大镜</li>
          <li>秒杀商品：红色秒杀价+划线原价</li>
          <li>数量选择器 + 加入购物车</li>
          <li>购物车：增删改查 + 总价 + localStorage</li>
          <li>结算 → 确认弹窗 → 生成订单</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'task6',
    title: '任务六：限时秒杀',
    content: (
      <div className="space-y-2">
        <ul className="text-xs space-y-1 ml-3 list-disc">
          <li>首页秒杀展示区（3件商品 + 倒计时）</li>
          <li>独立秒杀活动页 <code>/seckill</code></li>
          <li>倒计时精确到秒，<code>setInterval</code> 每秒更新</li>
          <li>京东风格红色主题</li>
          <li>点击跳转商品详情页</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'task7',
    title: '任务七：图片放大',
    content: (
      <div className="space-y-2">
        <ul className="text-xs space-y-1 ml-3 list-disc">
          <li><code>onMouseMove</code> 获取鼠标位置百分比</li>
          <li>CSS <code>backgroundSize</code>(2.5x) + <code>backgroundPosition</code></li>
          <li>仅大屏（lg 断点）显示，移动端隐藏</li>
          <li>集成在猫咪详情页和商品详情页</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'task8',
    title: '任务八：留言板',
    content: (
      <div className="space-y-2">
        <ul className="text-xs space-y-1 ml-3 list-disc">
          <li>textarea + 发表按钮，登录后可留言</li>
          <li>留言列表：头像、昵称、时间、内容</li>
          <li>localStorage 持久化</li>
          <li>空状态提示</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'innovation',
    title: '创新点',
    content: (
      <div className="space-y-3">
        <div>
          <p className="font-medium text-purple-700 flex items-center gap-1"><span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-500" /> AI 助手</p>
          <ul className="text-xs space-y-1 ml-3 list-disc">
            <li>DeepSeek API 集成，聊天式 AI 交互</li>
            <li>nginx 反向代理保护 API Key</li>
            <li>流式输出（SSE），打字机效果</li>
            <li>多会话管理 + 防抖持久化</li>
            <li>智能滚动 + 停止生成</li>
          </ul>
        </div>
        <div>
          <p className="font-medium text-purple-700 flex items-center gap-1"><span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-500" /> 管理员角色与管理后台</p>
          <ul className="text-xs space-y-1 ml-3 list-disc">
            <li>注册可选角色，管理员专属标识</li>
            <li>用户管理 + 预约管理（确认/取消）</li>
          </ul>
        </div>
        <div>
          <p className="font-medium text-purple-700 flex items-center gap-1"><span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-500" /> 完整订单系统</p>
          <ul className="text-xs space-y-1 ml-3 list-disc">
            <li>购物车结算 → 确认弹窗 → 生成订单</li>
            <li>个人中心订单列表</li>
          </ul>
        </div>
        <div>
          <p className="font-medium text-purple-700 flex items-center gap-1"><span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-500" /> 全站搜索 + 响应式 + 零动画库</p>
          <ul className="text-xs space-y-1 ml-3 list-disc">
            <li>猫咪/商品页搜索框，联合分类筛选</li>
            <li>桌面端/移动端自适应</li>
            <li>纯 CSS 实现轮播/放大镜/hover 动效</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 'demo',
    title: '演示流程',
    content: (
      <div className="space-y-2">
        <ol className="text-xs space-y-1.5 ml-3 list-decimal">
          <li><strong>首页</strong> → 轮播图自动播放 + 秒杀倒计时</li>
          <li><strong>猫咪信息</strong> → 搜索 → 详情 → 放大镜 → 预约</li>
          <li><strong>咖啡信息</strong> → 搜索 + 筛选 → 加购</li>
          <li><strong>购物车</strong> → 修改数量 → 结算 → 下单</li>
          <li><strong>限时秒杀</strong> → 倒计时 → 跳转详情</li>
          <li><strong>留言板</strong> → 登录后留言</li>
          <li><strong>AI 助手</strong> → 聊天 → 流式输出</li>
          <li><strong>个人中心</strong> → 预约 + 订单</li>
          <li><strong>管理员登录</strong> → 管理后台</li>
          <li><strong>注册</strong> → 角色选择 + 校验</li>
        </ol>
        <div className="mt-3 p-2 bg-amber-50 rounded-lg">
          <p className="text-xs font-medium text-amber-700 mb-1">预设账号</p>
          <p className="text-xs">普通用户：<code>demo / demo123</code></p>
          <p className="text-xs">管理员：<code>admin / admin123</code></p>
        </div>
      </div>
    ),
  },
];

export default function GuideSidebar() {
  const [open, setOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['overview']));

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const expandAll = () => {
    setExpandedSections(new Set(sections.map((s) => s.id)));
  };

  const collapseAll = () => {
    setExpandedSections(new Set());
  };

  return (
    <>
      {/* 打开按钮 - 固定在右侧 */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed right-0 top-1/2 -translate-y-1/2 z-50 bg-purple-600 text-white px-2 py-3 rounded-l-lg shadow-lg hover:bg-purple-700 transition-colors writing-mode-vertical"
          title="打开项目介绍"
        >
          <BookOpen size={16} className="mb-1" />
          <span className="text-xs" style={{ writingMode: 'vertical-rl' }}>演示指南</span>
        </button>
      )}

      {/* 侧边栏面板 */}
      {open && (
        <div className="fixed right-0 top-0 bottom-0 z-50 w-[380px] max-w-[90vw] bg-white shadow-2xl border-l border-gray-200 flex flex-col animate-slide-in-right">
          {/* 头部 */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-amber-50">
            <div className="flex items-center gap-2">
              <BookOpen size={18} className="text-purple-600" />
              <h2 className="font-bold text-gray-800">项目演示指南</h2>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={expandAll} className="text-xs text-purple-600 hover:text-purple-800">全部展开</button>
              <span className="text-gray-300">|</span>
              <button onClick={collapseAll} className="text-xs text-purple-600 hover:text-purple-800">全部折叠</button>
              <button onClick={() => setOpen(false)} className="p-1 text-gray-400 hover:text-gray-600 ml-1">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* 内容区 */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1">
            {sections.map((section) => (
              <div key={section.id} className="border border-gray-100 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection(section.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                    expandedSections.has(section.id)
                      ? 'bg-purple-50 text-purple-700'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {expandedSections.has(section.id) ? (
                    <ChevronDown size={14} className="shrink-0" />
                  ) : (
                    <ChevronRight size={14} className="shrink-0" />
                  )}
                  {section.title}
                  {section.id === 'innovation' && (
                    <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-600">创新</span>
                  )}
                  {section.id === 'demo' && (
                    <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-600">流程</span>
                  )}
                </button>
                {expandedSections.has(section.id) && (
                  <div className="px-3 py-2 text-sm text-gray-600 bg-gray-50/50 border-t border-gray-100">
                    {section.content}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 底部 */}
          <div className="px-4 py-2 border-t border-gray-200 bg-gray-50 text-center">
            <p className="text-xs text-gray-400">喵星咖啡 — Web前端开发技术课程设计</p>
          </div>
        </div>
      )}
    </>
  );
}
