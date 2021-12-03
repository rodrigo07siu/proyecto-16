
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var bow , arrow,  background, redB, pinkB, greenB ,blueB ,arrowGroup;
var bowImage, arrowImage, green_balloonImage, red_balloonImage, pink_balloonImage ,blue_balloonImage, backgroundImage;

var score =0;
function preload(){
  
  backgroundImage = loadImage("background0.png");
  
  arrowImage = loadImage("arrow0.png");
  bowImage = loadImage("bow0.png");
  red_balloonImage = loadImage("red_balloon0.png");
  green_balloonImage = loadImage("green_balloon0.png");
  pink_balloonImage = loadImage("pink_balloon0.png");
  blue_balloonImage = loadImage("blue_balloon0.png");
  
}



function setup() {
  createCanvas(400, 400);
  
  //crear fondo
  scene = createSprite(0,0,400,400);
  scene.addImage(backgroundImage);
  scene.scale = 2.5
  
  //crear arco para disparar flechas
  bow = createSprite(380,220,20,50);
  bow.addImage(bowImage); 
  bow.scale = 1;
  
   score = 0  
  redB= new Group();
  greenB= new Group();//Crear un grupo para greenBalloon (globo verde)
  blueB= new Group();
  pinkB= new Group();//Crear un grupo para blueBalloon (globo azul)
 //Crear un grupo para pinkBalloon (globo rosa)
  
  arrowGroup= new Group();
 
  
}

function draw() {
 background(0);
 if(gameState === PLAY){

  //mover el suelo
    scene.velocityX = -3 

    if (scene.x < 0){
      scene.x = scene.width/2;
    }
  
  //mover el arco
  bow.y = World.mouseY
  
   //liberar la flecha al presionar la barra espaciadora
  if (keyDown("space")) {
    createArrow();
    
  }
  
  //crear enemigos continuos
  var select_balloon = Math.round(random(1,4));
  
  if (World.frameCount % 100 == 0) {
    switch(select_balloon ){
      case 1: redBalloon();
      break;
      case 2:blueBalloon();
      break;
      case 3:pinkBalloon();
      break;
      case 4:greenBalloon();
      break;
      default:break;
    }
  }

  if (arrowGroup.isTouching(redB)) {
    redB.destroyEach();

    gameState=END; 


}
 
  if (gameState === END) {
  arrowGroup.destroyEach();
  scene.velocityX = 0;
}

 
if (greenB.isTouching(arrowGroup)){       //Crear isTouching()
greenB.destroyEach();//Usar destroyEach() para destruir greenBalloon
arrowGroup.destroyEach();//Usar destroyEach() para destruir arrowGroup
 score = score + 3;//Incrementar la puntuación por 3.
}    
   






if (blueB.isTouching(arrowGroup)){    //Crear isTouching()
blueB.destroyEach();//Usar destroyEach() para destruir blueBalloon
arrowGroup.destroyEach();//Usar destroyEach() para destruir arrowGroup.
score = score + 2;//Incrementar la puntuación por 2.
}      





if (pinkB.isTouching(arrowGroup)){//Crear isTouching()
pinkB.destroyEach();//Usar destroyEach() para destruir el grupo pinkBalloon
arrowGroup.destroyEach();//Usar destroyEach() para destruir arrowGroup.
score = score + 1;//Incrementar la puntuación por 1.
}        




 }
  
  drawSprites();
  text("Puntuación: "+ score, 300,50);
}


function redBalloon() {
  var red = createSprite(0,Math.round(random(20, 370)), 10, 10);
  red.addImage(red_balloonImage);
  red.velocityX = 3;
  red.lifetime = 150;
  red.scale = 0.1;
  redB.add(red);
}

function blueBalloon() {
  var blue = createSprite(0,Math.round(random(20, 370)), 10, 10);
  blue.addImage(blue_balloonImage);
  blue.velocityX = 3;
  blue.lifetime = 150;
  blue.scale = 0.1;
 blueB.add(blue);//Agregar el grupo
}

function greenBalloon() {
  var green = createSprite(0,Math.round(random(20, 370)), 10, 10);
  green.addImage(green_balloonImage);
  green.velocityX = 3;
  green.lifetime = 150;
  green.scale = 0.1;
  greenB.add(green);//Agregar el grupo
}

function pinkBalloon() {
  var pink = createSprite(0,Math.round(random(20, 370)), 10, 10);
  pink.addImage(pink_balloonImage);
  pink.velocityX = 3;
  pink.lifetime = 150;
  pink.scale = 1
 pinkB.add(pink);//Agregar el grupo
}


//Crear flechas para el arco
 function createArrow() {
  var arrow= createSprite(100, 100, 60, 10);
  arrow.addImage(arrowImage);
  arrow.x = 360;
  arrow.y=bow.y;
  arrow.velocityX = -4;
  arrow.lifetime = 100;
  arrow.scale = 0.3;
  arrowGroup.add(arrow);
   
}
