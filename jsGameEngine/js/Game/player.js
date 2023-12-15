import GameObject from '../Engine/gameobject.js';
import Input from '../Engine/input.js';
import Physics from '../Engine/physics.js';
import Renderer from '../Engine/renderer.js';
import {Images} from '../Engine/resources.js';
import Platform from './platforms.js';
import Key from './key.js';
import Gem from './gem.js';

class Player extends GameObject
{  
    constructor(x,y)
    {
        super(x,y);
        this.renderer = new Renderer('blue', 22, 34, Images.player);
        this.addComponent(this.renderer);
        this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }));
        this.addComponent(new Input());
        this.direction = 1;
        this.isOnPlatform = false;
        this.isJumping = false;
        this.jumpForce = 5;
        this.jumpTime = 0.1;
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
            physics.velocity.x = 2.5;
            this.direction = 1;
        } 
        else if (input.isKeyDown('KeyA')) 
        {
            physics.velocity.x = -2.5;
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
                    
                    //physics.velocity.x = 0;  
                    if(this.y > platform.y + platform.getComponent(Renderer).height - 30)
                    {
                        this.y = platform.y + platform.getComponent(Renderer).height;
                        physics.velocity.y = 0;  
                        physics.acceleration.y = 0; 
                    }
                    else if (this.y < platform.y - this.renderer.height + 10)
                    {
                        this.y = platform.y - this.renderer.height; 
                        this.isOnPlatform = true;
                        physics.velocity.y = 0;  
                        physics.acceleration.y = 0; 
                    }   
                }

                if(this.x > platform.x + platform.getComponent(Renderer).width - 10)
                {
                    this.x = platform.x + platform.getComponent(Renderer).width;
                }
                else if (this.x < platform.x - this.renderer.width + 10)
                {
                    this.x = platform.x - this.renderer.width;         
                }
            }
        }   

        const collectibleKey = this.game.gameObjects.filter((obj) => obj instanceof Key);
        for (const key of collectibleKey) 
        {
            if (physics.collision(key.getComponent(Physics))) 
            {
                this.collect(key);
                this.game.destroy(key);
            }
        }

        const collectibleGems = this.game.gameObjects.filter((obj) => obj instanceof Gem);
        for (const gem of collectibleGems) 
        {
            if (physics.collision(gem.getComponent(Physics))) 
            {
                this.collect(gem);
                this.game.destroy(gem);
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
            this.y += this.getComponent(Physics).gravity.y;
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

    collect(collectible) 
    {
    // Handle collectible pickup
        this.score += collectible.value;
        console.log(`Score: ${this.score}`);
        //this.emitCollectParticles(collectible);
    }

}

export default Player;