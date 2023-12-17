import GameObject from "../Engine/gameobject.js";
import Renderer from "../Engine/renderer.js";
import Physics from "../Engine/physics.js";
import { Images } from "../Engine/resources.js";

class WinCon extends GameObject
{
    constructor(x,y) // The constructor is called when the object is created
    {
        super(x,y); // Call the super constructor
        this.renderer = new Renderer('yellow', 50, 50, Images.chest); // Add a renderer component to the object
        this.addComponent(this.renderer); 
        this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 },{ x: 0, y: 0 })); // Add a physics component to the object
        this.tag = 'winCon';
    }
}
export default WinCon;