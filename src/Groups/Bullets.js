import 'phaser';

export default class Bullets extends Phaser.Physics.Arcade.Group {
    constructor (world, scene, children){
        super(world,scene,children)
        this.scene = scene
        this.scene.add.existing(this)
        this.scene.physics.world.enableBody(this,0)

        this.createMultiple({
            frameQuantity: 5,
            key: 'bullet',
            active: false,
            visible: false
        })
  
    }

    fireBullet(x,y, direction){
        const bullet = this.getFirstDead(false)
        console.log(direction)
        if (bullet){       
            bullet.scene.physics.world.enableBody(bullet,0)
            bullet.setPosition(x,y)
            bullet.active = true;
            bullet.visible = true;
            bullet.setScale(.2)

               this.scene.time.addEvent({
            delay: 1500,
            callback: ()=> {
                bullet.enable = false;
                bullet.active = false
                bullet.visible = false;
                bullet.body.setVelocity(0);
            }
        })

            switch(direction){
                case 'up':
                    bullet.body.setVelocityY(-300)
                    bullet.body.setVelocityX(0)
                    break
                case 'left':
                    bullet.body.setVelocityY(0)
                    bullet.body.setVelocityX(-300)
                    break
                case 'down':
                    bullet.body.setVelocityY(300)
                    bullet.body.setVelocityX(0)
                    break
                case 'right':
                    bullet.body.setVelocityY(0)
                    bullet.body.setVelocityX(300)
                    break
                default:
                    bullet.body.setVelocityY(-300)
                    bullet.body.setVelocityX(0)
            }
        } 
    }

    enemyCollision (enemy,bullet){
        console.log("There's been a collision!")
        // bullet.active = false
        // bullet.visible = false
        // bullet.scene.physics.disableBody(bullet)
        // enemy.loseHealth();
    }
}
     
        
        // bullet.setPosition(x,y);
        // bullet.setVelocityX(300);