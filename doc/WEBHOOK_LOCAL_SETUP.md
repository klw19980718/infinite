# Webhook 本地测试指南

## 问题：Creem 无法访问 localhost

`http://localhost:3000` 是本地地址，Creem 的服务器无法直接访问。需要使用公网隧道工具来暴露本地服务器。

## 解决方案

### 方案 1: 使用 ngrok (推荐)

1. **安装 ngrok**
   ```bash
   # Windows (使用 Chocolatey)
   choco install ngrok
   
   # 或下载: https://ngrok.com/download
   ```

2. **启动本地开发服务器**
   ```bash
   npm run dev
   ```

3. **启动 ngrok**
   ```bash
   ngrok http 3000
   ```

4. **配置 Creem Webhook**
   - 复制 ngrok 提供的 URL，例如: `https://abc123.ngrok.io`
   - 在 Creem Dashboard → Webhooks 中设置:
     - Webhook URL: `https://abc123.ngrok.io/api/creem/webhook`
     - Events: `checkout.completed`

5. **测试**
   - 完成支付后，Creem 会通过 ngrok 转发请求到你的本地服务器
   - 查看开发服务器控制台日志确认 webhook 是否成功

### 方案 2: 使用 Cloudflare Tunnel

```bash
# 安装 cloudflared
# Windows: 下载 https://github.com/cloudflare/cloudflared/releases

# 启动隧道
cloudflared tunnel --url http://localhost:3000
```

### 方案 3: 使用 localtunnel

```bash
# 安装
npm install -g localtunnel

# 启动
lt --port 3000
```

## 测试 Webhook

### 方法 1: 使用测试脚本（推荐）

1. **获取真实用户 UUID**
   ```bash
   node get-users.js
   ```

2. **测试 webhook**
   ```bash
   node test-webhook-debug.js <用户UUID> pro
   ```

### 方法 2: 使用 Creem Dashboard

1. 在 Creem Dashboard → Webhooks 中
2. 找到失败的 webhook 事件
3. 点击 "Resend" 按钮重新发送

### 方法 3: 手动触发

使用 curl 或 Postman 发送 POST 请求:

```bash
curl -X POST http://localhost:3000/api/creem/webhook \
  -H "Content-Type: application/json" \
  -H "x-creem-signature: test-signature" \
  -d '{
    "id": "evt_test",
    "eventType": "checkout.completed",
    "created_at": 1234567890,
    "object": {
      "id": "ch_test",
      "metadata": {
        "user_id": "你的用户UUID",
        "plan_id": "pro"
      },
      "order": {
        "id": "ord_test",
        "product": "prod_2PMZ9cp6UtAcGCL5GwDmh0",
        "amount": 2990
      }
    }
  }'
```

## 验证 Webhook 是否工作

1. **检查开发服务器日志**
   - 应该看到 "🔔 Webhook endpoint called" 日志
   - 检查是否有错误信息

2. **检查 Supabase 数据库**
   - `user_info` 表中的 `credits` 字段应该增加
   - `credit_ledger` 表中应该有新记录
   - `orders` 表中应该有订单记录
   - `payments` 表中应该有支付记录

3. **检查 Creem Dashboard**
   - Webhook 状态应该显示为 "Success" (绿色)
   - 不应该再有 500 错误

## 常见问题

### Q: ngrok 免费版有限制吗？
A: 免费版每次重启会生成新的 URL，需要重新配置 Creem webhook。

### Q: 如何获取真实的用户 UUID？
A: 
- 方法 1: 运行 `node get-users.js`
- 方法 2: 在 Supabase Dashboard → Authentication → Users 中查看
- 方法 3: 在浏览器控制台运行:
  ```javascript
  localStorage.getItem('sb-<project>-auth-token')
  ```

### Q: 测试时提示 "invalid input syntax for type uuid"？
A: 确保使用真实的 UUID 格式，而不是 "test-user-id" 这样的字符串。

### Q: Webhook 仍然返回 500 错误？
A: 检查:
1. 环境变量是否配置正确
2. Supabase 数据库连接是否正常
3. `add_user_credits` RPC 函数是否存在
4. 用户 UUID 是否有效
5. 查看开发服务器控制台的详细错误日志
