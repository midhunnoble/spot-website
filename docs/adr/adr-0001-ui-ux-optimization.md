---
title: "ADR-0001: UI/UX Pro Max Optimization Suite"
status: "Proposed"
date: "2026-03-20"
authors: "Antigravity (AI Architect)"
tags: ["architecture", "ui", "ux", "mobile", "optimization"]
supersedes: ""
superseded_by: ""
---

# ADR-0001: UI/UX Pro Max Optimization Suite

## Status

**Proposed** | Accepted | Rejected | Superseded | Deprecated

## Context

The current SPOT website is transitioning from a founder-led project to a scalable institution. While the basic mobile responsiveness is in place, the interface needs to meet "Pro Max" standards (high-information density, premium aesthetics, and strict accessibility) to match the "Netflix Aesthetic" and "Anti-Corporate" vision.

Key gaps identified:
- Basic loading spinners instead of Skeleton Shimmers (lower perceived performance).
- Sub-44px touch targets in admin tables and navigation links.
- Linear layouts in content-heavy sections where a "Bento Grid" would better serve the high-density requirement.
- Inconsistent safe-area handling across fixed/sticky elements.

## Decision

We will implement a system-wide UI/UX optimization suite based on the `ui-ux-pro-max` design intelligence. This includes:

1.  **Skeleton-First Loading**: Replace state-based spinners with `Skeleton` components for consistent layout stability during data fetches.
2.  **The 48px Touch Standard**: Standardize all interactive areas (including icon-only buttons) to 48px minimum hit area.
3.  **Bento Grid Refactoring**: Implement a masonry-style bento grid for complex content sections (e.g., Curriculum Modules, Facilitators).
4.  **Liquid Glass Layering**: Enhance backdrop-blurs and iridescence on modal scrims and sticky headers to match the premium "Spatial UI" aesthetic.

## Consequences

### Positive

- **POS-001**: **Perceived Performance**: Shimmer skeletons reduce visual jitter, making the app feel "instant."
- **POS-002**: **Accessibility**: 48px touch targets ensure the interface is operable by users with motor impairments or those on the move.
- **POS-003**: **Information Scannability**: Bento grids improve density for neuro-divergent parents scanning for specific curriculum details.

### Negative

- **NEG-001**: **Complexity**: Liquid Glass effects (backdrop-filter) carry a performance cost on older mobile hardware.
- **NEG-002**: **Implementation Overhead**: Transitioning from linear to Bento grids requires more complex layout logic.

## Alternatives Considered

### Linear Skeleton (Alternative 1)

- **ALT-001**: **Description**: Use standard gray blocks for loading instead of layout-matching skeletons.
- **ALT-002**: **Rejection Reason**: Fails to meet the "Netflix Aesthetic" high-polish requirement; feels "generic."

### Component-Specific Safe Areas (Alternative 2)

- **ALT-003**: **Description**: Manually adjust padding on every single component for safe areas.
- **ALT-004**: **Rejection Reason**: High maintenance debt; a global `SafeView` pattern is more robust.

## Implementation Notes

- **IMP-001**: Create a `Skeleton` primitive in `src/components/ui/Skeleton.tsx`.
- **IMP-002**: Update `AdminEvents` and `StudioDetail` as the first "Pro Max" implementations.
- **IMP-003**: Audit `index.css` for `dvh` and `safe-area` global constants.

## References

- **REF-001**: UI UX Pro Max Skill Guidelines (Accessibility, Touch & Interaction).
- **REF-002**: Apple HIG (Human Interface Guidelines) for Safe Areas.
- **REF-003**: Vercel/Next.js Core Web Vitals (CLS/LCP).
