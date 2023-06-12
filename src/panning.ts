class PanHandler {
    isPanning: boolean;
    startX: number;
    startY: number;
    canvas: HTMLCanvasElement;
    coordinate_system: CoordinateSystem;
    player: Player;

    constructor(
        canvas: HTMLCanvasElement,
        coordinate_system: CoordinateSystem,
        player: Player
    ) {
        this.isPanning = false;
        this.startX = 0;
        this.startY = 0;
        this.canvas = canvas;
        this.coordinate_system = coordinate_system;
        this.player = player;
        this._bindEvents();
    }

    private _bindEvents() {
        this.canvas.addEventListener("mousedown", this.startPan);
        this.canvas.addEventListener("mousemove", this.pan);
        this.canvas.addEventListener("mouseup", this.endPan);
        this.canvas.addEventListener("mouseleave", this.endPan);
    }

    startPan = (event: MouseEvent) => {
        console.log("start pan");
        this.isPanning = true;
        this.startX = event.clientX;
        this.startY = event.clientY;
    }

    pan = (event: MouseEvent) => {
        if (!this.isPanning) {
            return;
        }
        const dx = event.clientX - this.startX;
        const dy = event.clientY - this.startY;
        this.coordinate_system.center.x += dx;
        this.coordinate_system.center.y += dy;
        this.startX = event.clientX;
        this.startY = event.clientY;
        this.player.refresh();
    }

    endPan = () => {
        this.isPanning = false;
    }
}
