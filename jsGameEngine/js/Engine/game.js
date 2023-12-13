import Camera from "./camera.js";

class Game 
{
    constructor(canvasId)
    {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.gameObjects = [];
        this.gameObjectsToRemove = [];
        this.lastFrameTime = 0;
        this.deltaTime = 0;
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        this.camera = new Camera(null,this.canvas.width,this.canvas.height);
    }

    resizeCanvas()
    {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    start()
    {
        this.isRunning = true;
        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }

    gameLoop(currentTime)
    {
        if(!this.isRunning)
        {
            return;
        }
        this.deltaTime = (currentTime - this.lastFrameTime) / 1000; // in seconds     
        this.lastFrameTime = currentTime; 
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height); // clear the canvas
        this.update();
        this.camera.update();
        this.draw();
        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }

    update()
    {
        for (const gameObject of this.gameObjects) 
        {
            gameObject.update(this.deltaTime);
        }
        this.gameObjects = this.gameObjects.filter(object => !this.gameObjectsToRemove.includes(object));
        this.gameObjectsToRemove = [];
    }

    draw()
    {
        for (const gameObject of this.gameObjects) 
        {
            gameObject.draw(this.ctx);
        }
        this.ctx.restore();
    }

    add(gameObject)
    {
        gameObject.game = this;
        this.gameObjects.push(gameObject);
    }

    destroy(gameObject)
    {
        this.gameObjectsToRemove.push(gameObject);
    }

    reset()
    {
        this.isRunning = false;
        for (const gameObject of this.gameObjects) 
        {
            if(gameObject.reset)
            {
                gameObject.reset();
            }
        }
        this.start();
    }
}

export default Game;