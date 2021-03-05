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

    makeFace(face, n){
        var verts = [];
        for(var i = -1; i <= 1; i+=2){
            for(var j = -1; j <= 1; j+=2){
                switch(face){
                    case "x": verts.push(0.5*n, 0.5*i, 0.5*j); break;
                    case "y": verts.push(0.5*i, 0.5*n, 0.5*j); break;
                    case "z": verts.push(0.5*i, 0.5*j, 0.5*n); break;
                }
            }
        }
        var norm = [];
        switch(face){
            case "x": norm = [1*n,0,0]; break;
            case "y": norm = [0,1*n,0]; break;
            case "z": norm = [0,0,1*n]; break;
        }
        var norms = [];
        for(var i = 0; i < 4; ++i){
            norms.push(...norm);
        }
        return [verts, norms]
    }
	
	initBuffers() {
        this.vertices = [];
        this.normals = [];

        // Vão ser criadas 6 faces, x, -x, y, -y, z, -z
        var faces = ["x","y","z"];
        for(var i = 0; i < 3; ++i){
            for(var j = -1; j <= 1; j+=2){
                var result = this.makeFace(faces[i], j);
                this.vertices.push(...result[0]);
                this.normals.push(...result[1]);
            }
        }
        
        // Cada face é composta por 2 triangulos (6 pontos)
        this.indices = [];
        for(var i = 0; i < 6; ++i){
            if(i == 1 || i == 2 || i == 5){
                this.indices.push(4*i+2, 4*i+1, 4*i);
                this.indices.push(4*i+1, 4*i+2, 4*i+3);
            }
            if(i == 0 || i == 3 || i == 4){
                this.indices.push(4*i, 4*i+1, 4*i+2);
                this.indices.push(4*i+3, 4*i+2, 4*i+1);
            }            
        }

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

    updateBuffers(){

    }
}
