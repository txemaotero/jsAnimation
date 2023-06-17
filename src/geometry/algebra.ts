class Vector {
    x: number;
    y: number;
    constructor(x = 0., y = 0.) {
        this.x = x;
        this.y = y;
    }

    add(other: Vector): Vector {
        return new Vector(this.x + other.x, this.y + other.y);
    }

    sub(other: Vector): Vector {
        return new Vector(this.x - other.x, this.y - other.y);
    }

    prod(scalar: number): Vector {
        return new Vector(this.x * scalar, this.y * scalar);
    }

    copy(): Vector {
        return new Vector(this.x, this.y);
    }
}

