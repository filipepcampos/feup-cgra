import { CGFobject } from "../../lib/CGF.js";
import { MyRock } from "./MyRock.js";

export class MyRockSet extends CGFobject{
    constructor(scene, numberOfRocks){
        super(scene);
        this.numberOfRocks = numberOfRocks;
        this.rocks = [];
        for (var i = 0; i < numberOfRocks; ++i) {
            var position = [Math.random()*50 - 25, Math.random()*50 - 25];
            var scale = [Math.random()*0.3+0.1, Math.random()*0.2+0.1, Math.random()*0.3+0.1];
            var rotation = Math.random()*2*Math.PI;
            this.rocks.push(new MyRock(scene, 6, 6, position, scale, rotation));
        }
    }

    display(){
        for(var i = 0; i < this.numberOfRocks; ++i){
            this.scene.pushMatrix();
            this.rocks[i].display();
            this.scene.popMatrix();
        }
    }
}