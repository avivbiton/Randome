import axios from "axios";
import RequestError from "./RequestError";

class RandomizerAPI {

    // TODO: return RequestError instead of false

    async fetchRandomizer(id) {
        try {
            const response = await axios.get(`/randomizer/get/${id}`);
            return response.data;
        }
        catch (error) {
            return false;
        }
    }
    async fetch(page = 0, sortBy = "createdAt") {
        try {
            const response = await axios.get("/randomizer/fetch",
                {
                    params: {
                        page,
                        sortBy
                    }
                });
            return response.data;
        } catch (error) {
            return false;
        }
    }

    async create(name, description, schema, isPrivate) {
        try {
            const response = await axios.post("/randomizer/create", { name, description, schema, private: isPrivate });
            return response.data;
        }
        catch (error) {
            if (error.response) {
                throw new RequestError(error.response.data, "Invalid data");
            }

            throw new RequestError({ form: "Something went wrong, please try again later." }, "Server error");
        }
    }
}

export default new RandomizerAPI();