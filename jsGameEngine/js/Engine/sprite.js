const canvas = document.querySelector('canvas'); 
const ctx = canvas.getContext('2d');  

class Sprite
{
    constructor({position, imageSrc},width,height)
    {
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