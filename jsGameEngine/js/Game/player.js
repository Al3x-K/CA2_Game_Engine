import Sprite from '../Engine/sprite.js';
import GameObject from '../Engine/gameobject.js';
import Input from '../Engine/input.js';

class Player extends GameObject
{  
    constructor(x,y)
    {
        super(x,y);
        this.sprite = new Sprite({position: {x: x, y: y}, imageSrc: './resources/player/passiveIdle/pi1.png'},32,32);
        this.addComponent(this.sprite);
        this.height = 10;
        this.addComponent(new Input());
        this.velocity = {x: 0, y: 0};
        this.direction = 1;
    }


    update(deltaTime)
    {
        const input = this.getComponent(Input);
        const keys = input.keys;
        // Handle player movement
        if (input.isKeyDown('KeyD')) {
            velocity.x = 100;
            this.direction = 1;
        } 
        else if (input.isKeyDown('KeyA')) 
        {
            velocity.x = -100;
            this.direction = -1;
        } 
        else
        {
            velocity.x = 0;
        }

        /*this.draw();
        const input = this.getComponent(Input);
        this.y += this.velocity.y;
        this.x += this.velocity.x;
        if(this.y + this.height + this.velocity.y < canvas.height)
        {
            this.velocity.y += 0.5;
        }
        else
        {
            this.velocity.y = 0;
        }*/
    }

}

export default Player;