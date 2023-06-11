class Rectangle {
    position: Vector;
    velocity: Vector;
    length: number;
    width: number;
    orientation: number;
    yawRate: number;
    color: string;

    constructor(
        position = new Vector(),
        velocity = new Vector(),
        length = 10,
        width = 10,
        orientation = 0,
        yawRate = 0,
        color = null
    ) {
        this.position = position;
        this.velocity = velocity;
        this.length = length;
        this.width = width;
        this.orientation = orientation;
        this.yawRate = yawRate;
        if (color == null) {
            this.color =
                "rgba(" +
                Math.floor(Math.random() * 255) +
                "," +
                Math.floor(Math.random() * 255) +
                "," +
                Math.floor(Math.random() * 255) +
                "," +
                (Math.random() * 0.5 + 0.5) +
                ")";
        } else {
            this.color = color;
        }
    }

    move(delta_t = 1) {
        this.position = this.position.add(this.velocity.prod(delta_t));
        this.orientation = this.orientation + this.yawRate * delta_t;
    }

    copy() {
        return new Rectangle(
            this.position.copy(),
            this.velocity.copy(),
            this.length,
            this.width,
            this.orientation
        );
    }

    static random(x_limits: Limits, y_limits: Limits) {
        return new Rectangle(
            new Vector(
                Math.random() * x_limits.window() + x_limits.min,
                Math.random() * y_limits.window() + y_limits.min
            ),
            new Vector(
                Math.random() * x_limits.window() * 0.05,
                Math.random() * y_limits.window() * 0.05
            ),
            Math.random() * x_limits.window() * 0.1,
            Math.random() * y_limits.window() * 0.1,
            Math.random() * 2 * Math.PI,
            (Math.random() * 2 * Math.PI) / 30
        );
    }
}
