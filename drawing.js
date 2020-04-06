/*
    Base code from "The Nature of Code", Daniel Shiffman, http://natureofcode.com
    Code based on text "Artificial Intelligence", George Luger
*/

let rocket;
let desired;
let obstacles;
let numObstacles = 8;
let hitObstacle = false;

let haunted_house;
let bkg_image;
let obstacle_image;
let ghost_1;
let ghost_2;
let ghost_3;
let ghost_4;
let frame = 0;
let displayImage;

function makeObstacles(border_width, border_height) {
  obstacles = new Array(numObstacles);
  let o_width = 7;
  let o_height = 70;
  for (let i=0; i < numObstacles; i++) {
    obstacles[i] = new Obstacle(random(50, border_width), random(50, border_height), o_width, o_height);
  }
}

function preload() {
  ghost_1 = loadImage('assets/ghost_walk0001.png');
  ghost_2 = loadImage('assets/ghost_walk0002.png');
  ghost_3 = loadImage('assets/ghost_walk0003.png');
  ghost_4 = loadImage('assets/ghost_walk0004.png');
  haunted_house = loadImage('assets/haunted house.png');
  bkg_image = loadImage('assets/bkg.png');
  obstacle_image = loadImage('assets/ghost_standing0005.png');
}

function setup() {
  createCanvas(1100, 500);
  let border_width = width - 50;
  let border_height = height - 50;
  desired = new p5.Vector(border_width - border_width/8, border_height/2);
  makeObstacles(border_width, border_height);
  rocket = new Vehicle(obstacles.length, 0, random(border_height));
}

function draw() {
  background(bkg_image);
  let houseSize = 140;
  image(haunted_house, desired.x - houseSize/2, desired.y - houseSize/2, houseSize, houseSize);

  // Draw the obstacles
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].display(obstacle_image);
    if (obstacles[i].contains(rocket.position)) {
      hitObstacle = true;
    }
  }

  if (rocket.position.x > width || rocket.position.y > height || rocket.position.x < 0 || rocket.position.y < 0) {
    fill('white');
    textSize(15);
    textAlign(CENTER);
    text("ghostie is out of bounds (but she'll be back!)", width/2, 30);
  }

  rocket.steer(obstacles, desired);
  rocket.update(hitObstacle);
  hitObstacle = false;

  switch (frame) {
    case 0:
      displayImage = ghost_1;
      frame++;
      break;
    case 1:
      displayImage = ghost_2;
      frame++;
      break;
    case 2:
      displayImage = ghost_3;
      frame++;
      break;
    default:
      displayImage = ghost_4;
      frame = 0;
      break;
  }

  rocket.display(displayImage);
}
