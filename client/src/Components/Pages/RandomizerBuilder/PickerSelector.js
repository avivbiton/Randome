import React, { useCallback, useMemo, useEffect } from "react";
import { useInput } from "../../../Hooks/formInput";
import { BasicParserCreator } from "./BasicParserCreator";
import { ContentGenerator } from "randomcontentgenerator";

function convertTypeToName(field) {
    const name = new ContentGenerator().findParser(field).constructor.name;
    switch (name) {
        case "BasicParser":
            return "Basic Picker";
        case "MinMaxParser":
            return "Min-Max Picker";
        case "MultiPickerParser":
            return "Multi Picker";
        default: throw new Error("Invalid parser");
    }
}

export default function PickerSelector({ defaultParser = null, onChange }) {

    const [selected, bindSelected, setSelected] = useInput("Basic Picker");

    useEffect(() => {
        if (defaultParser == null) return;
        setSelected(convertTypeToName(defaultParser));
    }, [defaultParser, setSelected]);

    const MapNameToComponent = useMemo(() => ({
        "Basic Picker": BasicParserCreator,
        "Min-Max Picker": MinMaxParserCreator,
        "Multi Picker": MultiParserCreator
    }), []);

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
                populateFieldObject={defaultParser}
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

