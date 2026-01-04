# 🎨 Visual Language & Spec-Driven Shader Engineering (Flutter Focus)

This repository is a **foundational study in spec-driven engineering**, using
**2D fragment shaders** as a deterministic substrate.

It explores how **visual language** (inspired by film, print, and UI design)
can be expressed as **explicit, testable specifications**, then compiled into
small, predictable shader programs for Flutter applications.

Shaders here are treated as **constrained programs authored against contracts** —
not ad-hoc visual experiments, not style imitation, and not math demos.

> _“This repository is about learning how intent becomes execution.”_

---

## 🎯 Learning Objectives

By the end of this study, you should be able to:

- Write **clear, enforceable specs** for visual behavior  
- Distinguish **intent, specification, plan, execution, and integration**
- Predict shader behavior **before writing GLSL**
- Explain shader behavior **without reading the code**
- Refactor or optimize shaders **without changing semantics**
- Diagnose failures as:
  - spec errors
  - implementation defects
  - integration mistakes

This repository deliberately prioritizes:

**correctness · explainability · repeatability · reuse**

over novelty or visual flash.

---

### Shared Language & Definitions

This project uses a precise, shared vocabulary for terms like **spec**, **plan**,
**execution**, **authority**, and **verification**.

These terms are defined once and reused across all related projects:

👉 **[FOUNDATIONS.md — Shared Language & Mental Models](docs/FOUNDATIONS.md)**

If a term is not defined there, it should not be used casually elsewhere.

---

## 🧠 From Prompts to Specs (Context, Not a Dependency)

Many engineers encounter *prompt-based systems* before they encounter
**spec-driven systems**.

This project intentionally reframes that experience:

- A **prompt** is an instruction.
- A **spec** is a contract.

Prompts are useful for exploring intent, but **specs are required** when behavior
must be:

- reproducible  
- verifiable  
- optimizable  
- safe to refactor  

Some early exploration in this work involved prompt-style thinking.
Those experiments are now **archived for reference only** in [docs/art-prompts-to-specs/ART_PROMPT_TO_SPECS_STUDY.md](docs/art-prompts-to-specs/ART_PROMPT_TO_SPECS_STUDY.md).

All durable lessons have been **formalized into explicit specifications** and
integrated into the study itself.

No prior “AI art” or prompt-engineering project is required to use this repository.
The only assumption is comfort expressing intent in natural language.

---

## 🧱 Spec Discipline (K.E.R.N.E.L)

All shader work in this repository follows **K.E.R.N.E.L**, used here as a
**general engineering discipline**, not a creative trick:

- **Keep it simple** — one visual objective per shader  
- **Easy to verify** — pass/fail acceptance criteria required  
- **Reproducible** — all inputs have defaults; no hidden constants  
- **Narrow scope** — non-goals are explicit  
- **Explicit constraints** — platform, precision, performance stated  
- **Logical structure** — specs follow a consistent section order  

If a shader cannot be verified against its spec, it is considered **incomplete**.

K.E.R.N.E.L exists to:
- control scope
- prevent drift
- enable safe refactoring
- support future automation

---

## 🎯 Core Approach: Spec-Driven Shader Authoring

Every shader in this repository is written **from a spec first**.

The workflow is:

**Visual Reference → Visual Spec → Shader Spec → Plan → Implementation → Flutter Integration → Verification**

A shader spec defines:

- **Intent** — the visual or emotional behavior being targeted  
- **Inputs** — uniforms, ranges, defaults, interaction points  
- **Constraints** — platform (WebGL2 / GLSL ES 3.00), precision, performance  
- **Acceptance Criteria** — how to tell the shader is “working”  
- **Non-goals** — what is explicitly not being attempted  

The **spec is the source of truth**.  
Implementation may change; behavior may not.

---

## 📘 Study Plan

👉 **[FOUNDATIONS.md — Shared Language & Mental Models](docs/FOUNDATIONS.md)**  
👉 **[STUDY_PLAN.md](STUDY_PLAN.md)** — overall structure of this study
👉 **[The Shader Study Roadmap](docs/notes/roadmap_shader_targets.md)** - this study in the larger plan  

Continue from the current phase here:  
👉 **[PHASE0.md](PHASE0.md)** — spec-driven engineering foundations & early gotchas  
👉 **[PHASE1.md](PHASE1.md)** — repository setup & spec scaffolding  
👉 **[PHASE2.md](PHASE2.md)** — spec foundations & spec gate  
👉 **[PHASE3.md](PHASE3.md)** — simple effect specs (skill ladder)  
👉 **[PHASE4.md](PHASE4.md)** — spec-to-plan (IR) & EXPLAIN reasoning  

Progression is gated by **spec clarity**, not visual flash.  
Shaders are not implemented unless their specs meet minimum verification criteria.

---

## 🧠 Notes & Explanations

Reference documents explaining technologies, tradeoffs, and architectural choices.

See:
- `docs/notes/shader_languages.md`
- `docs/notes/flutter_rendering.md`

---

## 🎥 Study Philosophy: Intent First, Effects Second

This project follows a **deliberate progression**:

1. Start with a **film reference** and written visual intent  
2. Express that intent as a **shader spec**  
3. Implement the smallest shader that satisfies the spec  
4. Integrate it into Flutter UI elements  
5. Review for spec compliance, consistency, restraint, and clarity

### Spec Status Convention

Every shader spec ends with a status line:

- `Spec Status: DRAFT` — intent still evolving
- `Spec Status: LOCKED` — behavior must not change

Only `LOCKED` specs may be reused or refactored.

> _“Each shader teaches one piece of visual language.”_

---

## 🚦 Start Here for New Sessions

If you are opening this project in a **new ChatGPT session** or joining as a collaborator:

1. Read **`START_HERE_FOR_CHATGPT.md`** for project preferences and constraints  
2. Follow **`STUDY_PLAN.md`** and **`PHASE[0+].md`** in order  
3. Keep shaders:
   - spec-driven
   - readable
   - non-destructive
4. Target **WebGL2 / GLSL ES 3.00**
5. Use `shaders/manifest.json` for discovery — do not hardcode lists
