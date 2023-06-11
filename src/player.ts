class Player {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    paused: boolean;
    windowID: number;
    current_frame: number;
    frames: number;
    frame_rate: number;
    draw: (frame: number, context: CanvasRenderingContext2D) => void;

    constructor(
        canvas: HTMLCanvasElement,
        frames: number,
        draw: (frame: number, context: CanvasRenderingContext2D) => void,
        frame_rate: number = 60
    ) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d")!;
        this.paused = false;
        this.windowID = 0;
        this.current_frame = 0;
        this.frames = frames;
        this.frame_rate = frame_rate;
        this.draw = draw;
    }

    animate() {
        if (this.paused) {
            return;
        }
        this.draw(this.current_frame, this.context);
        this.current_frame++;
        if (this.current_frame >= this.frames) {
            this.current_frame = 0;
        }
        this.windowID = window.setTimeout(
            this.animate.bind(this),
            1000 / this.frame_rate
        );
    }

    start() {
        this.current_frame = 0;
        this.resume();
    }

    stop() {
        this.current_frame = 0;
        this.pause();
    }

    pause() {
        this.paused = true;
        window.cancelAnimationFrame(this.windowID);
    }

    resume() {
        this.paused = false;
        this.animate();
    }

    pauseResume() {
        if (this.paused) {
            this.resume();
        } else {
            this.pause();
        }
    }
}

class Simulator {
    canvas: HTMLCanvasElement;
    rectangles: Rectangle[];
    current_frame: number;

    constructor(canvas: HTMLCanvasElement, rectangles: Rectangle[]) {
        this.canvas = canvas;
        this.rectangles = rectangles;
        this.current_frame = 0;
    }

    move(delta_t = 1) {
        this.current_frame += delta_t;
        for (let rect of this.rectangles) {
            rect.move(delta_t);
            if (rect.position.x < 1 || rect.position.x > this.canvas.width) {
                rect.velocity.x *= -1;
                rect.position.x = Math.max(
                    1,
                    Math.min(this.canvas.width, rect.position.x)
                );
            }
            if (rect.position.y < 1 || rect.position.y > this.canvas.height) {
                rect.velocity.y *= -1;
                rect.position.y = Math.max(
                    1,
                    Math.min(this.canvas.height, rect.position.y)
                );
            }
        }
    }

    move_to(frame: number) {
        if (frame < 0 || frame == this.current_frame) {
            return;
        }
        this.move(frame - this.current_frame);
        this.current_frame = frame;
    }
}

class Drawer {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    simulator: Simulator;

    constructor(
        canvas: HTMLCanvasElement,
        context: CanvasRenderingContext2D,
        simulator: Simulator
    ) {
        this.canvas = canvas;
        this.context = context;
        this.simulator = simulator;
    }

    draw(frame: number) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        this.simulator.move_to(frame);
        for (let rect of this.simulator.rectangles) {
            this.drawRectangle(rect);
        }
    }

    drawRectangle(rect: Rectangle) {
        this.context.save();

        // Translate to the center of the rectangle
        this.context.translate(rect.position.x, rect.position.y);

        // Rotate the canvas around the center point
        this.context.rotate(rect.orientation);

        this.context.fillStyle = rect.color;
        // Draw the rectangle
        this.context.fillRect(
            -rect.length / 2,
            -rect.width / 2,
            rect.length,
            rect.width
        );

        this.context.restore();
    }
}
