import {combineReducers, createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import profileReducer from "./profile-reducer";
import authenticationReducer from "./authentication-reducer";
import appReducer from "./app-reducer";
import {composeWithDevTools} from "redux-devtools-extension";
import usersReducer from "./users-reducer";

const reducers = combineReducers({
    profile: profileReducer,
    authentication: authenticationReducer,
    app: appReducer,
    users: usersReducer
});

/*const store = createStore(reducers, applyMiddleware(thunk));*/

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;