var particle;
//var attractor;

function setup() {
  createCanvas(640, 360);
  particle = new Particle(400, 50, 1);
  //attractor = new Attractor(width/2, height/2);
  //noLoop();
}


function mouseDragged() {
  console.log('drag');
}

function draw() {
  background(51);


  // Attractor attracts particle
  //var force = attractor.calculateAttraction(particle);
  //particle.applyForce(force);

  //particle.update();
  particle.display();

  //attractor.display();
}
