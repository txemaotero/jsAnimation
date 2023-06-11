class Player {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    paused: boolean;
    windowID: number;
    current_frame: number;
    frames: number;
    frame_rate: number;
    draw: (frame: number, context: CanvasRenderingContext2D) => void;

    static readonly PX_TO_METERS: number = 50;

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
        context.clearRect(0, 0, canvas.width, canvas.height);
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

