import { MyPyramid } from "./MyPyramid.js";

export class MyRotatedPyramid extends MyPyramid{
    display(){
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        super.display();
        this.scene.popMatrix();
    }
}