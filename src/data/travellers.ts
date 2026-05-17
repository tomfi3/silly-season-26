import type { Traveller } from './types'

/**
 * The three of us. Rename when ready — keep the `id` stable so flight
 * references don't break.
 */
export const travellers: Traveller[] = [
  { id: 'p1', name: 'Tom',        initials: 'T', color: '#0ea5e9' },
  { id: 'p2', name: 'Traveller 2', initials: '2', color: '#10b981' },
  { id: 'p3', name: 'Traveller 3', initials: '3', color: '#a855f7' },
]

export function getTraveller(id: Traveller['id']): Traveller | undefined {
  return travellers.find((t) => t.id === id)
}
