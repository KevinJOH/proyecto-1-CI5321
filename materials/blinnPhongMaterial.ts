import * as THREE from 'three';
import vertexShader from './shaders/blinn-phong/vertex.glsl';
import fragmentShader from './shaders/blinn-phong/fragment.glsl';

const blinnPhongMaterial = new THREE.RawShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    u_lightPosition: { value: new THREE.Vector3(10, 10, 10) },
    u_lightColor: { value: new THREE.Color(1, 1, 1) },
    u_materialColor: { value: new THREE.Color(0.6, 0.2, 0.2) },
    u_specularColor: { value: new THREE.Color(1, 1, 1) },
    u_shininess: { value: 30 },
    u_cameraPosition: { value: new THREE.Vector3(0, 0, 5) },
  },
  glslVersion: THREE.GLSL3,
});

export default blinnPhongMaterial;

export function handleCubeClick(intersectedObject: { material: THREE.RawShaderMaterial; }) {
  if (intersectedObject.material === blinnPhongMaterial) {
    const newColor = new THREE.Color(Math.random(), Math.random(), Math.random());
    blinnPhongMaterial.uniforms.u_lightColor.value = newColor;
  }
}
