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
uniform float timeFactor;

varying vec2 vTextureCoord;

void main() {    
    vec4 offset = texture2D(uSampler2, aTextureCoord+vec2(timeFactor/500.0, timeFactor/500.0));
    vec2 textureOffset = vec2(vTextureCoord.r - (offset.r - 0.5)*0.5, vTextureCoord.g - (offset.g - 0.5)*0.5);
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    vTextureCoord = aTextureCoord + textureOffset;
}
