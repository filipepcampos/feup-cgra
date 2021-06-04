import { CGFappearance, CGFobject, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyModifiedCylinder } from "./MyModifiedCylinder.js";

export class MyRuin extends CGFobject {
    constructor(scene, slices, position) {
        super(scene);
        this.position = position;
        this.n_cylinders = 3;
        this.cylinders = [];
        for(var i = 0; i < this.n_cylinders; ++i){
            this.cylinders.push(new MyModifiedCylinder(scene, slices, 2));
        }
        this.initMaterials();
    }

    initMaterials() {
        this.appearence = new CGFappearance(this.scene);
        this.appearence.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.appearence.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.appearence.loadTexture("./images/hieroglyphs.jpg");
    }

    display(){
        this.appearence.apply();
        var cylinderHeight = 6 / this.n_cylinders;

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/8, 1, 0, 0)
        for(var i = 0; i < this.n_cylinders; i++){
            this.scene.pushMatrix();
            this.scene.translate(this.position[0], i*cylinderHeight, this.position[1]);
            this.scene.scale(0.5, 1, 0.5);
            this.scene.scale(1, cylinderHeight, 1);
            this.cylinders[i].display();
            this.scene.popMatrix();
        }
        this.scene.popMatrix();

        cylinderHeight = 6 / this.n_cylinders
        this.scene.pushMatrix();
        this.scene.translate(4, 0, -0.5);
        this.scene.rotate(Math.PI/12, 0, 0, 1);
        for(var i = 0; i < this.n_cylinders; i++){
            this.scene.pushMatrix();
            this.scene.translate(this.position[0], i*cylinderHeight, this.position[1]);
            this.scene.scale(0.5, 1, 0.5);
            this.scene.scale(1, cylinderHeight, 1);
            this.cylinders[i].display();
            this.scene.popMatrix();
        }
        this.scene.popMatrix();

        this.scene.setDefaultAppearance();
        this.scene.setActiveShader(this.scene.defaultShader);
    }
}