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

Browser-first gate: All primitive shaders and Applied Shader Projects A–E must run and be verified in the simple browser player before any Flutter integration work begins.

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

### Applied Shader Project A — HUD Interference for Text (Flicker + Scanlines + Grain)

A heads-up display effect applied to UI/text surfaces: subtle flicker, scanlines, noise, brightness pulsing, and occasional glitch-like instability. The shader **does not generate text** or “swap languages”; text swapping is owned by the UI layer (two strings or two pre-rendered glyph textures), while the shader provides the visual interference layer. This project exercises neutral defaults, monotonic controls, and bounded time-based flicker using Phase 3 primitives.

Invariant: when all effect controls are zero, text is perfectly readable.

---

### Applied Shader Project B — Dream Depth & Presence (Atmospheric Separation)

A calm, deterministic “dream depth” shader that gently separates subject from background using soft spatial falloff and subtle color drift (no noise, no glitch, no spectacle). The effect should feel like increased presence and softness rather than blur: background regions become slightly more diffuse/less contrasty while the subject retains clarity. Defaults must be neutral (no visible change), and any optional time component is strictly bounded and slow enough to read as “breathing” rather than animation.

Invariant: at defaults, output matches input; increasing `uPresence` increases separation monotonically without introducing artifacts.


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
- For each Phase 3 shader and for each shader with a spec, produce an **EXPLAIN.md** (or `PLAN` section) alongside the spec.

**Exit criteria**
- You can predict texture samples + likely hotspots from the plan alone.
- You can propose ≥3 optimizations as **rewrites** without changing spec semantics.
- Two implementations can differ in code but share the same plan + verified behavior.

---

### Applied Shader Project C — Generator Overload (Electric Tension Layer)

A “reactor/generator overload” effect: rising emissive intensity, crawling electric arcs, and bounded temporal variation to create tension without chaos. This is a strong candidate for the **Bounded Temporal Tension** capstone thread, but it is only built after the Spec-to-Plan (IR) phase so the arc logic and cost (ALU vs samples) is explainable. Early versions use Phase 3 primitives (brightness/contrast + grain + flicker); later versions add a dedicated “electric arc” primitive and are verified with explicit bounds and equivalence rules.

Invariant: intensity and motion are bounded and never diverge.

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

### Applied Shader Project D — Rocket Exhaust Flame (Procedural Emission)

A procedural rocket exhaust effect built as a controlled emission system: core brightness, falloff, and time-warped noise shaping a flame cone. This comes after planning because it is noise-heavy and can easily become unstable or expensive without clear constraints. The study treats it as layered behavior (mask → gradient → noise modulation → bounded animation) with explicit performance expectations and strict neutral defaults (no thrust = no visible effect).

Invariant: no thrust input produces no visible emission.

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

### Applied Shader Project E — Shockwave / Impact Propagation

A controlled, event-driven shader representing a single impulse propagating through space and decaying over time.

This project introduces:
- event-based time (not continuous oscillation)
- explicit start / peak / decay phases
- bounded temporal envelopes
- spatial propagation tied to time
- equivalence rules for “close enough” behavior

This shader contains no fire, debris, or chaos. It exists to teach orchestration discipline before multi-system composition.

---

### Applied Shader Project F — Forest Explosion (Multi-System Composition)

A forest explosion is treated as a **composition of systems**, not a single shader: a flash/pulse layer, an expanding shockwave ring/distortion, smoke/noise billows, and optional debris/sparks (often better as particles). This project is intentionally deferred until after planning and conventions, because it requires clear authority boundaries (what is shader-owned vs particle-owned), temporal sequencing, and equivalence tolerance rules. It becomes a “systems integration” exercise: spec → plan → layered implementation → verification across multiple components.

Invariant: each sub-system can be disabled independently without breaking others.

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

## Capstone Summary — What This Study Produces

At completion, this repository contains three locked shaders that
demonstrate spec-driven engineering across state, space, and time.

- **Capstone α** proves deterministic state signaling
- **Capstone β** proves spatial reasoning and compositional control
- **Capstone γ** proves bounded, explainable temporal behavior

Together, they demonstrate the full workflow:
spec → plan → implementation → integration → verification

---


## Future Study — Porting & Multi-Backend Support (Deferred)

Porting to other shader languages / native stacks is intentionally out of scope for this study.

It becomes relevant only after:
- you have a locked library
- your automation/spec-flow is working
- you truly need multi-backend support (e.g., Flutter → native rewrite)

When it becomes relevant, treat porting as a new study with its own constraints,
targets, and verification strategy.
