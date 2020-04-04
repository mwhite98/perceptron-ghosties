/*
    Base code from "The Nature of Code", Daniel Shiffman, http://natureofcode.com
    Code based on text "Artificial Intelligence", George Luger

*/

// A list of points we will use to "train" the perceptron
let training = new Array(400);
// A Perceptron object
let ptron;
// Input mic
let mic;

// We will train the perceptron with one "Point" object at a time
let count = 0;

// Coordinate space
let xmin = -1;
let ymin = -1;
let zmin = -1;
let xmax = 1;
let ymax = 1;
let zmax = 1;

// The function to describe a plane
function f(x, y) {
  let z = 0.3 * x + 0.4 * y + 0.5;
  return z;
}

function setup() {
  let cnv = createCanvas(1600, 800, WEBGL);
  cat = loadImage("assets/cat.jpg");
  women = loadImage("assets/women.jpg");
  cnv.mousePressed(userStartAudio);
  textAlign(CENTER);
  mic = new p5.AudioIn();
  mic.start();

  // The perceptron has 3 inputs -- x, y, and bias
  // Second value is "Learning Constant"
  ptron = new Perceptron(3, 1000); // Learning Constant is low just b/c it's fun to watch, this is not necessarily optimal

  // Create a random set of training points and calculate the "known" answer
  for (let i = 0; i < training.length; i++) {
    let x = random(xmin, xmax);
    let y = random(ymin, ymax);
    let z = random(zmin, zmax);
    let answer = 1;
    if (z < f(x, y)) answer = -1;
    training[i] = {
      input: [x, y, z, 1],
      output: answer,
    };
  }
}

function draw() {
  background(255);
  let radius = width * 2;
  text("tap to start", width / 2, 20);
  volume = mic.getLevel();
  //volume = volume * 10;
  //drag to move the world.
  orbitControl();

  translate(0, 0, 0);
  for (let i = 0; i <= 19; i++) {
    for (let j = 0; j <= 19; j++) {
      count = (i + 1) * j;
      ptron.train(training[count].input, training[count].output);
      push();
      let a = (j / 19) * PI;
      let b = (i / 19) * PI;
      translate(
        sin(2 * a) * radius * sin(b),
        (cos(b) * radius) / 2,
        cos(2 * a) * radius * sin(b)
      );
      let guess = ptron.feedforward([
        sin(2 * a) * radius * sin(b),
        (cos(b) * radius) / 2,
        cos(2 * a) * radius * sin(b),
        1,
      ]);
      if (volume < 0.1) {
        volume = 0.1;
      }
      if (guess > 0) {
        texture(women);
        sphere(100);
        //torus(volume * 160, volume * 40, 64, 64);
      } else {
        rotateZ(frameCount * 0.01);
        rotateX(frameCount * 0.01);
        rotateY(frameCount * 0.01);
        texture(cat);
        //fill("blue");
        box(200, 200, 200);
      }
      pop();
    }
  }
}

function draw2() {
  background(0);
  fill(255);
  text("tap to start", width / 2, 20);

  volume = mic.getLevel();

  // Train the Perceptron with one "training" point at a time
  ptron.train(training[count].input, training[count].output);
  count = (count + 1) % training.length;

  // Draw all the points based on what the Perceptron would "guess"
  // Does not use the "known" correct answer
  for (let i = 0; i < count; i++) {
    stroke(255);
    strokeWeight(1);
    fill("red");
    let guess = ptron.feedforward(training[i].input);
    if (guess > 0) noFill();

    let x = map(training[i].input[0], xmin, xmax, 0, width);
    let y = map(training[i].input[1], ymin, ymax, height, 0);

    ellipse(x, y, volume * 40, volume * 40);
  }
}
