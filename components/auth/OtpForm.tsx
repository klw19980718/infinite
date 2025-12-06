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
              className="h-14 rounded-2xl px-4 bg-card dark:bg-[#4a4a4a] border border-border dark:border-[#5a5a5a] text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 dark:focus:ring-[#7A7FEE] focus:border-primary/50 dark:focus:border-[#7A7FEE] text-center text-2xl tracking-[0.5em] font-mono transition-all duration-200 shadow-sm dark:shadow-md"
              maxLength={6}
            />
          </div>

          {error && (
            <div className="text-sm text-destructive-foreground bg-destructive/10 dark:bg-destructive/20 p-4 rounded-2xl border border-destructive/20 dark:border-destructive/40">
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full h-12 rounded-2xl font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 shadow-md dark:shadow-lg hover:shadow-lg dark:hover:shadow-xl"
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
            className="text-sm text-muted-foreground hover:text-foreground transition-colors rounded-2xl"
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
          className="h-12 rounded-2xl px-4 bg-card dark:bg-[#4a4a4a] border border-border dark:border-[#5a5a5a] text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 dark:focus:ring-[#7A7FEE] focus:border-primary/50 dark:focus:border-[#7A7FEE] transition-all duration-200 shadow-sm dark:shadow-md"
          autoFocus
        />
      </div>

      {error && (
        <div className="text-sm text-destructive-foreground bg-destructive/10 dark:bg-destructive/20 p-4 rounded-2xl border border-destructive/20 dark:border-destructive/40">
          {error}
        </div>
      )}

      <Button
        type="submit"
        className="w-full h-12 rounded-2xl font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 shadow-md dark:shadow-lg hover:shadow-lg dark:hover:shadow-xl"
        disabled={loading}
      >
        {loading ? "Sending…" : "Send verification code"}
      </Button>
    </form>
  )
}
