# Shader Roadmap (Refined, With Spec Phase)

## Phase 1 – GLSL Fundamentals (Now)
**Goal:** Absolute mechanical sympathy with the GPU

- ✅ Learn fragment shaders with visual film-scene goals  
- ✅ Use same GLSL for Flutter (`FragmentProgram`) and WebGL demos  
- 🔜 Integrate with gameplay or UI logic  
- 🔜 Hand-write:
  - coordinate transforms
  - lighting models (Phong / Blinn-Phong)
  - noise functions
  - color space conversions  
- 🔜 Debug artifacts *without* AI assistance  

**Rule:**  
> If it renders wrong, you must understand *why*.

---

## Phase 2 – Cross-API GPU Mental Model (WGSL / WebGPU)
**Goal:** Separate GPU concepts from shader syntax

- Port one shader (HUD flicker) from GLSL → WGSL
- Learn:
  - bind groups
  - uniform buffers
  - texture sampling differences
- Compare:
  - visual output
  - performance
  - ergonomics
- Identify what is:
  - language-specific
  - API-specific
  - GPU-universal  

**Rule:**  
> If the API changes, the math should not.

---

## Phase 3 – Extended GPU Work
**Goal:** Broaden execution models and data flow

- Explore compute shaders (WebGPU or native)
- Experiment with:
  - bloom
  - depth-based effects
  - distortion pipelines
- Learn:
  - memory access patterns
  - workgroup sizing
  - synchronization constraints  

**Rule:**  
> Performance is designed, not discovered.

---

## Phase 4 – Spec-Driven Shader Authoring (NEW)
**Goal:** Treat prompts as a *compiler frontend*, not a shortcut

### What this phase is
- Writing **natural-language shader specifications**
- Using prompts to:
  - generate *initial* GLSL/WGSL
  - explore variants
  - document intent
- Reviewing output as if it were:
  - compiler output
  - junior engineer code

### What this phase is not
- ❌ Not skipping shader math
- ❌ Not trusting AI output blindly
- ❌ Not “prompt magic”

---

### Core Exercises
- Write a **shader spec** *before* writing code
- Generate shader from spec
- Compare against:
  - your hand-written version
  - performance expectations
- Refine the spec until output stabilizes

Example spec sections:
- Target platform / GLSL version
- Coordinate spaces
- Lighting model
- Uniforms & inputs
- Constraints (no loops, no branches, no textures)
- Performance notes

---

### Validation Discipline
For every AI-generated shader:
- You must explain:
  - every math operation
  - every space transform
  - every uniform
- You must be able to:
  - optimize it manually
  - rewrite it without AI

**Rule:**  
> If you can’t reason about it, it doesn’t ship.

---

### One-line summary
> Phase 4 does not replace shader programming — it formalizes it.
