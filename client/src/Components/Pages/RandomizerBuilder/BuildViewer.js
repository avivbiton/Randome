import React, { useCallback } from "react";
import { ContentGenerator } from "randomcontentgenerator";
import { Builder } from "../../../config";

export default function BuildViewer({ snapshot, onFieldDelete, onGlobalDelete, onPropertyDelete, fieldModal, propertyModal }) {

    const onEditFieldClicked = useCallback((name, fieldObject) => {
        fieldModal(true, {
            mode: Builder.ModalMode.EDIT,
            title: "Edit Field",
            fieldObject,
            oldName: name
        });
    }, [fieldModal]);

    const onEditGlobalClicked = useCallback((index, fieldObject) => {
        propertyModal(true, {
            mode: Builder.ModalMode.EDIT,
            title: "Edit Global Property",
            index,
            fieldObject
        });
    }, [propertyModal]);

    const onAddPropertyClicked = useCallback(fieldName => {
        propertyModal(true, {
            mode: Builder.ModalMode.ADD_PROPERTY,
            title: "Add Property",
            fieldName
        });
    }, [propertyModal]);

    const onEditPropertyClicked = useCallback((fieldName, index, fieldObject) => {
        propertyModal(true, {
            mode: Builder.ModalMode.EDIT_PROPERTY,
            title: "Edit Property",
            fieldName,
            index,
            fieldObject
        })
    }, [propertyModal]);

    return (
        <div>
            <h2>Fields</h2>
            {snapshot.iterateFields().map(({ name, field }, key) => <FieldDisplay
                key={key}
                name={name}
                field={field}
                onDelete={() => onFieldDelete(name)}
                onEdit={() => onEditFieldClicked(name, field)}
                onAddProperty={() => onAddPropertyClicked(name)}
                onEditProperty={(index, propertyObject) => onEditPropertyClicked(name, index, propertyObject)}
                onDeleteProperty={index => onPropertyDelete(name, index)}
            />)}
            <hr />
            <h2>Global Properties</h2>
            {snapshot.getSchema().globalProperties.map((i, key) => <GlobalPropertyDisplay
                key={key}
                field={i}
                onDelete={() => onGlobalDelete(key)}
                onEdit={() => onEditGlobalClicked(key, i)}
            />)}
        </div>
    );
}


function GlobalPropertyDisplay({ field, onDelete, onEdit }) {

    return (
        <div className="border border-primary p-2">
            {new ContentGenerator().findParser(field).constructor.name}
            <button title="Edit" className="btn fas fa-edit icon-button" style={noPadding} onClick={onEdit} />
            <button title="Delete" className="btn far fa-trash-alt icon-button" style={noPadding} onClick={onDelete} />
        </div>
    );
}


function FieldDisplay({ name, field, onDelete, onEdit, onAddProperty, onEditProperty, onDeleteProperty }) {

    return (
        <div className="border border-primary p-2">
            <span className="pr-4">{name}</span>
            <button title="Edit" className="btn fas fa-edit icon-button" style={noPadding} onClick={onEdit} />
            <button title="Delete" className="btn far fa-trash-alt icon-button" style={noPadding} onClick={onDelete} />
            <button title="Add Property"
                className="btn fas fa-plus icon-button" onClick={onAddProperty} style={{ fontWeight: "900" }} />
            <PropertyDisplay
                properties={field.properties}
                onEdit={onEditProperty}
                onDelete={onDeleteProperty}
            />
        </div>
    );
}

function PropertyDisplay({ properties, onEdit, onDelete }) {
    return (
        <div>
            <h5>Properties</h5>
            {
                properties.map((item, key) => {
                    return (
                        <div key={key}>
                            index: {key}. Type: {new ContentGenerator().findParser(item).constructor.name}
                            <button title="Edit" className="btn fas fa-edit icon-button" style={noPadding}
                                onClick={() => onEdit(key, item)} />
                            <button title="Delete" className="btn far fa-trash-alt icon-button" style={noPadding}
                                onClick={() => onDelete(key)} />
                        </div>
                    );
                })
            }
        </div>
    );
}

const noPadding = {
    padding: "0"
}