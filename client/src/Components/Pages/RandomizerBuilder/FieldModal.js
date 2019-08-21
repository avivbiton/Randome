import React, { useEffect, useCallback, useState } from "react";
import { Modal } from "react-bootstrap";
import { useInput } from "../../../Hooks/formInput";
import PickerSelector from "./PickerSelector";
import Input from "../../Form/Input";
import { Builder } from "../../../config";

export default function FieldModal({ showing, toggle, data, onConfirm, onEdit }) {

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

    const onPickerDataChange = useCallback(parserObject => {
        setParser(parserObject);
    }, []);

    const onConfirmClicked = useCallback(() => {
        if (name === "") {
            setErrors({ name: "Field Name can not be empty" })
            return;
        }

        toggle(false);
        if (data.mode === Builder.ModalMode.ADD) {
            onConfirm(name, parser);
        } else if (data.mode === Builder.ModalMode.EDIT) {
            onEdit(data.oldName, name, parser);
        }
    }, [onConfirm, toggle, parser, name, onEdit, data]);

    if(!data) return <div></div>

    return (
        <Modal show={showing} onHide={toggle}>
            <Modal.Header>
                <h1>{data.mode === Builder.ModalMode.ADD ? "Add New" : "Edit" } Field</h1>
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
