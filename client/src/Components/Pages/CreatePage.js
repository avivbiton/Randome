import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import API from "../../API/randomizerAPI";
import toastr from "toastr";
import { toastrDefault } from "../../config";
import sampleSchema from "../../sampleSchema.json";
import useReactRouter from "use-react-router";
import RandomizerForm from "../RandomizerForm";
import { SchemaSnapshot } from "../../SchemaBuilder/schemaSnapshot";
import { updateSnapshotHistory } from "../../redux/Actions/snapshotActions";
import useAPI from "../../Hooks/useAPI";

function CreatePage() {

    const { history } = useReactRouter();
    const [call] = useAPI()

    const [errors, setErrors] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [blockLeave, setBlockLeave] = useState(true);
    const dispatch = useDispatch();



    const onFormSubmit = useCallback(function ({ name, description, schema, isPrivate }) {
        setLoading(true);
        call(API.create(name, description, schema, isPrivate),
            function onResolve() {
                setBlockLeave(false);
                history.push("/profile");
            },
            function onError(error, status) {
                setLoading(false);
                if (status === 500) {
                    toastr.error("Sorry, something happend. Try again later.", "Internal Server Error", toastrDefault);
                    return;
                }
                setErrors(error);
            });
    }, [history, call]);

    const feedSampleData = () => {
        const snapshot = new SchemaSnapshot();
        snapshot.set(sampleSchema);
        dispatch(updateSnapshotHistory(sampleSchema, false));
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