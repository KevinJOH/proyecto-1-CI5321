precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec3 u_lightPosition;
uniform vec3 u_lightColor;
uniform vec3 u_materialColor;
uniform vec3 u_specularColor;
uniform float u_shininess;
uniform vec3 u_cameraPosition;

in vec3 v_normalWorld;
in vec3 v_positionWorld;

out vec4 fragColor;

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    vec3 color = u_materialColor; // Color base

    float gelEffect = 0.5 + 0.5 * sin(u_time * 2.0);
    color *= mix(vec3(0.8, 0.3, 0.6), vec3(0.3, 0.7, 0.9), gelEffect);

    float alpha = 0.85 + 0.15 * sin(3.0 * u_time + length(v_positionWorld.xy));

    vec3 N = normalize(v_normalWorld);
    vec3 L = normalize(u_lightPosition - v_positionWorld);
    vec3 V = normalize(u_cameraPosition - v_positionWorld);
    vec3 H = normalize(L + V);

    vec3 ambient = 0.2 * color;
    float diff = max(dot(N, L), 0.0);
    vec3 diffuse = diff * u_lightColor * color;

    float spec = pow(max(dot(N, H), 0.0), u_shininess);
    vec3 specular = spec * u_specularColor;

    color = ambient + diffuse + specular;

    fragColor = vec4(color, alpha);
}