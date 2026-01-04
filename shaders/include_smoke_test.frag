#version 300 es
precision mediump float;

#include "common.glslinc"

// this is for testing the player can handle includes when we use them later

uniform sampler2D uTexture;
uniform float uStrength; // reuse existing slider in your player UI

in vec2 vTexCoord;
out vec4 fragColor;

void main() {
  vec4 src = texture(uTexture, vTexCoord);

  // Proof-of-include: saturate() is defined only in common.glslinc
  float s = saturate(uStrength);

  // Simple, obvious output: mix to magenta as strength increases
  vec3 magenta = vec3(1.0f, 0.0f, 1.0f);
  vec3 rgb = mix(src.rgb, magenta, s);

  fragColor = vec4(rgb, src.a);
}
