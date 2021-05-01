#ifdef GL_ES
precision highp float;
#endif

varying vec4 coords;
varying vec4 normal;
varying vec2 vTextureCoord;

uniform sampler2D uSampler;

void main() {
	vec4 color = texture2D(uSampler, vTextureCoord);

	if (coords.z > 0.04)
		gl_FragColor = vec4(0.953, 0.871, 0.506, 1.0);
	else
	{
		gl_FragColor = color;
	}
}



