import * as THREE from 'three';

/**
 * Agrega interacción de clic a un objeto en la escena para cambiar el color de la luz.
 * @param scene
 * @param camera
 * @param renderer
 * @param blinnPhongMaterial
 * @param creativeMaterial
 */
export function enableClickInteraction(
  scene: THREE.Scene,
  camera: THREE.Camera,
  renderer: THREE.Renderer,
  blinnPhongMaterial: THREE.RawShaderMaterial,
  jellyMaterial: THREE.RawShaderMaterial,
  creativeMaterial: THREE.RawShaderMaterial
  
) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const geometries = [
    new THREE.DodecahedronGeometry(1),
    new THREE.SphereGeometry(1, 32, 32),
    new THREE.TorusGeometry(1, 0.4, 16, 100),
    new THREE.CylinderGeometry(1, 1, 2, 32),
    new THREE.ConeGeometry(1, 2, 32),
    new THREE.TetrahedronGeometry(1),
    new THREE.BoxGeometry(1, 1, 1)
  ];

  function handleCubeClick(event: MouseEvent) {

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;


    raycaster.setFromCamera(mouse, camera);


    const intersects = raycaster.intersectObjects(scene.children);

    for (const intersect of intersects) {
      const mesh = intersect.object as THREE.Mesh;
      if ((intersect.object as THREE.Mesh).material === blinnPhongMaterial) {
        const newColor = new THREE.Color(Math.random(), Math.random(), Math.random());
        blinnPhongMaterial.uniforms.u_lightColor.value = newColor;
        console.log(`Nuevo color de luz: ${newColor.getHexString()}`);
        break;
      }
      if (mesh.material === creativeMaterial) {

        const newColor = new THREE.Color(Math.random(), Math.random(), Math.random());
        creativeMaterial.uniforms.u_lightColor.value = newColor;
        console.log(`Nuevo color de luz: ${newColor.getHexString()}`);


        const currentGeometryIndex = geometries.findIndex(geometry => geometry.uuid === mesh.geometry.uuid);
        const nextGeometryIndex = (currentGeometryIndex + 1) % geometries.length;
        mesh.geometry.dispose(); // Liberar memoria de la geometría anterior
        mesh.geometry = geometries[nextGeometryIndex];
        
        break;
      }
    }
  }
  class ClickInteractionHandler {
    private clickTime: number;
    private clickPosition: THREE.Vector2;
    private startTime: number;
    private material: THREE.RawShaderMaterial;
  
    constructor(material: THREE.RawShaderMaterial) {
      this.clickTime = 0;
      this.clickPosition = new THREE.Vector2();
      this.startTime = Date.now();
      this.material = material;
    }
    public onDocumentClick(event: MouseEvent): void {
      this.clickTime = (Date.now() - this.startTime) / 1000;
      this.clickPosition.set(event.clientX / window.innerWidth, 1.0 - event.clientY / window.innerHeight);
      console.log(`Gelatina impactada: (${mouse.x}, ${mouse.y})`); 
      this.material.uniforms.u_clickTime.value = this.clickTime;
      this.material.uniforms.u_clickPosition.value.copy(this.clickPosition);
    }
  }
  const clickHandler = new ClickInteractionHandler(jellyMaterial);
  document.addEventListener('click', (event) => clickHandler.onDocumentClick(event));  // Agregar el evento de clic al renderer
  renderer.domElement.addEventListener('click', handleCubeClick);
}