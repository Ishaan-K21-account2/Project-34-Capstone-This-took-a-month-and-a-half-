
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const body = Matter.body
const Body = Matter.Body;
const Composite = Matter.Composite
const Composites = Matter.Composites
const Constraint = Matter.Constraint

var rope
var rope2
var rope3
var up_arrow
var left_arrow
var right_arrow
var basket
var cut_button
var basket2
var cut_button2

var score = 0
var basket_image


function preload() {
  basketImg = loadImage("Basket.png")
  ballImg = loadImage("Basketball.png")
  bgImg = loadImage("Background.jpg")
  
}


function setup() {
  createCanvas(800, 800);

  engine = Engine.create();
  world = engine.world;

  cut_button = createImg('cutter.png')
  cut_button.position(225, 30)
  cut_button.size(50, 50)
  cut_button.mouseClicked(drop)

  cut_button2 = createImg('cutter.png')
  cut_button2.position(64 , 120)
  cut_button2.size(50, 50)
  cut_button2.mouseClicked(drop2)

  cut_button3 = createImg('cutter.png')
  cut_button3.position(320, 90)
  cut_button3.size(50, 50)
  cut_button3.mouseClicked(drop3)

  var ball_options = {
    restitution: 0.5,
    frictionAir: 0.01
  }

  var ground_options = {
    isStatic: true
  }

  ball = Bodies.circle(240, 60, 15, ball_options)
  
  ball2 = Bodies.circle(310, 90, 15, ball_options)
  
  
  ground = Bodies.rectangle(400, 790, 800, 20, ground_options)

  World.add(world, ball)
  World.add(world,ball2)
  World.add(world, ground)

  rope = new Rope(7, { x: 245, y: 30 })
  rope2 = new Rope(7 , {x:70, y:125})
  rope3= new Rope(4, {x:355, y:95})

  ball_con = new Link(rope, ball)
  ball_con2 = new Link(rope2, ball)
  ball_con3 = new Link(rope3, ball2)



  up_arrow = createImg('up_green_result.png')
  up_arrow.position(550, 50)
  up_arrow.size(50, 50)
  up_arrow.mouseClicked(up)

  left_arrow = createImg('left_green_result.png')
  left_arrow.position(500, 100)
  left_arrow.size(50, 50)
  left_arrow.mouseClicked(left)

  right_arrow = createImg('right_green_result.png')
  right_arrow.position(600, 100)
  right_arrow.size(50, 50)
  right_arrow.mouseClicked(right)



  basket = createSprite(random(50, 600), random(450, 600), 100, 100)
  basket.addImage(basketImg)
  basket.scale = 0.5


  basket2 = createSprite(random(600, 750), random(350, 500), 100, 100)
  basket2.addImage(basketImg)
  basket2.scale = 0.5


}


function draw() {
  background(bgImg);
  fill("black")
  textSize(20, 20)
  text("Score: " + score, 50, 50)

  Engine.update(engine);


  rope.show()
  rope2.show()
  rope3.show()
  
  rectMode(CENTER)
  push()

  
  ellipseMode(RADIUS)
  
 if (ball!= null) {
  image(ballImg , ball.position.x, ball.position.y, 50 , 50)
  
 }
 if (ball2!= null) {
  
  image(ballImg , ball2.position.x, ball2.position.y, 50 , 50)
 }
pop()
  rect(ground.position.x, ground.position.y, 800, 20)

  if (collision_with_basket(ball, basket , 75) == true) {
    score +=  Math.round(random(5,15))
    World.remove(world, ball)
    ball = null;
  }


  if (collision_with_basket(ball, basket2 , 65) == true) {
    score += Math.round(random(5,15))
    World.remove(world, ball)
    ball = null;
  }


  if (collision_with_basket(ball2, basket , 75) == true) {
    score += Math.round(random(5,15))
    World.remove(world, ball2)
    ball2 = null;
  }

  if (collision_with_basket(ball2, basket2 , 65) == true) {
    score += Math.round(random(5,15))
    World.remove(world, ball2)
    ball2 = null;
  }
  
  
  drawSprites()

}

function drop() {
  rope.break();
  ball_con.dettach();
  ball_con = null;
}

function drop2() {
  rope2.break();
  ball_con2.dettach();
  ball_con2 = null;
}

function drop3() {
  rope3.break();
  ball_con3.dettach();
  ball_con3 = null;
}

function up() {
  if(ball!=null){
    Matter.Body.applyForce(ball, { x: 0, y: 0 }, { x: 0, y: -0.01 })
  }
  if (ball2!=null){
  Matter.Body.applyForce(ball2, { x: 0, y: 0 }, { x: 0, y: -0.01 })}
}


function left() {
  if(ball!=null){
    Matter.Body.applyForce(ball, { x: 0, y: 0 }, { x: -0.01, y: 0 })
  }
  if (ball2!=null){
  Matter.Body.applyForce(ball2, { x: 0, y: 0 }, { x: -0.01, y: 0})}
}

function right() {
  if(ball!=null){
    Matter.Body.applyForce(ball, { x: 0, y: 0 }, { x: 0.01, y: 0 })
  }
  if (ball2!=null){
  Matter.Body.applyForce(ball2, { x: 0, y: 0 }, { x: 0.01, y: 0 })}
 
}


function collision_with_basket(objectA, objectB , a) {
  if (objectA!=null) {
    d = dist(objectA.position.x, objectA.position.y, objectB.position.x, objectB.position.y)
    if (d <= a) {
      return true
    }
    else {
      return false
    }
  }
}
