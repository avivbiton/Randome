import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import BuildViewer from "./BuildViewer";
import useModal from "../../../Hooks/useModal";
import FieldModal from "./FieldModal";
import PropertyModal from "./PropertyModal";
import { Builder } from "../../../config";
import { INCREASE_INDEX, DECREASE_INDEX, ADD_FIELD, ADD_GLOBAL, EDIT_FIELD, EDIT_GLOBAL, ADD_PROPERTY } from "../../../redux/Reducers/snapshotReducer";

export default function RandomizerBuilder() {

    const snapshot = useSelector(state => state.snapshot);
    const dispatchSnapshot = useDispatch();

    const [toggleFieldModal, bindFieldModal] = useModal();
    const [togglePropertyModal, bindGlobalModal] = useModal();

    const onAddFieldClicked = useCallback(() => {
        toggleFieldModal(true, {
            mode: Builder.ModalMode.ADD,
            title: "Add New Field"
        });
    }, [toggleFieldModal]);

    const onAddGlobalClicked = useCallback(() => {
        togglePropertyModal(true, {
            mode: Builder.ModalMode.ADD,
            title: "Add Global Property"
        });
    }, [togglePropertyModal]);

    const addField = (name, parser) => {
        dispatchSnapshot({ type: ADD_FIELD, name, parser });
    };

    const addGlobal = parser => {
        dispatchSnapshot({ type: ADD_GLOBAL, parser });
    };

    const editField = (index, name, parser) => {
        dispatchSnapshot({ type: EDIT_FIELD, index, name, parser });
    }

    const editGlobal = (index, parser) => {
        dispatchSnapshot({ type: EDIT_GLOBAL, index, parser });
    }

    const addProperty = (fieldIndex, parser) => {
        dispatchSnapshot({ type: ADD_PROPERTY, fieldIndex, parser });
    }

    const editProperty = (fieldIndex, index, parser) => {
        dispatchSnapshot({ type: EDIT_FIELD, fieldIndex, index, parser });
    }

    const undoLastAction = useCallback(() => {
        if (snapshot.index === 0) return;
        dispatchSnapshot({ type: DECREASE_INDEX });
    }, [snapshot, dispatchSnapshot]);

    const redoAction = useCallback(() => {
        if (snapshot.index === snapshot.history.length - 1) return;
        dispatchSnapshot({ type: INCREASE_INDEX });
    }, [snapshot, dispatchSnapshot]);

    const onFieldModalResolved = useCallback((name, parser, data) => {
        const mode = data.mode;
        switch (mode) {
            case Builder.ModalMode.ADD:
                return addField(name, parser);
            case Builder.ModalMode.EDIT:
                return editField(data.fieldIndex, name, parser);
            default: return
        }
        // eslint-disable-next-line 
    }, []);

    const onPropertyModalResolved = useCallback((parser, data) => {
        const mode = data.mode;
        switch (mode) {
            case Builder.ModalMode.ADD:
                return addGlobal(parser);
            case Builder.ModalMode.EDIT:
                return editGlobal(data.index, parser);
            case Builder.ModalMode.ADD_PROPERTY:
                return addProperty(data.fieldIndex, parser);
            case Builder.ModalMode.EDIT_PROPERTY:
                return editProperty(data.fieldIndex, data.index, parser);
            default: return;
        }
        // eslint-disable-next-line 
    }, []);

    return (
        <>
            <div className="card overflow-auto">
                <div className="card-body">
                    <div className="d-flex">
                        <button type="button"
                            className="btn btn-outline-primary mr-2" onClick={onAddFieldClicked}>
                            <i className="fas fa-plus-square mr-2" />Add Field</button>
                        <button type="button"
                            className="btn btn-outline-primary mr-2" onClick={onAddGlobalClicked}>
                            <i className="fas fa-plus-square mr-2" />Add Property</button>
                        <button type="button"
                            className="btn btn-outline-primary mr-1" onClick={redoAction}>Redo<i className="fas fa-redo mx-1"></i></button>
                        <button type="button"
                            className="btn btn-outline-primary mr-1" onClick={undoLastAction}>Undo<i className="fas fa-undo mx-1"></i></button>
                    </div>
                    <hr />
                    <BuildViewer
                        fieldModal={toggleFieldModal}
                        propertyModal={togglePropertyModal}
                    />
                    <hr />
                </div>
            </div>
            <FieldModal
                {...bindFieldModal}
                onConfirm={onFieldModalResolved}
            />
            <PropertyModal
                {...bindGlobalModal}
                onConfirm={onPropertyModalResolved}
            />
        </>
    );
}

