/*
    Base code from "The Nature of Code", Daniel Shiffman, http://natureofcode.com
    Code based on text "Artificial Intelligence", George Luger
*/

// A class for an obstacle, just a simple rectangle that is drawn
// and can check if a Rocket touches it

class Obstacle {
    constructor(x, y, w, h) {
      this.position = createVector(x, y);
      this.w = w;
      this.h = h;
    }
  
    display(img) {
      stroke(0);
      fill(175);
      strokeWeight(2);
      rectMode(CORNER);
      rect(this.position.x, this.position.y, this.w, this.h);
    }

    display(img) {
      let imageSize = 50;
      image(img, this.position.x - imageSize/2 + 20, this.position.y - imageSize/2 + 20, imageSize - 30, imageSize);
  }
  
    contains(spot) {
      if (spot.x > this.position.x && spot.x < this.position.x + this.w && spot.y > this.position.y && spot.y < this.position.y + this.h) {
        return true;
      } else {
        return false;
      }
    }  
}
