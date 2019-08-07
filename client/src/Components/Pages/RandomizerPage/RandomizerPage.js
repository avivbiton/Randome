import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { ContentGenerator } from "randomcontentgenerator";
import randomizerAPI from "../../../API/randomizerAPI";
import ResultDisplayer from "./ResultDisplayer";

function RandomizerPage({ match, history }) {

    const [currentRandomizer, setRandomizer] = useState(null);
    const [currentResult, setResult] = useState(null);

    useEffect(() => {
        async function fetchRandomizerData() {
            const id = match.params.id;
            try {
                const randomizer = await randomizerAPI.fetchRandomizer(id);
                if (!randomizer) return history.push("/not-found");
                setRandomizer(randomizer);
            } catch (error) {
                history.push("/not-found");
            }
        }
        fetchRandomizerData();
    }, [match.params.id, history]);

    function onRollClicked() {
        setResult(generateSchemaResult(currentRandomizer.jsonSchema));
    }

    if (currentRandomizer === null) return <Loading />;
    return (
        <div className="container">
            <div className="row">
                <div className="col text-center">
                    <h1 className="display-3">{currentRandomizer.name}</h1>
                    <p className="lead">{currentRandomizer.description}</p>
                    <button className="btn btn-primary btn-lg" onClick={() => onRollClicked()}>Roll the Dice</button>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <ResultDisplayer result={currentResult} />
                </div>
            </div>
        </div>
    );
}


function generateSchemaResult(schema) {
    const contentGenerator = new ContentGenerator(JSON.parse(schema));
    return contentGenerator.build();
}

function Loading() {
    return (
        <div className="container text-center">
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}



export default withRouter(RandomizerPage);