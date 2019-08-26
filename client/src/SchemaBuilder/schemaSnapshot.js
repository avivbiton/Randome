import { fromJS } from "immutable";

export class SchemaSnapshot {
    constructor(schema = fromJS({
        fields: [],
        globalProperties: []
    })) {
        this.schema = schema;
    }

    getSchema() {
        return this.schema.toJS();
    }

    addField(fieldName, parserObject) {
        const transformedObject = parserObject.transformObject();
        transformedObject["properties"] = parserObject["properties"] ? fromJS(parserObject["properties"]) : fromJS([]);
        const newObject = this.schema.update("fields", list => list.push({ name: fieldName, data: transformedObject }));
        return new SchemaSnapshot(newObject);
    }

    removeField(fieldIndex) {
        const newSnapshot = this.schema.update("fields", list => list.remove(fieldIndex));
        return new SchemaSnapshot(newSnapshot);
    }

    editField(index, newName, parserObject) {
        const properties = this.schema.getIn(["fields", index, "data", "properties"]);
        parserObject = parserObject.transformObject();
        if (properties) {
            parserObject["properties"] = properties;
        } else {
            parserObject["properties"] = fromJS([]);
        }

        const newSnapshot = this.schema.update("fields", list => list.set(index, { name: newName, data: parserObject }))
        return new SchemaSnapshot(newSnapshot);
    }

    appendPropertyToField(fieldIndex, parserObject) {
        const newSnapshot = this.schema.updateIn(["fields", fieldIndex, "data", "properties"],
            list => list.push(parserObject.transformObject()));
        return new SchemaSnapshot(newSnapshot);
    }

    editPropertyField(fieldIndex, propertyIndex, updatedProperty) {
        const newSnapshot = this.schema.updateIn(["fields", fieldIndex, "data", "properties"],
            list => list.set(propertyIndex, updatedProperty.transformObject()));
        return new SchemaSnapshot(newSnapshot);
    }

    removePropertyFromField(fieldIndex, propertyIndex) {
        const newSnapshot = this.schema.updateIn(["fields", fieldIndex, "data", "properties"],
            list => list.remove(propertyIndex));
        return new SchemaSnapshot(newSnapshot);
    }

    addGlobal(parserObject) {
        const newSnapshot = this.schema.updateIn(["globalProperties"], list => {
            return list.push(parserObject.transformObject())
        });
        return new SchemaSnapshot(newSnapshot);
    }

    removeGlobal(index) {
        const newSnapshot = this.schema.updateIn(["globalProperties"], list => list.remove(index));
        return new SchemaSnapshot(newSnapshot);
    }

    editGlobal(index, parserObject) {
        const newSnapshot = this.schema.update("globalProperties", list => list.set(index, parserObject));
        return new SchemaSnapshot(newSnapshot);
    }

    extractString() {
        return JSON.stringify(this.getSchema(), null, 4);
    }

    iterateFields() {
        const schema = this.getSchema();
        return schema.fields;
    }
}
