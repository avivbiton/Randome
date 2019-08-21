import React from "react";
import { ContentGenerator } from "randomcontentgenerator";

export default function BuildViewer({ snapshot, onFieldDelete, onGlobalDelete, onEditField, onEditGlboal }) {

    return (
        <div>
            <h2>Fields</h2>
            {snapshot.iterateFields().map(({ name, field }, key) => <FieldDisplay
                key={key}
                name={name}
                field={field}
                onDelete={() => onFieldDelete(name)}
                onEdit={field => onEditField(name, field)}
            />)}
            <hr />
            <h2>Global Properties</h2>
            {snapshot.getSchema().globalProperties.map((i, key) => <GlobalPropertyDisplay
                key={key}
                field={i}
                onDelete={() => onGlobalDelete(key)}
                onEdit={() => onEditGlboal(key)}
            />)}
        </div>
    );
}


function GlobalPropertyDisplay({ field, onDelete, onEdit }) {

    return (
        <div className="border border-primary p-2">
            {new ContentGenerator().findParser(field).constructor.name}
            <button title="Edit" className="btn fas fa-edit icon-button" style={noPadding} onClick={() => onEdit(field)} />
            <button title="Delete" className="btn far fa-trash-alt icon-button" style={noPadding} onClick={onDelete} />
        </div>
    );
}


function FieldDisplay({ name, field, onDelete, onEdit }) {
    return (
        <div className="border border-primary p-2">
            <span className="pr-4">{name}</span>
            <button title="Edit" className="btn fas fa-edit icon-button" style={noPadding} onClick={() => onEdit(field)} />
            <button title="Delete" className="btn far fa-trash-alt icon-button" style={noPadding} onClick={onDelete} />

        </div>
    );
}

const noPadding = {
    padding: "0"
}