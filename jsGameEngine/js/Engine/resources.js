const Images = 
{
    player: new Image(), // The Image instance for the player.
    key: new Image(), // The Image instance for the key.
    gem: new Image(), // The Image instance for the gem.
    tiles: new Image(), // The Image instance for the tiles.
    chest: new Image(), // The Image instance for the chest.
    spike1: new Image(), // The Image instance for the spikes.
    spike2: new Image(), // The Image instance for the spikes.
    spike3: new Image(), // The Image instance for the spikes.
    spike4: new Image(), // The Image instance for the spikes.
};
  
  
const AudioFiles = 
{
    walkSound: new Audio(), // The Audio instance for the walk sound.
    jump: new Audio(), // The Audio instance for the jump sound.
    collect: new Audio(),  // The Audio instance for the collect sound.
    
};
  
  // Set the source of the player image.
  Images.player.src = './resources/player/pi1.png';
  Images.key.src = './resources/tiled/key.png';
  Images.gem.src = './resources/tiled/gem.png';
  Images.tiles.src = './resources/tiled/tileset.png';
  Images.chest.src = './resources/tiled/winCon.png';
  Images.spike1.src = './resources/tiled/spikes.png';
  Images.spike2.src = './resources/tiled/spike2.png';
  Images.spike3.src = './resources/tiled/spike3.png';
  Images.spike4.src = './resources/tiled/spike4.png';

  AudioFiles.walkSound = './resources/audio/walkSound.mp3';
  AudioFiles.jump = './resources/audio/jumpSound.mp3';
  AudioFiles.collect = './resources/audio/collectSound.mp3';
// Export the Images and AudioFiles objects so they can be imported and used in other modules.
export { Images, AudioFiles };
  