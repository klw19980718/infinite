export default function WhyItStandsOut() {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Why Infinite Talk AI stands out</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          <a href="#multilingual-content" className="rounded-xl border border-border bg-card text-card-foreground p-5 hover:border-accent/50 transition-all cursor-pointer">
            <h3 className="font-semibold text-base">Multilingual to the core</h3>
            <p className="text-muted-foreground text-sm mt-2 leading-relaxed">Tested on 500+ languages and dialects—that's our current test ceiling, not the model's limit. Global voices, one pipeline.</p>
          </a>
          <a href="#infinitetalk" className="rounded-xl border border-border bg-card text-card-foreground p-5 hover:border-accent/50 transition-all cursor-pointer">
            <h3 className="font-semibold text-base">Infinite-length generation</h3>
            <p className="text-muted-foreground text-sm mt-2 leading-relaxed">Designed for unlimited duration. Today we render up to 600s per pass and offer seamless batching & stitching for chaptered episodes and hour-scale programs.</p>
          </a>
          <a href="#shorts" className="rounded-xl border border-border bg-card text-card-foreground p-5 hover:border-accent/50 transition-all cursor-pointer">
            <h3 className="font-semibold text-base">Beyond lip sync: whole-frame dubbing</h3>
            <p className="text-muted-foreground text-sm mt-2 leading-relaxed">Not just mouths. We align lips, head motion, posture, and micro-expressions to speech, so performances feel natural across the entire frame.</p>
          </a>
          <a href="#podcasts" className="rounded-xl border border-border bg-card text-card-foreground p-5 hover:border-accent/50 transition-all cursor-pointer">
            <h3 className="font-semibold text-base">Fast, high-quality outputs for any platform</h3>
            <p className="text-muted-foreground text-sm mt-2 leading-relaxed">Optimized for 480p / 720p / 1080p with crisp timing and identity stability—ready for YouTube, TikTok, ads, podcasts, shorts, explainers, memes, and pro NLEs.</p>
          </a>
        </div>
      </div>
    </section>
  )
}


