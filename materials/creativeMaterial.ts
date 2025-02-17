import * as THREE from 'three';
import vertexShader from './shaders/creative/vertex.glsl';
import fragmentShader from './shaders/creative/fragment.glsl';
import blinnPhongMaterial from './blinnPhongMaterial';

const creativeMaterial = new THREE.RawShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    u_time: { value: 0 },
    u_smoothness: { value: 0 },
    u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    u_clickTime: { value: 0 },
    u_clickPosition: { value: new THREE.Vector2(0, 0) },
    u_lightPosition: { value: new THREE.Vector3(10, 10, 10) },
    u_lightColor: { value: new THREE.Color(1, 1, 1) },
    u_materialColor: { value: new THREE.Color(0.6, 0.2, 0.2) },
    u_specularColor: { value: new THREE.Color(1, 1, 1) },
    u_shininess: { value: 30 },
    u_cameraPosition: { value: new THREE.Vector3(0, 0, 5) },
  },
  glslVersion: THREE.GLSL3,
});
export default creativeMaterial;

export function handleCubeClick(intersectedObject: { material: THREE.RawShaderMaterial; }) {
  if (intersectedObject.material === blinnPhongMaterial) {
    const newColor = new THREE.Color(Math.random(), Math.random(), Math.random());
    blinnPhongMaterial.uniforms.u_lightColor.value = newColor;
  }
}