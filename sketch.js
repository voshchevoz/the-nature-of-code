var w = new Array(0);

function setup() {
  createCanvas(640, 360);
  frameRate(5);

  // Make a Walker object
  var c = color('rgba(100%,0%,0%,0.5)');
  append(w, new Walker(10, c, width / 2, height / 2))
}

function draw() {
  background(51);
  // Update and display object

  for (i = 0; i < w.length; i++) {
    w[i].update();
    w[i].display();
  }
}

// create random walker at (x, y) coordinate with given stroke width and given color
function Walker(aStroke, aColor, x, y) {
  // Start Walker in center and initialize cache of coordinates visited by the walker
  this.posCache = [createVector(x, y)];

  // stroke width
  this.stroke = aStroke;
  // stroke color
  this.color = aColor;

  // if true SAW can't make any further step
  this.deadend = false;


  // this function checks if a walker has already visited coordinate newCoord
  this.isValidStep = function(newCoord) {
    for (j = this.posCache.length - 1; j >= 0; j--) {
      if (this.posCache[j].x == newCoord.x && this.posCache[j].y == newCoord.y) {
        return false;
      }
    }
    return true;
  }

  // given last step this function generated an array of valid steps from this point
  this.getValidSteps = function(lastStep) {
    var res = new Array(0);
    var step = p5.Vector.add(lastStep, createVector(this.stroke, 0));
    if (this.isValidStep(step)) {
      append(res, createVector(step.x, step.y));
    }
    step = p5.Vector.add(lastStep, createVector(-this.stroke, 0));
    if (this.isValidStep(step)) {
      append(res, createVector(step.x, step.y));
    }
    step = p5.Vector.add(lastStep, createVector(0, this.stroke));
    if (this.isValidStep(step)) {
      append(res, createVector(step.x, step.y));
    }
    step = p5.Vector.add(lastStep, createVector(0, -this.stroke));
    if (this.isValidStep(step)) {
      append(res, createVector(step.x, step.y));
    }

    return res;
  }

  this.update = function() {
    // init new coordinate with the last walker step. copy to a new vector
    var lastStep = this.posCache[this.posCache.length - 1];
    //var newPos = createVector(lastStep.x, lastStep.y);

    // randomly generate new step from a set of valid steps
    // if no valid steps exists mark this path as deadend
    if (!this.deadend) {
      var validSteps = this.getValidSteps(lastStep);
      var len = validSteps.length;
      if (len != 0) {
        var motion = floor(random(len));
        var newPos = validSteps[motion];
        // add new step to the cache of visited coordinates
        append(this.posCache, newPos);
      }
      else {
        this.deadend = true;
      }
    }
  }

  this.display = function() {
    strokeWeight(this.stroke);
    stroke(this.color);
    for (i = 0; i < this.posCache.length; i++) {
      point(this.posCache[i].x, this.posCache[i].y);
    }

    if (this.deadend) {
      text("dead-end", 10, 30);
    }

  }
}
