# 🎨 Shader Study


This is a GLSL Shader study to add some pizzazz to the art from the art study
> [Prompt engineering art study](../docs/ART_PROMPT_TO_SPECS_STUDY.md)
> [Shader languages](../docs/shader_languages.md)


## Goal
Build intuition, taste, and fluency in shaders through **fast, playful experimentation**.
Prioritize rapid visual feedback, remixing primitives, and capturing “happy accidents.”
Structure is intentionally light; discipline is applied only when a sketch is worth keeping.

---

## Core Mode
- **Play Mode (default)**: experiment freely, iterate fast, no specs
- **Ship Mode (optional)**: lightly clean up a successful sketch for reuse

---

## Creative Primitives to Learn & Remix
- Gradients (linear, radial, cosine palettes)
- Coordinate transforms (scale, rotate, polar, ripple, twist)
- Signed Distance Functions (basic shapes, smooth unions)
- Repetition & symmetry (tiling, mirroring, kaleidoscope)
- Noise (value/simplex, fbm, domain warping)
- Layering & compositing (add, multiply, mask, blend)
- Time modulation (loops, easing, bounded motion)

---

## Light Constraints (use selectively)
- One visual idea per sketch
- ≤ 2 noise calls per pass
- Neutral/off state exists
- Loopable in a fixed duration (e.g. 4s)
- Works at multiple aspect ratios

---

## Sketch Capture
For each sketch, save:
- Shader code
- Screenshot or short GIF
- 3–5 notes:
  - what changed
  - what worked
  - what surprised you

---

## When to Switch to Ship Mode
Only if you want reuse or portability:
- Define objective (1 sentence)
- List inputs with defaults
- Add 1–2 acceptance checks
- Bound time/noise behavior

---

## Key Learning Resources
- **The Book of Shaders** — foundational concepts & exercises  
  https://thebookofshaders.com/
- **Inigo Quilez (iq)** — SDFs, noise, domain tricks  
  https://iquilezles.org/
- **Shadertoy Examples** — study + remix strong minimal shaders  
  https://www.shadertoy.com/
- **Guilty Gear / Arc System Works talks** — stylized effects thinking  
  (search: “Arc System Works GDC shaders”)

---

## Outcome
- Strong shader intuition
- Personal visual vocabulary
- A library of sketches worth refining later
- Clear sense of which effects deserve spec-driven hardening
