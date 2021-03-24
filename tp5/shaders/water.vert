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
    vec4 color = texture2D(uSampler2, aTextureCoord+vec2(timeFactor/100.0, timeFactor/100.0));
    vec3 offset = vec3(0.0, 0.0, color.b*0.05*sin(timeFactor/50.0));
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);
	vTextureCoord = aTextureCoord;
}

