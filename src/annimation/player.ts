class Player {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    paused: boolean;
    windowID: number;
    current_frame: number;
    frames: number;
    frame_rate: number;
    draw: (frame: number, context: CanvasRenderingContext2D) => void;
    onFrameChange: ((frame: number) => void) | null;
    last_frame_time: number;

    constructor(
        canvas: HTMLCanvasElement,
        frames: number,
        draw: (frame: number, context: CanvasRenderingContext2D) => void,
        frame_rate: number = 60,
        frame_change_callback: ((frame: number) => void) | null = null
    ) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d")!;
        this.paused = false;
        this.windowID = 0;
        this.current_frame = 0;
        this.frames = frames;
        this.frame_rate = frame_rate;
        this.draw = draw;
        this.onFrameChange = frame_change_callback;
        this.last_frame_time = 0;
    }

    animate() {
        if (this.paused) {
            return;
        }
        const timestamp = Date.now();
        if (timestamp - this.last_frame_time > 1000 / this.frame_rate) {
            this.clearCanvas();
            this.draw(this.current_frame, this.context);
            this.current_frame++;
            if (this.current_frame >= this.frames) {
                this.current_frame = 0;
            }
            if (this.onFrameChange != null) {
                this.onFrameChange(this.current_frame);
            }
            this.last_frame_time = timestamp;
        }
        this.windowID = requestAnimationFrame(this.animate.bind(this));
    }

    clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
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

    jumpTo(frame: number) {
        this.current_frame = frame;
        this.clearCanvas();
        this.draw(this.current_frame, this.context);
        if (this.onFrameChange != null) {
            this.onFrameChange(this.current_frame);
        }
    }

    oneBack() {
        this.jumpTo(this.current_frame - 1);
    }

    oneForward() {
        this.jumpTo(this.current_frame + 1);
    }

    refresh() {
        this.jumpTo(this.current_frame);
    }
}
