class Vehicle {

    Perceptron brain;
    //variables for physics
    PVector location;
    PVector velocity;
    PVector acceleration;
    float maxforce;
    float maxspeed;

    // The Vehicle creates a perceptron with n inputs and a learning constant.
    Vehicle(int n, float x, float y) {
        brain = new Perceptron(n,0.001);
        acceleration = new PVector(0,0);
        velocity = new PVector(0,0);
        location = new PVector(x,y);
        maxspeed = 4;
        maxforce = 0.1;
    }

    //Same old update() function
    void update() {
        velocity.add(acceleration);
        velocity.limit(maxspeed);
        location.add(velocity);
        acceleration.mult(0);
    }

    //Same old applyForce() function
    void applyForce(PVector force) {
        acceleration.add(force);
    }

    void steer(ArrayList<PVector> targets) {
        PVector[] forces = new PVector[targets.size()];

        for (int i = 0; i < forces.length; i++) {
            forces[i] = seek(targets.get(i));
        }
        // All the steering forces are inputs.
        PVector result = brain.feedforward(forces); //

        // The result is applied.
        applyForce(result);

        // The brain is trained according to
        // the distance to the center.
        PVector desired = new PVector(width/2,height/2); //
        PVector error = PVector.sub(desired, location); //
        brain.train(forces,error); //
    }

    PVector seek(PVector target) {
        PVector desired = PVector.sub(target,location);
        desired.normalize();
        desired.mult(maxspeed);
        PVector steer = PVector.sub(desired,velocity);
        steer.limit(maxforce);
        return steer;
    }
}