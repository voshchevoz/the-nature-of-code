var Particle = function() {
  this.pos = createVector(400, 50);
  this.vel = createVector(1, 0);
  this.acc = createVector(0, 0);
  this.mass = 1;
  this.radius = this.mass * 16;

  this.display = function() {
    stroke(0);
    strokeWeight(2);
    //fill(255, 127);

    if(dist(mouseX, mouseY, this.pos.x, this.pos.y) < this.radius) {
      //mouse is inside circle

      if(mouseIsPressed) {
        //mouse is being dragged
        fill(255, 0, 0);

        //move the circle to the mouse position
        this.pos.x = mouseX;
        this.pos.y = mouseY;
      }
      else {
        //mouse is not clicked
        fill(0, 255, 0);
      }
    }
    else{
      //mouse is outside circle
      fill(0, 0, 255);
    }

    ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
  }
}
