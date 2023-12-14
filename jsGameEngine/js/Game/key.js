import GameObject from "../Engine/gameobject.js";
import Renderer from "../Engine/renderer.js";
import Physics from "../Engine/physics.js";
import { Images } from "../Engine/resources.js";

class Key extends GameObject
{
    constructor(x,y)
    {
        super(x,y);
        this.renderer = new Renderer('yellow', 50, 30, Images.key);
        this.addComponent(this.renderer);
        this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }));
        this.tag = 'collectible';
        this.value = 1;
    }
}

export default Key;
