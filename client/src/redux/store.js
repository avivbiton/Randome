import { createStore, applyMiddleware, compose, combineReducers } from "redux";

import auth from "./Reducers/authReducer";
import snapshot from "./Reducers/snapshotReducer";

const initialState = {};

const rootReducer = combineReducers({
    auth,
    snapshot
});

const middleware = [];

// composeEnhancer is created to assure the dev tools only available while the app is running in dev mode &&
// The user has the extension installed otherwise the site will not work.
const composeEnhancer =
    process.env.NODE_ENV !== "production" &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            name: "App",
            actionBlacklist: ["REDUX_STORAGE_SAVE"]
        })
        : compose;

const store = createStore(
    rootReducer,
    initialState,
    composeEnhancer(applyMiddleware(...middleware))
);

export default store;
