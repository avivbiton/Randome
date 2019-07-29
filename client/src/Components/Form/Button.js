import React from "react";
import LoadingSpinner from "../LoadingSpinner";

export default function Button({ loading, children, ...props }) {
    return (
        <button
            disabled={loading}
            {...props}>{children}{loading ? <LoadingSpinner className="mx-2" size="sm" /> : null}</button>
    );
}
