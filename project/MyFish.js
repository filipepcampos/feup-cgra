import { CGFobject, CGFappearance } from "../lib/CGF.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTriangle } from "./MyTriangle.js";
import { MySphere } from "./MySphere.js";

export class MyFish extends CGFobject{
    constructor(scene){
        super(scene);
        this.reset();

        // Objects
        this.body = new MySphere(scene, 64, 64); // TODO: Stacks / slices could be parameters
        this.bigFin = new MyTriangleBig(scene);
        this.topFin = new MyTriangle(scene);
        this.eye = new MySphere(scene, 16, 16); // TODO This could be parameters
        this.lateralFin = new MyTriangle(scene);

        // Parameters
        this.scale = 1.0;
        this.bodyLength = 1.5; // TODO: This could be a parameter
        this.bodyWidth = 0.8;
        this.bigFinScale = 0.5;
        this.topFinScale = 0.5;
        this.eyeScale = 0.15;
        this.lateralFinScale = 1.0;
        this.speedScale = 1.0;

        this.initMaterials();
    }
    
    initMaterials(){
        /*this.eyeAppearence = new CGFappearance(this.scene);
		this.eyeAppearance.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.eyeAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.eyeAppearance.setSpecular(0.2, 0.4, 0.8, 1.0);
		this.eyeAppearance.setShininess(120);*/
    }

    update() {
        this.position[0] += Math.sin(this.orientation) * this.speed * this.speedScale;
        this.position[2] += Math.cos(this.orientation) * this.speed * this.speedScale;
    }

    turn(val) {
        this.orientation += val;
    }
    
    accelerate(val){
        this.speed += val;
        this.speed = Math.max(this.speed, 0);
    }

    reset(){
        this.speed = 0;
        this.position = [0, 0, -0.5];
        this.orientation = 0.0;
    }

    display(){
        // Movement, Scale and Orientation
        this.scene.pushMatrix();
        this.scene.translate(this.position[0], 0.0, this.position[2]);
        this.scene.scale(this.scale, this.scale, this.scale);
        this.scene.rotate(this.orientation, 0, 1, 0);

        // Body
        this.scene.pushMatrix();
        this.scene.scale(this.bodyWidth, 1, this.bodyLength);
        this.body.display();
        this.scene.popMatrix();

        
        // Left Eye
        this.scene.pushMatrix();
        this.scene.translate(this.bodyWidth - 0.3, 0.2, this.bodyLength/2 + 0.3);
        this.scene.scale(this.eyeScale, this.eyeScale, this.eyeScale);
        //this.eyeAppearence.apply();
        this.eye.display();
        this.scene.popMatrix();

        // Right Eye
        this.scene.pushMatrix();
        this.scene.translate(-this.bodyWidth + 0.3, 0.2, this.bodyLength/2 + 0.3);
        this.scene.scale(this.eyeScale, this.eyeScale, this.eyeScale);
        this.eye.display();
        this.scene.popMatrix();

        // Big Fin
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -this.bodyLength-2*this.bigFinScale);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.scale(this.bigFinScale, this.bigFinScale, this.bigFinScale);
        this.bigFin.display();
        this.scene.popMatrix();

        // Small Fin
        this.scene.pushMatrix();
        this.scene.translate(0, 0.8+this.topFinScale, 0.2);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.scale(this.topFinScale, this.topFinScale, this.topFinScale);
        this.topFin.display();
        this.scene.popMatrix();

        // Left Fin
        this.scene.pushMatrix();
        this.scene.translate(this.bodyWidth+this.lateraFinScale, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.scale(this.lateralFinScale, this.lateralFinScale, this.lateralFinScale);
        this.lateralFin.display();
        this.scene.popMatrix();
        
        // Right Fin
        this.scene.pushMatrix();
        this.scene.translate(-this.bodyWidth, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.scale(this.lateralFinScale, this.lateralFinScale, this.lateralFinScale);
        this.lateralFin.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }

    updateSpeedScale(speedScale) {
        this.speedScale = speedScale;
    }
}