#version 300 es

precision mediump float;

uniform vec3 uTint;
uniform float uStrength;
in vec2 vUV;
out vec4 fragColor;

void main() {
    // Linear gradient from left (0) to right (1)
    vec3 gradient = vec3(vUV.x);
    
    // Mix with tint color
    vec3 color = mix(gradient, uTint, uStrength * 0.5);
    
    fragColor = vec4(color, 1.0);
}
