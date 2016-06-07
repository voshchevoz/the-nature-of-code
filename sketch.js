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
  this.posCache = [createVector(width / 2, height / 2)];

  // Start Walker in center
  
  //this.vel = createVector(0, 0);
  
  this.isValidStep = function(newCoord) {
    for (j = this.posCache.length - 1; j >= 0; j--) {
      if (this.posCache[j].x == newCoord.x && this.posCache[j].y == newCoord.y) {
        return false;
      }
      return true;
    }
  }

  this.update = function() {
    var lastStep = this.posCache[this.posCache.length - 1];
    var newPos = createVector(lastStep.x, lastStep.y);

    while (!this.isValidStep(newPos)) {
      var motion = floor(random(4));
      switch(motion) {
        case 0:
          newPos.add(createVector(1, 0));
          break;
        case 1:
          newPos.add(createVector(-1, 0));
          break;
        case 2:
          newPos.add(createVector(0, 1));
          break;
        case 3:
          newPos.add(createVector(0, -1));
          break;
      }
    }

  //alert("updated")
    append(this.posCache, newPos);
  }

  this.display = function() {
    // Draw Walker as circle
    //fill(255);
    //rotate(PI*random(-1, 1));
    //image(img, this.pos.x, this.pos.y);
    
    strokeWeight(1);
    stroke("red");
    for (i = 0; i < this.posCache.length; i++) {
      point(this.posCache[i].x, this.posCache[i].y);
    }
    
    // ellipse(this.pos.x, this.pos.y, 48, 48);
  }
}
