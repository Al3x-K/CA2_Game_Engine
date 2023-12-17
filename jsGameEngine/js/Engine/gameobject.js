class GameObject
{
    constructor(x,y) // The constructor takes an x and y coordinate
    {
        this.x = x; // The x-coordinate of the game object
        this.y = y; // The y-coordinate of the game object
        this.components = []; // The components array is initialized to an empty array
    }

    addComponent(component) // The addComponent method takes a component as an argument
    {
        this.components.push(component); //Add the component
        component.gameObject = this;
    }   

    update(deltaTime) 
    {
        for (const component of this.components) // Loop through the components
        {
            component.update(deltaTime); // Update each component
        }
    }

    draw(ctx)
    {
        for (const component of this.components)  // Loop through the components
        { 
            component.draw(ctx); // Draw each component
        }
    }

    getComponent(componentClass) 
    {
        return this.components.find(component => component instanceof componentClass); // Return the first component that matches the componentClass argument
    }
}

export default GameObject;