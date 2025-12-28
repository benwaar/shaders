# 🎓 Spec-Driven Shader Engineering Study Plan (Flutter Focus)

A structured, engineering-first roadmap for authoring **deterministic, reusable shaders**
from **explicit visual specifications**, with Flutter as the target integration environment.

This study treats shaders as **small, constrained programs authored against contracts** —
not visual experiments.

This project is designed to be teachable: each phase produces artifacts that can be reused
as examples, templates, and constraints for others later.

👉 See [`docs/FOUNDATIONS.md`](docs/FOUNDATIONS.md) for glossary of terms.

---

## Core Principle

> **Specs define behavior. Code satisfies specs.**

No shader is written without a spec.  
No spec is changed without intent changing.

---

## Core Loop

Reference → Visual Spec → Shader Spec → Plan (IR) → Implementation → Integration → Verification

---

# Phase 0 — Foundations, Mental Models & Early Gotchas

This phase establishes the **mental model and discipline** used throughout the study.

Before writing specs or shader code, we align on:
- what a spec is (a behavioral contract, not math or prose)
- how K.E.R.N.E.L is applied as an engineering constraint system
- the most common early failure modes in shader work (hidden inputs, non-neutral defaults,
  integration drift, undefined equivalence)

These ideas are introduced here at a high level and expanded in detail in **Phase 0**.
All later phases assume this shared foundation and terminology.

👉 See full detail in [`PHASE0.md`](PHASE0.md)

---

# Phase 1 — Repository Building Blocks (Setup Once)

**Goal:** create a stable project surface area before learning effects.

**Deliverables**
- `specs/` and `shaders/` folder structure
- `specs/SPEC_TEMPLATE.md` (single source of truth)
- manifest-driven shader discovery (`shaders/manifest.json`)
- player assumptions documented (how uniforms/time/resolution are provided)

👉 See full detail in [`PHASE1.md`](PHASE1.md)

**Exit criteria**
- You can add a shader/spec pair without “mystery edits”
- The player loads a shader reliably

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

👉 See full detail in [`PHASE2.md`](PHASE2.md)

**Exit criteria**
- You can write specs without referencing implementation
- You can predict behavior from the spec alone

---

# Phase 3 — Simple Effect Library (Skill Ladder)

**Goal:** build a small, controlled set of effects from deterministic → time-based.

Each effect is specified, implemented, verified, and locked before moving on.

- **Solid Tint** — uniform color modification with neutral defaults  
- **Brightness / Contrast** — deterministic color remapping  
- **Vignette** — spatial falloff without time or noise  
- **Scanlines** — static periodic screen-space pattern  
- **Grain** — deterministic noise via explicit seed  
- **Flicker** — controlled, time-based intensity variation (last)

👉 See full detail in [`PHASE3.md`](PHASE3.md)

**Exit criteria**
- Each shader has a spec and a passing implementation in the player
- At least 2–3 specs are `LOCKED`
- You can explain each effect in terms of inputs + invariants

---

# Phase 4 — Spec-to-Plan (IR) & EXPLAIN Reports **(NEW)**
**Goal:** build the “query planner” layer: derive an explicit, inspectable **logical + physical plan**
from each shader spec *before* implementation, so you can reason about correctness + performance.

**Deliverables**
- Update `SPEC_TEMPLATE.md` to require a **Derived Plan** section:
  - **Logical Plan (IR):** ordered primitives (sample, remap, falloff, mix, clamp, etc.)
  - **Physical Plan:** texture fetch count, ALU hotspots, precision policy, coordinate assumptions
  - **Allowed Rewrites:** semantics-preserving optimizations (constant folding, sample reuse, clamp merge)
  - **EXPLAIN Trace:** mapping from spec clauses → plan nodes (what came from where)
- For each Phase 2 shader, produce an **EXPLAIN.md** (or `PLAN` section) alongside the spec.

**Exit criteria**
- You can predict texture samples + likely hotspots from the plan alone.
- You can propose ≥3 optimizations as **rewrites** without changing spec semantics.
- Two implementations can differ in code but share the same plan + verified behavior.

---

# Phase 5 — Cross-Shader Conventions (Mini “Framework”)

**Goal:** define shared conventions so shaders behave as a coherent system.

**Deliverables**
- shared uniform semantics (naming + meaning)
- timing rules (if/when time is allowed)
- default behavior rule (neutral output by default)
- parameter ranges and units conventions
- naming conventions for files/specs

**Exit criteria**
- A new shader follows conventions by default
- Specs read consistently across the library

---

# Phase 6 — Reference Decomposition (Systems Engineer Lens)

**Goal:** learn to observe film references as **visual systems**.

Translate references into **observable, testable behavior**.

Rules:
- no shader code
- no vague aesthetic language
- no implementation thinking

Deliverable: engineering-grade visual specs.

**Exit criteria**
- You can produce a visual spec that lists variables, invariants, and constraints
- You can write at least 3 “acceptance checks” from a reference without coding

---

# Phase 7 — Visual Spec → Shader Spec

**Goal:** translate visual specs into formal shader contracts.

Add:
- coordinate assumptions
- precision requirements
- deterministic behavior expectations
- integration risks (gamma, scaling, sampling)

Spec remains **DRAFT** until verified in the player.

**Exit criteria**
- You can convert a reference into a runnable, spec’d shader plan
- You can identify what must be uniform-controlled vs constant (and document it)

---

# Phase 8 — Spec-Constrained Implementation

**Goal:** implement the smallest shader that satisfies the spec.

Rules:
- only declared inputs allowed
- no hidden constants (if it matters, it’s an input or documented)
- no behavior outside the spec

**Exit criteria**
- Implementation matches acceptance criteria without “hand-wavy” exceptions

---

# Phase 9 — Spec-Preserving Flutter Integration

**Goal:** embed shaders without violating intent.

If integration breaks intent, **integration is wrong**, not the spec.

**Exit criteria**
- The shader behaves the same in isolation and in its real UI context

---

# Phase 10 — Verification & Spec Locking

**Goal:** freeze behavior once verified.

Once locked:
- behavior must not change
- refactors must preserve output
- new behavior requires a new spec

**Exit criteria**
- You have a small locked library (at least 3 locked specs)
- You can refactor safely without changing behavior

---

# Phase 11 — Automation & Spec-Flow Framework (Completion Phase)

**Goal:** introduce tooling that enforces discipline and supports teaching/reuse.

Automation is introduced only after the process is stable.

**Add lightweight automation that enforces structure (not intent):**
- block merges/commits if:
  - a `.frag` is added/changed without a corresponding `.spec.md`
  - Spec Status is missing
  - required headings are missing
- optional: auto-generate a simple index of shaders/specs from `manifest.json`

**Deliverables**
- a repo checklist / contribution guide aligned to the Spec Gate
- minimal CI checks (or pre-commit hooks) enforcing structure
- a “spec flow” rule: `spec → implement → verify → lock`

**Exit criteria (recommended “graduation” point)**
- New work cannot bypass specs accidentally
- The repo teaches discipline by default (even with collaborators)
- Locked specs remain stable under normal iteration

---

# Phase 12 — Maintenance Under Contract

**Goal:** keep the library stable as it grows.

- locked specs are contracts
- refactors must preserve behavior
- failures are classified as:
  - spec violation vs implementation defect vs integration defect

**Exit criteria**
- You can evolve the repo without breaking trust in prior work

---

## Completion Criteria

You are done when you can:
- write specs without coding
- predict behavior before implementation
- integrate without altering intent
- explain failures as spec vs implementation vs integration
- reject shaders that violate specs without “fixing” them in code
- enforce the workflow with lightweight automation

---

## Final Rule

**If it isn’t verifiable, it isn’t a spec.**

---

## Future Study — Porting & Multi-Backend Support (Deferred)

Porting to other shader languages / native stacks is intentionally out of scope for this study.

It becomes relevant only after:
- you have a locked library
- your automation/spec-flow is working
- you truly need multi-backend support (e.g., Flutter → native rewrite)

When it becomes relevant, treat porting as a new study with its own constraints,
targets, and verification strategy.
