import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import jellyMaterial from '../materials/jellyMaterial';
import blinnPhongMaterial from '../materials/blinnPhongMaterial';
import creativeMaterial from '../materials/creativeMaterial';
import { enableClickInteraction } from './components/controls';

// Creamos la escena, cámara y renderizador 
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Agregamos controles de órbita para poder mover la cámara
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Creamos un cubo y le asignamos un material básico (MeshBasicMaterial)
const geometry = new THREE.BoxGeometry(1, 1, 1);
const basicMaterial = new THREE.MeshBasicMaterial({ color: 0xC0C0C0 }); // Plateado básico

// Creamos un array con los materiales que usaremos:
const materials = [basicMaterial, blinnPhongMaterial, jellyMaterial, creativeMaterial];
let currentMaterialIndex = 0;

// Creamos la malla usando el material básico inicialmente
const mesh = new THREE.Mesh(geometry, materials[currentMaterialIndex]);
scene.add(mesh);

// Listener para detectar la tecla espacio y cambiar de material
window.addEventListener('keydown', (event: KeyboardEvent) => {
  if (event.code === 'Space') {
    // Avanzamos en el array de materiales
    currentMaterialIndex = (currentMaterialIndex + 1) % materials.length;
    mesh.material = materials[currentMaterialIndex];
    console.log("Material actual:", currentMaterialIndex);
  }
});

// Función de animación: rota el cubo y actualiza la escena
function animate(time: number) {
  requestAnimationFrame(animate);
  mesh.rotation.y += 0.01;
  controls.update();
  renderer.render(scene, camera);
  if (currentMaterialIndex === 2) {
    jellyMaterial.uniforms.u_time.value = performance.now() / 1000;
    jellyMaterial.uniforms.u_time.value += 0.01;
    renderer.render(scene, camera);
  }
}

enableClickInteraction(scene, camera, renderer, blinnPhongMaterial, jellyMaterial);
animate(0);