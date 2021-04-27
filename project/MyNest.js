import { CGFappearance, CGFobject } from "../lib/CGF.js";
import { MyCylinder } from "./MyCylinder.js";

export class MyNest extends CGFobject {
    constructor(scene, radius){
        super(scene);

        this.radius = radius;
        this.cylinder = new MyCylinder(scene, 30);
    }

    display(){
        this.scene.pushMatrix();
        this.scene.scale(this.radius, 1, this.radius);
        this.scene.translate(0, 2, 0);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.cylinder.display();
        this.scene.popMatrix();
    }
}