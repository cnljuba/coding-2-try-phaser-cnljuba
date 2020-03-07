export default class ExampleObject extends Phaser.GameObjects.Sprite {
  
  setCollideWorldBounds(arg0: boolean) {
    throw new Error("Method not implemented.");
  }

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
