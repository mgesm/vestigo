---
name: vestigo-deploy-checklist
description: >-
  Executes the mandatory validation, testing, cache versioning, and release checklist
  for VESTIGO. Use before committing code, pushing to GitHub, or finalizing any functional,
  design, or case addition in the repository.
---

# VESTIGO — Deployment & Release Checklist

This skill provides the mandatory protocol to follow before committing and pushing changes in **VESTIGO**.

---

## 1. Pre-Commit Validation Routine

Before committing, execute these 5 checks:

### Step 1: Layout Stability Verification
Ensure that `.embed-viewport`, `.embed-iframe`, `.vg-split-primary`, and `.catalog-grid` have not been altered or purged.
Verify that:
- The catalog cards display properly without edge-to-edge stretching.
- All workspace tabs (Briefing, Terminal, Dossiers) take 100% full width and iframes render at full height without collapsing.

### Step 2: Cero Emojis Check
Verify no raw unicode emojis were introduced:
```powershell
Select-String -Path "index.html", "css\*.css", "casos\*\*.html" -Pattern "[\uD83C-\uDBFF\uDC00-\uDFFF]"
```

### Step 3: Cache Invalidation (SW & Query Params)
Whenever `index.html`, `css/*.css`, or `css/mobile-touch-engine.js` are updated:
1. Bump `CACHE_NAME` in [`sw.js`](file:///C:/Users/migue/.gemini/antigravity/scratch/crimenes-imperfectos-valdeluna/sw.js) (e.g. `vestigo-cache-v3.0.X`).
2. Update the version query string in [`index.html`](file:///C:/Users/migue/.gemini/antigravity/scratch/crimenes-imperfectos-valdeluna/index.html) stylesheet/script tags:
   - `css/liquid-glass.css?v=3.0.X`
   - `css/desktop-layout.css?v=3.0.X`
   - `css/mobile-ux.css?v=3.0.X`
   - `css/mobile-touch-engine.js?v=3.0.X`

### Step 4: Encoding & BOM Check
Ensure all modified HTML, CSS, JS, and MD files are saved in clean **UTF-8 without BOM** to avoid character corruption in browser rendering.

---

## 2. Release & Git Flow

1. **Review Diff:** Check `git diff` and `git status` to ensure only intended changes are staged.
2. **Commit Standard:** Use conventional commit messages:
   - `feat(...)`: New case or major capability.
   - `fix(...)`: Bug fix, layout adjustment, or styling patch.
   - `refactor(...)`: Code cleanup or optimization.
3. **Push to Remote:** Push cleanly to `origin/main`.
