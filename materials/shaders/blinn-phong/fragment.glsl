precision highp float;

in vec3 vNormal;
in vec3 vPosition;
in vec2 vUv;

uniform vec3 u_lightPosition;
uniform vec3 u_lightColor;
uniform vec3 u_materialColor;
uniform vec3 u_specularColor;
uniform float u_shininess;
uniform vec3 u_cameraPosition;

out vec4 fragColor;

void main() {
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

  fragColor = vec4(ambient + diffuse + specular, 1);
}