var w;
var img;

function setup() {
  createCanvas(640, 360);
  img = loadImage("poop.png");
  
  // Make a Walker object
  w = new Walker();
}

function draw() {
  background(51);
  // Update and display object
  w.update();
  w.display();
}

function Walker() {

  // Start Walker in center
  this.pos = createVector(width / 2, height / 2);
  this.vel = createVector(0, 0);

  this.update = function() {
    var mouse = createVector(mouseX, mouseY)
    
    this.acc = p5.Vector.sub(mouse, this.pos)
    this.acc.setMag(0.4)
    
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }

  this.display = function() {
    // Draw Walker as circle
    //fill(255);
    image(img, this.pos.x, this.pos.y);
    // ellipse(this.pos.x, this.pos.y, 48, 48);
  }
}
