## Lesson 3 – Exercise 2 Notes: NEGATIVE Block (DALL·E Reality Check)

### Key discovery
Even though the goal of `[NEGATIVE]` is to block artifacts, in **DALL·E-style prompting** it can behave like a **global creative instruction**.

So a long or highly aesthetic NEGATIVE list can unintentionally:
- shift **color** (often dulling saturation or warmth),
- shift **mood** (more clinical/minimal),
- flatten **lighting**,
- reduce “playful” or “lush” rendering.

This matters because DALL·E doesn’t treat negatives as a separate control channel — it reads them as part of the same instruction stream.

---

### Rule earned
**NEGATIVE is a soft steering wheel, not a surgical filter.**

Use it in two modes:

#### 1) Technical-only NEGATIVE (preferred default)
Use this during:
- COLOR tests
- MOOD tests
- value/thumbnail studies
- baseline locking

**Template**
[NEGATIVE]  
No text, no logos, no watermark, no signatures.  
No extra limbs, no duplicate heads, no malformed anatomy.  
No blur on the subject, no mushy edges.  
Background remains simple support shapes.

#### 2) Aesthetic/Print NEGATIVE (use intentionally)
Use this only when the goal *is* print/minimal discipline:

**Template**  
[NEGATIVE]  
No gradients, no glossy photoreal shine, no heavy bloom.  
No busy background; keep clean poster clarity.

---

### Mini decision tree
When choosing a NEGATIVE block:

- **If the experiment is COLOR/MOOD/STYLE-era:**  
  → use **Technical-only**.

- **If the goal is print-ready poster discipline:**  
  → add **Aesthetic/Print** (short).

- **If the result looks desaturated/too clinical:**  
  → remove aesthetic lines and re-assert palette + mood.

---

### Fix pattern when NEGATIVE hijacks vibe
If a NEGATIVE block starts changing mood/palette:

1) **Shorten** it to technical-only.  
2) **Re-state** your intended palette and mood immediately after.

**Example**
[COLOR]  
warm limited palette: burnt orange, mustard, deep brown, off-white; preserve rich warmth

[MOOD]  
welcoming, calm, friendly

[NEGATIVE]  
No text, no logos, no watermark. No extra limbs. No mushy edges.

[NOTE]  
Do not reduce saturation or temperature; preserve the warm palette and gentle mood.

---

### Do / Don’t list (DALL·E)
**Do**
- Keep NEGATIVE short when testing color/mood.
- Block only repeat offenders (text, watermark, mushy edges, clutter).
- Use explicit value hierarchy to protect readability.

**Don’t**
- Stack long “anti-style” lists during creative exploration.
- Use mood words in NEGATIVE (“no dramatic / no playful”).  
  These often act like hidden MOOD edits.
- Ban too many rendering tools at once (glow + gradients + texture + detail).  
  This can flatten the image.

---

### KERNEL reminder
When testing NEGATIVE:
- keep everything else stable,
- change **only** the NEGATIVE block,
- log one clear “before/after” artifact improvement.

---

### Outcome target
A “pass” for Ex 2 looks like:
- a **short technical default NEGATIVE** you can reuse everywhere,
- 1–2 **optional style-specific variants** (print/Y2K),
- one documented before/after where a recurring artifact is reduced  
  without unwanted palette/mood drift.

---

## Cross-note: CFG + Attention Weighting (SD-only quick rule)
*This section is for Stable Diffusion, not DALL·E.*

CFG = Classifier-Free Guidance: how strictly SD follows your prompt.

Practical pairing:
- If you increase emphasis/weighting on a key noun,
  consider lowering CFG slightly to reduce artifacts.

Starter ranges:
- (focus:1.0–1.2) → CFG 7–9
- (focus:1.3–1.4) → CFG 6–8
- (focus:1.5–1.6) → CFG 5–7

Rule of thumb:
Raise weight until the first artifacts appear,
then step back one notch and lock that + the matching CFG as your default.
