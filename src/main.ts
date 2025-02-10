import * as THREE from 'three';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

class App {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private geometry: THREE.PlaneGeometry;
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

    const resolution = new THREE.Vector2(window.innerWidth, window.innerHeight);

    this.geometry = new THREE.PlaneGeometry(2, 2);
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

    window.addEventListener('resize', this.onWindowResize);
    window.addEventListener('click', this.onDocumentClick);

    this.animate();
  }

  private animate(): void {
    requestAnimationFrame(this.animate);
    const elapsedTime = (Date.now() - this.startTime) / 1000;
    this.material.uniforms.u_time.value = elapsedTime;
    this.renderer.render(this.scene, this.camera);
  }

  private onWindowResize(): void {
    this.camera.aspect = this.camConfig.aspect;
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
}

const myApp = new App();
