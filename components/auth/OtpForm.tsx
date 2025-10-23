'use client'

import { useState } from 'react'
import { getSupabaseClient } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface OtpFormProps {
  onSuccess?: () => void
  redirectTo?: string
  emailSent?: boolean
  onBackToEmail?: () => void
}

export default function OtpForm({ onSuccess, redirectTo, emailSent, onBackToEmail }: OtpFormProps) {
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState<'email' | 'otp'>('email')

  // 发送 OTP 验证码
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const supabase = getSupabaseClient()
      const siteUrl = typeof window !== 'undefined' 
        ? window.location.origin 
        : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
      
      // 获取当前页面路径，登录后跳转回原页面
      const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/'
      const finalRedirectTo = redirectTo || (currentPath === '/auth' ? '/' : currentPath)
      
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${siteUrl}${finalRedirectTo}`,
        },
      })

      if (error) throw error

      setStep('otp')
      onSuccess?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // 验证 OTP 码
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const supabase = getSupabaseClient()
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'email',
      })

      if (error) throw error

      // 登录成功，父组件会处理状态更新
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid verification code. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // 返回邮箱输入步骤
  const handleBackToEmail = () => {
    setStep('email')
    setOtp('')
    setError(null)
    onBackToEmail?.()
  }

  // OTP 验证步骤
  if (step === 'otp') {
    return (
      <div>
        <form onSubmit={handleVerifyOtp}>
          <div>
            <Label htmlFor="otp" className="text-sm font-medium text-neutral-300">
              Enter  code
            </Label>
            <Input
              id="otp"
              type="text"
              placeholder="000000"
              value={otp}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 6)
                setOtp(value)
              }}
              required
              disabled={loading}
              autoComplete="one-time-code"
              className="h-14 rounded-2xl px-4 bg-neutral-800/50 text-white placeholder:text-neutral-500 border border-neutral-700 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-center text-2xl tracking-[0.5em] font-mono mt-6"
              autoFocus
              maxLength={6}
            />
          </div>

          {error && (
            <div className="text-sm text-red-400 bg-red-950/30 p-4 rounded-xl border border-red-900/50 mt-6">
              {error}
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full h-12 rounded-2xl font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl mt-6" 
            disabled={loading || otp.length !== 6}
            aria-label="Verify your code"
          >
            {loading ? 'Verifying…' : 'Verify code'}
          </Button>
        </form>

        <div className="text-center mt-8">
          <Button
            type="button"
            variant="ghost"
            onClick={handleBackToEmail}
            className="text-sm text-neutral-400 hover:text-neutral-200 transition-colors"
          >
            ← Back to email
          </Button>
        </div>
      </div>
    )
  }

  // 邮箱输入步骤
  return (
    <form onSubmit={handleSendOtp}>
      <div>
        <Label htmlFor="email" className="text-sm font-medium text-neutral-300">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          autoComplete="email"
          className="h-12 rounded-2xl px-4 bg-neutral-800/50 text-white placeholder:text-neutral-500 border border-neutral-700 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200 mt-3"
          autoFocus
        />
      </div>

      {error && (
        <div className="text-sm text-red-400 bg-red-950/30 p-4 rounded-xl border border-red-900/50 mt-3">
          {error}
        </div>
      )}

      <Button 
        type="submit" 
        className="w-full h-12 rounded-2xl font-semibold bg-neutral-800 text-white hover:bg-neutral-700 transition-all duration-200 shadow-lg hover:shadow-xl mt-3" 
        disabled={loading}
        aria-label="Send verification code to your email"
      >
        {loading ? 'Sending…' : 'Send verification code'}
      </Button>
    </form>
  )
}

