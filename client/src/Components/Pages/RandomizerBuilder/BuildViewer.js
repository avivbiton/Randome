import React, { useState, useEffect, useCallback } from "react";
import { ContentGenerator } from "randomcontentgenerator";

export default function BuildViewer({ snapshot }) {
    return (
        <div>
            <h2>Fields</h2>
            {snapshot.iterateFields().map(({ name, field }, key) => <FieldDisplay key={key} name={name} field={field} />)}
            <hr />
            <h2>Global Properties</h2>
            {snapshot.getSchema().globalProperties.map((i, key) => <GlobalPropertyDisplay key={key} field={i} />)}
        </div>
    );
}


function GlobalPropertyDisplay({ field }) {
    return (
        <div className="border border-primary p-2">
            {new ContentGenerator().findParser(field).constructor.name}
            <button title="Delete" className="btn far fa-trash-alt icon-button" />
        </div>
    );
}


function FieldDisplay({ name, field }) {
    return (
        <div className="border border-primary p-2">
            {name}
            <button title="Delete" className="btn far fa-trash-alt icon-button" />
        </div>
    );
}
