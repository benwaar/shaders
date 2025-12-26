# Phase 1 — Spec Foundations

**Goal:** learn to write enforceable shader specifications before touching GLSL.

This phase establishes the **discipline, structure, and verification rules** that govern all shader work in this repository.

No shader code is written in this phase.

---

## What This Phase Is (and Is Not)

### This phase is:
- about **clarity of intent**
- about **explicit constraints**
- about **verifiable behavior**
- about writing specs as **contracts**

### This phase is not:
- about visual quality
- about implementation details
- about experimentation
- about optimization

If something cannot be specified clearly, it is not ready to be implemented.

---

## Required Spec Structure

Every shader spec **must** include the following sections, in this order:

1. **Objective**  
   One sentence describing what the shader exists to do.

2. **Intent**  
   A description of what the viewer should perceive.  
   Focus on observable behavior, not implementation.

3. **Inputs**  
   All external controls, each with:
   - name
   - type
   - range
   - default value

   No hidden constants are allowed.

4. **Constraints**  
   Explicit limits on:
   - platform (e.g. WebGL2 / GLSL ES 3.00)
   - performance expectations
   - precision requirements (if relevant)

5. **Non-Goals**  
   A clear list of what the shader explicitly does *not* attempt to do.

6. **Acceptance Criteria**  
   Pass/fail checks that determine whether the shader satisfies the spec.

7. **Spec Status**  
   One of:
   - `DRAFT` — intent still evolving
   - `LOCKED` — behavior must not change

Specs that do not follow this structure are invalid.

---

## Writing Rules

When writing specs in this phase:

- Use **concrete, testable language**
- Avoid aesthetic adjectives without behavioral meaning
- Do not describe *how* the shader is implemented
- Do not reference GLSL functions, math tricks, or algorithms
- Assume the reader has no access to your intuition

If behavior cannot be verified, it must be clarified or removed.

---

## Acceptance Criteria Guidelines

Acceptance criteria must be:

- objective (pass/fail)
- observable in the player
- independent of personal taste

Examples:
- “With all inputs at default values, output matches input.”
- “Changing `uStrength` from 0 to 1 increases effect monotonically.”
- “Setting strength to 0 produces no visible change.”

Avoid:
- “Looks correct”
- “Feels cinematic”
- “Seems subtle enough”

---

## Spec Gate (Mandatory)

A spec may proceed to implementation **only if all checks pass**:

- [ ] The spec has exactly one objective
- [ ] At least two acceptance criteria are defined
- [ ] All inputs include ranges and default values
- [ ] Non-goals are explicitly listed
- [ ] Platform and performance constraints are stated
- [ ] Sections appear in the standard order
- [ ] Spec Status is set

Failing the gate means the spec must be revised before any code is written.

---

## Output of Phase 1

You are done with Phase 1 when you can:

- write a complete shader spec without referencing code
- predict shader behavior from the spec alone
- identify ambiguities before implementation
- reject unclear specs instead of “fixing” them in code

Only after this phase should you proceed to Phase 2.

---

## Reminder

> **If it isn’t verifiable, it isn’t a spec.**

---

## Resources — Companion Videos (Phase 1)

These videos support the **spec-first, behavior-driven mindset** required in Phase 1.
They are not shader tutorials; they focus on intent, verification, and defining “done.”

- **How to Write Acceptance Tests**  
  https://www.youtube.com/watch?v=JDD5EEJgpHU  
  Introduces acceptance criteria as pass/fail checks rather than subjective judgment.

- **Acceptance Testing with Executable Specifications**  
  https://www.youtube.com/watch?v=knB4jBafR_M  
  Explores the idea of specifications as enforceable contracts between intent and implementation.

- **Hello, Spec-Driven Development**  
  https://www.youtube.com/watch?v=it2PI_EwEYM  
  A high-level introduction to writing specs before code and why this improves clarity and outcomes.

- **Requirements vs User Stories**  
  https://www.youtube.com/watch?v=KP0U3I-f9-Y  
  Useful background on distinguishing intent, requirements, and implementation details.

These resources are intended to be watched selectively and revisited as needed.
They reinforce *how to think*, not *what to code*.

---

# Next steps

### 1. Reconfirm the Vertex / Fragment Mental Model

- Write down (in your own words) a 2–3 sentence summary:
  - Both vertex shaders you’ve seen (the “derive UV from position” version and the “pass through a_texCoord” version) **serve the same role** in this project:  
    they output a `v_texCoord` in the range `[0..1]` and a `gl_Position` that covers the full screen.
  - For the **Solid Tint** shader, the fragment stage only cares that:
    - `v_texCoord` runs from `(0,0)` in one corner to `(1,1)` in the opposite corner
    - every pixel gets a valid UV
  - How the vertex shader *computes* `v_texCoord` is an implementation detail, as long as that contract holds.

This locks in the idea that the **spec is about fragment behavior and UV semantics**, not the exact vertex math.

---

### 2. Adjust the Solid Tint Spec (UV & Vertex-Agnostic Contract)

Update the Solid Tint spec so it is clearly compatible with **both** vertex variants.

- In **Constraints**, add a short “UV semantics” note, for example:

  > **UV Space Assumption:**  
  > The fragment shader receives `v_texCoord` in the range `[0.0, 1.0]` in both components,  
  > where `(0,0)` maps to one corner of the image and `(1,1)` to the opposite corner.  
  > The exact vertex shader used to generate `v_texCoord` is outside the scope of this spec.

- Optionally add one Acceptance Criterion, e.g.:

  5. **UV coverage:** For any valid input image, the shader must sample only within the `[0,1]` UV range (no obvious wrapping or mirroring artifacts introduced by the tint logic).

This keeps the spec **vertex-agnostic**, but explicit about what the fragment expects.

---

### 3. Code Walkthrough & Annotation

Do a line-by-line pass through the actual code you have:

1. **Vertex shader(s)**  
   - Take each vertex shader you might use (the passthrough one, the current `VERT_SRC`, etc.).  
   - Add comments (in the file or in a notes doc) marking:
     - which lines are **plumbing** (setting `gl_Position`, passing through UVs)
     - which lines you would ever change for an effect (likely none, for now)

2. **`solid_tint.frag`**  
   - Annotate:
     - where the **input** comes in (`texture(uTexture, vTexCoord)`)
     - where the **effect** happens (tint multiply)
     - where **blending** happens (`mix(src, tinted, s)`)
   - For each acceptance criterion in the spec, write a small note:
     - which line(s) of code make that criterion true
     - or what you would need to change if it ever fails
