const canvas = document.querySelector('canvas'); 
const ctx = canvas.getContext('2d');  
import GameObject from "./gameobject.js";

class Sprite extends GameObject
{
    constructor({position, imageSrc},width,height)
    {
        super();
        this.position = position; // The position of the sprite
        this.image = new Image(); // Create a new image object
        this.image.src = imageSrc; // Set the source of the image
        this.width = width; // The width of the sprite
        this.height = height; // The height of the sprite
    }

    draw(ctx)
    {
        if(!this.image) // If the image is not loaded yet, don't try to draw it
        {
            return;
        }
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height); // Draw the image
    }

    update()
    {
        //ctx.save();
        //ctx.scale(3.5,3.5);
        //ctx.translate(0,-this.height + canvas.height/3.5);
        this.draw(ctx);
    }
}
export default Sprite;