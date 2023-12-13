

const canvas = document.querySelector('canvas'); 
const ctx = canvas.getContext('2d');  

const gravity = 0.5;
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
            this.velocity.y += gravity;
        }
        else
        {
            this.velocity.y = 0;
        }
    }

}

const player = new Player();

let y = 10;
const keys = {};
const platformCollisions2D = [];
for(let i = 0; i < platformCollisions.length; i+=32)
{
    platformCollisions2D.push(platformCollisions.slice(i,i+32));
}
console.log(platformCollisions2D);

const background = new Sprite({position: {x: 0, y: 0}, imageSrc: './resources/tiled/map.png'},canvas.width,canvas.height);
function gameLoop()
{
    window.requestAnimationFrame(gameLoop);
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.save();
    ctx.scale(3.5,3.5);
    ctx.translate(0,-background.height + canvas.height/3.5);
    background.update();
    ctx.restore();    
    player.update();
}

gameLoop();

window.addEventListener('keydown', (event) => 
{
    switch(event.key)
    {
        case 'd': 
            player.velocity.x = 1;
        break;
        case 'a': 
            player.velocity.x = -1;
        break;
        case 'w': 
            player.velocity.y = -10;
        break;
    }
});

window.addEventListener('keyup', (event) => 
{
    switch(event.key)
    {
        case 'd': 
            player.velocity.x = 0;
        break;
        case 'a': 
            player.velocity.x = 0;
        break;
    }
});
