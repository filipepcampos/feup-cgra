import { CGFobject, CGFtexture } from "../lib/CGF.js";

export class MyCylinder extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;
        this.initBuffers();
    }

    initBuffers(){
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        this.vertices.push(0,1,0);
        this.normals.push(0,1,0);
        this.texCoords.push(0,0); // This might be stupid

        this.vertices.push(0,0,0);
        this.normals.push(0,-1,0);
        this.texCoords.push(0,0); // This might be stupid

        var xTexCoord = 0;
        var deltaTexCoord = 1/this.slices;

        for(var i = 0; i < this.slices; i++){

            var x = Math.sin(ang);
            var xl = Math.sin(ang+alphaAng);
            var z = Math.cos(ang);
            var zl = Math.cos(ang+alphaAng);

            this.vertices.push(x, 0, -z);  // 0
            this.vertices.push(xl, 0, -zl);// 1
            this.vertices.push(x, 1, -z);  // 2
            this.vertices.push(xl, 1, -zl);// 3

            this.vertices.push(x, 0, -z);  // 4
            this.vertices.push(xl, 0, -zl);// 5
            this.vertices.push(x, 1, -z);  // 6
            this.vertices.push(xl, 1, -zl);// 7

            this.normals.push(x, 0, z);
            this.normals.push(xl, 0, zl);
            this.normals.push(x, 0, z);
            this.normals.push(xl, 0, zl);

            this.normals.push(0, -1, 0);
            this.normals.push(0, -1, 0);
            this.normals.push(0, 1, 0);
            this.normals.push(0, 1, 0);

            this.indices.push(8*i+2, 8*i+2+2, 8*i+2+1,
                              8*i+2+1, 8*i+2+2, 8*i+2+3,
                              0, 8*i+2+7, 8*i+2+6,
                              1, 8*i+2+4, 8*i+2+5);

            this.texCoords.push(xTexCoord, 1);
            this.texCoords.push(xTexCoord+deltaTexCoord, 1);
            this.texCoords.push(xTexCoord, 0);
            this.texCoords.push(xTexCoord+deltaTexCoord, 0);
            this.texCoords.push(xTexCoord, 1);
            this.texCoords.push(xTexCoord+deltaTexCoord, 1);
            this.texCoords.push(xTexCoord, 0);
            this.texCoords.push(xTexCoord+deltaTexCoord, 0);

            
            xTexCoord += deltaTexCoord;
            ang += alphaAng;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

        
    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}