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
        if (typeof this.schema.fields[fieldName] != "undefined") {
            delete this.schema.fields[fieldName];
        }
        return new SchemaSnapshot(this.schema);
    }

    addGlobal(object) {
        this.schema.globalProperties.push(object);
        return new SchemaSnapshot(this.schema);
    }

    removeGlobal(index) {
        this.schema.globalProperties.splice(index, 1);
        return new SchemaSnapshot(this.schema);
    }

    extractString() {
        return JSON.stringify(this.getSchema());
    }

    iterateFields() {
        const schema = this.getSchema();
        return Object.keys(schema.fields).map(name => ({ name, field: schema.fields[name] }));
    }
}