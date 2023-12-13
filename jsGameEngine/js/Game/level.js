import Game from '../Engine/game.js';
import Player from './player.js';
import Sprite from '../Engine/sprite.js';
import CollisionBlock from './collisionBlock.js';

class Level extends Game
{
    constructor(canvasId)
    {
        super(canvasId);
        const background = new Sprite({position: {x: 0, y: 0}, imageSrc: './resources/background/bg1.jpg'},this.canvas.width,this.canvas.height);
        this.add(background);
        const player = new Player(0,0);
        this.add(player);
        this.camera.target = player;

        this.camera.target = player;
    }
}

export default Level;
/*
const canvas = document.querySelector('canvas'); 
const ctx = canvas.getContext('2d');  

const player = new Player(0,0);



let y = 10;
const keys = {};
const floorCollisions2D = [];
for(let i = 0; i < floorCollisions.length; i += 32)
{
    floorCollisions2D.push(floorCollisions.slice(i,i+32));
}

const collisionBlocks = [];
floorCollisions2D.forEach((row, yIndex) =>
{
    row.forEach((symbol, xIndex) =>
    {
        if(symbol === 104)
        {
            collisionBlocks.push(new CollisionBlock({position: {x: xIndex * 32, y: yIndex * 18}}));
        }
    });
});
const background = new Sprite({position: {x: 0, y: 0}, imageSrc: './resources/background/bg1.jpg'},canvas.width,canvas.height);
console.log(collisionBlocks);
function gameLoop()
{
    window.requestAnimationFrame(gameLoop);
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.save();
    ctx.scale(3.5,3.5);
    ctx.translate(0,-background.height + canvas.height/3.5);
    background.update();
   
    collisionBlocks.forEach((collisionBlock) =>
    {
        collisionBlock.update();
    });
    ctx.restore();   
    
    
    player.update();
    
}

gameLoop();

*/