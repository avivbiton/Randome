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

    async fetchMyRandomizers() {
        try {
            const response = await axios.get("/randomizer/own");
            return response.data;
        } catch (error) {
            throw new RequestError(error);
        }
    }


    async fetchByMeta(type) {
        try {

            const response = await axios.get("/randomizer/meta", {
                params: {
                    type
                }
            });
            return response.data;
        } catch (error) {
            throw new RequestError(error);
        }
    }

    async create(name, description, schema, isPrivate) {
        try {
            const response = await axios.post("/randomizer/create", { name, description, schema, private: isPrivate });
            return response.data;
        }
        catch (error) {
            if (error.response.status == 500) {
                throw new RequestError({ serverError: "Something went wrong, please try again" });
            }
            if (error.response) {
                throw new RequestError(error.response.data, "Invalid data");
            }

            throw new RequestError({ serverError: "Something went wrong, please try again later." }, "Server error");
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

    async favoriteRandomizer(id) {
        try {
            const response = await axios.post("/randomizer/favorite", { id });
            return response.data.increase;
        } catch (error) {
            if (error.response)
                throw new RequestError(error.response.data, "Unable to favorite.");
            throw new RequestError({ error: "There was an error, please try again later." }, "Server Error");
        }
    }
}

export default new RandomizerAPI();