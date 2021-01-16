var tower,towerimg
var door,doorimg,doorgrp
var climber,climberimg,climbergrp
var ghost,ghostimg
var invisibleblock,inbgrp
var gamestate = "play"
var sound

function preload() {
 towerimg=loadImage ("tower.png");
 doorimg=loadImage("door.png") 
   doorgrp=new Group();
climberimg = loadImage("climber.png")
climbergrp=createGroup();
  ghostimg=loadImage("ghost-standing.png")
  sound=loadSound("spooky.wav")
  
}
function setup(){
createCanvas(600,600)  ;
tower= createSprite(300,300,10,10)
tower.addImage(towerimg)
tower.velocityY = 1.5 
 
 ghost= createSprite(200,200,10,10);
  ghost.addImage(ghostimg);
 ghost.scale=0.5 
  
  inbgrp=createGroup();
  
}
function draw(){

 if(gamestate==="play") {
  // sound.loop()
  if(tower.y>400) {
  tower.y = 300;
}
  
  if(keyDown("left_arrow")){
    ghost.x= ghost.x-3
  }
  
  if(keyDown("right_arrow")){
    ghost.x= ghost.x+3
  }
  if(keyDown("space")){
    ghost.velocityY = -3
  }
  ghost.velocityY = ghost.velocityY+0.6
  
  if(climbergrp.isTouching(ghost)){
    ghost.velocityY = 0
  }
 if(inbgrp.isTouching(ghost)||ghost.y>600) {
   ghost.destroy();
   gamestate="end"
 }
 
 doors();
   drawSprites();  
 }
  if(gamestate==="end"){
    fill("red")
    textSize(40)
    text("Game Over",230,250)
    tower.velocityY= 0
  }

}

function doors(){
 if(frameCount%240===0) {
  
   
   door=createSprite(200,-50,10,10)
   door.addImage(doorimg)
   door.x=Math.round(random(120,400))
   door.velocityY = 1
   door.lifetime = 550
   doorgrp.add(door);
   
   climber=createSprite(200,10,10,10)
   climber.addImage(climberimg)
   climber.x=door.x
   climber.velocityY = 1
   climber.lifetime = 550
   climbergrp.add(climber);
   
   invisibleblock=createSprite(200,15)
   invisibleblock.width = climber.width
   invisibleblock.height = 2
   invisibleblock.x = door.x
   invisibleblock.velocityY = 1
   invisibleblock.debug = true;
  inbgrp.add(invisibleblock);
 }
}