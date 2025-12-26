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

---

## Resources — Companion Videos (Phase 2)

These videos support the **technical building blocks** introduced in Phase 2.
They focus on simple, explainable shader behaviors rather than complex visual effects.

They are best watched **alongside writing specs**, not as step-by-step tutorials.

---

### General Shader Fundamentals (Watch First)

- **What Is a Fragment Shader? (Inigo Quilez – Short Intro)**  
  https://www.youtube.com/watch?v=f4s1h2YETNY  
  A clear explanation of what fragment shaders do, focused on per-pixel behavior.

- **Fragment Shaders Explained Simply**  
  https://www.youtube.com/watch?v=GMHcI3p2qvA  
  A beginner-friendly overview of how fragment shaders transform color values.

---

### Color Manipulation (Solid Tint, Brightness / Contrast)

- **Color Manipulation in Shaders (Brightness & Contrast)**  
  https://www.youtube.com/watch?v=YkU2m9Z7n5M  
  Demonstrates linear color remapping concepts relevant to brightness and contrast.

- **Understanding Color Multiplication**  
  https://www.youtube.com/watch?v=9s5A9pIuM4o  
  Explains how multiplying colors affects output — directly applicable to tint shaders.

---

### Spatial Reasoning (Vignette)

- **UV Coordinates Explained**  
  https://www.youtube.com/watch?v=rgdYx4ZrL0g  
  A practical explanation of UV space, essential for vignette and screen-space effects.

- **Distance Functions in Shaders**  
  https://www.youtube.com/watch?v=Pm3FzZr1L5I  
  Introduces distance-based attenuation, useful for radial falloff.

---

### Periodic Patterns (Scanlines)

- **Sine Waves and Periodic Functions Explained**  
  https://www.youtube.com/watch?v=Zb0tJ7vN4Ow  
  A simple explanation of sine waves and frequency — useful for scanline patterns.

- **Screen-Space Effects Basics**  
  https://www.youtube.com/watch?v=9M4yQzQFz4U  
  Discusses effects tied to screen coordinates rather than object space.

---

### Noise & Randomness (Grain)

- **What Is Noise in Shaders?**  
  https://www.youtube.com/watch?v=Qf1p2N6S6kA  
  Explains procedural noise at a conceptual level without diving into heavy math.

- **Hash Functions for Simple Noise**  
  https://www.youtube.com/watch?v=J9kB2M3mX6k  
  Introduces deterministic “randomness” using hash-style functions.

---

### Time as an Input (Flicker)

- **Time-Based Animation in Shaders (Basics)**  
  https://www.youtube.com/watch?v=GZ4Y9w0EwZc  
  Shows how time is typically used as an input, without complex animation systems.

- **Controlling Oscillation with Time**  
  https://www.youtube.com/watch?v=8g8g4SxqX6E  
  Useful for understanding bounded, predictable flicker behavior.

---

### How to Use These Resources

- Watch selectively — not all videos are required.
- Focus on **concepts**, not copying code.
- Translate what you learn into:
  - clearer specs
  - better acceptance criteria
  - simpler implementations

If a video introduces behavior you cannot specify clearly, it is **out of scope** for Phase 2.
