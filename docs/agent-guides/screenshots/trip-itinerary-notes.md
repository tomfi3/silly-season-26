# Apple Notes — trip itinerary

> Schema for screenshots from a **note-taking app** (Apple Notes, Google Keep, Notion, etc.) where the user has sketched out the **trip plan** day-by-day. This is the closest thing we have to a master plan — most other screenshots add detail to a slot the notes already define.

## Visual signals

- **Plain document layout**, no commercial chrome (no Booking.com / airline branding).
- **Coloured highlight bands** behind day headings, grouping consecutive days into trip sections. Colours are user-picked, not standardised — read the section header text rather than the hue.
- **All-caps section headers** like `LISBON <4N`, `WEST COAST 2N`, `ALGARVE ~5N` — these announce a leg and its night count.
- **Day rows** of the form `Weekday + date — short purpose`, followed by:
  - A line or two of suggested places (comma-separated)
  - Sometimes an `Accom <area> (<property> = £<total>)` line
  - Sometimes an inline flight time for a named traveller
- **Emoji icons** decorating each line (✈️ plane = travel day, 🏖️ = beach, 🚗 = drive, 🏰 = town, 🏄 = surf). They're cues for category, but don't rely on them — text wins.

## What it tells you directly

The notes are a working plan, not a confirmation. Read them as a structured
day-by-day intent, not as a list of bookings. Each day in the notes has the
same shape:

```
<Weekday + date> — <one-line purpose / location> <emojis>
<bullet 1 — suggested place / activity / vibe>
<bullet 2 — ...>
Accom <area> (<property name> = £<total>)
```

| Field | Where it appears | How to read it |
| --- | --- | --- |
| Trip-section colour bands | Highlight colour behind each day's heading | Lisbon = purple/pink, West Coast = orange/amber, Algarve = teal/green. Maps to our `tripId`. |
| Day purpose | The one-line heading next to the date | "Road Trip" = a driving day. "City days" = day in town. "Adventure", "Walk & chill", etc. = vibe for the day. |
| Section header | All-caps line: `LISBON <4N`, `WEST COAST 2N`, `ALGARVE ~5N` | Number of nights for that leg. `<` means "up to". |
| Section totals in parens | `(🚗£150, 🏠£180) (50,60pp)` | Group-level estimates for the section (car hire, accom, per-person). Useful context but never per-marker. |
| Suggested places | Comma-separated names inside a day's block | Each is a candidate marker. Research → add as the right category (`beach`, `surf`, `scenic`, `activity`, etc.). |
| Accommodation hints | `Accom near <area> (<property> = £<total>)` | Property name + total for the leg. Pair with a Booking.com screenshot for the full entry. |
| Flight times | Inline within a person's row: `<airport> > <airport> <HH:MM>` | Local times. Use the section's date for the calendar day. |

## What it suggests but doesn't confirm

| Field | Inference | How to verify |
| --- | --- | --- |
| `status` on every marker | Everything here is a candidate — the plan can shift between screenshots | Default to `'idea'` for accommodation / activity / restaurant. Beaches / surf / hike / scenic stay un-`status`ed (default `decided` for "places we'd visit"). |
| Driving routes | The order of bullets on a road-trip day implies the rough geographic order | Don't trace bullet-by-bullet. Routes are the **main travel arcs** between overnight stops (e.g. Lisbon → Arrifana, Arrifana → Alvor). Each suggested stop becomes an independent marker, not a route waypoint. |
| Specific times within a day | "Walk & chill", "Adventure" | Don't assign a `date` unless the screenshot pins something to that day with a time. |
| Property identity | Only the short name is shown (`Arrifana = £170`, `Alvor = £339`) | Pair with the Booking.com info+pricing screenshots before creating the accommodation entry. If price differs between the notes and the Booking.com shot, trust the booking screenshot. |

## What's missing — needs web search

| Field | Search strategy |
| --- | --- |
| Coordinates for every place name | Google Maps for the canonical Portuguese name. Towns → centroid. Beaches → the actual beach pin, not the parking. Surf spots → the line-up. |
| Canonical name (with accents) | Portuguese Wikipedia for towns / beaches: `Praia da Bordeira`, `Vila Nova de Milfontes`. |
| Trail / route metadata | For hikes named in the notes, look up the PR code and length (e.g. PR1 LGA for Seven Hanging Valleys). |
| Flight numbers / airlines | Notes only give times. Leave airline / flightNumber off until a Skyscanner or airline-confirmation screenshot lands. |

## Mapping to our types

A notes screenshot rarely becomes a single entry — it fans out into several
files. The expected fan-out:

| Notes content | Goes to | Status |
| --- | --- | --- |
| Section header (`WEST COAST 2N`) | Nothing on the map directly; used to pick `tripId` for items in that section | — |
| Daily purpose / overnight area | Sets the `tripId` for everything in that day's bullets | — |
| "Road Trip" day with multiple stops | Becomes **one route** between overnight stops + **one marker per stop** | Route is `'decided'` once we've agreed the leg shape. Stop markers default to `'idea'` for activity, no status for beach/scenic. |
| Beach / surf / scenic / hike names | `beaches.ts` / `surf.ts` / `scenic.ts` / `hikes.ts` | omit `status` (renders `decided`) — they're "places we'd visit" |
| Vague activity tokens ("boat", "kayak", "jeeps", "horses") | Don't add as markers without a specific provider/location. Note in a TODO comment in `activities.ts` so it's not forgotten. | — |
| `Accom <area> (<property> = £X)` | `accommodation.ts`, but only if there's a Booking.com screenshot for the property | `'idea'` |
| Flight times inline next to a person's name | `flights.ts` (+ `airports.ts` if a new IATA code appears) | `'idea'` — notes-only flights aren't booked |

Trip-part assignment for ambiguous stops: use the day they appear on. The
notes group Comporta / Porto Covo / Vila Nova de Milfontes under the
"Thu — Road Trip" West Coast day, so they're `tripId: 'west-coast'` even
though `trip-sections.md` previously suggested Comporta could be `algarve`.
**The notes win** — they're the user's current mental model of the trip.

## Default status

- Accommodation / activity / flight: `'idea'`
- Beach / surf / scenic / hike: omit `status`
- Routes: `'decided'` for the overnight-to-overnight arcs (these are the spine of the plan)

## How notes screenshots evolve

The user will share *updated* notes screenshots as the plan changes — a new
overnight area, a swapped day. When a new screenshot arrives:

1. Diff it against existing markers/routes in your head.
2. **Add** newly-mentioned items.
3. **Demote** items that have been removed from the plan (set `status: 'idea'`, or delete if they were only ever a suggestion that's been dropped — ask the user which).
4. **Re-tag** items whose `tripId` has changed because the overnight pattern shifted.
5. Refresh the schema's Learnings if you spotted a new visual cue (e.g. a strike-through, a new colour band).

Never silently delete a previously-`'decided'` item without asking — the user
might want to keep it as an option even if it's no longer on the plan.

## Processing checklist

```
[ ] Identify section colour bands (Lisbon / West Coast / Algarve)
[ ] Note the night counts per section
[ ] List every place name across all days, grouped by section
[ ] List every flight time + traveller mentioned
[ ] List the overnight arcs (one per consecutive same-area block)
[ ] Web-search coords in batches, by section
[ ] Write markers (beach/surf/scenic/hike/activity)
[ ] Write routes (one per arc — main waypoints only)
[ ] Write flights (skeleton; airline/flight no. left blank)
[ ] pnpm build → commit
```

## Learnings (append-only)

- Apple Notes highlight colours don't always match our trip colours; map by section header (`LISBON`, `WEST COAST`, `ALGARVE`) rather than by hue, since the user picks whatever colours look distinct in their notes app.
- Section header night counts (`<4N`, `2N`, `~5N`) are a good sanity check that you've understood the cadence. If your route arcs imply a different number of overnights, recheck the day groupings.
- Vague verbs without a venue ("kayak", "boat", "jeeps") are a trap — they look like activities but have no `coords`. Leave them as a TODO in `activities.ts` rather than guessing a provider.
- The notes occasionally show a `£` estimate next to an accommodation name (e.g. "Arrifana = £170") that may not exactly match the eventual Booking.com price (we saw £170 in the notes vs £179 in the booking shot). Trust the Booking.com number; the notes value is the user's mental rounding.
