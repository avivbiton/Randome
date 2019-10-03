import React from "react";

export default function ResultDisplayer({ result }) {
    if (result == null) return <div></div>;

    return (
        <div className="container">
            {Object.keys(result).map(k => RowDisplay(result, k))}
        </div>

    );
}

function RowDisplay(result, key) {
    return (
        <div key={key} className="row text-center text-md-left p-4 border-bottom text-break">
            <div className="col-md-2 font-weight-bold">
                {key}
            </div>
            <div style={{ fontSize: "150%", letterSpacing: "120%" }} className="col-md-10">
                {result[key]}
            </div>
        </div>
    );
}