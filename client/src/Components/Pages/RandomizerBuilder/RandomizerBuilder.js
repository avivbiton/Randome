import React, { useState, useCallback, useMemo } from "react";
import Button from "../../Form/Button";
import { SchemaSnapshot } from "../../../SchemaBuilder/schemaSnapshot";
import BuildViewer from "./BuildViewer";
import useModal from "../../../Hooks/useModal";
import FieldModal from "./FieldModal";
import PropertyModal from "./GlobalModal";
import { Builder } from "../../../config";

export default function RandomizerBuilder() {

    const [snapshotHistory, setSnapshotHistory] = useState([new SchemaSnapshot()]);
    const [historyIndex, setIndex] = useState(0);
    const currentSnapshot = useMemo(() => snapshotHistory[historyIndex], [snapshotHistory, historyIndex]);

    const [toggleFieldModal, bindFieldModal] = useModal();
    const [toggleGlobalModal, bindGlobalModal] = useModal();


    const onAddFieldClicked = useCallback(() => {
        toggleFieldModal(true, { mode: Builder.ModalMode.ADD });
    }, [toggleFieldModal]);

    const onAddGlobalClicked = useCallback(() => {
        toggleGlobalModal(true, {
            mode: Builder.ModalMode.ADD
        });
    }, [toggleGlobalModal]);

    const onEditFieldClicked = useCallback((name, fieldObject) => {
        toggleFieldModal(true, {
            mode: Builder.ModalMode.EDIT,
            fieldObject,
            oldName: name
        });
    }, [toggleFieldModal]);

    const onEditGlobalClicked = useCallback((index, fieldObject) => {
        toggleGlobalModal(true, {
            mode: Builder.ModalMode.EDIT,
            index,
            fieldObject
        });
    }, [toggleGlobalModal]);

    const onAddPropertyClicked = useCallback((fieldName) => {
        toggleGlobalModal(true, {
            mode: Builder.ModalMode.ADD,
            fieldName
        });

    }, [toggleGlobalModal]);

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

    const onSaveButtonPressed = useCallback(() => {
        const jsonString = currentSnapshot.extractString();
        console.log(jsonString);
    }, [currentSnapshot]);

    return (
        <>
            <div className="card">
                <h1 className="card-header">Builder</h1>
                <div className="card-body">
                    <div className="d-flex">
                        <button className="btn btn-outline-info mr-2" onClick={onAddFieldClicked}>Add Field</button>
                        <button className="btn btn-outline-info mr-2" onClick={onAddGlobalClicked}>Add Global Property</button>
                        <button className="btn btn-outline-info mr-1" onClick={redoAction}><i className="fas fa-redo mx-1"></i></button>
                        <button className="btn btn-outline-info mr-1" onClick={undoLastAction}><i className="fas fa-undo mx-1"></i></button>

                    </div>
                    <hr />
                    <BuildViewer
                        snapshot={currentSnapshot}
                        onFieldDelete={deleteField}
                        onGlobalDelete={deleteGlobal}
                        onEditField={onEditFieldClicked}
                        onEditGlboal={onEditGlobalClicked}
                        onAddProperty={onAddPropertyClicked}
                    />
                    <hr />
                </div>
                <div className="card-footer">
                    <Button className="btn btn-primary mx-2" onClick={onSaveButtonPressed}>Save</Button>
                    <Button className="btn btn-secondary">Reset</Button>
                </div>
            </div>
            <FieldModal
                {...bindFieldModal}
                onConfirm={addField}
                onEdit={editField}
            />
            <PropertyModal
                {...bindGlobalModal}
                onConfirm={addGlobal}
                onEdit={editGlobal}
            />
        </>
    );
}


