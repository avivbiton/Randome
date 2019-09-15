import React, { useState, useEffect } from "react";
import "./style.css";
import { useInput } from "../../../Hooks/formInput";
import useAPI from "../../../Hooks/useAPI";
import Button from "../../Form/Button";
import { sendContactMessage } from "../../../API/contactAPI";


export default function ContactUs() {
    const [title, bindTitle] = useInput();
    const [email, bindEmail] = useInput();
    const [message, bindMessage] = useInput();

    const [loading, setLoading] = useState(false);

    const [call, cancel] = useAPI();

    function onSubmit(e) {
        e.preventDefault();
        setLoading(true);
        call(sendContactMessage({ title, email, message }),
            function onResolve() {
                console.log("resolve");
            },
            function onError(error) {
                setLoading(false);
                console.log(error);
            });
    }

    useEffect(() => {
        return () => cancel();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="container">
            <h1 className="mt-2">Contact Us</h1>
            <form id="contact-form" onSubmit={onSubmit}>
                <input className="form-control" type="text" placeholder="Title" {...bindTitle} />
                <input className="form-control" type="email" placeholder="Your Email" {...bindEmail} />
                <textarea className="form-control" rows="10" placeholder="Write your message here"
                    {...bindMessage}>
                </textarea>
                <Button type="submit" className="btn btn-lg btn-primary btn-block"
                    loading={loading}>Send</Button>
            </form>

        </div>
    )

}