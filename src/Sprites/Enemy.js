import 'phaser';

export default class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor (scene, x, y, frame){
        super(scene,x,y,'characters',frame)
        this.scene = scene
        this.health = 3

        // enable physics
        this.scene.physics.world.enable(this)

        // add the play to the scene. 
        this.scene.add.existing(this)

        this.setScale(4)
        
        this.timeEvent = this.scene.time.addEvent({
            delay: 300,
            callback: this.move,
            loop: true,
            callbackScope: this
        })

    }

    move(){
        const randNumber = Math.floor(Math.random() * 4+1)
        if (this.body){
            switch (randNumber) {
            case 1:
                this.setVelocityX(100);
                break;
            case 2:
                this.setVelocityX(-100);
                break;
            case 3:
                this.setVelocityY(100);
                break;
            case 4:
                this.setVelocityY(-100);
                break;
            default: 
                this.setVelocityX(100);

        }

        this.scene.time.addEvent({
            delay: 500,
            callback: ()=>{
                if(this.active) this.setVelocity(0);
            },
            callbackScope: this
        })
    }
        else {
            return
        }
        

    }

    loseHealth (){
        
        if (!this.hitDelay){
            this.hitDelay = true;
            this.tint = 0xff0000;
            this.health--
            this.scene.time.addEvent({
                delay: 200, 
                callback: ()=>{
                    this.tint = 0xffffff;
                    this.hitDelay = false
                }
            })
            if (this.health === 0) {
                this.body.destroy()
                this.timeEvent.destroy(true)
                this.scene.physics.world.disable(this)
                this.destroy(true);

                return
            }
        }

        }
}
