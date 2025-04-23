let ps = []; 

function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 255);
}

function draw() {
  background(0);
  
  if (abs(pmouseX - mouseX) > 0 || abs(pmouseY - mouseY) > 0) {
    ps.push(new System(mouseX, mouseY));
  }
  
  for (let i=ps.length-1; i>=0; i--) {
    ps[i].update();
    ps[i].display();
    
    if (ps[i].done) {
      ps.splice(i, 1);
    }
  }
}
