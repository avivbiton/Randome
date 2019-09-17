import axios from "axios";
axios.defaults.baseURL = "/api";

export const sendContactMessage = message => {
    return {
        url: "/contact",
        method: "post",
        data: message
    }
}