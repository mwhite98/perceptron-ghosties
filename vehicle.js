/*
    Base code from "The Nature of Code", Daniel Shiffman, http://natureofcode.com
*/

class Vehicle {
    constructor(n, x, y) {
        this.brain = new Perceptron(n, 0.001);
        this.acceleration = createVector(0, 0);
        this.velocity = createVector(0, -2);
        this.position = createVector(x, y);
        this.r = 6;
        this.maxspeed = 3;
        this.maxforce = 0.1;
    }

    // Method to update location
    update() {
        // Update velocity
        this.velocity.add(this.acceleration);
        // Limit speed
        this.velocity.limit(this.maxspeed);
        this.position.add(this.velocity);
        // Reset acceleration to 0 each cycle
        this.acceleration.mult(0);
    }

    applyForce(force) {
        this.acceleration.add(force);
    }
      
    repel(obstacle) {
        var direction = p5.Vector.sub(obstacle, this.position); // A vector pointing from the location to the target
        let distance = direction.mag();
        direction.setMag(this.maxspeed);
        let force = -150.0 / (distance * distance);
        direction.mult(force);
        return direction;
    }

    steer(obstacles, goal) {
        let forces = new Array(obstacles.length);
        let closestObstacle;
        let tempDifference;
        let difference = Infinity;

        // Determining repelling forces for all obstacles
        // Also determines current closest obstacle to the rocket
        for (let i = 0; i < forces.length; i++) {
            forces[i] = this.repel(obstacles[i]);
            tempDifference = p5.Vector.sub(obstacles[i], this.position);
            if (tempDifference.mag() < difference) {
                difference = tempDifference.mag();
                closestObstacle = obstacles[i];
            }
        }

        // Sets vector for moving towards the end goal
        let desired = p5.Vector.sub(goal, this.position);
        let d = desired.mag();
        if (d < 100) {
            var m = map(d, 0, 100, 0, this.maxspeed);
            desired.setMag(m);
        } else {
            desired.setMag(this.maxspeed);
        }

        let steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxforce);  // Limit to maximum steering force
        this.applyForce(steer);

        // All the steering forces are inputs
        var result = this.brain.feedforward(forces);
        this.applyForce(result);

        // If you're closer to an obstacle than the end goal, train perceptron!
        if (desired.mag() > difference) {
            let error = p5.Vector.sub(closestObstacle, this.position);
            error = 1 / (error.limit(this.maxforce));
            this.brain.train(forces, error);
        }
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
