# EARTHOS AI: Motion & Interaction Specifications
### The Motion Design System and WebGL Engineering Specification
*Version 1.0 — Creative Technology Docs*

---

This document establishes the official Motion & Interaction Specifications for **EARTHOS AI**. It defines the animation physics, timeline configurations, scroll orchestrations, WebGL graphics properties, and performance tuning rules required to build a smooth, high-fidelity experience.

---

## 1. Landing Hero Experience

### Hero Animation
*   **Trigger:** Page Load (`DOMContentLoaded`).
*   **Animation:** The primary tagline *"Nothing useful should ever become waste"* splits into characters and translates upwards while fading in. Simultaneously, the background aurora gradient expands outwards.
*   **Duration:** `1200ms`.
*   **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` (Ultra-smooth easeOutExpo).
*   **Accessibility:** Respects `prefers-reduced-motion` settings. If activated, character splits are disabled, defaulting to a simple `300ms` fade-in.
*   **Mobile Behavior:** The character splitting is replaced with simple paragraph transitions to conserve CPU.
*   **Desktop Behavior:** Includes mouse-parallax offsets on background layers (+/- 15px displacement).
*   **Performance Considerations:** Text uses GPU-accelerated translate parameters (`transform: translate3d()`) to prevent repaint cycles.
*   **React Three Fiber Opportunities:** Renders a 3D Earth sphere with custom shaders showing glowing network lines.
*   **GSAP Opportunities:** Utilizes `gsap.fromTo()` with a staggered delay of `0.015s` per character.

---

## 2. Scroll Storytelling

As the user scrolls down the landing page, a single GSAP-triggered timeline orchestrates the storytelling sequence:

```
[Scroll Start (0%)] ────► [Scroll Mid (50%)] ────► [Scroll End (100%)]
  - Earth rotates           - Earth zooms in          - Earth morphs to Grid
  - Text fades out          - Cards fade in           - Particles expand
  - Particles focus         - Stats increment         - Background turns Dark
```

*   **Trigger:** Scroll Position (`ScrollTrigger`).
*   **Animation:** 
    *   *Step 1 (0% - 30%):* The 3D Earth rotates 90 degrees along the Y-axis; the landing hero text fades out (`opacity: 0`).
    *   *Step 2 (30% - 60%):* The camera zooms into the Earth model. Translucent glass cards slide in to present product features; statistical counters animate from 0 to target values.
    *   *Step 3 (60% - 100%):* The Earth twin model transitions into an abstract grid representation. Particles expand to fill the screen background, and the background gradient darkens.
*   **Easing:** Smooth scrub matching the scroll velocity (`scrub: 1`).
*   **Accessibility:** Users navigating with screen readers can jump steps using keyboard controls; animations scroll-snap to critical milestones.
*   **Performance Considerations:** Uses `will-change: transform` on floating cards to promote rendering to a separate GPU layer.

---

## 3. React Three Fiber Scenes

The platform integrates nine WebGL-rendered scenes built on React Three Fiber:

1.  **Landing Hero Globe:** A high-polygon Earth sphere (`120x120` segments) wrapped in dynamic custom shaders. Shaders animate glowing green points across urban density coordinates.
2.  **Earth Twin Viewport:** Interactive 3D resource sphere displaying point-cloud particles representing biomass (green), polymers (cyan), and carbon emissions (indigo).
3.  **AI Scanner Viewport:** Fullscreen camera frame showing glowing target grids. A 3D scanning plane slides along the Y-axis to highlight detected object boundaries.
4.  **Digital Passport ID Card:** Interactive 3D card model that tilts in response to mouse movement, using translucent mesh materials.
5.  **Carbon Flow visualizer:** Flowing 3D curves of light representing carbon credit exchanges.
6.  **Marketplace Globe:** Interactive globe showing trade routes linking buyers and sellers, using curved vector line meshes.
7.  **Government Topographic Map:** Topographic map displaying municipal waste zones and collection fleets in real-time.
8.  **Enterprise Analytics Visualizer:** Dashboard card rendering material flows as a 3D Sankey diagram of glowing pipelines.
9.  **WebGL Loading Screen:** Minimal scene showing spinning particle rings around the EARTHOS AI logo mark.

---

## 4. Motion System

The interaction system defines eight standard transition states:

*   **Fade Transition:** `opacity` moves from `0` to `1` using `sys.motion.duration.standard` (300ms).
*   **Slide Transition:** `transform: translate3d(0, 30px, 0)` shifts back to base values using `sys.motion.curve.expressive`.
*   **Scale Transition:** Scales from `0.95` to `1.0` during card modal opens to create depth.
*   **Rotate Transition:** Slow continuous rotation (`1.5rpm`) on 3D globes.
*   **Morph Transition:** WebGL vertices interpolate morph targets during state changes.
*   **Spring Physics:** Applied to cursor controls and magnetic buttons.
```
  Spring Configuration:
    Stiffness: 120 (Responsive snap)
    Damping: 14 (Minimal bounce oscillation)
    Mass: 0.8
```
*   **Page Transitions:** Shared element transitions where clicked elements (e.g., card previews) scale up to form the header of the destination page.

---

## 5. Micro Interactions

### Button Hover & Press
*   **Trigger:** Cursor Enter / Active Press.
*   **Animation:** Hover shifts the HSL background color and increases shadow elevation. Press triggers a fast scale-down (`scale(0.98)`).
*   **Duration:** `150ms` (Fast).
*   **Easing:** `cubic-bezier(0.4, 0, 0.2, 1)`.

### Card Hover Elevation
*   **Trigger:** Cursor Enter.
*   **Animation:** Card elevates along the Y-axis (`translateY(-6px)`) and increases shadow depth (`sys.elevation.high`). Inner images scale up slightly (`scale(1.03)`).
*   **Duration:** `300ms`.

---

## 6. AI Animations

AI-driven UI elements feature a distinct interactive theme:

*   **EarthGPT Streaming:** Streaming text outputs display character-by-character with a blinking vertical cursor prompt. Prompt fades out 500ms after the output completes.
*   **AI Thinking State:** Shimmering gradient overlay (`background-position` animations) moves horizontally across card widgets.
*   **Voice Waveform:** Vertical vector lines animate using a sine wave function based on voice input decibel levels.
*   **Confidence Pulse:** Confidence tags glow with a breathing pulse animation (`1.5s` cycle duration) when values exceed 95%.

---

## 7. Scanner Experience

```
[Scan Start] ──► [Camera opens] ──► [Live Grid pulses] ──► [AI Scan passes]
                                                               │
[Passport Mints] ◄── [Success chime] ◄── [Line segments align] ┘
```

*   **Camera Initialization:** Viewport scales up from the center accompanied by a fast aperture iris expand animation.
*   **Live Target Grid:** Dotted target borders pulse with a breathing animation.
*   **Detection Sweep:** A horizontal neon green scanning plane moves up and down the frame.
*   **Object Highlight:** Outlines of identified items glow, displaying Cas registry codes in tooltips.
*   **Passport Generation:** A 3D digital passport card slides onto the screen with a scaling rotation, indicating successful registration.

---

## 8. Earth Twin Experience

*   **Ambient Rotation:** The 3D model rotates at a slow speed (`1rpm`) when idle.
*   **Atmospheric Clouds:** Translucent cloud sphere layer rotates independently at `1.2rpm` to add visual depth.
*   **Particle Flow Controls:** Adjusting simulation sliders (e.g., +20% recycle rate) triggers particle streams to redirect flow paths in real-time.
*   **Layer Selection Focus:** Selecting specific layers (water, plastic, carbon) changes the particle colors and fades out unselected nodes.
*   **Camera Zoom:** Scroll interactions zoom the viewport camera, automatically scaling down detail levels (LOD) as distance increases.

---

## 9. Marketplace Experience

*   **Interactive Drag-and-Drop:** Users can drag resource cards directly into sorting bins (e.g., dragging a copper batch card into the shipping basket card).
*   **Dynamic Search Filter:** Filtering listings triggers cards to fade out, and remaining listings dynamically reposition using smooth layout shifts (GSAP Flip).
*   **Image Lazy Load:** Item images fade in from a blurred placeholder as loading completes.

---

## 10. Dashboard Motion

*   **Dynamic Charts:** Line and bar charts animate their paths from base values on load (`800ms` duration).
*   **Incremental Counters:** Critical numbers count up to target values (e.g., carbon wallet credit increments).
*   **KPI Alerts:** Warning cards use a soft flashing outline color to draw immediate attention.

---

## 11. Loading Experiences

*   **Splash Screen:** The minimal EARTHOS AI logo mark fades in, displaying an animated glowing orbit ring.
*   **Skeleton Shimmer:** Gray placeholder cards display a horizontal shimming gradient animation to indicate active loading.
*   **Earth Globe Loader:** A wireframe planet rotates at a fast speed (`10rpm`), transitioning into the high-polygon model as data loads.

---

## 12. Cursor System

*   **Custom Interface Cursor:** Desktop views replace the system arrow cursor with a minimal `8px` circular dot.
*   **Hover Ring Glow:** Hovering over interactive elements expands the cursor dot into a `24px` ring, displaying custom hover text details (e.g., *"Drag to route"*).
*   **Magnetic Button Snapping:** Hovering close to buttons snaps the cursor to the center of the button container, applying elastic displacement.

```
  Magnetic Attraction Zone:
    Attraction Radius: 32px
    Lerp Factor: 0.15 (Smooth spring snap)
```

---

## 13. Page Transitions

*   **Standard Page Transition:** Entering pages slide up from the bottom while the outgoing page fades out.
*   **Shared Element Transitions:** Clicking on an item (e.g., a specific material in the inventory list) expands the item card to form the header of the destination page, keeping context consistent.
*   **Blur Transition:** Switching dashboards triggers a temporary blur overlay (`filter: blur(10px)`) that fades out as the new layout loads.

---

## 14. Sound Design (Future)

*   **Scan Success:** A high-frequency clean chime confirms item registration.
*   **Wallet Credit Earned:** A soft metallic click plays when earning circular points.
*   **System Alert:** A low-frequency warning tone flags hazard anomalies or network disconnections.

---

## 15. Performance Strategy

Maintaining a consistent **60 FPS** across devices is a core requirement for our interactive systems.

### I. Render & Vertices Optimizations
*   **Level of Detail (LOD):** WebGL scenes scale down polygon counts and disable complex shaders on mobile devices or when frame rates drop below 45 FPS.
*   **Draw Call Minimization:** We merge geometries of identical materials to render them in a single draw call.
*   **Shader Complexity:** Fragment shaders avoid expensive calculations like noise generation in real-time, relying instead on pre-rendered texture mapping.

### II. Asset Management
*   **Lazy Loading:** Large 3D models and textures are loaded in the background as the user scrolls, avoiding blocking the main thread.
*   **Compression:** Models are compressed using **Draco** compression, reducing file sizes by up to 80% to ensure fast page loads.
*   **Texture Sizing:** Textures are limited to `1024x1024` pixels on mobile and `2048x2048` on desktop, using mipmapping to optimize memory bandwidth.
*   **RequestAnimationFrame Control:** WebGL renders are paused when the canvas is scrolled out of view to free up GPU resources.
