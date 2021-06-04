import {CGFappearance, CGFobject} from '../lib/CGF.js';

export class MyRock extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param  {integer} slices - number of slices around Y axis
   * @param  {integer} stacks - number of stacks along Y axis, from the center to the poles (half of rock)
   */
  constructor(scene, slices, stacks, scale, rotation) {
    super(scene);
    this.latDivs = stacks * 2;
    this.longDivs = slices;
    this.appearence = new CGFappearance(scene);
    this.appearence.setAmbient(0.2,0.2,0.2,1.0);
    this.appearence.setDiffuse(0.4,0.4,0.4,1.0);
    this.scale = scale;
    this.rotation = rotation;

    this.initBuffers();
  }

  /**
   * @method initBuffers
   * Initializes the rock buffers
   */
  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    var phi = 0;
    var theta = 0;
    var phiInc = Math.PI / this.latDivs;  // Latitude - Cima/Baixo
    var thetaInc = (2 * Math.PI) / this.longDivs; // Longitude - Ao longo de equador
    var latVertices = this.longDivs + 1;


    // build an all-around stack at a time, starting on "north pole" and proceeding "south"
    for (let latitude = 0; latitude <= this.latDivs; latitude++) {
      var sinPhi = Math.sin(phi);
      var cosPhi = Math.cos(phi);

      var firstVert = [];

      // in each stack, build all the slices around, starting on longitude 0
      theta = 0;
      for (let longitude = 0; longitude <= this.longDivs; longitude++) {
        //--- Vertices coordinates
        var x = Math.cos(theta) * sinPhi;
        var y = cosPhi;
        var z = Math.sin(-theta) * sinPhi;

        var maxOffset = 0.3;
        var offset = Math.random() * maxOffset + (1-maxOffset);
        if(longitude == 0){
            firstVert = [x * offset, y * offset, z * offset];
        }
    
        if(longitude == this.longDivs){
            this.vertices.push(...firstVert);
        } else {
            this.vertices.push(x * offset, y * offset, z * offset);
        }

        //--- Indices
        if (latitude < this.latDivs && longitude < this.longDivs) {
          var current = latitude * latVertices + longitude;
          var next = current + latVertices;
          // pushing two triangles using indices from this round (current, current+1)
          // and the ones directly south (next, next+1)
          // (i.e. one full round of slices ahead)
          
          this.indices.push( current + 1, current, next);
          this.indices.push( current + 1, next, next +1);
        }

        //--- Normals
        // at each vertex, the direction of the normal is equal to 
        // the vector from the center of the rock to the vertex.
        // in a rock of radius equal to one, the vector length is one.
        // therefore, the value of the normal is equal to the position vectro
        this.normals.push(x, y, z);
        theta += thetaInc;

        //--- Texture Coordinates
        // To be done... 
        // May need some additional code also in the beginning of the function.
        this.texCoords.push(longitude/this.longDivs, latitude/this.latDivs);
      }
      phi += phiInc;
    }


    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }

  display(){
      this.appearence.apply();
      this.scene.pushMatrix();
      this.scene.rotate(this.rotation,0,1,0);
      this.scene.scale(...this.scale);
      super.display();
      this.scene.popMatrix();
  }
}
