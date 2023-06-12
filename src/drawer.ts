class Drawer {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    coordinate_system: CoordinateSystem;
    simulator: Simulator;

    constructor(
        canvas: HTMLCanvasElement,
        context: CanvasRenderingContext2D,
        simulator: Simulator
    ) {
        this.canvas = canvas;
        this.coordinate_system = new CoordinateSystem(canvas);
        this.context = context;
        this.simulator = simulator;
        this.simulator.bounds = this.coordinate_system;
    }

    drawAxis() {
        this.context.beginPath();
        const origin = this.coordinate_system.getOrigin();
        this.context.lineWidth = 1;
        this.context.strokeStyle = "rgba(0,0,0,1)";
        this.context.moveTo(0, origin.y);
        this.context.lineTo(this.canvas.width, origin.y);
        this.context.moveTo(origin.x, 0);
        this.context.lineTo(origin.x, this.canvas.height);
        this.context.stroke();
    }

    drawGrid() {
        // draw grid with 1 meter spacing and thinner lines
        this.context.beginPath();
        this.markSpuareGrid(1, 0.1);
        this.context.stroke();

        this.context.beginPath();
        this.markSpuareGrid(5, 0.3);
        this.context.stroke();
        // draw x and y axis on top
        this.drawAxis();
    }

    private markSpuareGrid(x_spacing: number, linealpha: number) {
        this.context.strokeStyle = "rgba(0,0,0," + linealpha.toString() + ")";
        this.context.lineWidth = 1;
        const x_limits = this.coordinate_system.getXLimits();
        const y_limits = this.coordinate_system.getYLimits();
        let pos = 0;
        while (x_limits.contains(pos)) {
            pos -= x_spacing;
            const pos_px = this.coordinate_system.convertX(pos);
            this.context.moveTo(pos_px, 0);
            this.context.lineTo(pos_px, this.canvas.height);
        }
        pos = 0;
        while (x_limits.contains(pos)) {
            pos += x_spacing;
            const pos_px = this.coordinate_system.convertX(pos);
            this.context.moveTo(pos_px, 0);
            this.context.lineTo(pos_px, this.canvas.height);
        }
        pos = 0;
        while (y_limits.contains(pos)) {
            pos -= x_spacing;
            const pos_px = this.coordinate_system.convertY(pos);
            this.context.moveTo(0, pos_px);
            this.context.lineTo(this.canvas.width, pos_px);
        }
        pos = 0;
        while (y_limits.contains(pos)) {
            pos += x_spacing;
            const pos_px = this.coordinate_system.convertY(pos);
            this.context.moveTo(0, pos_px);
            this.context.lineTo(this.canvas.width, pos_px);
        }
    }

    draw(frame: number) {
        this.simulator.move_to(frame);
        this.drawGrid();

        this.context.beginPath();
        for (let rect of this.simulator.rectangles) {
            this.drawRectangle(rect);
        }
        this.context.stroke();
    }

    drawRectangle(rect: Rectangle) {
        // Translate to the center of the rectangle
        const pos_px = this.coordinate_system.get(rect.position);
        if (pos_px == null) {
            return;
        }

        this.context.save();

        this.context.translate(pos_px.x, pos_px.y);

        // Rotate the canvas around the center point
        this.context.rotate(rect.orientation);

        this.context.fillStyle = rect.color;
        // Draw the rectangle
        const length_px = this.coordinate_system.convert(rect.length);
        const width_px = this.coordinate_system.convert(rect.width);
        this.context.fillRect(
            -length_px / 2,
            -width_px / 2,
            length_px,
            width_px
        );

        this.context.restore();
    }
}
