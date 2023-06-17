class CoordinateSystem {
    center: Vector;
    canvas: HTMLCanvasElement;

    px_to_meters: number = 50;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.center = new Vector(canvas.width / 2, canvas.height / 2);
    }

    // Convert from meters to pixels, if the point is outside the canvas return null
    get(position: Vector): Vector {
        return position
            .prod(this.px_to_meters)
            .add(this.center);
    }

    toCoordinates(pixels: Vector): Vector {
        return pixels
            .sub(this.center)
            .prod(1 / this.px_to_meters);
    }

    convert(coordinate: number): number {
        return coordinate * this.px_to_meters;
    }

    convertX(coordinate: number): number {
        return this.convert(coordinate) + this.center.x;
    }

    convertY(coordinate: number): number {
        return this.convert(coordinate) + this.center.y;
    }

    getOrigin(): Vector {
        return this.get(new Vector(0, 0));
    }

    getXLimits(): Limits {
        return new Limits(
            -this.center.x / this.px_to_meters,
            (this.canvas.width - this.center.x) / this.px_to_meters
        );
    }

    getYLimits(): Limits {
        return new Limits(
            -this.center.y / this.px_to_meters,
            (this.canvas.height - this.center.y) / this.px_to_meters
        );
    }

    isInCanvas(position: Vector): boolean {
        const pixels = this.get(position);

        return (
            pixels.x < 0 &&
            pixels.x > this.canvas.width &&
            pixels.y < 0 &&
            pixels.y > this.canvas.height
        )
    }
}
