"use client"

import type React from "react"

import { useState } from "react"
import { getSupabaseClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface OtpFormProps {
  onSuccess?: () => void
  redirectTo?: string
  emailSent?: boolean
  onBackToEmail?: () => void
}

export default function OtpForm({ onSuccess, redirectTo, emailSent, onBackToEmail }: OtpFormProps) {
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState<"email" | "otp">("email")

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const supabase = getSupabaseClient()
      const siteUrl =
        typeof window !== "undefined"
          ? window.location.origin
          : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

      const currentPath = typeof window !== "undefined" ? window.location.pathname : "/"
      const finalRedirectTo = redirectTo || (currentPath === "/auth" ? "/" : currentPath)

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${siteUrl}${finalRedirectTo}`,
        },
      })

      if (error) throw error

      setStep("otp")
      onSuccess?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const supabase = getSupabaseClient()
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "email",
      })

      if (error) throw error
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid verification code. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleBackToEmail = () => {
    setStep("email")
    setOtp("")
    setError(null)
    onBackToEmail?.()
  }

  if (step === "otp") {
    return (
      <div className="space-y-6">
        <form onSubmit={handleVerifyOtp} className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="otp" className="text-sm font-medium text-foreground">
              Enter verification code
            </Label>
            <Input
              id="otp"
              type="text"
              placeholder="000000"
              value={otp}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 6)
                setOtp(value)
              }}
              required
              disabled={loading}
              autoComplete="one-time-code"
              className="h-14 rounded-xl px-4 bg-secondary/50 text-foreground placeholder:text-muted-foreground border-border focus:ring-2 focus:ring-accent/50 focus:border-accent text-center text-2xl tracking-[0.5em] font-mono"
              autoFocus
              maxLength={6}
            />
          </div>

          {error && (
            <div className="text-sm text-destructive-foreground bg-destructive/10 p-4 rounded-xl border border-destructive/20">
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full h-12 rounded-xl font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-200 shadow-lg hover:shadow-xl"
            disabled={loading || otp.length !== 6}
          >
            {loading ? "Verifying…" : "Verify code"}
          </Button>
        </form>

        <div className="text-center">
          <Button
            type="button"
            variant="ghost"
            onClick={handleBackToEmail}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to email
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSendOtp} className="space-y-4">
      <div className="space-y-3">
        <Label htmlFor="email" className="text-sm font-medium text-foreground">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          autoComplete="email"
          className="h-12 rounded-xl px-4 bg-secondary/50 text-foreground placeholder:text-muted-foreground border-border focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200"
          autoFocus
        />
      </div>

      {error && (
        <div className="text-sm text-destructive-foreground bg-destructive/10 p-4 rounded-xl border border-destructive/20">
          {error}
        </div>
      )}

      <Button
        type="submit"
        className="w-full h-12 rounded-xl font-semibold bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all duration-200 shadow-lg hover:shadow-xl"
        disabled={loading}
      >
        {loading ? "Sending…" : "Send verification code"}
      </Button>
    </form>
  )
}
