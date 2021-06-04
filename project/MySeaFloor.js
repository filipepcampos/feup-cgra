import { CGFobject, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";

export class MySeaFloor extends CGFobject{
    constructor(scene, divisions, width, maxHeight){
        super(scene);
        this.scene = scene;
        this.width = width;
        this.maxHeight = maxHeight;
        
        this.plane = new MyPlane(scene, divisions, 0, 4, 0, 4);
        this.initMaterials();
    }

    initMaterials(){
        this.shader = new CGFshader(this.scene.gl, "./shaders/seaFloor.vert", "./shaders/seaFloor.frag");
        this.sandTexture = new CGFtexture(this.scene, "./images/sand/sand.png");
        this.sandMap = new CGFtexture(this.scene, "./images/sand/sandMap.png");
        
        this.shader.setUniformsValues({maxHeight: this.maxHeight, uSampler2: 1});
    }

    display(){
        this.sandTexture.bind(0);
        this.sandMap.bind(1);
        this.scene.setActiveShader(this.shader);
        this.scene.pushMatrix();
        this.scene.scale(this.width, 1, this.width);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.plane.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);
    }
}