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
      this.imageSize = 50;
      this.renderedPosition = createVector(x - this.imageSize/2 + 20, y - this.imageSize/2 + 20);
    }
  
    display(img) {
      stroke(0);
      fill(175);
      strokeWeight(2);
      rectMode(CORNER);
      rect(this.position.x, this.position.y, this.w, this.h);
    }

    display(img, rms) {
      image(img, this.position.x - this.imageSize/2 + 20, this.position.y - this.imageSize/2 + 20, rms * this.imageSize - 30, rms * this.imageSize);
  }
  
    contains(spot) {
      if (spot.x > this.position.x && spot.x < this.position.x + this.w && spot.y > this.position.y && spot.y < this.position.y + this.h) {
        return true;
      } else {
        return false;
      }
    }  
}
