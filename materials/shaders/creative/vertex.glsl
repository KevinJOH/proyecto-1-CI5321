precision highp float;

in vec3 position;

uniform mat4 projectionMatrix;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform float u_time;

out vec3 v_positionWorld;
out vec3 v_normalWorld;

void main() {
    v_positionWorld = (modelMatrix * vec4(position, 1.0)).xyz;
    v_normalWorld = normalize(mat3(modelMatrix) * position);

    vec3 pos = position;

    vec2 waveOrigin = vec2(0, 0);

    float distance = length(pos.xy - waveOrigin);

    float wave = sin(6.0 * distance - 4.0 * u_time) * exp(-1.5 * distance);

    pos.y += wave * 0.1;
    pos.x += wave * 0.1;
    pos.z += wave * 0.1;

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(pos, 1.0);
}