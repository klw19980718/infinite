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
          className="relative h-10 w-10 rounded-full bg-accent text-accent-foreground hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
          aria-label="User menu"
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src={avatarUrl || undefined} alt={email || "User"} />
            <AvatarFallback className="bg-accent text-accent-foreground font-semibold">{avatarChar}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">My Account</p>
            {email && <p className="text-xs text-muted-foreground truncate">{email}</p>}
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => router.push("/profile")} className="cursor-pointer">
          Profile
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleSignOut}
          disabled={loading}
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          {loading ? "Signing out..." : "Sign out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
