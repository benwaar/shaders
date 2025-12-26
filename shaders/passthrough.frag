#version 300 es
precision mediump float;

in vec2 vTexCoord;
out vec4 fragColor;

uniform sampler2D uTexture;
uniform vec3 uTint;
uniform float uStrength;

void main() {
  vec4 base = texture(uTexture, vTexCoord);
  vec3 tinted = base.rgb * uTint;
  vec3 rgb = mix(base.rgb, tinted, clamp(uStrength, 0.0, 1.0));
  fragColor = vec4(rgb, base.a);
}
