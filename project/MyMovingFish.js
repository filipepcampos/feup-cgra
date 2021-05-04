import { MyFish } from "./MyFish.js";
import { MyMovingObject } from "./MyMovingObject.js";

export class MyMovingFish extends MyMovingObject{
    constructor(scene){
        super(scene, new MyFish(scene));

        this.verticalSpeed = 0.0;
        this.maxVerticalSpeed = 0.1;
        this.maxVerticalPosition = 5;
        this.minVerticalPosition = 2.3;

        this.bigFinAngle = 0.0;
        this.bigFinMinAngularVelocity = 0.1;
        this.bigFinAngularVelocity = this.bigFinMinAngularVelocity;

        this.leftFinAngle = 0.0;
        this.rightFinAngle = 0.0;
        this.sideFinAngularVelocity = 0.1;

        this.lastTurnVal = 0.0;
    }

    update(time) {
        super.update(time);
        this.position[1] += this.verticalSpeed;
        // Make sure minVerticalPosition <= position[1] <= maxVerticalPosition
        this.position[1] = this.position[1] < this.minVerticalPosition ? this.minVerticalPosition : 
                (this.position[1] > this.maxVerticalPosition ? this.maxVerticalPosition : this.position[1]);
                
        this.bigFinAngle += this.bigFinAngularVelocity;

        if(this.lastTurnVal >= 0){
            this.leftFinAngle += this.sideFinAngularVelocity;
        }
        if(this.lastTurnVal <= 0){
            this.rightFinAngle += this.sideFinAngularVelocity;
        }

        this.lastTurnVal = 0.0;
    }

    turn(val){
        super.turn(val);
        this.lastTurnVal = val;
    }

    accelerate(val){
        super.accelerate(val);
        this.bigFinAngularVelocity = this.speed < this.bigFinMinAngularVelocity ? this.bigFinMinAngularVelocity : this.speed;
    }

    reset(){
        super.reset();
        this.position = [0, 5, 0];
    }

    moveUp(){
        if(this.verticalSpeed < this.maxVerticalSpeed){
            this.verticalSpeed += this.maxVerticalSpeed;
        }
    }

    moveDown(){
        if(this.verticalSpeed > -this.maxVerticalSpeed){
            this.verticalSpeed -= this.maxVerticalSpeed;
        }
    }

    display(scaleFactor){
        this.scene.pushMatrix();
        this.scene.translate(0, this.position[1], 0);
        super.display(scaleFactor, this.bigFinAngle, this.leftFinAngle, this.rightFinAngle);
        this.scene.popMatrix();
    }
}