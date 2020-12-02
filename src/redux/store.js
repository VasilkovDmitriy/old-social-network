import {combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";

const reducers = combineReducers({
    profile: profileReducer
});

const store = createStore(reducers);

export default store;