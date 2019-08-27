import React from "react";

export default function ErrorDisplay({ error }) {
    return (
        <>
            {
                error
                    ?
                    <div className="invalid-feedback">
                        {error}
                    </div>
                    : null
            }
        </>
    );
}
