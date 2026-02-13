#version 300 es

// Input: fullscreen quad vertices in clip space [-1, 1]
in vec2 aPos;

// Output: UV coordinates [0, 1] for texture sampling
out vec2 vUV;

void main() {
  // Convert clip space [-1, 1] to UV space [0, 1]
  vUV = aPos * 0.5 + 0.5;

  gl_Position = vec4(aPos, 0.0, 1.0);
}
