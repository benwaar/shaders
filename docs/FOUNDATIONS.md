# Foundations — Shared Language & Mental Models

This document defines the **core terms and mental models** used across all projects
in this study.

These definitions originate from **deterministic shader work** and are reused
unchanged in later projects involving agents, embeddings, and large language models,
unless explicitly stated otherwise.

The goal is to ensure that words like *spec*, *plan*, *execution*, and *authority*
mean the **same thing everywhere**.

---

## Table of Contents

1. [Spec](#1-spec)  
2. [Intent](#2-intent)  
3. [Inputs](#3-inputs)  
4. [Constraints](#4-constraints)  
5. [Non-goals](#5-non-goals)  
6. [Acceptance Criteria](#6-acceptance-criteria)  
7. [Observable Behavior Surface](#7-observable-behavior-surface)  
8. [Plan / Intermediate Representation (IR)](#8-plan--intermediate-representation-ir)  
9. [Execution](#9-execution)  
10. [Verification](#10-verification)  
11. [Equivalence](#11-equivalence)  
12. [Deterministic vs Probabilistic Systems](#12-deterministic-vs-probabilistic-systems)  
13. [Authority](#13-authority)  
14. [Advisory vs Authoritative Components](#14-advisory-vs-authoritative-components)  
15. [Failure Taxonomy](#15-failure-taxonomy)


---

## 1. Spec

A **specification (spec)** is a contract that defines *what must be true* about a
system’s behavior.

A spec:
- describes behavior, not implementation
- is written before code
- is stable unless intent changes
- enables verification and refactoring

A spec is not documentation, commentary, or a prompt.
If behavior changes without a spec change, the system is broken.

---

## 2. Intent

**Intent** is the human goal or meaning behind a system or component.

Intent is:
- often fuzzy at first
- refined through specification
- not executable on its own

Specs exist to **make intent explicit, bounded, and testable**.

---

## 3. Inputs

**Inputs** are all external values that influence behavior.

Inputs must be:
- explicitly declared
- bounded (ranges, units, meaning)
- provided with defaults where possible

Undeclared inputs (hidden constants, implicit globals) are spec violations.

---

## 4. Constraints

**Constraints** define the environment in which behavior must hold.

Examples:
- platform (e.g. WebGL2 / GLSL ES 3.00)
- performance budgets
- precision limits
- safety or governance rules

Constraints are not implementation details — they are part of the contract.

---

## 5. Non-goals

**Non-goals** explicitly state what the system is *not* trying to do.

Non-goals:
- prevent scope creep
- protect correctness
- make tradeoffs explicit

Anything not explicitly in scope should be assumed to be out of scope.

---

## 6. Acceptance Criteria

**Acceptance criteria** define how to tell whether a spec is satisfied.

They must be:
- observable
- pass/fail (not vibes)
- tied directly to intent

If acceptance cannot be evaluated, the spec is incomplete.

---

## 7. Observable Behavior Surface

The **observable behavior surface** is the subset of system behavior that is
guaranteed and testable.

Examples:
- pixel color output (within tolerance)
- spatial invariants
- temporal bounds

Non-observable internals (instruction count, GPU scheduling, model internals)
are explicitly *not* part of the contract unless stated.

---

## 8. Plan / Intermediate Representation (IR)

A **plan** (or IR) is the derived, inspectable structure that explains *how*
a spec will be executed.

Plans:
- sit between spec and code
- make ordering and dependencies explicit
- support explainability and optimization

Plans are analogous to **SQL execution plans**.

---

## 9. Execution

**Execution** is the act of running a plan on a specific substrate.

Execution:
- is constrained by the environment
- may vary in performance
- must preserve spec-defined behavior

Changing execution is allowed.
Changing behavior is not.

---

## 10. Verification

**Verification** is the process of checking execution against the spec.

Verification answers:
> “Does this satisfy the contract?”

Verification can be:
- visual
- programmatic
- human-reviewed

But it must always be explicit.

---

## 11. Equivalence

**Equivalence** defines when two executions are considered “the same.”

Equivalence may be:
- exact
- within tolerance (epsilon)
- visually indistinguishable under defined conditions

Equivalence rules must be stated or assumed conservatively.

---

## 12. Deterministic vs Probabilistic Systems

A **deterministic system** produces the same output for the same inputs.

A **probabilistic system** produces outputs drawn from a distribution.

Specs still apply to probabilistic systems, but:
- behavior is bounded, not exact
- acceptance criteria focus on ranges, structure, and failure modes

---

## 13. Authority

**Authority** is ownership of truth and state.

Authoritative components:
- own state
- enforce invariants
- cannot be overridden by advisory systems

Authority must always be explicit.

---

## 14. Advisory vs Authoritative Components

**Advisory components**:
- suggest
- rank
- summarize
- recommend

**Authoritative components**:
- decide
- mutate state
- enforce rules

LLMs and agents are advisory unless explicitly constrained otherwise.

---

## 15. Failure Taxonomy

Failures are classified as:

- **Spec error** — the contract is wrong or incomplete  
- **Implementation defect** — code violates the spec  
- **Integration defect** — correct code used incorrectly  
- **Verification gap** — failure not detectable by current checks  
- **Model limitation** — probabilistic system behaves within bounds but undesirably  

Clear classification prevents mysticism and blame.

---

> If a term is not defined here, it should not be used casually elsewhere.
