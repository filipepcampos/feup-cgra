import { CGFappearance } from "../lib/CGF.js";
import { MyCylinder } from "./MyCylinder.js";

export class MyPillar extends MyCylinder{
    constructor(scene, slices, position) {
        super(scene, slices);
        this.position = position;
        this.initMaterials();
    }

    initMaterials() {
        this.appearence = new CGFappearance(this.scene);
        this.appearence.loadTexture("./images/pier_column.jpg");
    }

    display(){
        this.appearence.apply();
        this.scene.pushMatrix();
        this.scene.translate(this.position[0], 0, this.position[1]);
        this.scene.scale(0.5,10,0.5);
        super.display();
        this.scene.popMatrix();
        this.scene.setDefaultAppearance();
    }

}