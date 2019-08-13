import React, { useState, useEffect, useCallback } from "react";
import { Modal } from "react-bootstrap";
import api from "../../../API/api";
import toastr from "toastr";
import { toastrDefault } from "../../../config";

export default function DeleteModal({ setTrigger, onDelete }) {

    const [show, setShow] = useState(false);
    const [id, setId] = useState(null);

    const handleShow = useCallback((appear) => {
        setShow(appear);
    }, [setShow]);

    const triggerModal = useCallback(id => {
        return function (id) {
            console.log(id);
            setId(id);
            handleShow(true);
        }

    }, [handleShow]);

    useEffect(() => {
        setTrigger(triggerModal);
    }, [triggerModal, setTrigger])


    const deleteRandomizer = useCallback(() => {
        async function remove() {
            try {
                onDelete(id);
                handleShow(false);
                await api.randomizers.deleteRandomizer(id);
            } catch (error) {
                toastr.error("Could not delete. Please try again later.", "Error", toastrDefault);
            }
        }
        remove();
    }, [id, onDelete, handleShow]);

    return (
        <Modal show={show} onHide={handleShow}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Randomizer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete this randomizer? This can not be un-done in anyway!
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-outline-primary" onClick={() => handleShow(false)}>Nevermind</button>
                <button className="btn btn-danger" onClick={() => deleteRandomizer()}>Delete</button>
            </Modal.Footer>
        </Modal >
    );
}
