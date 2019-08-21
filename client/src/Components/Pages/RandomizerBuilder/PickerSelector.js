import React, { useEffect, useCallback, useMemo } from "react";
import { useInput } from "../../../Hooks/formInput";
import { BasicParserCreator } from "./BasicParserCreator";



export default function PickerSelector({ onChange }) {

    const MapNameToComponent = useMemo(() => ({
        "Basic Picker": BasicParserCreator,
        "Min-Max Picker": MinMaxParserCreator,
        "Multi Picker": MultiParserCreator
    }), []);
    const [selected, bindSelected] = useInput("Basic Picker");
    const CreatorComponent = useMemo(() => MapNameToComponent[selected], [MapNameToComponent, selected]);

    const onPickerUpdate = useCallback(parser => {
        onChange(parser);
    }, [onChange]);

    return (
        <div className="form-group">
            <select className="form-control mt-2" {...bindSelected}>
                <option>Basic Picker</option>
                <option>Min-Max Picker</option>
                <option>Multi Picker</option>
            </select>
            <CreatorComponent
                onUpdate={onPickerUpdate} />
        </div>
    );
}



function MinMaxParserCreator({ onUpdate }) {
    return (
        <div>
            <h1>MinMax Parser</h1>
        </div>
    );
}

function MultiParserCreator({ onUpdate }) {
    return (
        <div>
            <h1>Multi Parser</h1>
        </div>
    );
}

