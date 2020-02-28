export default class Player extends Phaser.GameObjects.Sprite {

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'ship', "ship.png");
        scene.add.existing(this);
    }

    setVelocityX(x:number){
        x = 0;
      }
    
    setVelocityY(y: number){
        y = 0;
      } 
}
