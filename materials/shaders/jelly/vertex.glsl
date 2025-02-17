precision highp float;

in vec3 position;

uniform mat4 projectionMatrix;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform float u_time;
uniform float u_clickTime;
uniform vec2 u_clickPosition;

out vec3 v_positionWorld;
out vec3 v_normalWorld;
out float v_depth;

void main() {
    v_positionWorld = (modelMatrix * vec4(position, 1.0)).xyz;
    v_normalWorld = normalize(mat3(modelMatrix) * position); // Pasar normales transformadas

    vec3 pos = position;

    // **Efecto gelatina cuando se hace click**
    if (u_clickTime >= 0.0) {
        float t = u_time - u_clickTime;
        if (t <= 2.0) { // Solo se ejecuta por 2 segundos
            vec2 clickPos = (u_clickPosition * 2.0 - 1.0) * vec2(projectionMatrix[0][0], projectionMatrix[1][1]);
            float distance = length(v_positionWorld.xy - clickPos);
            float wave = sin(6.0 * distance - 10.0 * t) * exp(-3.0 * distance);
            
            pos.y += wave * 0.07;
            pos.x += wave * 0.07;
            pos.z += wave * 0.07;
        }
    }

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(pos, 1.0);
}