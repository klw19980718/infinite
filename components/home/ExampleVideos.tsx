"use client"

import Image from "next/image"
import { useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"

function AudioBar({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const toggle = () => {
    const el = audioRef.current
    if (!el) return
    if (isPlaying) el.pause(); else el.play()
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/80 backdrop-blur px-3 py-2 flex items-center justify-between">
      <div className="text-[11px] text-blue-300">input Audio</div>
      <button
        type="button"
        onClick={toggle}
        aria-label={isPlaying ? 'Pause input audio' : 'Play input audio'}
        className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-blue-400/40 bg-blue-500/15 hover:bg-blue-500/25 transition"
      >
        {isPlaying ? <Pause className="h-4 w-4 text-blue-300" /> : <Play className="h-4 w-4 text-blue-300" />}
      </button>
      <audio ref={audioRef} src={src} preload="metadata" onEnded={() => setIsPlaying(false)} />
    </div>
  )
}

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
      ids: ["22742", "22810", "22863", "22935", "22947"],
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

  // 音频扩展名映射（注意大小写）
  const audioExtById: Record<string, "mp3" | "wav" | "WAV" | "MP3" | "m4a"> = {
    "22969": "wav", // languages
    "22742": "mp3", // songs
    "22810": "WAV", // songs
    "22863": "wav", // songs
    "22935": "wav", // songs
    "22947": "mp3", // songs
    "22893": "MP3", // cartoons
    "22943": "mp3", // cartoons
    "22960": "mp3", // cartoons
    "22737": "mp3", // ads
    "22953": "m4a", // ads
    "22800": "mp3", // podcasts (blogs)
    "22802": "mp3", // podcasts (blogs)
    "22844": "m4a", // podcasts (blogs)
    "22928": "mp3", // podcasts (blogs)
    "22823": "mp3", // shorts (short-videos)
    "22927": "mp3", // shorts (short-videos)
    "22956": "mp3", // shorts (short-videos)
    "22855": "mp3", // memes (parody)
    "22876": "m4a", // memes (parody)
  }
  
  // 根据分类获取目录路径
  const getCategoryDir = (categoryKey: string) => {
    switch (categoryKey) {
      case "multilingual":
        return "languages"
      case "songs":
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
  
  const getAudioSrc = (id: string, categoryKey: string) => {
    const dir = getCategoryDir(categoryKey)
    const ext = audioExtById[id] ?? "mp3"
    return `https://cdn.infinitetalkai.org/${dir}/infinite-talk-ai-${id}.${ext}`
  }
  const getImageSrc = (id: string, categoryKey: string) => {
    const dir = getCategoryDir(categoryKey)
    return `https://cdn.infinitetalkai.org/${dir}/infinite-talk-ai-${id}.jpg`
  }
  const getVideoSrc = (id: string, categoryKey: string) => {
    const dir = getCategoryDir(categoryKey)
    return `https://cdn.infinitetalkai.org/${dir}/infinite-talk-ai-${id}.mp4`
  }
  const languageEnById: Record<string, string> = {
    "22955": "Hindi",
    "22969": "English",
    "22977": "Japanese",
    "22868": "Chinese",
  }

  const [activeIndexes, setActiveIndexes] = useState<Record<string, number>>(
    categories.reduce((acc, cat) => ({ ...acc, [cat.key]: 0 }), {}),
  )
  const scrollRefs = useRef<Record<string, HTMLDivElement | null>>({})

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
    <section className="relative py-32 md:py-40 bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-slate-950 to-purple-950/50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full blur-3xl"></div>

      <div className="container relative mx-auto px-6 z-10">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Example Videos ·{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Infinite Talk AI
            </span>
          </h2>
          <p className="text-lg text-muted-foreground text-balance leading-relaxed">
            Create any kind of video with Infinite Talk AI / InfiniteTalk AI — studio-grade Lip Sync, natural
            expression, and multilingual publishing for the world's major languages.
          </p>
        </div>

        <div className="space-y-24">
          {categories.map((cat) => {
            const currentIndex = activeIndexes[cat.key] || 0
            const currentId = cat.ids[currentIndex]

            return (
              <div key={cat.key} className="relative" id={cat.key === 'multilingual' ? 'multilingual-content' : undefined}>
                <div className="mb-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{cat.title}</h3>
                  {cat.ids.length > 0 ? (
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-base text-slate-300 flex-1">{cat.description}</p>
                      <div className="hidden sm:flex items-center gap-2">
                        <button
                          aria-label="Scroll left"
                          onClick={() => scrollCategory(cat.key, -1)}
                          className="h-9 w-9 rounded-full border border-slate-800 bg-slate-900/50 hover:border-blue-400/30 hover:bg-blue-500/10 transition"
                        >
                          <ChevronLeft className="mx-auto h-5 w-5 text-slate-300" />
                        </button>
                        <button
                          aria-label="Scroll right"
                          onClick={() => scrollCategory(cat.key, 1)}
                          className="h-9 w-9 rounded-full border border-slate-800 bg-slate-900/50 hover:border-blue-400/30 hover:bg-blue-500/10 transition"
                        >
                          <ChevronRight className="mx-auto h-5 w-5 text-slate-300" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-base text-slate-300 max-w-3xl">{cat.description}</p>
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
                        {cat.ids.map((id) => (
                          <div
                            key={id}
                            className="shrink-0 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-6"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                              {/* 左侧：图片容器，底部浮层为音频 */}
                              <div className="space-y-2">
                                <div className="text-sm font-medium text-slate-400">input Image && audio</div>
                                <div className="relative h-[260px] md:h-[300px] overflow-hidden rounded-xl border border-slate-700 bg-black shadow-lg">
                                  {cat.key === 'multilingual' && languageEnById[id] && (
                                    <div className="absolute top-3 left-3 z-10 rounded-full bg-black/70 text-white text-xs px-2 py-1 border border-white/10">
                                      {languageEnById[id]}
                                    </div>
                                  )}
                                  <Image
                                    src={getImageSrc(id, cat.key) || "/placeholder.svg"}
                                    alt={`input image ${id}`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-contain"
                                  />
                                  <div className="absolute left-3 right-3 bottom-3">
                                    <AudioBar src={getAudioSrc(id, cat.key)} />
                                  </div>
                                </div>
                              </div>

                              {/* 右侧：视频 */}
                              <div className="space-y-2">
                                <div className="text-sm font-medium text-slate-400">Generated Video</div>
                                <div className="relative h-[260px] md:h-[300px] overflow-hidden rounded-xl border border-slate-700 bg-black shadow-lg">
                                  <video
                                    controls
                                    preload="metadata"
                                    className="w-full h-full object-contain bg-black"
                                    poster={getImageSrc(id, cat.key)}
                                  >
                                    <source src={getVideoSrc(id, cat.key)} />
                                  </video>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 滚动提示 */}
                    {cat.ids.length > 1 && (
                      <div className="text-center mt-4 text-sm text-muted-foreground">
                       
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-12 text-center">
                    <p className="text-slate-400">Coming soon...</p>
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

        /* Nice thin horizontal scrollbar - dark theme */
        .nice-scroll-x { scrollbar-color: rgba(59,130,246,0.4) transparent; scrollbar-width: thin; }
        .nice-scroll-x::-webkit-scrollbar { height: 8px; }
        .nice-scroll-x::-webkit-scrollbar-track { background: transparent; }
        .nice-scroll-x::-webkit-scrollbar-thumb { background: linear-gradient(90deg, rgba(59,130,246,0.4), rgba(147,51,234,0.4)); border-radius: 9999px; }
        .nice-scroll-x::-webkit-scrollbar-thumb:hover { background: linear-gradient(90deg, rgba(59,130,246,0.6), rgba(147,51,234,0.6)); }
      `}</style>
    </section>
  )
}
