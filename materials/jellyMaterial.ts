import * as THREE from 'three';
import vertexShader from './shaders/jelly/vertex.glsl';
import fragmentShader from './shaders/jelly/fragment.glsl';

const jellyMaterial = new THREE.RawShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    u_time: { value: 0 },
    u_smoothness: { value: 0 },
    u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    u_clickTime: { value: 0 },
    u_clickPosition: { value: new THREE.Vector2(0, 0) },
  },
  glslVersion: THREE.GLSL3,
});

export default jellyMaterial;