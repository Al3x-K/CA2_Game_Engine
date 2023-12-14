import GameObject from "../Engine/gameobject.js";
import Renderer from "../Engine/renderer.js";
import Physics from "../Engine/physics.js";
import Player from "./player.js";

class Collectible extends GameObject
{
    constructor(x,y,value)
    {
        super(x,y);
        this.renderer = new Renderer('yellow', 50, 50);
        this.addComponent(this.renderer);
        this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }));
        this.tag = 'collectible';
        this.value = value;
    }

    update(deltaTime)
    {
        const physics = this.getComponent(Physics);
        const [left, right, top, bottom] = physics.getBoundingBox();
        const player = this.game.gameObjects.filter((obj) => obj instanceof Player)[0];
        const playerPhysics = player.getComponent(Physics);
        const [playerLeft, playerRight, playerTop, playerBottom] = playerPhysics.getBoundingBox();
        if (physics.collision(playerPhysics))
        {
            this.game.removeGameObject(this);
            //player.score += 1;
        }
    }
}
