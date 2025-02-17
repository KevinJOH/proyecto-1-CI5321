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

in vec3 vNormal;
in vec3 vPosition;
in vec2 vUv;

out vec4 fragColor;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec3 color = vec3(0.5, 0.5, 0.5); // Color base azul

  // Efecto visual de la onda
  if (u_clickTime >= 0.0) {
    float t = u_time - u_clickTime;
    if (t >= 0.0 && t <= 1.5) {
      float distance = length(uv - u_clickPosition);
      float wave = sin(40.0 * distance - 2.0 * t) * exp(-2.0 * distance) * exp(-3.0 * t);
      color += vec3(0.3 * wave, 0.1 * wave, -0.1 * wave); 
    }
  }

  vec3 N = normalize(vNormal);
  vec3 L = normalize(u_lightPosition - vPosition);
  vec3 V = normalize(u_cameraPosition - vPosition);
  vec3 H = normalize(L + V);

  // Componente ambiental
  vec3 ambient = 0.25 * u_materialColor;

  // Componente difusa
  float diff = max(dot(N, L), 0.0);
  vec3 diffuse = diff * u_lightColor * u_materialColor;

  // Componente especular
  float spec = pow(max(dot(N, H), 0.0), u_shininess);
  vec3 specular = spec * u_specularColor;

  color += ambient + diffuse + specular;

  fragColor = vec4(color, 1);
}