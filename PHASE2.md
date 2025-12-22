# Phase 2 – Learn to Program Shaders (Spec-Driven, with 3 Study Shots)
_Updated: 2025-12-22_

Phase 2 is about **actually learning to write shaders** in small, safe steps while building three target effects:

1. **Study 01 – Foundations / Cinematic Post**  
2. **Study 02 – Distant Forest Explosion**  
3. **Study 03 – Rocket Propulsion**

**What’s new in this revision:** Phase 2 is now **spec-driven**. Every shader change is anchored to an explicit spec so the work stays reproducible, reviewable, and intentional.

---

## Core Loop (Spec-Driven)

**Reference → Visual Spec → Shader Spec → Implement → Embed → Review**

Rules:
- **No shader work without a spec.**
- Iteration refines the **implementation**; the **spec only changes when intent changes**.
- A shader that “looks cool” but violates the spec is **not complete**.

---

## Phase 2 Deliverables (Concrete)

By the end of Phase 2 you should have:

- ✅ Three small “Study Shot” shaders (01/02/03) that meet their specs
- ✅ A spec file for each study shot (visual + shader spec in one document)
- ✅ Parameter contracts (uniforms + ranges) that are stable and documented
- ✅ A repeatable debug workflow (tiny debug shaders, A/B changes, versioned milestones)

Recommended structure (example):
```
specs/
  study01_post.md
  study02_explosion.md
  study03_plume.md
shaders/
  study01_*.frag
  study02_*.frag
  study03_*.frag
```

---

## Legend (tags) & Progress

- 🎨 **ART** – visual / cinematic craft (composition, grading, FX readability)  
- 💡 **SHADER** – core shader literacy (GLSL, UVs, textures, uniforms)  
- 🧮 **MATH** – math & signal-processing (distance, interpolation, frequency)  
- 🧵 **PAR** – parallel / GPU thinking (data-parallel, divergence, coherence)  
- 🧱 **ENG** – software-engineering habits (debugging, modularity, APIs, reproducibility)

**Progress legend:**  
- `[ ]` = not started · `[▶]` = in progress · `[✓]` = done

> Tip: replace `[ ]` with `[▶]` or `[✓]` as you move through tasks. Keep commits or screenshots when you hit milestones.

---

## 0. Goals & Mental Model – 💡 SHADER · 🧵 PAR · 🧱 ENG

By the end of Phase 2 you should feel:

- [ ] Comfortable editing fragment shaders without fear of “breaking everything”. 💡🧱  
- [ ] Able to **reason in UV space** (0–1 coordinates over the screen). 💡🧮  
- [ ] Familiar with:
  - [ ] Color math (mixing, lerp, contrast, saturation). 💡🧮🎨  
  - [ ] Time-based animation (`uTime`, normalized 0–1 “life”). 💡🧮  
  - [ ] Simple noise and patterns. 💡🧮  
  - [ ] Masks and compositing (putting FX “behind” things). 💡🎨  
- [ ] Confident you can build:
  - [ ] A **simple post-process pass** (Study 01). 💡🎨  
  - [ ] A **radial explosion over a plate** (Study 02). 💡🧮🧵  
  - [ ] A **directional plume** (Study 03). 💡🧮🧵  

> 🧵 **PAR mental model:** A fragment shader is a tiny function that runs **independently for every pixel in parallel**. Given the same inputs, it always produces the same color (like a pure function).

---

## 0.5 Spec Gate (NEW) – 🧱 ENG · 🎨 ART

Before you code, write a **one-page spec** for each study shot.

### Spec checklist (minimum)
- **Intent:** what effect should the viewer perceive?
- **Inputs:** uniforms + ranges + defaults (what is controllable?)
- **Constraints:** WebGL2 / GLSL ES 3.00, perf/precision assumptions
- **Acceptance criteria:** how to verify “correct”
- **Non-goals:** what you will *not* attempt in v1

### Spec templates (copy/paste)

#### Study 01 spec template
```md
# Study 01 – Cinematic Post (v1)

Intent:
- ...

Inputs:
- uExposure (0..2, default 1)
- uVignette (0..1, default 0.4)
- ...

Constraints:
- WebGL2 / GLSL ES 3.00
- Avoid branches where possible
- No heavy multi-sample blur in v1

Acceptance:
- Vignette darkens corners without crushing midtones
- Exposure changes are smooth and predictable

Non-goals:
- LUT-based grading in v1
```

#### Study 02 spec template
```md
# Study 02 – Distant Explosion (v1)

Intent:
- A brief, emissive explosion in the distant valley that reads as light, not paint.

Inputs:
- uExplosionPos (vec2)
- uExplosionStart (float)
- uExplosionDuration (float)
- uExplosionMaxRadius (float)
- uExplosionIntensity (0..2)

Constraints:
- Explosion is behind foreground silhouettes (mask)
- Noise affects edge breakup only (avoid global shimmer)

Acceptance:
- Brightness peaks early (life ~0.1–0.2), then fades
- Edge is irregular/boiling, not a perfect circle
- No foreground occlusion failures during the full timeline

Non-goals:
- No debris simulation
- No volumetric smoke in v1
```

#### Study 03 spec template
```md
# Study 03 – Rocket Plume (v1)

Intent:
- A directional plume aligned to the rocket axis, with subtle banding and flicker.

Inputs:
- uPlumeOrigin (vec2)
- uPlumeAngle (float radians)
- uPlumeLength (0..1)
- uPlumeWidth (0..1)
- uBandFreq (0..50)
- uDistortionAmount (0..0.02)

Constraints:
- Banding should be subtle (no barcode)
- Distortion (if enabled) must be smooth and low amplitude

Acceptance:
- Plume aligns with angle and stays stable under parameter changes
- Flicker reads as energy, not noise

Non-goals:
- Full fluid simulation
```

---

## 1. Warm-Up – Shader Comfort – 💡 SHADER · 🧱 ENG

**Goal:** Know where the shader file is, how to run it, and how not to panic.

### 1.1 Open and poke – 💡 SHADER

- [ ] Open the Study 01 shader (e.g. `study01_*.frag`).  
- [ ] Find:
  - [ ] The **main function** (`main()` / `mainImage()` depending on setup)
  - [ ] The **uniforms** (`uSceneTex`, `uTime`, `uResolution`, etc.)
  - [ ] The **final color output** line

**Mini exercises – 🧱 ENG**
- [ ] Change a constant (e.g. vignette strength or exposure).
- [ ] Recompile / reload and observe what changed.
- [ ] Add a comment anchor aligned to your spec, e.g. `// spec: vignette` or `// spec: exposure`.

> ✅ When this feels trivial, move on.

---

## 2. UV Space & Basic Shapes – 💡 SHADER · 🧮 MATH · 🧵 PAR

**Goal:** Be at home in normalized coordinates and simple distance-based shapes.

### 2.1 See the UVs – 💡 SHADER · 🧮 MATH

In a throwaway or debug shader:

```glsl
vec2 uv = vUv; // or computed from fragCoord / uResolution
fragColor = vec4(uv, 0.0, 1.0);
```

You should see:
- left = black, right = red
- bottom = black, top = green
- a diagonal gradient across the screen

**Mini exercises**
- [ ] Flip X or Y (`uv.y = 1.0 - uv.y;`)
- [ ] Zoom UV (`uv *= 2.0;`) and see tiling
- [ ] Offset UV (`uv += vec2(0.1, 0.0);`)

> 🧵 PAR note: Every pixel runs the same code with different `uv`. No shared state.

### 2.2 Circles & masks – 💡 SHADER · 🧮 MATH

```glsl
vec2 center = vec2(0.5);
float dist = length(uv - center);
```

- [ ] Visualize distance as grayscale.
- [ ] Create a soft circle with `smoothstep`.
- [ ] Move the circle with a uniform (e.g. `uCirclePos`).

### 2.3 Apply to Study 02 – 💡 SHADER · 🎨 ART · 🧱 ENG

**Spec checkpoint (NEW):** Ensure your placement/mask work satisfies Study 02 spec constraints.

- [ ] In Study 02, temporarily replace the explosion with a simple circle mask.
- [ ] Use `uExplosionPos` and `uExplosionMaxRadius` (or equivalent) to place/scale.
- [ ] Add the circle additively as a faint brightening.
- [ ] Confirm it appears in the correct region.

**Milestone**
- [ ] **You can place a soft circle exactly where the spec says the explosion origin is.**

---

## 3. Color, Blending & Grading – 🎨 ART · 💡 SHADER · 🧮 MATH

**Goal:** Choose blending intentionally based on the spec.

### 3.1 Solid colors & mix – 🎨 ART · 🧮 MATH

Given mask `m`:

```glsl
vec3 col = mix(colorA, colorB, m);
```

- [ ] Try curve shaping: `pow(m, 2.0)`, `sqrt(m)`.
- [ ] Build a simple 2–3 stop ramp (center → edge).

### 3.2 Additive vs normal blend – 🎨 ART · 💡 SHADER

- [ ] Compare `mix(base, fx, alpha)` vs `base + fx * mask`.
- [ ] Document which blend mode matches the spec intent (light vs paint).

### 3.3 Apply to Study 02 – 🎨 ART · 💡 SHADER · 🧱 ENG

**Spec checkpoint:** Explosion must read as emissive light.

- [ ] Create a basic fire ramp (white/yellow core → orange/red edge).
- [ ] Composite additively with modest intensity.
- [ ] Ensure the plate still reads clearly (no full-frame blowout).

**Milestone**
- [ ] **Explosion feels emissive and matches the spec’s “light not paint” requirement.**

---

## 4. Time & Motion – 💡 SHADER · 🧮 MATH · 🧵 PAR

**Goal:** Animate via `uTime` and normalized life; treat life curves as a behavioral contract.

### 4.1 Simple time experiments – 💡 SHADER · 🧮 MATH

```glsl
float v = 0.5 + 0.5 * sin(uTime);
```

- [ ] Speed changes: `sin(t * 2.0)` vs `sin(t * 0.1)`.
- [ ] Pulsing radius and sliding gradients.

### 4.2 Normalized life – 💡 SHADER · 🧮 MATH · 🧱 ENG

```glsl
float t = max(uTime - uExplosionStart, 0.0);
float life = clamp(t / uExplosionDuration, 0.0, 1.0);
```

- [ ] Visualize `life` as grayscale.
- [ ] Use `life` to drive radius growth.
- [ ] Use a curve (e.g. `life*(1.0-life)`) to peak intensity mid-early.

### 4.3 Apply to Study 02 – 💡 SHADER · 🎨 ART · 🧱 ENG

**Spec checkpoint:** Brightness peaks early (life ~0.1–0.2), then fades.

- [ ] Grow radius with life.
- [ ] Peak brightness early; fade by end.
- [ ] Ensure clean start/end (no lingering glow).

**Milestone**
- [ ] **Explosion timing is under control and meets the spec’s timeline rules.**

---

## 5. Noise & Detail – 💡 SHADER · 🧮 MATH · 🧵 PAR

**Goal:** Break perfect edges into believable texture without global shimmer.

### 5.1 Visualize noise – 💡 SHADER · 🧮 MATH

Use the repo’s noise utility (or a simple hash/value noise). Visualize 0–1.

- [ ] Tune frequency and speed.
- [ ] Observe aliasing at high frequency.

### 5.2 Noise-modded masks – 💡 SHADER · 🧮 MATH · 🧱 ENG

**Spec rule:** Noise affects *edge breakup* only.

- [ ] Multiply circle edge by noise.
- [ ] Keep core stable; keep noise bounded.
- [ ] Tune thresholds to control “wispy vs chunky”.

### 5.3 Apply to Study 02 – 🎨 ART · 💡 SHADER · 🧱 ENG

- [ ] Apply noisy edge to explosion mask.
- [ ] Verify the edge reads “boiling,” not “sparkly TV static”.

**Milestone**
- [ ] **Explosion has believable irregular edges and remains stable under motion.**

---

## 6. Masks & Compositing (Depth Fake) – 🎨 ART · 💡 SHADER · 🧱 ENG

**Goal:** Hide FX behind foreground elements, consistently.

### 6.1 Visualize the mask – 💡 SHADER

- [ ] Render the mask texture as grayscale to confirm alignment.

### 6.2 Use mask to hide FX – 💡 SHADER · 🎨 ART · 🧱 ENG

- [ ] Composite explosion behind foreground using the mask.
- [ ] Scrub through the timeline to ensure no occlusion failures.

**Study 02 v1 Milestone**
- [ ] Timed, growing, noisy, colored explosion
- [ ] Additive emissive integration
- [ ] Correct occlusion using the mask
- [ ] Save “Study 02 v1” (commit + screenshot + parameter notes)

---

## 7. Directional FX – Rocket Plume (Study 03) – 💡 SHADER · 🧮 MATH · 🧵 PAR

**Goal:** Reuse fundamentals in a directional coordinate system.

### 7.1 Local axis coordinates – 💡 SHADER · 🧮 MATH

- [ ] Build rotated local space `q` where `q.x` is along-plume.
- [ ] Visualize `q.x` and `q.y`.

### 7.2 Cone / jet shape – 💡 SHADER · 🧮 MATH

- [ ] Create length and width masks.
- [ ] Validate that parameters are stable and predictable.

### 7.3 Bands / shock diamonds – 💡 SHADER · 🧮 MATH

- [ ] Add subtle periodic modulation along axis.
- [ ] Tune to avoid dense banding.

### 7.4 Apply color & animation – 🎨 ART · 💡 SHADER

- [ ] Color ramp along axis (hot near nozzle → cooler far).
- [ ] Add flicker via noise scrolling along axis.

### 7.5 Heat distortion (stretch) – 💡 SHADER · 🧮 MATH · 🧵 PAR

- [ ] Offset UVs inside plume mask with smooth noise.
- [ ] Keep distortion small; avoid artifacts.

**Study 03 v1 Milestone**
- [ ] Plume aligns with `uPlumeAngle`
- [ ] Width/length feel right for the shot
- [ ] Flicker and banding are intentional and subtle
- [ ] Optional distortion is smooth and plausible
- [ ] Save “Study 03 v1” (commit + screenshot + parameter notes)

---

## 8. Suggested Practice Loop – 🧱 ENG · 🧵 PAR

To really own Phase 2:

- [ ] For each new concept, build a **tiny debug shader** that shows it in isolation.
- [ ] Port the concept into the relevant Study (01/02/03).
- [ ] Save a versioned screenshot or commit (e.g. `study02_v1`, `study03_v1`).
- [ ] Change ≤ 2 parameters per run; write down what happened.
- [ ] Keep asking: “Does each pixel have all the inputs it needs locally?” If yes, you’re designing in a GPU-friendly way.

The point isn’t racing through tasks. It’s moving in **small steps** with **constant visual feedback**, always tying abstract concepts back to one of your **three shots**—and always staying faithful to the spec.
