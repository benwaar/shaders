## Consider Light Constraints (use selectively)
- One visual idea per sketch
- ≤ 2 noise calls per pass 
 — noise functions (Perlin, Simplex, fbm) are computationally expensive because they involve multiple random number generations and interpolations per pixel. Calling noise 3+ times per frame × millions of pixels = performance hit. This constraint forces You to compose limited noise cleverly (e.g., use one noise call, then warp/scale it) rather than stacking many layers. It also keeps your learning focused: master layering two noises well before reaching for more complex techniques.
- Neutral/off state exists 
 — your shader should look good with controls at default values (e.g., strength=0)
- Loopable in a fixed duration (e.g. 4s)
- Works at multiple aspect ratios