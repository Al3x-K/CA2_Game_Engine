const canvas = document.querySelector('canvas'); 
const ctx = canvas.getContext('2d');  

const gravity = 0.5;

class Player
{  
    constructor()
    {
        this.position = {x: 0, y: 0};
        this.velocity = {x: 0, y: 1};
    }

    draw()
    {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.position.x, this.position.y,10,10);
    }

    update()
    {
        this.draw();
        this.position.y += this.velocity.y;
        this.velocity.y += gravity;
    }

}

const player = new Player();

let y = 10;
function gameLoop()
{
    window.requestAnimationFrame(gameLoop);
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,canvas.width,canvas.height);    
    player.update();
}

gameLoop();