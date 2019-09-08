import React, { useState, useCallback } from "react";
import { useInput, useCheckbox } from "../Hooks/formInput";
import { Link } from "react-router-dom";

import Input from "./Form/Input";
import Textarea from "./Form/Textarea";
import Button from "./Form/Button";
import ResultDisplayer from "./Pages/RandomizerPage/ResultDisplayer";
import { ContentGenerator } from "randomcontentgenerator";
import AskBeforeLeave from "./AskBeforeLeave";
import SchemaField from "./SchemaField";
import ErrorDisplay from "./ErrorDisplay";
import Checkbox from "./Form/Checkbox";


export default function RandomizerForm({ inital = { name: "", description: "", jsonSchema: "", isPrivate: false },
    errors, onSubmit, submitText, loading, blockLeave = true }) {

    const [name, bindName] = useInput(inital.name);
    const [description, bindDescription] = useInput(inital.description);
    const [schema, setSchema] = useState(null);
    const { value: isPrivate, bind: bindPrivate } = useCheckbox(inital.private);

    const onSchemaChange = useCallback(newSchema => {
        setSchema(newSchema);
    }, []);

    const onFormSubmit = useCallback(() => {
        if (schema == null) return;
        onSubmit({ name, description, schema, isPrivate });
    }, [name, description, schema, isPrivate, onSubmit]);

    return (
        <React.Fragment>
            <AskBeforeLeave
                blockLeave={blockLeave} />

            <form onSubmit={e => e.preventDefault()}>
                <Input type="text" className="form-control form-control-lg" placeholder="Choose a name"
                    {...bindName} error={errors.name} />
                <Textarea rows="5" placeholder="Short description, explaining what your randomizers does." className="form-control form-control-lg mt-2"
                    {...bindDescription}
                    error={errors.description} />
                <div className="mt-2">
                    <Checkbox
                        id="checkboxIsPrivate"
                        label="Make This Private"
                        {...bindPrivate}
                    />
                    <small className="form-text text-muted text-danger">Warning! no one will be able to view, like or favorite your randomizer if it is private. You can change this later.</small>
                </div>
                
                <div className="alert alert-info mt-4">
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    Our Editor is in <span className="font-weight-bold">Beta</span>. You may encounter bugs or other issues.
                    However, it is still recommended that you will use the Editor instead of the "Raw JSON" option.
                    If you want to save your changes and continue later, you can publish in private mode and edit it later.
                    <div style={{ fontSize: "120%" }}>
                        <Link className="text-reset" to="/guide" target="_blank">Don't know what you are doing? Read this 2-minute tutorial.</Link>
                    </div>
                </div>
                <SchemaField
                    error={errors.schema}
                    onChange={onSchemaChange}
                    initial={inital.jsonSchema} />
                <div className="d-flex flex-column mt-4">
                    <i className="far fa-hand-point-down fa-3x mx-auto"></i>
                    <br />
                    <button className="btn btn-primary mx-auto" type="button" data-toggle="collapse" data-target="#previewCollapse" aria-expanded="false" aria-controls="previewCollapse">
                        Show / Hide Preview
                    </button>
                    <div id="previewCollapse" className="collapse">
                        <Preview jsonString={schema} />
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
    const [error, setError] = useState("");

    const onDiceRoll = useCallback(() => {
        try {
            const data = new ContentGenerator(JSON.parse(jsonString)).build();
            setResult(data);
            setError(null);
        }
        catch (error) {
            setError(error.message);
        }
    }, [jsonString]);

    return (
        <div className="border border-secondary mt-4 p-4 shadow">
            <button type="button" className="btn btn-primary btn-lg" onClick={onDiceRoll}>
                Roll the Dice<i className="fas fa-dice ml-2" />
            </button>
            <ErrorDisplay error={error} />
            <div className="row mt-3">
                <div className="col">

                    <ResultDisplayer result={currentResult} />

                </div>
            </div>
        </div>
    );
}