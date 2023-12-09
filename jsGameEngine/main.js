const canvas = document.querySelector('canvas'); 
const ctx = canvas.getContext('2d');  

ctx.fillStyle = 'red';
ctx.fillRect(20,10,10,10);
let y = 10;
function gameLoop()
{
    window.requestAnimationFrame(gameLoop);
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,canvas.width,canvas.height);    
    ctx.fillStyle = 'red';
    ctx.fillRect(20,y,10,10);
    y++;
}

gameLoop();