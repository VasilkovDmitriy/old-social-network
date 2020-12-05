import {authAPI, securityAPI} from "../api/api";

const SET_AUTHENTICATED_USER_DATA = "auth/SET_AUTHENTICATED_USER_DATA";
const SET_AUTH_ERROR_MESSAGE = "auth/SET_AUTH_ERROR_MESSAGE";
const SET_CAPTCHA_URL = "auth/SET_CAPTCHA_URL";

const initialState = {
    authenticatedUserData: {
        id: null,
        email: null,
        login: null
    },
    isAuth: false,
    authErrorMessage: null,
    captchaUrl: null
}

const authReducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_AUTHENTICATED_USER_DATA:
            return {
                ...state, authenticatedUserData: {...action.payload}, isAuth: action.isAuth
            }
        case SET_AUTH_ERROR_MESSAGE:
            return {
                ...state, authErrorMessage: action.errorMessage
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

const setAuthErrorMessage = (errorMessage) => ({type: SET_AUTH_ERROR_MESSAGE, errorMessage});

const setCaptchaUrl = (captchaUrl) => ({type: SET_CAPTCHA_URL, captchaUrl});

export const getAuthUserData = () => async (dispatch) => {
    try {
        const response = await authAPI.me();
        if(response.resultCode === 0) {
            const {id, email, login} = response.data;
            dispatch(setAuthenticatedUserData(id, email, login, true));
        }
    } catch(response) {
        console.log(response);
    }

}

export const userAuthentication = (email, password, rememberMe, captcha) => async (dispatch) => {
    try {
        const response = await authAPI.login(email, password, rememberMe, captcha);
        if(response.resultCode === 0) {
            dispatch(getAuthUserData());
        } else {
            if(response.resultCode === 10) {
                const {url} = await securityAPI.getCaptchaUrl();
                dispatch(setCaptchaUrl(url));
            }
            const errorMessage = response.messages[0];
            dispatch(setAuthErrorMessage(errorMessage));
        }
    } catch(response) {
        console.log(response);
    }
}

export default authReducer;