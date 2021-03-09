import {CGFobject} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';

export class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {
		super(scene);
        this.faces = [];
        for(var i = 0; i < 6; ++i){
            this.faces.push(new MyQuad(this.scene));
        }
	}

    toRadian(angle){
      return angle*Math.PI/180;
    }

    display(){
        var nCube = 0;
        for(var i = 0; i < 2; ++i){
            var values;
            var rot;
            switch(i){
                case 0: values = [1, 0, 0]; rot = [90, -90]; break;
                case 1: values = [0, 1, 0]; rot = [180, 90, 0, -90]; break;
            }
            for(var j in rot){
                this.scene.pushMatrix();
                this.scene.rotate(this.toRadian(rot[j]), ...values);
                this.scene.translate(0, 0, 0.5);
                this.faces[nCube++].display();
                this.scene.popMatrix();
            }      
        }
    }
}