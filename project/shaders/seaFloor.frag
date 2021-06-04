#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
varying vec2 vTextureCoord;

void main() {
    vec4 mapColor = texture2D(uSampler2, vTextureCoord);
    
    gl_FragColor = texture2D(uSampler, vTextureCoord);
    if(mapColor.r < 0.5){
        gl_FragColor *= 0.8 + 0.2*mapColor;
        // mapColor = [0, 1]
        // -> [0.8, 1]
    }
}