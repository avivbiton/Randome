import { useState, useCallback } from "react";

const useModal = () => {

    const [showing, setShowing] = useState(false);
    const [data, setData] = useState(null);

    const displayModal = useCallback(display => {
        setShowing(display);
    }, []);

    return [
        showing,
        displayModal,
        data,
        setData
    ];

}

export default useModal;