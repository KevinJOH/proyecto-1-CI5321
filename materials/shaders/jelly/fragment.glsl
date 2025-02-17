precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform float u_clickTime;
uniform vec2 u_clickPosition;

in vec3 vPosition;
in vec3 vNormal;
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

  fragColor = vec4(color, 1.0f);
}
