import * as THREE from 'three';

/**
 * Agrega interacción de clic a un objeto en la escena para cambiar el color de la luz.
 * @param scene La escena de Three.js.
 * @param camera La cámara de Three.js.
 * @param renderer El renderizador de Three.js.
 * @param blinnPhongMaterial El material Blinn-Phong con la luz a modificar.
 */
export function enableClickInteraction(
  scene: THREE.Scene,
  camera: THREE.Camera,
  renderer: THREE.Renderer,
  blinnPhongMaterial: THREE.RawShaderMaterial,
  jellyMaterial: THREE.RawShaderMaterial
  
) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  function handleCubeClick(event: MouseEvent) {
    // Convertir las coordenadas del mouse a espacio de NDC (-1 a 1)
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Actualizar el raycaster con la posición del mouse
    raycaster.setFromCamera(mouse, camera);

    // Obtener los objetos intersectados
    const intersects = raycaster.intersectObjects(scene.children);

    for (const intersect of intersects) {
      if ((intersect.object as THREE.Mesh).material === blinnPhongMaterial) {
        // Generar un color aleatorio para la luz
        const newColor = new THREE.Color(Math.random(), Math.random(), Math.random());
        blinnPhongMaterial.uniforms.u_lightColor.value = newColor;
        console.log(`Nuevo color de luz: ${newColor.getHexString()}`);
        break; // Salimos después de cambiar el color
      }
      if ((intersect.object as THREE.Mesh).material === jellyMaterial) {
        // Guardar el tiempo y posición del clic en los uniforms del shader
        jellyMaterial.uniforms.u_clickTime.value = performance.now() / 1000;
        jellyMaterial.uniforms.u_clickPosition.value.set(mouse.x, mouse.y);
        console.log(`Gelatina impactada en NDC: (${mouse.x}, ${mouse.y})`); 
        break;
      }
    }

  }

  // Agregar el evento de clic al renderer
  renderer.domElement.addEventListener('click', handleCubeClick);
}