# Shader Study Project

## Overview
This is a GLSL shader learning project with a minimal WebGL2 player for experimenting with fragment shaders. The goal is to learn artistic shader programming through progressive phases, starting with fundamentals and building up to complex generative effects.

## Project Structure

```
.
├── player/               # WebGL2 shader player (infrastructure)
│   ├── index.html        # Player UI
│   ├── player.js         # WebGL2 engine with #include support
│   ├── shader.vert       # Standard fullscreen quad vertex shader
│   ├── start_server.*    # Cross-platform server start scripts
│   └── stop_server.*     # Cross-platform server stop scripts
├── shaders/              # Fragment shaders (your experiments go here)
│   ├── manifest.json     # List of available fragment shaders
│   ├── *.frag            # Fragment shader files
│   └── *.glslinc         # Shared GLSL includes
├── assets/               # Images and CSS
└── docs/                 # Learning resources and notes
```

## How to Add a New Shader

1. Create a new `.frag` file in `shaders/` (e.g., `1_1_my_shader.frag`)
2. Add an entry to `shaders/manifest.json`:
   ```json
   {
     "file": "1_1_my_shader.frag",
     "name": "My Shader",
     "description": "Brief description of what it does",
     "phase": 1,
     "controls": ["tint", "strength"]
   }
   ```
3. Refresh the browser - the player will show/hide controls based on your `controls` array
4. Select your shader from the dropdown

### Manifest Format

Each shader entry supports these properties:
- **file** (required): Shader filename
- **name** (optional): Display name in dropdown (defaults to filename)
- **description** (optional): What the shader does
- **phase** (optional): Learning phase number (0-4)
- **controls** (required): Array of UI controls to show

Available controls:
- `"tint"` - Color picker (provides `uniform vec3 uTint`)
- `"strength"` - Slider 0-1 (provides `uniform float uStrength`)

**Example:**
```json
{
  "fragments": [
    {
      "file": "0_1_passthrough.frag",
      "name": "Passthrough",
      "description": "Simple texture display",
      "phase": 0,
      "controls": []
    },
    {
      "file": "0_2_tint.frag",
      "name": "Tint",
      "description": "Color tinting with blend strength",
      "phase": 0,
      "controls": ["tint", "strength"]
    }
  ]
}
```

## Shader Conventions

### Required Boilerplate
```glsl
#version 300 es
precision mediump float;

in vec2 vUV;           // Texture coordinates [0,1] from vertex shader
out vec4 fragColor;    // Output color

void main() {
    // Your shader code here
}
```

### Available Uniforms
The player provides these uniforms automatically:
- `uniform sampler2D uTexture` - Input image
- `uniform vec3 uTint` - Color from color picker (RGB [0,1])
- `uniform float uStrength` - Slider value [0,1]
- `uniform vec2 uResolution` - Canvas size in pixels
- `uniform float uTime` - Time in seconds

You only need to declare the uniforms you actually use.

### Include System
Use `#include "filename.glslinc"` to import shared code:
```glsl
#version 300 es
precision mediump float;

#include "common.glslinc"

// ... rest of shader
```

## Learning Path

The project follows a phased approach (see README.md for details):

1. **Phase 1**: Fundamentals (gradients, transforms, UV manipulation)
2. **Phase 2**: Shapes & Composition (SDFs, symmetry, blending)
3. **Phase 3**: Procedural Generation (noise, domain warping)
4. **Phase 4**: Animation & Polish (time, post-processing)

## Important Notes

- **Vertex shader is fixed** - Focus only on fragment shaders in `shaders/`
- **Player uses WebGL2** - Always start shaders with `#version 300 es`
- **Use `vUV` for texture coordinates** - This is the standard varying name
- **Keep shaders focused** - One visual idea per experiment (see Light Constraints)
- **Document learnings** - Note surprising behaviors and useful patterns

## Running the Player

The player requires a local web server (browsers block file:// access for security). Cross-platform start scripts are provided in `player/`:

**macOS/Linux:**
```bash
./player/start_server.sh
# or double-click player/start_server.command
```

**Windows:**
```cmd
player\start_server.bat
# or run player\serve.ps1 in PowerShell
```

**Manual (any platform):**
```bash
cd player
python3 -m http.server 8000
# Open http://localhost:8000
```

The start scripts auto-detect available servers (Python, Ruby, or npx http-server) and start on port 8000.

To stop:
- macOS/Linux: `./player/stop_server.sh` or `./player/stop_server.command`
- Windows: `player\stop_server.bat` or Ctrl+C in PowerShell

## Development Workflow

1. Start the local server using one of the methods above
2. Open http://localhost:8000/player/ in your browser
3. Select a shader from the dropdown
4. Choose an image: Cassowary (default), Test Pattern, or upload custom
5. Write a new fragment shader or modify an existing one
6. Refresh the browser (player uses `cache: "no-store"` for instant reloading)
7. Adjust visible controls based on shader requirements (tint, strength)
8. Check browser console for shader compilation errors

## Common Patterns

### Sampling Input Image
```glsl
vec4 src = texture(uTexture, vUV);
```

### Mixing Effects
```glsl
vec3 effect = /* your effect */;
fragColor = vec4(mix(src.rgb, effect, uStrength), src.a);
```

### Time-based Animation
```glsl
float phase = sin(uTime * 2.0) * 0.5 + 0.5;  // Oscillate [0,1]
```

### Coordinate Transforms
```glsl
vec2 centered = vUV - 0.5;           // Center origin
vec2 scaled = centered * 2.0;        // Scale
vec2 uv = scaled + 0.5;              // Back to [0,1]
```

## Git Hooks & Conventional Commits

This project uses Git hooks to enforce code quality and commit message standards.

### Installation

Install the hooks once after cloning:
```bash
./install-hooks.sh
```

### Commit Message Format

All commits must follow [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>[optional scope]: <description>
```

**Common types for this project:**
- `feat:` - New shader or feature (e.g., "feat: add radial gradient shader")
- `fix:` - Bug fixes (e.g., "fix(player): correct UV mapping")
- `docs:` - Documentation updates
- `chore:` - Experiments, cleanup, other changes

**Examples:**
```bash
git commit -m "feat: add kaleidoscope effect"
git commit -m "fix(player): handle missing manifest gracefully"
git commit -m "docs: update Phase 1 learning notes"
git commit -m "chore: experiment with noise functions"
```

### Pre-Commit Checks

Automatically validates before each commit:
- Manifest JSON is valid
- All listed shaders exist
- GLSL syntax (if glslangValidator installed)

See [GIT_HOOKS.md](GIT_HOOKS.md) for full documentation.

## Resources

- [The Book of Shaders](https://thebookofshaders.com/) - Core concepts
- [Inigo Quilez](https://iquilezles.org/) - SDFs and advanced techniques
- [Shadertoy](https://www.shadertoy.com/) - Examples to study and remix
