import React, { useEffect } from "react";
import { useNumericInput } from "../../../Hooks/formInput";
import { MinMaxPicker } from "../../../SchemaBuilder/minMaxPicker";

export default function MinMaxParserCreator({ onUpdate, populateFieldObject }) {

    const [min, bindMin, setMin] = useNumericInput();
    const [max, bindMax, setMax] = useNumericInput();

    useEffect(() => {
        if (populateFieldObject) {
            setMin(populateFieldObject.min);
            setMax(populateFieldObject.max);
        }
    }, [populateFieldObject, setMin, setMax]);

    useEffect(() => {
        onUpdate(new MinMaxPicker(parseInt(min), parseInt(max)));
    }, [min, max, onUpdate]);

    return (
        <div className="mt-4">
            <h5>Min-Max Picker</h5>
            <p className="text-muted">
                Picks a random number between Min (inclusive) and Max (exclusive)
            </p>
            <div className="form-group row">
                <div className="col-2 font-weight-bold mr-4">
                    Minimum:
                </div>
                <div className="col-5">
                    <input type="number" className="form-control" {...bindMin} />
                </div>
            </div>
            <div className="form-group row">
                <div className="col-2 font-weight-bold mr-4">
                    Maximum:
                </div>
                <div className="col-5">
                    <input type="number" className="form-control" {...bindMax} />
                </div>
            </div>

        </div>
    );
}

