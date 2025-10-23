"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { FcGoogle } from "react-icons/fc"
import { getSupabaseClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import OtpForm from "@/components/auth/OtpForm"

export default function AuthPage() {
  const router = useRouter()
  const [email, setEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [signingOut, setSigningOut] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  useEffect(() => {
    const supabase = getSupabaseClient()

    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setEmail(session?.user?.email ?? null)
      setLoading(false)
    }

    checkSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user?.email ?? null)
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const handleSignOut = async () => {
    setSigningOut(true)
    try {
      const supabase = getSupabaseClient()
      await supabase.auth.signOut()
      router.refresh()
    } catch (error) {
      console.error("Sign out error:", error)
    } finally {
      setSigningOut(false)
    }
  }

  const handleGoogleLogin = async () => {
    setGoogleLoading(true)
    try {
      const supabase = getSupabaseClient()
      const siteUrl =
        typeof window !== "undefined"
          ? window.location.origin
          : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

      const urlParams = new URLSearchParams(window.location.search)
      const redirectPath = urlParams.get("redirect") || "/"

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${siteUrl}${redirectPath}`,
        },
      })

      if (error) {
        console.error("Google login error:", error)
        setGoogleLoading(false)
      }
    } catch (err) {
      console.error("Google login error:", err)
      setGoogleLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    )
  }

  if (email) {
    const avatarChar = email.charAt(0).toUpperCase()

    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-secondary/20">
        <div className="w-full max-w-md">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <Avatar className="h-24 w-24 ring-4 ring-accent/20">
                  <AvatarFallback className="text-3xl bg-accent text-accent-foreground font-bold">
                    {avatarChar}
                  </AvatarFallback>
                </Avatar>
              </div>
              <h1 className="text-2xl font-bold mb-2 text-foreground">You're signed in</h1>
              <p className="text-muted-foreground">{email}</p>
            </div>

            <div className="space-y-3">
              <Button onClick={() => router.push("/")} variant="outline" className="w-full h-12 rounded-xl">
                Go to Home
              </Button>
              <Button
                onClick={handleSignOut}
                disabled={signingOut}
                variant="destructive"
                className="w-full h-12 rounded-xl"
              >
                {signingOut ? "Signing out..." : "Sign out"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-secondary/20">
      <div className="w-full max-w-[440px]">
        <div className="bg-card border border-border rounded-2xl p-0 overflow-hidden shadow-2xl">
          {/* Header with gradient background */}
          <div className="relative px-8 pt-8 pb-6 bg-gradient-to-br from-accent/10 via-chart-2/10 to-chart-3/10">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-2xl ring-2 ring-border/50 flex items-center justify-center bg-background">
                <Image src="/logo.png" alt="Infinite Talk" width={80} height={80} className="object-cover" />
              </div>
            </div>

            {/* Heading */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
              <p className="text-muted-foreground text-base">Sign in to continue to your account</p>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 pb-8 space-y-6">
            {/* Google OAuth Button */}
            <Button
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="w-full h-12 rounded-xl font-semibold bg-white text-neutral-900 hover:bg-neutral-100 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <FcGoogle className="w-6 h-6 mr-3" />
              {googleLoading ? "Connecting..." : "Continue with Google"}
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-card px-4 text-muted-foreground font-medium">OR</span>
              </div>
            </div>

            {/* Email OTP Form */}
            <OtpForm
              onSuccess={() => setEmailSent(true)}
              emailSent={emailSent}
              onBackToEmail={() => setEmailSent(false)}
            />

            {/* Footer */}
            <div className="pt-6 border-t border-border">
              <p className="text-center text-xs text-muted-foreground leading-relaxed">
                By continuing, you agree to our{" "}
                <a href="/terms" className="text-accent hover:text-accent/80 transition-colors underline">
                  Terms
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-accent hover:text-accent/80 transition-colors underline">
                  Privacy Policy
                </a>
              </p>
            </div>

            {/* Back to Home Link */}
            <div className="text-center">
              <Button
                onClick={() => router.push("/")}
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
