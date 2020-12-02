const SET_AUTHENTICATED_USER_DATA = "SET_AUTHENTICATED_USER_DATA";

const initialState = {
    authenticatedUserData: {
        id: null,
        email: null,
        login: null
    },
    isAuth: false
}

const authReducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_AUTHENTICATED_USER_DATA:
            return {
                ...state, authenticatedUserData: {...action.payload}, isAuth: action.isAuth
            }
        default:
            return state;
    }
}

export const setAuthenticatedUserData = (id, email, login, isAuth) => ({
    type: SET_AUTHENTICATED_USER_DATA, payload: {id, email, login}, isAuth
})

export default authReducer;