#version 300 es

// Provide multiple attribute names for compatibility with different players
in vec2 aPos;
in vec2 a_position;   // legacy name, not used when aPos is present
in vec2 a_texCoord;   // declared for compatibility; not used

// Export several common varying names so fragments expecting any of them will link
out vec2 vUV;
out vec2 vTexCoord;
out vec2 v_texCoord;

void main() {
  // Prefer `aPos` (used by the player), fall back to `a_position` if supplied by a different pipeline
  vec2 src = aPos;
  // If aPos is zero (not supplied) but a_position is present, use it — simple heuristic
  // Use dot(src,src) to check for zero vector (portable and avoids boolean/vector overload issues)
  if (dot(src, src) == 0.0) { src = a_position; }

  vec2 uv = src * 0.5 + 0.5;
  vUV = uv;
  vTexCoord = uv;
  v_texCoord = uv;

  gl_Position = vec4(src, 0.0, 1.0);
}
