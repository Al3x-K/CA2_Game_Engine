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
        const background = new Sprite({position: {x: 0, y: 0}, imageSrc: './resources/background/bg1.jpg'},this.canvas.width,this.canvas.height);
        this.add(background);
        const player = new Player(50, 700);
        this.add(player);
        this.camera.target = player;

        const horizontalPlatforms = 
        [
            new Platform(0,748,1700,40),
            new Platform(50,617,269,40),
            new Platform(215,487,269,40),
            new Platform(50,355, 110, 40),
            new Platform(215,263,220, 40),
            new Platform(50,132,270, 40),
            new Platform(480,399,267, 40),
            new Platform(746,440,55, 40),
            new Platform(746,528,320, 40),
            new Platform(746,263,270, 40),
            new Platform(590,263,110, 40),
            new Platform(0,0,1700,40),
            new Platform(480,132,750,40),
            new Platform(1390,132,270,40),
            new Platform(1180,265,180, 40),
            new Platform(1065,397,480, 40),
            new Platform(1600,527,55, 40),
            new Platform(1387,615,55, 40),
            new Platform(1490,615,165, 40),
            new Platform(1225,703,55, 40),
        ];
        for (const horizontalPlatform of horizontalPlatforms) 
        {
            this.add(horizontalPlatform);
        }

        const verticalPlatforms = 
        [
            new Platform(0,45,50,710),
            new Platform(1655,45,50,710),
            
        ];
        for (const verticalPlatform of verticalPlatforms) 
        {
            this.add(verticalPlatform);
        }
        const tiles = new Sprite({position: {x: 0, y: 0}, imageSrc: './resources/tiled/tileset.png'},this.canvas.width,this.canvas.height);
        this.add(tiles);
    }
    
}

export default Level;



