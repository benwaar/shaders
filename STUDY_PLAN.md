# 🎓 Spec-Driven Shader Engineering Study Plan (Stage 1)

A structured, engineering-first study for authoring **deterministic, reusable shaders**
from **explicit visual specifications**.

This study treats shaders as **small, constrained programs authored against contracts** —
not visual experiments.

This project is designed to be teachable: each phase produces artifacts that can be reused
as examples, templates, and constraints for others later.

👉 See [The Shader Study Roadmap](docs/notes/roadmap_shader_targets.md).

This study explicitly trains **shader debugging skills**:
- visual debugging
- mathematical / coordinate debugging
- spec-level debugging (intent vs behavior)

👉 See [`docs/FOUNDATIONS.md`](docs/FOUNDATIONS.md) for glossary of terms.


---

## Core Principle

> **Specs define behavior. Code satisfies specs.**

No shader is written without a spec.  
No spec is changed without intent changing.

---

## Core Loop

Reference → Visual Spec → Shader Spec → Plan (IR) → Implementation → Integration → Verification

Browser-first gate: All primitive shaders and Applied Shader Projects A–E must run and be
verified in the simple browser player before any backend integration work begins.

---

## Why This Looks Like a Full Course

This study is intentionally structured like a university-level course because it is teaching
**systems engineering discipline**, not just shader tricks.

Each shader serves as a concrete vehicle for learning how to:
- define behavior precisely
- reason about cost and determinism
- debug visual and mathematical failures
- integrate safely
- maintain correctness over time

The phases separate concerns that are often collapsed in practice — specification, planning,
execution, verification, and maintenance — replacing the common
“cool effect → confusion” failure mode with a repeatable, teachable workflow.

---

## Capstone Shaders (Built Incrementally)

This study produces **three capstone shaders**.

They are introduced early as **intent-only artifacts** and are
implemented progressively as new concepts are learned.

Each capstone is refined across multiple phases and is only
considered complete once it is fully spec’d, planned, implemented,
integrated, and locked.

### Capstone α — State-Driven Color & Mood Shader
A deterministic shader that communicates emotional or system state
purely through controlled color and intensity changes.

### Capstone β — Spatial Focus & Composition Shader
A shader that guides attention using spatial falloff and composition,
with explicit coordinate assumptions and performance guarantees.

### Capstone γ — Bounded Temporal Tension Shader
A shader that uses time deliberately and safely, with strict bounds
and defined equivalence.

---

# Phase 0 — Foundations, Mental Models & Early Gotchas

This phase establishes the **mental model and discipline** used throughout the study.

Before writing specs or shader code, we align on:
- what a spec is (a behavioral contract, not math or prose)
- how K.E.R.N.E.L is applied as an engineering constraint system
- early failure modes in shader work, including:
  - hidden inputs
  - non-neutral defaults
  - coordinate confusion
  - precision loss and banding
  - resolution dependence
  - time divergence
  - integration drift
  - undefined equivalence

All later phases assume this shared foundation and terminology.

👉 See full detail in [`PHASE0.md`](PHASE0.md)

---

# Phase 1 — Repository Building Blocks (Setup Once)

**Goal:** create a stable project surface area before learning effects.

**Deliverables**
- `specs/` and `shaders/` folder structure
- `specs/SPEC_TEMPLATE.md` (single source of truth)
- manifest-driven shader discovery (`shaders/manifest.json`)
- player assumptions documented (how uniforms, time, and resolution are provided)

**Exit criteria**
- You can add a shader/spec pair without “mystery edits”
- The player loads a shader reliably

👉 See full detail in [`PHASE1.md`](PHASE1.md)

---

# Phase 2 — Spec Foundations & Spec Gates

**Goal:** learn to write enforceable shader specs before writing GLSL.

A shader may not be implemented unless its spec passes the Spec Gate.

**Spec structure (required):**
- Objective (one sentence)
- Intent
- Inputs (name, type, range, default)
- Constraints (platform, performance)
- Non-goals
- Acceptance criteria (pass/fail)
- Spec status (`DRAFT` or `LOCKED`)

**Spec Gate (must pass):**
- Single objective
- At least two acceptance checks
- All inputs declared with defaults
- Non-goals explicitly listed
- Platform and performance constraints stated
- Standard section order followed

**Exit criteria**
- You can write specs without referencing implementation
- You can predict behavior from the spec alone
- You can identify and explain ambiguous or under-specified behavior

👉 See full detail in [`PHASE2.md`](PHASE2.md)

---

# Phase 3 — Simple Effect Library (Skill Ladder)

**Goal:** build a small, controlled set of effects from deterministic → time-based,
while explicitly training shader debugging skills.

Each effect is specified, implemented, verified, and locked before moving on.

**Effects**
- **Solid Tint** — uniform color modification with neutral defaults
- **Brightness / Contrast** — deterministic color remapping
- **Vignette** — spatial falloff without time or noise
- **Scanlines** — static periodic screen-space pattern
- **Grain** — deterministic noise via explicit seed
- **Flicker** — controlled, time-based intensity variation (last)

**Debugging emphasis**
- visualizing intermediate values (UVs, masks, gradients)
- diagnosing coordinate errors
- fixing non-neutral defaults
- identifying precision and clamping issues
- detecting resolution- and time-dependent artifacts

**Exit criteria**
- Each shader has a spec and a passing implementation in the player
- At least 2–3 specs are `LOCKED`
- You can explain each effect in terms of inputs and invariants
- You can diagnose and fix visual artifacts by inspecting math,
  inputs, and invariants — **without relying on AI-generated fixes**

👉 See full detail in [`PHASE3.md`](PHASE3.md)

---

### Applied Shader Project A — HUD Interference for Text

A heads-up display effect applied to UI/text surfaces: subtle flicker,
scanlines, noise, brightness pulsing, and occasional instability.

The shader **does not generate text**; text swapping is owned by the UI layer.
The shader provides only the visual interference layer.

Invariant: when all effect controls are zero, text is perfectly readable.

---

### Applied Shader Project B — Dream Depth & Presence

A calm, deterministic shader that separates subject from background
using soft spatial falloff and subtle color drift.

Invariant: at defaults, output matches input; increasing `uPresence`
increases separation monotonically without artifacts.

---

# Phase 4 — Spec-to-Plan (IR) & EXPLAIN Reports

**Goal:** reason about correctness and performance *before* implementation.

**Deliverables**
- Derived Plan section in specs:
  - Logical Plan (IR)
  - Physical Plan (samples, ALU, precision)
  - Allowed Rewrites
  - EXPLAIN Trace (spec clause → plan node)

**Exit criteria**
- You can predict texture samples and hotspots from the plan alone
- You can propose optimizations as spec-preserving rewrites
- Two implementations can differ in code but share the same plan and behavior

---

### Applied Shader Project C — Generator Overload

A bounded “reactor overload” effect with rising emissive intensity,
electric arcs, and controlled temporal variation.

Invariant: intensity and motion are bounded and never diverge.

---

# Phase 5 — Cross-Shader Conventions

**Goal:** define shared conventions so shaders behave as a coherent system.

**Deliverables**
- shared uniform semantics
- timing rules
- neutral default behavior rules
- parameter range conventions
- naming conventions

**Exit criteria**
- A new shader follows conventions by default
- Specs read consistently across the library

---

# Phase 6 — Reference Decomposition (Systems Engineer Lens)

**Goal:** translate visual references into testable behavior.

Rules:
- no shader code
- no vague aesthetic language
- no implementation thinking

**Exit criteria**
- You can produce visual specs with variables, invariants, and constraints
- You can write acceptance checks without coding

---

### Applied Shader Project D — Rocket Exhaust Flame

A procedural emission system built from layered behavior:
mask → gradient → noise modulation → bounded animation.

Invariant: no thrust input produces no visible emission.

---

# Phase 7 — Visual Spec → Shader Spec

**Goal:** translate visual specs into formal shader contracts.

Add:
- coordinate assumptions
- precision requirements
- deterministic behavior expectations
- integration risks

**Exit criteria**
- You can convert a reference into a runnable shader spec and plan
- You can justify what is uniform-controlled vs constant

---

# Phase 8 — Spec-Constrained Implementation

**Goal:** implement the smallest shader that satisfies the spec.

Rules:
- only declared inputs allowed
- no hidden constants
- no behavior outside the spec

**Exit criteria**
- Implementation matches acceptance criteria exactly

---

### Applied Shader Project E — Shockwave / Impact Propagation

A controlled, event-driven impulse propagating through space and decaying over time.

Invariant: behavior is bounded, monotonic, and equivalent within defined tolerance.

---

### Applied Shader Project F — Forest Explosion (Deferred Composition)

A multi-system composition of flash, shockwave, smoke, and debris,
with explicit authority boundaries.

Invariant: each subsystem can be disabled independently.

---

# Phase 9 — Spec-Preserving Integration (Deferred)

**Goal:** integrate shaders without violating intent.

Rule:
> If behavior changes, integration is wrong — not the spec.

---

# Phase 10 — Verification & Spec Locking

**Goal:** freeze behavior once verified.

Once locked:
- behavior must not change
- refactors must preserve output
- new behavior requires a new spec

---

# Phase 11 — Automation & Spec-Flow Framework

**Goal:** enforce discipline through lightweight tooling.

**Exit criteria**
- New work cannot bypass specs
- Locked specs remain stable under iteration

---

# Phase 12 — Maintenance Under Contract

**Goal:** evolve the library without breaking trust.

Failures are classified as:
- spec violation
- implementation defect
- integration defect

---

## Completion Criteria

You are done when you can:
- write specs without coding
- predict behavior before implementation
- debug shader math and artifacts deliberately
- explain failures as spec vs implementation vs integration
- enforce the workflow with automation

---

## Final Rule

**If it isn’t verifiable, it isn’t a spec.**
---

## Capstone Summary — What This Study Produces

At completion, this repository contains three locked shaders that
demonstrate spec-driven engineering across state, space, and time.

- **Capstone α** proves deterministic state signaling
- **Capstone β** proves spatial reasoning and compositional control
- **Capstone γ** proves bounded, explainable temporal behavior

Together, they demonstrate the full workflow:
spec → plan → implementation → integration → verification
