const Images = 
{
    player: new Image(), // The Image instance for the player.
    key: new Image(), // The Image instance for the key.
    gem: new Image(), // The Image instance for the gem.
};
  
  
const AudioFiles = 
{
    jump: './resources/audio/jump.mp3', // The file path of the jump sound.
    collect: './resources/audio/collect.mp3', // The file path of the collect sound.
    // Add more audio file paths as needed
};
  
  // Set the source of the player image.
Images.player.src = './resources/player/passiveIdle/pi1.png';
Images.key.src = './resources/tiled/key.png';
Images.gem.src = './resources/tiled/gem.png';


// Export the Images and AudioFiles objects so they can be imported and used in other modules.
export { Images, AudioFiles };
  