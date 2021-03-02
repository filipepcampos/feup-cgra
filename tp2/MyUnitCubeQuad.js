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
        for(var i = 0; i < 3; ++i){
            for(var j = 1; j <= 2; ++j){
                var values;
                switch(i){
                    case 0: values = [1, 0, 0]; break;
                    case 1: values = [0, 1, 0]; break;
                    case 2: values = [0, 0, 1]; break;
                }
                this.scene.pushMatrix();
                this.scene.rotate(this.toRadian(j==1 ? 90 : -90), ...values);
                this.scene.translate(0, 0, 0.5);
                this.faces[i*j].display();
                this.scene.popMatrix();
            }
        }
    }
}