import React, { useCallback, useState } from "react";
import { Modal } from "react-bootstrap";
import { useInput } from "../../../Hooks/formInput";
import PickerSelector from "./PickerSelector";

export default function AddFieldModal({ showing, toggle, onConfirm }) {

    const [name, bindName] = useInput();
    const [parser, setParser] = useState(null);

    const onPickerDataChange = useCallback(parserObject => {
        setParser(parserObject);
    }, []);

    const onConfirmClicked = useCallback(() => {
        toggle(false);
        onConfirm(name, parser);
    }, [onConfirm, toggle, parser, name]);

    return (
        <Modal show={showing} onHide={toggle}>
            <Modal.Header>
                <h1>Add New Field</h1>
            </Modal.Header>
            <Modal.Body>
                <input type="text" className="form-control" placeholder="Field Name" {...bindName} />
                 <PickerSelector
                    onChange={onPickerDataChange} />
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-outline-secondary" onClick={() => toggle(false)}>Cancel</button>
                <button className="btn btn-success" onClick={onConfirmClicked}>Confirm</button>
            </Modal.Footer>
        </Modal >
    );
}
