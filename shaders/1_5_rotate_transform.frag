#version 300 es

precision mediump float;

uniform float uStrength;
in vec2 vUV;
out vec4 fragColor;

void main() {
    // Rotation angle controlled by uStrength (0 to 2π)
    float angle = uStrength * 6.28318;  // 2π
    
    // Center coordinates
    vec2 centered = vUV - 0.5;
    
    // 2D rotation matrix: [cos -sin] [x]
    //                     [sin  cos] [y]
    vec2 rotated = vec2(
        cos(angle) * centered.x - sin(angle) * centered.y,
        sin(angle) * centered.x + cos(angle) * centered.y
    );
    
    // Move back to [0,1] range
    vec2 uv = rotated + 0.5;
    
    // Create a gradient that visibly rotates
    // Horizontal bands in rotated space
    vec3 gradient = vec3(
        fract(uv.x * 4.0),
        fract(uv.y),
        0.5
    );
    
    fragColor = vec4(gradient, 1.0);
}
