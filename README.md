# 🎨 Shader Study

[![Deploy to GitHub Pages](https://github.com/benwaar/shaders/actions/workflows/deploy.yml/badge.svg)](https://github.com/benwaar/shaders/actions/workflows/deploy.yml)

This is a GLSL Shader study to add some pizzazz to the art from an earlier prompt engineering art study
> [Prompt engineering art study](docs/art-prompts-to-specs/ART_PROMPT_TO_SPECS_STUDY.md)   
> [Shader languages Notes](docs/shader_languages.md)

---

## 🚀 Live Player

Deployed automatically via GitHub Pages on pushes to `main`:
**[Play online →](https://benwaar.github.io/shaders/player/)**

---

## Quick Setup for coding your own

See the player README: [player/README_PLAYER.md](player/README_PLAYER.md)

- **Install GLSL validator:** `brew install glslang`
- **Install git hooks:** run `bash install-hooks.sh` from the repo root

---

## Shader VFX Learning Path

Check out the [Key Learning Resources](#key-learning-resources) below and have a read of the [shaders intro](docs/shaders_intro.md) and the [glossary](shaders_glossary.md).

---

## 🎯 Learning Objectives

By completing this study, you should be able to:

### Technical

- Manipulate UV space (transform, repeat, warp)
- Build gradients and palettes procedurally
- Construct and combine SDF shapes
- Use noise with control and intention
- Animate with loopable, bounded time modulation
- Debug by visualizing intermediate values

---

### Artistic

- Translate visual ideas into mathematical components
- Layer simple techniques into cohesive compositions
- Use constraints to improve clarity and polish
- Iterate quickly from sketch → refinement → finished piece

---

### Outcome

Design and implement original artistic shaders that combine multiple techniques without losing clarity or control.

---

### Phase 1: [Fundamentals](docs/shader_fundamentals.md)
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
- **consider [light constraints](docs/shader_light_constraints.md)** for each sketch - use selectively
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

## Key Learning Resources

- **The Book of Shaders** — foundational concepts & exercises  
  https://thebookofshaders.com/
- **Inigo Quilez (iq)** — SDFs, noise, domain tricks  
  https://iquilezles.org/
- **Shadertoy Examples** — study + remix strong minimal shaders  
  https://www.shadertoy.com/
- **Guilty Gear / Arc System Works talks** — stylized effects thinking  
  (search: “Arc System Works GDC shaders”)

