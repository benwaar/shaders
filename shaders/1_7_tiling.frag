#version 300 es

precision mediump float;

uniform float uStrength;
in vec2 vUV;
out vec4 fragColor;

void main() {
    // Use fract() to repeat the pattern across the canvas
    // fract(x) returns the fractional part: fract(2.7) = 0.7, fract(3.2) = 0.2
    // This creates infinite tiling
    
    // uStrength controls the frequency (how many tiles across the screen)
    float frequency = mix(1.0, 8.0, uStrength);
    
    // Apply frequency to UV, then use fract to create tiles
    vec2 tiled = fract(vUV * frequency);
    
    // Create a simple checkerboard-like pattern
    // fract returns [0, 1), so we can use > 0.5 to create bands
    float pattern = step(0.5, mod(floor(vUV.x * frequency) + floor(vUV.y * frequency), 2.0));
    
    // Use the tiled coordinates for a continuous gradient in each tile
    vec3 gradient = vec3(tiled.x, tiled.y, pattern);
    
    fragColor = vec4(gradient, 1.0);
}
