import Component from './component.js';

class Input extends Component
{
    constructor() 
    {
        super();
        this.keys = {};
        this.mouse = {x: 0, y: 0};
        this.mouseButtons = {};
        this.mouseButtonsDown = {};
        this.mouseButtonsUp = {};

        document.addEventListener('keydown', (event) => (this.keys[event.code] = true));
        document.addEventListener('keyup', (event) => (this.keys[event.code] = false));
        document.addEventListener('mousedown', (event) => (this.mouseButtons[event.button] = true));
        document.addEventListener('mouseup', (event) => (this.mouseButtons[event.button] = true));
    }

    isKeyDown(key) 
    {
        return this.keys[key] || false;
    }
     
    isMouseButtonDown(button) 
    {
        return this.mouseButtons[button] || false;
    }
}

export default Input;