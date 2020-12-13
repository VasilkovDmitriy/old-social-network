export const getIsAuth = (state) => state.authentication.isAuth;

export const getAuthenticatedUserData = (state) => state.authentication.authenticatedUserData;

export const getAuthErrorMessage = (state) => state.authentication.authError;

export const getCaptchaUrl = (state) => state.authentication.captchaUrl;