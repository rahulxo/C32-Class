class Rock{
    constructor(x, y, sides, radius, color){
      this.color = color || random(0,255);
      var options = {
        'restitution':0.8,
        'friction':1.0,
        'density':1.0
        }
        this.sides = sides;
        this.radius = radius/2;
        this.body = Bodies.polygon(x, y, sides, this.radius, options);
        World.add(world, this.body);
      }
    display(){
        push();
        colorMode(HSB);
        fill(this.color,100,100);  
        beginShape();
        for(i = 0; i < this.body.vertices.length; i++){
            let xPos = this.body.vertices[i].x;
            let yPos = this.body.vertices[i].y;
            vertex(xPos,yPos);
        }  
        endShape(CLOSE);
        pop();
    }
   /* polygon(x, y, radius, sides) {
        let angle = TWO_PI / sides;
        beginShape();
        for (let a = 0; a < TWO_PI; a += angle) {
          let sx = x + cos(a) * radius;
          let sy = y + sin(a) * radius;
          vertex(sx, sy);
        }
        endShape(CLOSE);
      }*/
  };