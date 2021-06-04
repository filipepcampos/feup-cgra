#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float timeFactor;
varying vec2 vTextureCoord;

void main() {  
    gl_FragColor = texture2D(uSampler, vTextureCoord);
}