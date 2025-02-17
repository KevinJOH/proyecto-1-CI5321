precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform float u_clickTime;
uniform vec2 u_clickPosition;
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
    vec3 color = u_materialColor; // Usar el color del material como base

    // **Efecto de onda en el color cuando se hace clic**
    if (u_clickTime >= 0.0) {
        float t = u_time - u_clickTime;
        if (t <= 2.0) { // Duración de la onda
            float distance = length(uv - u_clickPosition);
            float wave = sin(50.0 * distance - 6.0 * t) * exp(-4.0 * distance);
            color += u_lightColor * 0.3 * wave;
        }
    }

    // **Cálculo de iluminación con Phong**
    vec3 N = normalize(v_normalWorld);
    vec3 L = normalize(u_lightPosition - v_positionWorld);
    vec3 V = normalize(u_cameraPosition - v_positionWorld);
    vec3 H = normalize(L + V);

    vec3 ambient = 0.2 * u_materialColor;

    float diff = max(dot(N, L), 0.0);
    vec3 diffuse = diff * u_lightColor * u_materialColor;

    float spec = pow(max(dot(N, H), 0.0), u_shininess);
    vec3 specular = spec * u_specularColor;

    color = ambient + diffuse + specular;

    fragColor = vec4(color, 1.0);
}
