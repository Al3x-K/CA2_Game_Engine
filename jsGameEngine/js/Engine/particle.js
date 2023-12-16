import GameObject from '../Engine/gameobject.js';
import Renderer from '../Engine/renderer.js';
import Physics from '../Engine/physics.js';


class Particle extends GameObject 
{
  
    constructor(x, y, width, height, color, duration) 
    {
        super(x, y); // Call the super constructor
        this.duration = duration; // The duration of the particle
        this.addComponent(new Renderer(color, width, height)); // Add a renderer component to the particle
        this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 })); // Add a physics component to the particle
    }

    
    update(deltaTime) 
    {
        this.duration -= deltaTime; // Decrement the duration of the particle
        if (this.duration <= 0)  // If the particle is done
        {    
            this.game.destroy(this);// Destroy the particle
        }
        super.update(deltaTime); // Call the super update method
     }
}

export default Particle;
