import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import RAF from '../../../utils/RAF';
import ExampleObject from "./ExampleObject"

class MainThreeScene {
    private camera: THREE.PerspectiveCamera;
    private scene: THREE.Scene;
    private renderer: THREE.WebGLRenderer;
    private controls: OrbitControls;
    private isActive: Boolean

    constructor() {
        this.bind();
        this.isActive = false;

        // RENDERER SETUP
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.debug.checkShaderErrors = true;

        this.scene = new THREE.Scene();


        // CAMERA AND ORBIT CONTROLLER
        this.camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 0, 10);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enabled = true; // You can adjust this based on your config.
        this.controls.maxDistance = 1500;
        this.controls.minDistance = 0;


    }

    init(container: HTMLElement) {
        if (this.isActive) return
        this.isActive = true

        container.appendChild(this.renderer.domElement);

        // MAIN SCENE INSTANCE



        ExampleObject.init(this.scene)

        // RENDER LOOP AND WINDOW SIZE UPDATER SETUP
        window.addEventListener("resize", () => this.resizeCanvas());
        RAF.subscribe('threeSceneUpdate', () => this.update());
    }

    update() {
        ExampleObject.update()

        this.renderer.render(this.scene, this.camera);
    }

    resizeCanvas() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

    }

    private bind() {
        this.resizeCanvas = this.resizeCanvas.bind(this);
        this.update = this.update.bind(this);
        this.init = this.init.bind(this);
    }
}

const _instance = new MainThreeScene();
export default _instance;
