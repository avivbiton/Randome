import React, { useEffect } from "react";
import useRedirect from "../../../Hooks/useRedirect";

export default function MessageSent() {

    const [redirect] = useRedirect("/", 5000);

    useEffect(() => {
        redirect();
        //eslint-disable-next-line
    }, []);

    return (
        <div className="container">
            <div className="d-flex flex-column justify-content-center text-center" style={{ height: "75vh" }}>
                <h1>Your Message has been sent!</h1>
                <p className="lead">Thank you for contacting us. We'll get back to you soon.</p>
                <small className="font-italic">
                    Redirecting you to the home page in 5 seconds
                </small>
            </div>
        </div>
    );
}
