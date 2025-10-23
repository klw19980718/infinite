"use client"

import Link from "next/link"
import Image from "next/image"
import { getSupabaseClient } from "@/lib/supabase"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import LoginDialog from "@/components/auth/LoginDialog"
import UserMenu from "@/components/auth/UserMenu"

type Profile = {
  email: string | null
}

export default function Nav() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loginDialogOpen, setLoginDialogOpen] = useState(false)

  useEffect(() => {
    const supabase = getSupabaseClient()

    supabase.auth.getSession().then(({ data: { session } }) => {
      const email = session?.user?.email ?? session?.user?.user_metadata?.email ?? null
      setProfile(email ? { email } : null)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const email = session?.user?.email ?? session?.user?.user_metadata?.email ?? null
      setProfile(email ? { email } : null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 w-full h-16 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto h-full flex items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-accent/10 flex items-center justify-center">
              <Image src="/logo.png" alt="Infinite Talk AI" width={32} height={32} className="object-cover" />
            </div>
            <span className="font-semibold text-lg text-foreground">Infinite Talk AI</span>
          </Link>

          <div className="flex items-center gap-3">
            {profile?.email ? (
              <UserMenu email={profile.email} />
            ) : (
              <Button
                onClick={() => setLoginDialogOpen(true)}
                className="rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-200"
              >
                Log in
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from going under fixed nav */}
      <div className="h-16" />

      <LoginDialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen} />
    </>
  )
}
