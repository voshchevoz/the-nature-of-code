var particles = [];
var running = false;
//var attractor;

function setup() {
  createCanvas(640, 360);
  particle1 = new Particle(400, 50, 1);
  particle2 = new Particle(300, 100, 2);
  particles.push(particle1);
  particles.push(particle2);
  //attractor = new Attractor(width/2, height/2);
  //noLoop();
}

// adds global key listener
function keyPressed() {
  // starts/stops simulation by pressing space key, 32 = space key
  if (keyCode == 32) {
    running = !running;
  }
  return false;
}

// adds global mouse listener
function mousePressed() {
  // allowing particles selection only if simulation is not running
  if (!running) {
    for (var i = 0; i < particles.length; i++) {
      particles[i].select();
    }
  }
}

function draw() {
  background(51);


  // Attractor attracts particle
  //var force = attractor.calculateAttraction(particle);
  //particle.applyForce(force);
  //
  for (var i = 0; i < particles.length; i++) {
    // update particles only if simulation is running
    if (running) {
      particles[i].update();
    }
    particles[i].display();
  }


  //particle.update();
  //particle1.display();
  //particle2.display();

  //attractor.display();
}
