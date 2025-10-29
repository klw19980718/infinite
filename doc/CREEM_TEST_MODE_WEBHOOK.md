# Creem Test Mode Webhook 设置指南

## 概述

在 Creem Test Mode 下，webhook 的工作方式与生产环境相同，但需要特殊配置才能让 Creem 访问本地开发服务器。

## 重要信息

1. **Test Mode API Endpoint**: `https://test-api.creem.io`
2. **Webhook 配置**: Test Mode 有独立的 webhook 配置（在 Developer tab 中）
3. **本地开发**: 需要使用 ngrok 等工具暴露本地服务器

## 设置步骤

### 1. 激活 Test Mode

1. 登录 [Creem Dashboard](https://creem.io/dashboard)
2. 点击顶部导航栏的 **"test mode"** 按钮
3. 所有功能将切换到测试环境

### 2. 配置 Webhook URL（需要 ngrok）

#### 2.1 安装 ngrok

```bash
# Windows (使用 Chocolatey)
choco install ngrok

# 或从官网下载: https://ngrok.com/download
```

#### 2.2 启动 ngrok

```bash
# 确保本地开发服务器正在运行 (npm run dev)
# 然后启动 ngrok
ngrok http 3000
```

#### 2.3 复制 ngrok URL

ngrok 会显示类似这样的输出：
```
Forwarding    https://abc123.ngrok.io -> http://localhost:3000
```

#### 2.4 在 Creem Dashboard 中配置

1. 进入 Creem Dashboard → **Developer** tab
2. 找到 **Webhooks** 部分
3. 设置 **Webhook URL** 为: `https://<your-ngrok-url>/api/creem/webhook`
   - 例如: `https://abc123.ngrok.io/api/creem/webhook`
4. 复制 **Webhook Signing Secret** 并添加到 `.env.local`:
   ```
   CREEM_WEBHOOK_SECRET=your_webhook_signing_secret_here
   ```

### 3. 获取 Test Mode API Key

1. 在 Creem Dashboard → **Developer** tab
2. 复制 **Test Mode API Key**
3. 添加到 `.env.local`:
   ```
   CREEM_API_KEY=your_test_mode_api_key_here
   ```

### 4. 配置环境变量

确保 `.env.local` 包含：

```bash
# Creem Test Mode 配置
CREEM_API_KEY=your_test_mode_api_key
CREEM_WEBHOOK_SECRET=your_test_mode_webhook_secret
CREEM_PRODUCT_PRO_ID=prod_xxx
CREEM_PRODUCT_ULTIMATE_ID=prod_xxx
CREEM_PRODUCT_ENTERPRISE_ID=prod_xxx

# Supabase 配置（生产环境）
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# 站点配置
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Webhook 事件类型

Creem 支持多种 webhook 事件类型，包括：

- `checkout.session.completed` - 支付会话完成（可能也使用 `checkout.completed`）
- `payment_intent.succeeded` - 支付成功
- `customer.subscription.created` - 订阅创建
- `customer.subscription.updated影响的 - 订阅更新
- `customer.subscription.deleted` - 订阅取消

## Webhook 签名验证

Creem 使用 HMAC-SHA256 签名验证 webhook 请求：

```typescript
import crypto from "crypto"

function verifyCreemSignature(
  payload: string,
  signature: string,
  timestamp: string,
  secret: string
): boolean {
  const signedPayload = `${timestamp}.${payload}`
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(signedPayload)
    .digest("hex")
  return expectedSignature === signature
}
```

**注意**: 
- Header: `Creem-Signature` (不是 `x-creem-signature`)
- Header: `Creem-Timestamp`

## 测试流程

### 1. 启动本地服务器

```bash
npm run dev
```

保留这个终端窗口运行。

### 2. 在新终端启动 ngrok

```bash
ngrok http 3000
```

### 3. 更新 Creem Webhook URL

如果 ngrok URL 改变了，需要在 Creem Dashboard 中更新 webhook URL。

### 4. 进行测试支付

1. 访问 `http://localhost:3000/pricing`
2. 点击购买按钮
3. 使用测试卡号: `4242 4242 4242 4242`
4. 完成支付后，Creem 会通过 ngrok 发送 webhook 到你的本地服务器

### 5. 查看日志

- **开发服务器控制台**: 查看 webhook 接收和处理日志
- **Creem Dashboard**: 查看 webhook 发送状态

## 常见问题

### Q: ngrok 免费版有限制吗？

A: 免费版每次重启会生成新的 URL，需要重新配置 Creem webhook。付费版可以固定域名。

### Q: Webhook 仍然收不到？

A: 检查:
1. ngrok 是否正在运行
2. Creem webhook URL 是否正确
3. 本地服务器是否在运行
4. 防火墙是否阻止了连接

### Q: 如何在不使用 ngrok 的情况下测试？

A: 可以手动触发 webhook 或使用测试脚本 (`test-webhook-debug.js`)。

### Q: Test Mode 和生产环境的 webhook 配置分开吗？

A: 是的，Test Mode 有独立的 webhook 配置和 API keys。

## 参考链接

- [Creem Test Mode 文档](https://docs.creem.io/test-mode)
- [Creem Webhooks 文档](https://docs.creem.io/learn/webhooks/introduction)
- [ngrok 官网](https://ngrok.com/)

