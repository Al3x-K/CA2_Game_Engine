import GameObject from "./gameobject.js";

class Animator extends GameObject
{
    constructor(x,y,spriteWidth,spriteHeight,spriteImage)
    {
        super(x,y); // Call the super constructor
        this.spriteWidth = spriteWidth; // Set the sprite width
        this.spriteHeight = spriteHeight; // Set the sprite height
        this.spriteImage = spriteImage; // Set the sprite image 
        this.width = this.spriteWidth / 2;
        this.height = this.spriteHeight / 2;
        this.frame = 0; // Set the frame to 0
    }

    update()
    {
        this.frame++; // Increment the frame
    }

    draw(ctx)
    {
        ctx.drawImage(this.spriteImage, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height); // Draw the sprite
    }
}
export default Animator;