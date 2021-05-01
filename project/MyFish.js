import { CGFobject, CGFappearance, CGFtexture, CGFshader } from "../lib/CGF.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTriangle } from "./MyTriangle.js";
import { MySphere } from "./MySphere.js";
import { MyPyramid } from "./MyPyramid.js";

export class MyFish extends CGFobject{
    constructor(scene){
        super(scene);
        this.reset();

        // Objects
        this.body = new MySphere(scene, 64, 64); // TODO: Stacks / slices could be parameters
        this.bigFin = new MyTriangleBig(scene);
        this.topFin = new MyTriangle(scene);
        this.eye = new MySphere(scene, 16, 16); // TODO This could be parameters
        this.lateralFin = new MyTriangle(scene);
        this.gills = new MyPyramid(scene, 10, 10);

        // Parameters
        this.scale = 0.33;
        this.bodyLength = 1.5; // TODO: This could be a parameter
        this.bodyWidth = 0.8;
        this.bigFinScale = 0.5;
        this.topFinScale = 0.5;
        this.eyeScale = 0.15;
        this.lateralFinScale = 0.5;
        this.gillsScale = 1.02;
        this.speedScale = 1.0;

        this.time = 0.0;
        
        this.initMaterials();
    }
    
    initMaterials(){
        this.scalesTexture = new CGFtexture(this.scene, "./images/fish.jpg");
        this.bodyShader = new CGFshader(this.scene.gl, "./shaders/illuminatedBodyShader.vert", "./shaders/illuminatedBodyShader.frag");

        this.finsAppearence = new CGFappearance(this.scene);
        this.finsAppearence.setAmbient(0.843, 0.969, 0.957, 1.0);
        this.finsAppearence.setDiffuse(0.843, 0.969, 0.957, 1.0);
        this.finsAppearence.setSpecular(0.1, 0.1, 0.4, 1.0);

        this.bodyAppearence = new CGFappearance(this.scene);
        this.bodyAppearence.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.bodyAppearence.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.bodyAppearence.setSpecular(0.1,0.1,0.1,1.0);

        this.eyeAppearance = new CGFappearance(this.scene);
		this.eyeAppearance.setAmbient(0.9, 0.9, 0.9, 1.0);
        this.eyeAppearance.setDiffuse(0.9, 0.9, 0.9, 1.0);
        this.eyeAppearance.setSpecular(0.9, 0.9, 0.9, 1.0);
		this.eyeAppearance.setShininess(120);
        this.eyeAppearance.loadTexture("./images/eye.jpg");
    }

    update(time) {
        this.position[0] += Math.sin(this.orientation) * this.speed * this.speedScale;
        this.position[2] += Math.cos(this.orientation) * this.speed * this.speedScale;
        this.time = time / 400;
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
        this.position = [0, 3, 0];
        this.orientation = 0.0;
    }

    display(){
        // Movement, Scale and Orientation
        this.scene.pushMatrix();
        this.scene.translate(this.position[0], 3.0, this.position[2]);
        this.scene.scale(this.scale, this.scale, this.scale);
        this.scene.rotate(this.orientation, 0, 1, 0);

        this.eyeAppearance.apply();
        // Left Eye
        this.scene.pushMatrix();
        this.scene.translate(this.bodyWidth - 0.3, 0.2, this.bodyLength/2 + 0.3);
        this.scene.scale(this.eyeScale, this.eyeScale, this.eyeScale);
        this.scene.rotate(Math.PI-Math.PI/6, 0, 1, 0);
        this.eye.display();
        this.scene.popMatrix();

        // Right Eye
        this.scene.pushMatrix();
        this.scene.translate(-this.bodyWidth + 0.3, 0.2, this.bodyLength/2 + 0.3);
        this.scene.scale(this.eyeScale, this.eyeScale, this.eyeScale);
        this.scene.rotate(Math.PI/6, 0, 1, 0);
        this.eye.display();
        this.scene.popMatrix();

        this.finsAppearence.apply();
        // Big Fin
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -this.bodyLength);
        this.scene.rotate(Math.sin(this.time*0.6)*(20*Math.PI/180), 0, 1, 0);
        this.scene.translate(0, 0, -2*this.bigFinScale);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.scale(this.bigFinScale, this.bigFinScale, this.bigFinScale);
        this.bigFin.display();
        this.scene.popMatrix();

        // Small Fin
        this.scene.pushMatrix();
        this.scene.translate(0, 0.8+this.topFinScale, 0.2);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.scale(this.topFinScale, this.topFinScale, this.topFinScale);
        this.topFin.display();
        this.scene.popMatrix();

        // Left Fin
        this.scene.pushMatrix();
        this.scene.translate(-this.bodyWidth + 0.3, -0.3, this.bodyLength/2);
        this.scene.rotate(Math.PI/4 + Math.PI/6*Math.sin(this.time), 0, 0, 1);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.scale(this.lateralFinScale, this.lateralFinScale, this.lateralFinScale);
        this.scene.translate(-1, 1, 0);
        this.lateralFin.display();
        this.scene.popMatrix();
        
        // Right Fin
        this.scene.pushMatrix();
        this.scene.translate(this.bodyWidth - 0.3, -0.3, this.bodyLength/2);
        this.scene.rotate(-(Math.PI/4 + Math.PI/6*Math.sin(this.time)), 0, 0, 1);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.scale(this.lateralFinScale, this.lateralFinScale, this.lateralFinScale);
        this.scene.translate(-1, 1, 0);
        this.lateralFin.display();
        this.scene.popMatrix();

        // Gills
        this.scene.pushMatrix();
        this.scene.scale(this.gillsScale, this.gillsScale, this.gillsScale);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.gills.display();
        this.scene.popMatrix();


        this.bodyAppearence.apply();
        this.scene.setActiveShader(this.bodyShader);
        // Body
        this.scalesTexture.bind();
        this.scene.pushMatrix();
        this.scene.scale(this.bodyWidth, 1, this.bodyLength);
        this.body.display();
        this.scene.popMatrix();
        this.scalesTexture.unbind();
        this.scene.setActiveShader(this.scene.defaultShader);

        this.scene.popMatrix();
    }

    updateSpeedScale(speedScale) {
        this.speedScale = speedScale;
    }
}