import { ContentGenerator } from "randomcontentgenerator";
export function convertTypeToName(field) {

    return ContentGenerator.findParser(field).getName();
}