#version 300 es

// Accept multiple attribute names for compatibility
in vec2 aPos;           // Used by player (clip-space [-1..1])
in vec2 a_position;     // Legacy name, fall back if aPos is zero
in vec2 a_texCoord;     // Texture coordinates [0..1]

// Export common varying names so fragments expecting any will link
out vec2 vUV;
out vec2 vTexCoord;
out vec2 v_texCoord;

void main() {
  // Resolve position: prefer aPos (from player), fall back to a_position
  vec2 pos = aPos;
  if (dot(pos, pos) == 0.0) { pos = a_position; }

  // Use texture coordinates from a_texCoord
  vec2 tc = a_texCoord;

  vUV = tc;
  vTexCoord = tc;
  v_texCoord = tc;

  gl_Position = vec4(pos, 0.0, 1.0);
}
