# Icon-Only Lab Toggle Button

**Date:** 2026-08-11  
**Branch:** feature/hover-lab-view

## Problem

The lab-view toggle button (`ViewSwitch.tsx`) and the "In the wet lab" inset panel (`LabView.tsx`) are both anchored to `top: 16px; right: 16px`, so they render stacked in the same corner of the viewer and visually overlap instead of the panel sitting cleanly below the button.

## Goal

- The inset panel sits below the toggle button with a small gap, no overlap.
- The toggle button shows its icon only — no "Lab view" / "Simulation view" text.

## Approach

Two small, independent changes, no new components:

1. Drop the button's text children, matching the icon-only `OverlayButton` pattern already used by `PlayButton.tsx`.
2. Move the inset panel's `top` offset down to clear the now-smaller button.

## Design

### Toggle button (`ViewSwitch.tsx`)

Remove the text children currently rendered inside the `OverlayButton`:

```tsx
{viewportType === ViewType.Lab ? "Simulation" : "Lab"} view
```

Leaving only the `icon` prop (`<Molecules />` / `<LabIcon />`), the same shape as:

```tsx
<OverlayButton onClick={handleClick} style={{ top: 14, left: 16 }} icon={...} />
```

in `PlayButton.tsx`. Ant Design's `Button` reduces to a compact square when it has an `icon` and no children, so no new sizing props are needed. Position (`top: 16, right: 16`, or centered on the intro page) is unchanged.

### Inset panel (`labview.module.css`)

Change `.inset`'s `top` from `16px` to `64px` (16px original offset + ~40px button height + 8px gap), keeping `right: 16px` so the panel remains right-aligned under the button.

```css
.inset {
    position: absolute;
    top: 64px;
    right: 16px;
    ...
}
```

### Why the intro page is unaffected

The panel and the centered button never render at the same time: both are gated by the same `page === 1 && module === Module.A_B_AB` condition (`isIntroPage` in `LabView.tsx`, `isFirstPageOfFirstModule` in `ViewSwitch.tsx`), just on opposite branches. When the button is centered, `LabView` renders its full-screen cuvette, not the inset panel. So the new `top: 64px` offset only ever applies alongside the top-right anchored button.

### What does not change

- Inset panel content — title text ("In the wet lab"), close button, `ScaleBar`, `Cuvette` — unchanged
- Intro page full-screen cuvette behavior — unchanged
- Button click behavior, icons used (`Molecules` / `LabIcon`) — unchanged

## Files to change

| File | Change |
|---|---|
| `src/components/ViewSwitch.tsx` | Remove text children from the `OverlayButton`, leaving icon-only |
| `src/components/labview.module.css` | Change `.inset`'s `top` from `16px` to `64px` |

## Testing

Visual check only:
- Toggle button renders icon-only in both Lab and Simulation states
- Inset panel sits below the button with a visible gap, no overlap, on a non-intro page
