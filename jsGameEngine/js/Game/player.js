import GameObject from '../Engine/gameobject.js';
import Input from '../Engine/input.js';
import Physics from '../Engine/physics.js';
import Renderer from '../Engine/renderer.js';
import {Images} from '../Engine/resources.js';
import Platform from './platforms.js';

class Player extends GameObject
{  
    constructor(x,y)
    {
        super(x,y);
        this.renderer = new Renderer('blue', 50, 50, Images.player);
        this.addComponent(this.renderer);
        this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }));
        this.addComponent(new Input());
        this.direction = 1;
        this.isOnPlatform = false;
        this.isJumping = false;
        this.jumpForce = 400;
        this.jumpTime = 0.3;
        this.jumpTimer = 0;
    }


    update(deltaTime)
    {
        const physics = this.getComponent(Physics);
        const input = this.getComponent(Input);
        const keys = input.keys;
        // Handle player movement
        if (input.isKeyDown('KeyD')) 
        {
            physics.velocity.x = 5;
            this.direction = 1;
        } 
        else if (input.isKeyDown('KeyA')) 
        {
            physics.velocity.x = -5;
            this.direction = -1;
        } 
        else
        {
            physics.velocity.x = 0;
        }

        if (input.isKeyDown('KeyW') && this.isOnPlatform)
        {
            this.startJump();
        }
      
        if (this.isJumping) 
        {
            this.updateJump(deltaTime);
        }

        this.isOnPlatform = false;  // Reset this before checking collisions with platforms
        const platforms = this.game.gameObjects.filter((obj) => obj instanceof Platform);
        for (const platform of platforms) 
        {
            if (physics.collision(platform.getComponent(Physics))) 
            {
                if (!this.isJumping) 
                {
                    physics.velocity.y = 0;
                    physics.acceleration.y = 0;
                    this.y = platform.y - this.renderer.height;
                    this.isOnPlatform = true;
                }
            }
        }
        super.update(deltaTime);
    }
    startJump() 
    {
        // Initiate a jump if the player is on a platform
        if (this.isOnPlatform) 
        { 
            this.isJumping = true;
            this.jumpTimer = this.jumpTime;
            this.getComponent(Physics).velocity.y = -this.jumpForce;
            this.isOnPlatform = false;
        }
      }
      
      updateJump(deltaTime) 
      {
        // Updates the jump progress over time
        this.jumpTimer -= deltaTime;
        if (this.jumpTimer <= 0 || this.getComponent(Physics).velocity.y > 0) 
        {
            this.isJumping = false;
        }
      }

}

export default Player;