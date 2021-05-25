import { CGFobject, CGFshader } from "../lib/CGF.js";

export class MyAlgae extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.angle = 0;
        this.angularVelocity = Math.PI/25;
        this.lastTime = 0;
        this.initBuffers();
        this.initMaterials();
    }

    initMaterials(){
        this.shader = new CGFshader(this.scene.gl, "./shaders/algaeShader.vert", "./shaders/algaeShader.frag");
    }

    update(time){
        var t = time / 100;
        this.angle = (this.angle + this.angularVelocity*(t-this.lastTime)) % (Math.PI*2);
        this.lastTime = t;
    }

    display(){
        this.shader.setUniformsValues({angle: this.angle});
        this.scene.setActiveShader(this.shader);
        super.display();
    }
    
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        this.vertices.push(0,1,0);          //0
        this.normals.push(0,1,0);

        for (var i = 0; i < this.slices; i++) {
            var sa=Math.sin(ang)/this.stacks;
            var saa=Math.sin(ang+alphaAng)/this.stacks;
            var ca=Math.cos(ang)/this.stacks;
            var caa=Math.cos(ang+alphaAng)/this.stacks;


            this.vertices.push(ca, 1-1/this.stacks, -sa);     //1
            this.vertices.push(caa, 1-1/this.stacks, -saa);   //2

            // triangle normal computed by cross product of two edges
            var normal= [
                saa-sa,
                ca*saa-sa*caa,
                caa-ca
            ];

            // normalization
            var nsize=Math.sqrt(
                normal[0]*normal[0]+
                normal[1]*normal[1]+
                normal[2]*normal[2]
                );
            
            normal[0]/=nsize;
            normal[1]/=nsize;
            normal[2]/=nsize;

            // push normal once for each vertex of this triangle
            this.normals.push(...normal);
            this.normals.push(...normal);

            this.indices.push(0, (2*i+1) , (2*i+2));
            ang+=alphaAng;
        }
        
        for(var j = 1; j < this.stacks; ++j) {
            ang = 0;
            for(var i = 0; i < this.slices; i++) {
                var sa=Math.sin(ang)*(j+1)/this.stacks;
                var saa=Math.sin(ang+alphaAng)*(j+1)/this.stacks;
                var ca=Math.cos(ang)*(j+1)/this.stacks;
                var caa=Math.cos(ang+alphaAng)*(j+1)/this.stacks;

                this.vertices.push(ca, 1-(j+1)/this.stacks, -sa);     // 0
                this.vertices.push(caa, 1-(j+1)/this.stacks, -saa);   // 1

                // triangle normal computed by cross product of two edges
                var normal= [
                    saa-sa,
                    ca*saa-sa*caa,
                    caa-ca
                ];

                // normalization
                var nsize=Math.sqrt(
                    normal[0]*normal[0]+
                    normal[1]*normal[1]+
                    normal[2]*normal[2]
                    );
                
                normal[0]/=nsize;
                normal[1]/=nsize;
                normal[2]/=nsize;

                // push normal once for each vertex of this triangle
                this.normals.push(...normal);
                this.normals.push(...normal);

                // 2*(j-1)*i + 1, 2*(j-1)*i + 2
                // 2*j*i + 1, 2*j*i +2
               
                this.indices.push(2*((j-1)*this.slices+i)+1, 2*(j*this.slices+i)+2, 2*((j-1)*this.slices+i)+2);
                this.indices.push(2*((j-1)*this.slices+i)+1, 2*(j*this.slices+i)+1, 2*(j*this.slices+i)+2);
                
    
                ang+=alphaAng;
            }
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