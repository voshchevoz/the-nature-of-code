var Particle = function(x, y, m) {
  this.pos = createVector(x, y);
  this.vel = createVector(1, 0);
  this.acc = createVector(0, 0);
  this.mass = m;
  this.radius = this.mass * 16;
  this.selected = false;

  //generate random initial velocity vector
  var motion = floor(random(4));
  switch (motion) {
    case 0:
      this.vel = createVector(this.radius, 0);
      break;
    case 1:
      this.vel = createVector(-this.radius, 0);
      break;
    case 2:
      this.vel = createVector(0, this.radius);
      break;
    case 3:
      this.vel = createVector(0, -this.radius);
      break;
  };

  // normalize initial velocity
  this.vel.normalize()

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

    // draw figure itself

    // Saves the "initial" state
    push();

    //make all parameters relative to the figure center
    translate(this.pos.x, this.pos.y);


    // modify velocity line only for selected circle
    if (this.selected) {
      var velCoord = createVector(mouseX, mouseY).sub(this.pos);

      // normalize velocity
      this.vel = velCoord.copy().normalize();
    }

    var theta = this.vel.heading() + radians(90);

    rotate(PI + theta);
    ellipse(0 - this.radius/2, 0, this.radius, this.radius);
    ellipse(0 + this.radius/2, 0, this.radius, this.radius);
    arc(0, 0, this.radius/2, this.radius * 3, TWO_PI, PI, OPEN);
    //ellipse(0, 0 + this.radius/2 , this.radius/2, this.radius * 2);

    pop(); // Return to the "initial" state.

    // returns trace of the current position
    this.getTrace = function() {
      return new Trace(this.pos.x, this.pos.y);
    };


  };
}

