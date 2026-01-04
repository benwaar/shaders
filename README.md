# 🎨 Visual Language & Spec-Driven Shader Engineering

This repository is a **foundational study in spec-driven engineering** using
**2D fragment shaders** as a deterministic, inspectable medium.

It focuses on how **visual language** — drawn from film, print, and interface design —
can be expressed as **explicit, testable specifications**, then implemented as
small, predictable shader programs.

Shaders here are treated as **constrained programs authored against contracts** —
not visual experiments, not style imitation, and not math demos.

> _This repository is about learning how intent becomes execution._

---

## What This Repository Teaches

By the end of this study, you should be able to:

- Write **clear, enforceable specs** for visual behavior
- Distinguish **intent, specification, plan, implementation, and integration**
- Predict shader behavior **before writing code**
- Explain shader behavior **without reading the implementation**
- Refactor or optimize shaders **without changing semantics**
- Diagnose failures as:
  - spec errors
  - implementation defects
  - integration mistakes

This repository prioritizes:

**correctness · explainability · repeatability · reuse**

over novelty or visual flash.

---

## What “Visual Language” Means Here

In this study, **visual language** refers to the ability to:

- observe visual references
- identify signals, variables, and invariants
- express behavior in bounded, testable terms
- reproduce that behavior deterministically

It does **not** refer to subjective taste, style trends, or aesthetic judgment.

---

## Core Discipline: Spec-Driven Development

Every shader in this repository is written **from a spec first**.

The canonical workflow is:

**Visual Reference → Visual Spec → Shader Spec → Plan (IR) → Implementation → Verification**

The **spec is the source of truth**.  
Implementation may change; behavior may not.

A shader is considered incomplete if it cannot be verified against its spec.

---

## K.E.R.N.E.L (Spec Discipline)

All specs follow **K.E.R.N.E.L**, used as an engineering discipline:

- **Keep it simple** — one objective per shader
- **Easy to verify** — pass/fail acceptance criteria required
- **Reproducible** — declared inputs, defaults, no hidden constants
- **Narrow scope** — non-goals are explicit
- **Explicit constraints** — precision, performance, platform
- **Logical structure** — consistent section order

K.E.R.N.E.L exists to prevent drift, enable safe refactoring,
and support future tooling.

---

## Study Structure (Stage 1)

This repository corresponds to **Stage 1** of a larger shader engineering roadmap.

- 👉 **[FOUNDATIONS.md](docs/FOUNDATIONS.md)** — shared language & mental models  
- 👉 **[STUDY_PLAN.md](STUDY_PLAN.md)** — the complete Stage 1 study  
- 👉 **[Shader Engineering Roadmap](docs/notes/roadmap_shader_targets.md)** — what comes after

Progression is gated by **spec clarity**, not visual output.

---

## Spec Status Convention

Every shader spec ends with a status line:

- `Spec Status: DRAFT` — intent still evolving
- `Spec Status: LOCKED` — behavior is frozen

Only `LOCKED` specs may be reused or refactored.

---

## Getting Started

For new sessions or collaborators:

1. Read **`FOUNDATIONS.md`**
2. Follow **`STUDY_PLAN.md`** and `PHASE[0+].md` in order
3. Keep shaders:
   - spec-driven
   - readable
   - non-destructive
4. Target **WebGL2 / GLSL ES 3.00**
5. Use `shaders/manifest.json` for discovery

If it isn’t verifiable, it isn’t a spec.
---

## Useful Tools

**VSCode Extensions for Shader Development:**
- **WebGL GLSL Editor** — Real-time linting and syntax highlighting for `.frag` and `.vert` files. Validates shader syntax as you write.