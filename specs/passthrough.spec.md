---
spec_type: shader
spec_name: passthrough
spec_version: 1.0
spec_status: DRAFT

conforms_to:
  - BASELINE_SHADER_CONTRACT@v1
---

# Shader Spec — Passthrough (Baseline)

## 1. Objective

Render the input image unchanged to the output.

---

## 2. Intent

The viewer should see the source image exactly as provided, with no visual modification.

This shader exists solely to validate the rendering pipeline and baseline contract.

The effect must:
- preserve all color values exactly
- preserve all geometry and layout
- introduce no spatial variation
- introduce no temporal variation

---

## 3. Inputs

All inputs are provided by the player according to
**BASELINE_SHADER_CONTRACT@v1**.

### Source texture
- Name: `uTexture`
- Type: `sampler2D`
- Default: provided by the player
- Notes: Sampled exactly once at the provided texture coordinates.

### Texture coordinates
- Name: `vTexCoord`
- Type: `vec2` (varying)
- Default: provided by the vertex shader
- Notes: Normalized coordinates in the range `[0, 1]`, mapping directly to the source image.

---

## 4. Constraints

### Platform
- WebGL2
- GLSL ES 3.00

### Performance
- Texture samples: exactly 1
- Loops: none
- Branching: none

### Precision
- Default precision as defined by the baseline contract is sufficient.

---

## 5. Non-Goals

This shader intentionally does **not**:

- modify color values
- apply tint, brightness, or contrast
- apply spatial effects
- apply noise or grain
- use time
- animate

---

## 6. Acceptance Criteria (Pass / Fail)

1. **Exact passthrough**  
   For all pixels:  
   `fragColor == texture(uTexture, vTexCoord)`

2. **Frame stability**  
   For a static input, output must be identical across frames.

3. **No artifacts**  
   No banding, distortion, filtering artifacts, or color shifts are introduced.

4. **Pipeline validation rule**  
   If this shader fails any acceptance check, the failure is classified as a  
   **pipeline or integration defect**, not a shader logic defect.

---

## 7. Spec Status

**Spec Status:** DRAFT
