# Git Hooks Guide

Automated quality checks and commit message validation for the Shader Study project.

## Overview

This project uses Git hooks to enforce conventional commit messages and validate shader project integrity. All hooks run automatically when you commit code.

## Installed Hooks

### 1. Pre-Commit Hook

Runs **before** the commit is created to validate shader project quality.

**Checks:**
- ✅ **Manifest Validation**: Ensures `shaders/manifest.json` is valid JSON and all listed shaders exist
- ✅ **GLSL Syntax**: Validates shader syntax (if `glslangValidator` is installed)

**When it runs:** Before every `git commit`

**What happens:**
- All checks must pass for the commit to succeed
- If any check fails, the commit is blocked
- You'll see detailed error output to help you fix issues

**Example output (success):**
```
======================================================================
Running pre-commit checks for shader project...
======================================================================

🔍 Manifest validation...
✅ Manifest validation passed

🔍 GLSL syntax validation...
Note: glslangValidator not found, skipping GLSL syntax validation
      Install with: brew install glslang (macOS) or apt install glslang-tools (Linux)
✅ GLSL syntax validation passed

======================================================================
✅ All pre-commit checks passed!
======================================================================
```

**Example output (failure):**
```
======================================================================
Running pre-commit checks for shader project...
======================================================================

🔍 Manifest validation...
❌ Manifest validation failed

Error: The following shaders are listed in manifest but don't exist:
  - my_shader.frag

❌ Some pre-commit checks failed
======================================================================

To fix:
  • Manifest: Check shaders/manifest.json is valid JSON
  • Missing shaders: Add missing .frag files or remove from manifest
  • GLSL syntax: Fix shader compilation errors

To skip these checks (NOT RECOMMENDED):
  git commit --no-verify
```

### 2. Commit Message Hook

Validates commit messages follow [Conventional Commits](https://www.conventionalcommits.org/) format.

**Format:**
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Valid types:**
- `feat`: New feature or shader effect
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `build`: Build system changes
- `ci`: CI configuration changes
- `chore`: Other changes
- `revert`: Revert a previous commit

**Examples:**
```bash
# Good
git commit -m "feat: add kaleidoscope shader"
git commit -m "fix(player): correct UV coordinate mapping"
git commit -m "docs: update README with learning path"

# Bad (will be rejected)
git commit -m "Added stuff"
git commit -m "WIP"
git commit -m "fixed it"
```

### 3. Prepare Commit Message Hook

Provides a commit message template to help you write properly formatted messages.

## Installation

Run the installation script:

```bash
./install-hooks.sh
```

This copies hooks from `hooks/` to `.git/hooks/` and makes them executable.

**Note:** The hooks are installed locally in your `.git/hooks/` directory and are **not** tracked by git. Each developer must run `./install-hooks.sh` after cloning the repository.

## Common Workflows

### Making a Commit

Normal workflow - hooks run automatically:

```bash
git add shaders/my_new_shader.frag shaders/manifest.json
git commit -m "feat: add gradient wave shader"
```

The pre-commit hook runs first, then the commit message is validated.

### Skipping Pre-Commit Checks

**⚠️ NOT RECOMMENDED** - Only use when absolutely necessary:

```bash
git commit --no-verify -m "feat: emergency hotfix"
```

This skips the pre-commit hook but still validates the commit message.

### Fixing Quality Issues

If pre-commit checks fail:

**Manifest errors:**
```bash
# Check JSON is valid
python3 -m json.tool shaders/manifest.json

# Ensure all shaders exist
ls shaders/*.frag
```

**GLSL syntax errors:**
```bash
# Install validator (macOS)
brew install glslang

# Install validator (Ubuntu/Debian)
sudo apt install glslang-tools

# Validate specific shader
glslangValidator -S frag shaders/my_shader.frag
```

## Troubleshooting

### Hook Not Running

Make sure hooks are installed:
```bash
./install-hooks.sh
```

Check hook is executable:
```bash
ls -la .git/hooks/pre-commit
# Should show: -rwxr-xr-x
```

### Python Not Found

The hooks require Python 3. Install it:
- **macOS:** `brew install python3`
- **Linux:** `sudo apt install python3`
- **Windows:** Download from python.org

### GLSL Validator Not Found

The GLSL syntax check is optional. To enable it:

**macOS:**
```bash
brew install glslang
```

**Ubuntu/Debian:**
```bash
sudo apt install glslang-tools
```

**Windows:**
Download from https://github.com/KhronosGroup/glslang/releases

## Customization

### Modifying Checks

Edit `hooks/pre-commit` to add/remove checks:

```bash
# Example: Add check for .glslinc files
run_check "Include file validation" validate_includes || true
```

After editing, reinstall:
```bash
./install-hooks.sh
```

### Disabling Specific Checks

Comment out checks in `hooks/pre-commit`:

```bash
# run_check "GLSL syntax validation" validate_glsl || true  # Disabled
run_check "Manifest validation" validate_manifest || true
```

### Adjusting Commit Message Rules

Edit `hooks/commit-msg` to change validation rules, valid types, or message length limits.

## Best Practices

1. **Always update manifest**: When adding new shaders, update `shaders/manifest.json`
2. **Test shaders before committing**: Run the player to ensure shaders compile
3. **Use conventional commits**: Makes history readable and enables automated changelogs
4. **Keep commits focused**: One shader or feature per commit
5. **Don't skip hooks**: They exist to maintain project quality

## Integration with Learning Path

The hooks align with your shader learning journey:

- **Phase 1-4**: Each completed shader gets a `feat:` commit
- **Experiments**: Use `chore: experiment with X` for work-in-progress studies
- **Documentation**: Use `docs:` when updating learning notes
- **Player fixes**: Use `fix(player):` for infrastructure changes

## References

- [Conventional Commits Specification](https://www.conventionalcommits.org/)
- [Git Hooks Documentation](https://git-scm.com/docs/githooks)
- [GLSL Specification](https://www.khronos.org/opengl/wiki/Core_Language_(GLSL))

---

**Last Updated:** 2026-02-13
**Project:** Shader Study (GLSL Learning Project)
