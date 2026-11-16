---
name: vestigo-live-context
description: >-
  Provides live project context, architecture, operational rules, and domain understanding
  for the VESTIGO forensic crime investigation web application. Activate this skill whenever
  starting a new conversation or task on VESTIGO, answering questions about what VESTIGO is,
  how its multi-case engine operates, reviewing current versions, or checking constraints before writing code.
---

# VESTIGO — Live Context & Project Understanding

This skill provides immediate, comprehensive context on the **VESTIGO** forensic criminalistics web application and ecosystem. Use it as the canonical briefing before proposing, reviewing, or writing code in this repository.

---

## 1. What is VESTIGO?

**VESTIGO** is an interactive, forensic-grade criminal investigation Progressive Web Application (PWA) inspired by games like *Unsolved Case Files*, *Crímenes Imperfectos* and judicial instruction dossiers.

Players take on the role of police investigators or examining magistrates, analyzing authentic judicial paperwork, forensic pathology reports, CCTV captures, license plate recognition (LPR) radars, audio briefings, and digital police terminals to solve complex criminal cases.

### Core Pillars:
1. **Rigor Criminalístico y Judicial:** All procedures, vocabulary, court references (Diligencias Previas, Sumario Ordinario), pathology terminology (livideces, carboxihemoglobina, test de diatomeas), and chain of custody strictly follow Spanish judicial and forensic criminalistics standards.
2. **Cero Spoilers & Progresión Tripartita:** Evidence is staged in confidential physical/digital envelopes:
   - **Sobre A:** Diligencias iniciales, levantamiento de cadáver y protocolo de autopsia.
   - **Sobre B:** Interrogatorios cruzados, contradicciones, telemetría y peritajes técnicos.
   - **Sobre C:** Pieza de convicción final, informes de laboratorio SECRIM y auto de prisión.
3. **Experiencia Híbrida:** Documentación imprimible (A4 con maquetación judicial auténtica) combinada con herramientas web digitales (terminal SITRA-JUD, vídeo briefing narrado, visor de evidencias UV/luminol y cuaderno de notas interactivo).

---

## 2. Active Cases in the Catalog

| Case ID | Case Title | Jurisdiction / Court | Scenario & Criminal Hook |
|---|---|---|---|
| `valdeluna` (Caso 01) | *El Último Mosto de Bodegas Valdeluna* | D.P. 402/2024 · Juzgado Instrucción Nº 2 Valladolid | Bodeguero hallado muerto junto a la Tina 4 en Peñafiel. Falsa asfixia por CO₂ desmentida por livideces dorsales y reactivo químico azul. |
| `arousa` (Caso 02) | *Marea Negra en Ría de Arousa* | Sumario 118/2025 · Juzgado Instrucción Nº 1 Vilagarcía | Patrón de bateeiro hallado flotando tras colisión del «Novo Alborada». Test de diatomeas descarta ahogamiento; telemetría AIS/SIVE y pintura en casco. |
| `cartagena` (Caso 04) | *El Enigma de los Dos Faros* | D.P. 204/2025 · Juzgado Instrucción Nº 3 Cartagena | Arqueólogo subacuático del ARQVA muerto con equipo técnico en Cala Cortina. Descubrimiento por el gato Paco, corte de cámara térmica en Faro Verde de Curra y gas adulterado. |
| *Caso 03* | *La Cripta de San Jerónimo* (Planificado) | D.I.P. 590/2025 · Toledo | Archivo diocesano, manuscritos iluminados y mecenazgo eclesiástico (Teaser). |

---

## 3. Architecture & File Structure

VESTIGO deliberately uses **zero build tools, zero bundlers, and zero heavy frameworks** (pure vanilla HTML5, CSS3, modern JavaScript, and Service Worker).

| Path | Purpose |
|---|---|
| [`index.html`](file:///C:/Users/migue/.gemini/antigravity/scratch/crimenes-imperfectos-valdeluna/index.html) | Main SPA shell, multi-case catalog, workspace tabs (Briefing, Dossiers, Terminal, Evidence/Suspects, Notepad), in-app document reader, and modals. |
| [`css/liquid-glass.css`](file:///C:/Users/migue/.gemini/antigravity/scratch/crimenes-imperfectos-valdeluna/css/liquid-glass.css) | Core *Liquid Noir 3.0* design system: obsidian palettes, specular micro-borders, glassmorphism, responsive badges, and modal sheets. |
| [`css/desktop-layout.css`](file:///C:/Users/migue/.gemini/antigravity/scratch/crimenes-imperfectos-valdeluna/css/desktop-layout.css) | Split-view desktop engine (`.vg-split-workspace`, `.vg-split-sidecar`), resilient grid layouts, and iframe protection. |
| [`css/mobile-ux.css`](file:///C:/Users/migue/.gemini/antigravity/scratch/crimenes-imperfectos-valdeluna/css/mobile-ux.css) | Authoritative mobile cascade (< 768px): iOS bottom navigation dock, full synopsis displays, and safe-area adjustments. |
| [`css/mobile-touch-engine.js`](file:///C:/Users/migue/.gemini/antigravity/scratch/crimenes-imperfectos-valdeluna/css/mobile-touch-engine.js) | Native gesture engine: pull-to-dismiss bottom sheet, double-tap photo zoom, and discrete tactile haptics (`navigator.vibrate`). |
| [`sw.js`](file:///C:/Users/migue/.gemini/antigravity/scratch/crimenes-imperfectos-valdeluna/sw.js) | Service Worker offline precaching engine (`CACHE_NAME`), network-first HTML and stale-while-revalidate for static assets. |
| [`casos/`](file:///C:/Users/migue/.gemini/antigravity/scratch/crimenes-imperfectos-valdeluna/casos/) | Directory housing modular case assets (e.g. `caso-02-arousa`, `caso-04-cartagena`) with their respective dossiers, images, terminal and video briefing files. |
| [`PROTOCOLO_CREACION_CASOS.md`](file:///C:/Users/migue/.gemini/antigravity/scratch/crimenes-imperfectos-valdeluna/PROTOCOLO_CREACION_CASOS.md) | Standardized methodology protocol for authoring new forensic cases. |
