# 🎨 Visual Language & Shader Coding Study (Flutter Focus)

This repository explores how **visual language in film** can inspire **spec-driven shader design** for 2D games — focusing on **emotion, color, and texture** rather than 3D realism.

Shaders here are treated as **small, constrained programs authored against explicit visual specifications**, not ad-hoc visual experiments.

> _“Studying how cinematic imagery can live inside interactive flat worlds — deliberately and repeatably.”_

---

## 🎯 Core Approach: Spec-Driven Shader Authoring

Every shader in this repository is written **from a spec first**.

The workflow is:

**Film Reference → Visual Spec → Shader Implementation → Flutter Integration → Review**

A shader spec defines:
- **Intent** — the visual or emotional effect being targeted
- **Inputs** — uniforms, ranges, defaults, interaction points
- **Constraints** — platform (WebGL2 / GLSL ES 3.00), precision, performance
- **Acceptance Criteria** — how to tell the shader is “working”
- **Non-goals** — what is explicitly not being attempted

Iteration refines the **implementation**; the **spec only changes when intent changes**.

---

## 🧩 Study Landscape

```text
Visual Storytelling
├── Film Imagery Analysis
│   ├── Composition, Color, Light, Texture
│   └── Symbolism & Visual Mood
├── Spec-Driven Shader Design
│   ├── Fragment Shaders (GLSL ES 3.00)
│   ├── Procedural Light, Blur, Grain, Tint
│   └── Color Grading & Post-FX for 2D Cards
└── Visual Integration in Flutter
    ├── Applying Shaders to Card Elements
    ├── Interactive Layering (hover, selection)
    └── Cinematic Style Consistency Across Scenes
```

---

## 📘 Study Plan

This repository follows a **structured, spec-led study path**.

Continue from the current phase here:  
👉 **[STUDY_PLAN.md](STUDY_PLAN.md)**  
👉 **[PHASE2.md](PHASE2.md)**

Progression is gated by **spec clarity**, not visual flash.

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
5. Review for consistency, restraint, and clarity  

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
