class Box{
  constructor(x, y, width, height, color){
  var options = {
      'restitution':0.8,
      'friction':1.0,
      'density':1.0
  }
  this.body = Bodies.rectangle(x, y, width, height, options);
  World.add(world, this.body);
  this.color = color || random(0,255);
  this.Visibility = 255;
  this.images = [loadImage("blocks/Block1.2.png.png"),
  loadImage("blocks/Block1.png.png"),
  loadImage("blocks/Block2.2.png.png"),
  loadImage("blocks/Block2.png.png"),
  loadImage("blocks/Block3.png.png"),
  loadImage("blocks/Block5.2.png.png"),
  loadImage("blocks/Block5.png.png"),
  loadImage("blocks/Block6.2.png.png"),
  loadImage("blocks/Block6.png.png")];
  this.image = round(random(0,this.images.length-1));
  }
  display(){
    push();
    imageMode(CENTER);
    if(this.body.speed < 4){
      colorMode(HSB);
      push();
      translate(this.body.position.x, this.body.position.y);
      rotate(this.body.angle);
      image(this.images[this.image],0,0);
      pop();
      if(frameCount%30===0)
        this.image = round(random(0,this.images.length-1));
    }
    else{
      World.remove(world,this.body);
      tint(255,this.Visibility)
      image(this.images[this.image],this.body.position.x,this.body.position.y);
      if(this.Visibility > 0){
        gameScore++;
        this.Visibility -= 10;
      }
    }
    pop();
  }
};