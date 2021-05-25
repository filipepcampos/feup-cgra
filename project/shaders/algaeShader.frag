#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D uSampler;
uniform float timeFactor;
varying vec2 vTextureCoord;

void main() {  
    gl_FragColor = vec4(0.0, 0.5, 0.0, 1.0);
}