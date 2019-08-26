import React, { useEffect, useCallback, useState } from "react";
import { Modal } from "react-bootstrap";
import { useInput } from "../../../Hooks/formInput";
import PickerSelector from "./PickerSelector";
import Input from "../../Form/Input";

export default function FieldModal({ showing, toggle, data, onConfirm }) {

    const [name, bindName, setName] = useInput();
    const [errors, setErrors] = useState({});
    const [parser, setParser] = useState(null);

    useEffect(() => {
        if (data !== null && data.oldName) {
            setName(data.oldName)
        } else {
            setName("");
        }
    }, [showing, setName, data]);

    useEffect(() => setErrors({}), [showing]);


    const onPickerDataChange = useCallback(parserObject => {
        setParser(parserObject);
    }, []);

    const onConfirmClicked = useCallback(() => {
        if (name === "") {
            setErrors({ name: "Field Name can not be empty" })

        } else {
            toggle(false);
            onConfirm(name, parser, data);
        }
    }, [onConfirm, toggle, parser, name, data]);

    if (!data) return <div></div>

    return (
        <Modal show={showing} onHide={toggle}>
            <Modal.Header>
                <h1>{data.title}</h1>
            </Modal.Header>
            <Modal.Body>
                <Input type="text" className="form-control" placeholder="Field Name" {...bindName}
                    error={errors.name} />
                <PickerSelector
                    defaultParser={data.fieldObject}
                    onChange={onPickerDataChange} />
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-outline-secondary" onClick={() => toggle(false)}>Cancel</button>
                <button className="btn btn-success" onClick={onConfirmClicked}>Confirm</button>
            </Modal.Footer>
        </Modal >
    );
}
