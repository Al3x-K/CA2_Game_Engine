import GameObject from "../Engine/gameobject.js";
import Renderer from "../Engine/renderer.js";
import Physics from "../Engine/physics.js";
import { Images } from "../Engine/resources.js";

class Gem extends GameObject
{
    constructor(x,y)
    {
        super(x,y);
        this.renderer = new Renderer('yellow', 20, 15, Images.gem);
        this.addComponent(this.renderer);
        this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 },{ x: 0, y: 0 }));
        this.tag = 'collectible';
    }
}

export default Gem;
