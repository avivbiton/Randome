import { UPDATE_SNAPSHOT_HISTORY } from "../Reducers/snapshotReducer";
import toastr from "toastr";
import { toastrDefault } from "../../config";
import { SchemaSnapshot } from "../../SchemaBuilder/schemaSnapshot";
import { ContentGenerator } from "randomcontentgenerator";

export const updateSnapshotHistory = (schema, parse = true) => {
    const snapshot = new SchemaSnapshot();
    try {
        const parsedSchema = parse ? JSON.parse(schema) : schema;
        snapshot.set(parsedSchema);
        if (new ContentGenerator(parsedSchema).isValid() !== true) {
            toastr.error("You have an error in your JSON schema. Try not to mess around the Raw JSON option unless you know what you are doing.", "Invalid JSON schema", toastrDefault);
            return { type: "ERROR_DISPLAY" };
        }

    } catch (error) {
        toastr.error("There's something wrong in your JSON object.", "Failed to parse JSON", toastrDefault);
        return { type: "ERROR_DISPLAY" };
    }
    return { type: UPDATE_SNAPSHOT_HISTORY, payload: snapshot };
}