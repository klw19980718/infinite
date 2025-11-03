"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FiDollarSign, FiClock, FiPlayCircle, FiAlertTriangle, FiLoader } from "react-icons/fi"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface UserProfile {
  id: string
  email: string
  avatar_url?: string
  display_name?: string
  credits: number
}

interface CreditLedgerEntry {
  id: string
  delta: number
  note: string | null
  created_at: string
}

export function ProfilePageClient() {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [ledger, setLedger] = useState<CreditLedgerEntry[] | null>(null)
  const [historyLoading, setHistoryLoading] = useState(false)
  const [works, setWorks] = useState<any[] | null>(null)
  const [worksLoading, setWorksLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const supabase = getSupabaseClient()

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser()
        if (userError || !user) {
          router.push("/auth")
          return
        }

        const { data: userInfo, error: userInfoError } = await supabase
          .from("user_info")
          .select("credits")
          .eq("user_id", user.id)
          .single()

        const profileData: UserProfile = {
          id: user.id,
          email: user.email || "",
          avatar_url: user.user_metadata?.avatar_url,
          display_name: user.user_metadata?.display_name || user.email?.split("@")[0] || "User",
          credits: userInfo?.credits || 0,
        }

        setProfile(profileData)

        // Load user works right after profile
        await fetchWorks(profileData.id)
      } catch (error) {
        console.error("Error fetching profile:", error)
        router.push("/auth")
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [router])


  useEffect(() => {
    const fetchLedger = async () => {
      if (!historyOpen || !profile) return
      setHistoryLoading(true)
      try {
        const supabase = getSupabaseClient()
        const { data, error } = await supabase
          .from("credit_ledger")
          .select("id, delta, note, created_at")
          .eq("user_id", profile.id)
          .order("created_at", { ascending: false })
          .limit(50)
        if (!error) setLedger((data as CreditLedgerEntry[]) ?? [])
      } finally {
        setHistoryLoading(false)
      }
    }
    fetchLedger()
  }, [historyOpen, profile])

  // Fetch user works (last 7 days)
  const fetchWorks = useCallback(async (userId: string) => {
    setWorksLoading(true)
    try {
      const supabase = getSupabaseClient()
      const { data, error } = await supabase
        .from("video_tasks")
        .select(
          "id, status, resolution, output_video_url, video_duration_seconds, credits_used, created_at, updated_at, expires_at"
        )
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(50)

      if (!error) {
        const now = Date.now()
        const sevenDaysMs = 7 * 24 * 60 * 60 * 1000
        const filtered = (data ?? []).filter((t: any) => {
          const createdMs = new Date(t.created_at).getTime()
          const notExpired = t.expires_at ? new Date(t.expires_at).getTime() > now : now - createdMs < sevenDaysMs
          return notExpired
        })
        setWorks(filtered)
      }
    } finally {
      setWorksLoading(false)
    }
  }, [])

  // Auto-refresh works while there are in-progress tasks
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const lastHasInProgressRef = useRef<boolean>(false)
  
  useEffect(() => {
    if (!profile) return
    
    const clearPolling = () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current)
        pollingIntervalRef.current = null
      }
    }
    
    // Check if there are in-progress tasks
    const hasInProgress = (works ?? []).some((w) => w.status === "pending" || w.status === "processing")
    
    // Only manage polling when the in-progress status changes
    if (hasInProgress !== lastHasInProgressRef.current) {
      lastHasInProgressRef.current = hasInProgress
      
      if (!hasInProgress) {
        // No in-progress tasks, stop polling
        clearPolling()
      } else {
        // There are in-progress tasks, start polling if not already running
        if (!pollingIntervalRef.current) {
          pollingIntervalRef.current = setInterval(() => {
            fetchWorks(profile.id)
          }, 10000)
        }
      }
    }

    // Cleanup on unmount or when profile changes
    return () => {
      clearPolling()
      lastHasInProgressRef.current = false
    }
  }, [works, profile, fetchWorks])

  const formatStatus = (status: string) => {
    if (status === "completed") return { label: "Completed", color: "text-emerald-400" }
    if (status === "failed") return { label: "Failed", color: "text-red-400" }
    if (status === "processing") return { label: "Processing", color: "text-cyan-400" }
    return { label: "Pending", color: "text-gray-300" }
  }

  const remainingLabel = (expires_at?: string | null, created_at?: string) => {
    const now = Date.now()
    const expiryMs = expires_at ? new Date(expires_at).getTime() : (created_at ? new Date(created_at).getTime() + 7 * 24 * 60 * 60 * 1000 : now)
    const diffMs = Math.max(0, expiryMs - now)
    const days = Math.floor(diffMs / (24 * 60 * 60 * 1000))
    const hours = Math.floor((diffMs % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))
    if (days > 0) return `${days}d ${hours}h left`
    const mins = Math.floor((diffMs % (60 * 60 * 1000)) / (60 * 1000))
    return `${hours}h ${mins}m left`
  }


  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Unable to load profile</p>
          <Button onClick={() => router.push("/auth")}>Go to Login</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <section className="relative py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent mb-3">
              My Profile
            </h1>
            <p className="text-gray-400 text-lg">Manage your account and preferences</p>
          </div>

          <Card className="mb-8 bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardContent className="p-8 relative">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Avatar with gradient border */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full blur-md opacity-75" />
                  <Avatar className="w-28 h-28 relative border-4 border-white/10">
                    <AvatarImage src={profile.avatar_url || "/placeholder.svg"} alt={profile.display_name} />
                    <AvatarFallback className="text-3xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
                      {profile.display_name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>

                 <div className="flex-1 text-center md:text-left">
                   <h2 className="text-3xl font-bold text-white mb-2">{profile.display_name}</h2>
                   <p className="text-gray-400 mb-4 font-mono text-sm">{profile.email}</p>
                   <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                     <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm border border-cyan-500/30">
                       Active Member
                     </span>
                     <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-500/30">
                       {profile.credits > 1000 ? "Premium" : "Standard"}
                     </span>
                   </div>
                 </div>

              </div>
            </CardContent>
          </Card>


          <Card className="mb-8 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 border-cyan-500/30 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="relative">
              <CardTitle className="flex items-center gap-3 text-white text-xl">
                <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg shadow-cyan-500/20">
                  <FiDollarSign className="w-6 h-6 text-white" />
                </div>
                Available Credits
              </CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <p className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-3">
                    {profile.credits.toLocaleString()}
                  </p>
                  <p className="text-gray-400">Credits available for video generation</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/20 hover:border-cyan-500/50 hover:bg-cyan-500/10 bg-transparent"
                    onClick={() => setHistoryOpen(true)}
                  >
                    <FiClock className="w-4 h-4 mr-2" />
                    View History
                  </Button>
                   <Button
                     size="sm"
                     onClick={() => router.push("/pricing")}
                     className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg shadow-cyan-500/20"
                   >
                     Buy More Credits
                   </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Works */}
          <Card className="mb-8 bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-xl flex items-center gap-2">
                <FiPlayCircle className="w-5 h-5" />
                My Works (last 7 days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {worksLoading ? (
                <div className="py-12 text-center text-gray-400 flex items-center justify-center gap-2">
                  <FiLoader className="animate-spin" /> Loading works...
                </div>
              ) : (works && works.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {works.map((w) => {
                    const s = formatStatus(w.status)
                    return (
                      <div key={w.id} className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                        <div className="aspect-video bg-black/60 flex items-center justify-center">
                          {w.status === "completed" && w.output_video_url ? (
                            <video src={w.output_video_url} className="w-full h-full object-contain" controls preload="metadata" />
                          ) : w.status === "failed" ? (
                            <div className="text-red-400 flex items-center gap-2 text-sm"><FiAlertTriangle /> Failed</div>
                          ) : (
                            <div className="text-gray-300 flex items-center gap-2 text-sm"><FiLoader className="animate-spin" /> {s.label}</div>
                          )}
                        </div>
                        <div className="p-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className={`text-xs font-medium ${s.color}`}>{s.label}</span>
                            <span className="text-xs text-gray-400">{w.resolution?.toUpperCase?.() || ""}</span>
                          </div>
                          <div className="text-xs text-gray-400">
                            Created: {new Date(w.created_at).toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-400">
                            Expires: {remainingLabel(w.expires_at, w.created_at)}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="py-12 text-center text-gray-400">No works yet</div>
              ))}
            </CardContent>
          </Card>

          <Dialog open={historyOpen} onOpenChange={setHistoryOpen}>
            <DialogContent className="max-w-3xl bg-neutral-900 text-white border-white/10">
              <DialogHeader>
                <DialogTitle>Credit History</DialogTitle>
              </DialogHeader>
              <div className="overflow-x-auto">
                {historyLoading ? (
                  <div className="py-8 text-center text-gray-400">Loading...</div>
                ) : (
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-400 border-b border-white/10">
                        <th className="py-2 pr-4">Time</th>
                        <th className="py-2 pr-4">Delta</th>
                        <th className="py-2">Note</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(ledger ?? []).map((row) => (
                        <tr key={row.id} className="border-b border-white/5">
                          <td className="py-2 pr-4 text-gray-300">{new Date(row.created_at).toLocaleString()}</td>
                          <td className="py-2 pr-4 font-mono">
                            <span className={row.delta >= 0 ? "text-emerald-400" : "text-red-400"}>
                              {row.delta >= 0 ? "+" : ""}{row.delta}
                            </span>
                          </td>
                          <td className="py-2 text-gray-300">{row.note ?? "-"}</td>
                        </tr>
                      ))}
                      {ledger && ledger.length === 0 && (
                        <tr>
                          <td className="py-6 text-center text-gray-500" colSpan={3}>No history</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </DialogContent>
          </Dialog>

        </div>
      </section>
    </div>
  )
}
