'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getSupabaseClient } from '@/lib/supabase'
import { useEffect, useState } from 'react'

type Profile = {
  email: string | null
}

export default function Nav() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    const supabase = getSupabaseClient()
    supabase.auth.getUser().then(({ data }) => {
      const email = data.user?.email ?? data.user?.user_metadata?.email ?? null
      setProfile({ email })
    })

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const email = session?.user?.email ?? session?.user?.user_metadata?.email ?? null
      setProfile(email ? { email } : null)
    })
    return () => { sub?.subscription.unsubscribe() }
  }, [])

  const avatarChar = profile?.email?.charAt(0)?.toUpperCase()

  return (
    <nav className="w-full h-16 border-b flex items-center justify-between px-4">
      <Link href="/" className="font-semibold">Infinite Talk AI</Link>
      <div className="flex items-center gap-3">
       
      </div>
    </nav>
  )
}


