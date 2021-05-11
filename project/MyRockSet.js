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
            this.rocks.push([new MyRock(scene, 16, 16, scale, rotation), position, true]);
        }
    }

    distance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    getNearestRock(x, z) {
        var minDist = 1e9;
        var nearestRockIndex = -1;
        for(var i = 0; i < this.rocks.length; ++i){
            if (this.rocks[i][2]) {     // Maybe irrelevant
                var dist = this.distance(this.rocks[i][1][0], this.rocks[i][1][1], x, z);
                if(dist < minDist && dist < 1.5){
                    nearestRockIndex = i;
                    minDist = dist;
                }
            }
        }
        if(nearestRockIndex != -1) {
            this.rocks[nearestRockIndex][2] = false;
            return this.rocks[nearestRockIndex][0];
        }
        return null;
    }

    resetRocks(){
        for(var i = 0; i < this.rocks.length; ++i) {
            this.rocks[i][2] = true;
        }
    }

    display(){
        for(var i = 0; i < this.numberOfRocks; ++i){
            if(this.rocks[i][2]){
                this.scene.pushMatrix();
                this.scene.translate(this.rocks[i][1][0], 1.6, this.rocks[i][1][1]); // TODO This is a bit ugly
                this.rocks[i][0].display();
                this.scene.popMatrix();
            }                
        }
    }
}