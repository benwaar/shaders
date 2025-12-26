# 🎨 Visual Language & Spec-Driven Shader Engineering (Flutter Focus)

This repository explores how **visual language in film** can inspire **spec-driven shader design** for 2D games — focusing on deterministic visual behavior (emotion, color, texture) rather than 3D realism.

Shaders here are treated as **small, constrained programs authored against explicit visual specifications**, not ad-hoc visual experiments.

This project approaches film references as visual systems to be analyzed, not styles to be copied. Many “film-inspired” shader workflows take one of two common routes: an art-first approach that tries to replicate a look through descriptive labels and aesthetic tweaking (“make it more cinematic,” “more gritty,” “like Blade Runner”), or a math-first approach that builds effects from known techniques (noise, blur, bloom, LUTs) and hopes the result lands emotionally. Both can produce good images, but they often struggle with repeatability: intent gets fuzzy, parameters behave unpredictably, and integration into a real UI quietly changes the effect. Here, we treat a film still like a reference implementation: we identify the variables, invariants, constraints, and acceptance checks that make the image read the way it does, then encode those behaviors into a spec before writing any GLSL. The goal isn’t resemblance — it’s deterministic behavior that preserves meaning when reused, refactored, and shipped inside interactive 2D worlds.

> _“Studying how cinematic imagery can live inside interactive flat worlds — deliberately and repeatably.”_

---

## 🎯 Core Approach: Spec-Driven Shader Authoring

Every shader in this repository is written **from a spec first**.

The workflow is:

**Film Reference → Visual Spec → Shader Spec → Implementation → Flutter Integration → Verification**

A shader spec defines:
- **Intent** — the visual or emotional effect being targeted
- **Inputs** — uniforms, ranges, defaults, interaction points
- **Constraints** — platform (WebGL2 / GLSL ES 3.00), precision, performance
- **Acceptance Criteria** — how to tell the shader is “working”
- **Non-goals** — what is explicitly not being attempted

Iteration refines the **implementation**; the **spec only changes when intent changes** and must pass a defined spec gate before coding begins.

---

## 🧱 Spec Discipline (K.E.R.N.E.L)

All shader work in this repository follows **K.E.R.N.E.L** principles:

- **Keep it simple** — one visual objective per shader
- **Easy to verify** — pass/fail acceptance criteria required
- **Reproducible** — all inputs have defaults; no hidden constants
- **Narrow scope** — non-goals are explicit
- **Explicit constraints** — platform, precision, performance stated
- **Logical structure** — specs follow a consistent section order

If a shader cannot be verified against its spec, it is considered incomplete.
This repository prioritizes correctness, predictability, and reuse over novelty.


---

## 🧩 Study Landscape

```text
Visual Reference Analysis
├── Observable Visual Behavior
│   ├── Spatial relationships (composition as layout constraints)
│   ├── Color relationships (ranges, mappings, invariants)
│   ├── Light behavior (gradients, falloff, highlights)
│   └── Surface behavior (grain, blur, noise, distortion)
├── Spec-Driven Shader Design
│   ├── Fragment Shaders (GLSL ES 3.00)
│   ├── Procedural effects (light, blur, grain, tint)
│   └── Color grading & post-FX for 2D UI elements
└── Visual Integration in Flutter
    ├── Applying shaders to cards and surfaces
    ├── Interaction-driven parameter changes (hover, selection)
    └── Cross-scene consistency via shared specs
```

---

## 📘 Study Plan

This repository follows a **structured, spec-led study path**.

Continue from the current phase here:  
👉 **[STUDY_PLAN.md](STUDY_PLAN.md)** — overall structure and rules  
👉 **[PHASE0.md](PHASE0.md)** — setup for specs and graphics  
👉 **[PHASE1.md](PHASE1.md)** — spec foundations and spec gate  
👉 **[PHASE2.md](PHASE2.md)** — simple effect specs (building blocks)

Progression is gated by **spec clarity**, not visual flash.  
Shaders are not implemented unless their specs meet minimum verification criteria.

---

## 🧠 Notes & Explanations

Reference documents explaining technologies, tradeoffs, and architectural choices.

See:
- `docs/notes/shader_languages.md`
- `docs/notes/flutter_rendering.md`
- `docs/notes/roadmap_shader_targets.md`
- `docs/notes/architecture_reuse.md`

---

## 🔬 Future Research

| Topic | Status | Summary |
|-------|--------|----------|
| **[Procedural Lighting in 2D](notes/future/procedural-lighting.md)** | 🧪 | Creating depth and atmosphere in flat scenes |
| **[Emotion Through Color & Texture](notes/future/color-emotion-shaders.md)** | 🧪 | Using shader-driven color changes to reflect game states |
| **[Shader Optimization for Mobile](notes/future/flutter-shader-performance.md)** | 🧪 | Ensuring smooth rendering across devices |

---

## 🎥 Study Philosophy: Intent First, Effects Second

This project follows a **deliberate progression**:

1. Start with a **film reference** and written visual intent  
2. Express that intent as a **shader spec**  
3. Implement the smallest shader that satisfies the spec  
4. Integrate it into Flutter UI elements  
5. Review for spec compliance, consistency, restraint, and clarity

### Spec Status Convention

Every shader spec ends with a status line:

- `Spec Status: DRAFT` — intent still evolving
- `Spec Status: LOCKED` — behavior must not change

Only `LOCKED` specs may be reused or refactored.

> _“Each shader teaches one piece of visual language.”_

---

## 🌐 Resources & Inspiration

Here are key references used to guide shader development and visual research:

| # | Resource | Description |
|---|----------|-------------|
| 1 | [**Writing & using fragment shaders (Flutter Docs)**](https://docs.flutter.dev/ui/design/graphics/fragment-shaders?utm_source=chatgpt.com) | Official Flutter guide for loading and using `.frag` shaders. Essential for setup and understanding. |
| 2 | [**Shady Flutter: Using GLSL Shaders in Flutter**](https://blog.codemagic.io/shady-flutter/?utm_source=chatgpt.com) | Hands-on intro with GLSL shader examples in Flutter — practical for 2D visual effects. |
| 3 | [**Practical Fragment Shaders in Flutter – Droids on Roids**](https://www.thedroidsonroids.com/blog/fragment-shaders-in-flutter-app-development?utm_source=chatgpt.com) | Explains fragment shaders with clear examples, ideal for learning Flutter shader workflow. |
| 4 | [**Analyzing Optic & Filmic Effects in WebGL**](https://medium.com/%40josecastrovaron/analyzing-optic-and-filmic-effects-in-webgl-47abe74df74e?utm_source=chatgpt.com) | Visual deep-dive into film grain, LUTs, and color grading — useful for connecting film language to shader logic. |
| 5 | [**Film Grain Shader Example (GLSL)**](https://gameidea.org/2023/12/01/film-grain-shader/?utm_source=chatgpt.com) | Simple yet powerful example shader for film grain — perfect as a starting effect. |
---

## 🚦 Start Here for New Sessions

If you are opening this project in a **new ChatGPT session** or joining as a collaborator:

1. Read **`START_HERE_FOR_CHATGPT.md`** for project preferences and constraints  
2. Follow **`STUDY_PLAN.md`** and **`PHASE2.md`** in order  
3. Keep shaders:
   - spec-driven
   - readable
   - non-destructive
4. Target **WebGL2 / GLSL ES 3.00**
5. Use `shaders/manifest.json` for discovery — do not hardcode lists
