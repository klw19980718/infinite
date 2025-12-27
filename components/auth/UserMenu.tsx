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
import { Coins } from "lucide-react"

interface UserMenuProps {
  email: string | null
}

export default function UserMenu({ email }: UserMenuProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [credits, setCredits] = useState<number | null>(null)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const supabase = getSupabaseClient()

    const fetchUserData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          setUserId(user.id)
          // Try avatar_url from user_metadata first
          const url = user.user_metadata?.avatar_url || user.user_metadata?.avatar || null
          setAvatarUrl(url)

          // Fetch user credits
          const { data: userInfo, error: userInfoError } = await supabase
            .from("user_info")
            .select("credits")
            .eq("user_id", user.id)
            .single()

          if (!userInfoError && userInfo) {
            setCredits(userInfo.credits || 0)
          } else {
            setCredits(0)
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }

    fetchUserData()

    // Listen for auth state changes
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUserId(session.user.id)
        const url = session.user.user_metadata?.avatar_url || session.user.user_metadata?.avatar || null
        setAvatarUrl(url)
        // Fetch credits when user signs in
        fetchUserData()
      } else {
        setAvatarUrl(null)
        setCredits(null)
        setUserId(null)
      }
    })

    return () => {
      authSubscription.unsubscribe()
    }
  }, [])

  // Subscribe to user_info changes for real-time credit updates
  useEffect(() => {
    if (!userId) return

    const supabase = getSupabaseClient()

    // Subscribe to changes in user_info table
    const channel = supabase
      .channel(`user_info:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "user_info",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          // Update credits when user_info is updated
          if (payload.new && typeof payload.new === "object" && "credits" in payload.new) {
            setCredits(payload.new.credits as number)
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId])

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
    <div className="flex items-center gap-2">
      {/* Credits display next to avatar */}
      {credits !== null && (
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30">
          <Coins className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
          <span className="text-xs sm:text-sm font-semibold text-primary">{credits.toLocaleString()}</span>
        </div>
      )}
      
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
            {credits !== null && (
              <div className="flex items-center gap-1.5 mt-1.5 pt-1.5 border-t border-border/50">
                <Coins className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-semibold text-primary">{credits.toLocaleString()}</span>
                <span className="text-xs text-muted-foreground">Credits</span>
              </div>
            )}
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
    </div>
  )
}
