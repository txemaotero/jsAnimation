class CoordinateSystem {
    center: Vector;
    canvas: HTMLCanvasElement;

    static readonly PX_TO_METERS: number = 50;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.center = new Vector(canvas.width / 2, canvas.height / 2);
    }

    // Convert from meters to pixels, if the point is outside the canvas return null
    get(position: Vector): Vector | null {
        const pixels = position
            .prod(CoordinateSystem.PX_TO_METERS)
            .add(this.center);
        if (
            pixels.x < 0 ||
            pixels.x > this.canvas.width ||
            pixels.y < 0 ||
            pixels.y > this.canvas.height
        ) {
            return null;
        }
        return pixels;
    }

    convert(coordinate: number) : number {
        return coordinate * CoordinateSystem.PX_TO_METERS;
    }

    convertX(coordinate: number) : number {
        return this.convert(coordinate) + this.center.x;
    }

    convertY(coordinate: number) : number {
        return this.convert(coordinate) + this.center.y;
    }

    getOrigin(): Vector {
        return this.get(new Vector(0, 0))!;
    }

    getXLimits(): Limits {
        return new Limits(
            -this.center.x / CoordinateSystem.PX_TO_METERS,
            (this.canvas.width - this.center.x) / CoordinateSystem.PX_TO_METERS
        );
    }

    getYLimits(): Limits {
        return new Limits(
            -this.center.y / CoordinateSystem.PX_TO_METERS,
            (this.canvas.height - this.center.y) / CoordinateSystem.PX_TO_METERS
        );
    }

    isInCanvas(position: Vector): boolean {
        return this.get(position) != null;
    }


}
