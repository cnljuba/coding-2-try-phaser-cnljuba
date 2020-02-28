export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image("background", "assets/images/background.png");
    this.load.image("ray", "assets/images/ray.gif");
    this.load.image("ship", "assets/images/ship.png");
    this.load.image("shark", "assets/images/shark.png");
    this.load.image("shark", "assets/images/shark.png");
    this.load.image("food", "assets/images/food.png");
    //this.load.multiatlas('raysprite', 'assets/images/raysprite.json', 'assets');
  }

  create() {
    this.add.text(40,40, "Loading");
    this.scene.start('MainScene');
    let ray = this.add.image(500,375,'ray','ray.gif');
    ray.setScale(0.5);
    let ship = this.add.image(100, 100, 'ship','ship.png');
    ship.setScale(5);
    let shark = this.add.image(300, 300, 'shark','shark.png');
    shark.setScale(0.6);
    let food = this.add.image(200,500,'food', 'food.png');
    food.setScale(1);
  }

}
