---
name: vestigo-design-guardian
description: >-
  Enforces the Liquid Noir 3.0 design system, zero-emoji policy, specular typography,
  and layout resilience across desktop, tablet, and mobile in VESTIGO. Use whenever modifying
  or creating HTML markup, CSS rules, badges, layouts, modals, or touch gestures.
---

# VESTIGO — Design Guardian & Visual System Audit

This skill enforces strict adherence to the **Liquid Noir 3.0** aesthetic and architectural stability guidelines across all desktop, tablet, and mobile viewports.

---

## 1. Non-Negotiable Core Rules

### Rule 1: CERO EMOJIS (Absolute Ban)
- **Zero tolerance:** No unicode emojis anywhere in code, UI, badges, headings, buttons, toasts, search results, or dossiers.
- **Replacement:** Use clean, monochromatic inline SVG icons (`fill="none" stroke="currentColor" stroke-width="2"` or `2.5` with `stroke-linecap="round" stroke-linejoin="round"`).

### Rule 2: Layout Resilience (Anti-Collapse Engine)
Never break or purge core layout classes. All responsive viewports depend on:
- `.catalog-grid`: Constrained with `max-width: 1400px; margin: 0 auto; width: 100%;` using 3 columns on desktop (>1280px), 2 on tablet, and 1 on mobile.
- `.vg-split-workspace`: Flex container with `width: 100% !important;` and `gap: 24px;`.
- `.vg-split-primary`: Must always have `flex: 1 1 0% !important; min-width: 0 !important; width: 100% !important;`.
- `.tab-content.active`: Must have `display: block !important; width: 100% !important;`.
- `.embed-viewport`: Must retain `width: 100% !important; height: calc(100vh - 230px); min-height: 560px; max-height: 980px;`.
- `.embed-iframe`: Must retain `width: 100% !important; height: 100% !important; border: none !important; display: block !important;`.

### Rule 3: Mobile Card Synopsis Unconstrained
- `.case-summary` must **never** be clamped or hidden with `-webkit-line-clamp` on mobile:
  ```css
  .case-summary {
    display: block !important;
    -webkit-line-clamp: unset !important;
    overflow: visible !important;
  }
  ```

---

## 2. Liquid Noir 3.0 Design Tokens

Never introduce raw unstyled bright colors or flat backgrounds. Use the official token system:

```css
/* Surfaces */
--vg-obsidian-950: #020408;  /* Deepest canvas */
--vg-obsidian-900: #04070D;  /* Base body surface */
--vg-obsidian-850: #070B14;  /* Card base */
--vg-obsidian-800: #0B1120;  /* Card inset */
--vg-obsidian-700: #0F172A;  /* Slate border */

/* Accents & Forensic Glows */
--vg-cyan: #00E5FF;          /* Luminol UV & Primary Accent */
--vg-red:  #FF2D55;          /* Evidence / Homicide Tag */
--vg-green:#22C55E;          /* Active Case / Judicial Pulse */
--vg-amber:#F59E0B;          /* Sealed Envelope / Alert */
--vg-blue: #38BDF8;          /* Judicial Dossier / Procedure */
--vg-purple:#C084FC;         /* Extra Collector / Notarial */
```

### Translucent Satin Badges:
Use the standard pill classes with luminous micro-borders instead of heavy opaque backgrounds:
- `.badge-cyan`: `rgba(0, 229, 255, 0.12)` with border `rgba(0, 229, 255, 0.30)`
- `.badge-red`: `rgba(255, 45, 85, 0.12)` with border `rgba(255, 45, 85, 0.30)`
- `.badge-amber`: `rgba(245, 158, 11, 0.12)` with border `rgba(245, 158, 11, 0.30)`
- `.badge-blue`: `rgba(56, 189, 248, 0.12)` with border `rgba(56, 189, 248, 0.30)`
- `.badge-active`: With pulsing green indicator dot (`.catalog-badge-dot`).
