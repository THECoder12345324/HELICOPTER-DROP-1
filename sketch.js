
//Defing variables and creating the the Engine


var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground, packagenum;
var START = 0;
var PLAY = 1;
var END = 2;
var FLIGHT = 3;
var gamestate = START;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);
	packagenum = 1;


	//Creating all of the objects and bodies
	packageSprite=createSprite(width/2, 80, 10,10);
	packageSprite.visible = false;
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2

	helicopterSprite=createSprite(width/2, 200, 10,10);
	helicopterSprite.visible = false;
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6

	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor=color(255)


	engine = Engine.create();
	world = engine.world;

	packageBody = Bodies.circle(width/2 , 200 , 5 , {restitution:0.8, isStatic:true});
	World.add(world, packageBody);
	

	//Create a Ground
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true});
 	World.add(world, ground);


	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(0);
  packageSprite.x= packageBody.position.x 
  packageSprite.y= packageBody.position.y 
  drawSprites();
  
  //The intro
  if (gamestate === START) {
	helicopterSprite.visible = false;
	packageSprite.visible = false;
	textSize(50);
	fill("white");
	text("HELICOPTER DROP", 150, 100);
	textSize(30);
	text("Press enter to start the Drop", 200, 200);
  }
  if (keyDown("ENTER") && gamestate === START) {
	  gamestate = PLAY;
  }


  // Tells Player to do the Drop
  if (gamestate === PLAY) {
	  textSize(20);
	  fill("white");
	text("Press the Down Arrow Key to Release the package!", 150, 100);
	helicopterSprite.visible = true;
	packageSprite.visible = true;
	if (keyDown("DOWN_ARROW")) {
		Matter.Body.setStatic(packageBody, false);
		packagenum = 2;
		gamestate = END;
	}
  }

  //Stuff to do after the drop
  if (gamestate === END) {
	  textSize(20);
	  fill("white");
	  text("Drop Complete!", 250, 100);
	  helicopterSprite.velocityX = 3;
  }
}

function keyPressed() {
 if (keyCode === DOWN_ARROW) {
    return true;
    
  }
  return false;
}