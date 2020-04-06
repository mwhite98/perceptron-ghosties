/*
    Base code from "The Nature of Code", Daniel Shiffman, http://natureofcode.com
    Code based on text "Artificial Intelligence", George Luger
*/

let rocket;
let desired;
let targets;
let numTargets = 11;
let obstacles;
let numObstacles = 1;

function makeTargets() {
  targets = new Array(numTargets);
  for (let i = 0; i < numTargets; i++) {
    targets[i] = new p5.Vector(random(width), random(height));
  }
}

function makeObstacles() {
  obstacles = new Array(numObstacles);
  for (let i=0; i < numObstacles; i++) {
    obstacles[i] = null;
  }
}

function setup() {
  createCanvas(700, 300);
  desired = new p5.Vector(width - width/8, height/2);
  makeTargets();
  makeObstacles();
  rocket = new Vehicle(targets.length, 0, random(height));
}

function draw() {
  background('pink');
  fill('blue');
  ellipse(desired.x, desired.y, 36, 36);

  for (let i=0; i < numTargets; i++) {
    fill('red');
    ellipse(targets[i].x, targets[i].y, 16, 16);
  }

  rocket.steer(targets, desired);
  rocket.update();
  rocket.display();
}
