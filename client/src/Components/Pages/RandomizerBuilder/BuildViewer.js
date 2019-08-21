import React, { useCallback } from "react";
import { ContentGenerator } from "randomcontentgenerator";

export default function BuildViewer({ snapshot, onFieldDelete, onGlobalDelete }) {

    const onFieldDeletePressed = useCallback(name => {
        onFieldDelete(name);
    }, [onFieldDelete]);

    const onGlobalDeletePressed = useCallback(index => {
        onGlobalDelete(index);
    }, [onGlobalDelete]);

    return (
        <div>
            <h2>Fields</h2>
            {snapshot.iterateFields().map(({ name, field }, key) => <FieldDisplay
                key={key}
                name={name}
                field={field}
                onDelete={() => onFieldDeletePressed(name)}
            />)}
            <hr />
            <h2>Global Properties</h2>
            {snapshot.getSchema().globalProperties.map((i, key) => <GlobalPropertyDisplay
                key={key}
                field={i}
                onDelete={() => onGlobalDeletePressed(key)}
            />)}
        </div>
    );
}


function GlobalPropertyDisplay({ field, onDelete }) {

    return (
        <div className="border border-primary p-2">
            {new ContentGenerator().findParser(field).constructor.name}
            <button title="Delete" className="btn far fa-trash-alt icon-button" onClick={onDelete} />
        </div>
    );
}


function FieldDisplay({ name, field, onDelete }) {
    return (
        <div className="border border-primary p-2">
            {name}
            <button title="Delete" className="btn far fa-trash-alt icon-button" onClick={onDelete} />
        </div>
    );
}
