/*
    Base code from "The Nature of Code", Daniel Shiffman, http://natureofcode.com
    Code based on text "Artificial Intelligence", George Luger
*/

let rocket;
let desired;
let obstacles;
let numObstacles = 8;
// let obstacles;
// let numObstacles = 1;
let stopped = false;

function makeObstacles() {
  obstacles = new Array(numObstacles);
  for (let i = 0; i < numObstacles; i++) {
    obstacles[i] = new p5.Vector(random(width), random(height));
  }
}

// function makeObstacles() {
//   obstacles = new Array(numObstacles);
//   let o_width = 10;
//   let o_height = 100;
//   for (let i=0; i < numObstacles; i++) {
//     obstacles[i] = new Obstacle(width/4, height/2 - o_height/2, o_width, o_height);
//   }
// }

function setup() {
  createCanvas(700, 300);
  desired = new p5.Vector(width - width/8, height/2);
  makeObstacles();
  // makeObstacles();
  rocket = new Vehicle(obstacles.length, 0, random(height));
}

function draw() {
  background('pink');
  fill('blue');
  ellipse(desired.x, desired.y, 36, 36);

  // Draw the obstacles
  for (let i=0; i < numObstacles; i++) {
    fill('red');
    ellipse(obstacles[i].x, obstacles[i].y, 16, 16);
  }

  // // Draw the obstacles
  // for (let i = 0; i < obstacles.length; i++) {
  //   obstacles[i].display();
  //   if (obstacles[i].contains(rocket.position)) {
  //     stopped = true;
  //   }
  // }

  rocket.steer(obstacles, desired);
  rocket.update();
  rocket.display();
}
