import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { CGFcamera2 } from "./CGFcamera2.js";
import { MyMovingObject } from "./MyMovingObject.js";
import { MySphere } from "./MySphere.js";
import { MyCubeMap } from "./MyCubeMap.js";
import { MyCubeMapTexture } from "./MyCubeMapTexture.js";
import { MyCylinder } from "./MyCylinder.js";
import { MyMovingFish } from "./MyMovingFish.js";
import { MySeaFloor } from "./MySeaFloor.js";
import { MyNest } from "./MyNest.js";
import { MyWaterSurface } from "./MyWaterSurface.js";
import { MyRockSet } from "./MyRockSet.js";
import { MyPillar } from "./MyPillar.js";
import { MyModifiedPillar } from "./MyModifiedPillar.js";
import { MyRotatedPyramid } from "./MyRotatedPyramid.js";
import { MyRuin } from "./MyRuin.js";
import { MyAlgaeSet } from "./MyAlgaeSet.js";

/**
* MyScene
* @constructor
*/
export class MyScene extends CGFscene {
    constructor() {
        super();
    }

    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        this.initObjects();

        this.initMaterials();

        //Objects connected to MyInterface
        this.displayAxis = false;
        this.selectedCubeMapTexture = 0;
        this.displaySphere = false;
        this.displayCylinder = false;
        this.displayMovingObject = false;
        this.scaleFactorMovingObject = 1.0;
        this.speedFactorMovingObject = 1.0;
    }

    initObjects(){
        this.initCubeMap();
        this.axis = new CGFaxis(this);

        // Part A
        this.movingObject = new MyMovingObject(this, new MyRotatedPyramid(this, 10, 10));
        this.cylinder = new MyCylinder(this, 32);
        this.sphere = new MySphere(this, 64, 64);

        // Part B
        this.fish = new MyMovingFish(this);
        this.seaFloor = new MySeaFloor(this, 20, 50, 3);
        this.nest = new MyNest(this, 3, 30);
        this.waterSurface = new MyWaterSurface(this, 100, 50);
        this.rockSet = new MyRockSet(this, 50);
        this.pillars = [new MyModifiedPillar(this, 16, [15, -2]),
                        new MyModifiedPillar(this, 16, [15, 2]),
                        new MyModifiedPillar(this, 16, [8, -2]),
                        new MyModifiedPillar(this, 16, [8,  2])];
        this.ruin = new MyRuin(this, 16, [-5, -5]);
        this.algaeSet = new MyAlgaeSet(this, 50);
    }
    
    initMaterials(){
        this.defaultAppearance = new CGFappearance(this);
		this.defaultAppearance.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setEmission(0,0,0,1);
		this.defaultAppearance.setShininess(120);

		this.sphereAppearance = new CGFappearance(this);
		this.sphereAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.sphereAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.sphereAppearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.sphereAppearance.setShininess(120);
        this.sphereAppearance.loadTexture("./images/earth.jpg");
        this.sphereAppearance.setTextureWrap('REPEAT', 'REPEAT');
    }

    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].setAmbient(0.3, 0.3, 0.3, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }

    initCameras() {
        this.camera = new CGFcamera2(1.5, 0.1, 500, vec3.fromValues(2, 3, 2), vec3.fromValues(0, 2, 0));
    }

    initCubeMap() {
        this.cubeMap = new MyCubeMap(this);

        this.demoCubeMapTexture = new MyCubeMapTexture(this, "./images/demo_cubemap", ["bottom.png","top.png","back.png","left.png","front.png","right.png"]);
        this.testCubeMapTexture = new MyCubeMapTexture(this, "./images/test_cubemap", ["ny.png","py.png","nz.png","px.png","pz.png","nx.png"]);
        this.underwaterCubeMapTexture = new MyCubeMapTexture(this, "./images/underwater_cubemap", ["bottom.jpg","top.jpg","back.jpg","left.jpg","front.jpg","right.jpg"]);
 
        this.cubeMap.setTexture(this.underwaterCubeMapTexture);

        this.cubeMapTextures = [
            this.underwaterCubeMapTexture,
            this.demoCubeMapTexture,
            this.testCubeMapTexture
        ]
 
        this.cubeMapTextureList = {
            "Underwater Cube Map": 0,
            "Demo Cube Map": 1,
            "Test Cube Map": 2,
        };
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setEmission(0,0,0,1);
        this.setShininess(10.0);
    }

    setCubeMapTexture(n){
        this.cubeMap.setTexture(this.cubeMapTextures[n]);
    }

    checkKeys()  {
        if (this.gui.isKeyPressed("KeyW")) {
            this.movingObject.accelerate(0.1);
            this.fish.accelerate(0.1);
        }

        if (this.gui.isKeyPressed("KeyS")) {
            this.movingObject.accelerate(-0.1);
            this.fish.accelerate(-0.1);
        }

        if (this.gui.isKeyPressed("KeyA")) {
            this.movingObject.turn(0.2);
            this.fish.turn(0.2);
        }

        if (this.gui.isKeyPressed("KeyD")) {
            this.movingObject.turn(-0.2);
            this.fish.turn(-0.2);
        }

        if (this.gui.isKeyPressed("KeyR")) {
            this.movingObject.reset();
            this.fish.reset();
            this.rockSet.resetRocks();
            this.nest.reset();
        }

        if (this.gui.isKeyPressed("KeyP")){
            this.fish.moveUp();
        }

        if (this.gui.isKeyPressed("KeyL")) {
            this.fish.moveDown();
        }

        if (this.gui.isKeyPressed("KeyC")) {
            if(this.fish.hasRock() && this.fish.canDropRock()){
                var rock = this.fish.getRock();
                this.fish.removeRock();
                this.nest.addRock(rock);
            } else {
                if(this.fish.canHaveRock()) {
                    var rock = this.rockSet.getNearestRock(this.fish.position[0], this.fish.position[2]);
                    if(rock != null) this.fish.addRock(rock);
                }
            }
        }
    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.movingObject.update();
        this.fish.update(t);
        this.waterSurface.update(t);
        this.algaeSet.update(t);
        this.checkKeys();
    }

    updateMovingObjectSpeedScale(speedScale){
        this.movingObject.updateSpeedScale(speedScale);
        this.fish.updateSpeedScale(speedScale);
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        this.defaultAppearance.apply();

        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        // ---- BEGIN Primitive drawing section

        //This sphere does not have defined texture coordinates

        // Part A
        this.sphereAppearance.apply();
        if(this.displaySphere) this.sphere.display();
        if(this.displayCylinder) this.cylinder.display();
        this.defaultAppearance.apply();
        if (this.displayMovingObject) this.movingObject.display(this.scaleFactorMovingObject);

        // Part B
        this.fish.display(this.scaleFactorMovingObject);
        this.seaFloor.display();
        this.nest.display();
        this.waterSurface.display();
        this.rockSet.display();
        this.ruin.display();
        this.algaeSet.display();
        for (var i = 0; i < this.pillars.length; ++i) this.pillars[i].display();
        this.cubeMap.display(this.camera.position);

        // ---- END Primitive drawing section
    }
}