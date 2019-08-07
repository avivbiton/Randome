import React, { useEffect, useState } from "react";
import "./RandomizerPage.css";
import { withRouter } from "react-router-dom";
import { ContentGenerator } from "randomcontentgenerator";
import randomizerAPI from "../../../API/randomizerAPI";
import ResultDisplayer from "./ResultDisplayer";
import API from "../../../API/api";

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

    async function onLikePressed() {
        try {
            const increase = await API.randomizers.likeRandomizer(match.params.id);
            const newRandomizer = currentRandomizer;
            if (increase) {
                newRandomizer.meta.likes += 1;
            } else {
                newRandomizer.meta.likes -= 1;
            }
            console.log(newRandomizer);

            //CONTINUE: Fix this
            setRandomizer(newRandomizer);
        } catch (error) {
            //tODO: display error popup
        }

    }

    if (currentRandomizer === null) return <Loading />;
    return (
        <div className="container">
            <div className="row">
                <div className="col text-center">
                    <h1 className="display-3">{currentRandomizer.name}</h1>
                    <div className="d-inline-flex align-items-center">

                        <button className="btn shadow-sm px-4 btn-outline-info" onClick={onLikePressed}>
                            <i className="far fa-thumbs-up mr-1"></i> {currentRandomizer.meta.likes}
                        </button>
                        <button className="btn shadow-sm px-4 btn-outline-softRed ml-4">
                            <i className="far fa-heart mr-1"></i> {currentRandomizer.meta.favorites}
                        </button>
                    </div>

                    <p className="lead">{currentRandomizer.description}</p>
                    <button className="btn btn-primary btn-lg" onClick={() => onRollClicked()}>Roll the Dice</button>

                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <ResultDisplayer result={currentResult} />
                </div>
            </div>
        </div >
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