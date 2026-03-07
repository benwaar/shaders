#version 300 es

precision mediump float;

uniform float uStrength;
in vec2 vUV;
out vec4 fragColor;

void main() {
    // Scale transform: uStrength controls zoom level (0.5 to 2.0)
    float scale = mix(0.5, 2.0, uStrength);
    
    // Center the coordinates
    vec2 centered = vUV - 0.5;
    
    // Scale around center
    vec2 scaled = centered * scale;
    
    // Move back to [0,1] range
    vec2 uv = scaled + 0.5;
    
    // Create a gradient in the scaled space
    // Shows how scaling affects pattern frequency
    vec3 gradient = vec3(
        fract(uv.x * 3.0),  // Repeating gradient
        fract(uv.y * 3.0),
        0.5
    );
    
    fragColor = vec4(gradient, 1.0);
}
