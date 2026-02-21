#version 300 es

precision mediump float;

uniform float uStrength;
in vec2 vUV;
out vec4 fragColor;

// Cosine palette from The Book of Shaders
vec3 cosinePalette(float t) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.0, 0.33, 0.67);
    
    return a + b * cos(6.28318 * (c * t + d));
}

void main() {
    // Use horizontal position to drive palette
    float t = vUV.x + sin(vUV.y * 3.14159) * uStrength * 0.5;
    
    vec3 color = cosinePalette(t);
    
    fragColor = vec4(color, 1.0);
}
