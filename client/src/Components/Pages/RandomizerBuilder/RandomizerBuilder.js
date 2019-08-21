import React, { useState, useCallback, useMemo } from "react";
import Button from "../../Form/Button";
import { MinMaxPicker } from "../../../SchemaBuilder/minMaxPicker";
import { SchemaSnapshot } from "../../../SchemaBuilder/schemaSnapshot";
import BuildViewer from "./BuildViewer";
import useModal from "../../../Hooks/useModal";
import AddFieldModal from "./AddFieldModal";
import AddGlobalModal from "./AddGlobalModal";

export default function RandomizerBuilder() {

    const [snapshotHistory, setSnapshotHistory] = useState([new SchemaSnapshot()]);
    const [historyIndex, setIndex] = useState(0);
    const currentSnapshot = useMemo(() => snapshotHistory[historyIndex], [snapshotHistory, historyIndex]);

    const [fieldModalShow, toggleFieldModal] = useModal();
    const [globalModalShow, toggleGlobalModal] = useModal();


    const onAddFieldClicked = useCallback(() => {
        toggleFieldModal(true);
    }, [toggleFieldModal]);

    const onAddGlobalClicked = useCallback(() => {
        toggleGlobalModal(true);
    }, [toggleGlobalModal]);

    const updateSnapshotHistory = useCallback(snapshot => {
        snapshotHistory.splice(historyIndex + 1);
        setSnapshotHistory([...snapshotHistory, snapshot]);
        setIndex(historyIndex + 1);
    }, [snapshotHistory, historyIndex]);

    const onFieldModalConfirm = useCallback((name, parser) => {
        const snapshot = currentSnapshot
            .addField(name, parser);
        updateSnapshotHistory(snapshot);

    }, [updateSnapshotHistory, currentSnapshot]);

    const onGlobalModalConfirm = useCallback(() => {
        const snapshot = currentSnapshot
            .addGlobal(new MinMaxPicker(0, 5));
        updateSnapshotHistory(snapshot);
    }, [updateSnapshotHistory, currentSnapshot]);

    const onUndoClicked = useCallback(() => {
        if (historyIndex === 0) return;
        setIndex(historyIndex - 1);
    }, [historyIndex]);

    const onRedoClicked = useCallback(() => {
        if (historyIndex === snapshotHistory.length - 1) return;
        setIndex(historyIndex + 1);
    }, [historyIndex, snapshotHistory]);

    const onFieldDelete = useCallback(name => {
        const snapshot = currentSnapshot.removeField(name);
        updateSnapshotHistory(snapshot);
    }, [currentSnapshot, updateSnapshotHistory]);

    const onGlobalDelete = useCallback(index => {
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
                        <button className="btn btn-outline-info mr-1" onClick={onRedoClicked}><i className="fas fa-redo mx-1"></i></button>
                        <button className="btn btn-outline-info mr-1" onClick={onUndoClicked}><i className="fas fa-undo mx-1"></i></button>

                    </div>
                    <hr />
                    <BuildViewer
                        snapshot={currentSnapshot}
                        onFieldDelete={onFieldDelete}
                        onGlobalDelete={onGlobalDelete}
                    />
                    <hr />
                </div>
                <div className="card-footer">
                    <Button className="btn btn-primary mx-2" onClick={onSaveButtonPressed}>Save</Button>
                    <Button className="btn btn-secondary">Reset</Button>
                </div>
            </div>
            <AddFieldModal
                showing={fieldModalShow}
                toggle={toggleFieldModal}
                onConfirm={onFieldModalConfirm} />
            <AddGlobalModal
                showing={globalModalShow}
                toggle={toggleGlobalModal}
                onConfirm={onGlobalModalConfirm}
            />
        </>
    );
}


