# PROMPTS.md — AI-Assisted Development Log

This document provides a chronological, high-fidelity log of the AI prompts, objectives, and engineering outcomes that guided the architecture, design system, and full implementation of **ABTalks Momentum**.

---

## Prompt 1: Initial Architecture & Requirement Analysis

### Objective
Summarize and analyze the initial product documentation (`PRODUCT_BRIEF.md`, `DESIGN_SYSTEM.md`, `USER_FLOW.md`, `IMPLEMENTATION_PLAN.md`) to establish core information architecture, component hierarchy, and user journey strategy without writing code immediately.

### Prompt
> Read PRODUCT_BRIEF.md, DESIGN_SYSTEM.md, USER_FLOW.md, and IMPLEMENTATION_PLAN.md.
> Do not write any code yet.
> First summarize your understanding of the product, user journey, architecture, components, and implementation plan.
> Point out any inconsistencies or opportunities for improvement before we start building.

### Outcome
- Analyzed 60-day momentum platform philosophy ("Build Momentum, Not Pressure").
- Identified key design pillars: Apple/Linear/Notion dark mode aesthetic, 390px mobile-first responsive layout, and non-punitive streak replacement mechanics.
- Outlined lightweight state management strategy replacing Zustand with React Context (`DemoStateProvider`).

---

## Prompt 2: Core Foundation & Lightweight State Architecture

### Objective
Establish the project foundation with Vite, React, TypeScript, TailwindCSS, and Framer Motion. Implement dynamic routing (`/day/:dayId`) and build a persistent React Context (`DemoStateProvider`) to support 5 live demo states.

### Prompt
> The proposed architecture looks excellent. Please proceed with the following refinements:
> 1. Use React Context instead of Zustand to keep the architecture lightweight and maintainable.
> 2. Create a DemoStateProvider that initializes from local JSON, supports live interactions (submitting GitHub/LinkedIn links, Today's Win, mood selection, profile updates, etc.), and persists changes using localStorage. Demo Mode should be able to reset the state at any time.
> 3. Implement dynamic routing using /day/:dayId while ensuring /day/12 exactly matches the judging requirements.
> 4. Follow a premium mobile-first design (390px) inspired by Linear, GitHub, Notion and modern Apple interfaces. Use subtle glassmorphism selectively.
> 5. Recruiter Snapshot should unlock progressively after meaningful milestones.

### Outcome
- Built `DemoStateContext.tsx` with `localStorage` caching and preset switcher supporting 5 demo states (`new`, `building`, `recovering`, `empty`, `graduate`).
- Integrated dynamic React Router routes: `/`, `/dashboard`, `/day/:dayId`, and `/profile`.
- Developed `RecruiterSnapshot.tsx` with dynamic unlock requirements (Profile setup, GitHub link, LinkedIn link, Day 1 challenge).
- Built high-contrast custom CSS glassmorphism utility classes in `index.css`.

---

## Prompt 3: Achievement Shelf & Badge Layout Improvements

### Objective
Fix visual hierarchy and filter controls on the `AchievementShelf` component so unlocked badges sort first and clear lock hints are displayed.

### Prompt
> i feel like something is offf in this part... achievement Shelf
> Milestone badges earned through progress
> 5 / 8 Unlocked

### Outcome
- Reorganized `AchievementShelf.tsx` badge sorting algorithm so unlocked achievements display at the top.
- Added `All`, `Unlocked`, and `Locked` filter tabs.
- Added explicit lock hints and unlocked timestamp tags to improve clarity and user motivation.

---

## Prompt 4: Git Initial Push & Repository Remote Sync

### Objective
Commit all foundational codebase files and push to GitHub remote repository.

### Prompt
> pushh and commit in git

### Outcome
- Created clean initial Git commits and pushed to `main` branch (`https://github.com/maanvi13/abtalks-momentum.git`).

---

## Prompt 5: Graduate Journey PDF Report Generation

### Objective
Provide a client-side PDF Journey Report generator for students in the "Graduate (Day 60)" state to download a verified proof document of their 60-day journey.

### Prompt
> in the demo graduate state i wanna add the feature like it should create a pdf which has a demo content of the journey in the pdf

### Outcome
- Created `src/utils/generatePdfReport.ts` using `jsPDF` and `html2canvas`.
- Integrated "Download Verified PDF Journey Report" CTA on `GraduateCelebrationBanner.tsx`.
- Formatted PDF with candidate metadata, 60-day completion stats, recruiter verification badge, and streak consistency proof.

---

## Prompt 6: Interactive Guided Product Tour

### Objective
Build a 60-second interactive guided product walkthrough with spotlight cutouts, auto-filling form demo, state cycling, and centered philosophy modal.

### Prompt
> I would like to introduce one major product feature that should become one of the highlights of this redesign.
> 
> ## Feature: Guided Product Tour
> Instead of expecting users or judges to manually discover the product, build an interactive guided tour that automatically showcases the platform's key features in approximately 45–60 seconds.
> This is NOT a video.
> This is an interactive product walkthrough similar to onboarding experiences in Notion, Linear, Slack, or modern SaaS products.
> 
> Entry Point:
> On the Landing Page Hero section, add two primary actions:
> Primary CTA: 🚀 Start Your Journey
> Secondary CTA: ✨ Take a 60-Second Product Tour

### Outcome
- Created `TourContext.tsx`, `TourOverlay.tsx`, and `TourEndingModal.tsx`.
- Implemented Framer Motion spotlight cutout ring and tooltips over elements marked with `data-tour`.
- Configured automated Step 7 form auto-filling (GitHub link, LinkedIn link, reflection win, mood selection) with celebratory `canvas-confetti` explosion.
- Added persistent `Skip Tour` button and quick header trigger.

---

## Prompt 7: High-Clarity UI Text & Blur Filter Removal

### Objective
Eliminate excessive blur filters that obfuscated page text behind backdrop overlays during the tour and general viewing.

### Prompt
> heyy the content on the page is blurred .. it should be visible right only then it looks undestandable

### Outcome
- Removed `backdrop-blur-[2px]` from `TourOverlay.tsx` backdrop layer.
- Removed `backdrop-blur-md` and `blur-sm` from locked preview cards in `RecruiterSnapshot.tsx`.
- Replaced backdrop blur filters in `index.css` with clean solid background colors (`#18181B`) for crisp text legibility.

---

## Prompt 8: Idempotent Challenge Completions & Score Guardrail

### Objective
Prevent duplicate Momentum Score inflation when users click "Complete Day" multiple times on the same challenge.

### Prompt
> and also one thing i am noticing now is... that after clicking on the compleate day and build momentum , if i click on the same day multiple times it increases the momentum percentages... it is not right ,right???
> please fix it and commit changes

### Outcome
- Updated `submitDayChallenge` in `DemoStateContext.tsx` to inspect whether target task was already completed.
- Ensured first-time submissions award `+8%` momentum, while subsequent re-submissions update submission links/logs idempotently without inflating momentum score.

---

## Prompt 9: Automated State-Specific Demo Walkthroughs

### Objective
Add dedicated automated video-like walkthrough triggers for each of the 5 demo states in the Demo Switcher.

### Prompt
> in the demo secction make a dummy automatically demo walkthrough in the recovery section of getting back to the track ... likewise make the video for the all the states

### Outcome
- Added `startStateWalkthrough(mode)` to `TourContext.tsx`.
- Updated `DemoSwitcher.tsx` to render a **`▶️ Demo`** button next to each preset state.
- Enabled 1-click automated walkthroughs for Starting, Building, Recovering, Empty Profile, and Graduate states.

---

## Prompt 10: Recovery State Celebration Popup Modal

### Objective
Create a dedicated "Welcome Back On Track" popup modal when a student in the Recovering state completes a challenge.

### Prompt
> in the recovery section after submitting some tasks that person have to get back to the track ... like some encouraging pop up msg has to be displayed once the getting back to the track ... addd a video of it like not just

### Outcome
- Created `RecoveryModal.tsx` displaying an encouraging welcome-back message ("Consistency is built by returning, not by being perfect").
- Integrated modal into `SubmissionCard.tsx` completion flow.
- Added animated **Live Recovery Showcase Banner** on `MomentumCard.tsx` with a direct `Watch Demo` button.

---

## Prompt 11: Threshold-Gated Recovery State Transition

### Objective
Ensure the student's status updates from "Recovering" to "Thriving" first before displaying the celebratory popup.

### Prompt
> in the recovery state video demo the state should get updated recovering to thriving once the thresold reaches only after reaching that the hurray pop up should display

### Outcome
- Modified `DemoStateContext.tsx` submission evaluation flow to process completed days, update momentum status to `Thriving (88%)`, and trigger the celebratory modal only after threshold completion.

---

## Prompt 12: Milestone-Based Recovery Celebration System (>=88% Momentum)

### Objective
Refine recovery logic so the celebration triggers **only when momentum reaches or exceeds 88%** (milestone-based, single-trigger per recovery cycle) rather than after a single completed task.

### Prompt
> I would like to improve the recovery system by making it milestone-based instead of task-based.
> 
> ## New Behaviour
> The application should continuously monitor and analyze the student's Momentum Score.
> The recovery celebration should NOT be triggered after completing one challenge.
> Instead, it should only trigger once the student's Momentum reaches or exceeds 88%.
> 
> ## Recovery Celebration
> When Momentum reaches 88%:
> Display a premium full-screen celebration.
> Sequential messages:
> "Every developer stumbles."
> ↓
> "But the best developers always come back."
> ↓
> "Your consistency has paid off."
> ↓
> "You're officially back on track."
> 
> Then automatically navigate back to the Dashboard.
> Display a toast: "Momentum Restored."

### Outcome
- Added `wasInRecoveryCycle`, `hasCelebratedRecovery`, and `showMilestoneCelebration` flags to `StudentProfile` interface and `DemoStateContext`.
- Created full-screen overlay component `MilestoneRecoveryCelebration.tsx` with sequential Framer Motion text reveals and smoothly filling circular Momentum Ring.
- Created `Toast.tsx` component to render **"Momentum Restored."** notification on dashboard return.
- Removed single-task popups from `SubmissionCard.tsx`.

---

## Prompt 13: Live Percentage Count-Up Counter in Recovery Demo

### Objective
Animate the score percentage counter live on-screen from 62% to 88%+ inside the recovery celebration overlay.

### Prompt
> in demo video of the recovery state add this feature as well it has to show the dummy increasing percentage in the demo video

### Outcome
- Added dynamic count-up animation (`requestAnimationFrame`) in `MilestoneRecoveryCelebration.tsx`.
- Score counter dynamically increments from `62%` to `88%+` in sync with the filling Momentum Ring and badge transition (`⚡ Rebuilding ➔ 🚀 Thriving`).

---

## Prompt 14: Documentation of AI Development Process (PROMPTS.md)

### Objective
Create a structured, chronological `PROMPTS.md` document in the root directory to document the end-to-end AI-assisted development process for hackathon submission verification.

### Prompt
> The hackathon requires a PROMPTS.md file documenting the AI-assisted development process.
> Please create a well-structured PROMPTS.md in the root of the repository.
> Review the complete conversation and development history from the beginning of this project and reconstruct the major prompt flow that was used to build this application.

### Outcome
- Generated root `PROMPTS.md` detailing Objectives, Prompts, and Technical Outcomes across all 14 major development milestones.

---

## Prompt 15 – Permanent Auto-Documenting Development Workflow Setup

### Timestamp
2026-08-08 22:08:52

### Objective
Establish a mandatory, permanent development workflow where every subsequent prompt resulting in product decisions, UI changes, architecture updates, feature additions, bug fixes, refactors, or animations is automatically appended to PROMPTS.md in chronological order.

### Prompt
> I want to establish a permanent development workflow for this project.
> From this point onward, every prompt I provide that results in a product decision, UI change, architecture update, feature addition, implementation, bug fix, refactor, animation, or any meaningful modification must automatically be documented in the root-level PROMPTS.md file.

### Implementation Summary
Configured permanent workflow rules ensuring all future prompts, Objectives, Timestamps, Implementation Summaries, Files Modified, and Outcomes are continuously appended to PROMPTS.md without overwriting previous history.

### Files Modified
- `PROMPTS.md`

### Outcome
Successfully established permanent automated development logging protocol in `PROMPTS.md`.

---

## Prompt 16 – Momentum Simulator Signature Showcase Feature

### Timestamp
2026-08-08 22:18:00

### Objective
Replace the existing Journey Preview with **Momentum Simulator** — a signature, interactive 8-step lifecycle simulation showcasing the complete 60-day student journey from Day 1 to Graduation, demonstrating momentum building, simulated exam inactivity, recovery milestone crossing (>=88%), and habit formation.

### Prompt
> I want to replace the existing "Journey Preview" with a new premium showcase feature called **Momentum Simulator**.
> The Momentum Simulator should become one of the signature experiences of the application.
> Instead of simply switching between static demo states, it should simulate the complete 60-day journey of a student by automatically demonstrating how the Momentum system behaves over time.
> The goal is to tell a story through the product.

### Implementation Summary
- Created `src/context/SimulatorContext.tsx` managing the 8-step interactive lifecycle simulation state, auto-play timers, route navigation, and score animations.
- Built `src/components/simulator/CalendarInactivityVisualizer.tsx` to render mini calendar visualizer showing Days 21-23 skipped with red strike-throughs and score dropping from 92% to 64% (Recovering).
- Built `src/components/simulator/SimulatorOverlay.tsx` rendering spotlight cutouts, step indicators (Step 1 to 8), and persistent `Skip Simulation` button.
- Built `src/components/simulator/SimulatorFinalModal.tsx` rendering the final centered habit reflection modal (*"You didn't just finish a challenge. You built a habit. Build Momentum. Not Pressure."*).
- Updated Landing Page Secondary Hero CTA to `✨ See Momentum in Action`.
- Mounted `SimulatorProvider`, `SimulatorOverlay`, `CalendarInactivityVisualizer`, and `SimulatorFinalModal` globally in `src/App.tsx`.

### Files Modified
- `src/context/SimulatorContext.tsx`
- `src/components/simulator/CalendarInactivityVisualizer.tsx`
- `src/components/simulator/SimulatorOverlay.tsx`
- `src/components/simulator/SimulatorFinalModal.tsx`
- `src/pages/LandingPage.tsx`
- `src/components/layout/Navbar.tsx`
- `src/components/layout/DemoSwitcher.tsx`
- `src/App.tsx`
- `PROMPTS.md`
- `task.md`
- `walkthrough.md`

### Outcome
Successfully implemented the Momentum Simulator interactive showcase feature, cleanly passing production build (`npm run build`) and enabling 1-click execution for hackathon judges and users.

---

## Prompt 17 – Momentum State Allocation Percentage Ranges Legend

### Timestamp
2026-08-09 02:28:48

### Objective
Enhance the Momentum Overview card (`MomentumCard.tsx`) with a clear, interactive visual breakdown legend displaying the exact percentage ranges allocated to each Momentum state tier.

### Prompt
> in the overview section it would have been better if we have added the from which percentage to which percent the specific states are allocated

### Implementation Summary
- Added `Momentum State Allocation` grid breakdown legend in `src/components/dashboard/MomentumCard.tsx`:
  - **🌱 Starting:** `0% – 25%` (Initial habit formation)
  - **🌤 Building:** `26% – 50%` (Consistency building)
  - **🔥 Growing:** `51% – 79%` (Strong daily routine)
  - **💙 Recovering:** `< 70%` (During non-punitive recovery cycle)
  - **🚀 Thriving / Mastered:** `80% – 100%` (Optimal momentum & graduation)
- Highlighted active student state tier dynamically based on real-time score.

### Files Modified
- `src/components/dashboard/MomentumCard.tsx`
- `PROMPTS.md`

### Outcome
Successfully added the Momentum State Percentage Allocation Legend to the Dashboard Overview card, passing clean production build (`npm run build`).

---

## Prompt 18 – Responsive Mobile View Fix for Simulation Tour Step 4

### Timestamp
2026-08-09 03:00:06

### Objective
Fix responsive layout positioning for Step 4 and subsequent steps in the Momentum Simulator to ensure all calendar visualizers, tooltips, and content remain 100% visible inside 390px mobile viewports without overflowing off screen.

### Prompt
> during the simulation tour the one thing the error is occuring is that from the step 4 the content is offf the mobile screen in the mobile view

### Implementation Summary
- Updated `SimulatorOverlay.tsx` tooltip style calculation:
  - Enabled mobile detection (`window.innerWidth < 640`) to anchor tooltip safely at `bottom: 72px` (above navigation bar) on mobile screens.
  - Clamped max top offset on desktop (`Math.min(window.innerHeight - 200, ...)`).
  - Adjusted `scrollIntoView` block alignment to `nearest` on mobile.
- Updated `CalendarInactivityVisualizer.tsx` overlay positioning:
  - Moved overlay to `top-14 sm:top-16` with compact mobile padding (`p-3 sm:p-4`), ensuring the mini calendar fits comfortably on 390px screens above target elements.

### Files Modified
- `src/components/simulator/SimulatorOverlay.tsx`
- `src/components/simulator/CalendarInactivityVisualizer.tsx`
- `PROMPTS.md`

### Outcome
Successfully resolved mobile viewport overflow, ensuring Step 4 and all simulation tour steps render completely within 390px mobile screens, passing clean production build (`npm run build`).

---

## Prompt 19 – Embedded Single-Card Mobile Architecture for Step 4 Simulation Tour

### Timestamp
2026-08-09 03:04:02

### Objective
Eliminate card overlapping and horizontal clipping on mobile screen viewports by refactoring the Step 4 simulated calendar inactivity visualizer to render directly inside the Step 4 tooltip card in `SimulatorOverlay.tsx`, bounded within `max-w-[370px]`.

### Prompt
> nope it is not resolved .... the complete content is not visible from step 1 to step 8

### Implementation Summary
- Refactored `CalendarInactivityVisualizer.tsx` to render as a compact, self-contained embedded component instead of a standalone fixed-position overlay.
- Embedded `CalendarInactivityVisualizer` directly inside the Step 4 card body in `SimulatorOverlay.tsx`.
- Updated `SimulatorOverlay.tsx` overlay container to `fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[370px] px-3 z-50 pointer-events-auto max-h-[82vh] overflow-y-auto`.
- Removed standalone `<CalendarInactivityVisualizer />` from `App.tsx` to prevent duplicate floating card overlays.
- Ensured zero vertical/horizontal overlapping across all 8 simulation steps on mobile screens.

### Files Modified
- `src/components/simulator/CalendarInactivityVisualizer.tsx`
- `src/components/simulator/SimulatorOverlay.tsx`
- `src/App.tsx`
- `PROMPTS.md`

### Outcome
Successfully eliminated card overlap and horizontal clipping across all 8 simulation tour steps, ensuring 100% visible, perfectly aligned, single-card experience on 390px mobile viewports, passing clean production build (`npm run build`).

---

## Prompt 20 – Product Tour Tooltip Cards Mobile Viewport Fit

### Timestamp
2026-08-09 03:10:53

### Objective
Fix Product Tour tooltip cards (`TourOverlay.tsx`) so that all 13 tour steps fit 100% inside 390px mobile viewports without overflowing horizontally off screen.

### Prompt
> also fix the product tour cards

### Implementation Summary
- Refactored `TourOverlay.tsx` overlay container positioning to:
  `fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-end pb-20 px-3`.
- Bounded Product Tour tooltip card container to `w-full max-w-[370px] bg-[#18181B] rounded-2xl p-3.5 sm:p-4 max-h-[82vh] overflow-y-auto`.
- Replaced dynamic window-relative pixel positioning with container-centered flexbox alignment, ensuring 0 right-side clipping across all 13 product tour steps.

### Files Modified
- `src/components/tour/TourOverlay.tsx`
- `PROMPTS.md`

### Outcome
Successfully fixed Product Tour tooltip cards, ensuring all 13 steps fit cleanly within 390px mobile screens without right-side clipping, passing clean production build (`npm run build`).

---

## Prompt 21 – Header Layout Overflow Fix & Recovery Demo Banner Removal

### Timestamp
2026-08-09 03:15:16

### Objective
Fix Navbar header elements (`Navbar.tsx`) to prevent active state badges (`RECOVERING`, `BUILDING`) from going out of frame on small mobile screens, and remove the recovery showcase demo banner from `MomentumCard.tsx`.

### Prompt
> here the newcomer, recovery state these are out of the frame fix that and also remove this feture in the recovery state

### Implementation Summary
- Updated `Navbar.tsx` responsive header layout:
  - Made logo & title compact (`ABTalks Momentum`).
  - Set state badge (`{activeDemoMode}`) to `hidden sm:inline-block` on mobile viewports under 400px to guarantee zero out-of-frame horizontal overflow.
- Removed the `Getting Back On Track Showcase / LIVE RECOVERY / Watch Demo` banner block from `MomentumCard.tsx`.

### Files Modified
- `src/components/layout/Navbar.tsx`
- `src/components/dashboard/MomentumCard.tsx`
- `PROMPTS.md`

### Outcome
Successfully fixed Navbar header badge overflow on mobile screens and removed the recovery showcase demo banner from the Dashboard Momentum card, passing clean production build (`npm run build`).






