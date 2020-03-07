export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.bitmapFont("pixelFont", "assets/font/font.png","assets/font/font.xml");
    //this.load.audio("music", ["assets/sounds/rain.mp3"]);
    this.load.image("background", "assets/images/background.png");
    //this.load.image("ray", "assets/images/ray.gif");
    this.load.spritesheet("ray", "assets/images/raysprite.png",{ 
      frameWidth: 463,
      frameHeight: (1190 / 8)
    });
    this.load.image("shark", "assets/images/shark.png");
    this.load.image("food", "assets/images/food.png");
    this.load.image("food1", "assets/images/food.png");
    this.load.image("food2", "assets/images/food.png");
    //this.load.multiatlas('raysprite', 'assets/images/raysprite.json', 'assets');
  }

  create() {
    this.add.text(40,40, "Loading");
    this.scene.start('MainScene');
    let ray1 = this.add.sprite(500,375,'ray1','sprite1.png');
    ray1.setScale(0.5);
    let ray2 = this.add.sprite(500,375,'ray2','sprite2.png');
    ray2.setScale(0.5);
    /* let rays = this.add.sprite(500,375,'ray','raysprite.png');
    ray.setScale(0.5); */
    let shark = this.add.image(300, 300, 'shark','shark.png');
    shark.setScale(0.6);
    let food = this.add.image(200,500,'food', 'food.png');
    food.setScale(0.2);
    let food1 = this.add.image(200,500,'food1', 'food.png');
    food.setScale(0.3);
    let food2 = this.add.image(200,500,'food2', 'food.png');
    food.setScale(0.4);
  }

}
