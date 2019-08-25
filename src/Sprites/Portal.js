import 'phaser';

export default class Portal extends Phaser.Physics.Arcade.Sprite{
    constructor (scene, x, y){
        super(scene,x,y,'portal')
        this.scene = scene

        // enable physics
        this.scene.physics.world.enable(this)

        // add the play to the scene. 
        this.scene.add.existing(this)

        


        // this.input.setDraggable(this.pet);

      
        // // follow the pointer and return the X,Y
        // this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
        //   // make sprite be located at pointer coordinates by dragging
        //   gameObject.x = dragX;
        //   gameObject.y = dragY;
      
        // })
        
    }
    

}