import React, { useEffect, useState, useCallback } from "react";
import { ContentGenerator } from "randomcontentgenerator";
import randomizerAPI from "../../../API/randomizerAPI";
import ResultDisplayer from "./ResultDisplayer";
import LikeAndFavoriteCounter from "./LikeAndFavoriteCounter";
import { useSpring, animated } from "react-spring";
import useReactRouter from "use-react-router";
import { useCheckbox } from "../../../Hooks/formInput";
import RandomizerIsPrivate from "./RandomizerIsPrivate";
import Checkbox from "../../Form/Checkbox";

function RandomizerPage() {

    const { match, history } = useReactRouter();
    const [currentRandomizer, setRandomizer] = useState(null);
    const [currentResult, setResult] = useState(null);
    const { value: skipAnimation, bind: bindSkipAnimation } = useCheckbox(false);
    const [fading, setFading] = useState(true);
    const fadeAnimation = useSpring({
        from: { opacity: fading ? 1 : 0 },
        opacity: fading ? 0 : 1,
        config: { duration: 500 },
        onRest: () => {
            if (fading && currentResult !== null) {
                setFading(false);
                onAnimationFinished();
            }
        }
    });

    const [error, setError] = useState({});

    useEffect(() => {
        async function fetchRandomizerData() {
            const id = match.params.id;
            try {
                const randomizer = await randomizerAPI.fetchRandomizer(id);
                if (!randomizer) return history.push("/not-found");
                setRandomizer(randomizer);
            } catch (requestError) {
                const privateError = requestError.data.private;
                if (privateError) {
                    setError({ private: privateError })
                    return;
                }

                history.push("/not-found");
            }
        }
        fetchRandomizerData();
    }, [match.params.id, history]);

    const onAnimationFinished = useCallback(() => {
        setResult(generateSchemaResult(currentRandomizer.jsonSchema));
    }, [currentRandomizer]);

    const onRollClicked = useCallback(() => {
        if (currentResult === null || skipAnimation) {
            return onAnimationFinished();
        }
        if (fading) return;
        setFading(!fading);
    }, [currentResult, fading, onAnimationFinished, skipAnimation]);


    if (error.private) return <RandomizerIsPrivate />

    if (currentRandomizer === null) return <Loading />;
    return (
        <div className="container">
            <div className="row">
                <div className="col text-center">
                    <h1 className="display-3">{currentRandomizer.name}</h1>
                    <LikeAndFavoriteCounter
                        id={match.params.id}
                        likeCount={currentRandomizer.meta.likes}
                        favoriteCount={currentRandomizer.meta.favorites} />
                    <p className="lead text-break">{currentRandomizer.description}</p>
                    {currentRandomizer.private === true ?
                        <p className="text-danger">You've set this to be private. Only you can view this page.</p>
                        : null
                    }
                    <Checkbox
                        id="checkboxSkipForAnim"
                        label="Skip Animation"
                        {...bindSkipAnimation}
                    />
                    <button className="btn btn-primary btn-lg" onClick={() => onRollClicked()}>
                        Roll the Dice<i className="fas fa-dice ml-2" />
                    </button>

                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <animated.div style={fadeAnimation}>
                        <ResultDisplayer result={currentResult} />
                    </animated.div>
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



export default RandomizerPage;