import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();


	}
	
	initBuffers() {
		this.vertices = [
			0.5,0.5,0.5,    //0
            0.5,0.5,-0.5,   //1
            0.5,-0.5,0.5,   //2
            0.5,-0.5,-0.5,  //3
            -0.5,0.5,0.5,   //4
            -0.5,0.5,-0.5,  //5
            -0.5,-0.5,0.5,  //6
            -0.5,-0.5,-0.5  //7
		];

        this.vertices = [];
        this.normals = [];
        for(var x = -1; x <= 1; x+=2){
            for(var y = -1; y <= 1; y+=2){
                for(var z = -1; z <= 1; z+=2){
                    this.vertices.push(0.5*x,0.5*y,0.5*z);
                    this.vertices.push(0.5*x,0.5*y,0.5*z);
                    this.vertices.push(0.5*x,0.5*y,0.5*z);
                    this.normals.push(1*x,0,0);
                    this.normals.push(0,1*y,0);
                    this.normals.push(0,0,1*z);
                }
            }
        }

        //Counter-clockwise reference of vertices
        var tmp = [
            0,1,2, // plano A
            1,3,2,

            7,3,1, // plano B
            1,5,7,

            6,7,5, // plano C
            5,4,6,

            0,2,4, // plano D
            4,2,6,

            5,1,0, // plano E
            5,0,4,

            2,3,7, // plano F
            7,6,2
        ];

        this.indices = [];
        for(var i = 0; i < tmp.length; i += 3){
            for(var j = 0; j < 3; ++j){
                this.indices.push(tmp[i]*3+j, tmp[i+1]*3+j, tmp[i+2]*3+j);
            }
        }

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
