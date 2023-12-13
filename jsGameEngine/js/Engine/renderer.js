import Component from './component.js';

class Renderer extends Component 
{
    constructor(color = 'white', width = 100, height = 100, image = null) 
    {
        super(); // Call the parent constructor.
        this.color = color; // Initialize the color.
        this.width = width; // Initialize the width.
        this.height = height; // Initialize the height.
        this.image = image; // Initialize the image.
    }


    draw(ctx) 
    {
    // If an image is provided and it has finished loading, draw the image.
        if (this.image && this.image.complete) 
        {
            // Get the position and dimensions of the game object.
            const x = this.gameObject.x;
            const y = this.gameObject.y;
            const w = this.width;
            const h = this.height;
            // Check if the image should be flipped horizontally based on the direction of the game object.
            const flipX = this.gameObject.direction === -1;
            if (!flipX) 
            {
                // If the image should not be flipped, draw it as is.
                ctx.drawImage(this.image, x, y, w, h);
            } 
            else 
            {
                // If the image should be flipped, save the current drawing state,
                // translate and scale the drawing context to flip the image,
                // draw the image, and then restore the drawing state.
                ctx.save();
                ctx.translate(x + w, y);
                ctx.scale(-1, 1);
                ctx.drawImage(this.image, 0, 0, w, h);
                ctx.restore();
            }
        } 
        else 
        {
            // If no image is provided or it has not finished loading, draw a rectangle with the specified color.
            ctx.fillStyle = this.color;
            ctx.fillRect(this.gameObject.x, this.gameObject.y, this.width, this.height);
        }
    }
}

export default Renderer;