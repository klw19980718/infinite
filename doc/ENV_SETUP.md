# 环境变量配置指南

## Supabase 开发模式设置

Supabase 提供了两种开发模式：

### 方式 1: 使用本地开发环境（推荐）

使用 Supabase CLI 在本地运行完整的 Supabase 服务栈，包括 PostgreSQL、Auth、Storage、Realtime 等。

#### 1. 安装 Supabase CLI

```bash
# 方式 1: 使用 npx（推荐）
npx supabase --help

# 方式 2: 安装为项目依赖
npm install supabase --save-dev
```

#### 2. 初始化本地项目

```bash
# 在项目根目录初始化
supabase init
```

这会在项目根目录创建 `supabase/` 文件夹，包含：
- `config.toml` - 配置文件
- `migrations/` - 数据库迁移文件
- `seed.sql` - 种子数据（可选）

#### 3. 启动本地 Supabase 服务

```bash
# 启动所有服务（首次运行会下载 Docker 镜像）
supabase start
```

启动后会显示以下信息：
```
Started supabase local development setup.

API URL: http://localhost:54321
DB URL: postgresql://postgres:postgres@localhost:54322/postgres
Studio URL: http://localhost:54323
Inbucket URL: http://localhost:54324
anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### 4. 配置本地环境变量

创建 `.env.local` 文件并添加：

```bash
# Supabase 本地开发配置
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... # 从 supabase start 输出复制
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... # 从 supabase start 输出复制

# Creem 配置
CREEM_API_KEY=your_creem_api_key
CREEM_WEBHOOK_SECRET=your_creem_webhook_secret
CREEM_PRODUCT_PRO_ID=prod_xxx
CREEM_PRODUCT_ULTIMATE_ID=prod_xxx
CREEM_PRODUCT_ENTERPRISE_ID=prod_xxx

# 站点配置
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

#### 5. 查看本地服务状态

```bash
# 查看服务状态和连接信息
supabase status

# 导出为环境变量格式
supabase status -o env

# JSON 格式
supabase status -o json
```

#### 6. 常用本地开发命令

```bash
# 停止本地服务（不删除数据）
supabase stop

# 重置本地数据库（应用所有迁移）
supabase db reset

# 应用数据库迁移
supabase migration up

# 创建新迁移文件
supabase migration new migration_name

# 生成 TypeScript 类型
supabase gen types typescript --local > types/database.ts
```

### 方式 2: 使用远程开发项目

使用 Supabase 云端托管的开发项目。

#### 1. 获取 Supabase 配置

1. 访问 [Supabase Dashboard](https://supabase.com/dashboard)
2. 创建或选择开发项目
3. 进入 **Settings** → **API**
4. 复制以下值：
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role secret** → `SUPABASE_SERVICE_ROLE_KEY`

#### 2. 配置环境变量

创建 `.env.local` 文件并添加：

```bash
# Supabase 远程开发项目配置
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Creem 配置
CREEM_API_KEY=your_creem_api_key
CREEM_WEBHOOK_SECRET=your_creem_webhook_secret
CREEM_PRODUCT_PRO_ID=prod_xxx
CREEM_PRODUCT_ULTIMATE_ID=prod_xxx
CREEM_PRODUCT_ENTERPRISE_ID=prod_xxx

# 站点配置
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 获取 Creem 配置

1. 访问 [Creem Dashboard](https://creem.io/dashboard)
2. 进入 API Keys 页面
3. 复制 **API Key** → `CREEM_API_KEY`
4. 进入 Webhooks 页面
5. 复制 **Signing Secret** → `CREEM_WEBHOOK_SECRET`
6. 复制产品 ID → `CREEM_PRODUCT_*_ID`

## 链接远程项目（可选）

如果你使用本地开发环境，但想要与远程项目同步：

```bash
# 1. 登录 Supabase CLI
supabase login

# 2. 链接远程项目
supabase link --project-ref <project-id>

# 3. 拉取远程数据库结构
supabase db pull

# 4. 推送本地迁移到远程
supabase db push
```

## 验证配置

运行以下命令验证配置：

```bash
# 检查环境变量
node -e "console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ 已配置' : '❌ 未配置')"
node -e "console.log('Service Key:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ 已配置' : '❌ 未配置')"
node -e "console.log('Creem API Key:', process.env.CREEM_API_KEY ? '✅ 已配置' : '❌ 未配置')"
```

## 访问 Supabase Studio

- **本地开发**: http://localhost:54323
- **远程项目**: https://supabase.com/dashboard/project/<project-id>

在 Studio 中你可以：
- 管理数据库表和数据
- 查看 API 文档
- 管理认证用户
- 配置存储桶
- 查看实时日志

## 注意事项

- ⚠️ **不要** 将 `.env.local` 文件提交到 Git
- 🔒 **service_role** 密钥具有管理员权限，仅用于服务端
- 🌐 **anon** 密钥可以安全地在客户端使用
- 🔄 修改环境变量后需要重启开发服务器
- 🐳 **本地开发需要 Docker**：确保已安装 Docker Desktop
- 💾 **推荐使用本地开发**：可以离线工作，更快迭代
