import React, { useState, useEffect, useCallback, useMemo } from "react";
import Button from "../../Form/Button";
import { MinMaxPicker } from "../../../SchemaBuilder/minMaxPicker";
import { SchemaSnapshot } from "../../../SchemaBuilder/schemaSnapshot";
import { ContentGenerator } from "randomcontentgenerator";
import BuildViewer from "./BuildViewer";

export default function RandomizerBuilder() {

    const [snapshotHistory, setSnapshotHistory] = useState([new SchemaSnapshot()]);
    const [historyIndex, setIndex] = useState(0);
    const currentSnapshot = useMemo(() => snapshotHistory[historyIndex], [snapshotHistory, historyIndex]);


    const updateSnapshotHistory = useCallback(snapshot => {
        snapshotHistory.splice(historyIndex + 1);
        setSnapshotHistory([...snapshotHistory, snapshot]);
        setIndex(historyIndex + 1);
    }, [snapshotHistory, historyIndex]);


    const onAddFieldClicked = useCallback(() => {
        const name = window.prompt("enter name");
        const snapshot = currentSnapshot
            .addField(name, new MinMaxPicker(0, 5));
        updateSnapshotHistory(snapshot);

    }, [updateSnapshotHistory, currentSnapshot]);

    const onAddGlobal = useCallback(() => {
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


    const onSaveButtonPressed = useCallback(() => {
        const jsonString = currentSnapshot.extractString();
        console.log(jsonString);
    }, [currentSnapshot]);

    return (
        <div className="card">
            <h1 className="card-header">Builder</h1>
            <div className="card-body">
                <div className="d-flex">
                    <button className="btn btn-outline-info mr-2" onClick={onAddFieldClicked}>Add Field</button>
                    <button className="btn btn-outline-info mr-2" onClick={onAddGlobal}>Add Global Property</button>
                    <button className="btn btn-outline-info mr-1" onClick={onRedoClicked}><i className="fas fa-redo mx-1"></i></button>
                    <button className="btn btn-outline-info mr-1" onClick={onUndoClicked}><i className="fas fa-undo mx-1"></i></button>

                </div>
                <hr />
                <BuildViewer snapshot={currentSnapshot} />
                <hr />
            </div>
            <div className="card-footer">
                <Button className="btn btn-primary mx-2" onClick={onSaveButtonPressed}>Save</Button>
                <Button className="btn btn-secondary">Reset</Button>
            </div>
        </div>
    );
}


