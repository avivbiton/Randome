import React, { useState, useEffect, useCallback} from "react";
import useReactRouter from "use-react-router";
import api from "../../API/api";

export default function EditRandomizer() {
    const { match, history } = useReactRouter();

    const [randomizer, setRandomizer] = useState(null);

    useEffect(() => {

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

    console.log(randomizer);
    return (
        <div className="container">
            
        </div>
    );
}
