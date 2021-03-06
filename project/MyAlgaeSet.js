import { CGFobject, CGFshader } from "../lib/CGF.js";
import { MyAlgae } from "./MyAlgae.js";

export class MyAlgaeSet extends CGFobject{
    constructor(scene, numberOfAlgae){
        super(scene);
        this.numberOfAlgae = numberOfAlgae;
        this.algae = [];
        for (var i = 0; i < numberOfAlgae; ++i) {  
            var numberLeafs = Math.random()*4+1;
            var directionX = Math.random() < 0.5 ? -1 : 1;
            var directionZ = Math.random() < 0.5 ? -1 : 1;
            var mainPosition = [directionX*(Math.random()*21+3), 1.4, directionZ*(Math.random()*21+3)];
            var color = Math.random()*0.8+0.1;
            var scale = [Math.random()*0.05+0.1, Math.random()*1+0.1, Math.random()*0.05+0.1];
            this.algae.push([new MyAlgae(scene, 5, 5, color), mainPosition, scale]);
            for(var j = 0; j < numberLeafs - 1; ++j){
                scale = [Math.random()*0.05+0.1, Math.random()*1+0.1, Math.random()*0.05+0.1];
                var angle = Math.random()*2*Math.PI;
                var radius = Math.random()*0.5 + 0.1;
                var position = [mainPosition[0] + Math.cos(angle)*radius, mainPosition[1], mainPosition[2] + Math.sin(angle)*radius];
                this.algae.push([new MyAlgae(scene, 5, 5, color), position, scale]);
            }
        }
        this.initMaterials();
    }

    initMaterials(){
        this.shader = new CGFshader(this.scene.gl, "./shaders/algaeShader.vert", "./shaders/algaeShader.frag");
    }

    update(t){
        for(var i = 0; i < this.algae.length; ++i)
            this.algae[i][0].update(t);
    }


    display(){
        this.scene.setActiveShader(this.shader);
        for(var i = 0; i < this.algae.length; ++i){
            this.scene.pushMatrix();
            this.scene.translate(...this.algae[i][1]);
            this.scene.scale(...this.algae[i][2]);
            this.algae[i][0].display(this.shader);
            this.scene.popMatrix();         
        }
        this.scene.setActiveShader(this.scene.defaultShader);
    }
}