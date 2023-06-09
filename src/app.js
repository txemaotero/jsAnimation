// Get the canvas element
const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');

// Define the initial position and dimensions of the rectangle
let x = Math.random() * 400;
let y = Math.random() * 400;
let width = 100;
const height = 50;
let paused = false;

let xsign = 1;
let ysign = 1;
let windowID = 0;


class Vector {
    constructor(x = 0., y = 0.) {
        this.x = x;
        this.y = y;
    }

    add(other) {
        return new Vector(this.x + other.x, this.y + other.y)
    }

    sub(other) {
        return new Vector(this.x - other.x, this.y - other.y)
    }

    prod(scalar) {
        return new Vector(this.x * scalar, this.y * scalar)
    }

    copy() {
        return new Vector(this.x, this.y)
    }
}

class Rectangle {
    constructor(position = new Vector(), velocity = new Vector(), length = 10, width = 10, orientation = 0, yawRate = 0) {
        this.position = position;
        this.velocity = velocity;
        this.length = length;
        this.width = width;
        this.orientation = orientation;
        this.yawRate = yawRate;
    }

    move(delta_t = 1) {
        this.position = this.position.add(this.velocity.prod(delta_t));
        this.orientation = this.orientation + this.yawRate * delta_t;
    }

    copy() {
        return new Rectangle(this.position.copy(), this.velocity.copy(), this.length,
            this.width, this.orientation)
    }
}

function createRectangleSeries(frames = 1000) {
    let rectangles = new Array(frames).fill(0);
    let origin = new Rectangle(new Vector(20, 20), new Vector(2, 1), 20, 10, 45, 2)
    for (i = 0; i < frames; ++i) {
        rectangles[i] = origin.copy();
        origin.move();
        if (origin.position.x < 1 || origin.position.x > canvas.width) {
            origin.velocity.x *= -1
        }
        if (origin.position.y < 1 || origin.position.y > canvas.height) {
            origin.velocity.y *= -1
        }
    }
    return rectangles
}

const frames = 10000;
document.getElementById("slider").max = frames;
let rectangles = createRectangleSeries(frames);
let current_frame = 0

function updateProgress() {
    let val = parseInt(document.getElementById("slider").value);
    if (val < 0 || val >= frames) {
        return;
    }
    current_frame = val;
    if (paused){
        start()
        stop()
    }
}


function drawRectangle(rect) {
    context.save();

    // Translate to the center of the rectangle
    context.translate(rect.position.x, rect.position.y);

    // Rotate the canvas around the center point
    context.rotate(rect.orientation * Math.PI/180);

    context.fillStyle = "blue"
    // Draw the rectangle
    context.fillRect(-rect.length / 2, -rect.width / 2, rect.length, rect.width);

    context.restore();
}


// Define the animation loop
function animate() {
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawRectangle(rectangles[current_frame]);
    drawRectangle(rectangles[(current_frame + frames/2) % frames]);
    current_frame += 1;
    document.getElementById("slider").value = current_frame;

    if (current_frame == frames){
        paused = true;
        return
    }

    // Request the next animation frame
    windowID = requestAnimationFrame(animate);
}

function startStop() {
    if (paused) {
        start()
    } else {
        stop()
    }
}

function stop() {
    cancelAnimationFrame(windowID);
    paused = true;
}

function start() {
    animate();
    paused = false;
}

// Start the animation loop
animate();
