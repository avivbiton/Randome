import React from "react";
import { Link } from "react-router-dom";

export default function RandomizerIsPrivate() {
    return (
        <div className="container text-center">
            <h1>Sorry, this is Randomizer is Private!</h1>
            <p className="lead">
                The owner of this Randomizer has set this to private.
                Please try again at later time or contact the owner.
            </p>
            <button className="btn btn-primary btn-lg">
                <Link to="/" className="text-reset">Back to home page</Link>
                </button>
        </div>
    );
}
