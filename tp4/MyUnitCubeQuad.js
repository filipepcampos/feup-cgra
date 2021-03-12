import {CGFappearance, CGFobject, CGFtexture} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';

export class MyUnitCubeQuad extends CGFobject {
	constructor(scene, textures) {
		super(scene);
        this.faces = [];
        this.displayTextures = false;

        for(var i = 0; i < 6; ++i){
            this.faces.push(new MyQuad(this.scene));
        }

        if (textures !== undefined){
            this.textures = textures;
            this.initMaterials();
            this.displayTextures = true;
        }
	}

    toRadian(angle){
      return angle*Math.PI/180;
    }

    display(){
        var nCube = 0;
        for(var i = 0; i < 3; ++i){
            var values;
            var rot;
            switch(i){
                case 0: values = [1, 0, 0]; rot = [-90]; break;
                case 1: values = [0, 1, 0]; rot = [0, 90, 180, -90]; break;
                case 2: values = [1, 0, 0]; rot = [90]; break;
            }
            for(var j = 0; j < rot.length; ++j){
                if (this.displayTextures) {
                    this.materials[nCube].apply();
                    this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
                }
                this.scene.pushMatrix();
                this.scene.rotate(this.toRadian(rot[j]), ...values);
                this.scene.translate(0, 0, 0.5);
                this.faces[nCube++].display();
                this.scene.popMatrix();
            }      
        }
    }

    initMaterials(){
        this.materials = [];
        for(var i = 0; i < this.textures.length; ++i){
            this.materials.push(new CGFappearance(this.scene));
            this.materials[i].setTexture(this.textures[i]);
            this.materials[i].setTextureWrap('REPEAT', 'REPEAT');
        }
    }
}