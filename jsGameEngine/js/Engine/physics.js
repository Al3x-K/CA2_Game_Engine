import Component from "./component.js";
import Renderer from "./renderer.js";

class Physics extends Component
{
    constructor(velocity = {x: 0, y: 0}, acceleration = {x: 0, y: 0}, gravity = {x: 0, y: 10})
    {
        super();
        this.velocity = velocity; 
        this.acceleration = acceleration;
        this.gravity = gravity;
    }

    update(deltaTime)
    {
        this.velocity.x += this.acceleration.x * deltaTime; // Update the velocity x
        this.velocity.y += (this.acceleration.y + this.gravity.y) * deltaTime; // Update the velocity y
        this.gameObject.x += this.velocity.x;   // Update the x position
        this.gameObject.y += this.velocity.y;   // Update the y position
    }
    collision(otherPhysics)
    {
        const [left, right, top, bottom] = this.getBoundingBox();// Get the object's bounding box
        const [otherLeft, otherRight, otherTop, otherBottom] = otherPhysics.getBoundingBox();// Get the other object's bounding box
        const horizontalCollision = right >= otherLeft && left <= otherRight;   // Check for horizontal collision
        const verticalCollision = bottom >= otherTop && top <= otherBottom;   // Check for vertical collision
        return horizontalCollision && verticalCollision;    // Return whether there is a collision
    }
    

    getBoundingBox()    // Get the object's bounding box
    {
        const renderer = this.gameObject.getComponent(Renderer);    // Get the renderer component
        const left = this.gameObject.x; // Get the left side of the object
        const right = this.gameObject.x + renderer.width;   // Get the right side of the object
        const top = this.gameObject.y;  // Get the top side of the object
        const bottom = this.gameObject.y + renderer.height;   // Get the bottom side of the object

        return [left, right, top, bottom];  // Return the bounding box
    }
}

export default Physics;