import { useState, useCallback } from "react";
/*
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

}*/


const useModal = () => {
    const [showing, setShowing] = useState(false);
    const [data, setData] = useState(null);

    const displayModal = useCallback((display, dataObject = false) => {
        if (setData !== false) {
            setData(dataObject);
        }
        setShowing(display);
    }, []);

    return [
        displayModal,
        {
            showing,
            toggle: displayModal,
            data
        },
        setData
    ];

}

export default useModal;