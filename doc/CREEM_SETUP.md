# Creem Payment Integration Setup

## 1. 创建 Creem 商品

在 Creem 仪表板 (https://creem.io/dashboard) 中创建以下商品：

### Pro Plan (400 Credits - $29.9)
- Name: "Pro Plan"
- Description: "400 credits for HD video generation"
- Price: $29.9
- Type: One-time payment

### Ultimate Plan (800 Credits - $49.9)  
- Name: "Ultimate Plan"
- Description: "800 credits for HD video generation"
- Price: $49.9
- Type: One-time payment

### Enterprise Plan (1800 Credits - $99.9)
- Name: "Enterprise Plan" 
- Description: "1800 credits for HD video generation"
- Price: $99.9
- Type: One-time payment

## 2. 环境变量配置

在 `.env.local` 文件中添加以下配置：

```bash
# Creem API Configuration
# 开发环境会自动使用测试 API (https://test-api.creem.io)
# 生产环境使用正式 API (https://api.creem.io)
CREEM_API_URL=https://api.creem.io
CREEM_API_KEY=creem_your_api_key_here
CREEM_WEBHOOK_SECRET=your_webhook_secret_here

# Product IDs from Creem dashboard
# 开发环境使用测试产品 ID，生产环境使用正式产品 ID
CREEM_PRODUCT_PRO_ID=prod_your_pro_product_id
CREEM_PRODUCT_ULTIMATE_ID=prod_your_ultimate_product_id  
CREEM_PRODUCT_ENTERPRISE_ID=prod_your_enterprise_product_id

# Site URL for success redirects
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 🔧 测试模式说明

- **开发环境** (`NODE_ENV=development`): 自动使用 `https://test-api.creem.io`
- **生产环境** (`NODE_ENV=production`): 使用 `https://api.creem.io`
- **测试产品**: 在 Creem 仪表板中创建测试产品，获取测试产品 ID
- **测试 API Key**: 使用 Creem 仪表板中的测试 API Key

## 3. Webhook 配置

### 3.1 在 Creem 仪表板中设置 Webhook

1. 登录 Creem 仪表板 (https://creem.io/dashboard)
2. 进入 **Settings** → **Webhooks**
3. 点击 **Add Webhook**
4. 配置以下信息：
   - **URL**: `https://yourdomain.com/api/creem/webhook`
   - **Events**: 选择 `checkout.completed`
   - **Secret**: 生成一个随机字符串作为 webhook secret

### 3.2 获取 Webhook Secret

**重要**: Webhook Secret 是在 Creem 仪表板中创建 webhook 时生成的，不是从其他地方获取的。

1. 在创建 webhook 时，Creem 会显示一个 **Secret** 字段
2. 你可以：
   - 使用 Creem 自动生成的 secret
   - 或者自己输入一个自定义的 secret（建议使用强随机字符串）
3. 将这个 secret 复制到你的环境变量 `CREEM_WEBHOOK_SECRET` 中

### 3.3 Webhook Secret 示例

```bash
# 示例 webhook secret（请使用你自己的）
CREEM_WEBHOOK_SECRET=whsec_1234567890abcdef1234567890abcdef
```

**注意**: 
- Webhook secret 用于验证 webhook 请求的真实性
- 如果不配置 webhook secret，系统会在开发模式下跳过验证
- 生产环境中强烈建议配置 webhook secret 以确保安全性

## 4. 数据库函数

已创建 `add_user_credits` 函数用于原子性更新用户积分。

## 5. API 路由

- `/api/creem/checkout` - 创建支付会话
- `/api/creem/webhook` - 处理支付成功事件

## 6. 支付流程

1. 用户在 pricing 页面点击购买按钮
2. 调用 `/api/creem/checkout` 创建支付会话
3. 重定向到 Creem 支付页面
4. 支付成功后，Creem 发送 webhook 到 `/api/creem/webhook`
5. Webhook 处理成功后，用户积分自动增加
6. 用户被重定向到 profile 页面

## 7. 测试

使用 Creem 的测试模式进行开发测试：
- 测试 API URL: `https://test-api.creem.io`
- 使用测试 API Key 和测试产品 ID
