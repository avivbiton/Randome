import axios from "axios";
import { useCallback, useRef } from "react";
import useReactRouter from "use-react-router";

const CancelToken = axios.CancelToken;

const useAPI = () => {

    const source = useRef(CancelToken.source());
    const { history } = useReactRouter();

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
            if(error.response.status === 429) {
                return history.push("/blocked");
            }
            onError(error.response.data, error.response.status);
        }
    }, [source, history]);

    return [
        request,
        source.current.cancel
    ]

}

export default useAPI;