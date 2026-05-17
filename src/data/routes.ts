import type { DriveRoute } from './types'

/**
 * Drive routes drawn as polylines. Waypoints are sparse — add ~5–15 points
 * that capture the rough shape; Leaflet smooths them at zoom-out.
 */
export const driveRoutes: DriveRoute[] = []
