"use client"

export function Beams() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      {/* Beam lines */}
      <div className="absolute inset-0">
        {/* Vertical beams */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-accent/20 to-transparent" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-purple-500/15 to-transparent" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500/15 to-transparent" />
        
        {/* Horizontal beams */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/15 to-transparent" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/15 to-transparent" />
      </div>
      
      {/* Glow orbs at intersections */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent/30 rounded-full blur-sm" />
      <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-purple-500/20 rounded-full blur-sm" />
      <div className="absolute top-3/4 left-3/4 w-2 h-2 bg-blue-500/20 rounded-full blur-sm" />
    </div>
  )
}

