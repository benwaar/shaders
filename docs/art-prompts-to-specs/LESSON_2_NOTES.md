# Lesson: Style Eras = Different Worlds, Same Subject

Context: Phase 2 – Exercise 1 (’70s Retro, Bauhaus, Y2K cassowary)

- Keeping **SUBJECT + COMPOSITION** fixed (cassowary, centered mid-shot) but changing only STYLE-era:
  - **’70s retro** → rounded, chunky shapes, warm sun-faded palette, halftone + mild distress.
  - **Bauhaus** → strict geometry, flat primaries, minimal ornament, almost no texture.
  - **Y2K** → beveled/tech forms, neon palette, glow and HUD overlays, sci-fi energy.

- Result:
  - Same bird, same pose, same framing → feels like **three totally different universes**.
  - STYLE-era choice alone implies:
    - **Time period** (vintage vs modernist vs early-digital).
    - **Medium** (screenprint vs flat graphic vs glossy digital).
    - **Audience/mood** (poster nostalgia vs design school vs techno-fantasy).

- Practical takeaway:
  - **STYLE is a “world filter”** on top of a stable subject.
  - Decide era/genre early; treat it as a reusable “skin” you can wrap around many subjects.
  - You can build a cohesive series by holding SUBJECT + COMPOSITION constant and cycling only STYLE-era.

---

# Lesson: Texture % = How Old This Object Feels (Not a New Design)

Context: Phase 2 – Exercise 2 (Bauhaus cassowary at 10% vs 40% wear)

- With **COMPOSITION, SUBJECT, STYLE, COLOR, MOOD** locked to a Bauhaus poster:
  - **10% wear** → almost clean print, tiny edge specks, light paper grain.
  - **40% wear** → obvious chips, creases, ink breaks, heavy distress over flats.

- What changed:
  - The cassowary design/silhouette did **not** change.
  - The **type of object** changed:
    - 10% → “recently printed, slightly handled poster”.
    - 40% → “old, well-travelled, maybe found in an alley or archive”.

- Practical takeaway:
  - **TEXTURE % = object age and condition**, not new concept art.
  - Keep TEXTURE as a **late-stage knob**:
    - Lock readability first (shape + color).
    - Then choose how worn / clean the asset should feel.
  - For production, you can ship multiple SKUs (clean vs distressed) from one base design by only swapping TEXTURE.

---

# Lesson: Value Design = Grayscale-First Readability

Context: Phase 2 – Exercise 3 (Y2K cassowary, value-optimized prompt)

- You explicitly added a `[VALUE DESIGN]` block:
  - **Lightest**: orb + glow = brightest thing in the image.
  - **Darkest**: cassowary body/head = one clearly dark mass against a lighter background.
  - **Mid-tones**: HUD circles, tech shapes, background gradients = middle values that support the silhouette and never compete with the orb.

- Result:
  - In grayscale thumbnails:
    - You still instantly find the cassowary.
    - The orb remains the primary focal point.
    - UI/HUD elements read as soft support, not noisy clutter.

- Practical takeaway:
  - Think **in values first, color second**:
    - “What is my brightest spot? What is my darkest shape? What lives in the mid-tones?”
  - Use a dedicated `[VALUE DESIGN]` block whenever you care about clarity:
    - State a 3-step hierarchy (dark / mid / light).
    - Explicitly forbid anything from matching the focal brightness.
  - If it works at 200px in grayscale, full-color Y2K chaos stays controlled instead of messy.

---

# Lesson: Warm vs Cool Palettes = Same Values, Different Sharpness

Context: Phase 2 – Exercise 5 (warm vs cool limited palettes on the cassowary)

- With **the same value roles on paper** (body darkest, orb lightest, background mid), swapping only palette temperature gave different **perceived sharpness**:
  - Warm ’70s palette (burnt orange, mustard, beige) → edges sometimes felt softer and more “melted”.
  - Cool ’70s palette (teal, petrol blue, cool gray) → cassowary silhouette felt **sharper and cleaner** against the background.

- Why:
  - Warm earthy hues often cluster in similar mid-dark values → less crisp separation.
  - Deep cool colors against a lighter neutral can produce **clearer dark-vs-mid contrast**.
  - Temperature influences how much colors visually **blend** or **separate**, even at similar numeric values.

- Practical takeaway:
  - Palette temperature affects **readability and sharpness**, not just mood.
  - When a design feels mushy:
    - Try pushing the subject toward **cooler, deeper darks** against a lighter background.
  - Always compare warm vs cool versions in **grayscale thumbnails** to see which gives cleaner separation.

---

# Lesson: Lighting Variants = Edge & Shadow Control

Context: Phase 2 – Exercise 4 (lighting-only sweep: north-light, clamshell, hard noon, overcast)

- With **design, style, color, and value design locked**, changing only [LIGHTING] changed:
  - How **3D** the cassowary felt.
  - How **sharp or soft** edges appeared.
  - The overall **mood** (harsh vs gentle vs flattering vs neutral).

- Patterns:
  - **North-light window (soft directional)**  
    - Clear light side & shadow side, soft-edged shadows.  
    - Mix of crisp edges on the light side and softer/lost edges on the shadow side.

  - **Clamshell (beauty) lighting**  
    - Frontal, very soft shadows, even illumination.  
    - Almost no strong cast shadows, very smooth transitions → “pretty” but low drama.

  - **Hard noon sun**  
    - Small, intense light source from above.  
    - Short, dark, sharply defined shadows; strong light–shadow edge → very graphic.

  - **Overcast sky**  
    - Huge diffuse light source.  
    - Minimal cast shadows; forms read mainly through gentle value shifts; soft edges overall.

- Practical takeaway:
  - Lighting is a **separate knob** from STYLE and COLOR.
  - Hard, small light sources → **strong shadows, hard edges, more drama**.
  - Big, soft light sources → **soft edges, weak shadows, calmer mood**.
  - When an image feels:
    - **Too mushy** → try more directional light (north-light or hard noon).  
    - **Too harsh** → move toward soft setups (overcast or clamshell).
  - Always ask:
    - Where are my **hardest edges**?
    - What **shapes** do the shadows make?
    - Do they help or fight the **focal point**?

---

# Workflow Rules Earned So Far (Phase 2)

1. Lock **SUBJECT + COMPOSITION** before styling.  
   - Cassowary + centered (or near-centered) mid-shot became the stable base for all experiments.

2. Choose a **STYLE-era** as a reusable “world filter.”  
   - ’70s / Bauhaus / Y2K radically change feel without changing the subject.

3. Treat **TEXTURE** as a late-stage physicality knob.  
   - 10% vs 40% distress = “new poster” vs “aged artifact” from the same design.

4. Always define a simple **[VALUE DESIGN]** hierarchy for any important piece.  
   - Lightest = focal, darkest = key silhouette, mid-tones = everything else behaves.

5. Test everything in **grayscale thumbnails**.  
   - If subject + focal read instantly in black and white, color and effects can be as wild as you like without losing clarity.

6. Use **warm vs cool limited palettes** to test readability and mood.  
   - Don’t assume; check which temperature gives cleaner silhouette and value separation.

7. Treat **[LIGHTING]** as its own experimental axis.  
   - Run lighting-only sweeps (soft vs hard, frontal vs side vs overhead, overcast vs directional) to control edge sharpness, shadow shapes, and drama without rewriting the design.
