const canvas = document.querySelector('canvas'); 
const ctx = canvas.getContext('2d');  
import Component from "./component.js";

class Sprite extends Component
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
        this.draw(ctx);
    }
}
export default Sprite;