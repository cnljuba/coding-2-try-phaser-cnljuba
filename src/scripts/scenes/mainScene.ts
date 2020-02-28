import ExampleObject from '../objects/exampleObject';
import Player from '../objects/player';
import { Scene } from 'phaser';

var gameSettings = {
  playerSpeed: 200,
}


export default class MainScene extends Phaser.Scene {
  //private ship: ExampleObject;
  shark;
  food;
  //public ray: Player;
  cursorKeys;
  ray;
  
  /* setVelocityX: number;
  setVelocityY: number; */  

  constructor() {
    super({ key: 'MainScene' });
  }
  /* setVelocityX(x:number){
    x = 0;
  }

  setVelocityY(y: number){
    y = 0;
  } */

  preload() {
    this.load.image("background", "assets/images/background.png");
    /* this.load.spritesheet("ray", "assets/images/raysprite.png", {
      frameWidth: 500,
      frameHeight: 206
    }); */
    //this.load.spritesheet("ray", "assets/images/ray.gif");
    //this.load.spritesheet("ship", "assets/images/ship.png");
    this.load.spritesheet("shark", "assets/images/shark.png");
    this.load.spritesheet("food", "assets/images/food.png");
    //this.load.multiatlas('ray', 'assets/images/raysprite.json', 'assets');
  }
   
  create() {
    let background = this.add.sprite(0,0, "background", "background.png");
    background.setOrigin(0,0);
    this.add.text(40,40,"Ocean Adventure",{font: "28px Arial", fill:"black"});
    //this.ray = this.add.sprite(500,375,'ray','ray.gif'); 
    //this.ray.setScale(0.5); 
    //this.ship = this.add.sprite(100, 100, 'ship','ship.png');
    //this.ship.setScale(5);
    this.shark = this.add.sprite(300, 300, 'shark','shark.png');
    this.shark.setScale(0.6);
    this.food = this.add.sprite(200,500,'food', 'food.png');
    this.food.setScale(0.2);
    
    /* this.anims.create({
      key:"swim",
      frames: this.anims.generateFrameNumbers("ray", {start:0, end:8}),
      frameRate: 20,
      repeat: -1
    }); */

    this.ray = this.physics.add.sprite(500, 375, "ray");
    this.ray.play("swim");
    this.ray.setScale(0.5);

    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.ray.setCollideWorldBounds(true);

    //this.food = this.physics.add.group();

    this.physics.add.collider(this.ray, this.shark, function(ray, shark){
      ray.destroy(true);
    });

    this.physics.add.collider(this.ray, this.food, function(ray, food){
       food.setActive(false);
    });

    this.physics.add.overlap(this.ray, this.food, this.eatFood);
  }

  eatFood(ray, food){
    food.disableBody(true, true);
  }
 
  moveShark(shark, speed){
    shark.x += speed;
    if(shark.x > 750){
      this.resetShark(shark);
    }
  }

  resetShark(shark){
    shark.x = 0;
    let randomY = Phaser.Math.Between(0, 900);
    shark.y = randomY;
  }

  moveFood(food, speed){
    food.x += speed;
    if(food.x > 750){
      this.resetFood(food);
    }
  }

  resetFood(food){
    food.x = 0;
    let randomY = Phaser.Math.Between(0, 900);
    food.y = randomY;
  }

  update() {
    this.moveShark(this.shark, 3);
    this.moveFood(this.food, 2);
    //this.background.tilePositionX -= 0.5;
    
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
