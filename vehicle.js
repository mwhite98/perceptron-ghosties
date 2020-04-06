// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// The "Vehicle" class

class Vehicle {
    constructor(n, x, y) {
        this.brain = new Perceptron(n, 0.001);
        this.acceleration = createVector(0, 0);
        this.velocity = createVector(0, -2);
        this.position = createVector(x, y);
        this.r = 6;
        this.maxspeed = 5;
        this.maxforce = 0.1;
    }

    // Method to update location
    update() {
        // Update velocity
        this.velocity.add(this.acceleration);
        // Limit speed
        this.velocity.limit(this.maxspeed);
        this.position.add(this.velocity);
        // Reset accelerationelertion to 0 each cycle
        this.acceleration.mult(0);
    }

    applyForce(force) {
        // We could add mass here if we want A = F / M
        this.acceleration.add(force);
    }

    // A method that calculates a steering force towards a target
    // STEER = DESIRED MINUS VELOCITY
    seek(target) {

        var desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target

        // Scale to maximum speed
        desired.setMag(this.maxspeed);

        // Steering = Desired minus velocity
        var steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxforce); // Limit to maximum steering force

        this.applyForce(steer);
        // TODO might have to just use applyForce
        return steer;
    }

    steer(targets, goal) {
        let forces = new Array(targets.length);

        for (let i=0; i < forces.length; i++) {
            forces[i] = this.seek(targets[i]);
        }
        // All the steering forces are inputs
        var result = this.brain.feedforward(forces);
        this.applyForce(result);

        // The brain is trained according to the distance to the centre
        var desired = createVector(goal.x, goal.y);
        var error = p5.Vector.sub(desired, this.position);
        this.brain.train(forces, error);
    }

    display() {
        // Draw a triangle rotated in the direction of velocity
        var theta = this.velocity.heading() + PI / 2;
        fill(127);
        stroke(200);
        strokeWeight(1);
        push();
        translate(this.position.x, this.position.y);
        rotate(theta);
        beginShape();
        vertex(0, -this.r * 2);
        vertex(-this.r, this.r * 2);
        vertex(this.r, this.r * 2);
        endShape(CLOSE);
        pop();
    }
}
