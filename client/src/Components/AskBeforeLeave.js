import React, { useEffect } from "react";
import { Prompt } from "react-router-dom";

export default function AskBeforeLeave({ blockLeave }) {
    useEffect(() => {
        function askBeforeLeaving() {
            return "Are you sure you want to leave? Your data will be lost.";
        }

        window.onbeforeunload = askBeforeLeaving;

        return () => window.onbeforeunload = undefined;
    }, []);
    return (
        <>
            <Prompt
                when={blockLeave}
                message="Are you sure you want to leave? you data will be lost."
            />
        </>
    );
}
