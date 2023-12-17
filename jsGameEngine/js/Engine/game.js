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
        this.startButton = document.getElementById('btn1');
    }

    resizeCanvas()
    {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    start()
    {
        window.addEventListener('click', () => this.startGame());   // Start the game when the user clicks the button
        this.isRunning = true;  // Set isRunning to true
        requestAnimationFrame((timestamp) => this.gameLoop(timestamp)); // Start the game loop
    }

    startGame()
    {
        let startDiv = document.getElementById('start');    // Get the start div
        let gameCanvas = this.canvas;   // Get the canvas
        let endDiv = document.getElementById('levelCompleted'); // Get the end div
        startDiv.style.display = 'none';    // Hide the start div
        gameCanvas.style.display = 'block'; // Show the canvas
        endDiv.style.display = 'none';  // Hide the end div
        this.start();   // Start the game
    }

    levelCompleted()
    {
        let startDiv = document.getElementById('start');    
        let gameCanvas = this.canvas;
        let endDiv = document.getElementById('levelCompleted');
        startDiv.style.display = 'none';    
        gameCanvas.style.display = 'none';
        endDiv.style.display = 'block';
        this.isRunning = false;
    }

    gameOver()
    {
        let startDiv = document.getElementById('start');
        let gameCanvas = this.canvas;
        let endDiv = document.getElementById('gameOver');
        startDiv.style.display = 'none';
        gameCanvas.style.display = 'none';
        endDiv.style.display = 'block';
        this.isRunning = false;
    }

    gameLoop(currentTime)
    {
        if(!this.isRunning) // If the game is not running, don't update or draw anything
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