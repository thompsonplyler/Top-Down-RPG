import 'phaser';

export default class Coins extends Phaser.Physics.Arcade.StaticGroup{
    constructor (world, scene, children, spriteArray){
        super(world,scene,children,spriteArray)
        this.scene = scene
        
        spriteArray.forEach(coin=>{
            coin.setOrigin(0);
            coin.setScale(.2)
            this.add(coin)
            this.world.enableBody(coin,1);
            coin.body.setSize(coin.width*coin.scaleX,coin.height*coin.scaleY,true);
            this.add(coin);
        })
        // enable physics
        this.scene.physics.world.enable(this)

        // add the play to the scene. 
        
        this.refresh()
        
    }

    collectCoin(player,coin){
        this.remove(coin);
        coin.destroy();
        // dispatch an event when this coin is picked up. 
        this.scene.events.emit('coinCollected')

    }
    

}