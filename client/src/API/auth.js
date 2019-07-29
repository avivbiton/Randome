import axios from "axios";

class AuthAPI {
    getCurrent() {
        return new Promise((resolve, reject) => {
            axios.get("/auth/current")
                .then(response => {
                    resolve(response.data);
                }).catch(error => reject(error));
        });
    }
}

export default new AuthAPI();