import type { Accommodation } from './types'

/**
 * Accommodation options. Use `status: 'idea' | 'decided' | 'booked'` to mark
 * commitment. The marker renders hollow for 'idea', solid for 'decided', and
 * solid + check for 'booked'. See LocationStatus in src/data/types.ts.
 */
export const accommodation: Accommodation[] = []
