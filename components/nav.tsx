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
        className={`fixed top-0 left-0 right-0 z-50 w-full h-16 transition-all duration-300 ${
          !isScrolled 
            ? 'border-b border-transparent' 
            : 'bg-white/10 backdrop-blur-lg border-b border-white/20'
        }`}
        style={!isScrolled ? { backgroundColor: 'transparent' } : undefined}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Image src="/logo.png" alt="Infinite Talk AI" width={32} height={32} className="object-cover" />
            </div>
            <span className={`font-semibold text-base sm:text-lg hidden sm:inline transition-colors ${
              isScrolled ? 'text-white' : 'text-foreground'
            }`}>
              Infinite Talk AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              href="/" 
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                isScrolled
                  ? 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/15 hover:border-white/30'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/infinite-talk-ai/image-to-video" 
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                isScrolled
                  ? 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/15 hover:border-white/30'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Image to Video
            </Link>
            <Link 
              href="/infinite-talk-ai/video-to-video" 
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                isScrolled
                  ? 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/15 hover:border-white/30'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Video to Video
            </Link>
            <Link 
              href="/pricing" 
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                isScrolled
                  ? 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/15 hover:border-white/30'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Pricing
            </Link>
            
            {profile?.email ? (
              <UserMenu email={profile.email} />
            ) : (
              <Button
                onClick={() => setLoginDialogOpen(true)}
                className={`rounded-lg transition-all duration-200 ${
                  isScrolled
                    ? 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/15 hover:border-white/30'
                    : 'bg-accent text-accent-foreground hover:bg-accent/90'
                }`}
              >
                Log in
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            {profile?.email ? (
              <UserMenu email={profile.email} />
            ) : (
              <Button
                onClick={() => setLoginDialogOpen(true)}
                variant="ghost"
                size="sm"
                className={`rounded-lg transition-all duration-200 text-sm px-3 py-2 ${
                  isScrolled
                    ? 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/15 hover:border-white/30'
                    : 'bg-accent text-accent-foreground hover:bg-accent/90'
                }`}
              >
                Log in
              </Button>
            )}
            
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-9 w-9 transition-colors ${
                    isScrolled ? 'text-white hover:bg-white/10' : ''
                  }`}
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-6">
                  <SheetClose asChild>
                    <Link 
                      href="/" 
                      className="text-foreground hover:text-accent transition-colors font-medium text-lg py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Home
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link 
                      href="/infinite-talk-ai/image-to-video" 
                      className="text-foreground hover:text-accent transition-colors font-medium text-lg py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Image to Video
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link 
                      href="/infinite-talk-ai/video-to-video" 
                      className="text-foreground hover:text-accent transition-colors font-medium text-lg py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Video to Video
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link 
                      href="/pricing" 
                      className="text-foreground hover:text-accent transition-colors font-medium text-lg py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Pricing
                    </Link>
                  </SheetClose>
                  
                  {!profile?.email && (
                    <div className="pt-4 border-t border-border">
                      <SheetClose asChild>
                        <Button
                          onClick={() => {
                            setMobileMenuOpen(false)
                            setLoginDialogOpen(true)
                          }}
                          className="w-full rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-200"
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
