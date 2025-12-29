# Phase 1 — GPU & Shader Basics (for Non-Graphics Programmers)

**Goal:** understand just enough GPU and shader basics to be comfortable with the rest of this study.

This phase is for someone who can code, but has **never done graphics before**.  
If you already know OpenGL/WebGL concepts, you can skim this.

No GLSL tricks. No math dives. Just the mental model.

---

## 0.1 What a Shader Actually Is

A **shader** is just a small program that runs on the **GPU**.

In this study we care about two kinds:

- **Vertex shader** — runs once per vertex
- **Fragment shader** — runs once per pixel (fragment) on the screen

You can think of them as:

- Vertex shader → “Where is this thing on the screen?”  
- Fragment shader → “What color is this pixel?”

Everything else is details.

---

## 0.2 The Minimal GPU Pipeline We Use Here

In our player, the pipeline is:

1. We create a **fullscreen quad** (two triangles that cover the whole screen).  
2. The **vertex shader** decides where each corner of those triangles goes on the screen and what UV it gets.  
3. The **fragment shader** runs once for each pixel inside those triangles and decides the final color.

We are not drawing models, meshes, or 3D scenes.  
We are just drawing a big rectangle that fills the view.

That’s enough for “post-processing style” shaders (tint, grain, vignette, etc.).

---

## 0.3 What Is a Vertex?

A **vertex** is just a point with some attached data.

In our case, each vertex has:

- a **position** (on screen, or in clip space)
- a **UV coordinate** (where to sample the texture from)

Example (two floats for position):

```glsl
in vec2 a_position;  // position, like (-1.0, -1.0)
in vec2 a_texCoord;  // UV, like (0.0, 0.0)
```

Nothing magical: it’s just a little struct of numbers.

The GPU will:

- run the vertex shader once for each vertex
- connect them into triangles
- then run the fragment shader for all pixels covered by those triangles

---

## 0.4 What Does “Fullscreen Quad” Mean?

To shade an entire image, we draw **two triangles** that cover the whole screen.

Those triangles are defined by 6 vertices (3 per triangle).  
We supply positions like:

```text
(-1, -1), ( 1, -1), (-1,  1),
(-1,  1), ( 1, -1), ( 1,  1)
```

In **clip space**:
- X = -1 is the left edge
- X =  1 is the right edge
- Y = -1 is the bottom
- Y =  1 is the top

If all your triangles cover the whole `[-1..1] x [-1..1]` area, then your fragment shader will run once per pixel on the whole screen (or canvas).

That’s all “fullscreen quad” means:  
> *Two triangles, arranged to cover the entire clip-space square.*

---

## 0.5 Clip Space vs UV Space

There are two important 2D spaces you will see over and over:

### Clip Space (vertex shader output)

- Range is typically **[-1 .. 1]** in both X and Y
- `(-1, -1)` → bottom-left of the screen
- `( 1,  1)` → top-right of the screen
- This is where `gl_Position` lives:

```glsl
gl_Position = vec4(a_position, 0.0, 1.0);
```

The GPU will handle converting from clip space to actual pixels.

### UV Space (texture coordinates)

- Range is **[0 .. 1]** in both U and V (x and y for the texture)
- `(0, 0)` → bottom-left of the texture
- `(1, 1)` → top-right of the texture

UVs tell the fragment shader **where to sample from** in the texture:

```glsl
vec4 src = texture(uTexture, v_texCoord);
```

You can think of them as **percentages across the image**.

---

## 0.6 Passing Data from Vertex → Fragment

The vertex shader **outputs** some values that the fragment shader **receives**, using “varyings”.

In GLSL ES 3.00 (WebGL2), that looks like:

**Vertex shader:**
```glsl
out vec2 v_texCoord;

void main() {
    v_texCoord = a_texCoord;                 // pass through
    gl_Position = vec4(a_position, 0.0, 1.0);
}
```

**Fragment shader:**
```glsl
in vec2 v_texCoord;

void main() {
    vec4 src = texture(uTexture, v_texCoord);
    // ...
}
```

The important rule:

> The `out` in the vertex shader must **match** the `in` in the fragment shader (same name, same type).

If they don’t match, the program will fail to link and you’ll see errors like:

> “FRAGMENT varying vTexCoord does not match any VERTEX varying”

Our convention in this project:

- Vertex shader uses `out vec2 v_texCoord;`
- Fragment shader uses `in vec2 v_texCoord;`

Stick to that unless the spec says otherwise.

---

## 0.7 Uniforms vs Attributes (Inputs vs Per-Vertex)

There are two main kinds of inputs to your shaders:

### Attributes (per-vertex)
- Declared as `in` in the **vertex shader**
- Different for each vertex
- Example: `a_position`, `a_texCoord`

### Uniforms (global)
- Declared as `uniform` in either shader
- Same for all vertices/fragments for a draw call
- Set by the CPU / JavaScript side
- Examples in this project:
  - `uniform sampler2D uTexture;`
  - `uniform vec3 uTint;`
  - `uniform float uStrength;`

Attributes come from the mesh (our fullscreen quad).  
Uniforms come from your **spec and host code**.

---

## 0.8 The Minimal Vertex Shader in This Project

For Phase 0 and Phase 2, you can think of the vertex shader as “just set the position and pass UVs through”.

For example, a simple pass-through vertex shader:

```glsl
#version 300 es

in vec2 a_position;   // clip-space position [-1..1]
in vec2 a_texCoord;   // UV [0..1]

out vec2 v_texCoord;

void main() {
    v_texCoord = a_texCoord;                 // no transformation
    gl_Position = vec4(a_position, 0.0, 1.0);
}
```

As long as:
- `a_position` is wired to the fullscreen quad positions, and
- `a_texCoord` is wired to the UVs,

…the fragment shader will see the right UV for each pixel.

In your minimal player, you might also use an even simpler vertex shader that infers UVs from position. That’s fine, **as long as the spec is clear** about what the fragment shader expects.

---

## 0.9 What We Actually Use in Phase 0

For Phase 0, we keep things ultra-simple:

- **Geometry:** a fullscreen quad (two triangles)
- **Vertex shader:** pass through position/UV or derive UV from position
- **Fragment shader:** simple operations like “just show the image” (passthrough)

We treat this as the **“hello world” of the pipeline**.

Example fragment (passthrough):

```glsl
#version 300 es
precision mediump float;

uniform sampler2D uTexture;
in vec2 v_texCoord;
out vec4 fragColor;

void main() {
    fragColor = texture(uTexture, v_texCoord);
}
```

This just draws the input texture with no changes.

---

## 0.10 Phase 0 Checks (You Can Tick These Off)

Before moving on from Phase 0, you should be able to say “yes” to:

- [ ] I can explain, in my own words, the difference between a **vertex shader** and a **fragment shader**.
- [ ] I know what a **fullscreen quad** is and why we use it for post-processing.
- [ ] I understand the difference between **clip space** ([-1..1]) and **UV space** ([0..1]).
- [ ] I know what a **varying** (`out` in vertex, `in` in fragment) is and why the names/types must match.
- [ ] I can point at the code that sets **uniforms** from the CPU side.
- [ ] I can run a **passthrough shader** that simply shows the input image.
- [ ] I can read a simple shader and tell which parts are “just GPU plumbing” and which parts are “the actual effect”.

If you can comfortably check these off, you have enough mental model to:

- write and reason about the **Solid Tint** shader
- understand specs that talk about UVs, clip space, and uniforms
- debug common “it’s black” or “nothing shows up” issues

After that, Phase 1 (spec writing) and Phase 2 (simple effects) will feel much less mysterious.

---

## Resources — Companion Videos (Phase 0)

These videos support the **GPU + shader mental model** for non-graphics programmers.
They are not tied to any specific engine; think of them as “orientation” before the study.

- **A 10-Minute Guide to Shaders**  
  https://www.youtube.com/watch?v=QukauoN21EU  
  High-level intro to what shaders are and why they run on the GPU.

- **WebGL, Shaders, Vertex Shader, Fragment Shader, GLSL ES**  
  https://www.youtube.com/watch?v=6AHpdQCrf_Q  
  Brief overview of the graphics pipeline and how vertex/fragment shaders fit into it.

- **What Is a Shader? | Pixel and Vertex Shaders**  
  https://www.youtube.com/watch?v=TDZMSozKZ20  
  Explains the roles of vertex and fragment (pixel) shaders in the rendering pipeline.

- **OpenGL – Clip Space, NDC, and Screen Space**  
  https://www.youtube.com/watch?v=pThw0S8MR7w  
  Helps build intuition for clip space vs screen space, which underpins the fullscreen quad idea.

These are optional; watch selectively and revisit as needed. The goal is to make terms like
“vertex shader”, “fragment shader”, “clip space”, and “UVs” feel familiar, not scary.
