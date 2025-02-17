precision highp float;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 modelMatrix;
uniform float u_time;

in vec3 position;
in vec3 normal;
in vec2 uv;

out vec3 vNormal;
out vec3 vPosition;
out vec2 vUv;

void main() {
  vUv = uv;  // Pasamos las coordenadas UV al fragment shader
  vNormal = normalize(mat3(modelMatrix) * normal); // Normal en espacio de mundo
  vPosition = (modelMatrix * vec4(position, 1.0)).xyz; // Posición en espacio de mundo

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}