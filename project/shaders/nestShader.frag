#ifdef GL_ES
precision highp float;
#endif

struct lightProperties {
    vec4 position;                  
    vec4 ambient;                   
    vec4 diffuse;                   
    vec4 specular;                  
    vec4 half_vector;
    vec3 spot_direction;            
    float spot_exponent;            
    float spot_cutoff;              
    float constant_attenuation;     
    float linear_attenuation;       
    float quadratic_attenuation;    
    bool enabled;                   
};

#define NUMBER_OF_LIGHTS 8
uniform lightProperties uLight[NUMBER_OF_LIGHTS];

uniform sampler2D uSampler;
uniform sampler2D uHeightSampler;
uniform sampler2D uNormalSampler;
varying vec2 vTextureCoord;
varying vec3 vPos;
varying vec3 vNormal;

void main() {
    vec4 heightColor = texture2D(uHeightSampler, vTextureCoord);
    vec4 normalColor = texture2D(uNormalSampler, vTextureCoord);
    vec4 color = texture2D(uSampler, vTextureCoord);

    vec3 norm = normalize(vNormal);

    vec3 result = vec3(0.0, 0.0, 0.0);
    for(int i = 0; i < NUMBER_OF_LIGHTS; ++i){
        vec3 lightDir = normalize(uLight[i].position.xyz - vPos);
        float diff = max(dot(norm, lightDir), 0.0);
        vec3 diffuse = diff * uLight[i].diffuse.rgb;
        vec3 result = result + uLight[i].ambient.rgb + diffuse;
        gl_FragColor = vec4(result * color.rgb, 1.0);
    }
}