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
for (let i = 0; i < 10; i++) {
    rectangles.push(Rectangle.random(canvas.width, canvas.height));
}
const simulator = new Simulator(canvas, rectangles);
const drawer = new Drawer(canvas, context, simulator);
const player = new Player(canvas, FRAMES, drawer.draw.bind(drawer));

player.start();
