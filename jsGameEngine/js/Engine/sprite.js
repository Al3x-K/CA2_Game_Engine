const canvas = document.querySelector('canvas'); 
const ctx = canvas.getContext('2d');  
import GameObject from "./gameobject.js";

class Sprite extends GameObject
{
    constructor({position, imageSrc},width,height)
    {
        super();
        this.position = position;
        this.image = new Image();
        this.image.src = imageSrc;
        this.width = width;
        this.height = height;
    }

    draw(ctx)
    {
        if(!this.image)
        {
            return;
        }
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
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