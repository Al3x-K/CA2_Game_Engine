import Renderer from "./renderer.js";


class Camera 
{
  
    constructor(target, width, height) 
    {       
        this.target = target; // The target is the object that the camera will follow
        // The width and height are the dimensions of the camera.
        this.width = width; 
        this.height = height; 
        this.x = 0; // The x-coordinate of the camera  
        this.y = 0; // The y-coordinate of the camera
    }

    // The update method adjusts the camera's position to center on the target object. It's called typically in the game's update loop.
    update() 
    {
        // The x-coordinate of the camera is set to the target's x-coordinate, plus half of the target's width (which centers the camera on the target), and then minus half of the camera's width (which adjusts for the camera's size).
        this.x = this.target.x + this.target.getComponent(Renderer).width / 2 - this.width / 2;
        // The y-coordinate of the camera is set in the same way, but with the target's and camera's heights instead of their widths.
        this.y = this.target.y + this.target.getComponent(Renderer).height / 2 - this.height / 2;
    }
}

// The Camera class is then exported as the default export of this module.
export default Camera;
