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
  vec3 color = vec3(0.082, 0.576, 0.788);

  if (u_clickTime >= 0.0) {
    float t = u_time - u_clickTime;
    if (t <= 2.0) {
      float distance = length(uv - u_clickPosition);
      float wave = sin(60.0 * distance - 5.0 * t) * exp(-5.0 * distance);
      color += vec3(0.2 * wave); 
    }
  }

  fragColor = vec4(color, 1.0f);
}