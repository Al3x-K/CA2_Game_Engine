import Game from '../Engine/game.js';
import Player from './player.js';
import Sprite from '../Engine/sprite.js';
import CollisionBlock from './collisionBlock.js';
import Platform from './platforms.js';
import {Images} from '../Engine/resources.js';

class Level extends Game
{
    constructor(canvasId)
    {
        super(canvasId);
        const background = new Sprite({position: {x: 0, y: 0}, imageSrc: './resources/tiled/map.png'},this.canvas.width,this.canvas.height);
        this.add(background);
        const player = new Player(50, 700);
        this.add(player);
        this.camera.target = player;

        const horizontalPlatforms = [
            new Platform(0,748,1700,45),
            new Platform(50,615,269,45),
            new Platform(210,480,269,45),
            new Platform(50,350, 110, 45),
            new Platform(210,263,220, 45),
            new Platform(50,132,270, 45),
            new Platform(480,392,269, 45),
            new Platform(746,440,55, 45),
            new Platform(746,525,320, 45),
            new Platform(746,263,270, 45),
            new Platform(585,263,110, 45),
            new Platform(0,0,1700,45),
            new Platform(480,132,750,45),
            new Platform(1380,132,270,45),
            new Platform(1150,263,180, 45),
            new Platform(1065,392,480, 45),
            new Platform(1600,525,55, 45),
            new Platform(1385,615,55, 45),
            new Platform(1490,615,165, 45),
            new Platform(1225,703,55, 45),
          ];
          for (const horizontalPlatform of horizontalPlatforms) {
            this.add(horizontalPlatform);
          }
          
    }
    
}

export default Level;



