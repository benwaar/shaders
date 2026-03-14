# Shader Fundamentals

? use applicable light constraints

- Gradients (linear, radial, cosine palettes)
- Coordinate transforms (scale, rotate, polar)
- UV manipulation basics
- Debugging workflow (visualize intermediate values, color channels)

## **2-3 sketches per primitive** — quick experiments to understand behavior

## **Document learnings** — note surprising behaviors, useful patterns, gotchas

## **Milestone**: Animated gradient using 2+ coordinate transforms

--


## Shader Debugging Workflow Notes

Core Idea
Debugging shaders means making invisible values visible.
Instead of printing values, visualize them using color.

Process:
1. Output intermediate values directly
2. Check value ranges
3. Inspect transforms step-by-step
4. Rebuild the shader once each stage is verified

---

1. Visualize Intermediate Values

float v = ...;
gl_FragColor = vec4(vec3(v), 1.0);

Clamp if needed:

gl_FragColor = vec4(vec3(clamp(v,0.0,1.0)),1.0);

For values in -1..1:

float debug = v * 0.5 + 0.5;
gl_FragColor = vec4(vec3(debug),1.0);

---

2. Inspect Channels Separately

gl_FragColor = vec4(xValue, yValue, maskValue, 1.0);

Example UV debug:

gl_FragColor = vec4(uv,0.0,1.0);

Expected:
Red increases left → right
Green increases bottom → top

---

3. Debug One Transform At A Time

vec2 uv = fragCoord / iResolution.xy;
vec2 p = uv - 0.5;
p.x *= iResolution.x / iResolution.y;

Inspect:
raw uv
centered uv
aspect corrected coordinates
rotated or scaled coordinates

---

4. False Color Debugging

float v = ...;
vec3 color = vec3(v, 0.5 + 0.5*sin(v*6.2831), 1.0 - v);
gl_FragColor = vec4(color,1.0);

Useful for noise, smoothstep transitions, repeating patterns.

---

5. Debug Masks Separately

float d = length(p);
float mask = smoothstep(0.3,0.29,d);

Inspect d first, then inspect mask.

---

6. Freeze Time

float a = sin(iTime);

Test instead:

float a = 0.25;

Then reintroduce animation.

---

7. Binary Search Complex Shaders

If something breaks:
comment out half the shader
test
repeat until the faulty section is found

---

8. Debug Snippet Toolkit

vec4(vec3(v),1.0);
vec4(vec3(clamp(v,0.0,1.0)),1.0);
vec4(uv,0.0,1.0);
vec4(p*0.5+0.5,0.0,1.0);
vec4(a,b,c,1.0);

---

Common Shader Bugs

missing aspect correction
wrong value range (-1..1 vs 0..1)
thresholds reversed
animating before static version works
stacking too many transforms without debugging each step

---

Debugging Mindset

Most shader bugs come from:
incorrect coordinate space
wrong value range
incorrect thresholds
incorrect transform order

Make each stage visible.
Trust images more than assumptions.

---

### Debug Exercise 1 - Rotation 

- Rotation teaches coordinate debugging
- Inspect every coordinate space
- Visualizing coordinate spaces

### Debug Exercise 2 - Clamping

- Clamping teaches range debugging

### Debug Exercise 3 - Distortion

- Distortion teaches animated debugging