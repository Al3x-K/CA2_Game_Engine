import GameObject from '../Engine/gameobject.js';
import Renderer from '../Engine/renderer.js';
import Physics from '../Engine/physics.js';

class CollisionBlock extends GameObject 
{
  
    constructor(x, y, width, height, color, id) 
    {
        super(x, y);
        this.addComponent(new Renderer(color, width, height));
        this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }));
        this.tag = 'platform'; 
        this.id = id;
        this.color = color;
    }
  }
  
  export default CollisionBlock;