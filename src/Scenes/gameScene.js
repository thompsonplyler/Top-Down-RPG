import 'phaser';
import Player from '../Sprites/Player'
import Portal from '../Sprites/Portal'
import Coins from '../Groups/Coins'
import Enemies from '../Groups/Enemies'
import Bullets from '../Groups/Bullets'

let gameScene = new Phaser.Scene("Game Scene")
// class GameScene extends Phaser.Scene {

//     constructor(){

//         // this is the name of the scene that will be called by other scenes
//         // equivalent to let loadingScene = new Phaser.Scene('Loading'); in other modules
//         super("Game Scene")
//     }

// the data argument here passes on the second argument from the 
// scene.start function that loaded this scene, which is 
// in bootScene.js ("Booting Scene") in this case.
// this data passes the level, whether or not it's a new game,
// as well as the total levels for the game. 

gameScene.init = function(data){
this._LEVEL = data.level
this._LEVELS = data.levels
this._NEWGAME = data.newGame
this.loadingLevel = false
if (this._NEWGAME ) this.events.emit('newGame');
}


    
gameScene.create = function(){
        this.scale.on('resize',this.resize,this)
        this.createMap()
        this.createPlayer();
        this.cursors = this.input.keyboard.createCursorKeys()
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        this.createPortal()
        this.addCoins()
        this.addEnemies()
        this.bullets = new Bullets(this.physics.world,this, []);
        this.addCollisions()
        
        
        
        
        
        
        
        this.cameras.main.startFollow(this.player)
      }
      
gameScene.addCoins = function(){
  this.coins = this.map.createFromObjects('Coins', 'coin', {key: 'coin'})
  this.coinsGroup = new Coins(this.physics.world, this, [], this.coins) 
}

gameScene.addEnemies = function(){
  this.enemies = this.map.createFromObjects('Enemies', 'enemy', {key: 'enemy'})
  this.enemiesGroup = new Enemies(this.physics.world, this, [], this.enemies) 
}

gameScene.createPlayer = function(){
  // this gets the "Player" layer from the Tiled map.
  // Tiled map is explained to Phaser in gameScene.createMap()
  // Player is placed on map through Player class in Player.js
  if (this._NEWGAME && this._LEVEL===1){
      this.map.findObject('Player',(obj)=> {
      if (obj.type === 'startingPosition'){    
        this.player = new Player(this,obj.x, obj.y)
      }
    })
  }
  else {
    this.map.findObject('Player',(obj)=> {
      console.log(obj.type)
      if (obj.type === 'startingPositionPortal'){    
        this.player = new Player(this,obj.x, obj.y)
      }
      })
  }

}

gameScene.createPortal = function(){
  this.map.findObject('Portal',(obj)=> {
    this.portal = new Portal(this,obj.x,obj.y)
  

  })
}

gameScene.createMap = function(){
        console.log(this._LEVEL)
        console.log(this)
        

        this.add.tileSprite(0,0,8000,8000,'RPGpack_sheet',31)
                // this gets the thing we named "level1" with the tilemapTiledJSON method.
        // this was originally in this scene file, but I moved it to 
        // Loading.js

        this.map = this.make.tilemap({key: this._LEVELS[this._LEVEL]})

        // map.addTilesetImage creates a tilesetImage from the 
        // spresheet we imported during the preload, 
        this.tiles = this.map.addTilesetImage('RPGpack_sheet')

        this.backgroundLayer = this.map.createStaticLayer('Background', this.tiles,0,0)
        
        //looks for the "Blocked" layer on the JSON map.
        this.blockedLayer = this.map.createStaticLayer('Blocked', this.tiles,0,0)

        // pass an array of tile indices on the tilemap that you don't want collisions added for. 
        // passing an array of -1 adds collisions for everything in that "Blocked" layer or this.blockedLayer.
        this.blockedLayer.setCollisionByExclusion([-1]);


}

gameScene.resize = function(gameSize, baseSize, displaySize, resolution) {
        let width = gameSize.width;
        let height = gameSize.height;
        if (width === undefined) {
          width = this.sys.game.config.width;
        }
        if (height === undefined) {
          height = this.sys.game.config.height;
        }
        this.cameras.resize(width, height);
      }

gameScene.update = function() {
        this.player.update(this.cursors);

        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)){
          this.bullets.fireBullet(this.player.x, this.player.y, this.player.direction)
        }


    
}

gameScene.loadNextLevel = function(endGame){
  if(!this.loadingLevel){
  this.cameras.main.fade(500,0,0,0);
  this.cameras.main.on('camerafadeoutcomplete', ()=>{
    if (endGame) {
      this.scene.restart({level:1, levels: this._LEVELS, newGame: true})
    }
    else if (this._LEVEL === 1) {
      this.scene.restart({level: 2, levels: this._LEVELS, newGame: false})
    }
      else {
        this.scene.restart({level: 1, levels: this._LEVELS, newGame: false})
      }
  })}
this.loadingLevel=true
    // calling restart when the portal is touched tells Phaser to
    // reload the scene, but with the changes designated 
    // by the contents of the object it takes as an argument.

  }


gameScene.addCollisions = function(){
  this.physics.add.collider(this.player,this.blockedLayer)
  this.physics.add.collider(this.enemiesGroup,this.blockedLayer)
  this.physics.add.overlap(this.player,this.enemiesGroup, this.player.enemyCollision.bind(this.player))
  
  this.physics.add.overlap(this.player,this.portal, this.loadNextLevel.bind(this, false))
  
  this.physics.add.overlap(this.player,this.coinsGroup, this.coinsGroup.collectCoin.bind(this.coinsGroup))
  this.physics.add.overlap(this.bullets,this.enemiesGroup, this.bullets.enemyCollision)
  
}


export default gameScene
