import store from "../redux/store";
import { pushError } from "../redux/Actions/errorActions";

export function handleFormErrors({ name, message }) {

    store.dispatch(pushError({ name, message }));
}

