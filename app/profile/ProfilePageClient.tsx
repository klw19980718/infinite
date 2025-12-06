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
import { Beams } from "@/components/ui/beams"
import Image from "next/image"

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
      } else if (event === "SIGNED_IN") {
        // Only refresh profile when user signs in (not on token refresh)
        // Token refresh happens automatically and shouldn't trigger data reload
        fetchProfile()
      }
      // Note: TOKEN_REFRESHED is intentionally ignored to prevent unnecessary data reloads
      // when switching browser tabs or when Supabase automatically refreshes the token
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
    if (status === "processing") return { label: "Processing", color: "text-accent" }
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


  // Realtime subscription for updates
  useEffect(() => {
    if (!profile) return

    const supabase = getSupabaseClient()
    const channel = supabase
      .channel(`user-works-${profile.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "video_tasks",
          filter: `user_id=eq.${profile.id}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            // New task created - only refresh if we're on the first page
            // Otherwise, user can manually refresh or navigate to see new items
            setWorksPage((currentPage) => {
              if (currentPage === 1) {
                fetchWorks(profile.id, 1)
              }
              return currentPage
            })
          } else if (payload.eventType === "UPDATE") {
            // Task updated (e.g. completed) - update local state
            setWorks((prev) => {
              if (!prev) return prev
              return prev.map((work) => {
                if (work.id === payload.new.id) {
                  return { ...work, ...payload.new }
                }
                return work
              })
            })
          } else if (payload.eventType === "DELETE") {
             // Task deleted
             setWorks((prev) => prev?.filter((w) => w.id !== payload.old.id) || null)
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
    // Only re-subscribe when profile changes, not when worksPage changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.id, fetchWorks])

  // Note: Auto-polling for works has been removed in favor of Realtime.
  // Users can manually refresh works from the UI when needed.

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Unable to load profile</p>
          <Button onClick={() => router.push("/auth")}>Go to Login</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      

      {/* Content */}
      <section className="relative z-10 py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1600px] mx-auto">
          {/* Header Section - Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-12">
            {/* Left Column - Content */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                <span className="text-primary">
                  My Profile
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl font-normal">
                Manage your account and view your creations
              </p>
            </div>

            {/* Right Column - SVG Image */}
            <div className="flex items-center justify-center lg:justify-end order-first lg:order-last">
              <div className="w-full max-w-[200px] sm:max-w-[240px] lg:max-w-[280px]">
                <Image
                  src="/svg/my.svg"
                  alt="My Profile illustration"
                  width={759}
                  height={684}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-8">
            {/* Left Sidebar - User Info & Credits (compact) */}
            <div className="space-y-6 lg:max-w-xs">
              {/* User Card */}
              <Card className="glass-strong border-border overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center gap-2">
                    <Avatar className="w-16 h-16 border border-accent/20 mb-2">
                      <AvatarImage src={profile.avatar_url || "/placeholder.svg"} alt={profile.display_name} />
                      <AvatarFallback className="text-xl bg-accent/20 text-accent">
                        {profile.display_name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    
                    <h2 className="text-lg font-semibold text-foreground">{profile.display_name}</h2>
                    <p className="text-xs text-muted-foreground mb-1 font-mono break-all">{profile.email}</p>
                    
                    <div className="flex gap-2 mt-1">
                      <span className="px-2.5 py-0.5 bg-accent/10 text-accent rounded-full text-xs font-medium border border-accent/20">
                        {profile.credits > 1000 ? "Premium" : "Standard"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Credits Card (small) */}
              <Card className="glass-strong border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <FiDollarSign className="w-4 h-4 text-accent" />
                    Available Credits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-3">
                    <p className="text-2xl font-bold text-foreground">
                      {profile.credits.toLocaleString()}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Button
                      className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                      onClick={() => router.push("/pricing")}
                    >
                      Buy More Credits
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-border hover:bg-accent/10"
                      onClick={() => setHistoryOpen(true)}
                    >
                      <FiClock className="w-4 h-4 mr-2" />
                      History
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content - Works (expanded panel) */}
            <div className="w-full">
              <Card className="glass h-full min-h-[600px] border-border">
                <CardHeader className="border-b border-border/50">
                  <div className="flex items-center justify-between gap-4">
                    <CardTitle className="text-xl flex items-center gap-2 text-foreground">
                      <FiPlayCircle className="w-5 h-5 text-accent" />
                      My Creations
                    </CardTitle>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <FiClock className="w-3 h-3" />
                        <span>Last 7 days</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 px-3 border-border hover:bg-accent/10"
                        onClick={() => profile && fetchWorks(profile.id, worksPage)}
                        disabled={worksLoading}
                      >
                        <FiRefreshCw className="w-3 h-3 mr-1" />
                        Refresh
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  {worksLoading ? (
                    <div className="py-20 text-center text-muted-foreground flex flex-col items-center justify-center gap-3">
                      <FiLoader className="w-8 h-8 animate-spin text-accent" />
                      <p>Loading your masterpieces...</p>
                    </div>
                  ) : works && works.length > 0 ? (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
                        {works.map((w) => {
                          const s = formatStatus(w.status)
                          return (
                            <div
                              key={w.id}
                              className="rounded-2xl border border-border/70 bg-card/40 hover:bg-card/70 transition-all duration-200 overflow-hidden group flex flex-col shadow-sm hover:shadow-md"
                            >
                              <div className="aspect-video bg-black/40 flex items-center justify-center relative overflow-hidden border-b border-border/50">
                                {(w.status === "processing" || w.status === "pending") && (
                                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-10">
                                    <div className="relative">
                                      <div className="absolute inset-0 animate-ping rounded-full bg-accent/20"></div>
                                      <div className="relative bg-card rounded-full p-3 border border-accent/20">
                                        <FiLoader className="w-6 h-6 text-accent animate-spin" />
                                      </div>
                                    </div>
                                    <p className="text-accent text-xs font-medium mt-3 animate-pulse">Generating...</p>
                                  </div>
                                )}
                                
                                {w.status === "completed" && w.output_video_url ? (
                                  <video
                                    src={w.output_video_url}
                                    className="w-full h-full object-contain"
                                    controls
                                    preload="metadata"
                                  />
                                ) : w.status === "failed" ? (
                                  <div className="text-red-400 flex flex-col items-center gap-2 text-xs sm:text-sm">
                                    <FiAlertTriangle className="w-8 h-8 opacity-50" /> 
                                    <span>Generation Failed</span>
                                  </div>
                                ) : (
                                  // Fallback for other states if not covered above
                                  null
                                )}
                              </div>
                              
                              <div className="p-3 flex-1 flex flex-col">
                                <div className="flex items-center justify-between mb-2 gap-2">
                                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full bg-card border ${
                                    w.status === 'completed' ? 'text-emerald-400 border-emerald-400/20' :
                                    w.status === 'failed' ? 'text-red-400 border-red-400/20' :
                                    'text-accent border-accent/20'
                                  }`}>
                                    {s.label}
                                  </span>
                                  <span className="text-[10px] text-muted-foreground font-mono uppercase border border-border px-1.5 rounded whitespace-nowrap">
                                    {w.resolution || "HD"}
                                  </span>
                                </div>
                                
                                <div className="space-y-1.5 mb-3 flex-1 text-[11px] text-muted-foreground">
                                  <div className="flex justify-between gap-2">
                                    <span className="opacity-80">Created</span>
                                    <span className="font-mono">{new Date(w.created_at).toLocaleDateString()}</span>
                                  </div>
                           
                                </div>

                                {/* Action buttons */}
                                <div className="flex items-center gap-2 pt-2 border-t border-border/40 mt-auto">
                                  {w.status === "completed" && w.output_video_url && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-8 px-2 text-[11px] flex-1 justify-center hover:bg-accent/10 hover:text-accent"
                                      onClick={() => handleDownloadWork(w.output_video_url)}
                                    >
                                      <FiDownload className="w-3 h-3 mr-1.5" />
                                      Download
                                    </Button>
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 px-2 text-[11px] flex-1 justify-center hover:bg-red-500/10 hover:text-red-400 text-muted-foreground"
                                    onClick={() => handleDeleteClick(w.id)}
                                  >
                                    <FiTrash2 className="w-3 h-3 mr-1.5" />
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
                        <div className="flex items-center justify-between pt-6 border-t border-border/50 mt-8">
                          <div className="text-sm text-muted-foreground">
                            Showing {((worksPage - 1) * WORKS_PER_PAGE) + 1} to {Math.min(worksPage * WORKS_PER_PAGE, worksTotal)} of {worksTotal} works
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-3 border-border hover:bg-accent/10"
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
                              className="h-8 px-3 border-border hover:bg-accent/10"
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
                    <div className="py-20 text-center">
                      <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiPlayCircle className="w-8 h-8 text-muted-foreground/50" />
                      </div>
                      <h3 className="text-lg font-medium text-foreground mb-2">No creations yet</h3>
                      <p className="text-muted-foreground mb-6 max-w-xs mx-auto">Create your first talking photo video to see it here.</p>
                      <Button onClick={() => router.push("/infinite-talk-ai/image-to-video")} className="bg-accent text-accent-foreground hover:bg-accent/90">
                        Create New Video
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

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
            <DialogContent className="glass-strong border-border">
              <DialogHeader>
                <DialogTitle className="text-foreground">Delete Work</DialogTitle>
                <DialogDescription className="text-muted-foreground">
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
                  className="border-border hover:border-muted-foreground"
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
            <DialogContent className="max-w-3xl glass-strong border-border">
              <DialogHeader>
                <DialogTitle className="text-foreground">Credit History</DialogTitle>
              </DialogHeader>
              <div className="overflow-x-auto">
                {historyLoading ? (
                  <div className="py-8 text-center text-muted-foreground">Loading...</div>
                ) : (
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-muted-foreground border-b border-border">
                        <th className="py-2 pr-4">Time</th>
                        <th className="py-2 pr-4">Delta</th>
                        <th className="py-2">Note</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(ledger ?? []).map((row) => (
                        <tr key={row.id} className="border-b border-border/50">
                          <td className="py-2 pr-4 text-foreground">{new Date(row.created_at).toLocaleString()}</td>
                          <td className="py-2 pr-4 font-mono">
                            <span className={row.delta >= 0 ? "text-emerald-400" : "text-red-400"}>
                              {row.delta >= 0 ? "+" : ""}{row.delta}
                            </span>
                          </td>
                          <td className="py-2 text-foreground">{row.note ?? "-"}</td>
                        </tr>
                      ))}
                      {ledger && ledger.length === 0 && (
                        <tr>
                          <td className="py-6 text-center text-muted-foreground" colSpan={3}>No history</td>
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
