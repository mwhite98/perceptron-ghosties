/*
    Base code from "The Nature of Code", Daniel Shiffman, http://natureofcode.com
    Code based on text "Artificial Intelligence", George Luger

*/

// A list of points we will use to "train" the perceptron
let training = new Array(2000);
// A Perceptron object
let ptron;
// Input mic
let mic;

// We will train the perceptron with one "Point" object at a time
let count = 0;

// Coordinate space
let xmin = -1;
let ymin = -1;
let xmax = 1;
let ymax = 1;

// The function to describe a line
function f(x) {
  let y = 0.3 * x + 0.4;
  return y;
}

// function preload() {
//   loadFont("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");
// }

function setup() {
  let cnv = createCanvas(600, 600, WEBGL);
  cnv.mousePressed(userStartAudio);
  textAlign(CENTER);
  mic = new p5.AudioIn();
  mic.start();

  let myDiv = createDiv('tap to start');
  myDiv.style('font-family', 'Inconsolata');

  // The perceptron has 3 inputs -- x, y, and bias
  // Second value is "Learning Constant"
  ptron = new Perceptron(3, 0.001); // Learning Constant is low just b/c it's fun to watch, this is not necessarily optimal

  // Create a random set of training points and calculate the "known" answer
  for (let i = 0; i < training.length; i++) {
    let x = random(xmin, xmax);
    let y = random(ymin, ymax);
    let answer = 1;
    if (y < f(x)) answer = -1;
    training[i] = {
      input: [x, y, 1],
      output: answer
    };
  }
}


function draw() {
  background(250);
  fill(255);
  text('tap to start', width/2, 20);

  volume = mic.getLevel();

  // Train the Perceptron with one "training" point at a time
  ptron.train(training[count].input, training[count].output);
  count = (count + 1) % training.length;

  // Draw all the points based on what the Perceptron would "guess"
  // Does not use the "known" correct answer
  // for (let i = 0; i < count; i++) {
  //   stroke(255);
  //   strokeWeight(1);
  //   fill('red');
  //   let guess = ptron.feedforward(training[i].input);
  //   if (guess > 0) noFill();

  //   let x = map(training[i].input[0], xmin, xmax, 0, width);
  //   let y = map(training[i].input[1], ymin, ymax, height, 0);

  //   ellipse(x, y, volume * 40, volume * 40);
  // }

  // 3D shape mock-ups
  // Home base
  let c = color(255, 204, 0); // Define color 'c'
  fill(c);
  noStroke();
  rect(90, 40, 55, 55);

  // Obstacle
  normalMaterial();
  push();
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  noStroke();
  sphere(70 + volume * 60, 24, 24);
  pop();

}