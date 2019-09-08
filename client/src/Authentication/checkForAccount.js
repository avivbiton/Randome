import API from "../API/api";

async function checkForValidAccount() {
    try {
        await API.account.validateExists();
    } catch (error) {
        if (error.data.status === 404) {
            // does no exists
            try {
                await API.account.createNewAccount();
            }
            catch (error) { 
                // TODO: Add proper logging here
                console.error(error);
            }
        }
    }
}



export default checkForValidAccount;