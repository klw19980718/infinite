"use client"

import { useRef, useState, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Loader2 } from "lucide-react"

export function ExampleVideos() {
  // 定义所有视频，扁平化结构
  const allVideos: Array<{ id: string; categoryKey: string }> = [
    // Multilingual
    { id: "22955", categoryKey: "multilingual" },
    { id: "22969", categoryKey: "multilingual" },
    { id: "22977", categoryKey: "multilingual" },
    { id: "22868", categoryKey: "multilingual" },
    // Songs
    { id: "22742", categoryKey: "songs" },
    { id: "22810", categoryKey: "songs" },
    { id: "22863", categoryKey: "songs" },
    { id: "22935", categoryKey: "songs" },
    // Infinitetalk
    { id: "22947", categoryKey: "infinitetalk" },
    // Cartoons
    { id: "22893", categoryKey: "cartoons" },
    { id: "22943", categoryKey: "cartoons" },
    { id: "22960", categoryKey: "cartoons" },
    // Ads
    { id: "22737", categoryKey: "ads" },
    { id: "22953", categoryKey: "ads" },
    // Podcasts
    { id: "22800", categoryKey: "podcasts" },
    { id: "22802", categoryKey: "podcasts" },
    { id: "22844", categoryKey: "podcasts" },
    { id: "22928", categoryKey: "podcasts" },
    // Shorts
    { id: "22823", categoryKey: "shorts" },
    { id: "22927", categoryKey: "shorts" },
    { id: "22956", categoryKey: "shorts" },
    // Memes
    { id: "22876", categoryKey: "memes" },
    { id: "22855", categoryKey: "memes" },
  ]

  // 根据分类获取目录路径
  const getCategoryDir = (categoryKey: string) => {
    switch (categoryKey) {
      case "multilingual":
        return "languages"
      case "songs":
        return "songs"
      case "infinitetalk":
        return "songs"
      case "cartoons":
        return "cartoons"
      case "ads":
        return "ads"
      case "podcasts":
        return "blogs"
      case "shorts":
        return "short-videos"
      case "memes":
        return "parody"
      default:
        return "languages"
    }
  }
  
  const getImageSrc = (id: string, categoryKey: string) => {
    const dir = getCategoryDir(categoryKey)
    return `https://cdn.infinitetalkai.org/${dir}/infinite-talk-ai-${id}.jpg`
  }
  
  const getVideoSrc = (id: string, categoryKey: string) => {
    const dir = getCategoryDir(categoryKey)
    return `https://cdn.infinitetalkai.org/${dir}/infinite-talk-ai-${id}.mp4`
  }

  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({})
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const [playingVideos, setPlayingVideos] = useState<Record<string, boolean>>({})
  const [mutedVideos, setMutedVideos] = useState<Record<string, boolean>>({})
  const [loadingVideos, setLoadingVideos] = useState<Record<string, boolean>>({})
  const [showAll, setShowAll] = useState(false)
  
  // 计算显示的视频数量
  const totalVideos = allVideos.length
  const pcHalfCount = Math.ceil(totalVideos / 2)
  const mobileCount = 10
  
  const toggleVideo = async (videoKey: string, e?: React.MouseEvent) => {
    // 如果点击的是控制按钮，阻止事件冒泡
    if (e) {
      e.stopPropagation()
    }
    
    const video = videoRefs.current[videoKey]
    if (!video) return
    
    if (video.paused) {
      // 开始加载
      setLoadingVideos((prev) => ({ ...prev, [videoKey]: true }))
      try {
        await video.play()
        setPlayingVideos((prev) => ({ ...prev, [videoKey]: true }))
      } catch (error) {
        console.error('Video play error:', error)
        setLoadingVideos((prev) => ({ ...prev, [videoKey]: false }))
      }
    } else {
      video.pause()
      setPlayingVideos((prev) => ({ ...prev, [videoKey]: false }))
    }
  }
  
  const toggleMute = (videoKey: string, e: React.MouseEvent) => {
    e.stopPropagation()
    
    const video = videoRefs.current[videoKey]
    if (!video) return
    
    video.muted = !video.muted
    setMutedVideos((prev) => ({ ...prev, [videoKey]: video.muted }))
  }
  
  // 监听视频播放状态变化和加载状态
  useEffect(() => {
    const handlers: Record<string, { 
      play: () => void
      pause: () => void
      waiting: () => void
      canplay: () => void
      playing: () => void
    }> = {}
    
    // 为每个视频添加事件监听
    Object.keys(videoRefs.current).forEach((videoKey) => {
      const video = videoRefs.current[videoKey]
      if (video) {
        const playHandler = () => {
          setPlayingVideos((prev) => ({ ...prev, [videoKey]: true }))
        }
        const pauseHandler = () => {
          setPlayingVideos((prev) => ({ ...prev, [videoKey]: false }))
        }
        const waitingHandler = () => {
          setLoadingVideos((prev) => ({ ...prev, [videoKey]: true }))
        }
        const canplayHandler = () => {
          setLoadingVideos((prev) => ({ ...prev, [videoKey]: false }))
        }
        const playingHandler = () => {
          setLoadingVideos((prev) => ({ ...prev, [videoKey]: false }))
        }
        
        handlers[videoKey] = { 
          play: playHandler, 
          pause: pauseHandler,
          waiting: waitingHandler,
          canplay: canplayHandler,
          playing: playingHandler
        }
        video.addEventListener('play', playHandler)
        video.addEventListener('pause', pauseHandler)
        video.addEventListener('waiting', waitingHandler)
        video.addEventListener('canplay', canplayHandler)
        video.addEventListener('playing', playingHandler)
      }
    })
    
    return () => {
      Object.keys(videoRefs.current).forEach((videoKey) => {
        const video = videoRefs.current[videoKey]
        const handler = handlers[videoKey]
        if (video && handler) {
          video.removeEventListener('play', handler.play)
          video.removeEventListener('pause', handler.pause)
          video.removeEventListener('waiting', handler.waiting)
          video.removeEventListener('canplay', handler.canplay)
          video.removeEventListener('playing', handler.playing)
        }
      })
    }
  }, [allVideos.length])
  
  // 点击外部关闭所有视频
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      
      let clickedInsideCard = false
      Object.values(cardRefs.current).forEach((card) => {
        if (card && card.contains(target)) {
          clickedInsideCard = true
        }
      })
      
      if (!clickedInsideCard) {
        Object.keys(videoRefs.current).forEach((videoKey) => {
          const video = videoRefs.current[videoKey]
          if (video && !video.paused) {
            video.pause()
            setPlayingVideos((prev) => ({ ...prev, [videoKey]: false }))
          }
        })
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <section id="example-videos" className="relative py-20 md:py-28 overflow-hidden">
      <div className="container relative mx-auto px-6 z-10">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
            Example Videos · <span className="text-primary">Infinite Talk AI</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-3xl">
            Create any kind of video with infinite talk - delivering studio-grade lip sync, natural expression, and
            multilingual publishing for the world's major languages.
          </p>
        </div>

        {/* 瀑布流布局：使用 CSS columns，一行4个（桌面端），高度完全自适应 */}
        <div 
          className="columns-1 sm:columns-2 lg:columns-4 gap-4 md:gap-6"
        >
          {allVideos.map((video, index) => {
            // 控制显示：移动端显示10个，PC端未展开时显示一半
            const isMobileHidden = !showAll && index >= mobileCount
            const isPCHidden = !showAll && index >= pcHalfCount
            const videoKey = `${video.categoryKey}-${video.id}`
            
            return (
              <div
                key={videoKey}
                ref={(el) => {
                  cardRefs.current[videoKey] = el
                }}
                className={`rounded-2xl border border-border bg-card shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden mb-4 md:mb-6 break-inside-avoid group ${
                  isMobileHidden ? 'hidden' : ''
                } ${isPCHidden ? 'lg:hidden' : ''}`}
              >
                <div 
                  className="relative w-full cursor-pointer"
                  onClick={() => toggleVideo(videoKey)}
                >
                  <video
                    ref={(el) => {
                      videoRefs.current[videoKey] = el
                    }}
                    preload="none"
                    className="w-full h-auto object-contain bg-black"
                    poster={getImageSrc(video.id, video.categoryKey)}
                    style={{ display: 'block' }}
                    muted={mutedVideos[videoKey] ?? false}
                  >
                    <source src={getVideoSrc(video.id, video.categoryKey)} />
                  </video>
                  
                  {/* Loading 指示器 */}
                  {loadingVideos[videoKey] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-20">
                      <Loader2 className="h-8 w-8 text-white animate-spin" />
                    </div>
                  )}
                  
                  {/* 播放/暂停按钮 - 居中显示 */}
                  {!playingVideos[videoKey] && (
                    <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
                      loadingVideos[videoKey] ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'
                    }`}>
                      <button
                        onClick={(e) => toggleVideo(videoKey, e)}
                        className="h-14 w-14 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-sm flex items-center justify-center transition-colors z-10"
                        aria-label="Play"
                      >
                        <Play className="h-7 w-7 text-white ml-1" />
                      </button>
                    </div>
                  )}
                  
                  {/* 控制按钮栏 - 底部显示 */}
                  {playingVideos[videoKey] && (
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between transition-opacity duration-200 opacity-100">
                      {/* 播放/暂停按钮 */}
                      <button
                        onClick={(e) => toggleVideo(videoKey, e)}
                        className="h-10 w-10 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-sm flex items-center justify-center transition-colors"
                        aria-label="Pause"
                      >
                        <Pause className="h-5 w-5 text-white" />
                      </button>
                      
                      {/* 静音按钮 */}
                      <button
                        onClick={(e) => toggleMute(videoKey, e)}
                        className="h-10 w-10 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-sm flex items-center justify-center transition-colors"
                        aria-label={mutedVideos[videoKey] ? "Unmute" : "Mute"}
                      >
                        {mutedVideos[videoKey] ? (
                          <VolumeX className="h-5 w-5 text-white" />
                        ) : (
                          <Volume2 className="h-5 w-5 text-white" />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
        
        {/* 查看更多按钮 */}
        {!showAll && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="px-6 py-3 rounded-full border-2 border-primary bg-transparent hover:bg-primary/10 text-primary font-medium transition-colors"
            >
              View More
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
