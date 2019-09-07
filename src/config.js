import 'phaser'
import GameScene from './Scenes/gameScene';
import BootScene from './Scenes/bootScene';
import UIScene from './Scenes/UI';


export default {
        type: Phaser.AUTO,
        title: "Top Down RPG Game - Zenva Example",
        // this makes the game canvas itself fit the window
        // where the game occurs. 
        // it doesn't rewrite the window on resize, though,
        // so there's still space for the width style on 
        // canvas
        width: window.innerWidth-10,
        height: window.innerHeight-10,
        scene: [BootScene, GameScene, UIScene],
        pixelArt: true,
        roundPixels: true,
        // scale: {
        //     mode: Phaser.Scale.FIT,
        //     autoCenter: Phaser.Scale.CENTER_BOTH
        // },
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {
                    y: 0
                },
                debug: false
            }
        }
}
