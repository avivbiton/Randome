import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import HammerImage from "../../Images/hammer.png";
import { useInput, useCheckbox } from "../../Hooks/formInput";
import API from "../../API/api";
import toastr from "toastr";
import { toastrDefault } from "../../config";

import Input from "../Form/Input";
import Button from "../Form/Button";
import Textarea from "../Form/Textarea";

function CreatePage({ history }) {

    const [name, bindName] = useInput("");
    const [description, bindDescription] = useInput("");
    const [schema, bindSchema] = useInput("");
    const { value: isPrivate, bind: bindPrivate } = useCheckbox();

    const [errors, setErrors] = useState({});
    const [isLoading, setLoading] = useState(false);

    async function onFormSubmit() {
        try {
            setLoading(true);
            await API.randomizers.create(name, description, schema, isPrivate);
            history.push("/profile");
        } catch (error) {
            setLoading(false);
            if (error.data.serverError) {
                toastr.error(error.data.serverError, "Error", toastrDefault);
                return;
            }
            setErrors(error.data);

        }
    }

    function feedSampleData() {
        // TODO: Add sample json data
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <h3 className="">Creation Screen</h3>
                    <p className="lead">Welcome to the creation process. We're currently working on a visual creator but for now you will have to use a format called JSON to create your very own randomizer.
                    Please read over the <a href="https://github.com/avivbiton/RandomContentGenerator/wiki" target="_blank" rel="noopener noreferrer">docs</a> or visit our FAQ section.
                    If you still have a question, please feel free to contact us.</p>
                    <button type="button" className="btn btn-outline-primary mb-2" onClick={() => feedSampleData()}>Feed sample data</button>
                </div>
                <div className="col-md-6">
                    <img src={HammerImage} alt="hammer" className="d-none d-md-block h-75 w-75" />
                </div>
            </div>
            <div className="border p-4 shadow mb-4">
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
                <Button type="button" className="btn btn-success btn-lg btn-block mt-4"
                    loading={isLoading} onClick={() => onFormSubmit()}>Create</Button>
            </div>
        </div>
    );
}


export default withRouter(CreatePage);