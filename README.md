# 喵星咖啡 - 猫咖预约网站 🐱☕

《Web前端开发技术课程设计》实训项目，一个温馨可爱的猫咖预约网站。用户可以浏览猫咪信息、预约撸猫、点单咖啡饮品、参与限时秒杀活动、留言互动，还有 AI 助手为你答疑解惑。

>该仓库仅用于交付作业使用

## 技术栈

| 类别 | 技术方案 | 说明 |
|------|---------|------|
| 框架 | Next.js 16 (App Router) | React 全栈框架 |
| 语言 | TypeScript | 严格模式 |
| 样式 | Tailwind CSS 4 | 原子化 CSS |
| 状态管理 | React Context + Hooks | 轻量级 |
| 数据持久化 | localStorage | 纯前端，无后端 |
| 图标 | Lucide React | 轻量图标库 |
| AI 能力 | DeepSeek API | 流式输出聊天 |
| 包管理器 | pnpm | 高效包管理 |
| 部署 | GitHub Pages | 静态导出 |

## 功能模块

### 1. 登录注册
- 注册：用户名、密码、确认密码、手机号、邮箱
- 登录：用户名 + 密码
- 正则表达式校验所有输入字段
- 数据存入 localStorage，登录状态全局管理

### 2. 导航栏
- 5 个一级菜单：首页、咖啡信息、猫咪信息、个人中心、留言板
- 二级菜单（猫咪品种分类、咖啡分类）
- AI 助手入口 + 购物车角标
- 当前页面高亮，未登录/已登录状态切换

### 3. 首页轮播图
- 自动播放（4秒间隔），左右箭头手动切换
- 底部指示器圆点，鼠标悬停暂停
- CSS transition 平滑过渡动画

### 4. 猫咪信息与预约
- 卡片式网格布局展示所有猫咪
- 动态路由详情页 `/cats/[id]`
- 预约功能：选择日期 + 时间段
- 预约确认弹窗，数据持久化

### 5. 咖啡/商品信息与点单
- 网格布局 + 分类筛选（全部/咖啡/饮品/甜点）
- 商品详情页 `/menu/[id]`
- 数量选择器 + 加入购物车
- 购物车：数量修改、删除、总价计算

### 6. 限时秒杀
- 首页秒杀展示区 + 秒杀活动页
- 倒计时精确到秒（天:时:分:秒）
- 京东风格红色主题设计
- 秒杀状态：未开始 / 进行中 / 已结束

### 7. 图片放大镜
- 鼠标移入图片，右侧显示放大浮层
- 跟随鼠标位置，2.5x 放大倍数
- 集成在猫咪详情页和商品详情页

### 8. 留言板
- 留言列表展示（头像、昵称、时间、内容）
- 登录后才能留言
- 数据持久化，刷新后保留

### 9. AI 助手（DeepSeek）
- 聊天式交互界面，流式输出逐字显示
- API Key 设置弹窗 + 安全提示
- 聊天历史持久化，支持新建/删除会话
- 系统提示词：猫咖店长小助手人设

## 项目结构

```
cat-cafe/
├── app/                    # 页面路由
│   ├── layout.tsx          # 全局布局
│   ├── page.tsx            # 首页
│   ├── login/              # 登录页
│   ├── register/           # 注册页
│   ├── cats/               # 猫咪列表 + 详情
│   ├── menu/               # 商品列表 + 详情
│   ├── seckill/            # 秒杀活动页
│   ├── messages/           # 留言板
│   ├── profile/            # 个人中心
│   ├── cart/               # 购物车
│   └── ai/                 # AI 助手页
├── components/             # 组件
│   ├── layout/             # Navbar + Footer
│   ├── ui/                 # 通用 UI 组件
│   ├── home/               # 首页组件
│   ├── cats/               # 猫咪相关组件
│   ├── menu/               # 商品相关组件
│   ├── seckill/            # 秒杀组件
│   ├── zoom/               # 图片放大镜
│   ├── auth/               # 登录注册表单
│   ├── messages/           # 留言组件
│   └── ai/                 # AI 聊天组件
├── lib/                    # 工具库
│   ├── data.ts             # 模拟数据
│   ├── utils.ts            # 工具函数
│   ├── validators.ts       # 正则校验
│   ├── storage.ts          # localStorage 封装
│   └── deepseek.ts         # DeepSeek API 封装
├── context/                # React Context
│   ├── AuthContext.tsx      # 用户认证
│   ├── CartContext.tsx      # 购物车
│   └── AIContext.tsx        # AI 助手
├── hooks/                  # 自定义 Hooks
├── types/                  # TypeScript 类型定义
└── .github/workflows/      # GitHub Actions 部署
```

## 快速开始

### 环境要求

- Node.js 18+
- pnpm

### 安装与运行

```bash
# 克隆项目
git clone https://github.com/YOUR_USERNAME/cat-cafe.git
cd cat-cafe

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

打开 http://localhost:3000 查看效果。

### 构建与部署

```bash
# 生产构建（自动静态导出到 out/ 目录）
pnpm build
```

构建产物在 `out/` 目录，可直接部署到 GitHub Pages。

项目已配置 GitHub Actions 自动部署，推送到 `main` 分支即可自动构建部署。

## UI 设计

- **配色**：琥珀色主色调 + 紫色点缀 + 粉色强调，温馨可爱风格
- **圆角**：卡片 `rounded-2xl`，按钮 `rounded-xl`
- **阴影**：卡片 `shadow-md`，悬浮 `shadow-xl`
- **动效**：hover 缩放、平滑过渡
- **响应式**：适配移动端 / 平板 / 桌面

## 许可证

MIT License
