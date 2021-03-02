import {CGFobject} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";

export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
    this.greenDiamond = new MyDiamond(scene);
    this.redTriangle = new MyTriangleSmall(scene);
    this.blueTriangle = new MyTriangleBig(scene);
    this.orangeTriangle = new MyTriangleBig(scene);
    this.purpleTriangle = new MyTriangleSmall(scene);
    this.pinkLeftTriangle = new MyTriangleSmall(scene);
    this.pinkRightTriangle = new MyTriangleSmall(scene);
    this.yellowParallelogram = new MyParallelogram(scene);
	}

  translationMx(Tx, Ty, Tz){
      return [
        1,0,0,0,
        0,1,0,0,
        0,0,1,0,
        Tx,Ty,Tz,1
      ];
    }
  
    toRadian(angle){
      return angle*Math.PI/180;
    }
  
    rotationMx(angle) {
      return [
        Math.cos(this.toRadian(angle)), Math.sin(this.toRadian(angle)),0,0,
        -Math.sin(this.toRadian(angle)),Math.cos(this.toRadian(angle)),0,0,
        0,0,1,0,
        0,0,0,1
      ];
    }

  display(){
      this.scene.pushMatrix();
      this.scene.multMatrix(this.rotationMx(180));
      this.scene.multMatrix(this.translationMx(0,-1,0));
      this.redTriangle.display();
      this.scene.popMatrix();
  
      this.scene.pushMatrix();
      this.scene.multMatrix(this.translationMx(-1,0,0)); 
      this.greenDiamond.display();
      this.scene.popMatrix();
      
      this.scene.pushMatrix();
      this.scene.multMatrix(this.rotationMx(-90));
      this.scene.multMatrix(this.translationMx(2,0,0));
      this.blueTriangle.display();    
      this.scene.popMatrix();
  
      this.scene.pushMatrix();
      this.scene.multMatrix(this.translationMx(0,-2,0));
      this.scene.multMatrix(this.rotationMx(90));
      this.orangeTriangle.display();
      this.scene.popMatrix();
  
      this.scene.pushMatrix();
      this.scene.multMatrix(this.translationMx(1,-1,0));
      this.scene.multMatrix(this.rotationMx(180));
      this.scene.multMatrix(this.translationMx(0,-1,0));
      this.pinkLeftTriangle.display();
      this.scene.popMatrix();
  
      this.scene.pushMatrix();
      this.scene.multMatrix(this.translationMx(2,-1,0));
      this.scene.multMatrix(this.rotationMx(90));
      this.pinkRightTriangle.display();
      this.scene.popMatrix();
  
      this.scene.pushMatrix();
      this.scene.multMatrix(this.translationMx(1,0,0));
      this.purpleTriangle.display();
      this.scene.popMatrix();
  
      this.scene.pushMatrix();
      this.scene.multMatrix([-1,0,0,0,
                      0,1,0,0,
                      0,0,1,0,
                      0,0,0,1]);
      this.scene.multMatrix(this.translationMx(0,1,0));
      this.scene.multMatrix(this.rotationMx(55));
      this.yellowParallelogram.display();
      this.scene.popMatrix();
  }
}