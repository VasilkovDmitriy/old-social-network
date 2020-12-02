const SET_IS_INITIALIZED = 'SET_IS_INITIALIZED';

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

export const setIsInitialized = (isInitialized) => ({type: SET_IS_INITIALIZED, isInitialized})

export default appReducer;