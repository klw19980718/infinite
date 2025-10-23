'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabaseClient } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import OtpForm from '@/components/auth/OtpForm'

export default function AuthPage() {
  const router = useRouter()
  const [email, setEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [signingOut, setSigningOut] = useState(false)

  useEffect(() => {
    const supabase = getSupabaseClient()

    // 获取当前会话
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setEmail(session?.user?.email ?? null)
      setLoading(false)
    }

    checkSession()

    // 监听认证状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user?.email ?? null)
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const handleSignOut = async () => {
    setSigningOut(true)
    try {
      const supabase = getSupabaseClient()
      await supabase.auth.signOut()
      router.refresh()
    } catch (error) {
      console.error('Sign out error:', error)
    } finally {
      setSigningOut(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    )
  }

  // 已登录态
  if (email) {
    const avatarChar = email.charAt(0).toUpperCase()

    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-card border rounded-lg p-8 shadow-sm">
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                    {avatarChar}
                  </AvatarFallback>
                </Avatar>
              </div>
              <h1 className="text-2xl font-bold mb-2">You're signed in</h1>
              <p className="text-muted-foreground">{email}</p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => router.push('/')}
                variant="outline"
                className="w-full"
              >
                Go to Home
              </Button>
              <Button
                onClick={handleSignOut}
                disabled={signingOut}
                variant="destructive"
                className="w-full"
              >
                {signingOut ? 'Signing out...' : 'Sign out'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 未登录态 - 显示登录表单
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card border rounded-lg p-8 shadow-sm">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">Welcome to Infinite Talk</h1>
            <p className="text-muted-foreground">
              Sign in or create an account with your email
            </p>
          </div>

          <OtpForm />

          <div className="mt-6 text-center">
            <Button
              onClick={() => router.push('/')}
              variant="ghost"
              size="sm"
            >
              ← Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

