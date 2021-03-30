import { CGFobject } from "../lib/CGF.js";
import { MyUnitCubeQuad } from "./MyUnitCubeQuad.js";


export class MyCubeMap extends CGFobject{
    constructor(scene){
        super(scene);
        this.cube = new MyUnitCubeQuad(scene);
    }

    display(cameraPosition){
        
        this.scene.translate(cameraPosition[0], cameraPosition[1], cameraPosition[2]);
        this.scene.scale(50,50,50);
        
        this.cube.display();
    }
}