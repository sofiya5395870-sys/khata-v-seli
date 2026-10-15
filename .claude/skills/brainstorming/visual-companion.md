# Visual Companion

In this environment, the "browser tab" for mockups, diagrams, and
throwaway prototypes is the **Artifact** tool, not a locally-hosted dev
server. Use it instead of starting any local server.

## How to use it

- **Mockups to react to:** publish a static HTML page (or a few, one per
  option) with the Artifact tool. Keep it rough — this is a throwaway for
  the conversation, not production UI.
- **Side-by-side options:** publish one artifact with the options laid
  out next to each other (e.g. a simple grid or tabs), so the human
  partner can compare without switching tabs.
- **Diagrams, flows, timelines, maps:** inline SVG or a simple HTML/CSS
  layout inside the same artifact is usually enough; no need for a
  diagramming library unless the shape is genuinely complex.
- **Clickable throwaway prototypes:** a single self-contained HTML file
  with inline JS is fine. Don't wire it to real data or real backend
  calls — it exists to validate direction, not to ship.

## When updating

If the human partner reacts and asks for a change, update the same
artifact (same `file_path`) rather than publishing a new one each time,
so the link stays stable across iterations.

## What NOT to do

- Don't treat this as a mode that moves the whole conversation into the
  browser. Most of brainstorming stays in chat; only genuinely visual
  questions go here.
- Don't polish these into real components. If the direction is approved
  and the project moves to `wireframes/`, `tokens/`, or `components/`,
  that's a new, deliberate build — not a promotion of the throwaway.
- Don't skip the offer-first rule in SKILL.md: only reach for this after
  the human partner has agreed to see something visual.
