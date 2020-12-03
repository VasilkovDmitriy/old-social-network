import {authAPI} from "../api/api";
import {setAuthenticatedUserData} from "./auth-reducer";

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
        const response = await authAPI.me();
        if(response.resultCode === 0) {
            const {id, email, login} = response.data;
            dispatch(setAuthenticatedUserData(id, email, login, true));
        }
        dispatch(setIsInitialized(true));
    } catch (response) {
        console.log(response);
    }
}

export default appReducer;