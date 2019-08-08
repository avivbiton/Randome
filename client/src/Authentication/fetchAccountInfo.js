import api from "../API/api";
import store from "../redux/store";
import { setAccount } from "../redux/Actions/authAction";


export default async function fetchAccountInfo() {
    const account = await api.account.getAccount(); 
    store.dispatch(setAccount(account));
}