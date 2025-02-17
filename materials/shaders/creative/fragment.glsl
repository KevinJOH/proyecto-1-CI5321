precision highp float;

uniform float u_time;
uniform vec2 u_resolution;

out vec4 fragColor;

void main(){
  vec2 uv = gl_FragCoord.xy / u_resolution;
  // Toon shading simple: cuantiza el color en 3 niveles
  float levels = 3.0;
  vec3 color = vec3(floor(uv * levels) / levels, 0.0);
  fragColor = vec4(color, 1.0);
}