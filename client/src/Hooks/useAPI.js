import axios from "axios";
import { useCallback, useRef } from "react";

const CancelToken = axios.CancelToken;

const useAPI = (config) => {

    const source = useRef(CancelToken.source());

    const request = useCallback(async (onResolve, onError) => {
        try {
            const response = await axios({
                cancelToken: source.current.token,
                ...config
            });
            if (onResolve) onResolve(response.data);
            else return response.data;
        } catch (error) {
            if (axios.isCancel(error)) return;
            if (onError) return onError(error.response.data);
            throw error.response.data;
        }
    }, [config, source]);

    return [
        request,
        source.current.cancel
    ]

}

export default useAPI;