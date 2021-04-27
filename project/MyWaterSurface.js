import { CGFobject, CGFtexture, CGFshader } from '../lib/CGF.js';
import { MyPlane } from './MyPlane.js';

export class MyWaterSurface extends CGFobject {
    constructor(scene, divisions, width){
        super(scene);
        this.plane = new MyPlane(scene, divisions, 0, 1, 0, 1);
        this.width = width;
        this.initMaterials();
    }

    update(time) {
        this.timeFactor = (time / 100) % 1000;
    }
    
    initMaterials(){
        this.shader = new CGFshader(this.scene.gl, "./shaders/waterSurface.vert", "./shaders/waterSurface.frag");
        this.distortionMap = new CGFtexture(this.scene, "./images/distortionmap.png");
        this.seaTexture = new CGFtexture(this.scene, "./images/pier.jpg");
    }

    display(){
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_WRAP_S, this.scene.gl.MIRRORED_REPEAT);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_WRAP_T, this.scene.gl.MIRRORED_REPEAT);

        this.shader.setUniformsValues({uSampler2: 1, timeFactor: this.timeFactor});
        this.seaTexture.bind(0);
        this.distortionMap.bind(1);
        this.scene.setActiveShader(this.shader);
        this.scene.pushMatrix();
        this.scene.translate(0, 20, 0);
        this.scene.scale(this.width, 1, this.width);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.plane.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);
    }
}