# [Source] — [Type]

> Schema for screenshots from **[source]** showing **[what kind of view]**.

## Visual signals

How to recognise this type of screenshot. Be specific and observable —
colours, button text, layout patterns.

- Header / chrome:
- Primary content area:
- Buttons / CTAs:
- Distinguishing features:

## What it tells you directly

Fields that are reliably present and can be copied verbatim.

| Field | Where it appears in the screenshot |
| --- | --- |
| ... | ... |

## What it suggests but doesn't confirm

Fields you might infer but should verify before committing.

| Field | Inference | How to verify |
| --- | --- | --- |
| ... | ... | ... |

## What's missing — needs web search

Always-required fields that the screenshot doesn't contain.

| Field | Search strategy |
| --- | --- |
| ... | ... |

## Mapping to our types

Which interface from `src/data/types.ts` this becomes.

```ts
// Target type: <e.g. Accommodation>
// Default status / variant: <e.g. bookingStatus: 'considering'>

{
  id: '<prefix>-<slug>',
  // ...
}
```

## Default status

What status / state to set when sourced from this screenshot type.

## Learnings (append-only)

Add a short line each time you process a screenshot of this type and learn
something. Don't rewrite existing entries.

- _(empty)_
