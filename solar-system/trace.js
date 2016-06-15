var Trace = function(x, y) {
  this.pos = createVector(x, y);


  this.display = function() {
    stroke(65, 68, 88);
    strokeWeight(2);

    point(x, y);
  };
};
