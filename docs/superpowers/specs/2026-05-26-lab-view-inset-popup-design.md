# Lab View Inset Popup

**Date:** 2026-05-26  
**Branch:** feature/hover-lab-view

## Problem

When the user switches to "Lab view", the full-screen `LabView` component covers the entire center viewer, replacing the molecular simulation. The user cannot see the cuvette and the simulation at the same time.

## Goal

Show the cuvette as a small inset panel overlaid on the simulation viewer, so both are visible simultaneously. The intro page retains its existing full-screen cuvette behavior.

## Approach

Extend `LabView.tsx` to support two visual modes — full-screen and inset — derived from existing context values. No new components. `ViewSwitch.tsx` changes minimally.

## Design

### Mode switching

`LabView` derives `isInset` from context:

```
isInset = viewportType === ViewType.Lab
          && !(page === 1 && module === Module.A_B_AB)
```

- `isInset = false` → existing full-screen behavior (intro page only)
- `isInset = true` → inset panel (all other pages when lab view is active)

### ViewSwitch changes

The `Viewer` already renders unconditionally (it is last in the JSX stack). No change needed there. `LabView` continues to render when `viewportType === ViewType.Lab`.

### Inset panel layout

| Property | Value |
|---|---|
| Position | `absolute`, `top: 16px`, `right: 16px` |
| Width | ~160–180px (enough for scale bar + cuvette side-by-side) |
| Background | `ipub-bg_4.png` with blur applied (pseudo-element or filter) so the cuvette remains legible |
| Border | `1px solid var(--app-border-color)` |
| Label | "In the wet lab" text at top of panel |
| Contents | `ScaleBar` (left) + `Cuvette` (right) — components unchanged |
| z-index | `var(--bottom)` (z=10) — same as current full-screen container; already sufficient to sit above the `Viewer` but below side panels (z=100) |

The blur intensity and opacity on the background image should be tuned during implementation so the cuvette and scale bar are clearly readable.

### CSS changes

`labview.module.css` gains an `inset` class. The background image and full-screen sizing styles remain on `container` only and are not applied when rendering in inset mode.

```
.inset {
  position: absolute;
  top: 16px;
  right: 16px;
  width: ~170px;
  border: 1px solid var(--app-border-color);
  overflow: hidden;
  /* background image with blur via pseudo-element */
}
```

### What does not change

- `ScaleBar` and `Cuvette` components — no modifications
- The "Lab view" / "Molecular view" toggle button — behavior unchanged
- Intro page full-screen behavior — unchanged
- No animation on show/hide

## Files to change

| File | Change |
|---|---|
| `src/components/LabView.tsx` | Add `isInset` logic; conditional render of label and inset vs full-screen container |
| `src/components/labview.module.css` | Add `.inset` class with panel sizing, border, blurred background |
| `src/components/ViewSwitch.tsx` | Likely no change required |
