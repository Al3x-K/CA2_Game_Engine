//imports:
import GameObject from '../Engine/gameobject.js';
import Input from '../Engine/input.js';
import Physics from '../Engine/physics.js';
import Renderer from '../Engine/renderer.js';
import {Images} from '../Engine/resources.js';
import Platform from './platforms.js';
import Key from './key.js';
import Gem from './gem.js';
import Portal from './portal.js';
import ParticleSystem from '../Engine/particleSystem.js';
import WinCon from './winCon.js';
import Spikes from './spikes.js';
import Animator from '../Engine/animator.js';

class Player extends GameObject
{  
    constructor(x,y)
    {
        super(x,y); // Call the super constructor
        this.renderer = new Renderer('blue', 22, 34, Images.player); // Add a renderer component to the object
        this.addComponent(this.renderer);
        this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 })); // Add a physics component to the object
        this.addComponent(new Input()); // Add an input component to the object
        this.direction = 1; // Set the direction of the player
        this.isOnPlatform = false; // Set the player to not be on a platform
        this.isJumping = false; // Set the player to not be jumping
        this.jumpForce = 3.2; // Set the jump force of the player
        this.jumpTime = 0.1; // Set the jump time of the player
        this.jumpTimer = 0; // Set the jump timer of the player
        this.score = 0; // Set the score of the player
        this.numOfKeys = 0; // Set the number of keys the player has collected
    }


    update(deltaTime)
    {
        const physics = this.getComponent(Physics); // Get the physics component of the player
        const input = this.getComponent(Input); // Get the input component of the player
        const keys = input.keys; // Get the keys of the player
        
        const animator = this.getComponent(Animator); // Get the animator component of the player
        const Idle = []; // Create an array for the idle animation
        Idle.push(animator)
        // Handle player movement
        if (input.isKeyDown('KeyD'))  // If the player is pressing the D key
        {
            physics.velocity.x = 1.5; // Set the velocity of the player
            this.direction = 1; // Set the direction of the player
        } 
        else if (input.isKeyDown('KeyA'))  // If the player is pressing the A key
        {
            physics.velocity.x = -1.5;  
            this.direction = -1;
        } 
        else // If the player is not pressing any keys
        { 
            physics.velocity.x = 0; // Set the velocity of the player to 0

        } 

        if (input.isKeyDown('KeyW') && this.isOnPlatform) // If the player is pressing the W key and is on a platform
        {
            this.startJump();   // Start the jump
        }
      
        if (this.isJumping) // If the player is jumping
        {
            this.updateJump(deltaTime); // Update the jump
        }

        // Handle collisions with platforms
        this.isOnPlatform = false;  // Reset this before checking collisions with platforms
        const platforms = this.game.gameObjects.filter((obj) => obj instanceof Platform); // Get all the platforms in the game
        for (const platform of platforms)  // Loop through all the platforms
        {
            if (physics.collision(platform.getComponent(Physics)))  // If the player is colliding with a platform
            {
                if (!this.isJumping)  // If the player is not jumping
                {
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

        // Handle collisions with portals
        const portals = this.game.gameObjects.filter((obj) => obj instanceof Portal); // Get all the portals in the game
        for (const portal of portals) // Loop through all the portals
        {
            if (physics.collision(portal.getComponent(Physics))) // If the player is colliding with a portal
            {
                //the entrace to the portals is granted based on the currenct amount of gems the player has collected
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

        // Handle collisions with keys
        const collectibleKey = this.game.gameObjects.filter((obj) => obj instanceof Key); // Get all the keys in the game
        for (const key of collectibleKey)   // Loop through all the keys
        {
            if (physics.collision(key.getComponent(Physics)))   // If the player is colliding with a key
            {
                this.collect(key);  // Collect the key
                this.game.destroy(key); // Destroy the key
            }
        }

        // Handle collisions with gems
        const collectibleGems = this.game.gameObjects.filter((obj) => obj instanceof Gem); // Get all the gems in the game
        for (const gem of collectibleGems)  // Loop through all the gems
        {
            if (physics.collision(gem.getComponent(Physics)))   // If the player is colliding with a gem
            { 
                this.collect(gem); // Collect the gem
                this.game.destroy(gem); // Destroy the gem
            }
        }
        
        // Handle collisions with spikes
        const spikes = this.game.gameObjects.filter((obj) => obj instanceof Spikes);    // Get all the spikes in the game
        for (const spike of spikes) // Loop through all the spikes
        {
            if (physics.collision(spike.getComponent(Physics))) // If the player is colliding with a spike
            {
                this.game.gameOver();   // Game over
            }
        }

        // Handle collisions with winCon
        const winCon = this.game.gameObjects.filter((obj) => obj instanceof WinCon); // Get the winCon object
        for (const win of winCon) 
        {
            if (physics.collision(win.getComponent(Physics))) // If the player collides with the winCon object
            {
                if (this.numOfKeys = 3) // If the player has collected all the keys
                {
                    this.game.levelCompleted()  // Level completed
                }   
            }
        }

        super.update(deltaTime);    // Call the super update method
    }

    startJump() 
    {
        if (this.isOnPlatform)  // If the player is on a platform
        { 
            this.isJumping = true;  // Set the player to be jumping
            this.jumpTimer = this.jumpTime; // Set the jump timer
            this.getComponent(Physics).velocity.y = -this.jumpForce;    // Set the velocity of the player
            this.y += this.getComponent(Physics).gravity.y; // Set the gravity of the player
            this.isOnPlatform = false;  // Set the player to not be on a platform
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

    collect(collectible)    // Collect a collectible
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

    resetPleyerState()  // Reset the player state
    {
        this.score = 0; // Reset the score
        this.numOfKeys = 0; // Reset the number of keys
    }
}

export default Player;