import { useState } from 'react'
import { TripMap } from './components/TripMap'
import { Legend } from './components/Legend'
import type { Category, TripId } from './data/types'

const ALL_TRIPS: TripId[] = ['lisbon', 'west-coast', 'algarve']
const ALL_CATEGORIES: Category[] = [
  'accommodation',
  'activity',
  'beach',
  'surf',
  'hike',
  'scenic',
  'restaurant',
  'airport',
]

function App() {
  const [activeTrips, setActiveTrips] = useState<Set<TripId>>(() => new Set(ALL_TRIPS))
  const [activeCategories, setActiveCategories] = useState<Set<Category>>(
    () => new Set(ALL_CATEGORIES),
  )
  const [legendOpen, setLegendOpen] = useState(false)

  const toggleTrip = (id: TripId) => {
    setActiveTrips((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const toggleCategory = (c: Category) => {
    setActiveCategories((prev) => {
      const next = new Set(prev)
      next.has(c) ? next.delete(c) : next.add(c)
      return next
    })
  }

  return (
    <div className="fixed inset-0 overflow-hidden">
      <TripMap activeTrips={activeTrips} activeCategories={activeCategories} />
      <Legend
        activeTrips={activeTrips}
        onToggleTrip={toggleTrip}
        activeCategories={activeCategories}
        onToggleCategory={toggleCategory}
        open={legendOpen}
        onToggleOpen={() => setLegendOpen((o) => !o)}
      />
    </div>
  )
}

export default App
