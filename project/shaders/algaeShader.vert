#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float green;
uniform float angle;

void main() {
    vec3 offset = vec3(aVertexPosition.y*aVertexPosition.y*sin(angle)*1.2, 0, 0);
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);
}
