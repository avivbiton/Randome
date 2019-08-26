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
    const [blockLeave, setBlockLeave] = useState(true);

    async function onFormSubmit({ name, description, schema, isPrivate }) {
        try {
            setLoading(true);
            await API.randomizers.create(name, description, schema, isPrivate);
            setBlockLeave(false);
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
                    <p className="lead">Welcome to the creation process. You can use our built-in Editor to create your own Randomizer!
                    If it is your first time, it is recommended that you will go over our short tutorial.
                    C.</p>
                    <button type="button" className="btn btn-outline-primary mb-2" onClick={() => feedSampleData()}>Feed sample data</button>
                </div>
                <div className="col-md-6">
                    <img src={HammerImage} alt="hammer" className="d-none d-md-block h-75 w-75" />
                </div>
            </div>
            <div className="border p-4 shadow mb-4">
                <RandomizerForm onSubmit={onFormSubmit} errors={errors} submitText="Create" loading={isLoading} blockLeave={blockLeave} />
            </div>
        </div>
    );
}


export default withRouter(CreatePage);