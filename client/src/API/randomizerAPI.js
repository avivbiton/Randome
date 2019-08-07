import axios from "axios";
import RequestError from "./RequestError";

class RandomizerAPI {

    async fetchRandomizer(id) {
        try {
            const response = await axios.get(`/randomizer/get/${id}`);
            return response.data;
        }
        catch (error) {
            throw new RequestError(error, "Could not fetch randomizer");
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
            throw new RequestError(error, "Could not retrive items, Please try again later.");
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

    async likeRandomizer(id) {
        try {
            const response = await axios.post("/randomizer/like", { id });
            return response.data.increase;
        } catch (error) {
            if (error.response)
                throw new RequestError(error.response.data, "Unable to like.");
            throw new RequestError({ error: "There was an error, please try again later." }, "Server Error");
        }
    }
}

export default new RandomizerAPI();