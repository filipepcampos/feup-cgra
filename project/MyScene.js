import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MyMovingObject } from "./MyMovingObject.js";
import { MySphere } from "./MySphere.js";
import { MyCubeMap } from "./MyCubeMap.js";
import { MyCubeMapTexture } from "./MyCubeMapTexture.js";
import { MyCylinder } from "./MyCylinder.js";
import { MyFish } from "./MyFish.js";
import { MySeaFloor } from "./MySeaFloor.js";
import { MyNest } from "./MyNest.js";
import { MyWaterSurface } from "./MyWaterSurface.js";
import { MyRock } from "./MyRock.js";

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
        this.initCubeMap();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.incompleteSphere = new MySphere(this, 16, 8);
        this.movingObject = new MyMovingObject(this);
        this.cylinder = new MyCylinder(this, 32);
        this.sphere = new MySphere(this, 64, 64);

        this.fish = new MyFish(this);
        this.seaFloor = new MySeaFloor(this, 20, 50, 3);
        this.nest = new MyNest(this, 3, 30);
        this.waterSurface = new MyWaterSurface(this, 100, 50);


        // THIS IS JUST FOR DEBUG
        this.debugRockPleaseDeleteThis = new MyRock(this, 10, 10);

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
        // Debug 
        this.sphereAppearance.loadTexture("./images/earth.jpg");
        this.sphereAppearance.setTextureWrap('REPEAT', 'REPEAT');

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.selectedCubeMapTexture = 0;
        this.displaySphere = false;
        this.displayCylinder = false;
        this.displayMovingObject = false;
        this.scaleFactorMovingObject = 1.0;
        this.speedFactorMovingObject = 1.0;
    }

    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }

    initCameras() {
        this.camera = new CGFcamera(1.5, 0.1, 500, vec3.fromValues(2, 3, 2), vec3.fromValues(0, 2, 0));
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
        var text="Keys pressed: ";
        var keysPressed=false;

        if (this.gui.isKeyPressed("KeyW")) {
            text+=" W ";
            keysPressed=true;
            this.movingObject.accelerate(0.1);
            this.fish.accelerate(0.1);
        }

        if (this.gui.isKeyPressed("KeyS")) {
            text+=" S ";
            keysPressed=true;
            this.movingObject.accelerate(-0.1);
            this.fish.accelerate(-0.1);
        }

        if (this.gui.isKeyPressed("KeyA")) {
            text+=" A ";
            keysPressed=true;
            this.movingObject.turn(0.2);
            this.fish.turn(0.2);
        }

        if (this.gui.isKeyPressed("KeyD")) {
            text+=" D ";
            keysPressed=true;
            this.movingObject.turn(-0.2);
            this.fish.turn(-0.2);
        }

        if (this.gui.isKeyPressed("KeyR")) {
            text+=" R ";
            keysPressed=true;
            this.movingObject.reset();
            this.fish.reset();
        }

        if (keysPressed)
                console.log(text);

    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        //To be done... It is done. Is it done?
        this.checkKeys();
        this.movingObject.update();
        this.fish.update(t);
        this.waterSurface.update(t);
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

        this.sphereAppearance.apply();
        // ---- BEGIN Primitive drawing section

        //This sphere does not have defined texture coordinates
        if(this.displaySphere) this.sphere.display();

        if(this.displayCylinder) this.cylinder.display();
    
        if (this.displayMovingObject) this.movingObject.display(this.scaleFactorMovingObject);

        this.fish.display(this.scaleFactorMovingObject);
        this.seaFloor.display();
        this.nest.display();
        this.waterSurface.display();


        this.pushMatrix();
        // TODO THIS IS JUST FOR DEBUG ///////////////////////////////////////
        this.translate(0, 5, 0);
        this.debugRockPleaseDeleteThis.display();
        this.popMatrix();
        ///////////////////////////////////////////////////////////////////
        

        this.cubeMap.display(this.camera.position);

        // ---- END Primitive drawing section
    }
}