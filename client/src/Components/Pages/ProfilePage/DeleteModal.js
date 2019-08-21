import React, { useState, useEffect, useCallback } from "react";
import { Modal } from "react-bootstrap";
import api from "../../../API/api";
import toastr from "toastr";
import { toastrDefault } from "../../../config";

export default function DeleteModal({ showing, toggle, onDelete, modalData }) {


    const deleteRandomizer = useCallback(() => {
        async function remove() {
            try {
                onDelete(modalData.id);
                toggle(false);
                await api.randomizers.deleteRandomizer(modalData.id);
            } catch (error) {
                toastr.error("Could not delete. Please try again later.", "Error", toastrDefault);
            }
        }
        remove();
    }, [modalData, onDelete, toggle]);

    return (
        <Modal show={showing} onHide={toggle}>
            <Modal.Body style={{ fontSize: "150%" }}>
                Delete <span className="font-weight-bold">{modalData ? modalData.name : ""}?</span>
                <br />This can not be un-done in anyway!
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-outline-primary" onClick={() => toggle(false)}>Nevermind</button>
                <button className="btn btn-danger" onClick={() => deleteRandomizer()}>Delete</button>
            </Modal.Footer>
        </Modal >
    );
}
