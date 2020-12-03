import {combineReducers, createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import profileReducer from "./profile-reducer";
import authReducer from "./auth-reducer";
import appReducer from "./app-reducer";
import {composeWithDevTools} from "redux-devtools-extension";

const reducers = combineReducers({
    profile: profileReducer,
    auth: authReducer,
    app: appReducer
});

/*const store = createStore(reducers, applyMiddleware(thunk));*/

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;