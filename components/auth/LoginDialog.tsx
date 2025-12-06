'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { FcGoogle } from 'react-icons/fc'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import OtpForm from './OtpForm'
import { getSupabaseClient } from '@/lib/supabase'
import { Button } from '@/components/ui/button'

interface LoginDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
  const [emailSent, setEmailSent] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  // 监听认证状态变化，登录成功后自动关闭弹窗
  useEffect(() => {
    const supabase = getSupabaseClient()
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        onOpenChange(false)
        setEmailSent(false)
        setGoogleLoading(false)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [onOpenChange])

  // 弹窗关闭时重置状态
  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => {
        setEmailSent(false)
        setGoogleLoading(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [open])

  // Google OAuth 登录
  const handleGoogleLogin = async () => {
    setGoogleLoading(true)
    try {
      const supabase = getSupabaseClient()
      const siteUrl = typeof window !== 'undefined' 
        ? window.location.origin 
        : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
      
      // 获取当前页面路径，登录后跳转回原页面
      const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/'
      const redirectTo = currentPath === '/auth' ? '/' : currentPath
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${siteUrl}${redirectTo}`,
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] lg:max-w-[1000px] bg-card dark:bg-[#3a3a3a] p-0 overflow-hidden rounded-3xl border border-border dark:border-[#5a5a5a] shadow-2xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
        <DialogHeader className="sr-only">
          <DialogTitle>Sign in to Infinite Talk</DialogTitle>
        </DialogHeader>
        
        {/* 左右布局：PC端 */}
        <div className="flex flex-col lg:flex-row">
          {/* 左侧：SVG 图片区域 */}
          <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8 lg:p-12 bg-primary dark:bg-primary">
            <div className="relative w-full max-w-md aspect-square">
              <Image
                src="/svg/auth.svg"
                alt="Authentication illustration"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* 右侧：表单区域 */}
          <div className="w-full lg:w-1/2 p-6 md:p-8 lg:p-10 flex flex-col">
            {/* Header */}
            <div className="mb-6 md:mb-8">
              <div className="flex justify-center mb-6">
                <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden shadow-md ring-2 ring-border flex flex-col justify-center">
                  <Image 
                    src="/logo-new.png" 
                    alt="Infinite Talk" 
                    width={80} 
                    height={80}
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="text-center space-y-2">
                <h2 id="auth_login_title" className="text-2xl md:text-3xl font-bold text-foreground">
                  Welcome Back
                </h2>
                <p className="text-sm md:text-base text-muted-foreground">
                  Sign in to continue to your account
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col">
              {/* Google OAuth Button */}
              <Button
                onClick={handleGoogleLogin}
                disabled={googleLoading}
                className="w-full h-12 rounded-2xl font-semibold bg-card dark:bg-[#4a4a4a] border border-border dark:border-[#5a5a5a] hover:bg-accent/10 dark:hover:bg-[#5a5a5a] hover:border-primary/50 dark:hover:border-[#7A7FEE] dark:focus:ring-[#7A7FEE] transition-all duration-200 shadow-md dark:shadow-lg hover:shadow-lg dark:hover:shadow-xl"
                aria-label="Continue with Google"
              >
                <FcGoogle className="w-5 h-5 md:w-6 md:h-6 mr-3" />
                <span className="text-foreground font-semibold">{googleLoading ? 'Connecting...' : 'Continue with Google'}</span>
              </Button>

              {/* Divider */}
              <div className="relative my-6 md:my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-card dark:bg-[#3a3a3a] px-4 text-muted-foreground font-medium">OR</span>
                </div>
              </div>

              {/* Email OTP Form */}
              <div className="flex-1">
                <OtpForm 
                  onSuccess={() => setEmailSent(true)}
                  emailSent={emailSent}
                  onBackToEmail={() => setEmailSent(false)}
                />
              </div>

              {/* Footer */}
              <div className="mt-6 md:mt-8 pt-6 border-t border-border dark:border-[#5a5a5a]">
                <p className="text-center text-xs text-muted-foreground leading-relaxed">
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
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

