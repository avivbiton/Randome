import { useEffect, useCallback, useRef } from "react";
import useReactRouter from "use-react-router";


const useRedirect = (path, delay) => {
    const timer = useRef(null);
    const { history } = useReactRouter();

    const redirect = useCallback(() => {
        timer.current = setTimeout(() => history.push(path), delay);
    }, [path, delay, history]);

    const cancel = useCallback(() => {
        if (timer.current !== null) {
            clearInterval(timer.current);
        }
    }, []);

    useEffect(() => {
        return () => cancel();
        // eslint-disable-next-line
    }, []);

    return [
        redirect,
        cancel
    ];
}

export default useRedirect;