---
spec_type: shader
spec_name: solid_tint
spec_version: 1.0
spec_status: DRAFT

conforms_to:
  - BASELINE_SHADER_CONTRACT@v1
---

# Shader Spec — Solid Tint

## 1. Objective

Apply a uniform color tint to the entire input image with a controllable strength,
while preserving geometry and readability.

---

## 2. Intent

The viewer should perceive a consistent, global color cast applied over the existing image,
as if a transparent colored filter were placed on top.

The effect must:
- be spatially uniform (no gradients, no edge emphasis)
- preserve the underlying image structure (no distortion, blur, or noise)
- be predictable and monotonic: increasing strength increases the tint effect smoothly
- be neutral at defaults (no visible change)

---

## 3. Inputs

All inputs are in addition to the baseline contract inputs (`uTexture`, `vTexCoord`, `fragColor`).

### `uTint`
- Type: `vec3`
- Range: `0.0 – 1.0` per channel
- Default: `(1.0, 1.0, 1.0)`
- Meaning: Tint color. `(1,1,1)` is neutral.

### `uStrength`
- Type: `float`
- Range: `0.0 – 1.0`
- Default: `0.0`
- Meaning: Tint strength. `0.0` is neutral, `1.0` is full tint.

---

## 4. Derived Plan (IR)

### Logical Plan
1. Sample source color: `src = texture(uTexture, vTexCoord)`
2. Compute tint target color: `tgt = vec4(src.rgb * uTint, src.a)`
3. Mix by strength: `out = mix(src, tgt, saturate(uStrength))`
4. Write output: `fragColor = out`

### Physical Plan
- Texture samples: 1
- ALU: low (mul + mix + clamp)
- Branching: none
- Coordinate assumptions: those defined by `BASELINE_SHADER_CONTRACT@v1`

### Allowed Rewrites (Spec-Preserving)
- Clamp merge: `mix(src, tgt, clamp(uStrength,0,1))` may be replaced by equivalent saturate helper
- Sample reuse: reuse `src` for all computations
- Constant folding when `uStrength` is a compile-time constant (rare)

---

## 5. Constraints

### Platform
- WebGL2
- GLSL ES 3.00

### Performance
- Texture samples: exactly 1
- Loops: none
- Branching: none required

### Precision
- Default precision as defined by the baseline contract is sufficient.

---

## 6. Non-Goals

This shader intentionally does **not**:
- perform brightness/contrast adjustment
- apply spatial effects (vignette, gradient, distortion)
- apply blur or sharpen
- apply grain/noise
- use time or animation
- perform color grading curves/LUTs or gamma conversion

---

## 7. Acceptance Criteria (Pass / Fail)

1. **Neutral default**  
   With `uStrength = 0.0`, output must match input:  
   `fragColor == texture(uTexture, vTexCoord)` (within the baseline pipeline’s equivalence rules).

2. **Neutral tint**  
   With `uTint = (1,1,1)`, output must match input for any `uStrength`.

3. **Monotonic strength**  
   Increasing `uStrength` increases the influence of the tint continuously and predictably.
   No discontinuities or non-monotonic response are permitted.

4. **Uniformity**  
   The tint must be spatially uniform. No gradients, banding, or positional dependence
   attributable to tint logic.

5. **Alpha preservation**  
   Output alpha must equal source alpha for all inputs.

---

## 8. Spec Status

**Spec Status:** DRAFT
