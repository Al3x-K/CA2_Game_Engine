import GameObject from "./gameobject.js";
import Renderer from "./renderer.js";
import Physics from "./physics.js";

class Particle extends GameObject
{
    constructor(x,y,width,height, color, duration, image) // image is optional
    {
        super(x,y); // call the constructor of the parent class
        this.duration = duration; // how long the particle will last
        this.addComponent(new Renderer(color, width, height, image)); // add a renderer component
        this.addComponent(new Physics({x:0,y:0},{x:0,y:0})); // add a physics component
    }

    update(deltaTime) // override the update method
    {
        this.duration -= deltaTime; // decrement the duration
        if(this.duration <= 0) // if the duration is less than or equal to 0
        {
            this.game.destroy(this); // destroy the particle
        }

        super.update(deltaTime); // call the update method of the parent class
    }
}

export default Particle;