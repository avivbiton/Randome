import API from "../API/api";

async function checkForValidAccount() {
    try {
        await API.account.validateExists();
    } catch (error) {
        console.log(error);
        if (error.data.status === 404) {
            // does no exists
            try {
                await API.account.createNewAccount();
            }
            catch (error) { 
                console.error(error);
            }
        }
    }
}



export default checkForValidAccount;