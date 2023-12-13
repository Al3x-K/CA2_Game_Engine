const canvas = document.querySelector('canvas'); 
const ctx = canvas.getContext('2d');  

class CollisionBlock
{
    constructor({position})
    {
        this.position = position;
        this.width = 32;
        this.height = 32;
    }

    draw(ctx)
    {
        ctx.fillStyle = 'rgba(255,0,0,0.5)';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update()
    {
        this.draw(ctx);
    }
}
export default CollisionBlock;