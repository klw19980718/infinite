'use client'

import Link from 'next/link'
import Image from 'next/image'
import { getSupabaseClient } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import LoginDialog from '@/components/auth/LoginDialog'
import UserMenu from '@/components/auth/UserMenu'

type Profile = {
  email: string | null
}

export default function Nav() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loginDialogOpen, setLoginDialogOpen] = useState(false)

  useEffect(() => {
    const supabase = getSupabaseClient()
    
    // 获取当前会话
    supabase.auth.getSession().then(({ data: { session } }) => {
      const email = session?.user?.email ?? session?.user?.user_metadata?.email ?? null
      setProfile(email ? { email } : null)
    })

    // 监听认证状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const email = session?.user?.email ?? session?.user?.user_metadata?.email ?? null
      setProfile(email ? { email } : null)
    })
    
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <nav className="w-full h-16 border-b flex items-center justify-between px-4">
      <Link href="/" className="flex items-center gap-2">
        <Image 
          src="/logo.png" 
          alt="Infinite Talk AI" 
          width={32} 
          height={32}
          className="rounded-lg"
        />
        <span className="font-semibold">Infinite Talk AI</span>
      </Link>
      
      <div className="flex items-center gap-3">
        {profile?.email ? (
          <UserMenu email={profile.email} />
        ) : (
          <Button onClick={() => setLoginDialogOpen(true)} variant="default">
            Log in
          </Button>
        )}
      </div>

      <LoginDialog 
        open={loginDialogOpen} 
        onOpenChange={setLoginDialogOpen} 
      />
    </nav>
  )
}


