import React from "react";

export default function Checkbox({ id, label, ...props }) {
    return (
        <div className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input" id={id}
                {...props}  />
            <label className="custom-control-label" htmlFor={id}>{label}</label>
        </div>
    );
}
