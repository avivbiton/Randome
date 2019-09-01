import React, { useCallback, useMemo, useEffect } from "react";
import { useInput } from "../../../Hooks/formInput";
import { BasicParserCreator } from "./BasicParserCreator";
import MinMaxParserCreator from "./MinMaxParserCreator";
import MultiPickerCreator from "./MultiPickerCreator";
import { convertTypeToName } from "../../../utils";

export default function PickerSelector({ defaultParser = null, onChange }) {

    const [selected, bindSelected, setSelected] = useInput("Basic Picker");

    useEffect(() => {
        if (defaultParser == null) return;
        setSelected(convertTypeToName(defaultParser));
    }, [defaultParser, setSelected]);

    const MapNameToComponent = useMemo(() => ({
        "Basic Picker": BasicParserCreator,
        "Min-Max Picker": MinMaxParserCreator,
        "Multi Picker": MultiPickerCreator
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