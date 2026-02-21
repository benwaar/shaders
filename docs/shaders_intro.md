# Intro to Textures, Lighting Terms, and Surface Effects

*(For 2D GLSL Shader Development)*

[See the Glossary](shaders_glossary.md)

## Table of Contents
- [1. What a Shader Is in 2D](#1-what-a-shader-is-in-2d)
- [2. Diffuse, Specular, Ambient](#2-diffuse-specular-ambient-what-they-mean-for-you)
- [3. Normals and Normal Maps](#3-normals-and-normal-maps-important-for-2d-lighting)
- [4. Bump Mapping vs Normal Mapping](#4-bump-mapping-vs-normal-mapping)
- [5. Displacement Mapping](#5-displacement-mapping)
- [6. What Actually Matters Most for 2D Shaders](#6-what-actually-matters-most-for-2d-shaders)
- [Mental Model Shift](#mental-model-shift)
- [Practical Focus for 2D GLSL](#practical-focus-for-2d-glsl)

------------------------------------------------------------------------

## 1. What a Shader Is in 2D

In most 2D engines, you are writing **fragment shaders** applied to
textured quads (sprites).

Your main inputs are typically:

``` glsl
uniform sampler2D u_texture;
varying vec2 v_uv;

vec4 color = texture(u_texture, v_uv);
```

Most 2D shader work is about manipulating:

-   UV coordinates\
-   Sampled texture color\
-   Time\
-   Additional mask or noise textures

You are usually not building a full 3D lighting pipeline --- you are
doing controlled math on color and UVs.

------------------------------------------------------------------------

## 2. Diffuse, Specular, Ambient (What They Mean for You)

These terms come from 3D lighting models.

### Diffuse

In 3D: - Base surface color affected by light direction.

In 2D: - Usually just your sprite texture. - Already contains baked
shading.

For you: **Diffuse = your main texture color.**

------------------------------------------------------------------------

### Specular

In 3D: - Shiny highlights. - Depends on view direction and reflection
vectors.

In 2D: - Optional. - Often faked using: - Masks - Brightness boosts -
Sweep highlights - Stylized shine effects

Only relevant if you're building a dynamic lighting system.

------------------------------------------------------------------------

### Ambient

In 3D: - Base environmental light term.

In 2D: - Typically irrelevant. - Your sprite texture already contains
shading.

------------------------------------------------------------------------

## 3. Normals and Normal Maps (Important for 2D Lighting)

A **normal** is a direction pointing outward from a surface.

In 3D, normals determine how light interacts with a surface.

In 2D, you can fake 3D lighting on flat sprites using **normal maps**.

A normal map stores direction data in RGB:

-   R → X
-   G → Y
-   B → Z

In GLSL:

``` glsl
vec3 normal = texture(u_normalMap, v_uv).rgb;
normal = normal * 2.0 - 1.0;
```

Then you can compute lighting:

``` glsl
float light = dot(normal, lightDir);
color.rgb *= light;
```

This allows: - Dynamic lights in 2D - Volumetric-looking sprites -
Moving light sources

Normal maps are **very relevant** for modern 2D engines.

------------------------------------------------------------------------

## 4. Bump Mapping vs Normal Mapping

### Bump Mapping

-   Uses grayscale height maps.
-   Derives surface variation from brightness differences.
-   Older and less accurate.

Rare in 2D.

### Normal Mapping

-   Stores surface direction directly.
-   Higher quality.
-   More common.

For 2D lighting systems: **Use normal maps.**

------------------------------------------------------------------------

## 5. Displacement Mapping

In 3D: - Actually moves geometry. - Requires detailed meshes.

In 2D: - Sprites usually only have 4 vertices. - True displacement is
not meaningful.

Instead, you fake displacement by modifying UVs:

``` glsl
uv += noise * strength;
```

This is distortion --- not real displacement.

------------------------------------------------------------------------

## 6. What Actually Matters Most for 2D Shaders

Focus your energy on:

### 1. UV Manipulation

-   Waves
-   Heat shimmer
-   Water
-   Glitch distortion

Example:

``` glsl
uv.y += sin(uv.x * 10.0 + time) * 0.02;
```

------------------------------------------------------------------------

### 2. Masking

``` glsl
float mask = texture(u_mask, uv).r;
color.rgb *= mask;
```

Used for: - Dissolves - Outlines - Damage effects - Transitions

------------------------------------------------------------------------

### 3. Noise

Critical for: - Fire - Smoke - Energy effects - Procedural textures -
Stylized animation

------------------------------------------------------------------------

### 4. Color Math

You will heavily use:

-   `mix()`
-   `smoothstep()`
-   `step()`
-   `clamp()`
-   `pow()`

Often more important than full lighting models.

------------------------------------------------------------------------

## Mental Model Shift

Most classic material terms come from 3D rendering and physically based
lighting.

In 2D shader programming, you are usually:

> Manipulating UVs and color in interesting ways.

Not:

> Simulating physically accurate light.

Unless you are explicitly building a dynamic 2D lighting system.

------------------------------------------------------------------------

## Practical Focus for 2D GLSL

Master:

-   Texture sampling
-   UV math
-   Noise functions
-   Time-based animation
-   Masking
-   Blend modes
-   Normal maps (if doing lighting)

You can safely treat:

-   Displacement mapping → mostly irrelevant\
-   True bump mapping → mostly irrelevant\
-   Full PBR models → optional

