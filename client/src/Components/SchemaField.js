import React, { useState, useEffect, useCallback, useMemo } from "react";
import RandomizerBuilder from "./Pages/RandomizerBuilder/RandomizerBuilder";
import ErrorDisplay from "./ErrorDisplay";
import Textarea from "./Form/Textarea";
import { fromJS } from "immutable";
import { SchemaSnapshot } from "../SchemaBuilder/schemaSnapshot";
import { useInput } from "../Hooks/formInput";

export default function SchemaField({ error, initial, onChange }) {

    const [schema, bindSchema, setSchema] = useInput(initial);
    const [defaultSchema, setDefaultSchema] = useState(initial)


    useEffect(function onInitialChanged() {
        setDefaultSchema(initial);
        setSchema(initial);
    }, [initial, setSchema]);

    const defaultSnapshot = useMemo(() => {
        try {
            return new SchemaSnapshot(fromJS((JSON.parse(defaultSchema))));
        } catch (error) {
            return null;
        }
    }, [defaultSchema]);

    const [editorActive, setEditorActive] = useState(true);
    const [editorSnapshot, setSnapshot] = useState(null);
    const onSnapshot = useCallback(snapshot => {
        setSnapshot(snapshot);
    }, []);

    const convertFromEditorClicked = useCallback(() => {
        setSchema(editorSnapshot.extractString());
    }, [setSchema, editorSnapshot]);

    const populateEditorFromRawJson = useCallback(() => {
        setDefaultSchema(schema);
    }, [schema]);


    const getJsonString = useCallback(() => {
        if (editorActive) {
            if (editorSnapshot === null) return "";
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
                <RandomizerBuilder
                    onSnapshot={onSnapshot}
                    defaultSnapshot={defaultSnapshot}
                />
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
