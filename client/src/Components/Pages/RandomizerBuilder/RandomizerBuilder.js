import React, { useState, useEffect, useCallback, useMemo } from "react";
import Button from "../../Form/Button";
import { MinMaxPicker } from "../../../SchemaBuilder/minMaxPicker";
import { SchemaSnapshot } from "../../../SchemaBuilder/schemaBuilder";
import { ContentGenerator } from "randomcontentgenerator";

export default function RandomizerBuilder() {

    const [snapshotHistory, setSnapshotHistory] = useState([new SchemaSnapshot()]);
    const [historyIndex, setIndex] = useState(0);
    const currentSnapshot = useMemo(() => snapshotHistory[historyIndex], [snapshotHistory, historyIndex]);

    const onAddFieldClicked = useCallback(() => {
        const name = window.prompt("enter name");
        const snapshot = currentSnapshot
            .addField(name, new MinMaxPicker(0, 5));

        snapshotHistory.splice(historyIndex + 1);
        setSnapshotHistory([...snapshotHistory, snapshot]);
        setIndex(historyIndex + 1);

    }, [snapshotHistory, historyIndex, currentSnapshot]);

    const onUndoClicked = useCallback(() => {
        if (historyIndex === 0) return;
        setIndex(historyIndex - 1);
    }, [historyIndex]);

    const onRedoClicked = useCallback(() => {
        if (historyIndex === snapshotHistory.length - 1) return;
        setIndex(historyIndex + 1);
    }, [historyIndex, snapshotHistory]);

    return (
        <div className="card">
            <h1 className="card-header">Builder</h1>
            <div className="card-body">
                <div className="d-flex">
                    <button className="btn btn-outline-info mr-2" onClick={onAddFieldClicked}>Add Field</button>
                    <button className="btn btn-outline-info mr-2">Add Global Property</button>
                    <button className="btn btn-outline-info mr-1" onClick={onRedoClicked}><i className="fas fa-redo mx-1"></i></button>
                    <button className="btn btn-outline-info mr-1" onClick={onUndoClicked}><i className="fas fa-undo mx-1"></i></button>

                </div>
                <hr />
                <h2>Fields</h2>
                {currentSnapshot.iterateFields().map(({ name, field }, key) => <FieldDisplay key={key} name={name} field={field} />)}
                <hr />
                <h2>Global Properties</h2>
                <hr />
            </div>
            <div className="card-footer">
                <Button className="btn btn-primary mx-2">Save</Button>
                <Button className="btn btn-secondary">Reset</Button>
            </div>
        </div>
    );
}


function FieldDisplay({ name, field }) {
    return (
        <div className="border border-primary p-2">
            {name}
            {new ContentGenerator().findParser(field).constructor.name}
        </div>
    );
}
