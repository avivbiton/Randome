import React, { useCallback, useEffect, useReducer } from "react";
import { SchemaSnapshot } from "../../../SchemaBuilder/schemaSnapshot";
import BuildViewer from "./BuildViewer";
import useModal from "../../../Hooks/useModal";
import FieldModal from "./FieldModal";
import PropertyModal from "./PropertyModal";
import { Builder } from "../../../config";
import { snapshotReducer, UPDATE_SNAPSHOT_HISTORY, INCREASE_INDEX, DECREASE_INDEX } from "./snapshotReducer";

export default function RandomizerBuilder({ defaultSnapshot, onSnapshot }) {

    const [snapshot, dispatchSnapshot] = useReducer(snapshotReducer,
        {
            history: [new SchemaSnapshot()],
            index: 0
        });

    const currentSnapshot = snapshot.history[snapshot.index];

    const [toggleFieldModal, bindFieldModal] = useModal();
    const [togglePropertyModal, bindGlobalModal] = useModal();


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
        dispatchSnapshot({
            type: UPDATE_SNAPSHOT_HISTORY,
            payload: snapshot
        })
    }, []);

    useEffect(() => {
        if (defaultSnapshot) {
            updateSnapshotHistory(defaultSnapshot);
        }
    }, [defaultSnapshot, updateSnapshotHistory]);

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

    const editField = useCallback((index, name, parser) => {
        const snapshot = currentSnapshot
            .editField(index, name, parser);
        updateSnapshotHistory(snapshot);
    }, [updateSnapshotHistory, currentSnapshot]);

    const editGlobal = useCallback((index, parser) => {
        const snapshot = currentSnapshot
            .editGlobal(index, parser);
        updateSnapshotHistory(snapshot);
    }, [updateSnapshotHistory, currentSnapshot]);

    const addProperty = useCallback((fieldIndex, parser) => {
        const snapshot = currentSnapshot
            .appendPropertyToField(fieldIndex, parser);
        updateSnapshotHistory(snapshot);
    }, [updateSnapshotHistory, currentSnapshot]);

    const editProperty = useCallback((fieldIndex, index, parser) => {
        const snapshot = currentSnapshot
            .editPropertyField(fieldIndex, index, parser);
        updateSnapshotHistory(snapshot);
    }, [updateSnapshotHistory, currentSnapshot]);

    const undoLastAction = useCallback(() => {
        if (snapshot.index === 0) return;
        dispatchSnapshot({ type: DECREASE_INDEX });
    }, [snapshot]);

    const redoAction = useCallback(() => {
        if (snapshot.index === snapshot.history.length - 1) return;
        dispatchSnapshot({ type: INCREASE_INDEX });
    }, [snapshot]);

    const onFieldModalResolved = useCallback((name, parser, data) => {
        const mode = data.mode;
        switch (mode) {
            case Builder.ModalMode.ADD:
                return addField(name, parser);
            case Builder.ModalMode.EDIT:
                return editField(data.fieldIndex, name, parser);
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
                return addProperty(data.fieldIndex, parser);
            case Builder.ModalMode.EDIT_PROPERTY:
                return editProperty(data.fieldIndex, data.index, parser);
            default: return;
        }
    }, [addGlobal, editGlobal, addProperty, editProperty]);

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="d-flex">
                        <button type="button"
                            className="btn btn-outline-primary mr-2" onClick={onAddFieldClicked}>Add Field</button>
                        <button type="button"
                            className="btn btn-outline-primary mr-2" onClick={onAddGlobalClicked}>Add Global Property</button>
                        <button type="button"
                            className="btn btn-outline-primary mr-1" onClick={redoAction}>Redo<i className="fas fa-redo mx-1"></i></button>
                        <button type="button"
                            className="btn btn-outline-primary mr-1" onClick={undoLastAction}>Undo<i className="fas fa-undo mx-1"></i></button>

                    </div>
                    <hr />
                    <BuildViewer
                        snapshot={currentSnapshot}
                        dispatch={dispatchSnapshot}
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

