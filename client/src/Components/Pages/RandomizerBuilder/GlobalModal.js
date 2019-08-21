import React, { useState, useCallback } from "react";
import { Modal } from "react-bootstrap";
import PickerSelector from "./PickerSelector";
import { Builder } from "../../../config";

export default function GlobalModal({ showing, toggle, data, onConfirm, onEdit }) {

    const [parser, setParser] = useState(null);

    const onPickerDataChange = useCallback(parserObject => {
        setParser(parserObject);
    }, []);

    const onConfirmClicked = useCallback(() => {
        toggle(false);
        if (data.mode === Builder.ModalMode.ADD) {
            onConfirm(parser);
        }
        else if (data.mode === Builder.ModalMode.EDIT) {
            onEdit(parser);
        }

    }, [onConfirm, toggle, parser, data, onEdit]);

    return (
        <Modal show={showing} onHide={toggle}>
            <Modal.Header>
                <h1>Add Global Property</h1>
            </Modal.Header>
            <Modal.Body>
                <PickerSelector
                    initialValues={data}
                    onChange={onPickerDataChange} />
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-outline-secondary" onClick={() => toggle(false)}>Cancel</button>
                <button className="btn btn-success" onClick={onConfirmClicked}>Confirm</button>
            </Modal.Footer>
        </Modal >
    );
}
