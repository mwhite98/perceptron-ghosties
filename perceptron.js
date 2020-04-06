// Daniel Shiffman
// The Nature of Code
// http://natureofcode.com

// Perceptron is created with n weights and learning constant
class Perceptron {
    constructor(n, c) {
      // Array of weights for inputs
      this.weights = new Array(n);
      // Start with random weights
      for (let i = 0; i < this.weights.length; i++) {
        this.weights[i] = random(0, 1);
      }
      this.c = c; // learning rate/constant
    }
  
    // Function to train the Perceptron
    // Weights are adjusted based on "desired" answer
    train(forces, error) {
      // Adjust weights based on weightChange * forces
      for (let i = 0; i < this.weights.length; i++) {
        this.weights[i] += this.c * error.x * forces[i].x;
        this.weights[i] += this.c * error.y * forces[i].y;
      }
    }
  
    // Guess -1 or 1 based on input values
    feedforward(forces) {
      // Sum all values
      let sum = new p5.Vector();
      for (let i = 0; i < this.weights.length; i++) {
        forces[i].mult(this.weights[i]);
        sum.add(forces[i]);
      }
      // Result is sign of the sum, -1 or 1
      return sum;
    }
  
    activate(sum) {
      if (sum > 0) return 1;
      else return -1;
    }
  
    // Return weights
    getWeights() {
      return this.weights;
    }
}
