"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FiDollarSign, FiClock, FiPlayCircle, FiAlertTriangle, FiLoader, FiDownload, FiTrash2, FiRefreshCw, FiChevronLeft, FiChevronRight } from "react-icons/fi"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { toast } from "sonner"

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
  const [worksPage, setWorksPage] = useState(1)
  const [worksTotal, setWorksTotal] = useState(0)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [workToDelete, setWorkToDelete] = useState<string | null>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const WORKS_PER_PAGE = 12

  useEffect(() => {
    const supabase = getSupabaseClient()

    const fetchProfile = async () => {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser()
        if (userError || !user) {
          // Clear all state when user is not authenticated
          setProfile(null)
          setWorks(null)
          setLedger(null)
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
        await fetchWorks(profileData.id, 1)
        setWorksPage(1)
      } catch (error) {
        console.error("Error fetching profile:", error)
        // Clear all state on error
        setProfile(null)
        setWorks(null)
        setLedger(null)
        router.push("/auth")
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()

    // Listen for auth state changes (e.g., sign out)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        // Clear all state when user signs out
        setProfile(null)
        setWorks(null)
        setLedger(null)
        setHistoryOpen(false)
        setDeleteConfirmOpen(false)
        setWorkToDelete(null)
        router.push("/auth")
      } else if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        // Refresh profile when user signs in or token is refreshed
        fetchProfile()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // Fetch user works (last 7 days) with pagination
  const fetchWorks = useCallback(async (userId: string, page: number = 1) => {
    setWorksLoading(true)
    try {
      const supabase = getSupabaseClient()
      const now = Date.now()
      const sevenDaysMs = 7 * 24 * 60 * 60 * 1000
      
      // First, get total count
      const { count, error: countError } = await supabase
        .from("video_tasks")
        .select("*", { count: "exact", head: true })
        .eq("user_id", userId)

      if (countError) {
        console.error("Error fetching works count:", countError)
      } else {
        // Filter by expiry in query
        const allData = await supabase
          .from("video_tasks")
          .select(
            "id, status, resolution, output_video_url, video_duration_seconds, credits_used, created_at, updated_at, expires_at, wavespeed_task_id"
          )
          .eq("user_id", userId)
          .order("created_at", { ascending: false })

        if (allData.error) {
          console.error("Error fetching works:", allData.error)
          return
        }

        // Filter expired works
        const filtered = (allData.data ?? []).filter((t: any) => {
          const createdMs = new Date(t.created_at).getTime()
          const notExpired = t.expires_at ? new Date(t.expires_at).getTime() > now : now - createdMs < sevenDaysMs
          return notExpired
        })

        // Calculate pagination
        const total = filtered.length
        const startIndex = (page - 1) * WORKS_PER_PAGE
        const endIndex = startIndex + WORKS_PER_PAGE
        const paginatedWorks = filtered.slice(startIndex, endIndex)

        setWorks(paginatedWorks)
        setWorksTotal(total)
      }
    } finally {
      setWorksLoading(false)
    }
  }, [])

  // Handle delete work confirmation
  const handleDeleteClick = (workId: string) => {
    setWorkToDelete(workId)
    setDeleteConfirmOpen(true)
  }

  // Confirm delete work
  const handleDeleteConfirm = async () => {
    if (!workToDelete || !profile) return

    setDeleteLoading(true)
    try {
      // Call backend API to delete the work
      const response = await fetch(`/api/video/delete?task_id=${workToDelete}`, {
        method: "DELETE",
        credentials: "include",
      })

      const data = await response.json()

      if (!data.ok) {
        toast.error(data.message || "Failed to delete work")
        return
      }

      toast.success("Work deleted successfully")
      setDeleteConfirmOpen(false)
      setWorkToDelete(null)
      
      // Refresh works list immediately after deletion
      await fetchWorks(profile.id, worksPage)
      
      // Check if current page is empty after refresh, if so go to previous page
      if (works && works.length === 0 && worksPage > 1) {
        const newPage = worksPage - 1
        setWorksPage(newPage)
        await fetchWorks(profile.id, newPage)
      }
    } catch (error) {
      console.error("Error deleting work:", error)
      toast.error(`Failed to delete work: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setDeleteLoading(false)
    }
  }

  // Handle refresh work status
  const handleRefreshWork = async (workId: string, wavespeedTaskId?: string) => {
    if (!wavespeedTaskId) {
      toast.error("Task ID not found")
      return
    }

    try {
      const loadingToast = toast.loading("Checking task status...")
      
      const response = await fetch(`/api/video/result?task_id=${workId}`, {
        credentials: "include",
      })

      const data = await response.json()

      if (!data.ok) {
        throw new Error(data.message || "Failed to fetch task status")
      }

      toast.dismiss(loadingToast)
      toast.success("Task status updated")
      
      // Refresh works list
      if (profile) {
        await fetchWorks(profile.id, worksPage)
      }
    } catch (error) {
      console.error("Error refreshing work status:", error)
      toast.error(error instanceof Error ? error.message : "Failed to refresh task status")
    }
  }

  // Handle download work
  const handleDownloadWork = async (videoUrl: string) => {
    if (!videoUrl) return
    
    try {
      const loadingToast = toast.loading("Downloading video...")
      
      // Fetch the video file with proper headers
      const response = await fetch(videoUrl, {
        method: "GET",
        headers: {
          // Don't set any headers that might cause CORS issues
        },
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      // Create a blob from the response
      const blob = await response.blob()
      
      // Create a blob URL
      const blobUrl = URL.createObjectURL(blob)
      
      // Create a temporary anchor element to trigger download
      const link = document.createElement("a")
      link.href = blobUrl
      link.download = `video-${Date.now()}.mp4`
      link.style.display = "none" // Hide the link
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // Clean up the blob URL after a short delay
      setTimeout(() => {
        URL.revokeObjectURL(blobUrl)
      }, 100)
      
      toast.dismiss(loadingToast)
      toast.success("Video downloaded successfully")
    } catch (error) {
      console.error("Error downloading video:", error)
      
      // Fallback: try direct download with target="_blank" disabled
      try {
        const link = document.createElement("a")
        link.href = videoUrl
        link.download = `video-${Date.now()}.mp4`
        link.target = "_self" // Prevent opening in new tab
        link.style.display = "none"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
        toast.success("Video download started")
      } catch (fallbackError) {
        console.error("Fallback download also failed:", fallbackError)
        toast.error("Failed to download video. Please try right-clicking and selecting 'Save as'.")
      }
    }
  }

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
              ) : works && works.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {works.map((w) => {
                      const s = formatStatus(w.status)
                      return (
                        <div key={w.id} className="rounded-xl border border-white/10 bg-white/5 overflow-hidden group">
                          <div className="aspect-video bg-black/60 flex items-center justify-center relative">
                            {(w.status === "processing" || w.status === "pending") && (
                              <div className="absolute top-2 right-2 z-10">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 w-8 p-0 bg-black/80 border-white/20 hover:bg-black/90 text-white"
                                  onClick={() => handleRefreshWork(w.id, w.wavespeed_task_id)}
                                  title="Refresh status"
                                >
                                  <FiRefreshCw className="w-4 h-4" />
                                </Button>
                              </div>
                            )}
                            {w.status === "completed" && w.output_video_url ? (
                              <>
                                <video src={w.output_video_url} className="w-full h-full object-contain" controls preload="metadata" />
                  
                              </>
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
                            {/* Action buttons */}
                            <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                              {w.status === "completed" && w.output_video_url && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 px-3 text-xs border-white/20 hover:border-cyan-500/50 hover:bg-cyan-500/10 bg-transparent"
                                  onClick={() => handleDownloadWork(w.output_video_url)}
                                >
                                  <FiDownload className="w-3 h-3 mr-1" />
                                  Download
                                </Button>
                              )}
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 px-3 text-xs border-red-500/30 hover:border-red-500/50 hover:bg-red-500/10 bg-transparent text-red-400"
                                onClick={() => handleDeleteClick(w.id)}
                              >
                                <FiTrash2 className="w-3 h-3 mr-1" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  
                  {/* Pagination */}
                  {worksTotal > 0 && (
                    <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-6">
                      <div className="text-sm text-gray-400">
                        Showing {((worksPage - 1) * WORKS_PER_PAGE) + 1} to {Math.min(worksPage * WORKS_PER_PAGE, worksTotal)} of {worksTotal} works
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-3 border-white/20 hover:border-cyan-500/50 hover:bg-cyan-500/10 bg-transparent"
                          onClick={() => {
                            const newPage = Math.max(1, worksPage - 1)
                            setWorksPage(newPage)
                            if (profile) fetchWorks(profile.id, newPage)
                          }}
                          disabled={worksPage === 1 || worksLoading}
                        >
                          <FiChevronLeft className="w-4 h-4 mr-1" />
                          Previous
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-3 border-white/20 hover:border-cyan-500/50 hover:bg-cyan-500/10 bg-transparent"
                          onClick={() => {
                            const newPage = worksPage + 1
                            setWorksPage(newPage)
                            if (profile) fetchWorks(profile.id, newPage)
                          }}
                          disabled={worksPage * WORKS_PER_PAGE >= worksTotal || worksLoading}
                        >
                          Next
                          <FiChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="py-12 text-center text-gray-400">No works yet</div>
              )}
            </CardContent>
          </Card>

          {/* Delete Confirmation Dialog */}
          <Dialog 
            open={deleteConfirmOpen} 
            onOpenChange={(open) => {
              setDeleteConfirmOpen(open)
              if (!open) {
                setWorkToDelete(null)
                setDeleteLoading(false)
              }
            }}
          >
            <DialogContent className="bg-neutral-900 text-white border-white/10">
              <DialogHeader>
                <DialogTitle>Delete Work</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Are you sure you want to delete this work? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex gap-2 sm:gap-0">
                <Button
                  variant="outline"
                  onClick={() => {
                    setDeleteConfirmOpen(false)
                    setWorkToDelete(null)
                    setDeleteLoading(false)
                  }}
                  className="border-white/20 hover:border-gray-400"
                  disabled={deleteLoading}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDeleteConfirm}
                  className="bg-red-600 hover:bg-red-700 text-white"
                  disabled={deleteLoading}
                >
                  {deleteLoading ? (
                    <>
                      <FiLoader className="w-4 h-4 mr-2 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    "Delete"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

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
