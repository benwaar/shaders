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
