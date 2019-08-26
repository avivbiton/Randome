import React, { useState, useCallback, useMemo, useEffect } from "react";
import { SchemaSnapshot } from "../../../SchemaBuilder/schemaSnapshot";
import BuildViewer from "./BuildViewer";
import useModal from "../../../Hooks/useModal";
import FieldModal from "./FieldModal";
import PropertyModal from "./PropertyModal";
import { Builder } from "../../../config";

export default function RandomizerBuilder({ defaultSnapshot, onSnapshot }) {

    const [snapshotHistory, setSnapshotHistory] = useState([new SchemaSnapshot()]);
    const [historyIndex, setIndex] = useState(0);
    const currentSnapshot = useMemo(() => snapshotHistory[historyIndex], [snapshotHistory, historyIndex]);

    const [toggleFieldModal, bindFieldModal] = useModal();
    const [togglePropertyModal, bindGlobalModal] = useModal();

    useEffect(() => {
        if (defaultSnapshot) {
            setSnapshotHistory([defaultSnapshot]);
            setIndex(0);
        }
    }, [defaultSnapshot]);

    useEffect(() => {
        onSnapshot(currentSnapshot);
    }, [currentSnapshot, onSnapshot]);

    const onAddFieldClicked = useCallback(() => {
        toggleFieldModal(true, {
            mode: Builder.ModalMode.ADD,
            title: "Add New Field"
        });
    }, [toggleFieldModal]);

    const onAddGlobalClicked = useCallback(() => {
        togglePropertyModal(true, {
            mode: Builder.ModalMode.ADD,
            title: "Add Global Property"
        });
    }, [togglePropertyModal]);


    const updateSnapshotHistory = useCallback(snapshot => {
        snapshotHistory.splice(historyIndex + 1);
        setSnapshotHistory([...snapshotHistory, snapshot]);
        setIndex(historyIndex + 1);
    }, [snapshotHistory, historyIndex]);


    const addField = useCallback((name, parser) => {
        const snapshot = currentSnapshot
            .addField(name, parser);
        updateSnapshotHistory(snapshot);

    }, [updateSnapshotHistory, currentSnapshot]);

    const addGlobal = useCallback(parser => {
        const snapshot = currentSnapshot
            .addGlobal(parser);
        updateSnapshotHistory(snapshot);
    }, [updateSnapshotHistory, currentSnapshot]);

    const editField = useCallback((oldName, name, parser) => {
        const snapshot = currentSnapshot
            .editField(oldName, name, parser);
        updateSnapshotHistory(snapshot);
    }, [updateSnapshotHistory, currentSnapshot]);

    const editGlobal = useCallback((index, parser) => {
        const snapshot = currentSnapshot
            .editGlobal(index, parser);
        updateSnapshotHistory(snapshot);
    }, [updateSnapshotHistory, currentSnapshot]);

    const addProperty = useCallback((fieldName, parser) => {
        const snapshot = currentSnapshot
            .appendPropertyToField(fieldName, parser);
        updateSnapshotHistory(snapshot);
    }, [updateSnapshotHistory, currentSnapshot]);

    const editProperty = useCallback((fieldName, index, parser) => {
        const snapshot = currentSnapshot
            .editPropertyField(fieldName, index, parser);
        updateSnapshotHistory(snapshot);
    }, [updateSnapshotHistory, currentSnapshot]);

    const undoLastAction = useCallback(() => {
        if (historyIndex === 0) return;
        setIndex(historyIndex - 1);
    }, [historyIndex]);

    const redoAction = useCallback(() => {
        if (historyIndex === snapshotHistory.length - 1) return;
        setIndex(historyIndex + 1);
    }, [historyIndex, snapshotHistory]);

    const deleteField = useCallback(name => {
        const snapshot = currentSnapshot.removeField(name);
        updateSnapshotHistory(snapshot);
    }, [currentSnapshot, updateSnapshotHistory]);

    const deleteGlobal = useCallback(index => {
        const snapshot = currentSnapshot.removeGlobal(index);
        updateSnapshotHistory(snapshot);
    }, [currentSnapshot, updateSnapshotHistory]);

    const deleteProperty = useCallback((fieldName, index) => {
        const snapshot = currentSnapshot
            .removePropertyFromField(fieldName, index);
        updateSnapshotHistory(snapshot);
    }, [currentSnapshot, updateSnapshotHistory]);

    const onFieldModalResolved = useCallback((name, parser, data) => {
        const mode = data.mode;
        switch (mode) {
            case Builder.ModalMode.ADD:
                return addField(name, parser);
            case Builder.ModalMode.EDIT:
                return editField(data.oldName, name, parser);
            default: return
        }
    }, [addField, editField]);

    const onPropertyModalResolved = useCallback((parser, data) => {
        const mode = data.mode;
        switch (mode) {
            case Builder.ModalMode.ADD:
                return addGlobal(parser);
            case Builder.ModalMode.EDIT:
                return editGlobal(data.index, parser);
            case Builder.ModalMode.ADD_PROPERTY:
                return addProperty(data.fieldName, parser);
            case Builder.ModalMode.EDIT_PROPERTY:
                return editProperty(data.fieldName, data.index, parser);
            default: return;
        }
    }, [addGlobal, editGlobal, addProperty, editProperty]);

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="d-flex">
                        <button type="button"
                            className="btn btn-outline-info mr-2" onClick={onAddFieldClicked}>Add Field</button>
                        <button type="button"
                            className="btn btn-outline-info mr-2" onClick={onAddGlobalClicked}>Add Global Property</button>
                        <button type="button"
                            className="btn btn-outline-info mr-1" onClick={redoAction}>Redo<i className="fas fa-redo mx-1"></i></button>
                        <button type="button"
                            className="btn btn-outline-info mr-1" onClick={undoLastAction}>Undo<i className="fas fa-undo mx-1"></i></button>

                    </div>
                    <hr />
                    <BuildViewer
                        snapshot={currentSnapshot}
                        onFieldDelete={deleteField}
                        onGlobalDelete={deleteGlobal}
                        onPropertyDelete={deleteProperty}
                        fieldModal={toggleFieldModal}
                        propertyModal={togglePropertyModal}
                    />
                    <hr />
                </div>
            </div>
            <FieldModal
                {...bindFieldModal}
                onConfirm={onFieldModalResolved}
            />
            <PropertyModal
                {...bindGlobalModal}
                onConfirm={onPropertyModalResolved}
            />
        </>
    );
}


