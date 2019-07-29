import React from "react";
import { Spinner } from "react-bootstrap";

export default function LoadingSpinner({ className, size="sm" }) {
    return (
        <Spinner className={className} animation="border" role="status" size={size} />
    );
}
