enum Placement {
    Below,
    Between,
    Above
}

class Limits {
    min: number;
    max: number;

    constructor(min: number = Number.MAX_VALUE, max: number = Number.MIN_VALUE) {
        this.min = min;
        this.max = max;
    }

    update(value: number) {
        this.min = Math.min(this.min, value);
        this.max = Math.max(this.max, value);
    }

    contains(value: number) {
        return value >= this.min && value <= this.max;
    }

    place(value: number) : Placement {
        if (value < this.min) {
            return Placement.Below;
        } else if (value > this.max) {
            return Placement.Above;
        } else {
            return Placement.Between;
        }
    }

    window() {
        return this.max - this.min;
    }

    mean() {
        return (this.min + this.max) / 2;
    }

}
