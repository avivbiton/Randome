import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import API from "../../API/api";
import toastr from "toastr";
import { toastrDefault } from "../../config";
import sampleSchema from "../../sampleSchema.json";
import useReactRouter from "use-react-router";
import RandomizerForm from "../RandomizerForm";
import { UPDATE_SNAPSHOT_HISTORY } from "./RandomizerBuilder/snapshotReducer";
import { SchemaSnapshot } from "../../SchemaBuilder/schemaSnapshot";

function CreatePage() {

    const { history } = useReactRouter();

    const [errors, setErrors] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [blockLeave, setBlockLeave] = useState(true);
    const dispatch = useDispatch();



    const onFormSubmit = useCallback(async function ({ name, description, schema, isPrivate }) {
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
    }, [history]);

    const feedSampleData = () => {
        const snapshot = new SchemaSnapshot();
        snapshot.set(sampleSchema);
        dispatch({ type: UPDATE_SNAPSHOT_HISTORY, payload: snapshot });
    }

    return (
        <div className="container">
            <div className="text-center">
                <h1>Creation Page</h1>
                <p className="alert alert-primary" style={{ fontSize: "125%" }}>Welcome to the creation process. You can use our built-in Editor to create your own Randomizer!
                If it is your first time, it is recommended that you will go over our <Link to="/guide" target="_blank">short tutorial.</Link> You can also use the button below to pre-fill the editor with sample data to give you a feeling on how the editor work. Remember that you can also view your progress at the bottom of the page.</p>
                <button type="button" className="btn btn-outline-primary mb-2" onClick={() => feedSampleData()}>Feed sample data</button>
                <button className="btn btn-outline-secondary  ml-2 mb-2">
                    <Link className="text-reset" target="_blank" to="/guide">View Guide</Link>
                </button>
            </div>
            <div className="border p-4 shadow mb-4">
                <RandomizerForm
                    onSubmit={onFormSubmit}
                    errors={errors}
                    submitText="Create"
                    loading={isLoading}
                    blockLeave={blockLeave}

                />
            </div>
        </div>
    );
}


export default CreatePage;