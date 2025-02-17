import * as THREE from 'three';
import vertexShader from './shaders/creative/vertex.glsl';
import fragmentShader from './shaders/creative/fragment.glsl';

const creativeMaterial = new THREE.RawShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    u_inflate: { value: 0.0 }, // Controla la inflacion/comprensión de la geometría
    u_time: { value: 0 },
    u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
  },
  glslVersion: THREE.GLSL3,
});

export default creativeMaterial;