import GameObject from "../Engine/gameobject.js";
import Renderer from "../Engine/renderer.js";
import Physics from "../Engine/physics.js";
import { Images } from "../Engine/resources.js";

class Gem extends GameObject
{
    constructor(x,y)
    {
        super(x,y); // Call the super constructor
        this.renderer = new Renderer('yellow', 20, 15, Images.gem); // Add a renderer component to the object
        this.addComponent(this.renderer); // Add a renderer component to the object
        this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 },{ x: 0, y: 0 })); // Add a physics component to the object
        this.tag = 'collectible'; // Set the tag of the object
    }
}

export default Gem;
