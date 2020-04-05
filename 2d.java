let training = new Array(2000);
// A Perceptron object
        let ptron;
// Input mic
        let mic;
// We will train the perceptron with one "Point" object at a time
        let count = 0;
        let maxforce;
        let maxspeed;

// Coordinate space
        let xmin = -1;
        let ymin = -1;
        let xmax = 1;
        let ymax = 1;

// The function to describe a line
        function f(x) {
        let y = 0.3 * x + 0.4;
        return y;
        }
// ----------------------------------------------------------------------
//   <script language="javascript" type = "text/javascript" src="vehicle.js"></script>      add into reference after <head>


        let vehicles = [];


        function setup() {
        let cnv = createCanvas(600, 600);
        cnv.mousePressed(userStartAudio);
        textAlign(CENTER);
        mic = new p5.AudioIn();
        mic.start();
        background(51);

        ptron = new Perceptron(3, 1000); // Learning Constant is low just b/c it's fun to watch, this is not necessarily optimal

        // Create a random set of training points and calculate the "known" answer
        for (let i = 0; i < training.length; i++) {
        let x = random(xmin, xmax);
        let y = random(ymin, ymax);
        let answer = 1;
        if (y < f(x)) answer = -1;
        training[i] = {
        input: [x, y, 1],
        output: answer
        };
        }

        for (let i = 0; i < points.length; i++) {
        let pt = points[i];
        let vehicle = new Vehicle(pt.x,pt.y);
        vehicles.push(vehicle);
        }

        } //setup end


        function Vehicle(x,y) {
        this.loc = creatVector(x,y);
        this.targ = creatVector(x,y);
        this.r = 8;

        this.vel = creatVector();
        this.acc = creatVector();
        this.maxforce = 4;
        this.maxspeed = 0.1;

        }

        Vehicle.prototype.update = function() {
        this.pos.add(this.vel);
        this.pos.add(this.acc);
        this.acc.mult(0);
        }

// Vehicle.prototype.show = function(){
//   stroke(255);
//   strokeWeight(8);
//   point(this.pos.x,this.pos.y);
// }

        Vehicle.prototpye.seek = function(target){
        let desired = p5.Vector.sub(target,this.loc);
        // desired.mult(maxspeed);
        desired.setMag(maxspeed);
        let steer = p5.Vector.sub(desired,this.vel);
        steer.limit(maxforce);
        return steer;
        }

        Vehicle.prototpye.arrive = function(target){
        let desired = p5.Vector.sub(target,this.loc);
        // desired.mult(maxspeed);
        let d = desired.mag();
        let speed = this.maxspeed;
        if (d < 100){
        speed = map(d, 0, 100, 0, this.maxspeed);
        }
        desired.setMag(speed);
        let steer = p5.sub.Vector(desired,this.vel);
        steer.limit(maxforce);
        return steer;
        }

        Vehicle.prototpye.applyForce = function(f){
        this.acc.add(f);
        }
        Vehicle.prototpye.steel = function(targets){
        let forces = targets.size;
        for (int i = 0; i < forces.length; i++) {
        forces[i] = seek(targets.get(i));
        }
        let result = ptron.feedforward(forces);
        applyForce(result);

        let desired = creatVector(width/2,height/2);
        let error = p5.sub.Vector(desired, this.loc);
        ptron.train(forces,error);
        }


        function draw() {
        background(255);
        text("tap to start", width / 2, 20);
        volume = mic.getLevel();
        orbitControl();

        for (let i = 0; i < vehicles.length; i++) {
        let v = vehicles[i];
        v.update();
        // v.show();
        }
        ptron.train(training[count].input, training[count].output);
        count = (count + 1) % training.length;

        // Draw all the points based on what the Perceptron would "guess"
        // Does not use the "known" correct answer
        for (let i = 0; i < count; i++) {
        stroke(255);
        strokeWeight(1);
        fill('red');
        let guess = ptron.feedforward(training[i].input);
        if (guess > 0) noFill();

        let x = map(training[i].input[0], xmin, xmax, 0, width);
        let y = map(training[i].input[1], ymin, ymax, height, 0);

        ellipse(x, y, volume * 40, volume * 40);
        }
        }