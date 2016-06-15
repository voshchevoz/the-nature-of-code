var Particle = function(x, y, m) {
  this.pos = createVector(x, y);
  this.vel = createVector(1, 0);
  this.acc = createVector(0, 0);
  this.mass = m;
  this.radius = this.mass * 16;
  this.selected = false;
  // this stores velocity vector unnormalized - required to render vector itself
  this.velCoord = createVector(0, 0);

  //generate random initial velocity vector
  var motion = floor(random(4));
  switch (motion) {
    case 0:
      this.velCoord = createVector(this.radius, 0);
      break;
    case 1:
      this.velCoord = createVector(-this.radius, 0);
      break;
    case 2:
      this.velCoord = createVector(0, this.radius);
      break;
    case 3:
      this.velCoord = createVector(0, -this.radius);
      break;
  };

  // normalize initial velocity
  this.vel = this.velCoord.copy().normalize();


  this.select = function() {
    // mark as selected if mouse is inside the circle
    if(dist(mouseX, mouseY, this.pos.x, this.pos.y) < this.radius) {
      this.selected = true;
    }
    // otherwise deselect
    else {
      this.selected = false;
    }
  };

  this.applyForce = function(force) {
    var f = force.copy();
    f.div(this.mass);
    this.acc.add(f);
  };


  this.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  };

  this.display = function() {
    stroke(37, 37, 37);
    strokeWeight(2);

    if(this.selected && !running) {
      //mouse is inside circle

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
    else {
      // not selected, mouse inside circle
      if(dist(mouseX, mouseY, this.pos.x, this.pos.y) < this.radius) {
        if (!running) {
          cursor(MOVE);
          fill(128, 124, 90);
        }
      }
      else {
        //mouse is outside circle
        fill(69, 74, 112);
      }
    }

    ellipse(this.pos.x, this.pos.y, this.radius, this.radius);

    // modify velocity line only for selected circle
    if (this.selected) {
      this.velCoord = createVector(mouseX, mouseY).sub(this.pos);

      // normalize velocity
      this.vel = this.velCoord.copy().normalize();
    }

    // draw velocity vector starting from circle center ending at velCoords
    // draw only if simulation not running
    if(!running) {
      var lineEnd = p5.Vector.add(this.pos, this.velCoord)
      line(this.pos.x, this.pos.y, lineEnd.x, lineEnd.y);
    }

    // returns trace of the current position
    this.getTrace = function() {
      return new Trace(this.pos.x, this.pos.y);
    };
  };
}
