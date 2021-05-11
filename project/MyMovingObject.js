import { CGFobject } from "../lib/CGF.js";

export class MyMovingObject extends CGFobject{
    constructor(scene, object){
        super(scene);
        this.speed = 0;
        this.position = [0, 0, -0.5];
        this.orientation = 0.0;
        this.speedScale = 1.0;
        this.object = object;
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

    display(scale){
        this.scene.pushMatrix();
        this.scene.translate(this.position[0], 0.0, this.position[2]);
        this.scene.scale(scale, scale, scale);
        this.scene.rotate(this.orientation, 0, 1, 0);

        var extra_arguments = []; // TODO: Document this
        for(var i = 1; i < arguments.length; ++i){
            extra_arguments.push(arguments[i]);
        }
        this.object.display(...extra_arguments);
        this.scene.popMatrix();
    }

    updateSpeedScale(speedScale) {
        this.speedScale = speedScale;
    }
}