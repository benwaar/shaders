#version 300 es
precision mediump float;

uniform sampler2D uTexture;
uniform vec3 uTint;        // (1,1,1) = no tint
uniform float uStrength;   // 0 = no effect, 1 = full tint

in vec2 vTexCoord;
out vec4 fragColor;

void main() {
  vec4 src = texture(uTexture, vTexCoord);

  float s = clamp(uStrength, 0.0, 1.0);

  // Full-tint version: multiply RGB by tint, preserve alpha
  vec4 tinted = vec4(src.rgb * uTint, src.a);

  // Blend between original and tinted
  fragColor = mix(src, tinted, s);
}
