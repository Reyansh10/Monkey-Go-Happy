//Global Variables
var banana,obstacle,obstacleGroup,bananaGroup,jungle,score,monkey,monkeyimg;
var score=0;
var invisibleGround;
var PLAY = 2;
var END = 0;
var gameState = PLAY;
var gameOver;
function preload()
{
banana = loadImage("Banana.png");
obstacle = loadImage("stone.png");
jungleimg = loadImage("jungle.png");
gameOverimg = loadImage("GameOver.png");
monkeyimg = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
}


function setup() {
  createCanvas(400,400);
  var jungle = createSprite(200,200,400,400);
  jungle.addImage(jungleimg);
  monkey = createSprite(50,270);
  monkey.addAnimation("running",monkeyimg);
  monkey.scale=0.15;
  var score = 0;
  textSize(20);
 invisibleGround = createSprite(200,350,400,10);
  invisibleGround.visible = false;
  bananaGroup = createGroup();
  ObstaclesGroup = createGroup();
  gameOver = createSprite(200,200);
  gameOver.addImage(gameOverimg);
  gameOver.scale = 0.2;
  gameOver.visible = false;
}

function draw(){
 background(255);
  monkey.collide(invisibleGround);
  text("Score: "+score,270,50);
  if(gameState===PLAY)
  {
  if(bananaGroup.isTouching(monkey))
   {
     score = score+1;
     bananaGroup.destroyEach();
   }
  if(ObstaclesGroup.isTouching(monkey))
  {
    gameState = END  
  }
  banana1();
  stone();
 if(keyDown("space"))
 {
  monkey.velocityY = -10; 
 }
  monkey.velocityY = monkey.velocityY+0.8;
  }
  else
  if(gameState===END)
  {
    gameOver.visible = true;
   monkey.visible = false;
   bananaGroup.destroyEach();
   ObstaclesGroup.destroyEach();
   if(mousePressedOver(gameOver))
   {
     reset();
   }
  }
  drawSprites();
  }
function banana1()
{
  if(frameCount%60===0)
  {
    var bananagroup = createGroup();
   var ban = createSprite(400,random(60,270),10,10);
   ban.addImage(banana);
   ban.scale = 0.08
   ban.velocityX = -2;
   //ban.lifetime = 150;
   bananaGroup.add(ban);
  }
}
function stone()
{
  if(frameCount%150===0)
  {
    var obs = createSprite(400,300,10);
    obs.addImage(obstacle);
    obs.scale = 0.15;
    ObstaclesGroup.add(obs);
    obs.velocityX = -3;
    obs.lifetime = 150;
  }
}
function reset()
{
  gameOver.visible = false;
  monkey.visible = true;
  gameState = PLAY;
}