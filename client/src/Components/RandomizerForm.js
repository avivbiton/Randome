import React from "react";

import { useInput, useCheckbox } from "../Hooks/formInput";

import Input from "./Form/Input";
import Textarea from "./Form/Textarea";
import Button from "./Form/Button";

export default function RandomizerForm({ inital = { name: "", description: "", jsonSchema: "", isPrivate: false },
    errors, onSubmit, submitText, loading }) {

    const [name, bindName] = useInput(inital.name);
    const [description, bindDescription] = useInput(inital.description);
    const [schema, bindSchema] = useInput(inital.jsonSchema);
    const { value: isPrivate, bind: bindPrivate } = useCheckbox(inital.private);

    return (
        <form onSubmit={e => {
            e.preventDefault();
            onSubmit({ name, description, schema, isPrivate });
        }}>
            <Input type="text" className="form-control form-control-lg" placeholder="Choose a name"
                {...bindName} error={errors.name} />
            <Textarea rows="5" placeholder="Short description, explaining what your randomizers does." className="form-control form-control-lg mt-2"
                {...bindDescription}
                error={errors.description} />
            <Textarea rows="10" placeholder="Post your schema here" className="form-control form-control-lg mt-2"
                {...bindSchema}
                error={errors.schema} />
            <div className="form-check">
                <input type="checkbox" className="form-check-input mt-2" id="checkboxIsPrivate"
                    {...bindPrivate} />
                <label htmlFor="checkboxIsPrivate" className="form-check-label text-danger">
                    Private
        </label>
                <small className="form-text text-muted text-danger">Warning! no one will be able to view, like or favorite your randomizer if it is private. You can change this later.</small>
            </div>
            <Button type="submit" className="btn btn-success btn-lg btn-block mt-4"
                loading={loading}>{submitText}</Button>
        </form >
    );
}
