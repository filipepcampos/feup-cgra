#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform sampler2D uHeightSampler;

varying vec2 vTextureCoord;
varying vec3 vPos;
varying vec3 vNormal;

void main() {
    vec4 offset = vec4(0.0,0.0,0.0,1.0);
    vec2 heightTextureCoord = vec2(0.0,0.0);
    if(aVertexNormal.y == 0.0){ // Make sure side 'panels' vertices line up with the circles
        heightTextureCoord = vec2(aVertexPosition.x, -aVertexPosition.z);
    } else {
        heightTextureCoord = aTextureCoord;
    }
    
    vec3 scaledOffset;
    if(aVertexPosition.y < 0.5){ // Only distort the top part of the nest
        offset = texture2D(uHeightSampler, heightTextureCoord);
        scaledOffset = vec3(0, offset.r/2.0, 0);
    } else{
        scaledOffset = vec3(0.0,0.0,0.0);
    }
    
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + scaledOffset, 1.0);
    vPos = aVertexPosition + offset.xyz;
    vNormal = aVertexNormal;
    vTextureCoord = aTextureCoord;
}
