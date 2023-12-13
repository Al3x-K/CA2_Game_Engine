const canvas = document.querySelector('canvas'); 
const ctx = canvas.getContext('2d');  

class Player
{  
    constructor()
    {
        this.position = {x: 0, y: 0};
        this.velocity = {x: 0, y: 1};
        this.height = 10;
    }

    draw()
    {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.position.x, this.position.y,10,this.height);
    }

    update()
    {
        this.draw();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        if(this.position.y + this.height + this.velocity.y < canvas.height)
        {
            this.velocity.y += 0.5;
        }
        else
        {
            this.velocity.y = 0;
        }
    }

}

export default Player;