import GameObject from "../Engine/gameobject.js";
import Renderer from "../Engine/renderer.js";
import Physics from "../Engine/physics.js";


class Spikes extends GameObject
{
    constructor(x,y,image)
    {
        super(x,y);
        this.renderer = new Renderer('yellow', 30, 30, image);
        this.addComponent(this.renderer);
        this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 },{ x: 0, y: 0 }));
        this.tag = 'spikes';
        this.image = image;
    }
}
export default Spikes;