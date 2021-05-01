#ifdef GL_ES
precision highp float;
#endif

varying vec4 coords;
varying vec4 normal;
varying vec2 vTextureCoord;
varying vec4 vFinalColor;

uniform sampler2D uSampler;

void main() {
	vec4 color = texture2D(uSampler, vTextureCoord);

	if (coords.z > 0.0)
		gl_FragColor = vec4(0.953, 0.871, 0.506, 1.0) * vFinalColor;
	else
	{
		gl_FragColor = color * vFinalColor;
	}
}



