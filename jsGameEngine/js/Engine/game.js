import Camera from "./camera.js";

class Game 
{
    constructor(canvasId)
    {
        this.canvas = document.getElementById(canvasId); // Get the canvas
        this.ctx = this.canvas.getContext('2d'); // Get the context
        this.gameObjects = []; // Create an empty array for the game objects
        this.gameObjectsToRemove = []; // Create an empty array for the game objects to remove
        this.lastFrameTime = 0; // The time in milliseconds of the last frame
        this.deltaTime = 0; // The time in seconds since the last frame
        this.resizeCanvas(); // Resize the canvas to fill the screen
        window.addEventListener('resize', () => this.resizeCanvas()); // Resize the canvas when the window is resized
        this.camera = new Camera(null,this.canvas.width,this.canvas.height); // Create a new Camera instance
        this.startButton = document.getElementById('btn1'); // Get the start button
    }

    resizeCanvas() // Resize the canvas to fill the screen
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

    startGame() // Called when the user clicks the button
    {
        let startDiv = document.getElementById('start');    // Get the start div
        let gameCanvas = this.canvas;   // Get the canvas
        let endDiv = document.getElementById('levelCompleted'); // Get the end div
        startDiv.style.display = 'none';    // Hide the start div
        gameCanvas.style.display = 'block'; // Show the canvas
        endDiv.style.display = 'none';  // Hide the end div
        this.start();   // Start the game
    }

    levelCompleted() // Called when the level is completed
    {
        let startDiv = document.getElementById('start');  // Get the start div   
        let gameCanvas = this.canvas;  // Get the canvas
        let endDiv = document.getElementById('levelCompleted'); // Get the end div
        startDiv.style.display = 'none';   // Hide the start div  
        gameCanvas.style.display = 'none'; // Hide the canvas
        endDiv.style.display = 'block';   // Show the end div
        this.isRunning = false; // Set isRunning to false
    }

    gameOver() // Called when the player dies
    {
        let startDiv = document.getElementById('start'); // Get the start div
        let gameCanvas = this.canvas; // Get the canvas
        let endDiv = document.getElementById('gameOver'); // Get the end div
        startDiv.style.display = 'none'; // Hide the start div
        gameCanvas.style.display = 'none'; // Hide the canvas
        endDiv.style.display = 'block'; // Show the end div
        this.isRunning = false; // Set isRunning to false
    }

    

    gameLoop(currentTime) // The game loop
    {
        if(!this.isRunning) // If the game is not running, don't update or draw anything
        {
            return;
        }
        this.deltaTime = (currentTime - this.lastFrameTime) / 1000; // in seconds     
        this.lastFrameTime = currentTime; 
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height); // clear the canvas
        this.update(); // update the game objects
        this.camera.update(); // update the camera
        this.draw(); // draw the game objects
        requestAnimationFrame((timestamp) => this.gameLoop(timestamp)); // Call gameLoop again
    }

    update() 
    {
        for (const gameObject of this.gameObjects)  // Loop through the game objects
        {
            gameObject.update(this.deltaTime); // Update each game object
        }
        this.gameObjects = this.gameObjects.filter(object => !this.gameObjectsToRemove.includes(object)); // Remove the game objects in the gameObjectsToRemove array from the gameObjects array
        this.gameObjectsToRemove = []; // Empty the gameObjectsToRemove array
    }

    draw()
    {
        for (const gameObject of this.gameObjects)  // Loop through the game objects
        {
            gameObject.draw(this.ctx); // Draw each game object
        } 
        this.ctx.restore(); // Restore the canvas
    }

    add(gameObject)  // Add a game object to the game
    {
        gameObject.game = this; 
        this.gameObjects.push(gameObject); 
    }

    destroy(gameObject) // Remove a game object from the game
    {
        this.gameObjectsToRemove.push(gameObject);
    }

    reset() // Reset the game
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