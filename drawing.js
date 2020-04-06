/*
    Base code from "The Nature of Code", Daniel Shiffman, http://natureofcode.com
    Code based on text "Artificial Intelligence", George Luger
*/

let rocket;
let desired;
let obstacles;
let numObstacles = 8;
let hitObstacle = false;
let border_width = 750;
let border_height = 350;

function makeObstacles() {
  obstacles = new Array(numObstacles);
  let o_width = 5;
  let o_height = 50;
  for (let i=0; i < numObstacles; i++) {
    obstacles[i] = new Obstacle(random(50, border_width), random(50, border_height), o_width, o_height);
  }
}

function setup() {
  createCanvas(800, 400);
  desired = new p5.Vector(border_width - border_width/8, border_height/2);
  makeObstacles();
  rocket = new Vehicle(obstacles.length, 0, random(border_height));
}

function draw() {
  background('pink');
  fill('blue');
  ellipse(desired.x, desired.y, 36, 36);

  // Draw the obstacles
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].display();
    if (obstacles[i].contains(rocket.position)) {
      hitObstacle = true;
    }
  }

  if (rocket.position.x > width || rocket.position.y > height) {
    fill(50);
    text("rocket is out of bounds (but it'll be back!)", width/2, 30);
  }

  rocket.steer(obstacles, desired);
  rocket.update(hitObstacle);
  hitObstacle = false;
  rocket.display();
}
