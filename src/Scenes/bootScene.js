import 'phaser';
import logoImg from "../assets/logo.png"
import config from '../config'
import map1 from "../assets/map1.json"
import map2 from "../assets/map2.json"
import RPGPack from '../assets/RPGpack_sheet.png'
import characters from '../assets/roguelikeChar_transparent.png'
import portal from '../assets/raft.png'
import coin from '../assets/coin_01.png'
import bullet from '../assets/ballBlack_04.png'

class BootingScene extends Phaser.Scene {
    constructor(){
        super("Booting Scene")
    }


    preload(){
        // this is the description of the level that comes from the json in Tiled.
        this.load.tilemapTiledJSON('level1', map1)
        this.load.tilemapTiledJSON('level2', map2)
        
        this.levels = {
          1: 'level1',
          2: 'level2'
        }
        // this is the same spritesheet we used to actually MAKE the json in Tiled.
        // originally the tutorial had the path of the RPGPack,
        // but I had to import it to get it to work.
        this.load.spritesheet('characters', characters,{frameWidth: 17,frameHeight: 17} )
        this.load.spritesheet('RPGpack_sheet', RPGPack, {frameWidth: 64,frameHeight: 64})

        this.load.image('portal',portal)
        this.load.image('coin',coin)
        this.load.image('bullet',bullet)
    }

    create(){
        this.scene.start("Game Scene", {level: 1, newGame: true, levels:this.levels})
    }

}

export default BootingScene