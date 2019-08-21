import { fromJS } from "immutable";

export class SchemaSnapshot {
    constructor(schema = fromJS({
        fields: {},
        globalProperties: []
    })) {
        this.schema = schema;
    }

    getSchema() {
        return this.schema.toJS();
    }

    addField(fieldName, parserObject, properties = []) {
        parserObject["properties"] = properties;
        const newObject = this.schema.setIn(["fields", fieldName], parserObject.transformObject());
        return new SchemaSnapshot(newObject);
    }

    removeField(fieldName) {
        const newSnapshot = this.schema.removeIn(["fields", fieldName]);
        console.log(newSnapshot);
        return new SchemaSnapshot(newSnapshot);
    }

    addGlobal(parserObject, properties = []) {
        parserObject["properties"] = properties;
        const newSnapshot = this.schema.updateIn(["globalProperties"], list => list.push(parserObject.transformObject()));
        return new SchemaSnapshot(newSnapshot);
    }

    removeGlobal(index) {
        const newSnapshot = this.schema.updateIn(["globalProperties"], list => list.remove(index));
        return new SchemaSnapshot(newSnapshot);
    }

    extractString() {
        return JSON.stringify(this.getSchema());
    }

    iterateFields() {
        const schema = this.getSchema();
        return Object.keys(schema.fields).map(name => ({ name, field: schema.fields[name] }));
    }
}