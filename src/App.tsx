import { useState, useRef, useEffect } from 'react'

// ─── Colour tokens ────────────────────────────────────────────────────────────
const C = {
  cream:      '#F5EFE6',
  sand:       '#E8DCC8',
  sandDark:   '#D4C4A8',
  charcoal:   '#2C2417',
  charcoalMid:'#4A3F30',
  stone:      '#7A6F5E',
  green:      '#4A6741',
  greenLight: '#6B9162',
  greenPale:  '#E8EFE6',
  burgundy:   '#7D3045',
  burgundyPale:'#F5E8EC',
  white:      '#FFFFFF',
  overlay:    'rgba(44,36,23,0.55)',
  arBlue:     '#00C8FF',
  arGreen:    '#00FF88',
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const LANDMARKS = [
  {
    id: 1,
    name: "Cascade Female Factory",
    area: "South Hobart",
    walk: "12 min walk",
    year: "Built 1828",
    accessible: true,
    img: "https://images.unsplash.com/photo-1679222507129-23dc863cbf82?w=600&h=400&fit=crop&auto=format",
    desc: "The Cascade Female Factory stands as one of Australia's most significant convict heritage sites. This sandstone complex housed female convicts and their children during the colonial period, offering a poignant window into the lives of women transported from Britain. The site's austere architecture and preserved yards bear witness to stories of resilience, labour, and survival.",
    category: "Convict Heritage",
  },
  {
    id: 2,
    name: "St George's Church",
    area: "Battery Point",
    walk: "8 min walk",
    year: "Built 1842",
    accessible: false,
    img: "https://images.unsplash.com/photo-1704495779355-b3a29ce86e78?w=600&h=400&fit=crop&auto=format",
    desc: "St George's Church is a fine example of Georgian ecclesiastical architecture in Hobart. Its distinctive sandstone facade and elegant spire have watched over Battery Point for nearly two centuries. The church remains an active place of worship and a treasured landmark of colonial Hobart.",
    category: "Religious Heritage",
  },
  {
    id: 3,
    name: "Salamanca Place",
    area: "Waterfront",
    walk: "5 min walk",
    year: "Built 1835–1860",
    accessible: true,
    img: "https://images.unsplash.com/photo-1763767457338-6c64bfed80b2?w=600&h=400&fit=crop&auto=format",
    desc: "Salamanca Place's iconic sandstone warehouses once stored goods from the whaling and trading industries. Today this vibrant precinct hosts markets, galleries, and restaurants while preserving its authentic colonial mercantile character.",
    category: "Colonial Commerce",
  },
  {
    id: 4,
    name: "Penitentiary Chapel",
    area: "CBD",
    walk: "3 min walk",
    year: "Built 1831",
    accessible: false,
    img: "https://images.unsplash.com/photo-1618354901403-5cf19d375a88?w=600&h=400&fit=crop&auto=format",
    desc: "The Penitentiary Chapel Historic Site encompasses a complex of sandstone buildings including a chapel, cells, and courts. Underground tunnels connect the structures, creating one of Hobart's most atmospheric heritage experiences.",
    category: "Convict Heritage",
  },
  {
    id: 5,
    name: "Narryna Heritage Museum",
    area: "Battery Point",
    walk: "10 min walk",
    year: "Built 1836",
    accessible: true,
    img: "https://images.unsplash.com/photo-1763767458644-090bc283e496?w=600&h=400&fit=crop&auto=format",
    desc: "Narryna is one of Australia's oldest and most complete colonial merchant houses. The Georgian sandstone home and its collection of colonial artefacts offer an intimate portrait of prosperous life in early Van Diemen's Land.",
    category: "Colonial Living",
  },
]

const GALLERY_IMGS = [
  { url: "https://images.unsplash.com/photo-1679222507129-23dc863cbf82?w=800&h=600&fit=crop&auto=format", caption: "Cascade Female Factory", year: "2024", desc: "The main yard where convict women worked daily under strict colonial supervision." },
  { url: "https://images.unsplash.com/photo-1704495405480-9129008ff7cd?w=800&h=600&fit=crop&auto=format", caption: "Stone Tower Gateway", year: "1895 (restored)", desc: "Original gatehouse stones, quarried locally by convict labour in the 1820s." },
  { url: "https://images.unsplash.com/photo-1763767457338-6c64bfed80b2?w=800&h=600&fit=crop&auto=format", caption: "Sandstone Arches", year: "c.1840", desc: "Characteristic colonial sandstone construction visible throughout the precinct." },
  { url: "https://images.unsplash.com/photo-1766030696082-b6e75ae63c8c?w=800&h=600&fit=crop&auto=format", caption: "Heritage Dome & Cupola", year: "c.1860", desc: "Civic architecture reflecting Hobart's ambitions as a prosperous colonial capital." },
]

type Screen =
  | 'home'
  | 'map'
  | 'heritage'
  | 'gallery'
  | 'audio'
  | 'ar-intro'
  | 'ar-camera'
  | 'ar-past'
  | 'ar-nav'
  | 'nav-choice'
  | 'standard-nav'
  | 'print-pack'
  | 'weather'

// ─── Icons ────────────────────────────────────────────────────────────────────
function IconAR() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 8V5a2 2 0 012-2h3M2 16v3a2 2 0 002 2h3M16 2h3a2 2 0 012 2v3M16 22h3a2 2 0 002-2v-3"/>
      <path d="M12 8l4 2-4 2-4-2z"/><path d="M8 10v4l4 2 4-2v-4"/>
    </svg>
  )
}
function IconMap() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
      <line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/>
    </svg>
  )
}
function IconDiscover() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/>
      <line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/>
      <line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/>
    </svg>
  )
}
function IconWeather() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/>
      <line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/>
      <line x1="4.22" y1="4.22" x2="7.05" y2="7.05"/><line x1="16.95" y1="16.95" x2="19.78" y2="19.78"/>
      <line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>
      <line x1="4.22" y1="19.78" x2="7.05" y2="16.95"/><line x1="16.95" y1="7.05" x2="19.78" y2="4.22"/>
    </svg>
  )
}
function IconChevronLeft() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
}
function IconPlay() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21"/></svg>
}
function IconPause() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
}
function IconVolume({ muted = false }: { muted?: boolean }) {
  return muted
    ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
    : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
}

// ─── Bottom Navigation ────────────────────────────────────────────────────────
function BottomNav({ active, onNav }: { active: string; onNav: (s: Screen) => void }) {
  const tabs = [
    { id: 'home'    as Screen, label: 'Explore', icon: <IconDiscover /> },
    { id: 'map'     as Screen, label: 'Map', icon: <IconMap /> },
    { id: 'weather' as Screen, label: 'Weather', icon: <IconWeather /> },
  ]
  return (
    <div style={{ background: C.white, borderTop: `1px solid ${C.sand}`, padding: '8px 0 12px', display: 'flex', justifyContent: 'space-around' }}>
      {tabs.map(t => {
        const isActive = active === t.id || (t.id === 'home' && active === 'home')
        return (
          <button key={t.id} onClick={() => onNav(t.id)}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, background: 'none', border: 'none', cursor: 'pointer',
              color: isActive ? C.burgundy : C.stone, padding: '4px 12px', minWidth: 60 }}>
            <span style={{ opacity: isActive ? 1 : 0.6 }}>{t.icon}</span>
            <span style={{ fontSize: 10, fontWeight: isActive ? 600 : 400, fontFamily: 'Inter, sans-serif' }}>{t.label}</span>
            {isActive && <div style={{ width: 4, height: 4, borderRadius: '50%', background: C.burgundy, marginTop: 1 }} />}
          </button>
        )
      })}
    </div>
  )
}

// ─── Screen: Home ─────────────────────────────────────────────────────────────
function HomeScreen({ onNav, onLandmark, likes = { 1: 248, 2: 196, 3: 181, 4: 143, 5: 126 } }: { onNav: (s: Screen) => void; onLandmark: (id: number) => void; likes?: Record<number, number> }) {
  const [carouselIdx, setCarouselIdx] = useState(0)
  const [activeFilter, setActiveFilter] = useState('All')
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const carouselRef = useRef<HTMLDivElement>(null)
  const dragState = useRef({ active: false, startX: 0, startScroll: 0, moved: false })
  const filters = ['All', 'Convict', 'Religious', 'Colonial', 'Waterfront']
  const filteredLandmarks = LANDMARKS.filter(l => activeFilter === 'All' || `${l.category} ${l.area}`.toLowerCase().includes(activeFilter.toLowerCase()))
  const topLandmarks = [...filteredLandmarks].sort((a,b) => likes[b.id] - likes[a.id])

  function moveCarousel(index: number) {
    const next = Math.max(0, Math.min(topLandmarks.length - 1, index))
    const track = carouselRef.current
    const card = track?.children[next] as HTMLElement | undefined
    if (track && card) track.scrollTo({ left: card.offsetLeft - 20, behavior: 'smooth' })
    setCarouselIdx(next)
  }

  function updateCarouselIndex() {
    const track = carouselRef.current
    if (!track) return
    const cards = Array.from(track.children) as HTMLElement[]
    const closest = cards.reduce((best, card, i) =>
      Math.abs(card.offsetLeft - 20 - track.scrollLeft) < Math.abs(cards[best].offsetLeft - 20 - track.scrollLeft) ? i : best, 0)
    setCarouselIdx(closest)
  }

  function startCarouselDrag(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    dragState.current = { active: true, startX: e.clientX, startScroll: carouselRef.current?.scrollLeft || 0, moved: false }
  }

  function dragCarousel(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragState.current.active || !carouselRef.current) return
    const delta = e.clientX - dragState.current.startX
    if (Math.abs(delta) > 18) dragState.current.moved = true
    carouselRef.current.scrollLeft = dragState.current.startScroll - delta
  }

  function endCarouselDrag(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragState.current.active) return
    dragState.current.active = false
    updateCarouselIndex()
  }

  return (
    <div style={{ flex: 1, overflowY: 'auto', background: C.cream }}>
      {/* Header */}
      <div style={{ background: C.white, padding: '16px 20px 0', borderBottom: `1px solid ${C.sand}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
          <div>
            <p style={{ margin: 0, fontSize: 12, color: C.stone, fontFamily: 'Inter' }}>Hobart, Tasmania</p>
            <h1 style={{ margin: 0, fontSize: 20, fontFamily: 'Lora, serif', fontWeight: 700, color: C.charcoal }}>Heritage Guide</h1>
          </div>
          <button aria-label="Search heritage sites" onClick={() => setSearchOpen(v => !v)} style={{ width: 40, height: 40, borderRadius: '50%', border: 0, cursor: 'pointer', background: searchOpen ? C.burgundy : C.sand, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.charcoalMid} strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </button>
        </div>

        {searchOpen && <div style={{ position: 'relative', marginTop: 10 }}>
          <span style={{ position: 'absolute', left: 12, top: 10, color: C.stone }}>⌕</span>
          <input autoFocus value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search by place, area or heritage type"
            style={{ width: '100%', boxSizing: 'border-box', padding: '10px 34px', borderRadius: 11, border: `1.5px solid ${C.burgundy}`, outline: 'none', font: '12px Inter', color: C.charcoal }} />
          {searchQuery && <div style={{ position: 'absolute', zIndex: 20, left: 0, right: 0, top: 44, background: C.white, border: `1px solid ${C.sand}`, borderRadius: 11, boxShadow: '0 8px 24px #0002', overflow: 'hidden' }}>
            {LANDMARKS.filter(l => `${l.name} ${l.area} ${l.category}`.toLowerCase().includes(searchQuery.toLowerCase())).map(l =>
              <button key={l.id} onClick={() => onLandmark(l.id)} style={{ width: '100%', textAlign: 'left', padding: '10px 12px', border: 0, borderBottom: `1px solid ${C.sand}`, background: C.white, cursor: 'pointer', font: '12px Inter' }}><strong>{l.name}</strong><br/><span style={{ color: C.stone }}>{l.area} · {l.category}</span></button>)}
            {!LANDMARKS.some(l => `${l.name} ${l.area} ${l.category}`.toLowerCase().includes(searchQuery.toLowerCase())) && <p style={{ padding: 12, margin: 0, color: C.stone, font: '12px Inter' }}>No matching heritage sites</p>}
          </div>}
        </div>}

        {/* Filter chips */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '12px 0 14px' }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              style={{ flexShrink: 0, padding: '5px 14px', borderRadius: 20, border: `1.5px solid ${activeFilter === f ? C.burgundy : C.sand}`,
                background: activeFilter === f ? C.burgundy : C.white, color: activeFilter === f ? C.white : C.charcoalMid,
                fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter' }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Top 5 Carousel */}
      <div style={{ background: C.white, paddingBottom: 16, borderBottom: `1px solid ${C.sand}` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px 10px' }}>
          <h2 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: C.charcoal, fontFamily: 'Lora, serif', letterSpacing: '0.02em' }}>Top 5 Heritages</h2>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => moveCarousel(carouselIdx - 1)} aria-label="Previous heritage site"
              style={{ width: 28, height: 28, borderRadius: '50%', border: `1px solid ${C.sand}`, background: C.white, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.charcoalMid }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button onClick={() => moveCarousel(carouselIdx + 1)} aria-label="Next heritage site"
              style={{ width: 28, height: 28, borderRadius: '50%', border: `1px solid ${C.sand}`, background: C.white, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.charcoalMid }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>

        <div style={{ overflow: 'hidden', position: 'relative' }}>
          <div ref={carouselRef} onScroll={updateCarouselIndex} onPointerDown={startCarouselDrag} onPointerMove={dragCarousel} onPointerUp={endCarouselDrag} onPointerCancel={endCarouselDrag}
            style={{ display: 'flex', overflowX: 'auto', scrollSnapType: 'x mandatory', scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch', touchAction: 'pan-y', padding: '0 20px', gap: 10, cursor: dragState.current.active ? 'grabbing' : 'grab', userSelect: 'none' }}>
            {topLandmarks.map((lm, i) => (
              <div key={lm.id} onClick={() => { if (!dragState.current.moved) onLandmark(lm.id) }}
                style={{ flexShrink: 0, width: '82%', scrollSnapAlign: 'center', borderRadius: 14, overflow: 'hidden', cursor: 'grab', boxShadow: '0 2px 12px rgba(44,36,23,0.12)', border: `1px solid ${C.sand}` }}>
                <div style={{ position: 'relative', height: 160 }}>
                  <img src={lm.img} alt={lm.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(44,36,23,0.75) 0%, transparent 55%)' }} />
                  <div style={{ position: 'absolute', bottom: 12, left: 14, right: 14 }}>
                    <div style={{ background: C.burgundy, color: C.white, fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 10, display: 'inline-block', marginBottom: 5, fontFamily: 'Inter' }}>{lm.category}</div>
                    <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: C.white, fontFamily: 'Lora, serif' }}>{lm.name}</h3>
                  </div>
                  <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(255,255,255,0.9)', borderRadius: 8, padding: '3px 8px', fontSize: 11, fontWeight: 600, color: C.charcoal, fontFamily: 'Inter' }}>#{i + 1}</div>
                </div>
                <div style={{ padding: '10px 14px 12px', background: C.white, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ margin: 0, fontSize: 12, color: C.stone, fontFamily: 'Inter' }}>{lm.area} • {lm.walk}</p>
                  </div>
                  {lm.accessible && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: C.green, fontWeight: 600, fontFamily: 'Inter' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77"/></svg>
                      Accessible
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 10 }}>
          {topLandmarks.map((_, i) => (
            <div key={i} onClick={() => moveCarousel(i)}
              style={{ width: carouselIdx === i ? 16 : 6, height: 6, borderRadius: 3, background: carouselIdx === i ? C.burgundy : C.sandDark, transition: 'all 0.2s', cursor: 'pointer' }} />
          ))}
        </div>
      </div>

      {/* Landmark Grid */}
      <div style={{ padding: '16px 20px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <h2 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: C.charcoal, fontFamily: 'Lora, serif' }}>All Heritage Sites</h2>
          <span style={{ fontSize: 12, color: C.stone, fontFamily: 'Inter' }}>{filteredLandmarks.length} sites</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {filteredLandmarks.map(lm => (
            <div key={lm.id} onClick={() => onLandmark(lm.id)}
              style={{ borderRadius: 12, overflow: 'hidden', cursor: 'pointer', boxShadow: '0 1px 8px rgba(44,36,23,0.10)', border: `1px solid ${C.sand}`, background: C.white }}>
              <div style={{ height: 100, overflow: 'hidden', position: 'relative' }}>
                <img src={lm.img} alt={lm.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: 6, right: 6, background: C.burgundy, color: C.white, borderRadius: 12, padding: '3px 7px', font: '700 10px Inter' }}>♥ {likes[lm.id]}</div>
              </div>
              <div style={{ padding: '8px 10px 10px' }}>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: C.charcoal, fontFamily: 'Lora, serif', lineHeight: 1.3 }}>{lm.name}</p>
                <p style={{ margin: '3px 0 0', fontSize: 10, color: C.stone, fontFamily: 'Inter' }}>{lm.area} • {lm.walk}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const WAYPOINTS = [
  ['🚻', 'Public Toilet', '2 min detour'], ['☕', 'Coffee Shop', '4 min detour'],
  ['①', 'Attraction 1 · Salamanca Place', '7 min detour'], ['②', "Attraction 2 · St George's Church", '3 min detour'],
  ['③', 'Attraction 3 · Narryna Museum', '6 min detour'], ['📚', 'State Library', '8 min detour'],
]

function WaypointPicker({ onClose, onAdd }: { onClose: () => void; onAdd: (name: string) => void }) {
  const [pending, setPending] = useState<string | null>(null)
  return <div style={{ position: 'absolute', inset: 0, zIndex: 50, background: 'rgba(20,17,13,.48)', display: 'flex', alignItems: 'flex-end' }}>
    <div style={{ width: '100%', background: C.white, borderRadius: '22px 22px 0 0', padding: '15px 18px 22px', maxHeight: '72%', overflowY: 'auto' }}>
      <div style={{ width: 42, height: 4, background: C.sandDark, borderRadius: 3, margin: '0 auto 13px' }}/>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}><div><strong style={{ font: '700 17px Lora' }}>Add a waypoint</strong><p style={{ margin: '3px 0 12px', color: C.stone, font: '11px Inter' }}>Choose a useful stop along your route.</p></div><button onClick={onClose} style={{ border: 0, background: C.sand, borderRadius: 8, height: 30, width: 30 }}>×</button></div>
      {WAYPOINTS.map(([icon,name,time]) => <button key={name} onClick={() => setPending(name)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 11, padding: 11, marginBottom: 7, borderRadius: 11, border: `1.5px solid ${pending === name ? C.burgundy : C.sand}`, background: pending === name ? C.burgundyPale : C.white, cursor: 'pointer', textAlign: 'left' }}><span style={{ fontSize: 19, width: 26 }}>{icon}</span><span style={{ flex: 1, font: '600 12px Inter' }}>{name}</span><span style={{ color: C.stone, font: '10px Inter' }}>{time}</span></button>)}
      {pending && <div style={{ background: C.greenPale, padding: 12, borderRadius: 11, marginTop: 10 }}><strong style={{ font: '700 12px Inter' }}>Add this as a waypoint?</strong><p style={{ margin: '4px 0 10px', color: C.stone, font: '11px Inter' }}>{pending} will be inserted before your destination.</p><div style={{ display: 'flex', gap: 8 }}><button onClick={() => setPending(null)} style={{ flex: 1, padding: 9, borderRadius: 9, border: `1px solid ${C.sand}`, background: C.white }}>Not now</button><button onClick={() => onAdd(pending)} style={{ flex: 1, padding: 9, borderRadius: 9, border: 0, background: C.green, color: C.white, fontWeight: 700 }}>Add waypoint</button></div></div>}
    </div>
  </div>
}

// ─── Screen: Map ──────────────────────────────────────────────────────────────
function MapScreen({ onNav, onLandmark }: { onNav: (s: Screen) => void; onLandmark: (id: number) => void }) {
  const [selectedRoute, setSelectedRoute] = useState<'normal' | 'accessible' | 'steep'>('normal')
  const [soundOn, setSoundOn] = useState(true)
  const [selectedPin, setSelectedPin] = useState<number | null>(null)
  const [waypoints, setWaypoints] = useState<string[]>([])
  const [showWaypoints, setShowWaypoints] = useState(false)
  const [selectedWaypointIndex, setSelectedWaypointIndex] = useState<number | null>(null)
  const [editingWaypointIndex, setEditingWaypointIndex] = useState<number | null>(null)
  const [routeExpanded, setRouteExpanded] = useState(true)
  const [detailExpanded, setDetailExpanded] = useState(true)
  const [online, setOnline] = useState(true)
  const [networkHint, setNetworkHint] = useState(false)
  const [locationHint, setLocationHint] = useState(false)
  const [soundHint, setSoundHint] = useState(false)
  const lm = LANDMARKS[selectedPin !== null ? selectedPin - 1 : 0]

  const routes = [
    { key: 'normal'     as const, label: 'Normal Route',     time: '8 mins',  color: C.burgundy },
    { key: 'accessible' as const, label: 'Accessible Route', time: '14 mins', color: C.green },
    { key: 'steep'      as const, label: 'Steep Route',      time: '5 mins',  color: '#B5631A' },
  ]

  const pins = [
    { id: 1, x: 52, y: 28 },
    { id: 2, x: 72, y: 42 },
    { id: 3, x: 35, y: 55 },
    { id: 4, x: 60, y: 70 },
    { id: 5, x: 25, y: 38 },
  ]

  const routeColor = routes.find(r => r.key === selectedRoute)?.color || C.burgundy
  const destinations = [{ x: 185, y: 60 }, { x: 280, y: 120 }, { x: 135, y: 150 }, { x: 235, y: 235 }, { x: 95, y: 105 }]
  const destination = destinations[(selectedPin || 1) - 1]
  const waypointPositions = [{ x: 245, y: 150 }, { x: 165, y: 205 }, { x: 285, y: 245 }, { x: 120, y: 110 }]
  const activeWaypointPositions = waypointPositions.slice(0, waypoints.length)
  const routePath = waypoints.length ? `M85,310 ${activeWaypointPositions.map(p => `L${p.x},${p.y}`).join(' ')} L${destination.x},${destination.y}` : `M85,310 Q135,220 ${destination.x},${destination.y}`
  const waypointTimes = waypoints.map(name => ({ name, minutes: parseInt(WAYPOINTS.find(w => w[1] === name)?.[2] || '0') }))
  const totalWaypointMinutes = waypointTimes.reduce((sum, stop) => sum + stop.minutes, 0)

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: C.cream, overflow: 'hidden', position: 'relative' }}>
      {/* Map area */}
      <div style={{ flex: 1, position: 'relative', background: '#EDE8E0', overflow: 'hidden' }}>
        {/* Simulated map streets */}
        <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
          {/* Streets */}
          <path d="M0,120 Q180,100 390,130" stroke="#C8C0B0" strokeWidth="18" fill="none"/>
          <path d="M50,0 Q120,180 160,380" stroke="#C8C0B0" strokeWidth="14" fill="none"/>
          <path d="M200,0 Q220,160 180,380" stroke="#D4CEC4" strokeWidth="10" fill="none"/>
          <path d="M0,200 Q200,180 390,220" stroke="#D4CEC4" strokeWidth="10" fill="none"/>
          <path d="M100,380 Q220,280 390,260" stroke="#C8C0B0" strokeWidth="14" fill="none"/>
          {/* Street labels */}
          <text x="30" y="115" fontSize="9" fill="#A09585" fontFamily="Inter" transform="rotate(-5,30,115)">Degraves St</text>
          <text x="210" y="175" fontSize="9" fill="#A09585" fontFamily="Inter" transform="rotate(-5,210,175)">Apsley St</text>
          <text x="70" y="270" fontSize="9" fill="#A09585" fontFamily="Inter" transform="rotate(-30,70,270)">Hobart Rivulet</text>
          <text x="200" y="355" fontSize="9" fill="#A09585" fontFamily="Inter">Cascade Rd</text>
          {/* Route path */}
          <path d={routePath} stroke="white" strokeWidth="8" fill="none" opacity=".85"/>
          <path d={routePath} stroke={routeColor} strokeWidth="4" strokeDasharray={selectedRoute === 'steep' ? undefined : selectedRoute === 'accessible' ? '4,3' : '8,5'} fill="none" opacity="0.95"/>
          {/* Destination is always red; an added waypoint is green and reroutes the line. */}
          <circle cx={destination.x} cy={destination.y} r="10" fill="#C43D45" stroke="white" strokeWidth="4"/>
          {activeWaypointPositions.map((p,i) => <g key={i} onClick={() => { setSelectedWaypointIndex(i); setRouteExpanded(false) }} style={{ cursor: 'pointer' }}><circle cx={p.x} cy={p.y} r="14" fill={C.green} stroke="white" strokeWidth="4"/><text x={p.x} y={p.y + 4} textAnchor="middle" fill="white" fontSize="11" fontWeight="700" style={{ pointerEvents: 'none' }}>{i + 1}</text></g>)}
        </svg>

        {/* POI pins */}
        {pins.map(pin => (
          <button key={pin.id} onClick={() => setSelectedPin(pin.id === selectedPin ? null : pin.id)}
            style={{ position: 'absolute', left: `${pin.x}%`, top: `${pin.y}%`, transform: 'translate(-50%,-100%)',
              background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <div style={{ position: 'relative' }}>
              {selectedPin === pin.id && (
                <div style={{ position: 'absolute', top: -4, left: -4, right: -4, bottom: -4, borderRadius: '50%', border: `2px solid ${C.burgundy}`, animation: 'pulse-ring 1.5s infinite' }} />
              )}
              <div style={{ width: 28, height: 28, borderRadius: '50% 50% 50% 0', transform: 'rotate(-45deg)', background: selectedPin === pin.id ? C.burgundy : C.charcoal, border: `2px solid ${C.white}`, boxShadow: '0 2px 6px rgba(0,0,0,0.25)' }}>
                <div style={{ transform: 'rotate(45deg)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.white }} />
                </div>
              </div>
            </div>
          </button>
        ))}

        {/* User location */}
        <div style={{ position: 'absolute', left: '22%', top: '80%', transform: 'translate(-50%,-50%)' }}>
          <div style={{ position: 'relative', width: 20, height: 20 }}>
            <div style={{ position: 'absolute', inset: -6, borderRadius: '50%', background: 'rgba(125,48,69,0.2)', animation: 'pulse-ring 2s infinite' }} />
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: C.burgundy, border: `3px solid ${C.white}`, boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }} />
          </div>
        </div>
        {selectedWaypointIndex !== null && waypoints[selectedWaypointIndex] && <div style={{ position: 'absolute', top: 188, left: 70, right: 70, zIndex: 12, background: C.white, borderRadius: 12, padding: 12, boxShadow: '0 8px 24px #0003', border: `2px solid ${C.green}` }}><strong style={{ display: 'block', font: '700 12px Inter', color: C.green }}>Stop {selectedWaypointIndex + 1}: {waypoints[selectedWaypointIndex]}</strong><p style={{ margin: '4px 0 10px', color: C.stone, font: '10px Inter' }}>Modify or remove this waypoint.</p><div style={{ display: 'flex', gap: 8 }}><button onClick={() => { setEditingWaypointIndex(selectedWaypointIndex); setSelectedWaypointIndex(null); setShowWaypoints(true) }} style={{ flex: 1, padding: 8, borderRadius: 8, border: `1px solid ${C.green}`, background: C.greenPale, color: C.green, fontWeight: 700 }}>Edit</button><button onClick={() => { setWaypoints(list => list.filter((_,i) => i !== selectedWaypointIndex)); setSelectedWaypointIndex(null) }} style={{ flex: 1, padding: 8, borderRadius: 8, border: 0, background: C.burgundy, color: C.white, fontWeight: 700 }}>Delete</button><button onClick={() => setSelectedWaypointIndex(null)} style={{ padding: 8, borderRadius: 8, border: `1px solid ${C.sand}`, background: C.white }}>×</button></div></div>}

        {/* Controls overlay */}
        <div style={{ position: 'absolute', top: 14, left: 14, display: 'flex', gap: 8 }}>
          <button onClick={() => { setSoundOn(v => !v); setSoundHint(true); setTimeout(() => setSoundHint(false), 1800) }}
            style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(255,255,255,0.92)', border: `1px solid ${C.sand}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.charcoal }}>
            <IconVolume muted={!soundOn} />
          </button>
          <button onClick={() => setShowWaypoints(true)}
            style={{ height: 38, borderRadius: 10, background: waypoints.length ? C.green : 'rgba(255,255,255,0.92)', border: `1px solid ${waypoints.length ? C.green : C.sand}`, cursor: 'pointer', padding: '0 12px', color: waypoints.length ? C.white : C.charcoal, fontSize: 11, fontWeight: 700, fontFamily: 'Inter' }}>
            {waypoints.length ? `+ Add Stop (${waypoints.length})` : '+ Add Stop'}
          </button>
        </div>
        {soundHint && <div style={{ position: 'absolute', top: 58, left: 14, background: C.charcoal, color: C.white, borderRadius: 8, padding: '6px 9px', font: '10px Inter' }}>Navigation voice {soundOn ? 'on' : 'off'}</div>}
        <div style={{ position: 'absolute', top: 14, right: 14, display: 'flex', gap: 8 }}>
          <button onClick={() => { setOnline(v => !v); setNetworkHint(true); setTimeout(() => setNetworkHint(false), 1800) }} aria-label={online ? 'Go offline' : 'Go online'}
            style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(255,255,255,0.92)', border: `1px solid ${C.sand}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.charcoal }}>
            {online ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0"/><circle cx="12" cy="20" r="1" fill="currentColor"/></svg> : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 1l22 22M8.5 8.5a11 11 0 0110.58 4.05M5 12.55a11 11 0 012.2-1.35M1.42 9a16 16 0 014.1-2.55M8.53 16.11a6 6 0 016.95 0"/><circle cx="12" cy="20" r="1" fill="currentColor"/></svg>}
          </button>
          <button onClick={() => { setLocationHint(true); setTimeout(() => setLocationHint(false), 2200) }} style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(255,255,255,0.92)', border: `1px solid ${C.sand}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.charcoal }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88"/></svg>
          </button>
        </div>
        {(locationHint || networkHint) && <div style={{ position: 'absolute', top: 58, right: 14, background: C.charcoal, color: C.white, borderRadius: 8, padding: '6px 9px', font: '10px Inter' }}>{locationHint ? 'Current location centred' : online ? 'Online map' : 'Offline map ready'}</div>}
      </div>

      {/* Bottom sheet */}
      {selectedPin !== null ? (
        <div style={{ background: C.white, borderRadius: '20px 20px 0 0', boxShadow: '0 -4px 20px rgba(44,36,23,0.12)', padding: '14px 20px 20px' }}>
          <div onClick={() => setDetailExpanded(v => !v)} title={detailExpanded ? 'Collapse details' : 'Expand details'} style={{ width: 58, height: 8, background: C.sandDark, borderRadius: 5, margin: '0 auto 14px', cursor: 'pointer' }} />
          {!detailExpanded ? <button onClick={() => setDetailExpanded(true)} style={{ width: '100%', border: 0, background: 'transparent', padding: '2px 0 4px', textAlign: 'left', cursor: 'pointer' }}><strong style={{ font: '700 13px Lora', color: C.charcoal }}>{lm.name}</strong><span style={{ float: 'right', color: C.stone, font: '11px Inter' }}>Expand details⌃</span></button> : <>
          <div style={{ display: 'flex', gap: 12 }}>
            <img src={lm.img} alt={lm.name} style={{ width: 72, height: 72, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: C.charcoal, fontFamily: 'Lora, serif' }}>{lm.name}</h3>
              <p style={{ margin: '4px 0 0', fontSize: 11, color: C.stone, fontFamily: 'Inter' }}>{lm.area} • {lm.walk}</p>
              {waypointTimes.length > 0 && <div style={{ marginTop: 6 }}>{waypointTimes.map((stop,i) => <p key={stop.name} style={{ margin: '2px 0', fontSize: 10, color: C.green, fontFamily: 'Inter', fontWeight: 600 }}>● Stop {i + 1}: {stop.name} · +{stop.minutes} min</p>)}<p style={{ margin: '4px 0 0', fontSize: 11, color: C.green, fontFamily: 'Inter', fontWeight: 800 }}>Total waypoint time: +{totalWaypointMinutes} min</p></div>}
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            <p style={{ margin: '0 0 7px', color: C.stone, font: '700 10px Inter', letterSpacing: '.06em' }}>ROUTE DIFFICULTY</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
              {routes.map(route => <button key={route.key} onClick={() => setSelectedRoute(route.key)} style={{ padding: '8px 3px', borderRadius: 9, border: `1.5px solid ${selectedRoute === route.key ? route.color : C.sand}`, background: selectedRoute === route.key ? `${route.color}14` : C.white, color: selectedRoute === route.key ? route.color : C.stone, cursor: 'pointer' }}><span style={{ display: 'block', font: '700 10px Inter' }}>{route.key === 'normal' ? 'Normal' : route.key === 'accessible' ? 'Accessible' : 'Steep'}</span><span style={{ display: 'block', marginTop: 2, font: '9px Inter' }}>{route.time}</span></button>)}
            </div>
          </div>
          {selectedRoute === 'accessible' && <div style={{ marginTop: 9, background: C.greenPale, borderRadius: 9, padding: '8px 10px', border: `1px solid ${C.greenLight}40` }}><p style={{ margin: 0, color: C.green, font: '600 10px/1.5 Inter' }}>♿ Wheelchair-friendly · Lower gradient · Step-free where possible · Recommended for wet conditions.</p></div>}
          {selectedRoute === 'steep' && <div style={{ marginTop: 9, background: '#FFF3E8', borderRadius: 9, padding: '8px 10px', border: '1px solid #B5631A35' }}><p style={{ margin: 0, color: '#B5631A', font: '600 10px/1.5 Inter' }}>⚠ Steep gradient · Stairs possible · Higher physical effort.</p></div>}
          <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
            {[
              { label: 'View Heritage', action: () => onLandmark(lm.id), primary: true },
              { label: 'Navigate', action: () => onNav('nav-choice'), primary: false },
            ].map(btn => (
              <button key={btn.label} onClick={btn.action}
                style={{ flex: 1, padding: '9px 4px', borderRadius: 10, border: `1.5px solid ${btn.primary ? C.burgundy : C.sand}`,
                  background: btn.primary ? C.burgundy : C.white, color: btn.primary ? C.white : C.charcoal,
                  fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter' }}>
                {btn.label}
              </button>
            ))}
          </div>
          </>}
        </div>
      ) : (
        <div style={{ background: C.white, borderRadius: '20px 20px 0 0', boxShadow: '0 -4px 20px rgba(44,36,23,0.12)', padding: '14px 20px 20px' }}>
          <div style={{ width: 40, height: 4, background: C.sand, borderRadius: 2, margin: '0 auto 14px' }} />
          {!routeExpanded ? <button onClick={() => { setRouteExpanded(true); setSelectedWaypointIndex(null) }} style={{ width: '100%', padding: '12px', borderRadius: 11, border: `1.5px solid ${C.burgundy}`, background: C.white, color: C.burgundy, font: '700 13px Inter', cursor: 'pointer' }}>Choose Route⌃</button> : <>
          <button onClick={() => setRouteExpanded(false)} style={{ width: '100%', textAlign: 'left', margin: '0 0 12px', padding: 0, border: 0, background: 'transparent', fontSize: 12, fontWeight: 700, color: C.stone, fontFamily: 'Inter', textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer' }}>Choose Route⌄</button>
          {routes.map(route => <button key={route.key} onClick={() => setSelectedRoute(route.key)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '11px 16px', borderRadius: 12, border: `2px solid ${selectedRoute === route.key ? route.color : C.sand}`, background: selectedRoute === route.key ? `${route.color}12` : C.white, cursor: 'pointer', marginBottom: 8, transition: 'all .2s' }}><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: selectedRoute === route.key ? route.color : C.sandDark }}/><span style={{ font: `${selectedRoute === route.key ? 700 : 500} 13px Inter`, color: selectedRoute === route.key ? route.color : C.charcoal }}>{route.label}</span></div><span style={{ font: '600 13px Inter', color: selectedRoute === route.key ? route.color : C.stone }}>{route.time}</span></button>)}
          {selectedRoute === 'accessible' && (
            <div style={{ background: C.greenPale, borderRadius: 10, padding: '10px 14px', border: `1px solid ${C.greenLight}30` }}>
              <p style={{ margin: 0, fontSize: 11, color: C.green, fontFamily: 'Inter', lineHeight: 1.6 }}>♿ Wheelchair-friendly · Lower gradient · Step-free where possible</p>
            </div>
          )}
          {selectedRoute === 'steep' && (
            <div style={{ background: '#FFF3E8', borderRadius: 10, padding: '10px 14px', border: '1px solid #B5631A30' }}>
              <p style={{ margin: 0, fontSize: 11, color: '#B5631A', fontFamily: 'Inter', lineHeight: 1.6 }}>⚠️ Steep gradient · Stairs possible · Higher physical effort</p>
            </div>
          )}
          {waypoints.length > 0 && <div style={{ background: C.greenPale, borderRadius: 10, padding: '8px 10px', border: `1px solid ${C.greenLight}40`, marginBottom: 8 }}>{waypoints.map((name,i) => <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '3px 0', font: '600 10px Inter', color: C.green }}><span style={{ width: 17, height: 17, borderRadius: '50%', background: C.green, color: C.white, display: 'grid', placeItems: 'center' }}>{i + 1}</span><span style={{ flex: 1 }}>{name}</span><button onClick={() => setWaypoints(list => list.filter(x => x !== name))} style={{ border: 0, background: 'transparent', color: C.green, cursor: 'pointer' }}>×</button></div>)}</div>}
          <button onClick={() => onNav('nav-choice')}
            style={{ width: '100%', padding: '12px', borderRadius: 12, background: C.burgundy, border: 'none', color: C.white, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter' }}>
            Continue to Navigation
          </button>
          </>}
        </div>
      )}
      {showWaypoints && <WaypointPicker onClose={() => { setShowWaypoints(false); setEditingWaypointIndex(null) }} onAdd={name => { setWaypoints(list => editingWaypointIndex !== null ? list.map((item,i) => i === editingWaypointIndex ? name : item) : list.includes(name) ? list : [...list, name].slice(0, 4)); setShowWaypoints(false); setEditingWaypointIndex(null) }} />}
    </div>
  )
}

// ─── Screen: Heritage Details ─────────────────────────────────────────────────
function HeritageScreen({ landmark, onBack, onNav, liked, likeCount, onToggleLike }: { landmark: typeof LANDMARKS[0]; onBack: () => void; onNav: (s: Screen) => void; liked: boolean; likeCount: number; onToggleLike: () => void }) {
  const [galleryIdx, setGalleryIdx] = useState(0)
  return (
    <div style={{ flex: 1, overflowY: 'auto', background: C.cream }}>
      {/* Hero image */}
      <div style={{ position: 'relative', height: 240 }}>
        <img src={landmark.img} alt={landmark.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(44,36,23,0.35) 0%, transparent 40%, rgba(44,36,23,0.4) 100%)' }} />
        <button onClick={onBack}
          style={{ position: 'absolute', top: 14, left: 14, width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.charcoal }}>
          <IconChevronLeft />
        </button>
        <div style={{ position: 'absolute', top: 14, right: 14, background: C.burgundy, color: C.white, fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 8, fontFamily: 'Inter', letterSpacing: '0.05em' }}>
          {landmark.category}
        </div>
        <div style={{ position: 'absolute', bottom: 14, left: 20, right: 20 }}>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: C.white, fontFamily: 'Lora, serif', textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}>{landmark.name}</h1>
          <p style={{ margin: '4px 0 0', fontSize: 12, color: 'rgba(255,255,255,0.85)', fontFamily: 'Inter' }}>Historic Site • {landmark.year} • {landmark.area}</p>
        </div>
      </div>

      <div style={{ padding: '20px 20px 0' }}>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75, color: C.charcoalMid, fontFamily: 'Inter' }}>{landmark.desc}</p>
      </div>

      {/* Action buttons */}
      <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {[
          { label: '↗ Navigate', action: () => onNav('map'), primary: true, full: true },
          { label: '▶ Audio Tour',   action: () => onNav('audio'), primary: false },
          { label: `${liked ? '♥' : '♡'} ${likeCount} Likes`, action: onToggleLike, primary: false },
        ].map((btn, i) => (
          <button key={btn.label} onClick={btn.action}
            style={{ gridColumn: btn.full ? '1 / -1' : undefined,
              padding: btn.full ? '14px' : '11px',
              borderRadius: 12,
              border: `1.5px solid ${btn.primary ? C.burgundy : C.sand}`,
              background: btn.primary ? C.burgundy : C.white,
              color: btn.primary ? C.white : C.charcoal,
              fontSize: btn.full ? 14 : 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter',
              boxShadow: btn.primary ? '0 3px 12px rgba(125,48,69,0.3)' : 'none' }}>
            {btn.label}
          </button>
        ))}
      </div>

      {/* Gallery strip */}
      <div style={{ padding: '0 20px 24px' }}>
        <h2 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 700, color: C.charcoal, fontFamily: 'Lora, serif' }}>Gallery</h2>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto' }}>
          {GALLERY_IMGS.map((img, i) => (
            <div key={i} onClick={() => { setGalleryIdx(i); onNav('gallery'); }}
              style={{ flexShrink: 0, width: 90, height: 90, borderRadius: 10, overflow: 'hidden', cursor: 'pointer', border: `2px solid ${galleryIdx === i ? C.burgundy : 'transparent'}` }}>
              <img src={img.url} alt={img.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Screen: Gallery ──────────────────────────────────────────────────────────
function GalleryScreen({ onBack }: { onBack: () => void }) {
  const [idx, setIdx] = useState(0)
  const [showCompare, setShowCompare] = useState(false)
  const [compareSlider, setCompareSlider] = useState(50)
  const img = GALLERY_IMGS[idx]

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#1a1612', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', gap: 12 }}>
        <button onClick={onBack} style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(255,255,255,0.12)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.white }}>
          <IconChevronLeft />
        </button>
        <h2 style={{ margin: 0, flex: 1, fontSize: 14, fontWeight: 600, color: C.white, fontFamily: 'Lora, serif' }}>Heritage Gallery</h2>
      </div>

      {/* Main image */}
      <div style={{ position: 'relative', flex: 1, overflow: 'hidden', margin: '0 16px', borderRadius: 14 }}>
        {showCompare ? (
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <img src={GALLERY_IMGS[0].url} alt="Historic" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', width: `${compareSlider}%` }}>
              <img src={GALLERY_IMGS[2].url} alt="Modern" style={{ width: `${100 / (compareSlider / 100)}%`, height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${compareSlider}%`, width: 2, background: C.white, transform: 'translateX(-50%)' }}>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 32, height: 32, borderRadius: '50%', background: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
                <span style={{ fontSize: 14, color: C.charcoal }}>↔</span>
              </div>
            </div>
            <input type="range" min="5" max="95" value={compareSlider} onChange={e => setCompareSlider(+e.target.value)}
              style={{ position: 'absolute', bottom: 20, left: '10%', right: '10%', width: '80%', opacity: 0.8, cursor: 'pointer' }} />
            <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(0,0,0,0.6)', color: C.white, fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 6, fontFamily: 'Inter' }}>TODAY</div>
            <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(125,48,69,0.8)', color: C.white, fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 6, fontFamily: 'Inter' }}>1850</div>
          </div>
        ) : (
          <>
            <img src={img.url} alt={img.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75), transparent)', padding: '24px 16px 16px' }}>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: C.white, fontFamily: 'Lora, serif' }}>{img.caption}</p>
              <p style={{ margin: '3px 0 0', fontSize: 11, color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter' }}>{img.year}</p>
              <p style={{ margin: '6px 0 0', fontSize: 11, color: 'rgba(255,255,255,0.8)', fontFamily: 'Inter', lineHeight: 1.5 }}>{img.desc}</p>
            </div>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      <div style={{ display: 'flex', gap: 8, padding: '12px 16px 16px', overflowX: 'auto' }}>
        {GALLERY_IMGS.map((g, i) => (
          <div key={i} onClick={() => setIdx(i)}
            style={{ flexShrink: 0, width: 62, height: 62, borderRadius: 8, overflow: 'hidden', cursor: 'pointer', border: `2.5px solid ${i === idx ? C.burgundy : 'transparent'}` }}>
            <img src={g.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Screen: Audio Tour ───────────────────────────────────────────────────────
function AudioScreen({ onBack }: { onBack: () => void }) {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(28)
  const [showTranscript, setShowTranscript] = useState(false)
  const [lang, setLang] = useState('English')

  const barHeights = [4, 10, 16, 8, 14, 6, 12, 16, 10, 6, 14, 8, 12, 16, 4, 10, 8, 14]

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: C.cream, overflowY: 'auto', minHeight: 0, paddingBottom: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '14px 16px 0', gap: 12 }}>
        <button onClick={onBack} style={{ width: 34, height: 34, borderRadius: 8, background: C.sand, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.charcoal }}>
          <IconChevronLeft />
        </button>
        <h2 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: C.charcoal, fontFamily: 'Lora, serif' }}>Audio Tour</h2>
      </div>

      {/* Cover art */}
      <div style={{ margin: '24px 28px 0', borderRadius: 16, overflow: 'hidden', position: 'relative', height: 200 }}>
        <img src={LANDMARKS[0].img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: C.overlay }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 24, marginBottom: 12 }}>
            {barHeights.map((h, i) => (
              <div key={i} style={{ width: 3, borderRadius: 2, background: C.white, height: playing ? undefined : 4,
                animation: playing ? `audio-bar ${0.4 + i * 0.05}s ease-in-out infinite alternate` : 'none',
                animationDelay: `${i * 0.06}s`, minHeight: 4, maxHeight: h }} />
            ))}
          </div>
          <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: C.white, fontFamily: 'Lora, serif', textAlign: 'center' }}>Life in South Hobart in the 1840s</p>
          <p style={{ margin: '6px 0 0', fontSize: 12, color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter' }}>Cascade Female Factory</p>
        </div>
      </div>

      {/* Player controls */}
      <div style={{ padding: '24px 28px' }}>
        {/* Progress bar */}
        <div style={{ marginBottom: 6 }}>
          <input type="range" min="0" max="100" value={progress} onChange={e => setProgress(+e.target.value)}
            style={{ width: '100%', accentColor: C.burgundy, cursor: 'pointer' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            <span style={{ fontSize: 11, color: C.stone, fontFamily: 'Inter' }}>0:{progress < 10 ? '0' : ''}{Math.floor(progress * 1.65)}</span>
            <span style={{ fontSize: 11, color: C.stone, fontFamily: 'Inter' }}>2:45</span>
          </div>
        </div>

        {/* Controls row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
          <button onClick={() => setProgress(p => Math.max(0, p - 9))}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.charcoalMid, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.03"/></svg>
            <span style={{ fontSize: 9, fontFamily: 'Inter', color: C.stone }}>15s</span>
          </button>
          <button onClick={() => setPlaying(v => !v)}
            style={{ width: 58, height: 58, borderRadius: '50%', background: C.burgundy, border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.white, boxShadow: '0 4px 16px rgba(125,48,69,0.4)' }}>
            {playing ? <IconPause /> : <IconPlay />}
          </button>
          <button onClick={() => setProgress(p => Math.min(100, p + 9))}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.charcoalMid, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-.49-3.03"/></svg>
            <span style={{ fontSize: 9, fontFamily: 'Inter', color: C.stone }}>15s</span>
          </button>
        </div>

        {/* State label */}
        <p style={{ textAlign: 'center', margin: '12px 0 0', fontSize: 11, color: C.stone, fontFamily: 'Inter' }}>
          {playing ? '● Playing' : progress === 0 ? '◼ Stopped' : '❚❚ Paused'}
        </p>
      </div>

      {/* Language & transcript */}
      <div style={{ padding: '0 28px 20px', display: 'flex', gap: 10 }}>
        <button onClick={() => setShowTranscript(v => !v)}
          style={{ flex: 1, padding: '10px', borderRadius: 10, border: `1.5px solid ${showTranscript ? C.burgundy : C.sand}`,
            background: showTranscript ? C.burgundyPale : C.white, color: showTranscript ? C.burgundy : C.charcoal,
            fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter' }}>
          {showTranscript ? '▲ Hide Transcript' : '≡ Read Transcript'}
        </button>
        <button style={{ padding: '10px 14px', borderRadius: 10, border: `1.5px solid ${C.sand}`, background: C.white, color: C.charcoal, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter' }}>
          {lang === 'English' ? '🌐 EN' : '🌐 ZH'}
        </button>
      </div>

      {showTranscript && (
        <div style={{ margin: '0 20px 24px', borderRadius: 12, background: C.white, border: `1px solid ${C.sand}`, padding: '16px', minHeight: 190, flexShrink: 0 }}>
          <p style={{ margin: 0, fontSize: 12, lineHeight: 1.8, color: C.charcoalMid, fontFamily: 'Inter', fontStyle: 'italic' }}>
            "Imagine standing here in 1840. The Female Factory was one of the most feared institutions in the colony — a place where women transported from Britain were put to work spinning wool, breaking stone, and caring for their children in conditions that shocked even the colonial authorities. These sandstone walls witnessed extraordinary resilience..."
          </p>
        </div>
      )}
    </div>
  )
}

// ─── Screen: AR Intro ─────────────────────────────────────────────────────────
function ARIntroScreen({ onBack, onStart }: { onBack: () => void; onStart: () => void }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: C.charcoal, overflowY: 'auto', minHeight: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', gap: 12 }}>
        <button onClick={onBack} style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(255,255,255,0.12)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.white }}>
          <IconChevronLeft />
        </button>
        <h2 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: C.white, fontFamily: 'Lora, serif' }}>AR Experience</h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '18px 28px 34px' }}>
        {/* AR logo animation */}
        <div style={{ position: 'relative', width: 120, height: 120, marginBottom: 28, animation: 'drift 3s ease-in-out infinite' }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: 24, border: `3px solid ${C.arBlue}`, opacity: 0.4 }} />
          <div style={{ position: 'absolute', inset: 8, borderRadius: 18, border: `2px solid ${C.arBlue}`, opacity: 0.6 }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 42, fontWeight: 900, color: C.arBlue, fontFamily: 'Inter', letterSpacing: -2 }}>AR</span>
          </div>
          {/* Scan line */}
          <div style={{ position: 'absolute', left: 8, right: 8, height: 2, background: `linear-gradient(to right, transparent, ${C.arBlue}, transparent)`,
            animation: 'ar-scan 2s linear infinite', top: 8 }} />
        </div>

        <h1 style={{ margin: '0 0 12px', fontSize: 22, fontWeight: 700, color: C.white, fontFamily: 'Lora, serif', textAlign: 'center' }}>Augmented Reality Heritage</h1>
        <p style={{ margin: '0 0 32px', fontSize: 13, color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter', textAlign: 'center', lineHeight: 1.7 }}>
          Scan this heritage building with your camera. After it is recognised, you can open its information, audio guide and historical video.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
          <button onClick={onStart}
            style={{ padding: '15px', borderRadius: 14, background: C.arBlue, border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 700, color: C.charcoal, fontFamily: 'Inter', boxShadow: `0 4px 20px ${C.arBlue}50` }}>
            ⬡ Scan This Building
          </button>
          <div style={{ padding: '12px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}><strong style={{ color: C.white, font: '600 12px Inter' }}>What does “1850” mean?</strong><p style={{ margin: '5px 0 0', color: 'rgba(255,255,255,.65)', font: '11px/1.55 Inter' }}>After scanning, “Compare with 1850” overlays a historical reconstruction so you can compare how this same building looked then and today.</p></div>
        </div>

        {/* Feature pills */}
        <div style={{ display: 'flex', gap: 8, marginTop: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
          {['Building Recognition', 'Information', 'Audio Guide', 'Historical Video'].map(f => (
            <span key={f} style={{ padding: '4px 10px', borderRadius: 20, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', fontSize: 10, color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter' }}>{f}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Screen: AR Camera ────────────────────────────────────────────────────────
function ARCameraScreen({ onExit, onPast }: { onExit: () => void; onPast: () => void }) {
  const [detected, setDetected] = useState(false)
  const [activeBubble, setActiveBubble] = useState<'info' | 'audio' | 'video' | null>(null)
  const [audioPlaying, setAudioPlaying] = useState(false)
  const [subtitles, setSubtitles] = useState(true)
  const [bubblePos, setBubblePos] = useState({ info: { x: 76, y: 34 }, audio: { x: 25, y: 45 }, video: { x: 65, y: 58 } })
  const photoTrackRef = useRef<HTMLDivElement>(null)
  const photoDrag = useRef({ active: false, x: 0, scroll: 0 })

  useEffect(() => {
    const detectionTimer = setTimeout(() => setDetected(true), 1400)
    return () => clearTimeout(detectionTimer)
  }, [])

  function dragBubble(key: 'info' | 'audio' | 'video', e: React.PointerEvent<HTMLButtonElement>) {
    const host = e.currentTarget.parentElement?.getBoundingClientRect()
    if (!host) return
    e.currentTarget.setPointerCapture(e.pointerId)
    const move = (ev: PointerEvent) => setBubblePos(p => ({ ...p, [key]: {
      x: Math.max(13, Math.min(87, ((ev.clientX - host.left) / host.width) * 100)),
      y: Math.max(20, Math.min(72, ((ev.clientY - host.top) / host.height) * 100)),
    }}))
    const up = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up) }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
  }

  const bubbles = [
    { key: 'info' as const, icon: 'i', label: 'Information', color: C.arBlue },
    { key: 'audio' as const, icon: audioPlaying ? 'Ⅱ' : '🔊', label: 'Audio Guide', color: C.arGreen },
    { key: 'video' as const, icon: '▣', label: 'Photo Gallery', color: '#FFD36B' },
  ]

  return (
    <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: '#0a0a0a' }}>
      {/* Simulated camera view */}
      <img src={LANDMARKS[0].img} alt="Camera view" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />

      {/* AR scan grid overlay */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(0,200,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,255,0.04) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      {/* Corner brackets */}
      {[['0', '0', '20px', '0', '0', '20px'], ['0', 'auto auto 0', '20px', 'auto', '0', '20px'], ['auto 0', '0', 'auto', '20px', '0', '20px'], ['auto', 'auto 0 0', 'auto', 'auto', '20px', '0 20px']].map((_, i) => (
        <div key={i} style={{ position: 'absolute', top: i < 2 ? 60 : undefined, bottom: i >= 2 ? 60 : undefined, left: i % 2 === 0 ? 16 : undefined, right: i % 2 === 1 ? 16 : undefined, width: 24, height: 24, borderColor: C.arBlue, borderStyle: 'solid', borderWidth: 0, ...(i === 0 ? { borderTopWidth: 2, borderLeftWidth: 2 } : i === 1 ? { borderTopWidth: 2, borderRightWidth: 2 } : i === 2 ? { borderBottomWidth: 2, borderLeftWidth: 2 } : { borderBottomWidth: 2, borderRightWidth: 2 }), opacity: 0.7 }} />
      ))}

      {/* Top controls */}
      <div style={{ position: 'absolute', top: 14, left: 14, right: 14, display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onExit} style={{ width: 58, height: 36, borderRadius: 10, background: 'rgba(0,0,0,0.5)', border: `1px solid rgba(255,255,255,0.2)`, cursor: 'pointer', color: C.white, fontSize: 12, fontFamily: 'Inter', fontWeight: 600 }}>← Exit</button>
        </div>
        <button style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(0,0,0,0.5)', border: `1px solid rgba(255,255,255,0.2)`, cursor: 'pointer', color: C.white, fontSize: 14, fontFamily: 'Inter', fontWeight: 700 }}>?</button>
      </div>

      {/* Detection status */}
      <div style={{ position: 'absolute', top: 62, left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}>
        {!detected ? (
          <button onClick={() => setDetected(true)}
            style={{ padding: '6px 16px', borderRadius: 20, background: 'rgba(0,0,0,0.6)', border: `1px solid ${C.arBlue}`, color: C.arBlue, fontSize: 11, fontFamily: 'Inter', fontWeight: 600, cursor: 'pointer' }}>
            ◎ Scanning for landmarks...
          </button>
        ) : (
          <div style={{ padding: '6px 16px', borderRadius: 20, background: `${C.arGreen}25`, border: `1px solid ${C.arGreen}`, color: C.arGreen, fontSize: 11, fontFamily: 'Inter', fontWeight: 700 }}>
            ✓ Landmark Detected
          </div>
        )}
      </div>

      {detected && (
        <>
          {/* Landmark label */}
          <div style={{ position: 'absolute', top: 108, left: '50%', transform: 'translateX(-50%)', textAlign: 'center', whiteSpace: 'nowrap', zIndex: 3 }}>
            <div style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', borderRadius: 12, padding: '8px 16px', border: `1px solid rgba(255,255,255,0.15)` }}>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: C.white, fontFamily: 'Lora, serif' }}>Cascade Female Factory</p>
              <p style={{ margin: '2px 0 0', fontSize: 10, color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter' }}>Built 1828 · South Hobart</p>
            </div>
          </div>

          <div style={{ position: 'absolute', top: 166, left: 14, right: 14, textAlign: 'center', color: C.white, font: '600 10px Inter', textShadow: '0 1px 5px #000', zIndex: 3 }}>Tap a bubble · drag to reposition</div>
          {bubbles.map(b => (
            <button key={b.key} onPointerDown={e => dragBubble(b.key, e)} onClick={() => setActiveBubble(activeBubble === b.key ? null : b.key)}
              style={{ touchAction: 'none', position: 'absolute', left: `${bubblePos[b.key].x}%`, top: `${bubblePos[b.key].y}%`, transform: 'translate(-50%,-50%)', width: 82, height: 82, borderRadius: '50%', background: 'rgba(8,16,20,.78)', border: `2px solid ${b.color}`, boxShadow: `0 0 22px ${b.color}55`, color: C.white, cursor: 'grab', fontFamily: 'Inter', zIndex: 2 }}>
              <span style={{ display: 'block', fontSize: 22, color: b.color, fontWeight: 800 }}>{b.icon}</span>
              <span style={{ display: 'block', fontSize: 9, fontWeight: 700, marginTop: 3 }}>{b.label}</span>
            </button>
          ))}
        </>
      )}

      {/* Hotspot info card */}
      {activeBubble !== null && (
        <div style={{ position: 'absolute', bottom: 86, left: 14, right: 14, background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(10px)', borderRadius: 14, padding: '14px', border: `1px solid ${C.arBlue}55`, zIndex: 4 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
            <h3 style={{ margin: 0, fontSize: 13, fontWeight: 700, color: C.white, fontFamily: 'Lora, serif' }}>{bubbles.find(b => b.key === activeBubble)?.label}</h3>
            <button onClick={() => setActiveBubble(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontSize: 16, lineHeight: 1, padding: 0 }}>×</button>
          </div>
          {activeBubble === 'info' && <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,.78)', fontFamily: 'Inter', lineHeight: 1.55 }}>Built in 1828, this sandstone site preserves the stories of transported women and their children.</p>}
          {activeBubble === 'audio' && <><button onClick={() => setAudioPlaying(v => !v)} style={{ padding: '7px 12px', borderRadius: 8, border: 0, background: C.arGreen, fontWeight: 800 }}>{audioPlaying ? 'Stop narration' : 'Play narration'}</button><button onClick={() => setSubtitles(v => !v)} style={{ marginLeft: 8, padding: '7px 10px', borderRadius: 8, border: '1px solid #fff5', background: 'transparent', color: C.white }}>CC {subtitles ? 'On' : 'Off'}</button>{subtitles && <p style={{ margin: '9px 0 0', fontSize: 11, color: C.white, lineHeight: 1.45 }}>“These walls preserve stories of resilience, labour and survival.”</p>}</>}
          {activeBubble === 'video' && <><div ref={photoTrackRef} onPointerDown={e => { photoDrag.current = { active: true, x: e.clientX, scroll: photoTrackRef.current?.scrollLeft || 0 }; e.currentTarget.setPointerCapture(e.pointerId) }} onPointerMove={e => { if (photoDrag.current.active && photoTrackRef.current) photoTrackRef.current.scrollLeft = photoDrag.current.scroll - (e.clientX - photoDrag.current.x) }} onPointerUp={e => { photoDrag.current.active = false; e.currentTarget.releasePointerCapture(e.pointerId) }} onPointerCancel={() => { photoDrag.current.active = false }} style={{ display: 'flex', gap: 8, overflowX: 'auto', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', paddingBottom: 5, cursor: 'grab', userSelect: 'none', touchAction: 'pan-y' }}>{GALLERY_IMGS.map((photo,i) => <div key={photo.url} style={{ minWidth: '72%', scrollSnapAlign: 'center', pointerEvents: 'none' }}><img draggable={false} src={photo.url} alt={photo.caption} style={{ width: '100%', height: 92, borderRadius: 9, objectFit: 'cover' }}/><p style={{ margin: '4px 0 0', color: C.white, font: '10px Inter' }}>{i + 1}/{GALLERY_IMGS.length} · {photo.caption}</p></div>)}</div><p style={{ margin: '5px 0 0', fontSize: 10, color: 'rgba(255,255,255,.65)' }}>Drag or swipe left and right to browse photos.</p></>}
        </div>
      )}

      {/* Bottom bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)', padding: '12px 14px 18px', display: 'flex', gap: 8, zIndex: 5 }}>
        <button onClick={onPast}
          style={{ flex: 1, padding: '11px', borderRadius: 12, background: 'rgba(255,255,255,0.1)', border: `1px solid ${C.arBlue}50`, color: C.arBlue, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter' }}>
          ◐ Compare Today with 1850
        </button>
      </div>
    </div>
  )
}

// ─── Screen: AR Past (See the Past) ──────────────────────────────────────────
function ARPastScreen({ onBack }: { onBack: () => void }) {
  const [era, setEra] = useState<'today' | '1850'>('today')
  const [sliderVal, setSliderVal] = useState(100)

  return (
    <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: '#0a0a0a' }}>
      {/* Modern photo */}
      <img src={LANDMARKS[0].img} alt="Today" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      {/* Historic sepia overlay */}
      <div style={{ position: 'absolute', inset: 0, background: `rgba(101,67,33,${(100 - sliderVal) / 100 * 0.8})`, backgroundBlendMode: 'multiply' }} />
      <img src={LANDMARKS[3].img} alt="1850" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: (100 - sliderVal) / 100, filter: 'sepia(80%) contrast(1.1)' }} />

      {/* Era badge */}
      <div style={{ position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>
        <div style={{ padding: '5px 14px', borderRadius: 20, background: sliderVal > 50 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)', color: sliderVal > 50 ? C.charcoal : C.white, fontSize: 11, fontWeight: 700, fontFamily: 'Inter', transition: 'all 0.3s' }}>TODAY</div>
        <div style={{ padding: '5px 14px', borderRadius: 20, background: sliderVal <= 50 ? C.burgundy : 'rgba(125,48,69,0.4)', color: C.white, fontSize: 11, fontWeight: 700, fontFamily: 'Inter', transition: 'all 0.3s' }}>1850</div>
      </div>

      {/* Top controls */}
      <div style={{ position: 'absolute', top: 14, left: 14 }}>
        <button onClick={onBack} style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(0,0,0,0.55)', border: `1px solid rgba(255,255,255,0.2)`, cursor: 'pointer', color: C.white, fontSize: 12, fontFamily: 'Inter', fontWeight: 600 }}>← Exit</button>
      </div>

      {/* Info overlay */}
      {sliderVal < 60 && (
        <div style={{ position: 'absolute', top: 60, left: 14, right: 14, background: 'rgba(101,67,33,0.85)', backdropFilter: 'blur(8px)', borderRadius: 12, padding: '12px 14px', border: '1px solid rgba(255,220,150,0.3)' }}>
          <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: '#FFE4B5', fontFamily: 'Lora, serif' }}>Hobart, 1850</p>
          <p style={{ margin: '4px 0 0', fontSize: 11, color: 'rgba(255,235,185,0.8)', fontFamily: 'Inter', lineHeight: 1.55 }}>The female factory operated at full capacity. Over 700 women and children lived within these walls. Horse-drawn carts delivered supplies along unpaved roads.</p>
        </div>
      )}

      {/* Era toggle buttons */}
      <div style={{ position: 'absolute', bottom: 120, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 10 }}>
        <button onClick={() => { setEra('today'); setSliderVal(100); }}
          style={{ padding: '8px 20px', borderRadius: 20, background: era === 'today' ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, color: era === 'today' ? C.charcoal : C.white, fontFamily: 'Inter', transition: 'all 0.3s' }}>
          Today
        </button>
        <button onClick={() => { setEra('1850'); setSliderVal(0); }}
          style={{ padding: '8px 20px', borderRadius: 20, background: era === '1850' ? C.burgundy : 'rgba(125,48,69,0.4)', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, color: C.white, fontFamily: 'Inter', transition: 'all 0.3s' }}>
          1850
        </button>
      </div>

      {/* Slider */}
      <div style={{ position: 'absolute', bottom: 60, left: 24, right: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter' }}>1850</span>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter' }}>Today</span>
        </div>
        <input type="range" min="0" max="100" value={sliderVal}
          onChange={e => { setSliderVal(+e.target.value); setEra(+e.target.value > 50 ? 'today' : '1850'); }}
          style={{ width: '100%', accentColor: C.white, cursor: 'pointer' }} />
      </div>
    </div>
  )
}

// ─── Screen: AR Navigation ────────────────────────────────────────────────────
function NavigationChoiceScreen({ onBack, onNav }: { onBack: () => void; onNav: (s: Screen) => void }) {
  return <div style={{ flex: 1, background: C.cream, padding: '18px 20px', overflowY: 'auto' }}>
    <button onClick={onBack} style={{ border: 0, background: C.sand, borderRadius: 8, padding: 9 }}>← Back</button>
    <p style={{ color: C.stone, font: '600 11px Inter', marginTop: 28 }}>PILOT REFINEMENT</p>
    <h1 style={{ color: C.charcoal, font: '700 25px Lora', margin: '4px 0 8px' }}>How would you like to navigate?</h1>
    <p style={{ color: C.stone, font: '400 13px Inter', lineHeight: 1.55 }}>Choose the view that feels most comfortable. You can switch at any time.</p>
    {[{ title: 'Standard Map', body: 'Familiar top-down route, turn list and waypoint controls.', icon: '▱', target: 'standard-nav' as Screen, best: 'Familiar & battery-friendly' }, { title: 'AR Navigation', body: 'Camera view with direction arrows over the street.', icon: '⬆', target: 'ar-nav' as Screen, best: 'Immersive live guidance' }, { title: 'Printable Map', body: 'Export or print the route, stops and writing space for paper use.', icon: '▤', target: 'print-pack' as Screen, best: 'Offline & handwriting-friendly' }].map(o =>
      <button key={o.title} onClick={() => onNav(o.target)} style={{ width: '100%', textAlign: 'left', marginTop: 14, padding: 18, background: C.white, border: `2px solid ${C.sand}`, borderRadius: 16, cursor: 'pointer' }}>
        <span style={{ float: 'right', fontSize: 30, color: C.burgundy }}>{o.icon}</span><strong style={{ display: 'block', font: '700 18px Lora', color: C.charcoal }}>{o.title}</strong>
        <span style={{ display: 'block', marginTop: 7, color: C.stone, font: '400 12px Inter', maxWidth: 250, lineHeight: 1.5 }}>{o.body}</span>
        <span style={{ display: 'inline-block', marginTop: 12, padding: '4px 8px', borderRadius: 10, background: C.greenPale, color: C.green, font: '700 9px Inter' }}>{o.best}</span>
      </button>)}
    <p style={{ marginTop: 18, color: C.green, font: '600 11px Inter', textAlign: 'center' }}>User control & freedom · no AR knowledge required</p>
  </div>
}

function StandardNavigationScreen({ onBack, onNav }: { onBack: () => void; onNav: (s: Screen) => void }) {
  const [stop, setStop] = useState<string | null>(null)
  const [picker, setPicker] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [located, setLocated] = useState(false)
  return <div style={{ flex: 1, position: 'relative', background: '#E6E2D9', overflow: 'hidden' }}>
    <svg width="100%" height="100%" viewBox="0 0 390 800" preserveAspectRatio="none" style={{ transform: `scale(${zoom})`, transformOrigin: '50% 65%', transition: 'transform .25s ease' }}>
      <rect width="390" height="800" fill="#E9E7E0"/>
      {[[18,120,160,70],[235,108,130,105],[18,250,90,130],[238,275,130,95],[35,470,120,90],[245,520,115,120]].map((b,i)=><rect key={i} x={b[0]} y={b[1]} width={b[2]} height={b[3]} rx="7" fill="#D8D3C6" stroke="#CAC4B5"/>)}
      <path d="M-20 220 L410 180M-10 420 L410 395M190 -20 L175 820M300 -20 L275 820M-20 650 L410 620" stroke="white" strokeWidth="28" fill="none"/>
      <path d="M-20 220 L410 180M-10 420 L410 395M190 -20 L175 820M300 -20 L275 820M-20 650 L410 620" stroke="#C7C1B5" strokeWidth="2" fill="none"/>
      <text x="24" y="205" fill="#898375" fontSize="11">Degraves Street</text><text x="210" y="390" fill="#898375" fontSize="11">Apsley Street</text><text x="183" y="315" fill="#898375" fontSize="11" transform="rotate(-90 183 315)">Macquarie Street</text><text x="28" y="642" fill="#898375" fontSize="11">Battery Point</text>
      <path d="M82 720 C125 630 120 540 178 430 S250 285 287 120" fill="none" stroke="#fff" strokeWidth="13" strokeLinecap="round"/><path d="M82 720 C125 630 120 540 178 430 S250 285 287 120" fill="none" stroke={C.burgundy} strokeWidth="6" strokeLinecap="round"/>
      {stop && <><circle cx="165" cy="455" r="14" fill={C.green} stroke="white" strokeWidth="4"/><text x="187" y="460" fill={C.charcoal} fontSize="11" fontWeight="700">Waypoint</text></>}
      <circle cx="82" cy="720" r="13" fill="#4285F4" stroke="white" strokeWidth="4"/><circle cx="287" cy="120" r="11" fill={C.charcoal} stroke="white" strokeWidth="3"/>
    </svg>
    <button onClick={() => onNav('map')} aria-label="Back to map" style={{ position: 'absolute', top: 16, left: 14, border: 0, borderRadius: 9, padding: 10 }}>←</button>
    <button onClick={() => onNav('ar-nav')} style={{ position: 'absolute', top: 16, right: 14, border: 0, borderRadius: 9, padding: '10px 13px', background: C.charcoal, color: C.white, fontWeight: 700 }}>Switch to AR</button>
    <div style={{ position: 'absolute', top: 70, left: 16, right: 16, background: C.white, borderRadius: 14, padding: 14, boxShadow: '0 4px 18px #0002' }}><strong style={{ font: '700 17px Inter' }}>↰ Turn left in 120 m</strong><p style={{ margin: '4px 0 0', color: C.stone, font: '11px Inter' }}>St George's Church · {stop ? '10' : '3'} min</p></div>
    <div style={{ position: 'absolute', right: 14, top: 180, display: 'grid', gap: 8 }}><button onClick={() => setZoom(z => Math.min(1.8, +(z + .2).toFixed(1)))} aria-label="Zoom in" style={{ width: 42, height: 42, border: 0, borderRadius: 9, background: C.white, fontSize: 24, boxShadow: '0 2px 8px #0002' }}>+</button><button onClick={() => setZoom(z => Math.max(.8, +(z - .2).toFixed(1)))} aria-label="Zoom out" style={{ width: 42, height: 42, border: 0, borderRadius: 9, background: C.white, fontSize: 24, boxShadow: '0 2px 8px #0002' }}>−</button><button onClick={() => { setZoom(1.35); setLocated(true); setTimeout(() => setLocated(false), 1800) }} aria-label="Locate me" style={{ width: 42, height: 42, border: 0, borderRadius: 9, background: C.white, fontSize: 18, boxShadow: '0 2px 8px #0002' }}>◎</button></div>
    {located && <div style={{ position: 'absolute', right: 62, top: 278, background: C.charcoal, color: C.white, borderRadius: 8, padding: '7px 10px', font: '10px Inter' }}>Current location centred</div>}
    <div style={{ position: 'absolute', bottom: 18, left: 16, right: 16, display: 'flex', gap: 9 }}><button onClick={() => setPicker(true)} style={{ flex: 1, padding: 13, borderRadius: 12, border: `1px solid ${C.green}`, color: stop ? C.white : C.green, background: stop ? C.green : C.white, fontWeight: 700 }}>{stop ? `✓ ${stop}` : '+ Add Stop'}</button><button onClick={() => onNav('nav-choice')} style={{ padding: 13, borderRadius: 12, border: 0, background: C.burgundy, color: C.white, fontWeight: 700 }}>Modes</button></div>
    {picker && <WaypointPicker onClose={() => setPicker(false)} onAdd={name => { setStop(name); setPicker(false) }}/>} 
  </div>
}

function PrintPackScreen({ onBack }: { onBack: () => void }) {
  const [exported, setExported] = useState(false)
  useEffect(() => {
    const buttons = Array.from(document.querySelectorAll('button')) as HTMLButtonElement[]
    const primary = buttons.find(button => button.textContent?.includes('Export PDF') || button.textContent?.includes('PDF ready') || button.textContent?.includes('Word file ready'))
    const duplicate = buttons.find(button => button.textContent?.trim() === 'Print Map')
    if (primary) { primary.textContent = exported ? '✓ Word file ready' : 'Print Word Map'; primary.style.width = '100%' }
    if (duplicate) duplicate.style.display = 'none'
  }, [exported])
  return <div style={{ flex: 1, background: C.cream, padding: '18px 20px', overflowY: 'auto' }}><button onClick={onBack} style={{ border: 0, background: C.sand, borderRadius: 8, padding: 9 }}>← Back</button><p style={{ color: C.stone, font: '600 11px Inter', marginTop: 24 }}>PAPER NAVIGATION</p><h1 style={{ font: '700 24px Lora', color: C.charcoal, margin: '4px 0 8px' }}>Printable Walking Map</h1><p style={{ color: C.stone, font: '12px Inter', lineHeight: 1.55 }}>Print an A4 route map with your destination, waypoint, turn list and space for handwritten notes.</p><div style={{ background: C.white, padding: 18, border: `1px solid ${C.sand}`, boxShadow: '0 4px 15px #0001', marginTop: 16 }}><strong style={{ font: '700 17px Lora' }}>Route to Cascade Female Factory</strong><p style={{ font: '11px Inter', lineHeight: 1.5 }}>Start: Hobart Waterfront · Waypoint: State Library · Destination: Cascade Female Factory</p><svg width="100%" height="150" viewBox="0 0 300 150" style={{ background: '#EEEAE1', borderRadius: 8 }}><path d="M10 40L290 30M25 112L285 100M70 0L82 150M220 0L205 150" stroke="white" strokeWidth="14"/><path d="M35 132Q90 100 130 78T245 24" stroke={C.burgundy} strokeWidth="5" fill="none" strokeDasharray="7 4"/><circle cx="35" cy="132" r="8" fill="#4285F4" stroke="white" strokeWidth="3"/><circle cx="130" cy="78" r="8" fill={C.green} stroke="white" strokeWidth="3"/><circle cx="245" cy="24" r="8" fill="#C43D45" stroke="white" strokeWidth="3"/></svg><p style={{ color: C.stone, font: '700 10px Inter' }}>TURN LIST & FIELD NOTES</p>{[1,2,3,4].map(n => <div key={n} style={{ borderBottom: `1px solid ${C.sand}`, height: 26 }}/>)}</div><div style={{ display: 'flex', gap: 9, marginTop: 16 }}><button onClick={() => setExported(true)} style={{ flex: 1, padding: 13, borderRadius: 11, border: 0, background: C.burgundy, color: C.white, fontWeight: 700 }}>{exported ? '✓ PDF ready' : 'Export PDF'}</button><button onClick={() => setExported(true)} style={{ flex: 1, padding: 13, borderRadius: 11, border: `1px solid ${C.burgundy}`, background: C.white, color: C.burgundy, fontWeight: 700 }}>Print Map</button></div><p style={{ color: C.green, textAlign: 'center', font: '600 10px Inter' }}>Offline route access · supports handwritten notes</p></div>
}

function ARNavScreen({ onBack, onNav }: { onBack: () => void; onNav: (s: Screen) => void }) {
  const [nearby, setNearby] = useState(false)

  return (
    <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: '#0a0a0a' }}>
      <img src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=900&h=1500&fit=crop&auto=format" alt="Live street camera view" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,rgba(0,0,0,.28),rgba(0,0,0,.03) 55%,rgba(0,0,0,.35))' }} />

      {/* Road/path overlay simulation */}
      <div style={{ position: 'absolute', bottom: '18%', left: '22%', right: '22%', height: '52%', background: 'linear-gradient(to top,rgba(0,200,255,.16),rgba(0,200,255,0))', clipPath: 'polygon(34% 0,66% 0,100% 100%,0 100%)' }} />

      {/* AR direction arrows */}
      <div style={{ position: 'absolute', top: '35%', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        {[0, 1, 2].map(i => (
          <svg key={i} width={88 - i * 12} height={62 - i * 8} viewBox="0 0 56 40" style={{ opacity: 1 - i * 0.22, filter: `drop-shadow(0 0 12px ${C.arBlue})` }}>
            <path d="M28 4 L52 36 L28 28 L4 36 Z" fill={C.arBlue} stroke="white" strokeWidth="2"/>
          </svg>
        ))}
      </div>

      {/* Controls */}
      <div style={{ position: 'absolute', top: 14, left: 14, right: 14, display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={onBack} style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(0,0,0,0.6)', border: `1px solid rgba(255,255,255,0.2)`, cursor: 'pointer', color: C.white, fontSize: 13, fontWeight: 600, fontFamily: 'Inter' }}>×</button>
      </div>

      {/* Direction card */}
      <div style={{ position: 'absolute', top: 64, left: '50%', transform: 'translateX(-50%)', textAlign: 'center', whiteSpace: 'nowrap' }}>
        <div style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', borderRadius: 14, padding: '10px 20px', border: `1px solid ${C.arBlue}40` }}>
          <p style={{ margin: 0, fontSize: 18, fontWeight: 800, color: C.arBlue, fontFamily: 'Inter' }}>↑ Continue 120 m</p>
          <p style={{ margin: '4px 0 0', fontSize: 11, color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter' }}>Next: St George's Church · 3 min</p>
        </div>
      </div>

      {/* Mini map circle */}
      <button onClick={() => onNav('standard-nav')} aria-label="Open standard map" style={{ padding: 0, position: 'absolute', bottom: 105, left: 18, width: 148, height: 148, borderRadius: 18, overflow: 'hidden', border: `3px solid ${C.white}`, boxShadow: '0 8px 24px #0007', cursor: 'pointer' }}>
        <div style={{ width: '100%', height: '100%', background: '#EDE8E0', position: 'relative' }}>
          <svg width="100%" height="100%">
            <path d="M-10 38 L158 28M-5 112 L155 100M48 -10 L60 158M112 -10 L98 158" stroke="white" strokeWidth="15"/>
            <path d="M-10 38 L158 28M-5 112 L155 100M48 -10 L60 158M112 -10 L98 158" stroke="#c7c0b3" strokeWidth="2"/>
            <path d="M28,136 Q62,105 72,76 Q80,50 112,20" stroke="white" strokeWidth="9" fill="none"/>
            <path d="M28,136 Q62,105 72,76 Q80,50 112,20" stroke={C.burgundy} strokeWidth="5" fill="none"/>
            <circle cx="28" cy="136" r="9" fill="#4285F4" stroke="white" strokeWidth="3" />
            <circle cx="112" cy="20" r="8" fill="#D23F4F" stroke="white" strokeWidth="3" />
          </svg>
        </div>
      </button>

      {/* Nearby alert */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', padding: '14px 20px 22px' }}>
        {nearby ? (
          <div style={{ textAlign: 'center' }}>
            <p style={{ margin: '0 0 8px', fontSize: 13, color: C.arGreen, fontWeight: 700, fontFamily: 'Inter' }}>Heritage site nearby ✓</p>
            <button onClick={() => onNav('ar-camera')} style={{ padding: '10px 32px', borderRadius: 12, background: C.burgundy, border: 'none', color: C.white, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter' }}>Scan Building</button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ margin: 0, fontSize: 12, color: C.white, fontWeight: 600, fontFamily: 'Lora, serif' }}>St George's Church</p>
              <p style={{ margin: '2px 0 0', fontSize: 11, color: 'rgba(255,255,255,0.55)', fontFamily: 'Inter' }}>3 min · Battery Point</p>
            </div>
            <button onClick={() => setNearby(true)}
              style={{ padding: '9px 16px', borderRadius: 10, background: C.burgundy, border: 'none', color: C.white, fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter' }}>
              Simulate Arrival
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Screen: Weather ──────────────────────────────────────────────────────────
function WeatherScreen({ onBack, onNav }: { onBack: () => void; onNav: (s: Screen) => void }) {
  const hourlyRef = useRef<HTMLDivElement>(null)
  const hourlyDrag = useRef({ active: false, x: 0, scroll: 0 })
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: C.cream, overflowY: 'auto', minHeight: 0, paddingBottom: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '14px 16px 0', gap: 12 }}>
        <button onClick={onBack} style={{ width: 34, height: 34, borderRadius: 8, background: C.sand, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.charcoal }}>
          <IconChevronLeft />
        </button>
        <h2 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: C.charcoal, fontFamily: 'Lora, serif' }}>Walking Conditions</h2>
      </div>

      {/* Weather card */}
      <div style={{ margin: '20px 20px 0', borderRadius: 18, background: 'linear-gradient(135deg, #2C4A6E 0%, #3A6186 100%)', padding: '24px 22px', color: C.white }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ margin: 0, fontSize: 13, opacity: 0.7, fontFamily: 'Inter' }}>Hobart, Tasmania</p>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, margin: '8px 0' }}>
              <span style={{ fontSize: 52, fontWeight: 300, fontFamily: 'Inter', lineHeight: 1 }}>12°</span>
              <span style={{ fontSize: 16, opacity: 0.8, marginBottom: 8, fontFamily: 'Inter' }}>C</span>
            </div>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 500, fontFamily: 'Inter' }}>Light Rain</p>
          </div>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5">
            <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/><line x1="8" y1="19" x2="8" y2="21"/><line x1="8" y1="13" x2="8" y2="15"/><line x1="16" y1="19" x2="16" y2="21"/><line x1="16" y1="13" x2="16" y2="15"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="12" y1="15" x2="12" y2="17"/>
          </svg>
        </div>

        <div style={{ marginTop: 18, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.15)' }}>
          <div style={{ display: 'flex', gap: 24 }}>
            {[['Humidity', '78%'], ['Wind', '18 km/h'], ['UV Index', 'Low']].map(([k, v]) => (
              <div key={k}>
                <p style={{ margin: 0, fontSize: 10, opacity: 0.6, fontFamily: 'Inter' }}>{k}</p>
                <p style={{ margin: '2px 0 0', fontSize: 14, fontWeight: 600, fontFamily: 'Inter' }}>{v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Walking conditions */}
      <div style={{ margin: '16px 20px 0', borderRadius: 14, background: C.white, border: `1px solid ${C.sand}`, padding: '16px' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: '#FFF3E8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>⚠️</div>
          <div>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: C.charcoal, fontFamily: 'Lora, serif' }}>Walking Condition</p>
            <p style={{ margin: '2px 0 0', fontSize: 12, color: '#B5631A', fontFamily: 'Inter', fontWeight: 600 }}>Wet paths — caution advised</p>
          </div>
        </div>
        <div style={{ background: C.greenPale, borderRadius: 10, padding: '12px 14px', border: `1px solid ${C.greenLight}40` }}>
          <p style={{ margin: 0, fontSize: 12, color: C.green, fontFamily: 'Inter', lineHeight: 1.65, fontWeight: 500 }}>
            ♿ Accessible Route recommended due to wet conditions. Lower gradient and sealed surfaces reduce slip risk.
          </p>
        </div>
      </div>

      {/* 12-hour forecast */}
      <div style={{ margin: '16px 20px 0' }}>
        <p style={{ margin: '0 0 10px', fontSize: 12, fontWeight: 600, color: C.stone, fontFamily: 'Inter', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Next 12 hours</p>
        <div ref={hourlyRef}
          onPointerDown={e => { hourlyDrag.current = { active: true, x: e.clientX, scroll: hourlyRef.current?.scrollLeft || 0 }; e.currentTarget.setPointerCapture(e.pointerId) }}
          onPointerMove={e => { if (hourlyDrag.current.active && hourlyRef.current) hourlyRef.current.scrollLeft = hourlyDrag.current.scroll - (e.clientX - hourlyDrag.current.x) }}
          onPointerUp={e => { hourlyDrag.current.active = false; e.currentTarget.releasePointerCapture(e.pointerId) }}
          onPointerCancel={() => { hourlyDrag.current.active = false }}
          style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 6, cursor: 'grab', userSelect: 'none', touchAction: 'pan-y', WebkitOverflowScrolling: 'touch' }}>
          {[['Now','🌧','12°'],['11am','🌧','12°'],['12pm','🌦','13°'],['1pm','🌦','13°'],['2pm','☁️','14°'],['3pm','☁️','14°'],['4pm','⛅','13°'],['5pm','⛅','12°'],['6pm','☁️','11°'],['7pm','☁️','10°'],['8pm','🌙','9°'],['9pm','🌙','9°']].map(([time,icon,temp]) => <div key={time} style={{ minWidth: 57, background: C.white, borderRadius: 11, border: `1px solid ${C.sand}`, padding: '9px 5px', textAlign: 'center' }}><p style={{ margin: 0, color: C.stone, font: '10px Inter' }}>{time}</p><p style={{ margin: '5px 0', fontSize: 18 }}>{icon}</p><strong style={{ font: '700 12px Inter' }}>{temp}</strong></div>)}
        </div>
      </div>

      <div style={{ margin: '14px 20px 0' }}><p style={{ margin: '0 0 10px', fontSize: 12, fontWeight: 600, color: C.stone, fontFamily: 'Inter', textTransform: 'uppercase', letterSpacing: '0.08em' }}>7-day forecast</p><div style={{ background: C.white, border: `1px solid ${C.sand}`, borderRadius: 13, overflow: 'hidden' }}>
        {[['Today','🌧','12°','8°'],['Mon','🌦','14°','9°'],['Tue','⛅','15°','8°'],['Wed','☀️','17°','10°'],['Thu','☀️','18°','11°'],['Fri','🌬','15°','9°'],['Sat','🌧','13°','7°']].map(([day,icon,hi,lo]) => <div key={day} style={{ display: 'grid', gridTemplateColumns: '1fr 40px 45px 35px', alignItems: 'center', padding: '10px 13px', borderBottom: `1px solid ${C.sand}`, font: '12px Inter' }}><strong>{day}</strong><span style={{ fontSize: 18 }}>{icon}</span><strong>{hi}</strong><span style={{ color: C.stone }}>{lo}</span></div>)}
      </div></div>

    </div>
  )
}

// ─── App root ─────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [selectedLandmarkId, setSelectedLandmarkId] = useState(1)
  const [likes, setLikes] = useState<Record<number, number>>({ 1: 248, 2: 196, 3: 181, 4: 143, 5: 126 })
  const [likedIds, setLikedIds] = useState<number[]>([])
  const prevScreen = useRef<Screen>('home')

  const selectedLandmark = LANDMARKS.find(l => l.id === selectedLandmarkId) || LANDMARKS[0]

  useEffect(() => {
    const openPrint = () => goTo('print-pack')
    window.addEventListener('open-print-pack', openPrint)
    return () => window.removeEventListener('open-print-pack', openPrint)
  })

  function goTo(s: Screen) {
    prevScreen.current = screen
    setScreen(s)
  }

  function goBack() {
    setScreen(prevScreen.current)
  }

  function selectLandmark(id: number) {
    setSelectedLandmarkId(id)
    prevScreen.current = screen
    setScreen('heritage')
  }

  function toggleLike(id: number) {
    const liked = likedIds.includes(id)
    setLikedIds(ids => liked ? ids.filter(x => x !== id) : [...ids, id])
    setLikes(values => ({ ...values, [id]: Math.max(0, values[id] + (liked ? -1 : 1)) }))
  }

  const isFullscreen = screen === 'ar-camera' || screen === 'ar-past' || screen === 'ar-nav' || screen === 'standard-nav'
  const showBottomNav = !isFullscreen && screen !== 'gallery'

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#1a1612', padding: '20px 0' }}>
      {/* Phone shell */}
      <div style={{ width: 390, height: 844, maxHeight: '95vh', background: C.white, borderRadius: 44, overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {/* Status bar */}
        <div style={{ background: isFullscreen ? 'transparent' : C.white, padding: '12px 28px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0, position: isFullscreen ? 'absolute' : 'relative', top: 0, left: 0, right: 0, zIndex: 10, pointerEvents: isFullscreen ? 'none' : 'auto', textShadow: isFullscreen ? '0 1px 5px #000' : 'none' }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: isFullscreen ? C.white : C.charcoal, fontFamily: 'Inter' }}>9:41</span>
          <div style={{ width: 90, height: 20, borderRadius: 12, background: isFullscreen ? 'rgba(255,255,255,0.15)' : C.charcoal, position: 'absolute', left: '50%', transform: 'translateX(-50%)' }} />
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            <svg width="14" height="11" viewBox="0 0 14 11"><rect x="0" y="4" width="3" height="7" fill={isFullscreen ? C.white : C.charcoal} rx="1"/><rect x="4" y="2.5" width="3" height="8.5" fill={isFullscreen ? C.white : C.charcoal} rx="1"/><rect x="8" y="1" width="3" height="10" fill={isFullscreen ? C.white : C.charcoal} rx="1"/></svg>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><rect x="1" y="3" width="11" height="8" rx="1.5" stroke={isFullscreen ? C.white : C.charcoal} strokeWidth="1.5"/><rect x="13" y="5" width="2" height="4" rx="1" fill={isFullscreen ? C.white : C.charcoal}/><rect x="2.5" y="4.5" width="8" height="5" rx="0.75" fill={isFullscreen ? C.white : C.charcoal}/></svg>
          </div>
        </div>

        {/* Screen content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', marginTop: isFullscreen ? 0 : 0 }}>
          {screen === 'home'       && <HomeScreen    onNav={goTo} onLandmark={selectLandmark} likes={likes} />}
          {screen === 'map'        && <MapScreen     onNav={goTo} onLandmark={selectLandmark} />}
          {screen === 'heritage'   && <HeritageScreen landmark={selectedLandmark} onBack={() => setScreen('home')} onNav={goTo} liked={likedIds.includes(selectedLandmarkId)} likeCount={likes[selectedLandmarkId]} onToggleLike={() => toggleLike(selectedLandmarkId)} />}
          {screen === 'gallery'    && <GalleryScreen  onBack={() => setScreen('heritage')} />}
          {screen === 'audio'      && <AudioScreen    onBack={() => setScreen('heritage')} />}
          {screen === 'ar-intro'   && <ARIntroScreen  onBack={goBack} onStart={() => goTo('ar-camera')} />}
          {screen === 'ar-camera'  && <ARCameraScreen onExit={() => setScreen('heritage')} onPast={() => goTo('ar-past')} />}
          {screen === 'ar-past'    && <ARPastScreen   onBack={goBack} />}
          {screen === 'ar-nav'     && <ARNavScreen    onBack={goBack} onNav={goTo} />}
          {screen === 'nav-choice' && <NavigationChoiceScreen onBack={() => setScreen('map')} onNav={goTo} />}
          {screen === 'standard-nav' && <StandardNavigationScreen onBack={goBack} onNav={goTo} />}
          {screen === 'print-pack' && <PrintPackScreen onBack={goBack} />}
          {screen === 'weather'    && <WeatherScreen  onBack={goBack} onNav={goTo} />}
        </div>

        {/* Bottom navigation */}
        {showBottomNav && (
          <div style={{ flexShrink: 0 }}>
            <BottomNav active={screen} onNav={goTo} />
          </div>
        )}

        {/* Home indicator */}
        <div style={{ height: 6, display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: 6, background: isFullscreen ? 'rgba(0,0,0,0.6)' : C.white, flexShrink: 0 }}>
          <div style={{ width: 120, height: 5, borderRadius: 3, background: isFullscreen ? 'rgba(255,255,255,0.4)' : C.sandDark }} />
        </div>
      </div>

      {/* Outside hint */}
      <div style={{ position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.3)', fontFamily: 'Inter' }}>Hobart Historic Walking Trails · HCI Prototype</p>
      </div>
    </div>
  )
}

