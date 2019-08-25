import 'phaser';
import config from './config'

let game = new Phaser.Game(config)

// class Game extends Phaser.Game {
//   constructor(){
//     super(config);
//     this.scene.start("LoadingScene")
//   }
// }
// window.game = new Game();
// console.log(Phaser.Structs.(game))

window.addEventListener('resize', function (event){
  game.scale.resize(window.innerWidth, window.innerHeight)
  
}, false)