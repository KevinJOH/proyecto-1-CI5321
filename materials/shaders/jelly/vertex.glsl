precision highp float;

in vec3 position;

uniform mat4 projectionMatrix;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform float u_time;
uniform float u_clickTime;
uniform vec2 u_clickPosition;

out vec3 v_positionWorld;
out float v_depth;

void main() {
    v_positionWorld = (modelMatrix * vec4(position, 1.0)).xyz;
    vec3 pos = position;
    v_depth = gl_Position.z / gl_Position.w;
    
    if (u_clickTime >= 0.0) {
      float t = u_time - u_clickTime;
      if (t <= 2.0) {
        vec2 clickPos = (u_clickPosition * 2.0 - 1.0) * vec2(projectionMatrix[0][0], projectionMatrix[1][1]);
        float distance = length(pos.xy - clickPos);
        float wave = sin(5.0 * distance - 15.0 * t) * exp(-5.0 * distance);
        pos.y += wave * 0.15;
        pos.x += wave * 0.15;
        pos.z += wave * 0.15; 
      }
    }

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(pos, 1.0);
}
