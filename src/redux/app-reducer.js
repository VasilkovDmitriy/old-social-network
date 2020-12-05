import {authAPI} from "../api/api";
import {getAuthUserData, setAuthenticatedUserData} from "./auth-reducer";

const SET_IS_INITIALIZED = 'app/SET_IS_INITIALIZED';

const initialState = {
    isInitialized: false
}

const appReducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_IS_INITIALIZED:
            return {...state, isInitialized: action.isInitialized};
        default:
            return state;
    }
}

export const setIsInitialized = (isInitialized) => ({type: SET_IS_INITIALIZED, isInitialized});

export const appInitialization = () => async (dispatch) => {
    try {
        await dispatch(getAuthUserData());
        dispatch(setIsInitialized(true));
    } catch (response) {
        console.log(response);
    }
}

export default appReducer;