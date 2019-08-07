import React from "react";

export default function Input({ error, className, ...props }) {

    if (error) {
        className += " is-invalid";
    }

    return (
        <>
            <input className={className} {...props} />
            {error
                ?
                <div className="invalid-feedback">
                    {error}
                </div>
                : null
            }
        </>
    );
}
