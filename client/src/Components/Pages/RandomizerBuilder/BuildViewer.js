import React, { useCallback } from "react";
import { Builder } from "../../../config";
import { convertTypeToName } from "../../../utils";
import { DELETE_FIELD, DELETE_FIELD_FROM_PROPERTY, DELETE_GLBOAL_PROPERTY, SWAP_FIELDS } from "./snapshotReducer";




export default function BuildViewer({ snapshot, dispatch, fieldModal, propertyModal }) {

    const onEditFieldClicked = useCallback((fieldIndex, oldName, fieldObject) => {
        fieldModal(true, {
            mode: Builder.ModalMode.EDIT,
            title: "Edit Field",
            fieldObject,
            fieldIndex,
            oldName
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

    const onAddPropertyClicked = useCallback(fieldIndex => {
        propertyModal(true, {
            mode: Builder.ModalMode.ADD_PROPERTY,
            title: "Add Property",
            fieldIndex
        });
    }, [propertyModal]);

    const onEditPropertyClicked = useCallback((fieldIndex, index, fieldObject) => {
        propertyModal(true, {
            mode: Builder.ModalMode.EDIT_PROPERTY,
            title: "Edit Property",
            fieldIndex,
            index,
            fieldObject
        })
    }, [propertyModal]);


    const onFieldDelete = useCallback(index => {
        dispatch({
            type: DELETE_FIELD,
            index
        });
    }, [dispatch]);

    const onPropertyDelete = useCallback((fieldIndex, propertyIndex) => {
        dispatch({
            type: DELETE_FIELD_FROM_PROPERTY,
            fieldIndex,
            propertyIndex
        });
    }, [dispatch]);

    const onGlobalDelete = useCallback(index => {
        dispatch({
            type: DELETE_GLBOAL_PROPERTY,
            index
        });
    }, [dispatch]);

    const changeOrder = useCallback((index, secondIndex) => {
        dispatch({
            type: SWAP_FIELDS,
            index,
            secondIndex
        });
    }, [dispatch]);

    return (
        <div>
            <h2>Fields</h2>
            {snapshot.iterateFields().length === 0 ?
                <p className="lead">
                    You don't have any fields. Please add at least one field before submitting your randomizer.
                </p>
                :
                snapshot.iterateFields().map(({ name, data }, key) => <FieldDisplay
                    key={key}
                    name={name}
                    field={data}
                    onDelete={() => onFieldDelete(key)}
                    onEdit={() => onEditFieldClicked(key, name, data)}
                    onAddProperty={() => onAddPropertyClicked(key)}
                    onEditProperty={(index, propertyObject) => onEditPropertyClicked(key, index, propertyObject)}
                    onDeleteProperty={index => onPropertyDelete(key, index)}
                    orderUp={() => changeOrder(key, key - 1)}
                    orderDown={() => changeOrder(key, key + 1)}
                />)}
            <hr />
            <h2>Global Properties</h2>

            {snapshot.getSchema().globalProperties.length === 0 ?
                <p className="lead"> You don't have any properties yet.</p>
                :
                <div className="row">
                    {snapshot.getSchema().globalProperties.map((i, key) => <GlobalPropertyDisplay
                        key={key}
                        index={key}
                        field={i}
                        onDelete={() => onGlobalDelete(key)}
                        onEdit={() => onEditGlobalClicked(key, i)}
                    />)}
                </div>}

        </div>
    );
}


function GlobalPropertyDisplay({ index, field, onDelete, onEdit }) {
    return (
        <div className="col-5 col-lg-2 border border-primary mx-2 mb-2 text-center">
            <h6 className="d-inline-block">Type:</h6> {convertTypeToName(field)}
            <br />
            <h6 className="d-inline-block">Index:</h6> {index}
            <br />
            <button title="Edit" className="btn fas fa-edit icon-button" style={customPadding} onClick={onEdit} />
            <button title="Delete" className="btn far fa-trash-alt icon-button" style={customPadding} onClick={onDelete} />
        </div>
    );
}


function FieldDisplay({ name, field, onDelete, onEdit, onAddProperty, onEditProperty, onDeleteProperty, orderUp, orderDown }) {

    return (
        <div className="container text-center border border-primary mb-2">
            <h1 className="pr-2 font-weight-bold">{name}</h1>
            <button title="Add Property"
                className="btn far fa-plus-square icon-button" onClick={onAddProperty} style={customPadding} />
            <button title="Edit" className="btn fas fa-edit icon-button" style={customPadding} onClick={onEdit} />
            <button title="Delete" className="btn far fa-trash-alt icon-button" style={customPadding} onClick={onDelete} />
            <button title="Order Up" className="btn fas fa-arrow-up icon-button" style={customPadding} onClick={orderUp} />
            <button title="Order Up" className="btn fas fa-arrow-down icon-button" style={customPadding} onClick={orderDown} />
            <br />
            {convertTypeToName(field)}
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
            <h4>Properties</h4>
            <div className="row">
                {
                    properties ?
                        properties.map((item, key) => {
                            return (
                                <div key={key} className="col-5 col-lg-2 border border-secondary mx-2 mb-2">
                                    <h6 className="d-inline-block">Type:</h6> {convertTypeToName(item)}
                                    <br />
                                    <h6 className="d-inline-block">Index:</h6> {key}
                                    <br />
                                    <button title="Edit" className="btn fas fa-edit icon-button" style={customPadding}
                                        onClick={() => onEdit(key, item)} />
                                    <button title="Delete" className="btn far fa-trash-alt icon-button" style={customPadding}
                                        onClick={() => onDelete(key)} />
                                </div>
                            );
                        })
                        : null
                }
            </div>
        </div>
    );
}

const customPadding = {
    padding: "0",
    paddingRight: "0.5rem"
}