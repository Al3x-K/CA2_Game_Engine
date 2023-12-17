import Component from './component.js';

class Input extends Component
{
    constructor() 
    {
        super(); // Call the constructor of the Component class
        this.keys = {}; // Create an empty object for the keys
        document.addEventListener('keydown', (event) => (this.keys[event.code] = true)); // Set the key to true when it's pressed
        document.addEventListener('keyup', (event) => (this.keys[event.code] = false)); // Set the key to false when it's released
    }

    isKeyDown(key)  // The isKeyDown method returns true if the key is pressed, and false if it's not.
    {
        return this.keys[key] || false;
    }
}

export default Input;