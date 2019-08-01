import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="container text-center">
            <h1 className="display-2">404 - Not Found</h1>
            <p className="lead">We could not find the page you are looking for.
            <br />If you think this is an error, please contact support.</p>
            <br />
            <Link to="/">Return back to the home page.</Link>
        </div>
    );
}
