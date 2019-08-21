import { Parser } from "./parser";

export class MultiPicker extends Parser {
    constructor(options) {
        super();
        this.options = options;
    }

    transformObject() {
        return {
            options: this.options
        }
    }

}