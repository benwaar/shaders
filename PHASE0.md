# Phase 0 — Foundations, Mental Models & Early Gotchas

*Goal:* establish shared mental models and avoid common failure modes
*before* writing specs or shader code.

This phase is about **how to think**, not what to build.
All later phases assume these principles.

---

## 0.1 Specs Describe Behavior, Not Math

- A spec defines **what must be true**, not how it is computed.
- Listing formulas or GLSL snippets is not a substitute for behavioral guarantees.
- If swapping implementations changes observable behavior, the spec was incomplete.

> Ask: “What would break if I rewrote this shader from scratch?”

---

## 0.2 Neutral Defaults Are a Contract

- Every shader must default to **no visible effect**.
- If enabling a shader changes output without changing inputs, the spec is wrong.
- Neutral defaults enable:
  - composition
  - refactoring
  - safe integration
  - constant folding later

This is not a convenience — it is a design invariant.

---

## 0.3 Observable Behavior Is the Boundary

- Only behavior that can be **observed and verified** is part of the contract.
- GPU instruction counts, branches, or internal math are not observable unless exposed.
- Acceptance criteria must reference **outputs**, not reasoning.

If it can’t be observed, it can’t be verified.

---

## 0.4 Equivalence Must Be Defined (or Assumed Strict)

- Two shaders may differ internally but still be equivalent.
- If equivalence is not explicitly defined, assume **strict equivalence**.
- Visual tolerance (epsilon, perceptual similarity) must be stated when allowed.

Optimization without equivalence rules is guesswork.

---

## 0.5 Hidden Inputs Are Spec Violations

- Time, resolution, aspect ratio, frame index, color space — these are inputs.
- If they influence behavior, they must be declared.
- “Implicit globals” create accidental behavior changes.

If it matters, name it.

---

## 0.6 Determinism Is a Choice

- Deterministic behavior is the default.
- Noise, randomness, and time-based effects are **opt-in**.
- Seeds, rates, bounds, and variability must be explicit inputs.

Uncontrolled variability is a spec failure, not a creative choice.

---

## 0.7 Integration Is Where Most Bugs Appear

- Gamma, color space, scaling, and sampling frequently change behavior.
- If behavior changes on integration:
  - the spec is still the authority
  - integration is wrong until proven otherwise
- Integration assumptions should be documented early, not retrofitted.

---

## 0.8 Failure Classification Comes Before Fixing

When something goes wrong, classify it first:

- **Spec error** — the contract is wrong or incomplete  
- **Implementation defect** — code violates the spec  
- **Integration defect** — correct code used incorrectly  
- **Verification gap** — failure not detectable by current checks  

Fixing without classification causes spec drift.

---

## 0.9 K.E.R.N.E.L Framework (Mandatory)

All work in this study follows **K.E.R.N.E.L**:

- **K – Keep it simple**: one shader = one primary visual objective  
- **E – Easy to verify**: pass/fail acceptance criteria required  
- **R – Reproducible**: inputs have ranges + defaults; no hidden constants  
- **N – Narrow scope**: non-goals are explicit  
- **E – Explicit constraints**: platform, precision, performance stated  
- **L – Logical structure**: specs follow a consistent section order  

If a shader cannot be verified against its spec, it is **incomplete**.

---

## 0.10 ⚠️ **Warning: Over-Specifying Too Early**

A spec should constrain **behavior**, not freeze **implementation**.

Common early failure modes:
- encoding formulas instead of invariants
- specifying execution order prematurely
- optimizing before behavior is well understood
- locking details that should remain flexible

If changing the implementation *without changing behavior* feels impossible,
the spec is likely too prescriptive.

Prefer:
- observable guarantees
- bounded ranges
- equivalence rules

Defer optimization and low-level decisions until the **Spec-to-Plan (IR)** phase.
This warning reinforces **K.E.R.N.E.L → Keep it simple**.

---

## Exit Criteria for Phase 0

You are ready to proceed when:

- You can explain what a shader **guarantees**, not how it works.
- You can say whether a failure is a spec, implementation, or integration issue.
- You understand why neutral defaults and explicit inputs matter.
- You have read `docs/FOUNDATIONS.md` and agree with the terminology.

---

## Resources — Foundations & Mental Models

These are not tutorials.  
They reinforce *how to think* about execution, contracts, and systems.

### Specifications & Contracts
- **Specification by Example (Concept Overview)**  
  https://en.wikipedia.org/wiki/Specification_by_example  
  Why examples and acceptance criteria define behavior better than prose.

- **Hello, Spec-Driven Development (Video)**  
  https://www.youtube.com/watch?v=it2PI_EwEYM  
  Clear explanation of specs as contracts, not documentation.

### Execution & Explainability
- **What Happens When a Shader Runs?**  
  https://www.youtube.com/watch?v=8x4ZbW9b6xk  
  Reinforces the idea of observable output vs internal execution.

- **How GPUs Actually Work (High-Level)**  
  https://www.youtube.com/watch?v=-P28LKWTzrI  
  Useful context for understanding why performance and precision are constraints,
  not implementation details.

---

> If these ideas feel abstract, that’s expected.  
> They become concrete in Phase 1 and Phase 2.
