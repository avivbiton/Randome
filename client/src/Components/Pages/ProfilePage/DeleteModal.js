import React, { useCallback } from "react";
import { Modal } from "react-bootstrap";
import api from "../../../API/api";
import toastr from "toastr";
import { toastrDefault } from "../../../config";

export default function DeleteModal({ showing, toggle, onDelete, data }) {


    const deleteRandomizer = useCallback(() => {
        async function remove() {
            try {
                onDelete(data.id);
                toggle(false);
                await api.randomizers.deleteRandomizer(data.id);
            } catch (error) {
                toastr.error("Could not delete. Please try again later.", "Error", toastrDefault);
            }
        }
        remove();
    }, [data, onDelete, toggle]);

    return (
        <Modal show={showing} onHide={toggle}>
            <Modal.Body style={{ fontSize: "150%" }}>
                Delete <span className="font-weight-bold">{data ? data.name : ""}?</span>
                <br />This can not be un-done in anyway!
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-outline-primary" onClick={() => toggle(false)}>Nevermind</button>
                <button className="btn btn-danger" onClick={() => deleteRandomizer()}>Delete</button>
            </Modal.Footer>
        </Modal >
    );
}
