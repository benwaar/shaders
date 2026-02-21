# Glossary — 2D GLSL Shader Terms

## Table of Contents
- [Aliasing](#aliasing)
- [Ambient](#ambient)
- [Aspect Ratio](#aspect-ratio)
- [Bump Mapping](#bump-mapping)
- [Clamp](#clamp)
- [Composition](#composition)
- [Coordinate Transform](#coordinate-transform)
- [Diffuse](#diffuse)
- [Displacement Mapping](#displacement-mapping)
- [Domain](#domain)
- [Domain Warping](#domain-warping)
- [Dot Product](#dot-product)
- [Fragment Shader](#fragment-shader)
- [Fract](#fract)
- [Frequency](#frequency)
- [GLSL](#glsl)
- [Loopable Animation](#loopable-animation)
- [Mask](#mask)
- [Mix](#mix)
- [Modulation](#modulation)
- [Noise](#noise)
- [Normal](#normal)
- [Normal Map](#normal-map)
- [Parallax](#parallax)
- [Polar Coordinates](#polar-coordinates)
- [Repetition (Tiling)](#repetition-tiling)
- [Signed Distance Function (SDF)](#signed-distance-function-sdf)
- [Smooth Union](#smooth-union)
- [Smoothstep](#smoothstep)
- [Specular](#specular)
- [Symmetry](#symmetry)
- [Texture Sampling](#texture-sampling)
- [Time Uniform](#time-uniform)
- [UV Coordinates](#uv-coordinates)
- [Value Visualization](#value-visualization)
- [Varying](#varying)
- [VFX](#vfx)
- [Vertex Shader](#vertex-shader)
- [View Direction](#view-direction)

---
## Aliasing
Visual artifacts caused by insufficient sampling resolution.

Common in:
- High-frequency patterns
- Sharp edges
- Thin lines

Often mitigated using smoothing techniques like `smoothstep`.

---

## Ambient
A base lighting term in 3D rendering representing indirect environmental light.  
In 2D shaders, this is usually irrelevant because sprite textures already contain baked shading.

---

## Aspect Ratio
The ratio of width to height of the viewport.

Often requires correcting UV coordinates:

```glsl
uv.x *= resolution.x / resolution.y;
```

Prevents distortion when rendering on non-square screens.

---

## Bump Mapping
A technique that simulates surface detail using a grayscale height map.  
It alters lighting calculations but does not change geometry.  
Rare in 2D — normal mapping is preferred.

---

## Clamp
A function that restricts a value to a specified range.

```glsl
clamp(value, minValue, maxValue);
```

Commonly used to prevent color overflow or limit effect strength.

---

## Composition
The arrangement and layering of visual elements within a shader.

Includes:
- Shape placement
- Balance
- Symmetry
- Contrast
- Layer blending

Strong shaders rely on intentional composition, not just mathematical complexity.

---

## Coordinate Transform
Modifying the input space before evaluating a function.

Examples:
- Scaling
- Rotating
- Translating
- Converting to polar coordinates

Most shader effects are created by transforming space rather than modifying color directly.

---

## Diffuse
In 3D lighting, the base surface color affected by light direction.  
In 2D, this usually just means the sprite’s texture color.

---

## Displacement Mapping
A technique that moves actual geometry based on a height map.  
Not meaningful for most 2D sprites (which are usually just 4 vertices).  
In 2D, displacement is typically faked by modifying UV coordinates.

---

## Domain
The input space of a function.

In shaders, the domain is usually UV space.

Changing the domain changes the resulting pattern.

---

## Domain Warping
Distorting input coordinates before evaluating a function.

Instead of modifying color directly, you modify space:

```glsl
uv += noise(uv * 2.0) * 0.1;
```

Creates organic motion, turbulence, and flowing distortion.

---

## Dot Product
A mathematical operation that measures how aligned two vectors are.

```glsl
float d = dot(a, b);
```

Used in lighting to determine how directly light hits a surface.

---

## Fragment Shader
A shader that runs once per pixel.  
In 2D development, this is where most visual effects are implemented.

---

## Fract
Returns the fractional part of a number.

```glsl
fract(x);
```

Commonly used for tiling and repetition in UV space.

---

## Frequency
How rapidly a pattern changes across space.

High frequency → fine detail  
Low frequency → broad shapes  

Usually controlled by scaling UV coordinates.

---

## GLSL
OpenGL Shading Language.  
The programming language used to write shaders.

---

## Loopable Animation
An animation that returns to its starting state after a fixed duration.

Often achieved using periodic functions:

```glsl
float t = sin(time);
```

Important for seamless shader loops (e.g., 4s cycle).

---

## Mask
A texture or value used to control where an effect applies.  
Often uses a single channel (like `.r`) to multiply or blend effects.

---

## Mix
Linearly interpolates between two values.

```glsl
mix(a, b, t);
```

Equivalent to: `a * (1.0 - t) + b * t`

Extremely common for blending colors and effects.

---

## Modulation
Using one value to influence another.

Examples:
- Time modulating position
- Noise modulating color
- Distance modulating brightness

Animation is controlled modulation.

---

## Noise
Procedural randomness used to generate organic-looking effects.  
Commonly used for fire, smoke, dissolve effects, and distortion.

---

## Normal
A direction vector pointing outward from a surface.  
Used in lighting calculations.

In 2D shaders, normals are typically read from a normal map.

---

## Normal Map
A texture that stores surface direction data in RGB channels.

- R → X direction  
- G → Y direction  
- B → Z direction  

Used to fake 3D lighting on flat sprites.

Typical conversion:

```glsl
vec3 normal = texture(u_normalMap, uv).rgb;
normal = normal * 2.0 - 1.0;
```

---

## Parallax
A technique that fakes depth by shifting texture coordinates based on viewing angle.  
Rare in pure 2D, but sometimes used for layered background effects.

---

## Polar Coordinates
A coordinate system based on angle and radius instead of x/y.

Used for:
- Radial gradients
- Spirals
- Kaleidoscopes
- Circular distortions

---

## Repetition (Tiling)
Repeating a pattern across space.

Common technique:

```glsl
uv = fract(uv);
```

Creates infinite tiling effects.

---

## Signed Distance Function (SDF)
A function that returns the shortest distance from a point to a surface.

Negative → inside  
Positive → outside  
Zero → edge  

Foundation of procedural shape construction.

---

## Smooth Union
A technique for blending two SDF shapes smoothly instead of sharply.

Creates organic merging forms instead of hard intersections.

---

## Smoothstep
A function that smoothly interpolates between two values.

```glsl
smoothstep(edge0, edge1, x);
```

Very useful for soft transitions, fades, glows, and masks.

---

## Specular
In 3D lighting, the shiny highlight on a surface.  
In 2D, usually stylized or faked, and only needed for dynamic lighting systems.

---

## Symmetry
Mirroring space across an axis to duplicate structure.

```glsl
uv.x = abs(uv.x);
```

Common in kaleidoscopic and mandala-style patterns.

---

## Texture Sampling
Reading data from a texture using UV coordinates.

```glsl
vec4 color = texture(u_texture, uv);
```

The foundation of most 2D shaders.

---

## Time Uniform
A continuously increasing value passed into the shader to drive animation.

```glsl
uniform float time;
```

Often shaped using `sin`, `cos`, or `smoothstep` to create loops.

---

## UV Coordinates
Normalized texture coordinates ranging from 0.0 to 1.0.  
Used to sample textures and manipulate distortion effects.

---

## Value Visualization
A debugging technique where intermediate values are output directly as color.

```glsl
gl_FragColor = vec4(vec3(distance), 1.0);
```

Essential for understanding procedural behavior.

---

## Varying
A value passed from the vertex shader to the fragment shader.  
Commonly used to pass UV coordinates.

---

## VFX
Visual Effects - Digital visual manipulation like Fire, Smoke, Glitch effects, Lighting, Post-processing, Distortion, Stylized rendering

---

## Vertex Shader
A shader that runs once per vertex.  
In most 2D sprite systems, this is simple or fixed, unless doing custom deformation.

---

## View Direction
The direction from a surface toward the camera.  
Important in 3D lighting, rarely needed in 2D shaders.

---
