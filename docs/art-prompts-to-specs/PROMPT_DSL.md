Prompt DSL (Domain-Specific Language) is a tiny “mini-language” designed for one specific job—in this case, writing structured prompts for image models. Instead of dumping one long sentence, I use a consistent syntax: bracketed blocks like [COMPOSITION], [STYLE], [COLOR], [TEXTURE] and [OUTPUT] to group ideas; // to mark human-only comments such as // DESC:, // GOAL:, and // TAGS:; > to indicate inline notes, examples, or step-style instructions; : to define options or key–value style settings; and flags like --seed or --ar for model parameters. Together, these rules form my prompt DSL: a small, opinionated way of writing prompts that makes them easier to read, edit, version, and grep across projects.

---

// DESC: one-line summary
// GOAL: what I’m testing this run
// TAGS: comma-separated, grep-friendly keywords

[COMPOSITION] = camera, framing, geometry
[SUBJECT]     = what’s actually in the scene
[STYLE]       = art movement, medium, visual flavor
[COLOR]       = palette + value intent
[TEXTURE]     = grain, print wear, material feel
[MOOD]        = emotional tone
[OUTPUT]      = format, res, filename, aspect hints