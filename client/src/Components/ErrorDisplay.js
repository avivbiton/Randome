import React from "react";

export default function ErrorDisplay({ error }) {
    return (
        <>
            {
                error
                    ?
                    <div className="invalid-feedback" style={{ display: "block" }}>
                        {error}
                    </div>
                    : null
            }
        </>
    );
}
