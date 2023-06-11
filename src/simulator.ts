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
            for (let i = 0; i < delta_t; i++) {
                rect.move();
                let place = xlims.place(rect.position.x);
                if (place != Placement.Between) {
                    rect.velocity.x *= -1;
                }
                place = ylims.place(rect.position.y);
                if (place != Placement.Between) {
                    rect.velocity.y *= -1;
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

