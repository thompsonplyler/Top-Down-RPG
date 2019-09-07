import 'phaser';

export default class Bullets extends Phaser.Physics.Arcade.Group {
    constructor (world, scene, children){
        super(world,scene,children)
        this.scene = scene

        this.createMultiple({
            frameQuantity: 5,
            key: 'bullet',
            active: false,
            visible: false
        })
  
    }

    fireBullet(x,y, direction){
        const bullet = this.getFirstDead(false)
        if (bullet){       
            bullet.scene.physics.world.enableBody(bullet,0)
            bullet.setPosition(x,y)
            bullet.active = true;
            bullet.visible = true;
            bullet.setScale(.2)

            bullet.timeEvent = this.scene.time.addEvent({
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

    enemyCollision (bullet,enemy){
        bullet.body.setVelocity(0)
        bullet.active = false
        bullet.visible = false
        bullet.body.enable = false
        bullet.timeEvent.destroy()
        enemy.loseHealth();
    }
}
     
        
        // bullet.setPosition(x,y);
        // bullet.setVelocityX(300);