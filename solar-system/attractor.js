var Attractor = function(x, y) {
  this.pos = createVector(x, y);
  this.mass = 20;
  this.G = 1;
  this.radius = this.mass * 2;

  this.calculateAttraction = function(p) {
    // Calculate direction of force
    var force = p5.Vector.sub(this.pos, p.pos);
    // Distance between objects
    var distance = force.mag();
    // Artificial constraint
    distance = constrain(distance, 3, 25);
    // Normalize vector (distance doesn't matter here, we just want this vector for direction)
    force.normalize();
    // Calculate gravitational force magnitude
    var strength = (this.G * this.mass * p.mass) / (distance * distance);
    // Get force vector --> magnitude * direction
    force.mult(strength);
    return force;
  };

  // Method to display
  this.display = function() {

    // if mouse is inside the circle
    if(dist(mouseX, mouseY, this.pos.x, this.pos.y) < this.radius) {
      // set cursor on hover
      if (!running) {
        cursor(MOVE);
      }

      if(mouseIsPressed) {
        //mouse is being dragged
        fill(87, 96, 80);

        //move the circle to the mouse position
        this.pos.x = mouseX;
        this.pos.y = mouseY;
      }
      else {
        //mouse is not clicked
        fill(128, 124, 90);
      }
    }
    else
    {
      // reset cursor when leaving shape
      cursor(ARROW)
      fill(163, 156, 90);
    }

    ellipseMode(CENTER);
    strokeWeight(4);
    stroke(37, 37, 37);
    ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
  };
};
