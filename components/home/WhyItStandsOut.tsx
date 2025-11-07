export default function WhyItStandsOut() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Why it stands out</h2>
          <p className="text-muted-foreground mt-3">Multilingual production, studio-grade lip sync, and long-form workflow built-in.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <a href="#multilingual-content" className="rounded-xl border border-border bg-card text-card-foreground p-6 hover:border-primary/50 transition cursor-pointer">
            <h3 className="font-semibold text-xl">Multilingual at core</h3>
            <p className="text-muted-foreground mt-2">support multiple languages</p>
          </a>
          <div className="rounded-xl border border-border bg-card text-card-foreground p-6">
            <h3 className="font-semibold text-xl">Accurate Lip Sync</h3>
            <p className="text-muted-foreground mt-2">Frame-level mouth shapes matched to speech.</p>
          </div>
          <div className="rounded-xl border border-border bg-card text-card-foreground p-6">
            <h3 className="font-semibold text-xl">High-quality long-form workflow</h3>
            <p className="text-muted-foreground mt-2">Up to 10 minutes per render, with batching and seamless stitching for chaptered episodes and hour-scale programs.</p>
          </div>
          <div className="rounded-xl border border-border bg-card text-card-foreground p-6">
            <h3 className="font-semibold text-xl">Any format, any platform</h3>
            <p className="text-muted-foreground mt-2">Ads, podcasts, shorts, explainers, memes — ready for social and pro editors.</p>
          </div>
        </div>
      </div>
    </section>
  )
}


