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
      <DialogContent className="sm:max-w-[440px] bg-gradient-to-br from-neutral-950 to-neutral-900 border border-neutral-800/50 p-0 overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>Sign in to Infinite Talk</DialogTitle>
        </DialogHeader>
        
        {/* Header with gradient background */}
        <div className="relative px-8 pt-8 pb-6 bg-gradient-to-r from-primary/10 via-chart-2/10 to-chart-3/10">
          {/* Logo */}
          <div className="flex justify-center mb-6 ">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-2xl ring-2 ring-white/10 flex flex-col justify-center">
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
            <h2 id="auth_login_title" className="text-3xl font-bold text-white">
              Welcome Back
            </h2>
            <p className="text-neutral-300 text-base">
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
              <div className="w-full border-t border-neutral-700/50" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-gradient-to-br from-neutral-950 to-neutral-900 px-4 text-neutral-400 font-medium">OR</span>
            </div>
          </div>

          {/* Email OTP Form */}
          <OtpForm 
            onSuccess={() => setEmailSent(true)}
            emailSent={emailSent}
            onBackToEmail={() => setEmailSent(false)}
          />

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-neutral-800/50">
            <p className="text-center text-xs text-neutral-400 leading-tight whitespace-nowrap">
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
      </DialogContent>
    </Dialog>
  )
}

