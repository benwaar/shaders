#version 300 es

precision mediump float;

uniform float uStrength;
in vec2 vUV;
out vec4 fragColor;

void main() {
    // Convert Cartesian to polar coordinates
    vec2 centered = vUV - 0.5;
    
    // Polar: r = distance from center, θ = angle
    float r = length(centered);
    float theta = atan(centered.y, centered.x);
    
    // Normalize theta to [0, 1]
    float angle01 = (theta / 6.28318) + 0.5;  // Divide by 2π, shift to [0,1]
    
    // uStrength controls how we map polar coords to color
    // When 0: radial gradient (based on distance)
    // When 1: angular gradient (based on angle)
    vec3 gradient = mix(
        vec3(r),                        // Radial (based on distance from center)
        vec3(angle01),                  // Angular (based on angle)
        uStrength
    );
    
    fragColor = vec4(gradient, 1.0);
}
