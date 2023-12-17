import GameObject from '../Engine/gameobject.js';
import Input from '../Engine/input.js';
import Physics from '../Engine/physics.js';
import Renderer from '../Engine/renderer.js';
import {Images} from '../Engine/resources.js';
import Platform from './platforms.js';
import Key from './key.js';
import Gem from './gem.js';
import CollisionBlock from './collisionBlock.js';
import ParticleSystem from '../Engine/particleSystem.js';
import WinCon from './winCon.js';
import Spikes from './spikes.js';

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
        this.jumpForce = 3.2;
        this.jumpTime = 0.1;
        this.jumpTimer = 0;
        this.score = 0;
        this.numOfKeys = 0;
    }


    update(deltaTime)
    {
        const physics = this.getComponent(Physics);
        const input = this.getComponent(Input);
        const keys = input.keys;
        // Handle player movement
        if (input.isKeyDown('KeyD')) 
        {
            physics.velocity.x = 1.5;
            this.direction = 1;
        } 
        else if (input.isKeyDown('KeyA')) 
        {
            physics.velocity.x = -1.5;
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
                    if(this.y > platform.y + platform.getComponent(Renderer).height - 30) //30 is the threshold for the player to be on the platform    
                    {
                        this.y = platform.y + platform.getComponent(Renderer).height; 
                        physics.velocity.y = 0;   // Stop falling
                        physics.acceleration.y = 0; 
                    }
                    else if (this.y < platform.y - this.renderer.height + 10) //10 is the threshold for the player to be on the platform
                    {
                        this.y = platform.y - this.renderer.height;  
                        this.isOnPlatform = true; // Set this to true so we can jump
                        physics.velocity.y = 0;  
                        physics.acceleration.y = 0; 
                    }   
                }

                if(this.x > platform.x + platform.getComponent(Renderer).width - 10) 
                {
                    this.x = platform.x + platform.getComponent(Renderer).width; // Stop moving right
                }
                else if (this.x < platform.x - this.renderer.width + 10)
                {
                    this.x = platform.x - this.renderer.width; // Stop moving left
                }
            }
        }   

        const portals = this.game.gameObjects.filter((obj) => obj instanceof CollisionBlock);
        for (const portal of portals)
        {
            if (physics.collision(portal.getComponent(Physics)))
            {
                if(portal.id == 1 && this.score >= 1) //portal 1
                {
                    this.x = 1550; 
                    this.y = 100;
                }
                else if(portal.id == 2 && this.score >= 2) //portal 2
                {
                    this.x = 120;
                    this.y = 100;
                }
                else if(portal.id == 3 && this.score >= 2) //portal 3
                {
                    this.x = 650;
                    this.y = 500;
                }
                else if(portal.id == 4 && this.score >= 3) //portal 4
                {
                    this.x = 1390;
                    this.y = 100;
                }
                else if(portal.id == 5 && this.score >= 3) //portal 5
                {
                    this.x = 550;
                    this.y = 100;
                }
                else if (portal.id == 6 && this.score >= 4) //portal 6
                {
                    this.x = 980;
                    this.y = 680;
                }
                else if (portal.id == 7 && this.score >= 4) //portal 7
                {
                    this.x = 800;
                    this.y = 200;
                }
                //player can't go back through portal 8
                else if (portal.id == 9 && this.score >= 6)
                {
                    this.x = 1550;
                    this.y = 680;
                }
                else if (portal.id == 10 && this.score >= 6)
                {
                    this.x = 1350;
                    this.y = 680;
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
        
        const spikes = this.game.gameObjects.filter((obj) => obj instanceof Spikes);
        for (const spike of spikes)
        {
            if (physics.collision(spike.getComponent(Physics)))
            {
                this.game.gameOver();
            }
        }
        const winCon = this.game.gameObjects.filter((obj) => obj instanceof WinCon); // Get the winCon object
        for (const win of winCon) 
        {
            if (physics.collision(win.getComponent(Physics))) // If the player collides with the winCon object
            {
                if (this.numOfKeys = 3) // If the player has collected all the keys
                {
                    this.game.levelCompleted() 
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
        if (collectible instanceof Gem) // If the collectible is a gem
        {
            this.score += 1; // Increment the score
            this.emitCollectParticlesGems(collectible); // Emit particles
            console.log('score' + this.score); 
        } 
        else if (collectible instanceof Key) // If the collectible is a key
        {
            this.numOfKeys += 1; // Increment the number of keys
            this.emitCollectParticlesKeys(collectible); // Emit particles
            console.log('keys' + this.numOfKeys);
        }
        
    }

    emitCollectParticlesGems() // Emit particles when the player collects a gem
    {
        const particleSystem = new ParticleSystem(this.x, this.y, 'red', 20, 1, 1); // Create a new particle system
        this.game.add(particleSystem); // Add the particle system to the game
    }

    emitCollectParticlesKeys() // Emit particles when the player collects a key
    {
        const particleSystem = new ParticleSystem(this.x,this.y,'yellow',20,1,1); // Create a new particle system
        this.game.add(particleSystem); // Add the particle system to the game
    }

}

export default Player;