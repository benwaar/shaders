## Phase 3 — Spec-to-Plan (IR) & EXPLAIN Reports

**Goal:** learn to derive an explicit, inspectable **execution plan** from a shader spec,
analogous to a SQL logical + physical execution plan.

This phase introduces a **mandatory middle layer**:

> **Spec → Logical Plan (IR) → Physical Plan → Shader Code**

No GLSL is written in this phase without first producing a plan.

All shaders in this phase:
- already have a **locked or near-locked spec** (from Phase 2)
- produce a **Derived Plan** artifact before implementation or refactor
- can be reasoned about in terms of cost, precision, and correctness *without reading code*

---

### 3.1 Logical Plan (Shader IR)

**Purpose:** make the “what happens” explicit, independent of GLSL syntax.

For each shader, derive a **Logical Plan** consisting of:
- ordered operations (e.g. sample → transform → mix → clamp)
- data dependencies between operations
- invariants tied back to spec clauses

Example (conceptual):
- sample input texture
- compute UV-based distance
- apply falloff function
- blend with original color
- clamp output

Introduces:
- shader-as-dataflow thinking
- operation ordering as semantics
- separation of intent from implementation

---

### 3.2 Physical Plan (Cost & Precision)

**Purpose:** reason about *how* the logical plan executes on the GPU.

For each logical plan, derive:
- texture fetch count
- ALU-heavy operations (distance, trig, noise)
- precision requirements (highp vs mediump)
- coordinate space assumptions
- obvious performance risks

This is the shader equivalent of a **physical execution plan**.

Introduces:
- cost awareness without premature optimization
- precision as a design constraint
- GPU execution mental model

---

### 3.3 Rewrite Rules (Safe Optimizations)

**Purpose:** define which transformations are allowed *without changing spec semantics*.

Examples:
- constant folding (neutral defaults eliminate branches)
- clamp merging or hoisting
- sample reuse (avoid double sampling)
- replacing expensive ops with equivalent forms (when spec allows)

Rules:
- rewrites must be justified by **spec invariants**
- rewrites are documented, not implicit
- if a rewrite changes behavior, the spec must change

Introduces:
- semantics-preserving optimization
- refactoring under contract
- explicit optimizer rules

---

### 3.4 EXPLAIN Report

**Purpose:** make the derivation auditable and teachable.

Each shader produces an **EXPLAIN-style report** that includes:
- spec clause → logical plan node mapping
- logical plan → physical cost notes
- applied (or allowed) rewrites
- integration risks (gamma, premultiplied alpha, resolution scaling)

This artifact should let someone understand the shader **without reading GLSL**.

Introduces:
- explainability as a first-class deliverable
- reviewable shader design
- shared vocabulary for discussion and optimization

---

### Exit criteria for Phase 3

- You can predict texture samples and major cost drivers from the plan alone.
- Two different GLSL implementations can share the same plan and verified behavior.
- You can propose optimizations *before* writing code.
- Shader behavior is explainable in the same way a SQL query plan is explainable.

---

## Resources — Companion Videos (Phase 3)

These resources focus on **mental models, execution, and compilation** rather than visual effects.
They are best watched while **writing plans**, not code.

---

### GPU & Shader Execution Mental Models (Watch First)

- **How GPUs Actually Work (A Gentle Intro)**  
  https://www.youtube.com/watch?v=-P28LKWTzrI  
  Clear explanation of GPU parallelism and why shader cost models differ from CPU code.

- **What Happens When a Shader Runs?**  
  https://www.youtube.com/watch?v=8x4ZbW9b6xk  
  High-level walkthrough of fragment shader execution per pixel.

---

### Shader Code as Dataflow (IR Thinking)

- **Shaders as Dataflow Programs**  
  https://www.youtube.com/watch?v=Z8w7zP1pG5A  
  Explains how shaders are best understood as pipelines of operations, not scripts.

- **Thinking in Terms of Inputs, Outputs, and Transforms**  
  https://www.youtube.com/watch?v=0ifChJ0nJfM  
  Reinforces operation ordering and dependency reasoning.

---

### Cost Models & Optimization (No Premature Tuning)

- **Why Texture Fetches Are Expensive**  
  https://www.youtube.com/watch?v=H1y0z7n7tU8  
  Essential for physical plan reasoning.

- **ALU vs Bandwidth on the GPU**  
  https://www.youtube.com/watch?v=6n8qJw7p7H0  
  Helps classify shader operations into “cheap” vs “expensive”.

---

### Precision & Correctness

- **Floating Point Precision in Shaders**  
  https://www.youtube.com/watch?v=E9zYJXgk3pE  
  Explains why precision qualifiers matter and when they affect correctness.

- **Why Clamping and Ranges Matter**  
  https://www.youtube.com/watch?v=JkZs6Fq1P9M  
  Useful for reasoning about invariants and acceptance criteria.

---

### How to Use These Resources

- Watch with a **spec and a plan open**, not a code editor.
- Pause and translate concepts into:
  - logical plan steps
  - physical cost notes
  - rewrite rules
- If a video encourages “try it and see” without explanation, it is **out of scope**.

If you cannot explain an optimization in terms of the **plan**, you are not ready to apply it.
