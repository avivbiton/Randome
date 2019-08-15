import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import HammerImage from "../../Images/hammer.png";
import API from "../../API/api";
import toastr from "toastr";
import { toastrDefault } from "../../config";

import RandomizerForm from "../RandomizerForm";

function CreatePage({ history }) {

    const [errors, setErrors] = useState({});
    const [isLoading, setLoading] = useState(false);

    async function onFormSubmit(name, description, schema, isPrivate) {
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
               <RandomizerForm onSubmit={onFormSubmit} errors={errors} submitText="Create" loading={isLoading} />
            </div>
        </div>
    );
}


export default withRouter(CreatePage);