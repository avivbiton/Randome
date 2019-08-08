import api from "../API/api";


export default async function fetchAccountInfo() {
    const account = await api.account.getAccount();
    // TODO: upate the state
}