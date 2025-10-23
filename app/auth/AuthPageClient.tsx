'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { FcGoogle } from 'react-icons/fc'
import { getSupabaseClient } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import OtpForm from '@/components/auth/OtpForm'

export default function AuthPageClient() {
  const router = useRouter()
  const [email, setEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [signingOut, setSigningOut] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

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

  // Google OAuth 登录
  const handleGoogleLogin = async () => {
    setGoogleLoading(true)
    try {
      const supabase = getSupabaseClient()
      const siteUrl = typeof window !== 'undefined' 
        ? window.location.origin 
        : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
      
      // 从 URL 参数获取重定向目标，默认为首页
      const urlParams = new URLSearchParams(window.location.search)
      const redirectPath = urlParams.get('redirect') || '/'
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${siteUrl}${redirectPath}`,
        },
      })

      if (error) {
        console.error('Google login error:', error)
        setGoogleLoading(false)
      }
    } catch (err) {
      console.error('Google login error:', err)
      setGoogleLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    )
  }

  // 已登录态
  if (email) {
    const avatarChar = email.charAt(0).toUpperCase()

    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-background">
        <div className="w-full max-w-md">
          <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                    {avatarChar}
                  </AvatarFallback>
                </Avatar>
              </div>
              <h1 className="text-2xl font-bold mb-2 text-card-foreground">You're signed in</h1>
              <p className="text-muted-foreground">{email}</p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => router.push('/')}
                variant="outline"
                className="w-full h-11 rounded-xl"
              >
                Go to Home
              </Button>
              <Button
                onClick={handleSignOut}
                disabled={signingOut}
                variant="destructive"
                className="w-full h-11 rounded-xl"
              >
                {signingOut ? 'Signing out...' : 'Sign out'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 未登录态 - 显示登录表单（与 LoginDialog 保持一致）
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-gradient-to-br from-background to-secondary/20">
      <div className="w-full max-w-[440px]">
        <div className="bg-gradient-to-br from-card to-card/80 border border-border/50 rounded-3xl p-0 overflow-hidden shadow-2xl">
          {/* Header with gradient background */}
          <div className="relative px-8 pt-8 pb-6 bg-gradient-to-r from-primary/10 via-chart-2/10 to-chart-3/10">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-2xl ring-2 ring-white/10">
                <Image 
                  src="/logo.png" 
                  alt="Infinite Talk" 
                  width={80} 
                  height={80}
                  className="object-cover"
                />
              </div>
            </div>

            {/* Heading */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-card-foreground">
                Welcome Back
              </h1>
              <p className="text-muted-foreground text-base">
                Sign in to continue to your account
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 pb-8">
            {/* Google OAuth Button */}
            <Button
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="w-full h-12 rounded-2xl font-semibold bg-white text-neutral-900 hover:bg-neutral-100 transition-all duration-200 shadow-lg hover:shadow-xl"
              aria-label="Continue with Google"
            >
              <FcGoogle className="w-6 h-6 mr-3" />
              {googleLoading ? 'Connecting...' : 'Continue with Google'}
            </Button>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-gradient-to-br from-card to-card/80 px-4 text-muted-foreground font-medium">OR</span>
              </div>
            </div>

            {/* Email OTP Form */}
            <OtpForm 
              onSuccess={() => setEmailSent(true)}
              emailSent={emailSent}
              onBackToEmail={() => setEmailSent(false)}
            />

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-border/50">
              <p className="text-center text-xs text-muted-foreground leading-tight whitespace-nowrap">
                By continuing, you agree to our{' '}
                <a href="/terms" className="text-primary hover:text-primary/80 transition-colors underline">
                  Terms
                </a>{' '}
                and{' '}
                <a href="/privacy" className="text-primary hover:text-primary/80 transition-colors underline">
                  Privacy Policy
                </a>
              </p>
            </div>

            {/* Back to Home Link */}
            <div className="mt-6 text-center">
              <Button
                onClick={() => router.push('/')}
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
