import React, { useState, useCallback } from "react";
import { Modal } from "react-bootstrap";
import PickerSelector from "./PickerSelector";

export default function AddGlobalModal({ showing, toggle, onConfirm }) {

    const [parser, setParser] = useState(null);

    const onPickerDataChange = useCallback(parserObject => {
        setParser(parserObject);
    }, []);

    const onConfirmClicked = useCallback(() => {
        toggle(false);
        onConfirm(parser);
    }, [onConfirm, toggle, parser]);

    return (
        <Modal show={showing} onHide={toggle}>
            <Modal.Header>
                <h1>Add Global Property</h1>
            </Modal.Header>
            <Modal.Body>
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
