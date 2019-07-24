import React from "react";

export default function ResultDisplayer({ result }) {
    if (result == null) return <div></div>;

    return (
        <div className="container">
            {Object.keys(result).map(k => RowDisplay(result, k))}
        </div>

    );
}

//TODO: add different ways to display the results

function RowDisplay(result, key) {
    return (
        <div key={key} className="row text-center text-md-left p-4 border-bottom">
            <div className="col-md-2 font-weight-bold">
                {key}
            </div>
            <div className="col-md-10">
                {result[key]}
            </div>
        </div>
    );
}