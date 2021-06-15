
const {Engine, World, Bodies, Body, Constraint} = Matter;
var stand1, stand2, sqrs = [], toConnect = false, rocks = [],currentRock = 0, gameScore = 0, backgroundclr;
function preload(){
  setBackground();
}
function setup() {
  createCanvas(800,400); 
  engine = Engine.create();
  world = engine.world;
 
  stand1 = new Ground(300,350,200,10);
  stand2 = new Ground(600,200,200,10);

  drawTowers();

  rocks.push(new Rock(150,100,random(3,6),50));
 
  sling = new SlingShot(rocks[currentRock].body,{x: 150, y: 90});
}
function draw() {
  if(backgroundclr)
    background(backgroundclr);  
  else{
    setBackground();
    background("white");
  }
  
  stand1.display();
  stand2.display();

  for(i = 0; i < sqrs.length; i++)
    sqrs[i].display();
 
  let j = 0;
  while(j < rocks.length){
    rocks[j].display();
    j++;
  }
  if(sling.sling.bodyA)
    sling.display();
 
  if(toConnect)
    Body.setPosition(rocks[currentRock].body,{x: mouseX, y: mouseY});

  push();
  textSize(20);
  textAlign(CENTER);
  fill(0,0,255,100);
  text("Drag the stone and release it towards the blocks",width/2,50);
  fill(0,0,255,100);
  text("press r to reset", width/1.4,300);
    pop();

  Engine.update(engine); 
}
function mouseDragged(){
   toConnect = true;
}
function mouseReleased(){
  sling.fly();
  toConnect = false;
  let t = setTimeout(function(){
    rocks.push(new Rock(150,100,random(3,6),50));
    currentRock++;
    sling.sling.bodyA = rocks[currentRock].body;
    clearTimeout(t);
  },100);
}

function keyPressed(){
  if(key === "r"){
    for(i = rocks.length-1; i>=0; i--){
      World.remove(world,rocks[i].body);
      rocks.splice(i,1);
      currentRock--;
    }
    rocks.push(new Rock(150,100,random(3,6),50)); 
    currentRock++;
    sling.sling.bodyA = rocks[currentRock].body; 
    for(i = sqrs.length-1; i>=0; i--){
      World.remove(world,sqrs[i].body);
      sqrs.splice(i,1);
    }
    drawTowers();
    gameScore = 0;
  }
}
function drawTowers(){
  let pos1 = stand1.body.vertices[0];
  for(i = pos1.x+25; i <= stand1.body.vertices[1].x-25; i+=25)
    sqrs.push(new Box(i,pos1.y-17.5,25,25));
  for(i = pos1.x+50; i <= stand1.body.vertices[1].x-50; i+=25)
    sqrs.push(new Box(i,pos1.y-42.5,25,25));
  for(i = pos1.x+75; i <= stand1.body.vertices[1].x-75; i+=25)
    sqrs.push(new Box(i,pos1.y-67.5,25,25));
  for(i = pos1.x+100; i <= stand1.body.vertices[1].x-100; i+=25)
    sqrs.push(new Box(i,pos1.y-92.5,25,25));

  pos1 = stand2.body.vertices[0];
  for(i = pos1.x+25; i <= stand2.body.vertices[1].x-25; i+=25)
    sqrs.push(new Box(i,pos1.y-17.5,25,25));
  for(i = pos1.x+50; i <= stand2.body.vertices[1].x-50; i+=25)
    sqrs.push(new Box(i,pos1.y-42.5,25,25));
  for(i = pos1.x+75; i <= stand2.body.vertices[1].x-75; i+=25)
    sqrs.push(new Box(i,pos1.y-67.5,25,25));
  for(i = pos1.x+100; i <= stand2.body.vertices[1].x-100; i+=25)
    sqrs.push(new Box(i,pos1.y-92.5,25,25));
}
async function setBackground(){
  let response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Calcutta");
  let responseJSON = response.json();
  let hour = responseJSON.datetime.slice(11,13);
  let col;
  if(hour > 6 && hour < 18)
    col = color(100,100,255);
  else
    col = color(0,0,0);
  backgroundclr = col;
}