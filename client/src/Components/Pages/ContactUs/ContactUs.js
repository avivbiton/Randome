import React, { useState, useEffect } from "react";
import "./style.css";
import { useInput } from "../../../Hooks/formInput";
import useAPI from "../../../Hooks/useAPI";
import Button from "../../Form/Button";
import { sendContactMessage } from "../../../API/contactAPI";
import Input from "../../Form/Input";
import Textarea from "../../Form/Textarea";



export default function ContactUs() {
    const [title, bindTitle] = useInput();
    const [email, bindEmail] = useInput();
    const [message, bindMessage] = useInput();

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const [call, cancel] = useAPI();

    function onSubmit(e) {
        e.preventDefault();
        setLoading(true);
        call(sendContactMessage({ title, email, message }),
            function onResolve() {
                // TODO: Redirect
            },
            function onError(error) {
                setLoading(false);
                setErrors(error);
            });
    }

    useEffect(() => {
        return () => cancel();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="container">
            <h1 className="mt-2">Contact Us</h1>
            <p className="lead">
                Write us something and we'll get back to you as soon as possible.
            </p>
            <form id="contact-form" onSubmit={onSubmit}>
                <Input className="form-control" type="text" placeholder="Title"
                    {...bindTitle} error={errors.title} />
                <Input className="form-control" type="email" placeholder="Your Email"
                    {...bindEmail} error={errors.email} />
                <Textarea className="form-control" rows="10" placeholder="Write your message here"
                    error={errors.message}
                    {...bindMessage}>
                </Textarea>
                <Button type="submit" className="btn btn-lg btn-primary btn-block"
                    loading={loading}>Send</Button>
            </form>

        </div>
    )

}