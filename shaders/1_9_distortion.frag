#version 300 es

precision mediump float;

uniform float uStrength;
uniform float uTime;
in vec2 vUV;
out vec4 fragColor;

void main() {
    // UV Distortion: warp the coordinates before using them
    // This is the foundation for effects like water ripples, heat shimmer, etc.
    
    vec2 uv = vUV;
    
    // Apply sine-wave distortion based on uStrength and time
    // uStrength controls distortion amount
    // Create a wave that oscillates in the vertical direction
    float waveAmount = uStrength * 0.3;  // Scale down for subtlety
    
    // Vertical distortion: based on X position and time
    uv.y += sin(uv.x * 6.0 + uTime * 2.0) * waveAmount;
    
    // Horizontal distortion: based on Y position and time (90° phase shift)
    uv.x += sin(uv.y * 6.0 + uTime * 2.0 + 1.57) * waveAmount * 0.5;
    
    // Clamp to valid range to prevent artifacts
    uv = clamp(uv, 0.0, 1.0);
    
    // Create a visible pattern so you can see the distortion
    // Simple striped pattern
    float pattern = sin(uv.x * 10.0) * 0.5 + 0.5;
    float pattern2 = cos(uv.y * 10.0) * 0.5 + 0.5;
    
    vec3 color = vec3(
        pattern,
        pattern2,
        0.5
    );
    
    fragColor = vec4(color, 1.0);
}
