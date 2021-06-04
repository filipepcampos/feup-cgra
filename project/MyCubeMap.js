import { CGFobject, CGFtexture, CGFappearance } from "../lib/CGF.js";
import { MyQuad } from "./MyQuad.js";
import { MyCubeMapTexture } from "./MyCubeMapTexture.js";


export class MyCubeMap extends CGFobject{
    constructor(scene) {
		super(scene);
        this.faces = [];
        for(var i = 0; i < 6; ++i){
            this.faces.push(new MyQuad(this.scene));
        }

        this.appearance = new CGFappearance(scene);
		this.appearance.setAmbient(0, 0, 0, 1);
		this.appearance.setDiffuse(0, 0, 0, 1);
		this.appearance.setSpecular(0, 0, 0, 1);
		this.appearance.setEmission(1.0,1.0,1.0,1.0);

        this.texture = null;
	}

    toRadian(angle){
      return angle*Math.PI/180;
    }

    setTexture(newTexture){
        this.texture = newTexture;
    }

    cubeDisplay(){
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
                if(this.texture != null){
                    this.texture.getTexture(nCube).bind();
                }                
                this.faces[nCube].display();
                if(this.texture != null){
                    this.texture.getTexture(nCube).unbind();
                }                
                this.scene.popMatrix();
                nCube++;
            }      
        }
    }

    display(cameraPosition){
        this.scene.pushMatrix();
        this.appearance.apply();
        this.scene.translate(cameraPosition[0], cameraPosition[1], cameraPosition[2]);
        this.scene.scale(500,500,500);     
        this.cubeDisplay();
        this.scene.popMatrix();
    }
}