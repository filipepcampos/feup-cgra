#ifdef GL_ES
precision highp float;
#endif

uniform float green;

void main() {  
    gl_FragColor = vec4(0.0, green, 0.0, 1.0);
}