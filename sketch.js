const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint; 

var boy, boyUploader; 

function preload () {
	var boyUploader = loadImage("Plucking mangoes/boy.png"); 
}

function setup () {
	createCanvas(800, 700);

	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.
	mango1 = new Mango(670, 625, 25, 25); 
	mango2 = new Mango(630, 590, 25, 25); 
	mango3 = new Mango(645, 570, 25, 25); 
	mango4 = new Mango(500, 450, 25, 25); 
	mango5 = new Mango(545, 420, 25, 25); 

	stoneObject = new StoneforThrowing(225, 440, 30, 30); 
	treeStanding = new Tree(700, 650, 50, 200); 
	ground = new Ground(400, 650, 800, 50); 
	chain = new ChainBS(stoneObject.body, {x: 235, y: 435}); 

	Engine.run(engine);
}

function draw () {
  rectMode(CENTER);
  background(0);
  
  mango1.display(); 
  mango2.display(); 
  mango3.display(); 
  mango4.display(); 
  mango5.display(); 

  stoneObject.display();
  treeStanding.display(); 
  ground.display(); 

  //log6.display();
  chain.display();   

  detectcollision(stoneObject, mango1); 
  detectcollision(stoneObject, mango2); 
  detectcollision(stoneObject, mango3); 
  detectcollision(stoneObject, mango4); 
  detectcollision(stoneObject, mango5); 
  
  drawSprites();
}

function keyPressed() {
	if (keyCode === 32) {
		Matter.Body.setPosition(stoneObject, {x: 235, y: 425}); 
		chain.attach(stoneObject.body); 
	}
}

function detectcollision(stone, mango) {
	mangoBodyPosition = mango.body.position; 
	stoneBodyPosition = stone.body.position; 

	var distance = dist(stoneBodyPosition.x, stoneBodyPosition.y, mangoBodyPosition.x, mangoBodyPosition.y); 

	if (distance <- mango.r + stone.r) {
		Matter.Body.setStatic(mango.body, false); 
	}
}

function mouseDragged(){
    Matter.Body.setPosition(stoneObject.body, {x: mouseX , y: mouseY});
}

function mouseReleased(){
    chain.fly();
} 