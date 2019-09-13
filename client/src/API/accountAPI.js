import axios from "axios";
import RequestError from "./RequestError";

axios.defaults.baseURL = "/api";

class AccountAPI {
    async createNewAccount() {
        try {
            const response = await axios.post("/account/create");
            return response;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    }

    async validateExists() {
        try {
            await axios.get("/account/exists");
            return true;
        } catch (error) {
            if (error.response) {
                throw new RequestError(error.response);
            }
            throw new RequestError(error);
        }
    }

    async getAccount() {
        try {
            const response = await axios.get("/account/info");
            return response.data;
        } catch (error) {
            throw new RequestError(error);
        }
    }
}


export default new AccountAPI();