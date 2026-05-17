# Adding content from screenshots

This is the **primary** way content gets added to the map. The user shares a
screenshot — typically Booking.com, Skyscanner, an airline site, or Google
Maps — and you turn it into an entry in `src/data/`.

Screenshots are never complete. Coords, photos, canonical names and proper
descriptions almost always need a web search to fill in. The schemas in
[`screenshots/`](screenshots/) tell you what each type reliably contains and
what you need to look up.

> 📱 A lot of this work happens on **Claude Code mobile**, which is slower for file reads and web searches. Optimise for fewer steps. See [Mobile workflow](#mobile-workflow) at the bottom.

---

## The workflow

```
        ┌──────────────────────────────────────────────────┐
        │ 1. Receive screenshot                            │
        │ 2. Identify the type (match against schemas/)    │
        │ 3. Read the matching schema                      │
        │ 4. Extract everything the screenshot contains    │
        │ 5. Web-search the gaps                           │
        │ 6. Pick the trip part (geographic cues)          │
        │ 7. Default to "option", not "plan"               │
        │ 8. Add to the right src/data/*.ts file           │
        │ 9. Update the schema's Learnings section         │
        │ 10. pnpm build → commit                          │
        └──────────────────────────────────────────────────┘
```

### 1. Identify the type

Look at [`screenshots/README.md`](screenshots/README.md) for the table of known
types. Match on visual signals — header colour, button text, layout.

If you can't classify the screenshot:

- **STOP.** Don't guess.
- Tell the user: *"This looks like a [description]. I don't have a schema for it yet — should I create one called `[proposed-name]`?"*
- On confirmation, copy [`screenshots/_template.md`](screenshots/_template.md) into a new file, fill what you can from the screenshot, then proceed.

### 2. Extract what's there

Use the **"What this tells you directly"** section of the schema. Be literal —
copy text exactly. Don't paraphrase a property name or anglicise a place name.

### 3. Fill the gaps with web search

Use the **"What's missing — needs web search"** section. Common gaps:

| Gap | Search strategy |
| --- | --- |
| Coordinates (5 dp `[lat, lng]`) | Google Maps → right-click the pin → "What's here?". For accommodation, search the property name; for beaches/places, the proper name. |
| Hero photo | Wikipedia / Wikimedia Commons first (free, attributable). Then official tourism boards (visitportugal.com, regional tourism). Avoid Booking.com photos in commits (terms of service). |
| Canonical name | Wikipedia title is usually best (`Praia da Marinha`, not `Marinha Beach`). Use the Portuguese name with accents. |
| Description (1–2 sentences) | Distil from Wikipedia / visitportugal.com / Atlas Obscura. Don't paste verbatim — rewrite in our voice (see [content-conventions.md](content-conventions.md)). |
| Booking link | If the screenshot is from Booking.com / Airbnb, the URL is usually in the address bar in the screenshot. If not visible, search by property name + "booking" / "airbnb". |

### 4. Pick the trip part

Use geographic cues from the screenshot:

- Lisbon city → `lisbon`
- Sintra, Ericeira, Peniche, Óbidos, Nazaré → `west-coast`
- Lagos, Carvoeiro, Albufeira, Faro, Tavira → `algarve`

For ambiguous spots (e.g., a beach between two areas), use the rule in
[trip-sections.md](trip-sections.md): *"Which part of the trip am I most likely
to be on when I visit this?"*

### 5. Default to "option"

Almost everything from a screenshot is a candidate, not a confirmed plan. Default mapping:

| Type | Default | Override condition |
| --- | --- | --- |
| Accommodation | `bookingStatus: 'considering'` | Set `'booked'` only if the screenshot is a confirmation email or post-booking page showing a `bookingRef`. |
| Flight | `status: 'option'` | Set `'booked'` only if a PNR (6-char booking ref) is visible. |
| Beach / surf / hike / scenic / restaurant / activity | (no status field — these are always candidate locations) | n/a |

### 6. Add the entry

Open the right file in `src/data/` ([adding-locations.md](adding-locations.md))
and append. Use the schema's example as a template — don't reformat it.

### 7. Update the schema's Learnings

After every screenshot, append one or two lines to the schema's **Learnings**
section if you discovered:

- A new visual signal that helped (or would have helped) identify the type
- A field that was reliable when you thought it wouldn't be (or vice versa)
- A web-search trick that worked well
- An edge case (e.g., partially-loaded screenshot, foreign language UI)

This is how the schemas get better. Future you (or another agent) reads them
first; if they're tighter, the next extraction is faster. Keep entries short —
one line each.

### 8. Verify and commit

```bash
pnpm build       # must pass
pnpm dev         # eyeball the new marker
git add src/data/<file>.ts docs/agent-guides/screenshots/<schema>.md
git commit -m "add: <thing> from <source>"
```

---

## Mobile workflow

Claude Code mobile is more limited. File reads, web fetches, and search are
slower. Strategy:

1. **One screenshot per turn.** Don't try to batch — context gets confused.
2. **Read the schema once at the start**, then work from memory. Don't keep re-opening it.
3. **Extract everything you can without searching first.** Then do all the web searches in one pass.
4. **If a field can't be cleanly resolved, add a `TODO` comment in the data file** rather than blocking. Example:
   ```ts
   coords: [37.0902, -8.4127],   // TODO verify on desktop
   ```
5. **Commit after each screenshot.** Don't accumulate a giant uncommitted diff on mobile — it's hard to review on a phone.

---

## Adding a new schema

When you encounter a screenshot type that isn't in [`screenshots/`](screenshots/) yet:

1. Tell the user. Propose a name.
2. On confirmation, `cp docs/agent-guides/screenshots/_template.md docs/agent-guides/screenshots/<your-name>.md`
3. Fill in:
   - **What this looks like** — visual signals you'd use to identify another one
   - **What it tells you directly** — fields present in the screenshot
   - **What's missing** — fields you had to look up
   - **Mapping to our types** — which `src/data/types.ts` interface it becomes
4. Use the new schema to process the screenshot.
5. After processing, append to the **Learnings** section.
6. Add a row to the index table in [`screenshots/README.md`](screenshots/README.md).
7. Commit the schema alongside the data entry.

---

## Don'ts

- **Don't fabricate.** If a field isn't in the screenshot and you can't verify it via search, leave it off rather than guess. An entry with three reliable fields is more useful than seven half-right ones.
- **Don't commit Booking.com / Airbnb photos.** They're TOS-restricted. Use Wikipedia / Wikimedia Commons / official tourism photos.
- **Don't infer prices from search-result screenshots and present them as confirmed.** Always store as the `option` variant.
- **Don't normalise away the source.** If the screenshot says "Hotel Lisboa Plaza" and Wikipedia calls it "Lisboa Plaza Hotel", use the canonical name in `name` and put the source link in `links` — don't silently rename.
