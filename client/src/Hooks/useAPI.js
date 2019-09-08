import axios from "axios";
import { useCallback, useRef } from "react";

const CancelToken = axios.CancelToken;

const useAPI = () => {

    const source = useRef(CancelToken.source());

    const request = useCallback(async (config, onResolve, onError = () => { }) => {
        try {
            const response = await axios({
                cancelToken: source.current.token,
                ...config
            });
            if (onResolve) onResolve(response.data);
            else return response.data;
        } catch (error) {
            if (axios.isCancel(error)) return;
            onError(error.response.data);
        }
    }, [source]);

    return [
        request,
        source.current.cancel
    ]

}

export default useAPI;