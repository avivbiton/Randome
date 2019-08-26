import React, { useEffect, useState, useCallback, useRef } from "react";
import { Picker } from "../../../SchemaBuilder/basicPicker";
import useFocus from "../../../Hooks/useFocus";


export function BasicParserCreator({ onUpdate, populateFieldObject }) {

    const [optionsArray, setOptionsArray] = useState([""]);
    const latestInput = useRef();
    const focusLatest = useFocus(latestInput);

    useEffect(() => {
        if (populateFieldObject && populateFieldObject.text) {
            setOptionsArray([...populateFieldObject.text]);
        }
    }, [populateFieldObject]);

    useEffect(() => {
        onUpdate(new Picker([]));
    }, [onUpdate]);

    const onTextChange = useCallback((text, index) => {
        optionsArray[index] = text;
        setOptionsArray([...optionsArray]);
    }, [optionsArray]);

    useEffect(() => {
        onUpdate(new Picker(optionsArray));
    }, [onUpdate, optionsArray]);

    const onDeletePressed = useCallback((index) => {
        optionsArray.splice(index, 1);
        setOptionsArray([...optionsArray]);
        onUpdate(new Picker(optionsArray));
    }, [optionsArray, onUpdate]);

    const onPlusButtonClicked = useCallback(() => {
        setOptionsArray([...optionsArray, ""]);
        focusLatest();
    }, [optionsArray, focusLatest]);


    return (
        <div className="mt-4">
            <h5>Basic Picker</h5>
            <p className="text-muted">
                Randomly picks one of the text fields below. You can add as many text fields as you would like.
            </p>
            <form onSubmit={e => {
                e.preventDefault();
            }}>
                {optionsArray.map((i, key) => <OptionRow
                    key={key}
                    index={key}
                    text={i}
                    onTextChange={onTextChange}
                    onDelete={onDeletePressed}
                    ref={latestInput}
                />)}

                <div className="row">
                    <div className="col-10"></div>
                    <div className="col-2">
                        <button type="submit" className="btn fas fa-plus icon-button"
                            onClick={onPlusButtonClicked} style={{ fontWeight: "900" }} />
                    </div>
                </div>
            </form>
        </div>
    );
}

const OptionRow = React.forwardRef(({ index, onTextChange, onDelete, text }, ref) => {
    return (
        <div className="form-group row">
            <div className="col-10">
                <input type="text" ref={ref} className="form-control" value={text} onChange={e => onTextChange(e.target.value, index)} />
            </div>
            <div className="col-2">
                <button type="button" title="Delete" onClick={() => onDelete(index)} className="btn far fa-trash-alt icon-button" />
            </div>
        </div>
    );
});
