# EARTHOS AI: Design System Specifications
### The Core Interface Architecture of the Resource Operating System
*Version 1.0 — Global Component Library*

---

This document establishes the official Design System for **EARTHOS AI**. It defines the design tokens, visual guidelines, component specifications, motion behavior, and structural frameworks required to maintain visual consistency across all web and mobile platforms.

---

## 1. Design Tokens

Design tokens are the visual atoms of our interface. They represent spacing, colors, sizing, and transitions as structured, theme-agnostic variables.

```
Design Token Taxonomy:
  sys.color.[theme].[category].[variant]   -> e.g. sys.color.dark.primary.base
  sys.space.[scale]                       -> e.g. sys.space.md (16px)
  sys.radius.[scale]                      -> e.g. sys.radius.lg (24px)
  sys.motion.[duration].[curve]           -> e.g. sys.motion.standard.expressive
```

---

## 2. Color Tokens (Dark & Light)

We use an HSL-centric color palette to allow for precise opacity blending and glassmorphic card overlays.

### Light Theme Tokens
*   `sys.color.light.bg.main` → HSL `(0, 0%, 100%)` (Pure White)
*   `sys.color.light.bg.card` → HSL `(210, 40%, 98%)` (Faint Slate Gray)
*   `sys.color.light.border` → HSL `(210, 30%, 90%)` (Faint Light Gray)
*   `sys.color.light.text.primary` → HSL `(220, 20%, 12%)` (Deep Slate Black)
*   `sys.color.light.text.secondary` → HSL `(220, 15%, 45%)` (Muted Slate Gray)
*   `sys.color.light.primary.base` → HSL `(122, 45%, 34%)` (Earth Green)
*   `sys.color.light.secondary.base` → HSL `(212, 80%, 42%)` (Ocean Blue)
*   `sys.color.light.accent.base` → HSL `(188, 100%, 41%)` (Sky Cyan)

### Dark Theme Tokens
*   `sys.color.dark.bg.main` → HSL `(220, 48%, 8%)` (Deep Space Dark)
*   `sys.color.dark.bg.card` → HSL `(218, 39%, 14%)` (Sleek Glass Indigo)
*   `sys.color.dark.border` → HSL `(218, 25%, 22%)` (Indigo Slate Border)
*   `sys.color.dark.text.primary` → HSL `(210, 40%, 98%)` (Bright Light Slate)
*   `sys.color.dark.text.secondary` → HSL `(215, 20%, 82%)` (Muted Cool Gray)
*   `sys.color.dark.primary.base` → HSL `(122, 40%, 45%)` (Bright Earth Green)
*   `sys.color.dark.secondary.base` → HSL `(212, 70%, 55%)` (Vibrant Ocean Blue)
*   `sys.color.dark.accent.base` → HSL `(188, 90%, 50%)` (Bright Sky Cyan)

---

## 3. Typography System

We use a three-font typographic hierarchy that balances editorial personality with analytical precision.

*   **Headings:** `Space Grotesk` (Bold/Medium weights for a futuristic, geometric feel).
*   **Body & UI Label Text:** `Inter` (Regular/Medium/SemiBold weights for clean, readable screens).
*   **Telemetry & Data:** `JetBrains Mono` (Monospaced alignment for tables, numbers, and stats).

| Size Token | Font | Font Size (px) | Line Height (%) | Weight | Usage |
| :--- | :--- | :---: | :---: | :--- | :--- |
| `font.size.h1` | Space Grotesk | 64px | 110% | Bold (700) | Landing Hero titles |
| `font.size.h2` | Space Grotesk | 48px | 120% | Bold (700) | Section Headers |
| `font.size.h3` | Space Grotesk | 36px | 125% | Medium (500) | Widget Headers, Modals |
| `font.size.h4` | Space Grotesk | 28px | 130% | Medium (500) | List item headers |
| `font.size.body` | Inter | 18px | 150% | Regular (400) | Paragraphs, text blocks |
| `font.size.label` | Inter | 16px | 140% | SemiBold (600) | Buttons, form tags |
| `font.size.small` | Inter | 14px | 140% | Regular (400) | Captions, metadata labels |
| `font.size.mono` | JetBrains Mono | 16px | 140% | Medium (500) | Table numbers, CO2 ratings |

---

## 4. Grid System

*   **Desktop Grid:** 12-column layout. Max-width constraints set at `1440px`. Column gutter width is `24px` with page margins set to `80px` outer margins.
*   **Tablet Grid:** 8-column layout. Margin constraint set at `40px` outer margins, with column gutters set to `16px`.
*   **Mobile Grid:** 4-column layout. Margin constraint set at `16px` outer margins, with column gutters set to `12px`.

---

## 5. Spacing System

Our spacing scale is built on an **8px base unit** to ensure linear layout scaling across all devices:

```
sys.space.xs   -> 4px
sys.space.sm   -> 8px
sys.space.md   -> 16px
sys.space.lg   -> 24px
sys.space.xl   -> 32px
sys.space.xxl  -> 48px
sys.space.xxxl -> 64px
```

---

## 6. Border Radius

Corners are rounded to create a soft, friendly visual environment:

*   `sys.radius.sm` → **6px** (Used for checkboxes, tight badges, and small inputs).
*   `sys.radius.md` → **12px** (Used for buttons, text inputs, and dropdown menus).
*   `sys.radius.lg` → **24px** (Used for dashboard widgets, main cards, and modals).
*   `sys.radius.xl` → **32px** (Used for hero banners and parent card containers).
*   `sys.radius.full` → **9999px** (Used for pill badges and circular avatars).

---

## 7. Elevation & Shadows

Shadows create a sense of layering and depth, keeping critical interaction levels separate.

### Light Theme Shadows
*   `sys.elevation.low` → `box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05)` (Basic input grids).
*   `sys.elevation.mid` → `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08)` (Normal card elements).
*   `sys.elevation.high` → `box-shadow: 0 12px 36px rgba(0, 0, 0, 0.12)` (Modals, popups, and dropdown menus).

### Dark Theme Shadows
*   `sys.elevation.low` → `box-shadow: 0 1px 3px rgba(0, 0, 0, 0.20)`
*   `sys.elevation.mid` → `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.30)`
*   `sys.elevation.high` → `box-shadow: 0 12px 36px rgba(0, 0, 0, 0.40)`

---

## 8. Glassmorphism Guidelines

To maintain visual depth and premium feel, card elements feature translucent backgrounds:

```css
/* Dark Theme Glass Card Style */
.glass-card-dark {
  background: hsla(218, 39%, 14%, 0.70); /* sys.color.dark.bg.card at 70% opacity */
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid hsla(218, 25%, 22%, 0.40); /* sys.color.dark.border at 40% opacity */
  box-shadow: sys.elevation.mid;
}

/* Light Theme Glass Card Style */
.glass-card-light {
  background: hsla(210, 40%, 98%, 0.80); /* sys.color.light.bg.card at 80% opacity */
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid hsla(210, 30%, 90%, 0.50); /* sys.color.light.border at 50% opacity */
  box-shadow: sys.elevation.mid;
}
```

---

## 9. Buttons

Buttons follow a strict hierarchy and include clear interaction feedback states:

```
  PRIMARY BUTTON       SECONDARY BUTTON      TERTIARY BUTTON
┌────────────────┐   ┌────────────────┐   ┌────────────────┐
│   [ Label ]    │   │   [ Label ]    │   │     Label      │
└────────────────┘   └────────────────┘   └────────────────┘
```

### I. Primary Button (Action-oriented)
*   *Style:* Filled background using `sys.color.primary.base` with white text.
*   *Border Radius:* `sys.radius.md` (12px).
*   *Hover State:* Background darkens by 10% (via HSL adjustment).
*   *Active State:* Scales down slightly (`transform: scale(0.98)`).

### II. Secondary Button (Supporting Actions)
*   *Style:* Transparent background with a `1px` border using `sys.color.border`, text color matches `sys.color.text.primary`.
*   *Hover State:* Background changes to a 5% opacity tint of `sys.color.text.primary`.

### III. Tertiary Button (Discreet Actions)
*   *Style:* No background or border. Text color matches `sys.color.text.secondary`.
*   *Hover State:* Text color shifts to `sys.color.text.primary` with a subtle underline.

---

## 10. Inputs

*   **Text Inputs:**
    *   *Default State:* `1px` solid border (`sys.color.border`), background set to 100% opacity `sys.color.bg.card`. Corner radius set to `sys.radius.md` (12px). Text matches `sys.color.text.primary`.
    *   *Focus State:* Border color shifts to `sys.color.accent.base` (Sky Cyan) with a `3px` focus glow ring (`hsla(sys.color.accent, 0.20)`).
*   **Checkboxes & Radio Buttons:** Custom vector indicators sizing at `18x18px` with rounded borders (`sys.radius.sm`). Filled states use `sys.color.primary.base` (Earth Green) displaying a white validation checkmark.

---

## 11. Cards

Cards are the standard container components for all dashboards.

*   **Structure:**
    *   *Padding:* `sys.space.lg` (24px) for desktop; `sys.space.md` (16px) for mobile.
    *   *Border:* `1px` solid matching `sys.color.border` styles.
    *   *Corner Radius:* `sys.radius.lg` (24px).
*   **Hover Interaction:** Elevates slightly along the Y-axis (`transform: translateY(-4px)`) and increases shadow depth (`sys.elevation.mid` to `sys.elevation.high`).

---

## 12. Navigation Components

*   **Sidebar (Desktop):**
    *   *Width:* `260px` fixed width. Persistent layout along the left-hand screen edge.
    *   *Active Route Indicator:* Left-aligned `3px` vertical border color matching `sys.color.primary.base`. Background fill highlights the nav block using a 10% opacity tint of `sys.color.primary.base`.
*   **Tab Bar (Mobile):**
    *   *Height:* `64px` height with a translucent glass background (`backdrop-filter`).
    *   *Layout:* 5 icon actions spread evenly across the bar. The center scan action features a floating circular button matching the system color system.

---

## 13. Data Components

*   **Data Tables:**
    *   *Header Row:* Transparent background, bold monospaced headers (`font.size.small`), subtle `1px` bottom border line.
    *   *Body Rows:* Alternating background fills (5% opacity variations of `sys.color.bg.card`) to keep long tables readable.
    *   *Font:* Telemetry values use `font.size.mono` (`JetBrains Mono`) to ensure columns align cleanly.

---

## 14. Dashboard Widgets

Widgets are modular cards containing visual data highlights:

*   **KPI Scorecard:** Top label displays text metadata, center displays large data values (`36px` bold), bottom displays indicator percentages (green text for positive circular growth, red for negative).
*   **Mini Graph Widget:** Card wrapping a canvas element with line charts using soft gradient fills beneath the lines.

---

## 15. AI Components

AI-driven UI elements feature a distinct interactive theme to stand out from static data blocks:

*   **EarthGPT Chat Bubble:** Translucent card overlay displaying the custom AI Spark icon. Streams inline text and highlights suggested action chips below.
*   **Confidence Badge:** Text tag displaying prediction confidence (e.g., `Confidence: 98%`). Background uses green HSL for high confidence levels (>90%), yellow for medium (70-90%), and red/orange for low.

---

## 16. Marketplace Components

*   **Listing Card:**
    *   *Thumbnail:* Large `16:9` ratio image frame featuring rounded top corners (`sys.radius.lg`).
    *   *Details:* Left displays listing title and location distance tag; right displays the item's valuation price (`JetBrains Mono` bold).
    *   *Footer Actions:* Prominent `[ View Passport ]` action accompanied by a primary `[ Place Bid ]` button.

---

## 17. Earth Passport Components (Digital Product Passport)

The DPP component replicates the layout and security feel of a physical identification card.

```
+-------------------------------------------------------+
|  (Globe) EARTHOS PASSPORT                 [Verified]  |
|                                                       |
|  Material Class: Polyethylene [PE-95]                |
|  Current Owner: Varga Automotive Corp                 |
|  Token Signature: 8f8b...c65a                         |
|                                                       |
|  Material Lineage:                                    |
|  Origin ──► Facility A ──► In-Transit ──► Present     |
+-------------------------------------------------------+
```

*   **Lineage Visualizer:** A step-by-step progress visualizer tracking facility transfers. Active checkpoints display filled circles with connecting lines matching the primary green color system.

---

## 18. Earth Twin Components

*   **3D Viewport Widget:**
    *   *Dimensions:* Standard `16:9` viewport layout.
    *   *Controls:* Float overlays for zoom, orbit rotation, and fullscreen toggles.
    *   *Visual:* Transparent background showing 3D Gaussian Splat models with coordinate reference rings.

---

## 19. Carbon Wallet Components

*   **Balance Card:** Card featuring a deep indigo background gradient. Large balance display (`font.size.h2` using monospaced typography) with floating badges showing monthly gains (e.g., `+12.4 CO2 Credits`).
*   **Transaction Line Item:** Left displays a transaction icon and timestamp details; right displays currency values (green text for incoming credits, muted slate text for debits).

---

## 20. Notification Components

*   **Toast Alert:**
    *   *Dimensions:* `360px` width, fixed floating display in the top-right corner.
    *   *Structure:* Left displays a status indicator icon; center displays title/description text; right displays a close `[ X ]` button.
    *   *Hover State:* Pause toast dismiss timer.

---

## 21. Loading Components

We use animated skeletons rather than progress bars:

*   **Skeleton Blocks:** Text blocks and card regions display a gray background block featuring a slow shimming transition gradient loop (`sys.motion.slow`).
*   **Spinner:** A clean, thin-stroke circle spinner (`2px` weight) using primary green accents for small action items.

---

## 22. Empty States

*   **Layout:** Centered column container.
*   **Illustration:** Muted, geometric outline illustrations sizing at a maximum of `120x120px`.
*   **Call-to-Action:** Direct action button positioned below descriptive state text to guide recovery.

---

## 23. Error States

*   **Form Errors:** Red text inline labels (`font.size.small`) positioned below the input container. The input box border highlights in red (`sys.color.error`).
*   **Modal Errors:** Simple overlay modal presenting the issue details and offering direct `[ Dismiss ]` and `[ Retry ]` options.

---

## 24. Motion Design Tokens

All system transitions must feel smooth, responsive, and follow natural easing physics:

### Transition Durations
*   `sys.motion.duration.fast` → **150ms** (Button presses, hover effects, icon state shifts).
*   `sys.motion.duration.standard` → **300ms** (Card expansions, slide-ins, menu drop-downs).
*   `sys.motion.duration.slow` → **800ms** (Ambient transitions, skeleton loading shimmers).

### Easing Curves
*   `sys.motion.curve.expressive` → `cubic-bezier(0.4, 0, 0.2, 1)` (Standard dynamic UI transitions).
*   `sys.motion.curve.linear` → `cubic-bezier(0, 0, 1, 1)` (Loading animations and shimmers).
*   `sys.motion.curve.exit` → `cubic-bezier(0.4, 0, 1, 1)` (Closing menus, fading elements).

---

## 25. Icon System

*   **Vector Construction:** Standard SVGs sized to a `24x24px` grid viewport.
*   **Stroke weight:** Constant `2px` stroke weight.
*   **Rounding:** All joints and paths feature a `1px` rounding radius.
*   **Filled States:** Outline vectors fill with primary colors only when hovered, focused, or active.

---

## 26. Illustration Guidelines

*   **Material Aesthetic:** Visual layouts feature glassmorphic textures, translucent shapes, and soft aurora lighting details.
*   **Grid Consistency:** Avoid detailed character drawings. Use clean geometric models to maintain technical consistency.
*   **Lighting:** Single directional lighting source with soft, broad shadows to avoid harsh outlines.

---

## 27. Responsive Rules

*   **Breakpoints:**
    *   *Mobile:* Below `768px`.
    *   *Tablet:* `768px` to `1024px`.
    *   *Desktop:* Above `1024px`.
*   **Behavior:** Grids drop columns dynamically. Sidebars shift to bottom sheets on tablet/mobile screens. Layout margins decrease from `80px` on desktop to `16px` on mobile.

---

## 28. Accessibility Rules (WCAG 2.2 AA)

*   **Color Contrast:** All text must maintain a minimum contrast ratio of `4.5:1` against their backgrounds (`7:1` for enhanced readability standards).
*   **Focus Ring Indicator:** Active focus rings (`3px` cyan outline) must remain visible during keyboard navigation.
*   **Aria Roles:** Non-text elements must contain descriptive label properties (e.g., `aria-label="Generate Digital Product Passport"`).

---

## 29. Component States

Every component must design for six standard states:

1.  **Default (Idle):** The standard interactive state.
2.  **Hover:** Hover indicator shifts (e.g., HSL shifts, card elevations).
3.  **Active (Pressed):** Downscale animation (`scale(0.98)`) to confirm click.
4.  **Focused:** Custom focus rings activate (`3px` cyan border).
5.  **Disabled:** Opacity drops to 40% and pointer events are disabled (`pointer-events: none`).
6.  **Loading:** Interface elements show animated skeleton blocks.

---

## 30. Design Documentation Standards

*   **Naming Conventions:** Naming must follow standard BEM (Block-Element-Modifier) conventions or clean component variables (e.g., `eos-btn--primary`).
*   **Token Syncing:** Figma library tokens must sync to production codebases via JSON structures to prevent drift.
*   **Testing:** New components must pass automated contrast, accessibility, and responsiveness checks before code merge.
