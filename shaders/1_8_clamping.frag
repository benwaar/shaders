#version 300 es

precision mediump float;

uniform float uStrength;
in vec2 vUV;
out vec4 fragColor;

void main() {
    // Demonstrate the difference between CLAMP and REPEAT modes
    // In the player: CLAMP_TO_EDGE (repeats edge color)
    // Here we manually show both behaviors
    
    // Scale UV outward from center
    vec2 centered = vUV - 0.5;
    float scale = mix(1.0, 3.0, uStrength);
    vec2 scaled = centered * scale + 0.5;
    
    // CLAMP behavior: restrict to [0, 1]
    // Values outside get pinned to edges
    vec2 clamped = clamp(scaled, 0.0, 1.0);
    
    // Show clamped region as one color, out-of-bounds as different color
    // This visualizes the boundary effect
    vec2 diff = abs(scaled - clamped);
    float isOutOfBounds = step(0.01, max(diff.x, diff.y));
    
    vec3 color = mix(
        vec3(clamped, 0.5),   // In-bounds: show the clamped coordinate
        vec3(1.0, 0.0, 0.5),  // Out-of-bounds: magenta highlight
        isOutOfBounds
    );
    
    fragColor = vec4(color, 1.0);
}
