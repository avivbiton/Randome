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
                <div className="row mt-2">
                    <div className="col-6">
                        <button className="btn btn-primary btn-block" onClick={() => toggle(false)}>Nevermind</button>
                    </div>
                    <div className="col-6">
                        <button className="btn btn-outline-danger btn-block" onClick={() => deleteRandomizer()}>Delete</button>
                    </div>
                </div>
            </Modal.Body>
        </Modal >
    );
}
