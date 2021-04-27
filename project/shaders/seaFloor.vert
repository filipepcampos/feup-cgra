#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform sampler2D uSampler2;
uniform float maxHeight;

varying vec2 vTextureCoord;

void main() {
    vec4 offset = texture2D(uSampler2, aTextureCoord);
    vec3 scaledOffset = vec3(0, 0, offset.r * maxHeight);
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + scaledOffset, 1.0);
    vTextureCoord = aTextureCoord;
}
