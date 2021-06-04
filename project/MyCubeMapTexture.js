import { CGFtexture } from "../lib/CGF.js";

export class MyCubeMapTexture {
    constructor(scene, baseUrl, textNames){
        this.textures = [];
        for(var i = 0; i < textNames.length; ++i){
            this.textures.push(new CGFtexture(scene, baseUrl + "/" + textNames[i]));
        }
    }

    getTextures(){
        return this.textures;
    }

    getTexture(i){
        return this.textures[i];
    }
}