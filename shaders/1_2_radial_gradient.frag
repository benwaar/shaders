#version 300 es

precision mediump float;

uniform vec3 uTint;
uniform float uStrength;
in vec2 vUV;
out vec4 fragColor;

void main() {
    // Distance from center (0.5, 0.5)
    vec2 centered = vUV - 0.5;
    float dist = length(centered) * 2.0;
    
    // Radial gradient: 0 at center, 1 at edges
    float gradient = smoothstep(0.0, 1.0, dist);
    vec3 color = vec3(gradient);
    
    // Mix with tint color
    color = mix(color, uTint, uStrength * 0.5);
    
    fragColor = vec4(color, 1.0);
}
