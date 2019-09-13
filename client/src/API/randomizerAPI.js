import axios from "axios";
import RequestError from "./RequestError";

axios.defaults.baseURL = "/api";

class RandomizerAPI {

    async fetchRandomizer(id) {
        try {
            const response = await axios.get(`/randomizer/${id}`);
            return response.data;
        }
        catch (error) {
            throw new RequestError(error.response.data, "Could not fetch randomizer");
        }
    }
    async fetch(search = "", page = 0, sortBy = "createdAt") {
        try {
            const response = await axios.get("/randomizer/fetch",
                {
                    params: {
                        search,
                        page,
                        sortBy
                    }
                });
            return response.data;
        } catch (error) {
            throw new RequestError(error, "Could not retrive items, Please try again later.");
        }
    }

    fetchMyRandomizers() {
        return {
            url: "/randomizer/fetch/own",
            method: "get"
        };
    }


    async fetchByMeta(type) {
        try {

            const response = await axios.get("/randomizer/fetch/meta", {
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
            if (error.response.status === 500) {
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

    async deleteRandomizer(id) {
        try {

            await axios.delete(`/randomizer/${id}`)
        } catch (error) {
            throw new RequestError({ error: "There was an error, please try again later." }, "Server Error");
        }
    }

    async editRandomizer(id, name, description, isPrivate, schema) {
        try {
            await axios.put(`/randomizer/${id}`, { name, description, private: isPrivate, schema });
        } catch (error) {
            if (error.response.status === 500) {
                throw new RequestError({ serverError: "Something went wrong, please try again" });
            }
            if (error.response) {
                throw new RequestError(error.response.data, "Invalid data");
            }

            throw new RequestError({ serverError: "Something went wrong, please try again later." }, "Server error");
        }
    }
}

export default new RandomizerAPI();