import { useState, useEffect } from "react";

const useFocus = (ref) => {
    const [forceFocusNextRender, setForceFocus] = useState(true);

    useEffect(() => {
        if (forceFocusNextRender) {
            if (ref.current !== null) {
                ref.current.focus();
                setForceFocus(false);
            }
        }
    }, [forceFocusNextRender, ref]);

    return () => {
        setForceFocus(true);
    }

};

export default useFocus;