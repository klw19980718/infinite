"use client"

import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"

export function ExampleVideos() {
  // 定义分类；仅"Multilingual content"提供演示用素材
  const categories: Array<{ key: string; title: string; description: string; ids: string[] }> = [
    {
      key: "multilingual",
      title: "Multilingual content",
      description:
        "many languages (English, Chinese/Mandarin, Japanese, Hindi, Spanish, French, German, Portuguese, Korean, Arabic, Russian, and other major languages)",
      ids: ["22955", "22969", "22977", "22868"],
    },
    {
      key: "songs",
      title: "Songs & Music Videos",
      description: "sing-along covers, duets, lyric-synced performances",
      ids: ["22742", "22810", "22863", "22935"],
    },
    {
      key: "infinitetalk",
      title: "Infinitetalk",
      description: "long-form video generation, extended content creation, hour-scale programs with seamless batching and stitching",
      ids: ["22947"],
    },
    {
      key: "cartoons",
      title: "Cartoons & Characters",
      description: "animated hosts, kid-friendly narration, voice swaps",
      ids: ["22893", "22943", "22960"],
    },
    {
      key: "ads",
      title: "Ads & Promos",
      description: "15–30s product spots, feature highlights, brand intros",
      ids: ["22737", "22953"],
    },
    {
      key: "podcasts",
      title: "Podcasts / Product Demos / News",
      description: "virtual anchors, multilingual briefings, how-tos",
      ids: ["22800", "22802", "22844", "22928"],
    },
    {
      key: "shorts",
      title: "Shorts & Vlogs",
      description: "daily stories, travel explainers, creator intros, social clips",
      ids: ["22823", "22927", "22956"],
    },
    {
      key: "memes",
      title: "Memes & Parodies",
      description: "over-the-top reactions, remixed lines, comedic dubs",
      ids: [ "22876","22855"],
    },
  ]

  // 根据分类获取目录路径
  const getCategoryDir = (categoryKey: string) => {
    switch (categoryKey) {
      case "multilingual":
        return "languages"
      case "songs":
        return "songs"
      case "infinitetalk":
        return "songs" // 使用 songs 目录，因为 22947 原本在 songs 中
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

  const [activeIndexes, setActiveIndexes] = useState<Record<string, number>>(
    categories.reduce((acc, cat) => ({ ...acc, [cat.key]: 0 }), {}),
  )
  const [playingVideos, setPlayingVideos] = useState<Record<string, boolean>>({})
  const scrollRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({})
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({})
  
  const handleVideoPlay = (videoKey: string) => {
    setPlayingVideos((prev) => ({ ...prev, [videoKey]: true }))
  }
  
  const handleVideoPause = (videoKey: string) => {
    setPlayingVideos((prev) => ({ ...prev, [videoKey]: false }))
  }
  
  const toggleVideo = async (videoKey: string) => {
    const video = videoRefs.current[videoKey]
    if (!video) return
    
    if (video.paused) {
      try {
        await video.play()
        handleVideoPlay(videoKey)
      } catch (error) {
        // 处理播放错误（用户可能取消了播放）
        console.error('Video play error:', error)
      }
    } else {
      video.pause()
      handleVideoPause(videoKey)
    }
  }
  
  // 点击外部关闭所有视频
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      
      // 检查点击是否在任何视频卡片内
      let clickedInsideCard = false
      Object.values(cardRefs.current).forEach((card) => {
        if (card && card.contains(target)) {
          clickedInsideCard = true
        }
      })
      
      // 如果点击在卡片外，关闭所有正在播放的视频
      if (!clickedInsideCard) {
        Object.keys(playingVideos).forEach((videoKey) => {
          if (playingVideos[videoKey]) {
            const video = videoRefs.current[videoKey]
            if (video && !video.paused) {
              video.pause()
              setPlayingVideos((prev) => ({ ...prev, [videoKey]: false }))
            }
          }
        })
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [playingVideos])

  const scrollCategory = (key: string, direction: 1 | -1) => {
    const el = scrollRefs.current[key]
    if (!el) return
    const amount = Math.max(320, Math.floor(el.clientWidth * 0.8))
    el.scrollBy({ left: amount * direction, behavior: 'smooth' })
  }

  const handlePrev = (categoryKey: string, maxIndex: number) => {
    setActiveIndexes((prev) => ({
      ...prev,
      [categoryKey]: prev[categoryKey] > 0 ? prev[categoryKey] - 1 : maxIndex - 1,
    }))
  }

  const handleNext = (categoryKey: string, maxIndex: number) => {
    setActiveIndexes((prev) => ({
      ...prev,
      [categoryKey]: prev[categoryKey] < maxIndex - 1 ? prev[categoryKey] + 1 : 0,
    }))
  }

  return (
    <section id="example-videos" className="relative py-20 md:py-28 overflow-hidden bg-background">
      <div className="container relative mx-auto px-6 z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Example Videos ·{" "}
            <span className="text-accent">
              Infinite Talk AI
            </span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground text-balance leading-relaxed">
            Create any kind of video with infinite talk - delivering studio-grade lip sync, natural expression, and
            multilingual publishing for the world's major languages.
          </p>
        </div>

        <div className="space-y-24">
          {categories.map((cat) => {
            const currentIndex = activeIndexes[cat.key] || 0
            const currentId = cat.ids[currentIndex]

            return (
              <div key={cat.key} className="relative" id={
                cat.key === 'multilingual' ? 'multilingual-content' :
                cat.key === 'infinitetalk' ? 'infinitetalk' :
                cat.key === 'shorts' ? 'shorts' :
                cat.key === 'podcasts' ? 'podcasts' :
                undefined
              }>
                <div className="mb-6">
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">{cat.title}</h3>
                  {cat.ids.length > 0 ? (
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm text-muted-foreground flex-1">{cat.description}</p>
                      <div className="hidden sm:flex items-center gap-2">
                        <button
                          aria-label="Scroll left"
                          onClick={() => scrollCategory(cat.key, -1)}
                          className="h-8 w-8 rounded-full border border-border bg-card hover:border-accent/50 hover:bg-accent/10 transition"
                        >
                          <ChevronLeft className="mx-auto h-4 w-4 text-muted-foreground" />
                        </button>
                        <button
                          aria-label="Scroll right"
                          onClick={() => scrollCategory(cat.key, 1)}
                          className="h-8 w-8 rounded-full border border-border bg-card hover:border-accent/50 hover:bg-accent/10 transition"
                        >
                          <ChevronRight className="mx-auto h-4 w-4 text-muted-foreground" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground max-w-3xl">{cat.description}</p>
                  )}
                </div>

                {cat.ids.length > 0 ? (
                  <div className="relative">
                    {/* 横向滚动区域：去除左右安全区，铺满到视口边缘 */}
                    <div
                      ref={(el) => { scrollRefs.current[cat.key] = el }}
                      className="overflow-x-auto mx-[-1.5rem] px-6 pb-2 nice-scroll-x"
                    >
                      <div className="flex gap-6 min-w-max">
                        {cat.ids.map((id) => {
                          const videoKey = `${cat.key}-${id}`
                          const isPlaying = playingVideos[videoKey] || false
                          
                          return (
                            <div
                              key={id}
                              ref={(el) => {
                                cardRefs.current[videoKey] = el
                              }}
                              className="shrink-0 w-auto rounded-2xl border border-border bg-card"
                            >
                              {/* 只展示视频 */}
                              <div
                                className="relative flex-none overflow-hidden rounded-2xl border border-border bg-card shadow-md cursor-pointer group h-[180px] md:h-[280px]"
                                onClick={() => toggleVideo(videoKey)}
                              >
                                <video
                                  ref={(el) => {
                                    videoRefs.current[videoKey] = el
                                  }}
                                  controls
                                  className="w-full h-full object-contain bg-black"
                                  poster={getImageSrc(id, cat.key)}
                                >
                                  <source src={getVideoSrc(id, cat.key)} />
                                </video>
                      
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* 滚动提示 */}
                    {cat.ids.length > 1 && (
                      <div className="text-center mt-4 text-sm text-muted-foreground">
                       
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-border bg-card p-8 text-center">
                    <p className="text-muted-foreground text-sm">Coming soon...</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.5); }
        }
        /* Hide native scrollbar for horizontal rows */
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }

        /* Nice thin horizontal scrollbar - green accent */
        .nice-scroll-x { scrollbar-color: rgba(34, 197, 94, 0.4) transparent; scrollbar-width: thin; }
        .nice-scroll-x::-webkit-scrollbar { height: 6px; }
        .nice-scroll-x::-webkit-scrollbar-track { background: transparent; }
        .nice-scroll-x::-webkit-scrollbar-thumb { background: rgba(34, 197, 94, 0.4); border-radius: 9999px; }
        .nice-scroll-x::-webkit-scrollbar-thumb:hover { background: rgba(34, 197, 94, 0.6); }
      `}</style>
    </section>
  )
}
