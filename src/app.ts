// Get the canvas element
const canvas: HTMLCanvasElement = document.getElementById('myCanvas') as HTMLCanvasElement;
const context = canvas.getContext('2d')!;

function resizeCanvas() {
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);


const FRAMES: number = 10000;

const slider: HTMLInputElement = document.getElementById("slider") as HTMLInputElement;
slider.max = FRAMES.toString();

const rectangles: Rectangle[] = [];
const simulator = new Simulator(rectangles);
const drawer = new Drawer(canvas, context, simulator);

const x_limits = drawer.coordinate_system.getXLimits();
const y_limits = drawer.coordinate_system.getYLimits();

for (let i = 0; i < 10; i++) {
    simulator.rectangles.push(Rectangle.random(x_limits, y_limits));
}

const player = new Player(canvas, FRAMES, drawer.draw.bind(drawer));

player.start();
