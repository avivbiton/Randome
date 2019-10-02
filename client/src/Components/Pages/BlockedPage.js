import React from "react";
import { Link } from "react-router-dom";

import StopImage from "../../Images/stop.png";

export default function BlockedPage() {
    return (
        <div className="container">
            <div className="row">
                <div className="col align-self-center">
                    <p className="large-input text-center text-lg-left">Sorry, you are currently blocked from doing that action.
                    This may be due to repeated requests in a day. Please try again later.</p>
                    <Link className="reset-color hover-text-decoration-none" to="/">
                        <button className="btn btn-outline-primary btn-block">Back to the homepage</button>
                    </Link>
                </div>
                <div className="col d-none d-lg-block">
                    <img src={StopImage} alt="Stop" className="img-fluid" />
                </div>
            </div>
        </div>
    );
}
