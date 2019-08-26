import { Parser } from "./parser";

export class Picker extends Parser {
    constructor(options) {
        super();
        this.text = options;
    }

    transformObject() {
        return {
            text: this.text
        }
    }

}