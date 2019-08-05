import React from "react";
import { Spinner } from "react-bootstrap";

export default function LoadingSpinner({ animation = "border", className, size = "sm" }) {
    return (
        <Spinner className={className} animation={animation} role="status" size={size} />
    );
}
