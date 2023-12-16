import GameObject from "./gameobject.js";
import Particle from "./particle.js";
import Physics from "./physics.js";

class ParticleSystem extends GameObject
{
    constructor(x,y,image, numOfParticles, lifeTime, emitTime)
    {
        super(x,y);
        this.image = image;
        this.numOfParticles = numOfParticles; // how many particles to emit
        this.lifeTime = lifeTime; // how long the particle system will last
        this.emitTime = emitTime; // how long between each particle emission
        this.particlesEmited = 0; // how many particles have been emitted
    }

    update(deltaTime)
    {
        if(this.emitTime > 0)
        {
            this.emitParticles(deltaTime);
            this.emitTime -= deltaTime;
        }
        else if (this.emitTime <= 0)
        {
            this.game.destroy(this);
        }
        super.update(deltaTime);
    }

    emitParticles(deltaTime)
    {
        const particlesToEmit = Math.ceil((this.count / this.emitDuration) * deltaTime);
    
        for (let i = 0; i < particlesToEmit && this.particlesEmitted < this.count; i++) 
        {
            const lifeDuration = this.lifeDuration + Math.random() - 0.5;
            const particle = new Particle(this.x, this.y, Math.random() * 5, Math.random() * 5, this.color, lifeDuration, this.image); // create a new particle
            particle.addComponent(new Physics({ x: (Math.random() - 0.5) * 50, y: (Math.random() - 0.5) * 50 }, { x: 0, y: 0 })); // add a physics component
            this.game.add(particle); // add the particle to the game
            this.particlesEmitted++; // increment the number of particles emitted
        }
    }
}

export default ParticleSystem;