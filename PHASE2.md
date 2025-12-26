## Phase 2 — Specs for Simple Effects

**Goal:** build a small, well-understood set of shader effects, progressing from fully deterministic behavior to controlled time-based variation.

All shaders in this phase:
- are written **from a spec first**
- default to **neutral output** (no visible effect)
- introduce **one new concept at a time**
- are verified and locked before moving on

### 2.1 Solid Tint

**Purpose:** establish the simplest possible color modification.

- Uniform color tint with controllable strength
- No spatial variation
- No noise
- No time dependence

Introduces:
- color multiplication
- strength blending
- neutral defaults

---

### 2.2 Brightness / Contrast

**Purpose:** add deterministic color transformation without spatial or temporal logic.

- Uniform brightness and contrast adjustment
- Predictable, monotonic parameter behavior
- No spatial variation
- No time dependence

Introduces:
- linear color remapping
- parameterized intensity control

---

### 2.3 Vignette

**Purpose:** introduce spatial falloff while keeping behavior static and predictable.

- Radial or screen-space falloff from a defined center
- Adjustable radius and softness
- No time dependence
- No noise

Introduces:
- UV-based spatial reasoning
- distance-based attenuation

---

### 2.4 Scanlines

**Purpose:** introduce periodic patterns in screen space.

- Static scanline pattern
- Adjustable density and strength
- Stable frame-to-frame
- No time dependence

Introduces:
- periodic functions
- screen-space frequency control

---

### 2.5 Grain

**Purpose:** introduce noise while preserving determinism.

- Procedural noise with explicit seed
- Adjustable grain size and strength
- Deterministic output for a fixed seed
- No time-based animation

Introduces:
- noise functions
- controlled randomness

---

### 2.6 Flicker

**Purpose:** introduce time as an input in a controlled, bounded way.

- Time-driven intensity variation
- Adjustable rate and strength
- Predictable, bounded output
- No spatial noise unless explicitly specified

Introduces:
- temporal inputs
- time-based modulation

---

**Exit criteria for Phase 2:**
- Each effect has a locked spec
- Behavior is predictable from the spec alone
- No shader relies on undocumented constants or side effects
