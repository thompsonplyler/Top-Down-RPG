import 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite{
    constructor (scene, x, y){
        super(scene,x,y,'characters',325)
        this.scene = scene
        this.health = 3
        this.hitDelay = false
        this.direction = 'up'

        // enable physics
        this.scene.physics.world.enable(this)

        // add the play to the scene. 
        this.scene.add.existing(this)

        this.setScale(4)

    


        // this.input.setDraggable(this.pet);

      
        // // follow the pointer and return the X,Y
        // this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
        //   // make sprite be located at pointer coordinates by dragging
        //   gameObject.x = dragX;
        //   gameObject.y = dragY;
      
        // })
        
    }
        // this creates a new update() method for the Player class
        update(cursors){
            this.setVelocity(0)

            if (cursors.up.isDown){
                this.setVelocityY(-150)
                this.direction = 'up'
            } else if (cursors.down.isDown) {
                this.setVelocityY(150)
                this.direction = 'down'
            }
      
            if (cursors.left.isDown){
                this.setVelocityX(-150)
                this.direction = 'left'
            } else if (cursors.right.isDown) {
                this.setVelocityX(150)
                this.direction = 'right'
            }

 

        }

        enemyCollision(player,enemy){
            this.scene.events.emit('enemyHit', this.health)
            if (!this.hitDelay){
                this.loseHealth()
                this.hitDelay = true;
                this.tint = 0xff0000;
                this.scene.time.addEvent({
                    delay: 1200,
                    callback: ()=>{
                        this.tint = 0xffffff;
                        this.hitDelay = false;
                    },
                    callbackScope: this
                })
            }
        }

        loseHealth(){
            this.health--
            if (this.health <= 0){
                this.health === 0 
                this.scene.loadNextLevel(true)
            }
        }
    


}