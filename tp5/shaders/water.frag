#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform float timeFactor;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;

void main() {
    vec2 offset = vec2(timeFactor/100.0, timeFactor/100.0);
	gl_FragColor = texture2D(uSampler, vTextureCoord+offset);
}