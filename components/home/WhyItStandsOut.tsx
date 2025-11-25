import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function WhyItStandsOut() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">Why Infinite Talk AI stands out</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <a href="#multilingual-content" className="glass rounded-2xl p-8 hover:glass-strong hover:scale-[1.02] transition-all duration-300 cursor-pointer group" style={{ borderColor: 'var(--accent)', borderWidth: '2px' }}>
            <h3 className="font-semibold text-xl text-foreground group-hover:text-accent transition-colors">Multilingual to the core</h3>
            <p className="text-muted-foreground text-base mt-3 leading-relaxed">Tested across 500+ languages and dialects in our internal pipeline — that's our current test ceiling, not the model's theoretical limit. Global voices, one pipeline.</p>
          </a>
          <div className="glass rounded-2xl p-8 hover:glass-strong hover:scale-[1.02] transition-all duration-300 group" style={{ borderColor: 'var(--accent)', borderWidth: '2px' }}>
            <h3 className="font-semibold text-xl text-foreground group-hover:text-accent transition-colors">Infinite-length generation</h3>
            <p className="text-muted-foreground text-base mt-3 leading-relaxed">Designed for practically unlimited duration. Today we render up to 600s per pass with overlapping context windows, then batch and stitch chaptered episodes and hour-scale programs while preserving motion continuity.</p>
            <Link href="/lib/infinite-length-streaming-architecture" className="inline-flex items-center gap-2 text-sm font-medium text-accent mt-4 group-hover:gap-3 transition-all">
              <span>Learn how the streaming architecture works</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="glass rounded-2xl p-8 hover:glass-strong hover:scale-[1.02] transition-all duration-300 group" style={{ borderColor: 'var(--accent)', borderWidth: '2px' }}>
            <h3 className="font-semibold text-xl text-foreground group-hover:text-accent transition-colors">Beyond lip sync: sparse-frame, whole-frame dubbing</h3>
            <p className="text-muted-foreground text-base mt-3 leading-relaxed">Traditional video dubbing only edits the mouth region. Infinite Talk AI uses sparse-frame video dubbing to drive lips, head motion, posture, and micro-expressions from audio while referencing keyframes to preserve identity, emotional cadence, and camera trajectories.</p>
            <Link href="/lib/sparse-frame-video-dubbing" className="inline-flex items-center gap-2 text-sm font-medium text-accent mt-4 group-hover:gap-3 transition-all">
              <span>Learn what sparse-frame video dubbing means</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="glass rounded-2xl p-8 hover:glass-strong hover:scale-[1.02] transition-all duration-300 group" style={{ borderColor: 'var(--accent)', borderWidth: '2px' }}>
            <h3 className="font-semibold text-xl text-foreground group-hover:text-accent transition-colors">Fast, high-quality outputs for any platform</h3>
            <p className="text-muted-foreground text-base mt-3 leading-relaxed"> Infinite Talk AI targets 480p / 720p with crisp timing and identity stability, and achieves state-of-the-art lip and body motion synchronization on public dubbing benchmarks compared to systems like MuseTalk, LatentSync, OmniAvatar, and MultiTalk.</p>
            <Link href="/lib/benchmarks" className="inline-flex items-center gap-2 text-sm font-medium text-accent mt-4 group-hover:gap-3 transition-all">
              <span>See metrics and benchmark details</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
