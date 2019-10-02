import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import RandomizerBuilder from "./Pages/RandomizerBuilder/RandomizerBuilder";
import ErrorDisplay from "./ErrorDisplay";
import Textarea from "./Form/Textarea";
import { useInput } from "../Hooks/formInput";
import { RESET_HISTORY } from "../redux/Reducers/snapshotReducer";
import { updateSnapshotHistory } from "../redux/Actions/snapshotActions";
import { OverlayTrigger } from "react-bootstrap";

export default function SchemaField({ error, initial, onChange }) {

    const [schema, bindSchema, setSchema] = useInput(initial);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => dispatch({ type: RESET_HISTORY });
        // eslint-disable-next-line
    }, []);

    useEffect(function onInitialChanged() {
        setSchema(initial);
        if (initial)
            dispatch(updateSnapshotHistory(initial));
        // eslint-disable-next-line
    }, [initial]);

    const [editorActive, setEditorActive] = useState(true);
    const editorSnapshot = useSelector(state => state.snapshot.history[state.snapshot.index]);

    const convertFromEditorClicked = useCallback(() => {
        setSchema(editorSnapshot.extractString());
    }, [setSchema, editorSnapshot]);

    const populateEditorFromRawJson = useCallback(() => {
        dispatch(updateSnapshotHistory(schema));
    }, [schema, dispatch]);

    const getJsonString = useCallback(() => {
        if (editorActive) {
            return editorSnapshot.extractString();
        } else {
            return schema;
        }
    }, [editorActive, editorSnapshot, schema]);

    useEffect(() => {
        if (onChange) {
            onChange(getJsonString());
        }
    }, [editorSnapshot, schema, onChange, getJsonString]);

    return (
        <>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <button type="button" className={"btn btn-link nav-link" + (editorActive ? " active" : "")}
                        onClick={() => setEditorActive(true)}>
                        Editor (Recommended)
                    </button>
                </li>
                <li className="nav-item">
                    <button type="button" className={"btn btn-link nav-link" + (editorActive ? " " : " active")}
                        onClick={() => setEditorActive(false)}>
                        Raw JSON
                    </button>
                </li>
            </ul>

            <div className={(editorActive ? "d-block" : "d-none")}>
                <RandomizerBuilder />
                <ErrorDisplay error={error} />
                <button type="button" className="btn btn-sm btn-outline-secondary mt-2" onClick={populateEditorFromRawJson}>
                    Import from Raw JSON
                </button>
                <OverlayTrigger
                    placement="right-start"
                    delay={{ show: 100, hide: 400 }}
                    overlay={tooltip}>
                    <i className="far fa-question-circle ml-1 align-middle text-secondary" />
                </OverlayTrigger>
            </div>
            <div className={(editorActive ? "d-none" : "d-block")}>
                <Textarea rows="10" placeholder="Post your schema here" className="form-control form-control-lg mt-2"
                    {...bindSchema}
                    error={error} />
                <button type="button" className="btn btn-sm btn-outline-secondary mt-2" onClick={convertFromEditorClicked}>Copy JSON from Editor</button>
            </div>
        </>
    );
}


const tooltip = ({ placement, scheduleUpdate, arrowProps, outOfBoundaries, show, ...props }) => (
    <div {...props} className="tooltip">
        This will try to convert your Raw JSON into the Editor. Do NOT use unless you know what you are doing.
    </div>
)