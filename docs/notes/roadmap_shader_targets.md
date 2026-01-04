# Shader Engineering Roadmap

This roadmap defines the **long-term progression** of shader engineering skills
across platforms, APIs, and systems.

It is intentionally split across **stages**, where each stage has a distinct goal
and produces durable artifacts before moving forward.

There are **two primary documents** in this project:

- **The Study Plan** — Stage 1 (current focus)
- **This Roadmap** — how work expands *after* the study is complete

---

## Stage 1 — Spec-Driven Shader Engineering (Current Study)

**This stage is defined entirely by the document:**

> 🎓 *Spec-Driven Shader Engineering Study Plan*

Stage 1 is not about platforms or engines.  
It is about learning to treat shaders as **engineered systems**.

### What Stage 1 establishes

Stage 1 builds the foundation that all later stages depend on:

- Shaders as **small programs authored against contracts**
- Specs as **behavioral truth**, not documentation
- Deterministic behavior with neutral defaults
- Explicit inputs, bounds, and non-goals
- Debugging at three layers:
  - spec
  - plan
  - implementation
- Reasoning about performance *before* writing code
- Verification and spec locking as first-class steps

### What Stage 1 deliberately excludes

- No engine-specific abstractions
- No Flutter, Unity, Unreal, or framework glue
- No multi-backend portability work
- No AI- or tool-assisted authoring workflows

### Outcome of Stage 1

A small, locked shader library with:
- enforceable specs
- explainable plans (IR)
- verified behavior
- stable contracts

Stage 1 is complete when the study’s completion criteria are met —
not when a platform integration exists.

---

## Stage 2 — Tooling & Assistive Systems (Discipline-First)

**Goal:** Reinforce and enforce Stage 1 discipline through tooling,
without altering authorship or intent.

Tooling is introduced **only after** Stage 1 practices are understood
and exercised manually.

### Focus
- Spec gate enforcement (structure, required sections, status)
- Manifest and index generation from declared specs/shaders
- EXPLAIN trace validation and completeness checks
- Compile/run verification in sandboxed environments
- Documentation grounding (GLSL / WGSL semantics verification)

### MCP usage constraints

MCP may be used **only as an assistive layer**, never as an author.

Allowed:
- Reference mining → spec drafts (never code-first)
- Semantic validation of shader language usage
- Explaining existing plans or implementations

Forbidden:
- Generating shaders without an existing spec
- Modifying intent or behavior
- Introducing undeclared inputs or constants
- Bypassing spec gates or verification steps

### Rule
> Tooling enforces discipline — it does not replace it.

**Top 5 MCP uses to explore**
- **Reference mining** — retrieve comparable shader patterns and translate them into local specs and IR, never code-copying.
- **Documentation grounding** — query GLSL/shader references to confirm semantics and avoid hallucinated behavior.
- **Compile/run verification** — compile and execute shaders in a sandbox to catch real errors and validate outputs.
- **Agent-assisted iteration** — allow MCP to suggest edits only within an existing spec + plan, never to change intent.
- **Audit & explainability** — require MCP-assisted changes to update EXPLAIN traces and remain diff-inspectable.

---

## Stage 3 — Flutter Integration Under Contract

**Goal:** Integrate shaders into Flutter *without violating specs*.

This stage begins only after Stage 1 and Stage 2 are complete.

### Focus
- `FragmentProgram` integration
- Uniform plumbing and lifecycle
- Resolution, scaling, and DPI correctness
- Color space and gamma consistency
- UI composition constraints

### Rule
> If behavior changes, integration is wrong — not the spec.

Specs written in Stage 1 remain authoritative.  
Integration work is treated as a **consumer** of locked behavior.

---

## Stage 4 — Cross-API Portability (WGSL / WebGPU)

**Goal:** Separate shader intent from shading language and API.

### Focus
- Port selected locked shaders from GLSL → WGSL
- Bind groups and uniform buffers
- Sampling and precision differences
- Performance comparison across APIs

### Rule
> If the API changes, the math should not.

This stage tests whether Stage 1 specs were *actually portable*.

---

## Stage 5 — Extended GPU Systems

**Goal:** Expand beyond fragment shaders into broader GPU execution models.

### Focus
- Compute shaders
- Multi-pass pipelines
- Bloom, distortion, depth-based effects
- Memory access patterns
- Synchronization constraints

### Rule
> Performance is designed, not discovered.

Specs and planning discipline from Stage 1 are reused unchanged.

---

## Stage 6 — Engine-Scale Integration & Composition

**Goal:** Apply shader discipline inside large systems.

### Focus
- Engine pipelines
- Particles vs shaders vs compute ownership
- Temporal orchestration across systems
- Debugging across boundaries
- Authority and ownership rules

### Rule
> Authority boundaries must be explicit.

