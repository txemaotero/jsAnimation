// Get the canvas element
const canvas: HTMLCanvasElement = document.getElementById('myCanvas') as HTMLCanvasElement;
const context = canvas.getContext('2d')!;

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
    x: number;
    y: number;
    constructor(x = 0., y = 0.) {
        this.x = x;
        this.y = y;
    }

    add(other: Vector): Vector {
        return new Vector(this.x + other.x, this.y + other.y)
    }

    sub(other: Vector): Vector {
        return new Vector(this.x - other.x, this.y - other.y)
    }

    prod(scalar: number) : Vector {
        return new Vector(this.x * scalar, this.y * scalar)
    }

    copy() : Vector {
        return new Vector(this.x, this.y)
    }
}

class Rectangle {
    position: Vector;
    velocity: Vector;
    length: number;
    width: number;
    orientation: number;
    yawRate: number;

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
    let rectangles: Rectangle[] = [];
    let origin = new Rectangle(new Vector(20, 20), new Vector(2, 1), 20, 10, 45, 2)
    for (let i = 0; i < frames; ++i) {
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

const FRAMES: number = 10000;
const slider: HTMLInputElement = document.getElementById("slider") as HTMLInputElement;
slider.max = FRAMES.toString();

let rectangles = createRectangleSeries(FRAMES);
let current_frame = 0

function updateProgress() {
    let val = parseInt(slider.value);
    if (val < 0 || val >= FRAMES) {
        return;
    }
    current_frame = val;
    if (paused){
        start()
        stopAnim()
    }
}


function drawRectangle(rect: Rectangle) {
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
    drawRectangle(rectangles[(current_frame + FRAMES/2) % FRAMES]);
    current_frame += 1;
    slider.value = current_frame.toString();

    if (current_frame == FRAMES){
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
        stopAnim()
    }
}

function stopAnim() {
    cancelAnimationFrame(windowID);
    paused = true;
}

function start() {
    animate();
    paused = false;
}

// Start the animation loop
animate();
