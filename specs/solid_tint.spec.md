# Shader Spec — Solid Tint

## 1. Objective

Apply a uniform color tint to the entire input image with a controllable strength, while preserving geometry and readability.

## 2. Intent

The viewer should perceive a consistent, global color cast applied over the existing image, as if a transparent colored filter were placed on top.

The effect must:
- be spatially uniform (no gradients, no edge emphasis)
- preserve the underlying image structure (no distortion, blur, or noise)
- be predictable and monotonic: increasing strength increases the tint effect smoothly

At default values, the effect should be neutral (no visible change).

---

## 3. Inputs

> All inputs must have ranges and defaults. No hidden constants.

### `uTint`
- Type: vec3
- Range: 0.0 – 1.0 per channel
- Default: (1.0, 1.0, 1.0)
- Notes: The tint color. (1,1,1) means “no tint”.

### `uStrength`
- Type: float
- Range: 0.0 – 1.0
- Default: 0.0
- Notes: 0 = no effect, 1 = full tint application.

### Required source image (player-provided)
- Type: sampler2D
- Default: provided by the player
- Notes: This shader assumes it is processing an existing image/scene/ui surface.

*(If your player uses different uniform names, map these semantics to whatever it expects. The spec semantics are the contract.)*

---

## 4. Constraints

### Platform
- Target: WebGL2 / GLSL ES 3.00

### Performance
- Max texture samples: 1
- Loops: none
- Branching: none required

### Precision
- Default precision is acceptable (no special requirements)

---

## 5. Non-Goals

- Does not perform brightness/contrast adjustment
- Does not apply spatial effects (vignette, gradient, distortion)
- Does not apply blur or sharpen
- Does not apply grain/noise
- Does not use time or animation
- Does not do color grading curves/LUTs or gamma correction (unless the player requires it explicitly)

---

## 6. Acceptance Criteria (Pass/Fail)

1. **Neutral default**: With `uStrength = 0.0`, output must match input (no visible change).
2. **Neutral tint**: With `uTint = (1,1,1)`, output must match input for any `uStrength`.
3. **Monotonic strength**: Increasing `uStrength` increases tint influence smoothly and predictably (no jumps).
4. **No spatial artifacts**: The tint is uniform across the frame (no banding, gradients, or positional dependence attributable to the tint logic).

---

## 7. Spec Status

**Spec Status:** DRAFT
