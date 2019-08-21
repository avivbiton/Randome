import React, { useEffect, useState, useCallback } from "react";
import { Picker } from "../../../SchemaBuilder/basicPicker";


export function BasicParserCreator({ onUpdate, populateFieldObject }) {

    const [optionsArray, setOptionsArray] = useState([""]);

    useEffect(() => {
        if (populateFieldObject) {
            setOptionsArray([...populateFieldObject.text]);
        }
    }, [populateFieldObject]);

    const onTextChange = useCallback((text, index) => {
        optionsArray[index] = text;
        setOptionsArray([...optionsArray]);
        onUpdate(new Picker(optionsArray));
    }, [optionsArray, onUpdate]);


    const onDeletePressed = useCallback((index) => {
        optionsArray.splice(index, 1);
        setOptionsArray([...optionsArray]);
        onUpdate(new Picker(optionsArray));
    }, [optionsArray, onUpdate]);

    const onPlusButtonClicked = useCallback(() => {
        setOptionsArray([...optionsArray, ""]);
    }, [optionsArray]);

    return (<div className="mt-4">
        <h5>Basic Picker</h5>
        <p className="text-muted">
            Randomly picks one of the text fields below. You can add as many text fields as you would like.
            </p>
        {optionsArray.map((i, key) => <OptionRow
            key={key}
            index={key}
            text={i}
            onTextChange={onTextChange}
            onDelete={onDeletePressed}
        />)}
        <div className="row">
            <div className="col-10"></div>
            <div className="col-2">
                <button className="btn fas fa-plus icon-button" onClick={onPlusButtonClicked} style={{ fontWeight: "900" }} />
            </div>
        </div>
    </div>);
}

function OptionRow({ index, onTextChange, onDelete, text }) {
    return (<div className="form-group row">
        <div className="col-10">
            <input type="text" className="form-control" value={text} onChange={e => onTextChange(e.target.value, index)} />
        </div>
        <div className="col-2">
            <button title="Delete" onClick={() => onDelete(index)} className="btn far fa-trash-alt icon-button" />
        </div>
    </div>
    );
}
