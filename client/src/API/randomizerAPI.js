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
}

export default new RandomizerAPI();