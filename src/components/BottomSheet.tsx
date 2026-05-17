import { useEffect, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent, ReactNode } from 'react'

export type SheetSnap = 'peek' | 'half' | 'full'

const SNAP_ORDER: SheetSnap[] = ['peek', 'half', 'full']

interface Props {
  snap: SheetSnap
  onSnapChange: (snap: SheetSnap) => void
  /** Brief header shown in the peek strip. Always visible. */
  peek: ReactNode
  /** Scrollable body visible once expanded. */
  children: ReactNode
}

/**
 * Apple Maps-style bottom sheet. Three snap heights — `peek` (compact
 * strip showing just the peek header), `half` (50 vh) and `full` (~90 vh).
 * The drag handle behaves as both a tap-target (cycles snap states) and
 * a pointer-drag handle that snaps to the nearest height on release.
 *
 * Map interaction below is unaffected — the sheet sits over the bottom
 * portion of the map but uses pointer-events: auto only on itself.
 */
export function BottomSheet({ snap, onSnapChange, peek, children }: Props) {
  const vh = useViewportHeight()
  const snapPx: Record<SheetSnap, number> = {
    peek: 96,
    half: Math.round(vh * 0.5),
    full: Math.round(vh * 0.88),
  }
  const baseHeight = snapPx[snap]

  const [dragDelta, setDragDelta] = useState(0)
  const startYRef = useRef(0)
  const isDraggingRef = useRef(false)
  const movedRef = useRef(false)

  const clamp = (v: number) =>
    Math.max(snapPx.peek, Math.min(snapPx.full, v))
  const effectiveHeight = clamp(baseHeight + dragDelta)

  const onPointerDown = (e: ReactPointerEvent<HTMLButtonElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    startYRef.current = e.clientY
    isDraggingRef.current = true
    movedRef.current = false
  }

  const onPointerMove = (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (!isDraggingRef.current) return
    const delta = startYRef.current - e.clientY // positive = dragged up
    if (Math.abs(delta) > 6) movedRef.current = true
    setDragDelta(delta)
  }

  const finishDrag = (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (!isDraggingRef.current) return
    e.currentTarget.releasePointerCapture(e.pointerId)
    isDraggingRef.current = false

    if (movedRef.current) {
      // Drag → snap to nearest snap point
      const finalHeight = clamp(baseHeight + dragDelta)
      let nearest: SheetSnap = snap
      let bestDist = Infinity
      for (const s of SNAP_ORDER) {
        const d = Math.abs(snapPx[s] - finalHeight)
        if (d < bestDist) {
          bestDist = d
          nearest = s
        }
      }
      if (nearest !== snap) onSnapChange(nearest)
    } else {
      // Tap → cycle to the next snap state
      const i = SNAP_ORDER.indexOf(snap)
      onSnapChange(SNAP_ORDER[(i + 1) % SNAP_ORDER.length])
    }
    setDragDelta(0)
  }

  // Apple Maps lifts the half-snap card off the screen edges so it floats
  // as a discrete object; peek and full sit edge-to-edge.
  const isFloating = snap === 'half'
  const sideInset = isFloating ? 8 : 0
  const bottomInsetPx = isFloating ? 8 : 0
  const easing = 'cubic-bezier(0.32, 0.72, 0, 1)'

  return (
    <div
      className="pointer-events-auto fixed z-[1100] mx-auto flex max-w-2xl flex-col bg-white shadow-[0_-10px_30px_-10px_rgba(15,23,42,0.22)]"
      style={{
        left: `${sideInset}px`,
        right: `${sideInset}px`,
        bottom: `calc(env(safe-area-inset-bottom) + ${bottomInsetPx}px)`,
        height: `${effectiveHeight}px`,
        borderRadius: isFloating ? '22px' : '22px 22px 0 0',
        transition: isDraggingRef.current
          ? 'none'
          : `height 280ms ${easing}, left 240ms ${easing}, right 240ms ${easing}, bottom 240ms ${easing}, border-radius 240ms ${easing}`,
      }}
      role="dialog"
      aria-label="Trip details"
    >
      <button
        type="button"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        className="flex h-9 w-full shrink-0 cursor-grab touch-none items-center justify-center active:cursor-grabbing"
        aria-label="Resize bottom sheet"
      >
        <span className="h-1.5 w-10 rounded-full bg-slate-300" />
      </button>

      <div className="shrink-0 px-4 pb-2">{peek}</div>

      <div className="flex-1 overflow-y-auto overscroll-contain px-4 pb-6">
        {children}
      </div>
    </div>
  )
}

function useViewportHeight() {
  const [vh, setVh] = useState(() =>
    typeof window !== 'undefined' ? window.innerHeight : 800,
  )
  useEffect(() => {
    const handler = () => setVh(window.innerHeight)
    window.addEventListener('resize', handler)
    window.addEventListener('orientationchange', handler)
    return () => {
      window.removeEventListener('resize', handler)
      window.removeEventListener('orientationchange', handler)
    }
  }, [])
  return vh
}
