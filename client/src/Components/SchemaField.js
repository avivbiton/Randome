import React, { useState, useEffect, useCallback } from "react";
import toastr from "toastr";
import { useSelector, useDispatch } from "react-redux";
import RandomizerBuilder from "./Pages/RandomizerBuilder/RandomizerBuilder";
import ErrorDisplay from "./ErrorDisplay";
import Textarea from "./Form/Textarea";
import { SchemaSnapshot } from "../SchemaBuilder/schemaSnapshot";
import { useInput } from "../Hooks/formInput";
import { UPDATE_SNAPSHOT_HISTORY } from "./Pages/RandomizerBuilder/snapshotReducer";
import { toastrDefault } from "../config";
import { RESET_HISTORY } from "../redux/Reducers/snapshotReducer";

export default function SchemaField({ error, initial, onChange }) {

    const [schema, bindSchema, setSchema] = useInput(initial);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => dispatch({ type: RESET_HISTORY });
    }, []);

    useEffect(function onInitialChanged() {
        setSchema(initial);
        if (initial)
            dispatchSchema(initial);
        // eslint-disable-next-line 
    }, [initial, setSchema]);

    const [editorActive, setEditorActive] = useState(true);
    const editorSnapshot = useSelector(state => state.snapshot.history[state.snapshot.index]);

    const convertFromEditorClicked = useCallback(() => {
        setSchema(editorSnapshot.extractString());
    }, [setSchema, editorSnapshot]);

    const populateEditorFromRawJson = useCallback(() => {
        dispatchSchema(schema);
        // eslint-disable-next-line 
    }, [schema]);

    const getJsonString = useCallback(() => {
        if (editorActive) {
            return editorSnapshot.extractString();
        } else {
            return schema;
        }
    }, [editorActive, editorSnapshot, schema]);

    useEffect(() => {
        if (onChange) {
            onChange(getJsonString());
        }
    }, [editorSnapshot, schema, onChange, getJsonString]);

    function dispatchSchema(jsonSchema) {
        const snapshot = new SchemaSnapshot();
        try {
            snapshot.set(JSON.parse(jsonSchema));
        } catch (error) {
            toastr.error("Either use Raw JSON option or fix your JSON object.", "Failed to parse JSON", toastrDefault);
        }
        dispatch({ type: UPDATE_SNAPSHOT_HISTORY, payload: snapshot });
    }


    return (
        <>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <button type="button" className={"btn btn-link nav-link" + (editorActive ? " active" : "")}
                        onClick={() => setEditorActive(true)}>
                        Editor (Recommended)
                    </button>
                </li>
                <li className="nav-item">
                    <button type="button" className={"btn btn-link nav-link" + (editorActive ? " " : " active")}
                        onClick={() => setEditorActive(false)}>
                        Raw JSON
                    </button>
                </li>
            </ul>

            <div className={(editorActive ? "d-block" : "d-none")}>
                <RandomizerBuilder />
                <ErrorDisplay error={error} />
                <button type="button" className="btn btn-sm btn-outline-secondary mt-2" onClick={populateEditorFromRawJson}>
                    Populate Editor from Raw JSON
                    </button>
            </div>
            <div className={(editorActive ? "d-none" : "d-block")}>
                <Textarea rows="10" placeholder="Post your schema here" className="form-control form-control-lg mt-2"
                    {...bindSchema}
                    error={error} />
                <button type="button" className="btn btn-sm btn-outline-secondary mt-2" onClick={convertFromEditorClicked}>Copy JSON from Editor</button>
            </div>
        </>
    );
}
