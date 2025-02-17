precision highp float;

in vec3 position;

uniform mat4 projectionMatrix;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform float u_inflate;

void main() {
  vec3 pos = position;
  // Efecto de "globo": aumenta o reduce el tamaño de la geometría
  pos *= (1.0 + u_inflate * 0.5);
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(pos, 1.0);
}