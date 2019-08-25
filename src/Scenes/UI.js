import 'phaser';
import logoImg from "../assets/logo.png"
import config from '../config'
import map1 from "../assets/map1.json"
import map2 from "../assets/map2.json"
import RPGPack from '../assets/RPGpack_sheet.png'
import characters from '../assets/roguelikeChar_transparent.png'
import portal from '../assets/raft.png'
import coin from '../assets/coin_01.png'

class UIScene extends Phaser.Scene {
    constructor(){
        super({key: 'UI', active: true})
    }


    init(){
        this.coinsCollected = 0;
        this.health = 3;
       
    }

    create(){
        this.scoreText = this.add.text(12,12,`Score: ${this.coinsCollected}`, {fontSize: '32px', fill: '#fff'})
        this.healthText = this.add.text(12,48,`Health: ${this.health}`, {fontSize: '32px', fill: '#fff'})

        this.gameScene = this.scene.get('Game Scene')

        this.gameScene.events.on('enemyHit', (health) => {
            this.healthText.setText(`Health: ${health}`)
        })

        this.gameScene.events.on('coinCollected', ()=>{
            this.coinsCollected++
            this.scoreText.setText(`Score: ${this.coinsCollected}`)

        })

        this.gameScene.events.on('newGame', ()=>{
            this.coinsCollected = 0
            this.scoreText.setText(`Score: ${this.coinsCollected}`)
            this.healthText.setText(`Health: 3`)
        })
       
    }

}

export default UIScene