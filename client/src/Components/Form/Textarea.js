import React from "react";

export default function Textarea({ error, className, ...props }) {

    if (error) {
        className += " is-invalid";
    }

    return (
        <>
            <textarea className={className} {...props}>
            </textarea>
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
