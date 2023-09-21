import * as THREE from "three";
import fragShader from "./shaders/dummy.frag"
import vertShader from "./shaders/dummy.vert"

class ExampleObject {
    private scene: THREE.Scene | undefined;
    private texLoader: THREE.TextureLoader;
    private dummy: THREE.Mesh;

    constructor() {
        this.bind()
        this.texLoader = new THREE.TextureLoader()
        this.dummy = new THREE.Mesh(new THREE.IcosahedronGeometry(), new THREE.MeshNormalMaterial())
    }

    init(scene: THREE.Scene) {
    // init(scene) {
        this.scene = scene
        this.scene.add(this.dummy)

        const matcapTex1 = this.texLoader.load("/assets/textures/black-metal-matcap.png")
        matcapTex1.colorSpace = THREE.SRGBColorSpace

        this.dummy.material = new THREE.ShaderMaterial({
            uniforms:{
                u_metalMatCap:{
                    value:matcapTex1
                }
            },
            vertexShader: vertShader,
            fragmentShader: fragShader,
        })


    }

    update() {
        this.dummy.rotateX(0.01)
        this.dummy.rotateY(0.005)
    }

    bind() {
    }

}

const _instance = new ExampleObject()
export default _instance