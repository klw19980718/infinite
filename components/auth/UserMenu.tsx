"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getSupabaseClient } from "@/lib/supabase"

interface UserMenuProps {
  email: string | null
}

export default function UserMenu({ email }: UserMenuProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserAvatar = async () => {
      try {
        const supabase = getSupabaseClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          // Try avatar_url from user_metadata first
          const url = user.user_metadata?.avatar_url || user.user_metadata?.avatar || null
          setAvatarUrl(url)
        }
      } catch (error) {
        console.error("Error fetching user avatar:", error)
      }
    }

    fetchUserAvatar()

    // Listen for auth state changes
    const supabase = getSupabaseClient()
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const url = session.user.user_metadata?.avatar_url || session.user.user_metadata?.avatar || null
        setAvatarUrl(url)
      } else {
        setAvatarUrl(null)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const avatarChar = email?.charAt(0)?.toUpperCase() || "?"

  const handleSignOut = async () => {
    setLoading(true)
    try {
      const supabase = getSupabaseClient()
      await supabase.auth.signOut()
      router.push("/")
      router.refresh()
    } catch (error) {
      console.error("Sign out error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="relative h-10 w-10 rounded-full bg-primary/10 dark:bg-primary/20 text-primary hover:bg-primary/20 dark:hover:bg-primary/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-[#7A7FEE] focus:ring-offset-2 focus:ring-offset-background shadow-sm dark:shadow-md hover:shadow-md dark:hover:shadow-lg"
          aria-label="User menu"
        >
          <Avatar className="h-10 w-10 border-2 border-primary/20 dark:border-primary/30">
            <AvatarImage src={avatarUrl || undefined} alt={email || "User"} />
            <AvatarFallback className="bg-primary/10 dark:bg-primary/20 text-primary font-semibold">{avatarChar}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent 
        align="end" 
        className="w-56 rounded-2xl bg-card dark:bg-[#4a4a4a] border border-border dark:border-[#5a5a5a] shadow-lg dark:shadow-xl p-2"
      >
        <DropdownMenuLabel className="px-3 py-2.5">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-semibold text-foreground">My Account</p>
            {email && <p className="text-xs text-muted-foreground dark:text-muted-foreground/80 truncate">{email}</p>}
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-border dark:bg-[#5a5a5a] my-2" />

        <DropdownMenuItem 
          onClick={() => router.push("/profile")} 
          className="cursor-pointer rounded-xl px-3 py-2.5 text-sm font-medium text-foreground hover:bg-accent/10 dark:hover:bg-[#5a5a5a] focus:bg-accent/10 dark:focus:bg-[#5a5a5a] transition-colors duration-200"
        >
          Profile
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-border dark:bg-[#5a5a5a] my-2" />

        <DropdownMenuItem
          onClick={handleSignOut}
          disabled={loading}
          className="cursor-pointer rounded-xl px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 dark:hover:bg-destructive/20 focus:bg-destructive/10 dark:focus:bg-destructive/20 focus:text-destructive transition-colors duration-200"
        >
          {loading ? "Signing out..." : "Sign out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
