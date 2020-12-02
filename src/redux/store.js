import {combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import authReducer from "./auth-reducer";
import appReducer from "./app-reducer";

const reducers = combineReducers({
    profile: profileReducer,
    auth: authReducer,
    app: appReducer
});

const store = createStore(reducers);

export default store;