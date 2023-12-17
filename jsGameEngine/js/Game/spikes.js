import GameObject from "../Engine/gameobject.js";
import Renderer from "../Engine/renderer.js";
import Physics from "../Engine/physics.js";


class Spikes extends GameObject 
{
    constructor(x,y,image)
    {
        super(x,y); // Call the super constructor
        this.renderer = new Renderer('yellow', 30, 30, image); // Add a renderer component to the object
        this.addComponent(this.renderer); 
        this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 },{ x: 0, y: 0 })); // Add a physics component to the object
        this.tag = 'spikes'; // Set the tag of the object
        this.image = image; // Set the image of the object
    }
}
export default Spikes;