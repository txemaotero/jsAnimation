class ZoomHandler {
    scale: number;
    original_scale: number;
    canvas: HTMLCanvasElement;
    coordinate_system: CoordinateSystem;
    player: Player;

    constructor(
        canvas: HTMLCanvasElement,
        coordinate_system: CoordinateSystem,
        player: Player
    ) {

        this.scale = 1;
        this.canvas = canvas;
        this.coordinate_system = coordinate_system;
        this.original_scale = this.coordinate_system.px_to_meters;
        this.player = player;
        this.canvas.addEventListener("wheel", this.handleZoom.bind(this));
    }

    handleZoom(event: WheelEvent) {
        event.preventDefault();
        this.scale += event.deltaY * -0.002;
        this.scale = Math.min(Math.max(0.125, this.scale), 4);
        this.coordinate_system.px_to_meters = this.scale * this.original_scale;
        this.player.refresh();
    }

}
