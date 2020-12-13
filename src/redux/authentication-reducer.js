import {authAPI, securityAPI} from "../api/api";

const SET_AUTHENTICATED_USER_DATA = "authentication/SET_AUTHENTICATED_USER_DATA";
const SET_AUTH_ERROR = "authentication/SET_AUTH_ERROR";
const SET_CAPTCHA_URL = "authentication/SET_CAPTCHA_URL";

const initialState = {
    authenticatedUserData: {
        id: null,
        email: null,
        login: null
    },
    isAuth: false,
    authError: null,
    captchaUrl: null
}

const authenticationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTHENTICATED_USER_DATA:
            return {
                ...state, authenticatedUserData: {...action.payload}, isAuth: action.isAuth
            }
        case SET_AUTH_ERROR:
            return {
                ...state, authError: action.error
            }
        case SET_CAPTCHA_URL:
            return {
                ...state, captchaUrl: action.captchaUrl
            }
        default:
            return state;
    }
}

export const setAuthenticatedUserData = (id, email, login, isAuth) => ({
    type: SET_AUTHENTICATED_USER_DATA, payload: {id, email, login}, isAuth
})

const setAuthError = (error) => ({type: SET_AUTH_ERROR, error});

const setCaptchaUrl = (captchaUrl) => ({type: SET_CAPTCHA_URL, captchaUrl});

export const getAuthUserData = () => async (dispatch) => {
    const response = await authAPI.me();

    if (response.resultCode === 0) {
        const {id, email, login} = response.data;
        dispatch(setAuthenticatedUserData(id, email, login, true));
    }
}

export const userAuthentication = (email, password, rememberMe, captcha) => async (dispatch) => {
    try {
        const response = await authAPI.login(email, password, rememberMe, captcha);
        if (response.resultCode === 0) {
            dispatch(getAuthUserData());
        } else if (response.resultCode === 10) {
            const {url} = await securityAPI.getCaptchaUrl();
            dispatch(setCaptchaUrl(url));
        } else {
            const errorMessage = response.messages[0] || "authentication error";
            throw new Error(errorMessage);
        }
    } catch (error) {
        dispatch(setAuthError(error.toString()));
    }
}

export const userLogout = () => async (dispatch) => {
    try {
        const response = await authAPI.logout();
        if (response.resultCode === 0) {
            dispatch(setAuthenticatedUserData(null, null, null, false));
        }
    } catch (error) {
        dispatch(setAuthError(error.toString()));
    }
}

export default authenticationReducer;