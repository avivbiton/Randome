import React, { useState, useCallback } from "react";
import { Modal } from "react-bootstrap";
import PickerSelector from "./PickerSelector";

export default function PropertyModal({ showing, toggle, data, onConfirm, }) {

    const [parser, setParser] = useState(null);

    const onPickerDataChange = useCallback(parserObject => {
        setParser(parserObject);
    }, []);

    const onConfirmClicked = useCallback(() => {
        toggle(false);
        onConfirm(parser, data);
    }, [onConfirm, toggle, parser, data]);


    if (!data) return <div></div>
    return (
        <Modal show={showing} onHide={toggle}>
            <Modal.Header>
                <h1>{data.title}</h1>
            </Modal.Header>
            <Modal.Body>
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
