#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D uSampler;
varying vec2 vTextureCoord;
varying vec3 vPos;
varying vec3 vNormal;
varying vec4 vFinalColor;

void main() {
    vec4 color = texture2D(uSampler, vTextureCoord);
    gl_FragColor = color * vFinalColor;
}