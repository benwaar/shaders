# 🎛️ Shader Specification Template

> **Purpose:** Define deterministic visual behavior before writing any shader code.

This document is a **contract**.  
Implementation must satisfy this spec. If behavior changes, the spec must change first.

---

## 1. Objective

> **One sentence.**  
What this shader exists to do.

Example:  
Create a subtle depth illusion for 2D cards without distorting content.

---

## 2. Intent

Describe **what the viewer should perceive**, not how it is implemented.

Focus on:
- what is noticeable
- what is subtle
- what remains stable

Avoid:
- aesthetic adjectives without behavior
- implementation details

---

## 3. Inputs

List **all external controls**. No hidden constants.

For each input:

- **Name**
- **Type**
- **Range**
- **Default**
- **Notes** (optional)

Example:

- `uDepth`
  - Type: float
  - Range: 0.0 – 0.2
  - Default: 0.08
  - Notes: Controls perceived depth strength

---

## 4. Constraints

### Platform
- Target: WebGL2 / GLSL ES 3.00

### Performance
- Max texture samples:
- Loops allowed:
- Branching rules:

### Precision
- Required precision (lowp / mediump / highp):

---

## 5. Non-Goals

Explicitly state what this shader **does not** attempt to do.

Examples:
- Does not simulate real 3D perspective
- Does not blur text content
- Does not introduce temporal noise

Non-goals protect scope.

---

## 6. Acceptance Criteria

Define **pass / fail checks**.

These must be testable.

Examples:
- Text remains legible at all input values
- Effect strength scales linearly with `uDepth`
- Setting all inputs to defaults produces a neutral result

Minimum: **2 acceptance checks required**.

---

## 7. Integration Notes (Optional)

Record assumptions or risks discovered during integration:
- color space issues
- gamma differences
- Flutter widget constraints

This section does **not** change intent.

---

## 8. Known Limitations (Optional)

Document tradeoffs or edge cases:
- performance limits
- visual artifacts at extremes

This prevents silent regressions.

---

## 9. Spec Status

**Spec Status:** `DRAFT` | `LOCKED`

Rules:
- `DRAFT` → behavior may evolve
- `LOCKED` → behavior must not change
- New behavior requires a new spec

---

## Spec Gate Checklist

A shader may proceed to implementation **only if all pass**:

- [ ] Single objective
- [ ] All inputs declared with defaults
- [ ] Platform and performance constraints stated
- [ ] Non-goals listed
- [ ] ≥ 2 acceptance criteria defined
- [ ] Spec Status set

---

## Final Rule

> **If it isn’t verifiable, it isn’t a spec.**
