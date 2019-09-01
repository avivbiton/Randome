import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Prompt } from "react-router-dom";
import { useInput, useCheckbox } from "../Hooks/formInput";

import Input from "./Form/Input";
import Textarea from "./Form/Textarea";
import Button from "./Form/Button";
import RandomizerBuilder from "./Pages/RandomizerBuilder/RandomizerBuilder";
import ErrorDisplay from "./ErrorDisplay";
import ResultDisplayer from "./Pages/RandomizerPage/ResultDisplayer";
import { ContentGenerator } from "randomcontentgenerator";
import { SchemaSnapshot } from "../SchemaBuilder/schemaSnapshot";
import { fromJS } from "immutable";


export default function RandomizerForm({ inital = { name: "", description: "", jsonSchema: "", isPrivate: false },
    errors, onSubmit, submitText, loading, blockLeave = true }) {

    const [name, bindName] = useInput(inital.name);
    const [description, bindDescription] = useInput(inital.description);
    const [schema, bindSchema, setSchema] = useInput(inital.jsonSchema);
    const { value: isPrivate, bind: bindPrivate } = useCheckbox(inital.private);
    const [defaultSchema, setDefaultSchema] = useState(inital.jsonSchema)

    const defaultSnapshot = useMemo(() => {
        try {
            return new SchemaSnapshot(fromJS((JSON.parse(defaultSchema))));
        } catch (error) {
            return null;
        }
    }, [defaultSchema]);

    const [editorActive, setEditorActive] = useState(true);
    const [editorSnapshot, setSnapshot] = useState(null);

    useEffect(() => {
        function askBeforeLeaving() {
            return "Are you sure you want to leave? Your data will be lost.";
        }

        window.onbeforeunload = askBeforeLeaving;

        return () => window.onbeforeunload = undefined;
    }, []);

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

    const onFormSubmit = useCallback(() => {
        const schemaToSend = editorActive ? editorSnapshot.extractString() : schema;
        onSubmit({ name, description, schema: schemaToSend, isPrivate });
    }, [editorActive, editorSnapshot, name, description, schema, isPrivate, onSubmit]);

    return (
        <React.Fragment>
            <Prompt
                when={blockLeave}
                message="Are you sure you want to leave? you data will be lost."
            />
            <form onSubmit={e => e.preventDefault()}>
                <Input type="text" className="form-control form-control-lg" placeholder="Choose a name"
                    {...bindName} error={errors.name} />
                <Textarea rows="5" placeholder="Short description, explaining what your randomizers does." className="form-control form-control-lg mt-2"
                    {...bindDescription}
                    error={errors.description} />

                <p className="alert alert-info mt-4">
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    Our Editor is in <span className="font-weight-bold">Beta</span>. You may encounter bugs or other issues.
                    However, it is still recommended that you will use the Editor instead of the "Raw JSON" option.
                    If you want to save your changes and continue later, you can publish in private mode and edit it later.
                </p>
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
                    <ErrorDisplay error={errors.schema} />
                    <button type="button" className="btn btn-outline-primary mt-2" onClick={populateEditorFromRawJson}>
                        Populate Editor from Raw JSON
                    </button>
                </div>
                <div className={(editorActive ? "d-none" : "d-block")}>
                    <Textarea rows="10" placeholder="Post your schema here" className="form-control form-control-lg mt-2"
                        {...bindSchema}
                        error={errors.schema} />
                    <button type="button" className="btn btn-outline-primary mt-2" onClick={convertFromEditorClicked}>Copy JSON from Editor</button>
                </div>

                <div className="form-check">
                    <input type="checkbox" className="form-check-input mt-2" id="checkboxIsPrivate"
                        {...bindPrivate} />
                    <label htmlFor="checkboxIsPrivate" className="form-check-label text-danger">
                        Private
                    </label>
                    <small className="form-text text-muted text-danger">Warning! no one will be able to view, like or favorite your randomizer if it is private. You can change this later.</small>
                </div>
                <div className="d-flex flex-column mt-4">
                    <i className="far fa-hand-point-down fa-3x mx-auto"></i>
                    <br />
                    <button className="btn btn-info mx-auto" type="button" data-toggle="collapse" data-target="#previewCollapse" aria-expanded="false" aria-controls="previewCollapse">
                        Show / Hide Preview
                    </button>
                    <div id="previewCollapse" className="collapse mx-auto">
                        <Preview jsonString={getJsonString()} />
                    </div>
                </div>
                <Button type="submit" onClick={onFormSubmit} className="btn btn-success btn-lg btn-block mt-4"
                    loading={loading}>{submitText}</Button>
            </form>
        </React.Fragment>
    );
}


function Preview({ jsonString }) {

    const [currentResult, setResult] = useState(null);

    const onDiceRoll = useCallback(() => {
        const data = new ContentGenerator(JSON.parse(jsonString)).build();
        setResult(data);
    }, [jsonString]);

    return (
        <div className="mt-4">
            <button type="button" className="btn btn-primary btn-lg" onClick={onDiceRoll}>
                Roll the Dice<i className="fas fa-dice ml-2" />
            </button>
            <div className="row mt-3">
                <div className="col">

                    <ResultDisplayer result={currentResult} />

                </div>
            </div>
        </div>
    );
}