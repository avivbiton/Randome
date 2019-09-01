import { ContentGenerator } from "randomcontentgenerator";

export function convertTypeToName(field) {
    
    const name = ContentGenerator.findParser(field).constructor.name;
    switch (name) {
        case "BasicParser":
            return "Basic Picker";
        case "MinMaxParser":
            return "Min-Max Picker";
        case "MultiPickerParser":
            return "Multi Picker";
        default: throw new Error("Invalid parser");
    }
}