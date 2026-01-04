#version 300 es

precision mediump float;

uniform sampler2D uTexture;
uniform vec3 uTint;
uniform float uStrength;

in vec2 vTexCoord;

out vec4 fragColor;

void main() {
    vec4 src = texture(uTexture, vTexCoord);
    vec4 tgt = vec4(src.rgb * uTint, src.a);
    float s = clamp(uStrength, 0.0f, 1.0f);
    fragColor = mix(src, tgt, s);
}
