var particles = [];
var running = false;
var attractors = [];
var traces = [];

var cnv;
var tracesCheckbox;

function setup() {
  cnv = createCanvas(windowWidth * 0.8, 450);
  cnv.parent('sketch-holder');

  particle1 = new Particle(400, 50, random(1, 3));
  particle2 = new Particle(300, 100, random(1, 3));
  particles.push(particle1);
  particles.push(particle2);

  attractor = new Attractor(width/2, height/2);
  attractor1 = new Attractor(width/4, height/4);
  attractors.push(attractor);
  attractors.push(attractor1);

  tracesCheckbox = createCheckbox('Show traces', true);
  tracesCheckbox.parent('chb');
  //noLoop();
};

// adds global key listener
function keyPressed() {
  // starts/stops simulation by pressing space key, 32 = space key
  if (keyCode == 32) {
    running = !running;
  }
  return false;
};

// adds global mouse listener
function mousePressed() {
  // allowing particles selection only if simulation is not running
  if (!running) {
    for (var i = 0; i < particles.length; i++) {
      particles[i].select();
    }
  }

  if (keyIsPressed && keyCode == SHIFT)
  {
    p = new Particle(mouseX, mouseY, random(1, 3));
    particles.push(p);
  }

  if (keyIsPressed && keyCode == CONTROL)
  {
    a = new Attractor(mouseX, mouseY);
    attractors.push(a);
  }
};

function draw() {
  background(57, 58, 67);

  // render attractors
  for (var i = 0; i < attractors.length; i++) {
    attractors[i].display();
  }

  // render traces if specified
  if (tracesCheckbox.checked()) {
    for (var i = 0; i < traces.length; i++) {
      traces[i].display();
    }
  }

  // calculate and render particles
  for (var i = 0; i < particles.length; i++) {
    // update particles only if simulation is running
    if (running) {

      // Attractor attracts particle
      for (var j = 0; j < attractors.length; j++) {
        var force = attractors[j].calculateAttraction(particles[i]);
        particles[i].applyForce(force);
      }
      particles[i].update();
    }
    particles[i].display();

    traces.push(particles[i].getTrace());
  }

  // render help text
  noStroke();
  fill(163, 126, 90);
  textAlign(RIGHT);
  textFont("Georgia");
  textSize(14);
  text("space - start/stop simulation\nshift+click - add particle\nparticle's size is proportional to it's mass\nctrl+click - add attractor\ndrag object with mouse when paused\nparticle's line denotes velocity vector direction", width - 10, height - 100);

};

function windowResized() {
  resizeCanvas(windowWidth * 0.8, 450);
}

