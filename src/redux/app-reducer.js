import {getAuthUserData} from "./authentication-reducer";

const SET_IS_INITIALIZED = 'app/SET_IS_INITIALIZED';
const SET_INITIALIZING_ERROR = 'app/SET_INITIALIZING_ERROR';

const initialState = {
    isInitialized: false,
    initializingError: null
}

const appReducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_IS_INITIALIZED:
            return {
                ...state, isInitialized: action.isInitialized
            };
        case SET_INITIALIZING_ERROR:
            return {
                ...state, initializingError: action.error
            }
        default:
            return state;
    }
}

export const setIsInitialized = (isInitialized) => ({type: SET_IS_INITIALIZED, isInitialized});

const setInitializingError = (error) => ({type: SET_INITIALIZING_ERROR, error});

export const appInitialization = () => async (dispatch) => {
    try {
        await dispatch(getAuthUserData());
        dispatch(setIsInitialized(true));
    } catch (error) {
        dispatch(setInitializingError(error.toString()));
    }
}

export default appReducer;