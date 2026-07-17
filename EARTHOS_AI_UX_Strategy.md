# EARTHOS AI: UX Strategy & User Experience Design
### The Core Interaction Architecture of the Resource Operating System

---

This document establishes the interaction models, navigation structures, user journey mappings, error states, accessibility requirements, and screen inventories for **EARTHOS AI**. It defines the functional user experience before visual styling (UI) begins.

---

## 1. User Personas

### Persona 1: Leo Vance — The Conscious Student
*   **Age:** 21
*   **Role:** Individual User (Student)
*   **Goals:** Minimize environmental footprint; live sustainably on a student budget; find local reuse/recycling routes for electronics and textbooks.
*   **Frustrations:** Lack of clear local recycling directories; expensive repair costs for personal laptops/smartphones; greenwashing by commercial brands.
*   **Technical Knowledge:** High. Multi-device native, expects instantaneous interfaces.
*   **Daily Workflow:** Uses mobile-first social media and study platforms, sells pre-owned clothes online.
*   **Pain Points:** Time-consuming search loops to locate recycling centers; zero reward feedback loops for recycling.
*   **Motivation:** Peer recognition, earning circular tokens/discounts, maintaining a high personal sustainability score.
*   **Success Metrics:** Number of items successfully repaired or traded; Earth Score above 85; monthly carbon offsets logged.

### Persona 2: Sarah & Tom Jenkins — The Busy Family
*   **Age:** 36 & 38
*   **Role:** Individual Users (Family)
*   **Goals:** Declutter the home efficiently; donate outgrown children's clothing/toys to local vetted charities; manage kitchen compost and appliance lifecycles.
*   **Frustrations:** Garbage pick-up schedules are rigid; local charity donation guidelines are confusing; legacy white goods (fridges, washers) break without clear warning or local repair options.
*   **Technical Knowledge:** Medium. Rely on mainstream family management and utility apps.
*   **Daily Workflow:** Commuting, school runs, groceries, online shopping, organizing domestic chores.
*   **Pain Points:** Zero time to coordinate item pickups; finding trustworthy local repair technicians is a guessing game.
*   **Motivation:** Teaching children sustainable habits; maintaining a clean, organized, waste-free home.
*   **Success Metrics:** Quick, automated household inventory sweeps; items collected from doorstep within 24 hours of matching.

### Persona 3: Clara Diaz — The NGO Coordinator
*   **Age:** 29
*   **Role:** NGO Manager
*   **Goals:** Secure high-quality donations (clothing, school supplies, home goods); coordinate volunteer distributions; minimize storage overhead.
*   **Frustrations:** Receiving contaminated or unusable items; erratic delivery timing; lack of clear communications with donors.
*   **Technical Knowledge:** Medium. Relies on spreadsheets, email lists, and standard donor management platforms.
*   **Daily Workflow:** Managing inventory tables, scheduling distributions, writing donor thank-you messages.
*   **Pain Points:** Spending hours sorting unusable material; lack of pickup transport coordination.
*   **Motivation:** Getting resources to families in need quickly and with minimal operational friction.
*   **Success Metrics:** Percent of incoming donations categorized as "Immediately Usable"; number of coordinated donation pickups processed per week.

### Persona 4: Vikram Mehta — The Repair Technician
*   **Age:** 45
*   **Role:** Repair Shop Owner
*   **Goals:** Increase local volume of repair requests; source secondary components reliably; build customer loyalty.
*   **Frustrations:** Competing with cheap, disposable products; finding replacement components for older models; manual paperwork.
*   **Technical Knowledge:** Low-Medium. Prefers simple, specialized desktop scheduling software.
*   **Daily Workflow:** Repairing hardware, ordering components, scheduling customer pickup/drop-off slots.
*   **Pain Points:** Customers choosing to dump products instead of repairing due to high search/quote costs.
*   **Motivation:** Keeping repair traditions alive; building a sustainable, steady local business.
*   **Success Metrics:** Volume of monthly ticket intakes; reduction in time spent preparing custom pricing quotes.

### Persona 5: Jean-Luc Dupont — The Recycler Manager
*   **Age:** 52
*   **Role:** Recycler Operator
*   **Goals:** Maintain high purity levels in sorted material inputs; optimize intake schedules; log output certificates.
*   **Frustrations:** High contamination rates in municipal streams; unexpected shipments causing terminal congestion; difficult audit compliance.
*   **Technical Knowledge:** Low. Accustomed to industrial terminals and legacy shipping sheets.
*   **Daily Workflow:** Managing sorting lines, weighing trucks, signing bills of lading.
*   **Pain Points:** Handling contaminated waste shipments; lack of direct communication channels with industrial suppliers.
*   **Motivation:** Meeting regulatory recycling targets; running an efficient facility.
*   **Success Metrics:** Tons of raw materials processed daily; contamination rates below 2%.

### Persona 6: Elena Rostova — Corporate Sustainability Director
*   **Age:** 42
*   **Role:** Enterprise Sustainability Officer
*   **Goals:** Achieve Net Zero Scope 3 emission targets; satisfy CSRD audit requirements; identify cost savings in byproduct streams.
*   **Frustrations:** Internal materials data is locked in siloed ERP systems; lack of auditable carbon metrics; manual reporting loops.
*   **Technical Knowledge:** High. Familiar with corporate ERP platforms (SAP, NetSuite) and ESG databases.
*   **Daily Workflow:** Tracking carbon dashboards, preparing board decks, auditing global facility inputs/outputs.
*   **Pain Points:** Inability to track products after they leave the distribution warehouse.
*   **Motivation:** Protecting corporate brand integrity; meeting international compliance rules.
*   **Success Metrics:** 100% of product lifecycles traced via Digital Product Passports; verified reduction in corporate Scope 3 footprint.

### Persona 7: Arthur Pendelton — Smart City waste Director
*   **Age:** 58
*   **Role:** Government Officer
*   **Goals:** Divert municipal solid waste from landfills; meet zero-waste smart city mandates; optimize municipal collection routes.
*   **Frustrations:** Inflexible collection contracts; rising fuel costs; lack of dynamic insight into municipal material flows.
*   **Technical Knowledge:** Medium. Relies on GIS tracking platforms and city dashboard monitors.
*   **Daily Workflow:** Reviewing waste maps, approving sanitation budgets, responding to community complaints.
*   **Pain Points:** Truck fleets running inefficient, static collection routes; lack of tools to track regional commercial waste streams.
*   **Motivation:** Reducing city operating budgets; meeting public environmental mandates.
*   **Success Metrics:** Reduction in municipal tonnage sent to landfills; optimization of trash collection fuel efficiency.

### Persona 8: Maya Lin — System Integrity Administrator
*   **Age:** 31
*   **Role:** System Admin
*   **Goals:** Maintain database integrity; resolve transaction disputes quickly; prevent platform abuse.
*   **Frustrations:** Handling low-quality material listings; fraudulent verification profiles; server telemetry anomalies.
*   **Technical Knowledge:** Very High. DevOps engineer profile.
*   **Daily Workflow:** Monitoring container health, auditing flags, checking transaction verification queues.
*   **Pain Points:** Reviewing manual dispute reports; troubleshooting API sync issues between clients.
*   **Motivation:** Ensuring a secure, smooth, and trusted network experience for all user tiers.
*   **Success Metrics:** Platform uptime at 99.99%; average dispute resolution time under 15 minutes.

---

## 2. User Journey Maps

### Journey Map 1: First-Time User Experience (Onboarding)
*   **Goal:** Register, scan an object, and receive an Earth Score.
```
  [User visits Landing] ──► [Instant SSO Auth] ──► [Selects Persona Group]
                                                          │
  [Scans Household Item] ◄── [Quick Mobile Access] ◄──────┘
            │
            ▼
  [Passports Generates] ──► [Earth Score Calculates] ──► [Landing Dashboard]
```
*   **Friction Points:** Camera permission prompts, manual correction of misidentified items.
*   **Mitigation:** Provide inline guidance explaining camera usage; offer automatic classification overrides.

### Journey Map 2: The Scanner to Route Pipeline
*   **Goal:** Scan a broken monitor, evaluate repair cost, or route it to donation.
1.  User opens scanner and frames a broken monitor.
2.  YOLOv8 isolates item; LLM parses the serial tag; the system retrieves the model profile.
3.  The UI displays options: **Repair** (estimated local cost: $45) or **Donate** (local NGO needs screens).
4.  User selects **Donate**. The system generates a pre-paid pickup barcode.
5.  A carrier picks it up. The user receives a delivery notification, +50 Earth Score points, and a tax receipt.

### Journey Map 3: The Enterprise Inflow Journey
*   **Goal:** Register 500 tons of plastic scrap, find a buyer, and export a Scope 3 audit receipt.
1.  Enterprise ERP runs a weekly cron job sync, uploading inventory records via API.
2.  EARTHOS AI parses the batches, generating 35 Digital Product Passports.
3.  The system identifies a match with a packaging plant 12 miles away.
4.  Both parties accept the contract. A logistics carrier is booked.
5.  The system records transaction data and updates the Enterprise Carbon Wallet.
6.  The CSO exports a verified carbon audit receipt for the quarterly board report.

---

## 3. Complete User Flows

### Flow 1: Register and Scan (Mobile Screen-to-Screen)
```
[Main Feed Screen] 
       │ (Tap Floating Scan Button)
       ▼
[Camera Viewport] ──(Detects Object Boundary)──► [Live Pulse Animation]
                                                        │
[Object Confirmed] ◄──(Calculates Purity Vector)────────┘
       │ (Tap "Generate Passport")
       ▼
[Passport Details Page] ──(Select Circular Path)──► [Action: Repair/Donate/Sell/Recycle]
                                                        │
[Transaction Success Screen] ◄──(Log Metrics & Wallet)─┘
```

### Flow 2: Marketplace Buy/Sell (Web Screen-to-Screen)
```
[Marketplace Feed] 
       │ (Filters: Material, Location, Price)
       ▼
[Item Detailed Card] ──(Verify Purity & Lineage)──► [View Digital Passport]
                                                          │
[Transaction Complete] ◄──(Sign Contract & Route)─── [Place Bid / Direct Buy]
```

### Flow 3: EarthGPT Conversational Workflow
```
[EarthGPT Chat View] 
       │ (User prompts: "How do I safely recycle lithium battery pack?")
       ▼
[RAG Reference Verification] ──(LLM streams response)──► [Structured Action Plan]
                                                                │
[Log Progress Screen] ◄──(Log action to Earth Score)─── [Add to Scanner Queue]
```

---

## 4. Information Hierarchy

To prevent dashboard clutter, content blocks are stacked based on task urgency and action relevance:

### Individual Dashboard Stack
1.  **Header Actions:** Floating Scan Button, System Notifications.
2.  **Telemetry Hero:** Earth Score status bar, active Carbon Wallet credits.
3.  **Action Hub:** AI-driven path recommendations (e.g., "Schedule pickup for matched phone").
4.  **Resource Feed:** Live catalog of owned items and active streams.
5.  **Community Hub:** Active challenges progression, local group leaderboards.

### Enterprise Dashboard Stack
1.  **Compliance Indicators:** Live Scope 3 reduction goals, CSRD regulatory alerts.
2.  **Stream Management:** Active byproduct inventory, processing queue.
3.  **Match Proposals:** Dynamic circular matches feed sorted by carbon savings.
4.  **Logistics Monitor:** Map interface tracking dispatched shipments.

---

## 5. Navigation System

The navigation maps keep key tools accessible within two interactions:

```
Web Header:
[Logo] ── [Features] ── [Marketplace] ── [Enterprise] ── [Gov] ── [Pricing] ── [Login/Portal]

Web Footer:
[Logo/Slogan] ── [Material APIs] ── [Compliance Tools] ── [Support] ── [Security Status]

Dashboard Sidebar:
├── Overview
├── My Resources (Active Inventory)
├── Matchmaking Center
├── Logistics Monitor
├── Compliance Auditing
└── Developer Hub / APIs

Mobile Navigation (Tab Bar):
┌────────────────────────────────────────────────────────┐
│ [Home]   [Objects]   ( Floating Scan )   [Market]   [GPT]  │
└────────────────────────────────────────────────────────┘
```

*   **Mobile Gesture Navigation Rules:**
    *   *Swipe Left on Object Card:* Open diagnostic repair guidelines.
    *   *Swipe Right on Object Card:* Send to Marketplace listing draft.
    *   *Swipe Down on Scanner:* Minimize viewport to background task queue.

---

## 6. Low-Fidelity Wireframes

```
+-------------------------------------------------------------------+
|                        INDIVIDUAL DASHBOARD                       |
+-------------------------------------------------------------------+
|  [Logo]   Search Resources...                      (Bell) [Profile] |
+-------------------------------------------------------------------+
|  +---------------------------------+  +------------------------+  |
|  | MY EARTH SCORE                  |  | CARBON WALLET          |  |
|  |                                 |  |                        |  |
|  |     [ 88 / 100 ]                |  |   142.50 CO2 Credits   |  |
|  |                                 |  |                        |  |
|  |  +---------------------------+  |  |  [ Withdraw ] [ Convert]  |  |
|  |  | +2.4pts since last week   |  |  +------------------------+  |
|  |  +---------------------------+  |                              |
|  +---------------------------------+                              |
+-------------------------------------------------------------------+
|  +-------------------------------------------------------------+  |
|  | ACTIVE RECOMMENDATIONS                                      |  |
|  |                                                             |  |
|  |  (Spark) Match Found: 4 Polymers waiting to route.          |  |
|  |  [ Confirm Route ]                         [ Dismiss ]      |  |
|  +-------------------------------------------------------------+  |
+-------------------------------------------------------------------+
|  +---------------------------------++--------------------------+  |
|  | MY RESOURCE INVENTORY           || COMMUNITY CHALLENGES     |  |
|  |                                 ||                          |  |
|  | [Item A] - Polyethylene  (Valid)|| [ ] Recycle 10kg Glass   |  |
|  | [Item B] - Scrap Copper (In-Trn)|| [ ] Complete 1 Repair    |  |
|  +---------------------------------++--------------------------+  |
+-------------------------------------------------------------------+
```

```
+-------------------------------------------------------------------+
|                         AI CAMERA SCANNER                         |
+-------------------------------------------------------------------+
|  [ X ] Close                                          (Flash Light) |
+-------------------------------------------------------------------+
|                                                                   |
|                                                                   |
|                   . - - - - - - - - - - - .                       |
|                   :   [ Live Object ]     :                       |
|                   :                       :                       |
|                   :    Pulse Animation    :                       |
|                   :                       :                       |
|                   . _ _ _ _ _ _ _ _ _ _ _ .                       |
|                                                                   |
|                                                                   |
+-------------------------------------------------------------------+
|  (Spark) AI Processing State: Analyzing Material Purity...       |
+-------------------------------------------------------------------+
|  [ Manual Input ]           ( CAPTURE )           [ Upload File ] |
+-------------------------------------------------------------------+
```

---

## 7. Dashboard UX

*   **Layout Grid:** Responsive CSS grid system. Dashboards leverage a 12-column grid layout on desktop, condensing down to 4 columns on mobile.
*   **Widget Positions:** Persistent high-priority widgets (Earth Score, Carbon Credits) anchor to the top-left on desktop. Transaction feeds take center space, and contextual alerts reside in the right-hand panel.
*   **Drag-and-Drop:** Users can customize layout cards on desktop; layout grids automatically slide and resize to prevent overlaps.

---

## 8. AI Interaction UX

AI should feel responsive, predictive, and transparent.

*   **Typing Animation:** EarthGPT text streams line-by-line (`30ms` latency per token) mimicking natural conversation.
*   **Thinking Indicators:** Instead of spinning loading circles, the system shows dynamic shimmering text explaining the active task (e.g., *"Parsing molecular CAS indices..."* or *"Scanning carrier locations..."*).
*   **Confidence Metrics:** Scanner tags present an inline confidence score (e.g., *"Polyethylene [98% Confidence Match]"*). If confidence falls below 85%, the UI displays a warning banner suggesting: *"Upload a clearer image or add specifications manually."*
*   **Spatial Telemetry Visualizer:** An interactive 3D Gaussian Splat model displays the object's digital representation, letting users inspect structural points with mouse drag controls.

---

## 9. Error & Empty State UX

Errors must suggest clear recovery actions rather than dead ends.

*   **No Scan Found:**
    *   *Visual:* Minimalist vector trace of an empty camera frame.
    *   *Copy:* *"We couldn't classify this object automatically. Keep the camera steady, or add details manually."*
    *   *CTAs:* `[ Retake Photo ]` and `[ Fill Out Form ]`.
*   **Offline Mode:**
    *   *Visual:* Subtle cloud-disconnect header banner.
    *   *Copy:* *"You're offline. Scans will be saved to your local device queue and synced when connection returns."*
*   **Permission Denied:**
    *   *Visual:* Guard shield icon.
    *   *Copy:* *"EARTHOS AI needs camera permissions to identify materials."*
    *   *CTA:* `[ Open Settings ]`.

---

## 10. Gamification UX

CIRCULAR ACTION MOTIVATED BY IMPACT FEEDBACK.

```
       EARTH SCORE (0-100)
       ┌────────────────────────┐
       │   75 - Active Stream   │
       └───────────┬────────────┘
  ┌────────────────┴────────────────┐
  ▼                                 ▼
[Activity Points]            [Community Rank]
- Scans (+10 XP)             - Local leaderboards
- Repairs (+40 XP)           - Interactive badges
- Matches (+50 XP)           - Streak tracking
```

*   **Earth Score Rules:** Score values are recalculations based on three parameters: circularity ratio (recycled vs. dumped), material lifetime extensions, and total kilograms of carbon abated.
*   **Badges:** Awarded for specific actions (e.g., "Repair Hero" for 5 successful repairs; "Loop Closer" for completing an enterprise match).
*   **Community Challenges:** Monthly cooperative goals (e.g., "Divert 10 Tons of Polymers from Metro Landfill") to promote community involvement.

---

## 11. Notification UX

Notifications are grouped to prevent notification fatigue:

*   **AI Alerts (High Priority):** Warning flags when stored material temperatures exceed threshold or when an object is approaching predicted degradation dates.
*   **Marketplace Logs (Medium Priority):** Match proposals, counter-bids, and delivery status updates.
*   **Carbon Wallet Updates (Low Priority):** Weekly offset summaries and credit receipts.
*   **Community Alerts (Low Priority):** Local challenge updates and ranking alerts.

---

## 12. Accessibility UX (WCAG 2.2 AA)

*   **Keyboard Focus Navigation:** All functional controls are accessible via sequential tab indexing. Focus states trigger a high-contrast cyan outline border (`#00BCD4`).
*   **Screen Reader Semantics:** Every image element contains descriptive `alt` tags. Dynamic text streams (e.g., chat logs, scanner feedback) use `aria-live="polite"` tags to ensure screen readers read updates aloud immediately.
*   **Large Text Mode:** Dynamic Type support scales font sizes up to 200% without breaking card layouts or overlapping text grids.

---

## 13. Responsive UX

*   **Desktop & Laptops (1280px+):** Full 12-column layout showing the 3D Environmental Twin, deep sidebars, and real-time tables.
*   **Tablets (768px - 1024px):** 3D visualizers collapse into tabs; sidebars transition into expandable bottom sheets.
*   **Mobile Screens (320px - 480px):** Single-column stacked layouts, persistent bottom navigation bar, and central floating action buttons.
*   **Foldables:** Split layout configuration showing material inventories on one panel and chat logs on the other.

---

## 14. Micro-Interaction Guidelines

All interface actions require immediate visual feedback to confirm execution:

*   **Camera Capture Press:** The viewport triggers a subtle radial flash frame followed by an asset card sliding down into the bottom-right progress queue.
*   **Match Confirmed Action:** The confirmation button morphs into a loading spinner, changing to a green checkmark as a subtle chime confirms the match.
*   **Hover Elevation:** Cards elevate slightly (`transform: translateY(-4px)`) and increase shadow depth (`box-shadow`) when hovered to indicate interactivity.
*   **Wallet Credit Unlock:** Points balances animate upwards dynamically, displaying a brief floating indicator showing credits earned (e.g., `+12.4 CO2 Credits`).

---

## 15. Screen Inventory (85 Screens)

### Landing Website & Authentication (12 Screens)
1.  Landing Home Page
2.  About Mission Page
3.  Features & Technology Overview
4.  Circular Marketplace Explorer
5.  Digital Passport Search Portal
6.  EarthGPT Overview & API Docs
7.  Enterprise Custom Solutions
8.  Government Smart City Portal
9.  Subscription Pricing Tiers
10. Blog Hub
11. Login View
12. Sign-up Wizard

### Individual User Dashboard (18 Screens)
13. Dashboard Overview (My Earth Twin)
14. Resource Inventory Grid
15. Add Resource Dialog (SDS Upload)
16. AI Object Scanner Viewport (Camera)
17. Classification Verification Form
18. Digital Product Passport Details
19. Passport Material Lineage History
20. Marketplace Proposals Feed
21. Negotiation / Bid Builder
22. Active Order Status View
23. Repair Shop Network Directory
24. Repair Diagnostic & Booking Form
25. NGO Donation Center List
26. Donation Pickup Scheduler
27. Carbon Wallet Transactions Log
28. Community Leaderboards
29. Profile Settings
30. Notifications Panel

### Enterprise Operations Portal (16 Screens)
31. Enterprise Analytics Overview
32. Raw Material Inflow Ledger
33. Byproduct Outflow Streams Table
34. ERP Integration Configuration Settings
35. Automated Matching Engine Proposals
36. Material Purity Quality Certificates Log
37. Transaction Contract Builder
38. Freight Route Dispatcher Map
39. Active Carrier Telemetry Dashboard
40. Scope 3 Emissions Graph
41. CSRD Report Exporter Tool
42. Digital Passport Batch Generator
43. Facility Management Profile Grid
44. Audit Trails Portal
45. Corporate Access & Team Settings
46. API Key Manager

### Government / Smart City Panel (12 Screens)
47. Regional Environmental Command Center
50. Waste Fleet Fleet Route Optimizer
51. Citizen Engagement Statistics
52. Illegal Dumping Flag Tracker
53. Environmental Policy Registry
54. Regional Recycling Centers Directory
55. Smart City Sensors Integration Settings
56. City-Wide Carbon Abatement Index
57. Custom Regional Report Builder
58. Regional Access Manager

### NGO & Charities Management (10 Screens)
59. NGO Operations Portal
60. Material Request Form Creator
61. Available Local Donors Map
62. Received Donations Inspection Log
63. Distribution Dispatch Calendar
64. Automated Tax Receipt Panel
65. Inventory Storage Capacity Cards
66. Volunteer Coordination Hub
67. NGO Settings Profile
68. Public Donation Wishlist Page

### Repair & Recycling Shops (12 Screens)
69. Intake Service Queue Table
70. Component Inventory Manager
71. Repair Diagnostic Helper View
72. Customer Booking Scheduler
73. Recycler Intake Weight Scale Portal
74. Material Purity Logging Form
75. Processing Line Control Settings
76. Output Certification Mint Portal
77. Business Profile Management Page
78. Quote Invoice Generator
79. Financial Ledger Page
80. Custom Pricing Matrix settings

### System Administration Panel (5 Screens)
81. System Health Telemetry Dashboard
82. User Identity Verification Queue
83. Transaction Dispute Resolution Panel
84. Custom Model Fine-Tuning Console
85. Security Audit Log Exporter

---

## 16. UX Principles

1.  **Invisible Complexity:** Keep complex calculations, CAS logs, and logistics configurations under the hood. Present users with clean, clear, and actionable choices.
2.  **Verifiable Trust:** Every environmental claim or circular match must show its underlying calculations to avoid greenwashing.
3.  **Circularity Over Friction:** Make circular actions (like repair, resale, or donation) require fewer clicks than legacy trash disposal methods.
4.  **Value-Driven Gamification:** Gamified elements must reflect real-world environmental actions and tangible rewards, avoiding empty loops.

---

## 17. UX Best Practices

*   **Heuristic Consistency:** Navigation layouts, buttons, and status models must operate identically across desktop, tablet, and mobile views.
*   **Frictionless Inputs:** Use optical character recognition (OCR) and document parsing to pre-populate entry forms, keeping manual typing to a minimum.
*   **Spatial Mapping:** Use geographical coordinates and maps to visualize resource distances, helping users understand shipping paths and transport costs.
*   **Failsafe Transactions:** Require confirmation steps for final trades, contract sign-offs, and file deletions to prevent accidental loss of material records.

---

## 18. Complete UX Rules (For UI Phase 4 Design Team)

*   **Rule 1:** Dashboard widgets must maintain a minimum 16px grid gap on desktop and 8px grid gap on mobile.
*   **Rule 2:** Active focus indicators (`outline`) must remain visible at all times during keyboard navigation.
*   **Rule 3:** Avoid hiding secondary actions (like details or histories) behind deep dropdown menus. Use tab bars or bottom sheets instead.
*   **Rule 4:** Telemetry values (like carbon metric weights or currency values) must use monospaced fonts (`JetBrains Mono`) to maintain clean alignment in tables.
*   **Rule 5:** Loading animations must display descriptive text indicating the active task (never use a static progress bar or generic spinning icon).
*   **Rule 6:** Form fields must show validation messages inline immediately after focus shifts, avoiding multi-field alerts.
*   **Rule 7:** Error states must offer at least one recovery action (like retrying the task or entering details manually).
*   **Rule 8:** All visual components must support a dark theme configuration without losing information hierarchy or violating WCAG contrast ratios.
*   **Rule 9:** Micro-interactions (like hover indicators or button presses) must complete their animations in under 250ms to ensure the UI feels responsive.
*   **Rule 10:** Multi-step wizards (such as onboarding or contract builders) must display a persistent progress tracker showing completed and remaining steps.
*   **Rule 11:** The camera scan button must be instantly accessible via a floating action button on all mobile dashboard tabs.
*   **Rule 12:** Safety warnings and chemical hazard alerts must display a prominent warning symbol alongside descriptive copy (never rely on color alone to communicate danger).
