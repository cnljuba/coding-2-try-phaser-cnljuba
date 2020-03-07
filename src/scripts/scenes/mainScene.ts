import ExampleObject from '../objects/exampleObject';
import Player from '../objects/player';
import { Scene, Cameras, GameObjects } from 'phaser';

var gameSettings = {
  playerSpeed: 200,
}


export default class MainScene extends Phaser.Scene {
  background;
  shark;
  food;
  food1;
  food2;
  cursorKeys;
  ray;
  score: number;
  scoreLabel;
  beamSound;
  music;

  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    this.load.image("background", "assets/images/background.png");
    this.load.spritesheet("ray", "assets/images/sprite1.png");
    this.load.spritesheet("ray", "assets/images/sprite2.png");
    this.load.spritesheet("shark", "assets/images/shark.png");
    this.load.spritesheet("food", "assets/images/food.png");
    this.load.spritesheet("food1", "assets/images/food.png");
    this.load.spritesheet("food2", "assets/images/food.png");
    //this.load.multiatlas('ray', 'assets/images/raysprite.json', 'assets');
  }

  create() {
    this.background = this.add.tileSprite(0,0, 1000, 750, "background", "background.png");
    //this.background = this.add.tileSprite(0, 0, 1000, 750, "background");
    this.background.setOrigin(0,0);
    //this.background.setScrollFactor(0);
    //this.add.text(40,40,"Ocean Adventure",{font: "28px Arial", fill:"black"});
    this.score = 0;
    this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE", 50);
    //this.ray = this.add.sprite(500,375,'ray','sprite1.png'); 
    //this.ray.setScale(0.5); 
    this.shark = this.add.sprite(300, 300, 'shark', 'shark.png');
    this.shark.setScale(0.6);
    /* this.food = this.add.sprite(200,500,'food', 'food.png');
    this.food.setScale(0.2); */

    this.anims.create({
      key:"swim",
      frames: this.anims.generateFrameNumbers("ray", {start:0, end:7}),
      frameRate: 5,
      repeat: -1
    });

    this.ray = this.physics.add.sprite(500, 375, "ray").play("swim");
    //this.ray.play("swim");
    this.ray.setScale(0.5);
    /* this.ray2 = this.physics.add.sprite(200, 175, "ray2");
    this.ray2.setScale(1); */

    this.food = this.physics.add.sprite(100,500,'food');
    this.food.setScale(0.2);
    this.food.setGravity(0);
    this.food1 = this.physics.add.sprite(100,700,'food1');
    this.food1.setScale(0.3);
    this.food2 = this.physics.add.sprite(100,300,'food2');
    this.food2.setScale(0.4);

    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.ray.setCollideWorldBounds(true);

    /* this.food = this.physics.add.group({
      allowGravity: false
    });

    for(let i = 0; i <= 20; i++){
      let fishs = this.physics.add.sprite(100,100,"fish");
      this.food.add(fishs);
      fishs.setRandomPosition(0,0,1000,750);
      fishs.setVelocity(100,100);
      fishs.setCollideWorldBounds(true);
      fishs.setBounce(1);
    } */

    this.physics.add.collider(this.ray, this.shark, function(ray, shark){
      ray.destroy(true);
    });
    this.physics.add.collider(this.ray, this.food, this.eatFood, function(ray, food){
      food.destroy(true);
    }, this);
    this.physics.add.collider(this.ray, this.food1, this.eatFood,function(ray, food1){
      food1.destroy(true);
    }, this);
    this.physics.add.collider(this.ray, this.food2, this.eatFood, function(ray, food2){
      food2.destroy(true);
    }, this);

   // this.physics.add.collider(this.ray, this.food, this.eatFood, undefined, this);

    this.physics.add.overlap(this.ray, this.food, this.eatFood, undefined, this);
    this.physics.add.overlap(this.ray, this.food1, this.eatFood, undefined, this);
    this.physics.add.overlap(this.ray, this.food2, this.eatFood, undefined, this);
   
    /* this.music = this.sound.add("music");
    let musicConfig = {
      mute: false,
      volume: 1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0
    }
    this.music.play(musicConfig); */
    //this.beamSound = this.sound.add("audio beam");

  }

  eatFood(ray, food){
    food.destroy(true); 
    //this.beamSound.play();
    this.score += 5;
    this.scoreLabel.text = "SCORE " + this.score;
  }
 
  moveShark(shark, speed){
    shark.x += speed;
    if(shark.x > 1000){
      this.resetShark(shark);
    }
  }

  resetShark(shark){
    shark.x = 0;
    let randomY = Phaser.Math.Between(0, 750);
    shark.y = randomY;
  }

  moveFood(food, speed){
    food.x += speed;
    if(food.x > 1000){
      this.resetFood(food);
    }
  }

  resetFood(food){
    food.x = 0;
    let randomY = Phaser.Math.Between(0, 750);
    food.y = randomY;
  }

  update() {
    this.moveShark(this.shark, 3);
    this.moveFood(this.food, 2);
    this.moveFood(this.food1, 3);
    this.moveFood(this.food2, 4);
    this.background.tilePositionX -= 0.5;
    this.movePlayerManager();
  }

  movePlayerManager(){
    if(this.cursorKeys.left.isDown){
      this.ray.setVelocityX(-500);
      //this.ray.anims.play('left', true);
    }
    else if(this.cursorKeys.right.isDown){
      this.ray.setVelocityX(500);
      //this.ray.anims.play('right', true);
    }
    else{ this.ray.setVelocityX(0);}

    if(this.cursorKeys.up.isDown){ 
      this.ray.setVelocityY(-500);
      //this.ray.anims.play('up', true);
    }
    else if(this.cursorKeys.down.isDown){
      this.ray.setVelocityY(500);
      //this.ray.play('down', true);
    }
    else{ this.ray.setVelocityY(0);}
  }
   
  
}
