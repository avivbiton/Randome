import { Parser } from "./parser";

export class Picker extends Parser {
    constructor(options) {
        super();
        this.options = options;
    }

    transformObject() {
        return this.options;
    }

}