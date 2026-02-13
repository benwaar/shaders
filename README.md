# 🎨 Shader Study


This is a GLSL Shader study to add some pizzazz to the art from the art study
> [Prompt engineering art study](docs/art-prompts-to-specs/ART_PROMPT_TO_SPECS_STUDY.md)   
> [Shader languages Notes](docs/shader_languages.md)

---

## Learning Path

### Phase 1: Fundamentals
- Gradients (linear, radial, cosine palettes)
- Coordinate transforms (scale, rotate, polar)
- UV manipulation basics
- Debugging workflow (visualize intermediate values, color channels)

### Phase 2: Shapes & Composition
- Signed Distance Functions (basic shapes, smooth unions)
- Repetition & symmetry (tiling, mirroring, kaleidoscope)
- Layering & compositing (add, multiply, mask, blend)

### Phase 3: Procedural Generation
- Noise (value/simplex, fbm)
- Domain warping & distortion
- Advanced transforms (ripple, twist, kaleidoscope)

### Phase 4: Animation & Polish
- Time modulation (loops, easing, bounded motion)
- Post-processing effects (bloom, vignette, chromatic aberration)
- Raymarching basics (optional, for 3D scenes)

---

## Practice Approach
- **2-3 sketches per primitive** — quick experiments to understand behavior
- **"Finished" study** — one polished piece combining 2-3 techniques per phase
- **Daily vs. deep** — 30min daily experiments OR 2hr focused studies
- **Document learnings** — note surprising behaviors, useful patterns, gotchas

---

## Milestone Projects

1. **Phase 1 Complete**: Animated gradient using 2+ coordinate transforms
2. **Phase 2 Complete**: Kaleidoscope/mandala pattern with SDFs and symmetry
3. **Phase 3 Complete**: Organic shape with noise-driven animation
4. **Final**: Original artistic shader combining 5+ techniques from all phases

---

## Light Constraints (use selectively)
- One visual idea per sketch
- ≤ 2 noise calls per pass
- Neutral/off state exists
- Loopable in a fixed duration (e.g. 4s)
- Works at multiple aspect ratios

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

