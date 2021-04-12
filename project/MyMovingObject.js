import { CGFobject } from "../lib/CGF.js";
import { MyPyramid } from "./MyPyramid.js";

export class MyMovingObject extends CGFobject{
    constructor(scene){
        super(scene);
        this.reset();
        this.pyramid = new MyPyramid(scene, 10, 10);
    }

    update() {
        this.position[0] += Math.sin(this.orientation) * this.speed;
        this.position[2] += Math.cos(this.orientation) * this.speed;
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
        this.scene.pushMatrix();
        this.scene.translate(...this.position);
        this.scene.rotate(this.orientation, 0, 1, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.pyramid.display();
        this.scene.popMatrix();
    }
}