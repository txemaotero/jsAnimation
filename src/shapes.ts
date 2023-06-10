class Rectangle {
    position: Vector;
    velocity: Vector;
    length: number;
    width: number;
    orientation: number;
    yawRate: number;

    constructor(position = new Vector(), velocity = new Vector(), length = 10, width = 10, orientation = 0, yawRate = 0) {
        this.position = position;
        this.velocity = velocity;
        this.length = length;
        this.width = width;
        this.orientation = orientation;
        this.yawRate = yawRate;
    }

    move(delta_t = 1) {
        this.position = this.position.add(this.velocity.prod(delta_t));
        this.orientation = this.orientation + this.yawRate * delta_t;
    }

    copy() {
        return new Rectangle(this.position.copy(), this.velocity.copy(), this.length,
            this.width, this.orientation)
    }
}
