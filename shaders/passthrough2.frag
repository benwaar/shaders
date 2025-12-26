#version 300 es
precision mediump float;

uniform sampler2D u_source;

in vec2 v_texCoord;

out vec4 outColor;

void main() {
    outColor = texture(u_source, v_texCoord); // exactly 1 sample
}
