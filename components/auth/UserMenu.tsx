"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getSupabaseClient } from "@/lib/supabase"

interface UserMenuProps {
  email: string | null
}

export default function UserMenu({ email }: UserMenuProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const avatarChar = email?.charAt(0)?.toUpperCase() || "?"

  const handleSignOut = async () => {
    setLoading(true)
    try {
      const supabase = getSupabaseClient()
      await supabase.auth.signOut()
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

        <DropdownMenuItem onClick={() => router.push("/auth")} className="cursor-pointer">
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
