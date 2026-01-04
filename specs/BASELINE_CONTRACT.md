---
spec_type: baseline_contract
spec_name: BASELINE_SHADER_CONTRACT
spec_version: 1.0
spec_status: LOCKED

applies_to:
  - all_stage_1_shaders

target_environment:
  api: WebGL2
  language: GLSL_ES_300
---

# Baseline Shader Contract (Player + Build Pipeline)

**Status:** LOCKED  
**Applies to:** All Stage 1 shaders unless explicitly overridden in the shader spec.

## Target Environment
- **Graphics API:** WebGL2
- **Shader language:** GLSL ES 3.00
- Fragment shaders must compile under `#version 300 es`.

## Required Interface (Fragment)
All fragment shaders must declare:

- `uniform sampler2D uTexture;`
- `in vec2 vTexCoord;`  
  Meaning: normalized UV in [0,1] across the source texture.
- `out vec4 fragColor;`

## Include Support

The build pipeline resolves include directives before compilation.

Supported form:
- `#include "common.glslinc"`

Resolution rules:
- Includes are resolved relative to the `shaders/` directory
- Nested includes are permitted up to a fixed depth (e.g. 8)
- Cycles are an error
- The resulting expanded GLSL must still compile under GLSL ES 3.00

## Color & Sampling Assumptions
- `texture(uTexture, vTexCoord)` returns the source in the player’s current sampling mode.
- Unless stated otherwise by a shader spec, shaders treat sampled color as **as-provided** (no implicit gamma transforms).

## Neutral Default Rule
Shaders must produce a neutral output at default parameters as specified by each shader.
For passthrough, neutral means: `fragColor == texture(uTexture, vTexCoord)`.

## Forbidden Hidden Inputs
Shaders may not depend on undeclared uniforms, textures, or defines beyond this contract.

## Overrides
A shader spec may override parts of this contract only by stating:
- what is overridden
- why
- how verification changes
