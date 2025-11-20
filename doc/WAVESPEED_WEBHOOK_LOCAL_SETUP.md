# WaveSpeed Webhook 本地测试指南

## 概述

WaveSpeed 在任务完成或失败时会通过 Webhook 回调通知你的服务器。在本地开发环境下，需要使用 ngrok 等工具暴露本地服务器，让 WaveSpeed 能够访问。

## 重要信息

1. **Webhook URL**: WaveSpeed 会在任务提交时接收 webhook URL 作为参数
2. **本地开发**: 需要使用 ngrok 等工具暴露本地服务器
3. **签名验证**: 使用 `WAVESPEED_WEBHOOK_SECRET` 进行 HMAC-SHA256 签名验证

## 设置步骤

### 1. 安装 ngrok

```bash
# Windows (使用 Chocolatey)
choco install ngrok

# 或从官网下载: https://ngrok.com/download
# macOS (使用 Homebrew)
brew install ngrok

# Linux
# 下载并解压: https://ngrok.com/download
```

### 2. 启动本地开发服务器

```bash
npm run dev
```

确保服务器运行在 `http://localhost:3000`（或你配置的其他端口）。

### 3. 启动 ngrok

在新的终端窗口中运行：

```bash
ngrok http 3000
```

ngrok 会显示类似这样的输出：

```
Forwarding    https://abc123.ngrok.io -> http://localhost:3000

Session Status                online
Account                       your-email@example.com
Version                       3.x.x
Region                        United States (us)
Latency                       45ms
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://abc123.ngrok.io -> http://localhost:3000

Connections                   ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

**重要**: 复制 `Forwarding` 行中的 HTTPS URL（例如: `https://abc123.ngrok.io`）

### 4. 配置环境变量

在 `.env.local` 文件中添加 `NGROK_DEV_URL`（推荐）或更新 `NEXT_PUBLIC_SITE_URL`：

**推荐方式（使用 NGROK_DEV_URL）**:
```bash
# 使用 ngrok 提供的 URL（优先使用，仅用于开发环境）
NGROK_DEV_URL=https://abc123.ngrok.io

# WaveSpeed 配置
WAVESPEED_KEY=your_wavespeed_api_key
WAVESPEED_WEBHOOK_SECRET=your_webhook_secret  # 从 WaveSpeed Dashboard 获取

# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# 站点配置（生产环境使用）
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**备选方式（直接使用 NEXT_PUBLIC_SITE_URL）**:
```bash
# 直接使用 ngrok URL（不推荐，会影响生产环境配置）
NEXT_PUBLIC_SITE_URL=https://abc123.ngrok.io
```

**重要**: 
- **优先使用 `NGROK_DEV_URL`**：这样可以在开发环境使用 ngrok URL，而生产环境继续使用 `NEXT_PUBLIC_SITE_URL`
- 修改 `.env.local` 后，需要**重启 Next.js 开发服务器**才能生效
- 每次 ngrok 重启后，URL 会改变（免费版），需要重新更新 `NGROK_DEV_URL` 并重启服务器

### 5. 获取 WaveSpeed Webhook Secret

1. 登录 [WaveSpeed Dashboard](https://wavespeed.ai/dashboard)（如果有的话）
2. 找到 Webhook 配置部分
3. 复制 **Webhook Signing Secret**
4. 添加到 `.env.local` 的 `WAVESPEED_WEBHOOK_SECRET`

**注意**: 如果 WaveSpeed 没有提供独立的 webhook secret，可能需要使用 API key 的一部分，或者暂时在开发环境跳过签名验证。

### 6. 测试流程

#### 6.1 完整测试流程

1. **确保所有服务运行**:
   - ✅ Next.js 开发服务器 (`npm run dev`)
   - ✅ ngrok 隧道 (`ngrok http 3000`)
   - ✅ 环境变量已更新并重启服务器

2. **提交视频生成任务**:
   - 访问 `http://localhost:3000/infinite-talk-ai/image-to-video`
   - 上传图片和音频
   - 点击 "Generate" 提交任务

3. **观察 Webhook 接收**:
   - 查看开发服务器控制台，应该能看到 webhook 请求日志
   - 查看 ngrok Web Interface (`http://127.0.0.1:4040`) 可以看到所有请求详情

4. **验证数据库更新**:
   - 在 Supabase Dashboard 中查看 `video_tasks` 表
   - 任务状态应该从 `processing` 变为 `completed` 或 `failed`
   - `webhook_events` 表中应该有新记录

5. **验证前端实时更新**:
   - 打开个人中心页面 (`http://localhost:3000/profile`)
   - 任务状态应该自动更新（通过 Supabase Realtime），无需刷新页面

#### 6.2 手动测试 Webhook（调试用）

如果 WaveSpeed 任务还没完成，你可以手动触发 webhook 来测试：

```bash
# 使用 curl
curl -X POST "https://abc123.ngrok.io/api/video/webhook?task_id=YOUR_TASK_UUID" \
  -H "Content-Type: application/json" \
  -H "webhook-id: test-event-123" \
  -H "webhook-timestamp: $(date +%s)" \
  -H "webhook-signature: v3,test-signature" \
  -d '{
    "id": "test-event-123",
    "status": "completed",
    "outputs": ["https://example.com/video.mp4"]
  }'
```

**注意**: 如果启用了签名验证，需要生成正确的签名。开发环境下可以暂时注释掉签名验证代码。

## Webhook 签名验证

WaveSpeed 使用 HMAC-SHA256 签名验证 webhook 请求：

**签名格式**: `v3,{signature}`

**签名内容**: `{webhook-id}.{webhook-timestamp}.{raw_body}`

**验证逻辑** (已在 `app/api/video/webhook/route.ts` 中实现):

```typescript
const signedContent = `${id}.${timestamp}.${payload}`
const expectedSignature = crypto
  .createHmac('sha256', secret)
  .update(signedContent)
  .digest('hex')
```

**开发环境**: 如果 `WAVESPEED_WEBHOOK_SECRET` 未设置，会跳过签名验证（仅警告日志）。

## 常见问题

### Q: ngrok 免费版有限制吗？

A: 免费版每次重启会生成新的 URL，需要：
1. 更新 `.env.local` 中的 `NGROK_DEV_URL`（或 `NEXT_PUBLIC_SITE_URL`）
2. 重启 Next.js 开发服务器

付费版可以固定域名，更方便开发。

**提示**: 使用 `NGROK_DEV_URL` 的好处是，你可以在开发环境使用 ngrok URL，而生产环境的 `NEXT_PUBLIC_SITE_URL` 保持不变。

### Q: Webhook 仍然收不到？

A: 检查清单：
1. ✅ ngrok 是否正在运行（查看终端输出）
2. ✅ Next.js 服务器是否在运行
3. ✅ `NGROK_DEV_URL` 或 `NEXT_PUBLIC_SITE_URL` 是否已更新为最新的 ngrok URL
4. ✅ 是否已重启 Next.js 服务器（环境变量变更需要重启）
5. ✅ 查看 ngrok Web Interface (`http://127.0.0.1:4040`) 确认请求是否到达
6. ✅ 查看开发服务器控制台是否有错误日志
7. ✅ 检查 webhook URL 是否正确构建（查看开发服务器日志中的 webhook URL）

### Q: 如何查看 ngrok 请求详情？

A: 访问 `http://127.0.0.1:4040`（ngrok Web Interface），可以看到：
- 所有请求的详细信息
- 请求头、请求体、响应等
- 重放请求功能（用于调试）

### Q: 如何在不使用 ngrok 的情况下测试？

A: 可以手动触发 webhook：

1. **使用 Postman/Insomnia**: 
   - URL: `http://localhost:3000/api/video/webhook?task_id=YOUR_TASK_UUID`
   - Method: POST
   - Headers: 添加必要的 webhook headers
   - Body: 模拟 WaveSpeed webhook payload

2. **使用 curl** (见上面的手动测试部分)

3. **暂时禁用签名验证**: 在 `app/api/video/webhook/route.ts` 中注释掉签名验证代码

### Q: 任务提交后，webhook URL 是什么格式？

A: Webhook URL 格式为：
```
{NEXT_PUBLIC_SITE_URL}/api/video/webhook?task_id={task_id}
```

例如：
```
https://abc123.ngrok.io/api/video/webhook?task_id=550e8400-e29b-41d4-a716-446655440000
```

这个 URL 会在 `app/api/video/image-to-video/route.ts` 中自动构建并传递给 WaveSpeed API。

### Q: 如何确认 Realtime 是否工作？

A: 
1. 打开个人中心页面
2. 在 Supabase Dashboard 中手动更新某个任务的状态：
   ```sql
   UPDATE video_tasks 
   SET status = 'completed', output_video_url = 'https://example.com/test.mp4'
   WHERE id = 'your-task-id';
   ```
3. 如果前端页面自动更新（无需刷新），说明 Realtime 工作正常

## 参考链接

- [ngrok 官网](https://ngrok.com/)
- [ngrok 文档](https://ngrok.com/docs)
- [WaveSpeed API 文档](https://wavespeed.ai/docs)
- [Supabase Realtime 文档](https://supabase.com/docs/guides/realtime)

