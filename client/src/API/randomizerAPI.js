import axios from "axios";

class RandomizerAPI {
    async fetchRandomizer(id) {
        try {
            const response = await axios.get(`/randomizer/get/${id}`);
            return response.data;
        }
        catch (error) {
            return null;
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
            return null;
        }
    }
}

export default new RandomizerAPI();