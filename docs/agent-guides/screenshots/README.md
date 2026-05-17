# Screenshot schemas

One file per type of screenshot the user shares. Each file is a living
playbook — agents update the **Learnings** section after every extraction.

Read [`../from-screenshots.md`](../from-screenshots.md) first for the
end-to-end workflow.

## Known schemas

| Source | Type | File | Maps to |
| --- | --- | --- | --- |
| Booking.com | Property info page | [booking-com-accommodation-info.md](booking-com-accommodation-info.md) | `Accommodation` |
| Booking.com | Pricing / dates view | [booking-com-accommodation-pricing.md](booking-com-accommodation-pricing.md) | `Accommodation` (price + dates) |
| Skyscanner | Flight search results | [skyscanner-flight-search.md](skyscanner-flight-search.md) | `Flight` (status: option) |
| Airline site | Booking confirmation | [airline-flight-booking.md](airline-flight-booking.md) | `Flight` (status: booked) |
| Google Maps | Place card | [google-maps-place.md](google-maps-place.md) | any location type |

## Adding a new schema

1. Copy [`_template.md`](_template.md) to `<source>-<type>.md`.
2. Fill the **Visual signals** and **Mapping** sections from the screenshot.
3. Use it to process the screenshot.
4. Append to **Learnings** with anything that wasn't obvious.
5. Add the row to the table above.

> Try not to over-split. If two screenshot variants share most fields, one
> schema with a "Variants" section is fine. Split only when the extraction
> rules genuinely differ.
