const Images = 
{
    player: new Image(), // The Image instance for the player.
    platform1: new Image(), 
    platform2: new Image(),
    platform3: new Image(),
    platform4: new Image(),
    platform5: new Image(),
    platform6: new Image(),
    platform7: new Image(),
    sp1: new Image(),
    sp2: new Image(),
    top: new Image(),
    wall1: new Image(),
    wall2: new Image(),
    key: new Image(),
    gem: new Image(),
    ground: new Image(),
    decorations: new Image(),
};
  
  
const AudioFiles = 
{
    jump: './resources/audio/jump.mp3', // The file path of the jump sound.
    collect: './resources/audio/collect.mp3', // The file path of the collect sound.
    // Add more audio file paths as needed
};
  
  // Set the source of the player image.
Images.player.src = './resources/player/passiveIdle/pi1.png';

//platforms
Images.platform1.src = './resources/tiled/platform1.png';
Images.platform2.src = './resources/tiled/platform2.png';
Images.platform3.src = './resources/tiled/platform3.png';
Images.platform4.src = './resources/tiled/platform4.png';
Images.platform5.src = './resources/tiled/platform5.png';
Images.platform6.src = './resources/tiled/platform6.png';
Images.platform7.src = './resources/tiled/platform7.png';

//shadow platforms
Images.sp1.src = './resources/tiled/sp1.png';
Images.sp2.src = './resources/tiled/sp2.png';
  
//top
Images.top.src = './resources/tiled/top.png';

//walls
Images.wall1.src = './resources/tiled/wall1.png';
Images.wall2.src = './resources/tiled/wall2.png';

//ground
Images.ground.src = './resources/tiled/ground.png';

//keys
Images.key.src = './resources/tiled/key.png';

//gems
Images.gem.src = './resources/tiled/gem.png';

//decorations
Images.decorations.src = './resources/tiled/decorations.png';


// Export the Images and AudioFiles objects so they can be imported and used in other modules.
export { Images, AudioFiles };
  