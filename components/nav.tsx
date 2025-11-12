"use client"

import Link from "next/link"
import Image from "next/image"
import { getSupabaseClient } from "@/lib/supabase"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import LoginDialog from "@/components/auth/LoginDialog"
import UserMenu from "@/components/auth/UserMenu"
import { Menu } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"

type Profile = {
  email: string | null
}

export default function Nav() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loginDialogOpen, setLoginDialogOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

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

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20
      setIsScrolled(scrolled)
    }

    // Check initial scroll position after mount
    if (typeof window !== 'undefined') {
      handleScroll()
      window.addEventListener('scroll', handleScroll, { passive: true })
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 w-full h-16 transition-all duration-500 overflow-hidden ${
          !isScrolled 
            ? 'glass border-b border-white/10' 
            : 'glass-strong border-b border-white/15 shadow-2xl'
        }`}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-4 sm:px-6 min-w-0">
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 hover:opacity-90 transition-all duration-300 group flex-shrink-0 min-w-0">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-gradient-to-br from-accent/20 to-purple-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
              <Image src="/logo.png" alt="Infinite Talk AI" width={28} height={28} className="object-cover" />
            </div>
            <span className="font-semibold text-base hidden sm:inline transition-colors text-foreground tracking-tight whitespace-nowrap">
              Infinite Talk AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-0.5">
            <Link 
              href="/" 
              className="px-3.5 py-2 text-xs font-medium text-foreground/70 hover:text-foreground hover:bg-white/5 rounded-lg transition-all duration-300"
            >
              Home
            </Link>
            <Link 
              href="/infinite-talk-ai/image-to-video" 
              className="px-3.5 py-2 text-xs font-medium text-foreground/70 hover:text-foreground hover:bg-white/5 rounded-lg transition-all duration-300"
            >
              Image to Video
            </Link>
            <Link 
              href="/infinite-talk-ai/video-to-video" 
              className="px-3.5 py-2 text-xs font-medium text-foreground/70 hover:text-foreground hover:bg-white/5 rounded-lg transition-all duration-300"
            >
              Video to Video
            </Link>
            <Link 
              href="/pricing" 
              className="px-3.5 py-2 text-xs font-medium text-foreground/70 hover:text-foreground hover:bg-white/5 rounded-lg transition-all duration-300"
            >
              Pricing
            </Link>
            
            {profile?.email ? (
              <UserMenu email={profile.email} />
            ) : (
              <Button
                onClick={() => setLoginDialogOpen(true)}
                size="sm"
                className="ml-2.5 px-5 py-2 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 hover:scale-105 transition-all duration-300 font-semibold text-xs glow-lime"
              >
                Log in
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2 flex-shrink-0">
            {profile?.email ? (
              <div className="flex-shrink-0">
                <UserMenu email={profile.email} />
              </div>
            ) : (
              <Button
                onClick={() => setLoginDialogOpen(true)}
                variant="ghost"
                size="sm"
                className="rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm bg-accent text-accent-foreground hover:bg-accent/90 font-semibold whitespace-nowrap flex-shrink-0"
              >
                Log in
              </Button>
            )}
            
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl hover:bg-white/10 transition-all duration-300 flex-shrink-0"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-2 mt-8">
                  <SheetClose asChild>
                    <Link 
                      href="/" 
                      className="text-foreground hover:text-foreground hover:bg-white/5 transition-all duration-300 font-medium text-base py-3 px-4 rounded-xl"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Home
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link 
                      href="/infinite-talk-ai/image-to-video" 
                      className="text-foreground hover:text-foreground hover:bg-white/5 transition-all duration-300 font-medium text-base py-3 px-4 rounded-xl"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Image to Video
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link 
                      href="/infinite-talk-ai/video-to-video" 
                      className="text-foreground hover:text-foreground hover:bg-white/5 transition-all duration-300 font-medium text-base py-3 px-4 rounded-xl"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Video to Video
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link 
                      href="/pricing" 
                      className="text-foreground hover:text-foreground hover:bg-white/5 transition-all duration-300 font-medium text-base py-3 px-4 rounded-xl"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Pricing
                    </Link>
                  </SheetClose>
                  
                  {!profile?.email && (
                    <div className="pt-6 mt-4 border-t border-border/50">
                      <SheetClose asChild>
                        <Button
                          onClick={() => {
                            setMobileMenuOpen(false)
                            setLoginDialogOpen(true)
                          }}
                          className="w-full rounded-full py-3 bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300 font-semibold"
                        >
                          Log in
                        </Button>
                      </SheetClose>
                    </div>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

    

      <LoginDialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen} />
    </>
  )
}
