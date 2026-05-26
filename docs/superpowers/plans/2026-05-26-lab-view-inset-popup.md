# Lab View Inset Popup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert `LabView` to render as a small inset popup overlaid on the simulation viewer rather than replacing the full center area, except on the intro page (Module A_B_AB page 1) which retains full-screen behavior.

**Architecture:** `LabView.tsx` derives `isIntroPage` from context and conditionally renders either a compact inset panel or the existing full-screen layout. The inset uses a CSS `::before` pseudo-element with `filter: blur()` for the blurred lab background. `ScaleBar` receives a `className` prop so its container's absolute positioning can be overridden for the inset's flex layout.

**Tech Stack:** React, TypeScript, CSS Modules (`classnames` package already in use)

---

### Task 1: Add `className` prop to `ScaleBar`

**Files:**
- Modify: `src/components/ScaleBar.tsx`

- [ ] **Step 1: Update `ScaleBarProps` and forward `className` to the container div**

Replace the file contents of `src/components/ScaleBar.tsx` with:

```tsx
import React, { useContext } from "react";
import classNames from "classnames";

import styles from "./scalebar.module.css";
import { MICRO } from "../constants";
import { SimulariumContext } from "../simulation/context";

interface ScaleBarProps {
    productColor: string;
    className?: string;
}

const ScaleBar: React.FC<ScaleBarProps> = ({ productColor, className }) => {
    const { maxConcentration } = useContext(SimulariumContext);
    const labelArray = [];
    const interval = maxConcentration / 5;
    for (let i = maxConcentration; i >= 0; i = i - interval) {
        labelArray.push(i);
    }
    return (
        <div
            className={classNames(styles.container, className)}
            role="img"
            aria-label={`Color key for the cuvette. The lowest concentration (white) is 0 ${MICRO}M and the highest concentration (yellow) is ${maxConcentration} ${MICRO}M.`}
        >
            <div className={styles.labels}>
                {labelArray.map((i) => (
                    <div key={i}>
                        {i} {MICRO}M -{" "}
                    </div>
                ))}
            </div>
            <div
                style={{
                    background: `linear-gradient(0deg, #ffffff 0%, ${productColor} 100%)`,
                }}
                className={styles.scaleBar}
            ></div>
        </div>
    );
};

export default ScaleBar;
```

The only changes from the original: added `import classNames from "classnames"`, added `className?: string` to props, and changed `className={styles.container}` to `className={classNames(styles.container, className)}`.

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Verify existing lab view still works**

Run: `npm run dev`
Navigate to a page with "Lab view" and confirm the full-screen lab view still renders correctly with the scale bar visible.

- [ ] **Step 4: Commit**

```bash
git add src/components/ScaleBar.tsx
git commit -m "feat: add optional className prop to ScaleBar"
```

---

### Task 2: Add inset CSS classes to `labview.module.css`

**Files:**
- Modify: `src/components/labview.module.css`

- [ ] **Step 1: Append the inset styles**

Add the following to the end of `src/components/labview.module.css`:

```css
/* ── Inset panel (all pages except intro) ──────────────── */

.inset {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 210px;
    border: 1px solid var(--app-border-color);
    overflow: hidden;
    z-index: var(--bottom);
}

/* Blurred lab background image behind inset content */
.inset::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url("../assets/ipub-bg_4.png");
    background-size: cover;
    background-position: center;
    filter: blur(3px);
    transform: scale(1.1); /* prevents blurred edges from bleeding to border */
    z-index: 0;
}

.insetLabel {
    position: relative;
    z-index: 1;
    padding: 6px 8px 4px;
    font-size: 12px;
    font-weight: 600;
    color: var(--primary-color);
    border-bottom: 1px solid var(--app-border-color);
}

.insetBody {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    padding: 8px;
    gap: 8px;
    /* 166px = scale bar height; 24px = top+bottom padding */
    height: 190px;
}

/* Override ScaleBar's absolute positioning so it participates in flex layout */
.scaleBarInset {
    position: static !important;
    bottom: unset !important;
    right: unset !important;
}

.insetCuvette {
    width: 70px;
    flex-shrink: 0;
}
```

The `!important` on `.scaleBarInset` is required because `ScaleBar`'s own CSS module class (`.container`) and this override class have identical CSS specificity — source order alone cannot guarantee which wins.

- [ ] **Step 2: Verify no CSS compile errors**

Run: `npm run dev`
Expected: dev server starts without errors.

---

### Task 3: Update `LabView.tsx` to render inset or full-screen

**Files:**
- Modify: `src/components/LabView.tsx`

- [ ] **Step 1: Replace the full contents of `src/components/LabView.tsx`**

```tsx
import Rainbow from "rainbowvis.js";
import { useContext, useMemo } from "react";
import { SimulariumContext } from "../simulation/context";
import Cuvette from "./icons/Cuvette";
import styles from "./labview.module.css";
import classNames from "classnames";
import ScaleBar from "./ScaleBar";
import { Module } from "../types";

const LabView: React.FC = () => {
    const {
        currentProductionConcentration,
        maxConcentration,
        page,
        getAgentColor,
        productName,
        module,
    } = useContext(SimulariumContext);
    const color = getAgentColor(productName);
    const colorGradient = useMemo(() => {
        const rainbow = new Rainbow();
        rainbow.setSpectrum("#FFFFFF", color);
        return rainbow;
    }, [color]);
    const position = (currentProductionConcentration / maxConcentration) * 100;
    const isIntroPage = page === 1 && module === Module.A_B_AB;

    if (!isIntroPage) {
        return (
            <div className={styles.inset}>
                <div className={styles.insetLabel}>In the wet lab</div>
                <div className={styles.insetBody}>
                    <ScaleBar
                        productColor={color}
                        className={styles.scaleBarInset}
                    />
                    <div className={styles.insetCuvette}>
                        <Cuvette color={colorGradient.colorAt(position)} />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={classNames(styles.container, styles.top)}>
            <div className={styles.cuvette}>
                <Cuvette color={colorGradient.colorAt(position)} />
            </div>
        </div>
    );
};

export default LabView;
```

Changes from the original:
- `VisibilityControl` import removed — it was only used to hide the `ScaleBar` on the intro page; the `isIntroPage` branch now handles that by simply not rendering `ScaleBar` in full-screen mode.
- Full-screen branch always applies `styles.top` (z-index 200, above side panels) — the conditional was `page === 1 && module === Module.A_B_AB`, which is always true when `isIntroPage` is true.
- Inset branch renders a compact panel with label, `ScaleBar`, and `Cuvette`.

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Visual verification — inset mode**

Run: `npm run dev`

Navigate to any page **after** the intro page and click "Lab view":
1. Molecular simulation remains visible and running in the background ✓
2. Inset panel appears in the upper-right corner of the center viewer ✓
3. "In the wet lab" label appears at the top of the panel ✓
4. Scale bar (concentration labels + color gradient) is visible in the panel ✓
5. Cuvette is visible and updates color as concentration changes ✓
6. Blurred lab background image is visible behind the panel content ✓
7. Clicking "Molecular view" dismisses the panel ✓

- [ ] **Step 4: Visual verification — intro page full-screen mode**

Navigate to page 1 of Module 1 (first module, first page).
The full-screen lab background covers the center area (existing behavior). No "In the wet lab" label. No inset panel. ✓

- [ ] **Step 5: Tune visual values if needed**

The following values in `labview.module.css` can be adjusted to match the design:

| Property | Location | Default | What it controls |
|---|---|---|---|
| `width` | `.inset` | `210px` | Overall inset panel width |
| `filter: blur(Xpx)` | `.inset::before` | `3px` | Background image blur intensity |
| `height` | `.insetBody` | `190px` | Body height (should match scale bar height + padding) |
| `width` | `.insetCuvette` | `70px` | Cuvette width (height scales proportionally) |

Re-verify after any adjustments.

- [ ] **Step 6: Commit**

```bash
git add src/components/LabView.tsx src/components/labview.module.css
git commit -m "feat: convert lab view to inset popup overlay"
```

---

## Self-Review

**Spec coverage:**
- ✅ Inset popup, upper-right corner of center viewer
- ✅ Molecular simulation visible and running behind inset
- ✅ "In the wet lab" label in inset
- ✅ Scale bar + cuvette in inset
- ✅ Blurred lab background image in inset (experimenting with `blur(3px)`, tunable)
- ✅ Intro page (page 1, Module A_B_AB) retains full-screen behavior unchanged
- ✅ Toggle controlled by existing "Lab view" button — no close button on popup
- ✅ No animation

**Placeholder scan:** No TBDs. The visual tuning step (Task 3, Step 5) is intentional — blur intensity and panel sizing are aesthetic decisions best made against the running app.

**Type consistency:** `ScaleBarProps.className?: string` defined in Task 1, passed as `styles.scaleBarInset` (a CSS Modules class reference, type `string`) in Task 3. Consistent.

**Potential issue — `classnames` in ScaleBar:** The original `ScaleBar.tsx` did not import `classnames`. Task 1 adds the import. The package is already a dependency (`classnames` is used in multiple other components), so no `npm install` needed.
