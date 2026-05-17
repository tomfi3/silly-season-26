import type { Category } from '../data/types'

/**
 * Inline SVG glyphs used for both map markers (rendered into a Leaflet
 * divIcon as an HTML string) and React UI (legend, filter pills).
 *
 * Each glyph is a 16x16 viewBox path string so it scales cleanly. Glyphs
 * are tuned to read distinctly at small marker sizes (24 px), with the
 * stroke / fill split picked per icon so adjacent categories don't all
 * look like the same hollow circle.
 */
const PATHS: Record<Category, string> = {
  // Filled house with a chunky peaked roof + door — reads as "place to stay"
  accommodation:
    'M2 14V8l6-5 6 5v6h-4v-3.5H6V14H2Z',
  // Five-point star
  activity:
    'M8 1.5l1.9 3.85 4.25.62-3.07 3 .72 4.23L8 11.2l-3.8 2 .72-4.23L1.85 5.97 6.1 5.35 8 1.5Z',
  // Beach umbrella with pole + sand line
  beach:
    'M3 7c1-3.5 9-3.5 10 0H3ZM8 7v6.5M2.5 13.5h11',
  // Tilted surfboard with stringer line
  surf:
    'M3.5 12.5C4 7.5 8 3.5 12.5 3C13 8 9 12 3.5 12.5ZM6 11l5-6',
  // Two pronounced mountain peaks with a tiny sun
  hike:
    'M1 14l4.5-8 2.5 4.5 1.5-2.5 4.5 6H1ZM13 4.2a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Z',
  // Town skyline — three buildings of increasing height + a peaked roof
  scenic:
    'M2 9h3v5H2zM6 4l1.5-1.5L9 4v10H6zM10 7h3v7h-3z',
  // Fork + knife
  restaurant:
    'M4 1.5v6c0 .8.7 1.5 1.5 1.5V14M3.5 1.5v3M6.5 1.5v3M11 1.5c-1.5 0-2.5 1.5-2.5 4S9.5 9 11 9v5',
  // Paper airplane
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
