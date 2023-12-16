import GameObject from './gameobject.js';
import Particle from './particle.js';
import Physics from '../Engine/physics.js';

class ParticleSystem extends GameObject {
  
    constructor(x, y, color, numOfParticles, lifeDuration, emitDuration) 
    { 
        super(x, y);
        this.color = color; // The color of the particles
        this.numOfParticles = numOfParticles; // The number of particles to emit
        this.lifeDuration = 3; // The life duration of the particles
        this.emitDuration = emitDuration; // The duration of the particle system
        this.particlesEmitted = 0; // The number of particles emitted
    }

 
    update(deltaTime) 
    {
        if (this.emitDuration > 0) // If the particle system is still emitting particles
        {
            this.emitParticles(deltaTime); // Emit particles
            this.emitDuration -= deltaTime; // Decrement the emit duration
        } 
        else if (this.emitDuration <= 0) // If the particle system is done emitting particles
        {
            this.game.destroy(this); // Destroy the particle system
        }
        super.update(deltaTime); // Call the super update method
     }

  
    emitParticles(deltaTime) 
    {
        const particlesToEmit = Math.ceil((this.numOfParticles / this.emitDuration) * deltaTime); // Calculate the number of particles to emit
        for (let i = 0; i < particlesToEmit && this.particlesEmitted < this.numOfParticles; i++)  // Emit particles
        {
            const lifeDuration = this.lifeDuration; // Calculate the life duration of the particle
            const particle = new Particle(this.x, this.y, 8, 8, this.color, lifeDuration); // Create a new particle
            particle.addComponent(new Physics({ x: (Math.random() - 0.5) * 50, y: (Math.random() - 0.5) * 50 }, { x: 0, y: 0 })); // Add a physics component to the particle
            this.game.add(particle); // Add the particle to the game
            this.particlesEmitted++; // Increment the number of particles emitted
        }
    }
}

// The ParticleSystem class is then exported as the default export of this module.
export default ParticleSystem;
