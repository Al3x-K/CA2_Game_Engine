import GameObject from '../Engine/gameobject.js';
//import Renderer from '../engine/renderer.js';
//import Physics from '../engine/physics.js';

class Platform extends GameObject 
{
  
    constructor(x, y, width, height, color = 'blue') 
    {
        super(x, y);
        this.addComponent(new Renderer(color, width, height, image));
        this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }));
        this.tag = 'platform'; 
    }
  }
  
  export default Platform;