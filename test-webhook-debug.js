// 测试 webhook 并查看详细错误
// 使用方式:
//   node test-webhook-debug.js <真实用户UUID> [计划ID]
// 例如: node test-webhook-debug.js 123e4567-e89b-12d3-a456-426614174000 pro

const testWebhookDebug = async () => {
  console.log('🧪 测试 webhook 并查看详细错误...\n')

  // 从命令行参数获取真实的用户 ID (UUID)
  const userId = process.argv[2]
  const planId = process.argv[3] || 'pro'

  if (!userId) {
    console.error('❌ 错误: 请提供真实的用户 UUID')
    console.log('')
    console.log('📖 使用方式:')
    console.log('   node test-webhook-debug.js <用户UUID> [计划ID]')
    console.log('')
    console.log('📋 示例:')
    console.log('   node test-webhook-debug.js 123e4567-e89b-12d3-a456-426614174000 pro')
    console.log('')
    console.log('💡 获取用户 UUID 的方法:')
    console.log('   1. 在浏览器中登录应用')
    console.log('   2. 打开浏览器开发者工具 (F12)')
    console.log('   3. 在 Console 中运行:')
    console.log('      window.localStorage.getItem("sb-<project>-auth-token")')
    console.log('   4. 从返回的 JSON 中查找 user.id')
    console.log('   或者访问 Supabase Dashboard → Authentication → Users')
    process.exit(1)
  }

  // 验证 UUID 格式
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  if (!uuidRegex.test(userId)) {
    console.error('❌ 错误: 用户 ID 必须是有效的 UUID 格式')
    console.log('   当前值:', userId)
    console.log('   格式示例: 123e4567-e89b-12d3-a456-426614174000')
    process.exit(1)
  }

  // 模拟真实的 Creem webhook 数据
  const webhookData = {
    id: "evt_test_debug_" + Date.now(),
    eventType: "checkout.completed",
    created_at: Date.now(),
    object: {
      id: "ch_test_debug_" + Date.now(),
      object: "checkout",
      request_id: "req_test_debug_" + Date.now(),
      metadata: {
        user_id: userId, // 使用真实的用户 UUID
        user_email: `user-${userId.slice(0, 8)}@example.com`, // 模拟邮箱
        plan_id: planId
      },
      order: {
        object: "order",
        id: "ord_test_debug",
        customer: "cust_test_debug",
        product: "prod_2PMZ9cp6UtAcGCL5GwDmh0",
        amount: 2990,
        currency: "USD"
      }
    }
  }

  try {
    console.log('📤 发送 webhook 请求...')
    console.log('   事件类型:', webhookData.eventType)
    console.log('   用户ID:', webhookData.object.metadata.user_id)
    console.log('   计划:', webhookData.object.metadata.plan_id)
    console.log('')
    
    const response = await fetch('http://localhost:3000/api/creem/webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-creem-signature': 'test-signature'
      },
      body: JSON.stringify(webhookData)
    })
    
    const responseText = await response.text()
    let data
    try {
      data = JSON.parse(responseText)
    } catch {
      data = { raw: responseText }
    }
    
    console.log('📥 响应状态:', response.status)
    console.log('📦 响应内容:')
    console.log(JSON.stringify(data, null, 2))
    console.log('')
    
    if (response.status === 200) {
      console.log('✅ Webhook 处理成功！')
    } else {
      console.log('❌ Webhook 处理失败')
      console.log('')
      console.log('🔍 可能的原因:')
      if (data.message?.includes('environment')) {
        console.log('   - 缺少环境变量配置')
        console.log('   - 请检查 .env.local 文件')
        console.log('   - 确保配置了 NEXT_PUBLIC_SUPABASE_URL 和 SUPABASE_SERVICE_ROLE_KEY')
      } else if (data.message?.includes('connection')) {
        console.log('   - 数据库连接失败')
        console.log('   - 请检查 Supabase 配置是否正确')
      } else if (data.error) {
        console.log('   - 错误:', data.error)
      }
    }

    console.log('')
    console.log('💡 提示:')
    console.log('   1. 查看开发服务器的控制台日志获取详细错误信息')
    console.log('   2. 确保环境变量已正确配置')
    console.log('   3. 确保 Supabase 数据库连接正常')
    console.log('   4. 检查 add_user_credits RPC 函数是否存在')

  } catch (error) {
    console.error('❌ 请求失败:', error.message)
    console.log('')
    console.log('💡 请确保开发服务器正在运行: npm run dev')
  }
}

// 等待服务器启动
setTimeout(testWebhookDebug, 2000)
