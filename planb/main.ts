import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

class App {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;
  private geometry: THREE.BoxGeometry;
  private material: THREE.ShaderMaterial;
  private mesh: THREE.Mesh;
  private startTime: number;
  private clickTime: number;
  private clickPosition: THREE.Vector2;

  private camConfig = {
    fov: 75,
    aspect: window.innerWidth / window.innerHeight,
    near: 0.1,
    far: 1000,
  };

  constructor() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      this.camConfig.fov,
      this.camConfig.aspect,
      this.camConfig.near,
      this.camConfig.far
    );

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    });
    if (!this.renderer.capabilities.isWebGL2) {
      console.warn('WebGL 2.0 is not available on this browser.');
    }
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.enableZoom = false;
    const resolution = new THREE.Vector2(window.innerWidth, window.innerHeight);

    this.geometry = new THREE.BoxGeometry(1, 1, 1, 64, 64, 64); // Usando BoxGeometry con más segmentos
    this.material = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        projectionMatrix: { value: this.camera.projectionMatrix },
        viewMatrix: { value: this.camera.matrixWorldInverse },
        modelMatrix: { value: new THREE.Matrix4() },

        u_time: { value: 0.0 },
        u_resolution: { value: resolution },
        u_clickTime: { value: -1.0 },
        u_clickPosition: { value: new THREE.Vector2(-1.0, -1.0) },
      },
      glslVersion: THREE.GLSL3,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
    this.camera.position.z = 1.5;

    this.startTime = Date.now();
    this.clickTime = -1;
    this.clickPosition = new THREE.Vector2(-1.0, -1.0);
    this.onWindowResize();

    this.onWindowResize = this.onWindowResize.bind(this);
    this.animate = this.animate.bind(this);
    this.onDocumentClick = this.onDocumentClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);

    window.addEventListener('resize', this.onWindowResize);
    window.addEventListener('click', this.onDocumentClick);
    window.addEventListener('keydown', this.onKeyDown);

    this.animate();
  }

  private animate(): void {
    requestAnimationFrame(this.animate);
    const elapsedTime = (Date.now() - this.startTime) / 1000;
    this.material.uniforms.u_time.value = elapsedTime;
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  private onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.material.uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
  }

  private onDocumentClick(event: MouseEvent): void {
    this.clickTime = (Date.now() - this.startTime) / 1000;
    this.clickPosition.set(event.clientX / window.innerWidth, 1.0 - event.clientY / window.innerHeight);
    this.material.uniforms.u_clickTime.value = this.clickTime;
    this.material.uniforms.u_clickPosition.value.copy(this.clickPosition);
  }

  private onKeyDown(event: KeyboardEvent): void {
    const zoomPosition = 0.1;
    console.log(this.camera.position.z);
    switch (event.key) {
      case 'ArrowUp':
        if (this.camera.position.z > 1.5){
          this.camera.position.z -= zoomPosition;
        } 
        break;
      case 'ArrowDown':
        if (this.camera.position.z <= 5.0){
          this.camera.position.z += zoomPosition;
        }
        break;
    }
  }
}

const myApp = new App();
