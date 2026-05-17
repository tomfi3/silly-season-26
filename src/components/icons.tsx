import type { Category } from '../data/types'

/**
 * Inline SVG glyphs used for both map markers (rendered into a Leaflet
 * divIcon as an HTML string) and React UI (legend, filter pills).
 *
 * Each glyph is a 16x16 viewBox path string so it scales cleanly.
 */
const PATHS: Record<Category, string> = {
  accommodation:
    'M2 13v-2.5l6-4.5 6 4.5V13H10v-3H6v3H2Z',
  activity:
    'M8 1.5l1.9 3.85 4.25.62-3.07 3 .72 4.23L8 11.2l-3.8 2 .72-4.23L1.85 5.97 6.1 5.35 8 1.5Z',
  beach:
    'M1.5 11c1.2-1 2.3-1 3.5 0s2.3 1 3.5 0 2.3-1 3.5 0 2.3 1 3.5 0M3 8c1.6-3.5 5.8-4.7 9-2.5M2.5 8.5l11.5-5',
  surf:
    'M2 12.5c2.5-7 9-9 12-7 .5 3.5-3.5 9-9 11-1.5-1-2.5-2.5-3-4ZM6 9l4-4',
  hike:
    'M1.5 13l4.5-7 3 4 2.5-3 3 6H1.5ZM10 4a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8Z',
  scenic:
    'M8 2.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm0 6.5c-3 0-5.5 1.5-6 4h12c-.5-2.5-3-4-6-4Z',
  restaurant:
    'M4 1.5v6c0 .8.7 1.5 1.5 1.5V14M3.5 1.5v3M6.5 1.5v3M11 1.5c-1.5 0-2.5 1.5-2.5 4S9.5 9 11 9v5',
  airport:
    'M14 9.5 9 7l-1-5h-.5L7 7 2 9.5V11l5-1 .5 3-2 1v1l3-.5 3 .5v-1l-2-1 .5-3 5 1V9.5Z',
}

/**
 * Returns the inner SVG markup (paths only) for a category. Strokes are used
 * for line-style icons (beach, surf, hike, restaurant); filled for chunky shapes.
 */
export function svgGlyphMarkup(category: Category, color = 'currentColor'): string {
  const lineIcons: Category[] = ['beach', 'surf', 'hike', 'restaurant']
  if (lineIcons.includes(category)) {
    return `<path d="${PATHS[category]}" fill="none" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`
  }
  return `<path d="${PATHS[category]}" fill="${color}"/>`
}

interface IconProps {
  category: Category
  size?: number
  className?: string
}

export function CategoryIcon({ category, size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      className={className}
      aria-hidden="true"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: svgGlyphMarkup(category) }}
    />
  )
}

export const CATEGORY_LABELS: Record<Category, string> = {
  accommodation: 'Stay',
  activity: 'Things to do',
  beach: 'Beach',
  surf: 'Surf',
  hike: 'Hike',
  scenic: 'View',
  restaurant: 'Eat',
  airport: 'Airport',
}
