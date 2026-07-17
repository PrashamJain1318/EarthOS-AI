# EARTHOS AI: UI Design Specifications
### The Complete Visual and Interaction Design Blueprint
*Version 1.0 — Design-to-Development Specs*

---

This document establishes the UI Design Specifications for **EARTHOS AI**. It maps out the exact screen layouts, content hierarchies, interactive behaviors, and animations for all 20 core steps of the platform, optimized for implementation by frontend and graphics engineers.

---

## 1. Landing Website

### Screen Name: Landing Home Page
*   **Purpose:** Introduce the Earth's Resource OS, present the core value proposition, and drive user registration.
*   **Layout Structure:** One-column block scroll layout. Sections are constrained to a max-width of `1440px`. Features glassmorphic cards over deep dark aurora background gradients.
*   **Sections:**
    1.  *Navigation Header:* Sticky layout containing glassmorphic backgrounds, links to About, Features, Marketplace, Pricing, and a CTA `[ Get Started ]` button.
    2.  *Hero Canvas:* Title display: *"Nothing useful should ever become waste."* Left-aligned text details the OS definition; right features the interactive 3D rotating Earth canvas.
    3.  *Live Analytics Strip:* Horizontal band displaying real-time metrics (e.g., Tons Diverted, Active Passports, CO2 Abated).
    4.  *Product Demo Walkthrough:* Carousel tracking the user path (Scan → passport → match).
    5.  *Earth Twin Interactive Preview:* Large glass card showcasing a rotating 3D personal resource sphere.
    6.  *Testimonials & Press:* Grid of reviews from YC partners and enterprise CSOs.
    7.  *Footer:* 4-column structured links with API docs and standard legal information.
*   **Components Used:** `Header Navigation`, `Glass Card Container`, `Primary Button`, `3D Earth Viewport`, `Metrics Strip`, `Visual Carousel`, `Footer Component`.
*   **Content Hierarchy:** Main Tagline (64px Space Grotesk) → Value Statement (18px Inter) → CTA Buttons → Real-time Metrics → Feature Cards.
*   **User Actions:** Click `[ Get Started ]`, scroll to explore product demos, rotate the 3D Earth canvas, view digital passports.
*   **Navigation:** Top header redirects to auth portals, secondary links navigate to feature pages.
*   **Empty/Loading States:** Loading states display animated skeleton boxes for metrics; 3D canvas loads with a custom shimmering circular ring.
*   **Responsive Behavior:** 12-column desktop collapses to 1-column mobile. The 3D Earth slides beneath the text title on tablet and mobile views. Page margins drop from 80px to 16px.
*   **Dark / Light Mode:**
    *   *Dark Mode:* Deep indigo background (`#0B1220`) with neon green highlights and glowing borders.
    *   *Light Mode:* Pure white background (`#FFFFFF`) with soft gray card shadows and dark slate text.
*   **Accessibility Notes:** All images contain descriptive `alt` tags. Contrast ratios for text overlaying gradients maintain a `4.5:1` ratio.
*   **Animation Opportunities:** Hero tagline fades in from the bottom (`300ms cubic-bezier(0.25, 1, 0.5, 1)`). Hovering cards elevates them by 4px.
*   **React Three Fiber Opportunities:** The 3D rotating Earth is rendered using custom shader materials displaying glowing particle lines that represent material flows.

---

## 2. Authentication

### Screen Name: Sign-Up Wizard & Onboarding
*   **Purpose:** Register users, verify roles, and configure initial circular tracking preferences.
*   **Layout Structure:** Split layout. Left shows a rotating 3D particle sphere representing resource loops; right displays the structured onboarding form cards.
*   **Sections:**
    1.  *Authentication Card:* Options for social login (SSO, Google, Apple) or email credentials.
    2.  *Role Selector:* Interactive cards to choose user tier: Individual, NGO, Repair Shop, Recycler, Enterprise, or Government.
    3.  *Preference Settings:* Choose regional waste collection providers and toggle carbon credit settings.
*   **Components Used:** `Split Viewport`, `SSO Button Grid`, `Form Input Container`, `Dynamic Preference Cards`, `Navigation Footers`.
*   **Content Hierarchy:** Welcome Header (36px Space Grotesk) → Subtitle → Input Fields → Submit Primary Button.
*   **User Actions:** Select role card, input email/password, toggle notification preferences.
*   **Navigation:** `[ Next ]` and `[ Back ]` buttons at the footer of onboarding steps.
*   **Empty/Loading States:** Loading states display inline spinners on submit actions.
*   **Responsive Behavior:** The split layout collapses to a single column on mobile, hiding the left-hand 3D graphic.
*   **Dark / Light Mode:** Dark theme uses deep slate card backgrounds; light theme uses clean gray inputs.
*   **Accessibility Notes:** Input fields contain explicit HTML labels and support full keyboard tab navigation.
*   **React Three Fiber Opportunities:** The 3D particle sphere dynamically converges its nodes as the user completes onboarding steps, representing the assembly of their resource identity.

---

## 3. Dashboard

### Screen Name: Individual Dashboard Home
*   **Purpose:** The central command center showing personal material stats, active matches, and carbon wallet balances.

```
+-------------------------------------------------------+
|  [Header] Search resources...         (Bell) [Profile] |
+-------------------------------------------------------+
|  [ 3D Personal Earth Twin Viewport ]                   |
|  - Rotate, inspect materials, toggle layers           |
+-------------------------------------------------------+
|  MY STATS                |  AI RECOMMENDATIONS        |
|  Earth Score: 88         |  (Spark) Match found for   |
|  Wallet: 142.50 Credits  |  your polymer scrap.       |
|  [ Details ]             |  [ Route ]  [ Dismiss ]    |
+-------------------------------------------------------+
|  RECENT ACTIVITY                                      |
|  - Matched copper batch with Recycler (2 hours ago)   |
|  - Registered 5 old tires for reuse (Yesterday)       |
+-------------------------------------------------------+
```

*   **Layout Structure:** Grid layout. Top features the interactive 3D Earth Twin viewport. Below displays a 2-column layout wrapping stats, recommendations, and recent activities.
*   **Components Used:** `Interactive Viewport`, `KPI Scorecard`, `AI Suggestion Card`, `Recent Activity Table`.
*   **Content Hierarchy:** Page Header (36px Space Grotesk) → Primary KPI Numbers (36px JetBrains Mono) → Action Cards → Activity Logs.
*   **User Actions:** Drag to orbit the 3D resource model, click match actions, open carbon ledger.
*   **Responsive Behavior:** 12-column desktop scales down to single-column stacked cards on mobile. Telemetry columns drop to focus on critical metrics.
*   **Animation Opportunities:** The 3D viewport expands on double-click; cards slide in with smooth easing when recommendations update.
*   **React Three Fiber Opportunities:** Renders the "Personal Earth Twin" sphere. Objects in the user's inventory appear as glowing coordinates on the sphere, colored by category (green for bio-waste, blue for electronics, orange for polymers).

---

## 4. My Objects

### Screen Name: Resource Inventory Portal
*   **Purpose:** List, organize, and manage registered resources.
*   **Layout Structure:** Standard dashboard frame. Header controls let users toggle between Grid and List views, filter by category, or trigger search queries.
*   **Components Used:** `Toggle Button Group`, `Filter Dropdowns`, `Material Grid Card`, `QR Code Modal`.
*   **Content Hierarchy:** Inventory Count → Action Bar → Cards Grid → Category Headers.
*   **User Actions:** Toggle view mode, filter materials, click item to view passport details, generate sharing QR codes.
*   **Empty State:** Displays a wireframe box icon: *"No resources registered. Tap 'Scan' or connect your ERP to populate your catalog."*
*   **Responsive Behavior:** Card grids scale from 4 columns on desktop to 1 column on mobile.

---

## 5. AI Scanner

### Screen Name: Camera Capture Viewport
*   **Purpose:** Use computer vision to scan objects, classify materials, and estimate purity.
*   **Layout Structure:** Fullscreen mobile viewport. The background is a live camera feed. Interactive controls float over the capture display.
*   **Sections:**
    1.  *Target Frame:* Center overlay showing dotted vector line boundaries.
    2.  *AI Status Bar:* Bottom-aligned status bar showing live parsing updates (e.g., *"Analyzing CAS chemistry..."*).
    3.  *Capture Controls:* Large circular capture button flanked by flash toggle and gallery upload buttons.
*   **Components Used:** `Camera Viewport`, `Vector Target Box`, `Processing Bar`, `Action Buttons`.
*   **User Actions:** Align item, toggle flash, capture photo, or select gallery file.
*   **Animation Opportunities:** The target boundary box pulses with light. Capturing triggers a radial flash frame followed by the card sliding into the progress queue.

---

## 6. Earth Passport

### Screen Name: Digital Product Passport View
*   **Purpose:** Verify raw material purity, source facilities, ownership logs, and carbon records.
*   **Layout Structure:** Two-column card design. Left displays the passport ID badge with cryptographic verification stamps; right displays the detailed lineage logs.
*   **Components Used:** `Identity Card Widget`, `Lineage Timeline`, `Verification Badge`.
*   **Content Hierarchy:** Passport ID → Verified Status Bar → Lineage Timeline → Chemistry Specs.
*   **User Actions:** Expand timeline check-points, export verified compliance PDF, share passport link via QR code.
*   **React Three Fiber Opportunities:** Renders a 3D animated model of the product. Hovering over parts highlights their chemical properties (e.g., highlighting glass panel vs. plastic frame).

---

## 7. Circular Marketplace

### Screen Name: Marketplace Hub
*   **Purpose:** List, bid on, and trade secondary raw materials.
*   **Layout Structure:** Two-column sidebar grid. Left sidebar contains filters (location distance, purity range, material category); right shows the listing grid.
*   **Components Used:** `Sidebar Filters`, `Listing Grid Card`, `Transaction Panel`.
*   **Content Hierarchy:** Search Bar → Category Filter Chips → Listing Grid → Price tags.
*   **User Actions:** Adjust filters, search listings, place purchase bids, initiate chat with suppliers.
*   **Responsive Behavior:** Left sidebar moves to an expandable bottom drawer on mobile.

---

## 8. EarthGPT

### Screen Name: Conversational Assistant Chat
*   **Purpose:** Provide interactive sustainability suggestions, analyze regulations, and queue repair guides.
*   **Layout Structure:** Two-column split layout. Left sidebar lists chat history sessions; right displays the chat viewport.
*   **Components Used:** `History Sidebar`, `Chat Message Bubble`, `Suggested Query Chips`, `Text Input Bar`.
*   **Content Hierarchy:** User Input Bubble → EarthGPT streaming response (with Cas chemical references) → Action Suggestion Cards.
*   **User Actions:** Type prompts, click suggestion chips, upload images for analysis.
*   **Animation Opportunities:** Message text streams dynamically line-by-line. The input box expands vertically on multi-line text input.

---

## 9. Repair Network

### Screen Name: Repair Shop Directory & Booking Map
*   **Purpose:** Connect users with local repair technicians to extend the life of their products.
*   **Layout Structure:** Two-column split layout. Left displays interactive lists of repair options; right displays the maps interface.
*   **Components Used:** `Map Canvas`, `Shop Info Card`, `Booking Form Widget`.
*   **Content Hierarchy:** Search Bar → Map Overlay Pins → Shop Cards → Review Ratings.
*   **User Actions:** Drag map area, select shop pin, request cost estimate, schedule repair drop-off slots.
*   **Responsive Behavior:** Desktop split layout transforms to tab navigation on mobile (Map View vs. List View).

---

## 10. Smart Donation Engine

### Screen Name: NGO Request Directory
*   **Purpose:** Route reusable goods to verified local charities.
*   **Layout Structure:** Feed-style vertical list showing donation opportunities and active campaigns.
*   **Components Used:** `Campaign Progress Bar`, `NGO Profile Card`, `Pickup Form Modal`.
*   **Content Hierarchy:** Priority Request Banner → NGO Listings → Item Checklists.
*   **User Actions:** Match inventory item with NGO request, schedule doorstep pickup, view tax receipt logs.

---

## 11. Carbon Wallet

### Screen Name: Carbon Ledger & Wallet
*   **Purpose:** Monitor carbon credits earned by diverting materials and convert credits to rewards.
*   **Layout Structure:** Two-column grid. Left shows the credit balance card with conversion controls; right shows the transaction ledger.
*   **Components Used:** `Balance Card Component`, `Ledger Table`, `Conversion Form Widget`.
*   **Content Hierarchy:** Total Balance (JetBrains Mono) → Monthly Accumulation Chart → Transaction History Table.
*   **User Actions:** Convert carbon credits to partner rewards, filter ledger transactions, export tax reports.

---

## 12. Earth Twin

### Screen Name: 3D Environmental Twin Command Center
*   **Purpose:** Visualize spatial resource flows and simulate circular adjustments on a personal, community, or global scale.
*   **Layout Structure:** Fullscreen 3D viewport canvas. Overlay controls float on top of the 3D viewport.

```
+-------------------------------------------------------+
|  EARTH TWIN COMMAND CENTER                     [ X ]  |
+-------------------------------------------------------+
|                                                       |
|                                                       |
|               [ 3D Gaussian Splat Model ]             |
|               - Particle flows (CO2, water, biomass)  |
|               - Interactive layer overlays            |
|                                                       |
+-------------------------------------------------------+
|  SIMULATION CONTROLS                                  |
|  [ Recycle +20% ]  [ Reduce Logistics 10mi ]           |
|  Projected Carbon Savings: 4.8 Tons CO2e              |
+-------------------------------------------------------+
```

*   **Components Used:** `3D Canvas Viewport`, `Layer Controls Grid`, `Simulation Control Bar`.
*   **Content Hierarchy:** Viewport Header → Simulation Controls → Real-time Impact Metrics.
*   **User Actions:** Drag to orbit/zoom 3D space, toggle resource layers (water, plastic, carbon), adjust simulation variables (e.g., +"20% local recycling").
*   **React Three Fiber Opportunities:** This is the signature 3D feature. Renders a high-fidelity 3D planet using WebGL, with dynamic particle systems representing resource flows. Shaders change colors based on chosen layers (e.g., showing high carbon density as orange particle clouds, or forest coverage as green clusters).

---

## 13. Community

### Screen Name: Community Hub & Challenges
*   **Purpose:** Engage users through collaborative challenges, ranking tables, and community achievements.
*   **Layout Structure:** Three-column layout. Left displays active community achievements; center shows challenge cards; right lists the member leaderboards.
*   **Components Used:** `Leaderboard Table`, `Challenge Progression Card`, `Badge Grid`.
*   **User Actions:** Join active challenges, view friend statuses, share achievements.

---

## 14. Notifications

### Screen Name: Notification Settings & Logs
*   **Purpose:** Manage system alerts, repair scheduling, and transaction notifications.
*   **Layout Structure:** Standard dashboard frame showing list grids partitioned by alert categories (AI alerts, marketplace updates, etc.).
*   **Components Used:** `Alert Line Item`, `Category Tabs`, `Priority Toggle Buttons`.
*   **User Actions:** Toggle alert priority settings, clear logs, open linked transaction cards.

---

## 15. Profile

### Screen Name: Profile Settings & Impact Summary
*   **Purpose:** Edit organization details, view overall environmental impact, and manage API keys.
*   **Layout Structure:** Split design. Left displays user metadata and achievement badge grids; right displays account settings and verification forms.
*   **Components Used:** `Profile Card Widget`, `Badge Container`, `Form Field Grid`.
*   **User Actions:** Edit profile photo, verify organization tax ID, regenerate API keys.

---

## 16. Enterprise Dashboard

### Screen Name: Enterprise Command Hub
*   **Purpose:** Give sustainability officers a real-time overview of raw material inputs, waste streams, and Scope 3 compliance.
*   **Layout Structure:** Grid layout. Top showcases key CSRD metrics cards; center shows active material stream flows; bottom details incoming match proposals.
*   **Components Used:** `Metric Graph Card`, `Material Stream Flow Table`, `Audit Exporter Panel`.
*   **Content Hierarchy:** Corporate KPI Grid → Material Stream Ledger → Matching Queue.
*   **User Actions:** Export audit reports, accept match contracts, edit facility profiles.

---

## 17. Government Dashboard

### Screen Name: Smart City Waste Command Center
*   **Purpose:** Provide municipalities with dynamic analytics on resource velocity, waste volumes, and collection routes.
*   **Layout Structure:** Split layout. Left displays city-wide waste metrics and diversion trackers; right features the interactive GIS map showing collection fleets.
*   **Components Used:** `GIS Map Interface`, `City Diversion Widget`, `Alert Banner Grid`.
*   **React Three Fiber Opportunities:** Renders a 3D topographic map of the target municipality, highlighting waste generation centers and active fleet paths in real-time.

---

## 18. Admin Dashboard

### Screen Name: Admin System Console
*   **Purpose:** Manage platform users, resolve transaction disputes, and monitor model telemetry.
*   **Layout Structure:** Standard sidebar navigation linking to tabular databases of users, flag notifications, and dispute resolution tickets.
*   **Components Used:** `Dispute Ticket List`, `Verification Queue Row`, `Model Telemetry Graph`.
*   **User Actions:** Approve verified organization profiles, resolve transaction disputes, flag inappropriate listings.

---

## 19. Error Screens

### Screen Name: System Offline & 404 Pages
*   **Purpose:** Handle connection losses and page errors with helpful recovery instructions.
*   **Layout Structure:** Centered column layout. Uses minimal vector art with clear recovery options.
*   **Components Used:** `Error Card Widget`, `Recovery CTA Buttons`.
*   **User Actions:** Retrying connections, going back to dashboard, contacting customer support.

---

## 20. Responsive Design

*   **Breakpoints:**
    *   *Desktop (1280px+):* 12-column layout. Sidebar navigation is permanently expanded, and all 3D viewports load with maximum detail.
    *   *Laptop (1024px - 1280px):* Grid margins drop from 80px to 40px; tables hide secondary columns to save space.
    *   *Tablet (768px - 1024px):* Sidebar collapses to an expandable bottom drawer. Viewports support touch-to-drag gestures.
    *   *Mobile (320px - 768px):* Stacked single-column card layout. Margins set to 16px. Navigation uses a bottom tab bar with a floating action button.
    *   *Foldables:* Dual-pane support dynamically shifts sidebars to secondary panels.
