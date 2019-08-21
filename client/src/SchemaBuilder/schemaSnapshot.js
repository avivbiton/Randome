import { fromJS } from "immutable";

export class SchemaSnapshot {
    constructor(schema = fromJS({
        fields: {},
        globalProperties: []
    })) {
        this.schema = schema;
    }

    getSchema() {
        console.log(this.schema);
        return this.schema.toJS();
    }

    addField(fieldName, parserObject, properties = []) {
        parserObject["properties"] = properties;
        const newObject = this.schema.setIn(["fields", fieldName], parserObject.transformObject());
        return new SchemaSnapshot(newObject);
    }

    removeField(fieldName) {
        const newSnapshot = this.schema.removeIn(["fields", fieldName]);
        return new SchemaSnapshot(newSnapshot);
    }

    editField(oldName, newName, parserObject) {
        const newSnapshot = this
            .removeField(oldName)
            .addField(newName, parserObject);
        return newSnapshot;
    }

    addGlobal(parserObject) {
        const newSnapshot = this.schema.updateIn(["globalProperties"], list => list.push(parserObject.transformObject()));
        return new SchemaSnapshot(newSnapshot);
    }

    removeGlobal(index) {
        const newSnapshot = this.schema.updateIn(["globalProperties"], list => list.remove(index));
        return new SchemaSnapshot(newSnapshot);
    }

    editGlobal(index, parserObject) {
        const newSnapshot = this
            .removeGlobal(index)
            .addGlobal(parserObject);
        return newSnapshot;
    }

    extractString() {
        return JSON.stringify(this.getSchema());
    }

    iterateFields() {
        const schema = this.getSchema();
        return Object.keys(schema.fields).map(name => ({ name, field: schema.fields[name] }));
    }
}