# 环境变量配置指南

## 必需的环境变量

创建 `.env.local` 文件并添加以下配置：

```bash
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Creem 配置
CREEM_API_KEY=your_creem_api_key
CREEM_WEBHOOK_SECRET=your_creem_webhook_secret
CREEM_PRODUCT_PRO_ID=prod_2PMZ9cp6UtAcGCL5GwDmh0
CREEM_PRODUCT_ULTIMATE_ID=prod_2PMZ9cp6UtAcGCL5GwDmh1
CREEM_PRODUCT_ENTERPRISE_ID=prod_2PMZ9cp6UtAcGCL5GwDmh2

# 站点配置
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 获取 Supabase 配置

1. 访问 [Supabase Dashboard](https://supabase.com/dashboard)
2. 选择你的项目
3. 进入 Settings → API
4. 复制以下值：
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role secret** → `SUPABASE_SERVICE_ROLE_KEY`

## 获取 Creem 配置

1. 访问 [Creem Dashboard](https://creem.io/dashboard)
2. 进入 API Keys 页面
3. 复制 **API Key** → `CREEM_API_KEY`
4. 进入 Webhooks 页面
5. 复制 **Signing Secret** → `CREEM_WEBHOOK_SECRET`
6. 复制产品 ID → `CREEM_PRODUCT_*_ID`

## 验证配置

运行以下命令验证配置：

```bash
# 检查环境变量
node -e "console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ 已配置' : '❌ 未配置')"
node -e "console.log('Service Key:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ 已配置' : '❌ 未配置')"
node -e "console.log('Creem API Key:', process.env.CREEM_API_KEY ? '✅ 已配置' : '❌ 未配置')"
```

## 注意事项

- ⚠️ **不要** 将 `.env.local` 文件提交到 Git
- 🔒 **service_role** 密钥具有管理员权限，仅用于服务端
- 🌐 **anon** 密钥可以安全地在客户端使用
- 🔄 修改环境变量后需要重启开发服务器
