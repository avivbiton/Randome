import { Parser } from "./parser";

export class MinMaxPicker extends Parser {
    constructor(min, max) {
        super();
        this.range = {
            min: min,
            max: max
        };
    }

    transformObject() {
        return this.range;
    }
}