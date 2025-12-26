# Shader Spec — Passthrough (Baseline)

## 1. Objective

Render the input image unchanged to the output.

---

## 2. Intent

The viewer should see the source image exactly as provided, with no visual modification.

The effect must:
- preserve all colors exactly
- preserve all geometry and layout
- introduce no spatial variation
- introduce no temporal variation

This shader exists only to validate the rendering pipeline.

---

## 3. Inputs

### Required source image (player-provided)
- Type: sampler2D
- Default: provided by the player
- Notes: The shader samples the source texture at the given texture coordinates.

### Required texture coordinates (player-provided)
- Type: vec2 (varying)
- Default: provided by the vertex shader
- Notes: Must map directly to the source image without transformation.

---

## 4. Constraints

### Platform
- Target: WebGL2 / GLSL ES 3.00

### Performance
- Max texture samples: 1
- Loops: none
- Branching: none

### Precision
- Default precision is acceptable

---

## 5. Non-Goals

- Does not modify color values
- Does not apply tint, brightness, or contrast
- Does not apply spatial effects
- Does not apply noise or grain
- Does not use time
- Does not animate

---

## 6. Acceptance Criteria (Pass/Fail)

1. **Exact passthrough**: Output pixels must match input pixels exactly.
2. **Frame stability**: Output must be identical across frames for a static input.
3. **No artifacts**: No banding, distortion, or color shifts are introduced.
4. **Pipeline validation**: If this shader fails, the issue is considered a pipeline or integration error, not a visual logic error.

---

## 7. Spec Status

**Spec Status:** DRAFT
