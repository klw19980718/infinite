'use client'

import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import OtpForm from './OtpForm'
import { getSupabaseClient } from '@/lib/supabase'

interface LoginDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
  const [emailSent, setEmailSent] = useState(false)

  // 监听认证状态变化，登录成功后自动关闭弹窗
  useEffect(() => {
    const supabase = getSupabaseClient()
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        onOpenChange(false)
        setEmailSent(false)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [onOpenChange])

  // 弹窗关闭时重置状态
  useEffect(() => {
    if (!open) {
      // 延迟重置，避免用户看到状态变化
      const timer = setTimeout(() => setEmailSent(false), 300)
      return () => clearTimeout(timer)
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {emailSent ? 'Check your email' : 'Sign in to Infinite Talk'}
          </DialogTitle>
          <DialogDescription>
            {emailSent 
              ? 'We sent you a login link. Check your email to continue.'
              : 'Enter your email to receive a magic link for password-free sign in.'
            }
          </DialogDescription>
        </DialogHeader>
        
        <OtpForm 
          onSuccess={() => setEmailSent(true)}
        />
      </DialogContent>
    </Dialog>
  )
}

