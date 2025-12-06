"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
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
import { ThemeToggle } from "@/components/ui/theme-toggle"

type Profile = {
  email: string | null
}

export default function Nav() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loginDialogOpen, setLoginDialogOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

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
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 w-full h-16 overflow-hidden transition-all duration-200 ${
          isScrolled
            ? "bg-background/90 border-b border-border/60 backdrop-blur-sm shadow-nav"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-4 sm:px-6 min-w-0">
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-2.5 transition-all duration-200 group flex-shrink-0 min-w-0"
          >
            <div className="relative w-9 h-9 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
              <Image src="/logo-new.png" alt="Infinite Talk AI" width={28} height={28} className="object-cover" />
            </div>
            <span className="hidden sm:inline font-medium text-sm text-foreground tracking-tight whitespace-nowrap">
              Infinite Talk AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                isActive("/")
                  ? "text-primary"
                  : "text-foreground/70 hover:text-primary"
              }`}
            >
              Home
            </Link>
            {/* <Link 
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
            </Link> */}
            <Link
              href="/text-to-speech"
              className={`text-sm font-medium transition-colors ${
                isActive("/text-to-speech")
                  ? "text-primary"
                  : "text-foreground/70 hover:text-primary"
              }`}
            >
              Text to Speech
            </Link>
            <Link
              href="/pricing"
              className={`text-sm font-medium transition-colors ${
                isActive("/pricing")
                  ? "text-primary"
                  : "text-foreground/70 hover:text-primary"
              }`}
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              className={`text-sm font-medium transition-colors ${
                isActive("/blog")
                  ? "text-primary"
                  : "text-foreground/70 hover:text-primary"
              }`}
            >
              Blog
            </Link>
            <Link
              href="/lib"
              className={`text-sm font-medium transition-colors ${
                isActive("/lib")
                  ? "text-primary"
                  : "text-foreground/70 hover:text-primary"
              }`}
            >
              Docs
            </Link>
            
            <div className="ml-2 flex items-center gap-2">
              <ThemeToggle />
              {profile?.email ? (
                <UserMenu email={profile.email} />
              ) : (
                <Button
                  onClick={() => setLoginDialogOpen(true)}
                  size="sm"
                  className="px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-xs sm:text-sm font-medium shadow-sm"
                >
                  Log in
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2 flex-shrink-0">
            <ThemeToggle />
            {profile?.email ? (
              <div className="flex-shrink-0">
                <UserMenu email={profile.email} />
              </div>
            ) : (
              <Button
                onClick={() => setLoginDialogOpen(true)}
                variant="ghost"
                size="sm"
                className="rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm bg-primary text-primary-foreground hover:bg-primary/90 font-medium whitespace-nowrap flex-shrink-0"
              >
                Log in
              </Button>
            )}
            
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl hover:bg-foreground/5 transition-colors flex-shrink-0"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" />
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
                      className={`text-base font-medium py-3 px-4 rounded-xl transition-colors ${
                        isActive("/")
                          ? "text-primary bg-primary/5"
                          : "text-foreground hover:text-primary hover:bg-foreground/5"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Home
                    </Link>
                  </SheetClose>
                  
                  {/* Feature Links */}
                  <div className="pt-2 pb-2 border-t border-border/50">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 mb-2">
                      Features
                    </p>
                    <SheetClose asChild>
                      <Link 
                        href="/" 
                        className={`block text-base font-medium py-3 px-4 rounded-xl transition-colors ${
                          isActive("/")
                            ? "text-primary bg-primary/5"
                            : "text-foreground hover:text-primary hover:bg-foreground/5"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        infinitetalk photo
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link 
                        href="/infinite-talk-ai/video-to-video" 
                        className={`block text-base font-medium py-3 px-4 rounded-xl transition-colors ${
                          isActive("/infinite-talk-ai/video-to-video")
                            ? "text-primary bg-primary/5"
                            : "text-foreground hover:text-primary hover:bg-foreground/5"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        infinitetalk video
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link 
                        href="/infinite-talk-ai/baby-podcast" 
                        className={`block text-base font-medium py-3 px-4 rounded-xl transition-colors ${
                          isActive("/infinite-talk-ai/baby-podcast")
                            ? "text-primary bg-primary/5"
                            : "text-foreground hover:text-primary hover:bg-foreground/5"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        baby podcast
                      </Link>
                    </SheetClose>
                  </div>

                  {/* Other Links */}
                  <div className="pt-2 border-t border-border/50">
                    <SheetClose asChild>
                      <Link 
                        href="/text-to-speech" 
                        className={`block text-base font-medium py-3 px-4 rounded-xl transition-colors ${
                          isActive("/text-to-speech")
                            ? "text-primary bg-primary/5"
                            : "text-foreground hover:text-primary hover:bg-foreground/5"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Text to Speech
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link 
                        href="/pricing" 
                        className={`block text-base font-medium py-3 px-4 rounded-xl transition-colors ${
                          isActive("/pricing")
                            ? "text-primary bg-primary/5"
                            : "text-foreground hover:text-primary hover:bg-foreground/5"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Pricing
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link 
                        href="/blog" 
                        className={`block text-base font-medium py-3 px-4 rounded-xl transition-colors ${
                          isActive("/blog")
                            ? "text-primary bg-primary/5"
                            : "text-foreground hover:text-primary hover:bg-foreground/5"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Blog
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link 
                        href="/lib" 
                        className={`block text-base font-medium py-3 px-4 rounded-xl transition-colors ${
                          isActive("/lib")
                            ? "text-primary bg-primary/5"
                            : "text-foreground hover:text-primary hover:bg-foreground/5"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Docs
                      </Link>
                    </SheetClose>
                  </div>
                  
                  <div className="pt-4 mt-4 border-t border-border/50">
                    <div className="flex items-center justify-between px-4 py-2">
                      <span className="text-sm font-medium text-foreground/70">Theme</span>
                      <ThemeToggle />
                    </div>
                  </div>
                  
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
