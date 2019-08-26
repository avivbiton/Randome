import React, { useState, useEffect, useCallback } from "react";
import { MultiPicker } from "../../../SchemaBuilder/multiPicker";

export default function MultiPickerCreator({ onUpdate, populateFieldObject }) {

    const [field, setField] = useState([[""]]);

    useEffect(() => {
        if (populateFieldObject) {
            setField(populateFieldObject.options);
        }
    }, [populateFieldObject]);

    useEffect(() => {
        onUpdate(new MultiPicker(field));
    }, [field, onUpdate]);

    const onTextChange = useCallback((arrayIndex, secondArrayIndex, text) => {
        field[arrayIndex][secondArrayIndex] = text;
        setField([...field]);
    }, [field]);

    const onDelete = useCallback((arrayIndex, secondArrayIndex) => {
        field[arrayIndex].splice(secondArrayIndex, 1);
        setField([...field]);
    }, [field]);

    const onAdd = useCallback(index => {
        field[index] = [...field[index], ""];
        setField([...field]);
    }, [field]);

    const onAddPicker = useCallback(() => {
        setField([...field, [""]]);
    }, [field]);

    const onRemovePicker = useCallback(index => {
        field.splice(index, 1);
        setField([...field]);
    }, [field]);

    return (
        <div className="mt-4">
            <h5>Multi Picker</h5>
            <p className="text-muted">
                Picks one line from each picker below and combine them together.
            </p>
            <div className="accordion" id="pickerAccordion">

                {field.map((i, key) => <SubArrayMap
                    key={key}
                    index={key}
                    array={i}
                    onChangeEvent={onTextChange}
                    onDeleteEvent={onDelete}
                    onAddEvent={onAdd}
                    onPickerDeleteEvent={onRemovePicker}
                />)}

            </div>
            <div className="row mt-4">
                <div className="col-8"></div>
                <div className="col-4">
                    <button className="btn btn-outline-success"
                        onClick={onAddPicker}>
                            Add Picker <i className="fas fa-plus fa-lg" />
                    </button>

                </div>
            </div>

        </div>
    );
}

function SubArrayMap({ index, array, onChangeEvent, onDeleteEvent, onAddEvent, onPickerDeleteEvent }) {
    return (
        <div className="card">
            <div className="card-header">
                <h2>
                    <button className="btn btn-link" type="button"
                        data-toggle="collapse"
                        data-target={`#collapseId${index}`}
                        aria-expanded="true"
                        aria-controls={`collapseId${index}`}>
                        Picker Number #{index}
                    </button>
                    <button title="Delete" className="btn far fa-trash-alt icon-button"
                        onClick={() => onPickerDeleteEvent(index)} />
                </h2>
            </div>

            <div className="collapse show" id={`collapseId${index}`} data-parent="#pickerAccordion">
                <div className="card-body">
                    {
                        array.map((i, key) => <OptionRow
                            key={key}
                            index={key}
                            text={i}
                            onTextChange={(text, secondIndex) => onChangeEvent(index, secondIndex, text)}
                            onDelete={secondIndex => onDeleteEvent(index, secondIndex)}
                        />)
                    }
                    <div className="row">
                        <div className="col-10"></div>
                        <div className="col-2">
                            <button className="btn fas fa-plus icon-button"
                                onClick={() => onAddEvent(index)} style={{ fontWeight: "900" }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
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