class Simulator {
    rectangles: Rectangle[];
    current_frame: number;
    bounds: CoordinateSystem | null = null;

    constructor(rectangles: Rectangle[]) {
        this.rectangles = rectangles;
        this.current_frame = 0;
    }

    move(delta_t = 1) {
        this.current_frame += delta_t;
        for (let rect of this.rectangles) {
            this.move_rectangle(rect, delta_t);
        }
    }

    private move_rectangle(rect: Rectangle, delta_t: number) {
        if (this.bounds != null) {
            const xlims = this.bounds.getXLimits();
            const ylims = this.bounds.getYLimits();
            let sign = 1;
            if (delta_t < 0) {
                delta_t = -delta_t;
                sign = -1;
            }
            for (let i = 0; i < delta_t; i++) {
                rect.move(sign);
                const placeX = xlims.place(rect.position.x);
                if (placeX != Placement.Between) {
                    rect.velocity.x *= -1;
                }
                const placeY = ylims.place(rect.position.y);
                if (placeY != Placement.Between) {
                    rect.velocity.y *= -1;
                }
                if (placeX != Placement.Between || placeY != Placement.Between) {
                    rect.move(sign);
                }
            }
        } else {
            rect.move(delta_t);
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

