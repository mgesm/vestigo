---
name: vestigo-case-author
description: >-
  Designs, authors, balances, and validates complete forensic crime cases for VESTIGO.
  Use whenever proposing, creating, or modifying cases, dossiers, suspect profiles, police
  interrogations, autopsy reports, physical evidence, timelines, or chemical/ballistic reports
  following the official VESTIGO case creation protocol.
---

# VESTIGO — Forensic Case Authoring Engine

This skill governs the end-to-end design and authoring of official criminal cases for the **VESTIGO** forensic platform, enforcing the standards established in [`PROTOCOLO_CREACION_CASOS.md`](file:///C:/Users/migue/.gemini/antigravity/scratch/crimenes-imperfectos-valdeluna/PROTOCOLO_CREACION_CASOS.md).

---

## 1. Non-Negotiable Forensic Tenets

### 1.1 Strict Criminalistics Rigor
Every case must be built on actual forensic science and judicial procedure:
- **Tanatología:** Livideces cadavéricas (fijación, tonalidad, hipóstasis dorsal vs ventral para detectar traslados de cadáver).
- **Cronotanatodiagnóstico:** Enfriamiento (*algor mortis*), rigidez (*rigor mortis*), digestión gástrica contrastada con comandas y horas de ingesta confirmadas.
- **Principio de Transferencia de Locard:** Micro-evidencias físicas, químicas o biológicas transferidas inevitablemente entre víctima, agresor y escena (residuos de disparo GSR, hidrocarburos, diatomeas en médula, reactivos químicos, pelos o fibras).
- **Telemetría y Cinemometría:** Tiempos de desplazamiento exactos, velocidades medias calculadas, cruce de pórticos LPR (radar de tráfico) y telemetría de telefonía celular o señales marítimas (AIS/SIVE/VHF).

### 1.2 Zero Spoilers & Three-Stage Delivery
Cases must never disclose conclusions directly; players must discover the deduction themselves:
- **Sobre A (Apertura Inmediata):**
  - Diligencia de levantamiento del cadáver con croquis acotado y regla métrica ABFO.
  - Atestado policial inicial con declaraciones testificales espontáneas.
  - Protocolo oficial del Instituto de Medicina Legal (IML) con causa fundamental, inmediata y hora estimada de la muerte.
- **Sobre B (Pieza Separada I - Precintada):**
  - Actas de declaración de los investigados y testigos en sede judicial o policial.
  - Informes técnicos y peritajes de telefonía, cámaras CCTV, radares o libro de registros.
  - Contradicciones y fisuras en las coartadas que reducen la lista de sospechosos.
- **Sobre C (Pieza de Convicción Final - Precintada):**
  - Prueba reina irrefutable (informe toxicológico SECRIM, espectrometría, análisis balístico o volcado de vídeo/audio).
  - Auto judicial de conclusión de sumario / procesamiento y resolución del caso.

---

## 2. Cast & Suspect Architecture

Each case must feature **1 victim** and **between 3 and 5 balanced suspects**:
- **Equilibrio de sospecha:** Al abrir el Sobre A, al menos 3 sospechosos deben tener móvil aparente y oportunidad temporal creíble.
- **Fichas de Filiación:** Cada personaje debe contar con DNI, filiación completa, domicilio, ocupación, relación con la víctima y retrato pericial de alta definición.
- **Coartadas Verificables:** Coartadas desmontables únicamente mediante el cruce cruzado de documentos (p. ej. factura horaria vs radar cinemométrico, o señal de radio vs apagón de baliza).

---

## 3. Case Integration Checklist into VESTIGO

When a case is finalized, it must be wired into [`index.html`](file:///C:/Users/migue/.gemini/antigravity/scratch/crimenes-imperfectos-valdeluna/index.html):
1. **Catalog Card:** Added inside `.catalog-grid` with 16:9 cover image, case badge, difficulty rating, synopsis, and `openCase('<caseId>')`.
2. **`CASES_DATA` Entry:** Complete metadata dictionary with `miniNum`, `metaTitle`, `dossiers` array, and `suspects` array.
3. **Global Search Index:** Search items registered in the Ctrl+K popover with corresponding `badge-*` tokens.
4. **Offline Precaching:** Directory added to `PRECACHE_ASSETS` in `sw.js` with version bump.
