# QuickMedCert - AI 医疗证书生成平台

一个基于 Next.js 15 + TypeScript + Tailwind CSS 的现代化 AI 医疗证书生成平台，集成了用户认证、博客系统、支付处理、AI 视频生成和 SEO 优化等核心功能。

## ✨ 功能特性

- 🚀 **Next.js 15** - 最新的 React 框架，支持 App Router
- 💎 **TypeScript** - 类型安全的开发体验
- 🎨 **Tailwind CSS** - 现代化的 CSS 框架，支持自定义主题
- 🔐 **Clerk 认证** - 完整的用户认证系统，支持 Google 登录
- 🌐 **全局状态管理** - 基于 Context API 的用户信息管理
- 📝 **博客系统** - 支持 Markdown 的博客功能，集成 CMS
- 💳 **支付集成** - PayPal 支付处理和用户积分系统
- 🤖 **AI 视频生成** - 支持文本生成视频和图片生成视频
- 🔍 **SEO 优化** - 自动生成 sitemap 和 meta 标签
- 📱 **响应式设计** - 移动端友好的界面设计
- 🎯 **组件化架构** - 基于 shadcn/ui 的可复用 UI 组件库
- 🎨 **多字体支持** - 集成多种字体（Fredoka、Inter、Nunito 等）

## 📁 项目结构

```
nest-template/
├── app/                        # Next.js App Router 目录
│   ├── globals.css            # 全局样式文件
│   ├── layout.tsx             # 根布局组件（集成认证、Toast、用户状态）
│   ├── page.tsx               # 首页组件
│   ├── sitemap.ts             # sitemap 导出文件
│   ├── not-found.tsx          # 404 页面
│   ├── favicon.ico            # 网站图标
│   ├── blog/                  # 博客相关页面
│   │   ├── page.tsx           # 博客列表页（支持 ISR）
│   │   └── [slug]/            # 动态博客文章页
│   ├── sign-in/               # 登录页面
│   ├── sign-up/               # 注册页面
│   ├── profile/               # 用户资料页
│   ├── payment/               # 支付相关页面
│   │   ├── success/           # 支付成功页面
│   │   └── failed/            # 支付失败页面
│   ├── terms/                 # 服务条款页
│   └── privacy/               # 隐私政策页
│
├── components/                 # 组件目录
│   ├── Navbar.tsx             # 响应式导航栏（集成用户积分显示）
│   ├── Footer.tsx             # 页脚组件（支持友情链接）
│   ├── PricingSection.tsx     # 价格展示组件（PayPal 支付集成）
│   ├── payment-status-modal.tsx # 支付状态弹窗
│   ├── ui/                    # shadcn/ui 组件库
│   │   ├── button.tsx         # 按钮组件
│   │   ├── dialog.tsx         # 对话框组件
│   │   ├── dropdown-menu.tsx  # 下拉菜单组件
│   │   ├── sheet.tsx          # 侧边栏组件
│   │   ├── toast.tsx          # Toast 通知组件
│   │   └── ...                # 其他 UI 组件
│   └── auth/                  # 认证相关组件
│       ├── auth-button.tsx    # 认证按钮
│       ├── clerk-provider.tsx # Clerk 认证提供者
│       ├── google-one-tap.tsx # Google One Tap 登录
│       └── user-profile-menu.tsx # 用户资料菜单
│
├── lib/                       # 工具库目录
│   ├── providers/             # 全局状态管理 ✨
│   │   ├── index.ts          # 统一导出文件
│   │   ├── UserProvider.tsx  # 用户信息Provider（自动同步、定时更新）
│   │   └── README.md         # Provider使用说明
│   ├── utils.ts              # 通用工具函数（cn 类名合并）
│   ├── api.ts                # 客户端 API 请求封装
│   ├── server-api.ts         # 服务端 API 请求封装
│   ├── seo-config.js         # SEO 配置（OpenGraph、Twitter 卡片）
│   └── sitemap.ts            # sitemap 生成逻辑
│
├── public/                    # 静态资源目录
│   ├── js/                    # 第三方脚本文件
│   │   ├── cy1.js            # 分析脚本
│   │   └── cy2.js            # 其他脚本
│   ├── og-img.png            # OpenGraph 图片
│   └── robots.txt            # 搜索引擎爬虫配置
│
├── package.json              # 项目依赖配置
├── tailwind.config.js        # Tailwind CSS 配置（自定义主题、字体）
├── next.config.ts            # Next.js 配置（图片域名、ISR）
├── tsconfig.json             # TypeScript 配置
├── components.json           # shadcn/ui 组件配置
└── README.md                 # 项目说明文档
```

## 🔧 核心文件说明

### 应用入口
- **`app/layout.tsx`** - 根布局，集成 Clerk 认证、Toast 通知、用户状态管理和 Google Analytics
- **`app/page.tsx`** - 网站首页，集成价格展示组件
- **`app/globals.css`** - 全局样式和 Tailwind CSS 配置，包含自定义 CSS 变量

### 组件系统
- **`components/Navbar.tsx`** - 响应式导航栏，集成用户认证、积分显示和移动端菜单
- **`components/Footer.tsx`** - 网站页脚，支持友情链接和联系信息
- **`components/PricingSection.tsx`** - 价格展示组件，集成 PayPal 支付功能
- **`components/ui/`** - 基于 shadcn/ui 的组件库，使用 Radix UI 和 Tailwind CSS

### 全局状态管理
- **`lib/providers/`** - 统一的状态管理目录
  - **`UserProvider.tsx`** - 用户信息全局管理，支持自动同步、定时更新和错误处理
  - **`index.ts`** - 统一导出所有 Providers 和 hooks
  - **`README.md`** - 详细的使用说明和扩展指南

### API 系统
- **`lib/api.ts`** - 客户端 API 请求封装，包含认证、用户、支付、视频生成等接口
- **`lib/server-api.ts`** - 服务端 API 请求封装，支持 ISR 和缓存
- **`lib/utils.ts`** - 通用工具函数，包含 `cn()` 类名合并函数

### 认证系统
- **`components/auth/clerk-provider.tsx`** - Clerk 认证提供者，自定义样式和配置
- **`components/auth/google-one-tap.tsx`** - Google One Tap 登录组件
- **`components/auth/user-profile-menu.tsx`** - 用户资料菜单组件
- 支持 Google 登录、用户状态同步和积分系统

### SEO 和配置
- **`lib/seo-config.js`** - SEO 元数据配置，包含 OpenGraph 和 Twitter 卡片
- **`lib/sitemap.ts`** - 自动生成 sitemap.xml 的逻辑
- **`next.config.ts`** - Next.js 配置，支持图片域名和 ISR
- **`tailwind.config.js`** - Tailwind CSS 配置，自定义主题、字体和颜色

## 🌐 全局状态管理特性

### UserProvider
提供全局用户信息管理功能：

```tsx
// 在任何组件中使用
import { useUserInfo } from '@/lib/providers';

function MyComponent() {
  const { userInfo, isLoadingUserInfo, refreshUserInfo } = useUserInfo();
  
  return (
    <div>
      <p>用户: {userInfo?.nickname}</p>
      <p>积分: {userInfo?.total_credits}</p>
      <p>免费额度: {userInfo?.free_limit}</p>
      <p>剩余额度: {userInfo?.remaining_limit}</p>
      <button onClick={refreshUserInfo}>刷新</button>
    </div>
  );
}
```

**特性：**
- ✅ 自动获取用户信息（登录后）
- ✅ 定时更新（每10秒）
- ✅ 错误处理和重试机制
- ✅ 登录状态变化时自动更新
- ✅ 全局共享，避免重复请求
- ✅ 完整的 TypeScript 类型支持
- ✅ 用户数据自动同步到后端
- ✅ Token 管理和验证

## 🚀 快速开始

### 环境要求
- Node.js 18.0 或更高版本
- npm / yarn / pnpm

### 安装依赖

```bash
# 使用 npm
npm install

# 使用 yarn
yarn install

# 使用 pnpm
pnpm install
```

### 环境配置

创建 `.env.local` 文件并配置必要的环境变量：

```bash
# Clerk 认证配置
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# 网站配置
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# API 配置（已内置，无需配置）
# API 基础地址: https://svc.seedancepro.com
# App ID: seedance
```

### 启动开发服务器

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看效果。

## 📝 主要技术栈

- **前端框架**: Next.js 15 (App Router)
- **开发语言**: TypeScript
- **样式框架**: Tailwind CSS 4.0
- **状态管理**: Context API + Custom Hooks
- **UI 组件**: Radix UI + shadcn/ui
- **用户认证**: Clerk (支持 Google 登录)
- **图标库**: Lucide React
- **内容渲染**: React Markdown + remark-gfm
- **支付处理**: PayPal API
- **AI 视频生成**: 火山引擎 API
- **字体**: Fredoka One, Inter, Nunito, Playfair Display
- **分析工具**: Google Analytics

## 🎨 自定义配置

### 主题配置
在 `tailwind.config.js` 中自定义颜色、字体和其他设计令牌：
- 自定义颜色主题（primary, secondary, accent 等）
- 多种字体支持（Fredoka, Inter, Nunito 等）
- 自定义阴影和动画效果

### SEO 配置
在 `lib/seo-config.js` 中修改网站的 meta 信息、OpenGraph 和 Twitter 卡片配置：
- 网站标题和描述
- OpenGraph 图片和元数据
- Twitter 卡片配置
- 结构化数据（JSON-LD）

### API 配置
- **客户端 API**: `lib/api.ts` - 包含认证、用户、支付、视频生成等接口
- **服务端 API**: `lib/server-api.ts` - 支持 ISR 和缓存的服务端接口
- **API 基础地址**: `https://svc.seedancepro.com`
- **App ID**: `seedance`

### 支付配置
在 `components/PricingSection.tsx` 中配置价格计划：
- Free 计划：免费使用
- Premium 计划：$1/月
- Ultimate 计划：$10/月
- 支持 PayPal 支付集成

### 添加新的 Provider
按照 `lib/providers/README.md` 中的说明添加新的全局状态管理功能。

### 组件扩展
使用 shadcn/ui CLI 添加新的 UI 组件：

```bash
npx shadcn@latest add [component-name]
```

## 📦 构建和部署

### 构建生产版本

```bash
npm run build
```

### 启动生产服务器

```bash
npm run start
```

### 部署到 Vercel

推荐使用 [Vercel Platform](https://vercel.com/new) 进行部署，它是 Next.js 的创建者提供的最佳部署平台。

查看 [Next.js 部署文档](https://nextjs.org/docs/app/building-your-application/deploying) 了解更多部署选项。

## 🔧 开发指南

### 项目特色功能

1. **AI 视频生成**
   - 支持文本生成视频（text2video）
   - 支持图片生成视频（img2video）
   - 集成火山引擎 API
   - 实时任务状态轮询

2. **用户积分系统**
   - 免费额度管理
   - 付费额度管理
   - 积分使用记录
   - 实时积分显示

3. **支付系统**
   - PayPal 支付集成
   - 订阅管理
   - 支付状态处理
   - 支付成功/失败页面

4. **博客系统**
   - 支持 ISR（增量静态再生）
   - 动态路由支持
   - CMS 集成
   - SEO 优化

### 开发注意事项

- 使用 TypeScript 进行类型安全开发
- 遵循 Next.js 15 App Router 最佳实践
- 使用 Tailwind CSS 进行样式开发
- 遵循 shadcn/ui 组件设计规范
- 使用 ESLint 进行代码质量检查

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改善这个项目！

## 📞 联系方式

- 邮箱：support@quickmedcert.com
- 网站：https://www.quickmedcert.com
