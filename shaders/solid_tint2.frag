#version 300 es
precision mediump float;

uniform sampler2D uTexture;
uniform vec3 uTint;
uniform float uStrength;

in vec2 v_texCoord;
out vec4 fragColor;

void main() {
  vec4 src = texture(uTexture, v_texCoord);
  float s = clamp(uStrength, 0.0, 1.0);
  vec4 tinted = vec4(src.rgb * uTint, src.a);
  fragColor = mix(src, tinted, s);
}
