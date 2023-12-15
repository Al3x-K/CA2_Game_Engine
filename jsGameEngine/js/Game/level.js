import Game from '../Engine/game.js';
import Player from './player.js';
import Sprite from '../Engine/sprite.js';
import Platform from './platforms.js';
import Key from './key.js';
import Gem from './gem.js';
import CollisionBlock from './collisionBlock.js';

class Level extends Game
{
    constructor(canvasId)
    {
        super(canvasId);
        const background = new Sprite({position: {x: 0, y: 0}, imageSrc: './resources/background/bg1.jpg'},this.canvas.width,this.canvas.height);
        this.add(background);
        const player = new Player(70, 680);
        this.add(player);
        this.camera.target = player;

        const platforms = 
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
            new Platform(535,660,265,100),
            new Platform(1067,615,160,150),
            new Platform(0,45,50,710),
            new Platform(1655,38,50,620),
            new Platform(320,300,50,90),
            new Platform(430,38,50,270),
            new Platform(480,405,105,250),
            new Platform(694,170,53, 400),
            new Platform(1013,265,53, 175),
            new Platform(1013,568,53, 90),
            new Platform(1440,615,53, 140),
            new Platform(1334,265,53, 160),
            new Platform(1227,397,53, 130),
            new Platform(1227,40,53, 130),
        ];
        for (const platform of platforms) 
        {
            this.add(platform);
        }
        //portal set1
        this.add(new CollisionBlock(55, 40, 50, 100));
        this.add(new CollisionBlock(1603, 40, 50, 100));

        //portal set2
        this.add(new CollisionBlock(1020, 650, 50, 100));
        this.add(new CollisionBlock(480, 40, 50, 100));

        //portal set3
        this.add(new CollisionBlock(750, 170, 50, 100));
        this.add(new CollisionBlock(1175, 40, 50, 100));
        //portal set4
        this.add(new CollisionBlock(1285, 140, 100, 30));
        this.add(new CollisionBlock(580, 440, 120, 40));

        //portal set5
        this.add(new CollisionBlock(1390, 650, 50, 100));
        this.add(new CollisionBlock(1490, 650, 50, 100));
        const tiles = new Sprite({position: {x: 0, y: 0}, imageSrc: './resources/tiled/tileset.png'},this.canvas.width,this.canvas.height);
        this.add(tiles);

        this.add(new Key(115, 450));
        this.add(new Key(645, 230));
        this.add(new Key(1290, 360));
        
        this.add(new Gem(445, 470));
        this.add(new Gem(285, 115));
        this.add(new Gem(660, 117));
        this.add(new Gem(930, 380));
        this.add(new Gem(980, 600));
        this.add(new Gem(1400, 120));

        const winCon = new Sprite({position: {x: 1630, y: 710}, imageSrc: './resources/tiled/winCon.png'},40,40);
        this.add(winCon);

        
        
    }
    
}

export default Level;



