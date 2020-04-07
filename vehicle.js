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
    update(didHit) {
        if (didHit) {
            this.velocity = createVector(0, -2);
            this.position = createVector(0, random(700));
        } else {
            // Update velocity
            this.velocity.add(this.acceleration);
            // Limit speed
            this.velocity.limit(this.maxspeed);
            this.position.add(this.velocity);
        }
        // Reset acceleration to 0 each cycle
        this.acceleration.mult(0);
    }

    applyForce(force) {
        this.acceleration.add(force);
    }
      
    repel(obstacle) {
        var direction = p5.Vector.sub(obstacle.position, this.position); // A vector pointing from the location to the target
        let distance = direction.mag();
        direction.setMag(this.maxspeed);
        let force = -200.0 / (distance * distance);
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
            tempDifference = p5.Vector.sub(obstacles[i].position, this.position);
            if (tempDifference.mag() < difference) {
                difference = tempDifference.mag();
                closestObstacle = obstacles[i].position;
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

    display(img) {
        // var theta = this.velocity.heading() + PI / 2;
        let imageSize = 50;
        push();
        // rotate(theta);
        image(img, this.position.x - imageSize/2, this.position.y - imageSize/2, imageSize, imageSize);
        pop();
    }
}
