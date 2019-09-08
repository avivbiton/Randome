import React, { useState, useEffect, useCallback } from "react";
import useReactRouter from "use-react-router";
import api from "../../API/api";
import toastr from "toastr";
import { toastrDefault } from "../../config";
import LoadingSpinner from "../LoadingSpinner";
import RandomizerForm from "../RandomizerForm";
import useAPI from "../../Hooks/useAPI";

export default function EditRandomizer() {
    const { match, history } = useReactRouter();

    const [randomizer, setRandomizer] = useState(null);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [blockLeave, setBlockLeave] = useState(true);
    const [fetch, cancelFetch] = useAPI();

    const fetchRandomizerData = useCallback(() => {
        async function fetchRandomizer() {
            try {
                const data = await api.randomizers.fetchRandomizer(match.params.id);
                setRandomizer(data);
            } catch (error) {
                history.push("/not-found");
            }
        };
        fetchRandomizer();
    }, [match.params.id, history]);

    useEffect(() => {
        async function verifyOwner() {
            return new Promise((resolve, reject) => {
                fetch(api.randomizers.fetchMyRandomizers(),
                    data => {
                        // eslint-disable-next-line eqeqeq
                        if (data.findIndex(e => e._id == match.params.id) === -1) {
                            return resolve(false);
                        }
                        return resolve(true);
                    }, () => {
                        resolve(false);
                    });
            });
        };
        verifyOwner().then(isOwner => {
            if (isOwner) {
                fetchRandomizerData();
            } else {
                history.push("/");
            }
        });

        return () => cancelFetch();
    }, [fetchRandomizerData, match.params.id, history, fetch, cancelFetch]);


    const onEditSubmit = useCallback(({ name, description, isPrivate, schema }) => {
        async function edit() {
            try {
                setLoading(true);
                await api.randomizers.editRandomizer(match.params.id, name, description, isPrivate, schema);
                toastr.success("Your randomizer has been updated.", "Success", toastrDefault);
                setErrors({});
                setBlockLeave(false);
            } catch (error) {
                setErrors(error.data);
            }
            setLoading(false);

        };
        edit();
    }, [match.params.id]);

    if (randomizer === null) return <div className="d-flex justify-content-center"><LoadingSpinner size="lg" animation="grow" /></div>
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>Editing - {randomizer.name}</h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <RandomizerForm
                        inital={randomizer}
                        onSubmit={onEditSubmit}
                        errors={errors}
                        submitText="Update"
                        loading={loading}
                        blockLeave={blockLeave} />
                </div>
            </div>
        </div>
    );
}


