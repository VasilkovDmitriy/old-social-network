import React from 'react';
import {connect} from "react-redux";
import {userAuthentication} from "../../redux/auth-reducer";
import {getAuthErrorMessage, getCaptchaUrl, getIsAuth} from "../../redux/auth-selectors";
import {Redirect} from "react-router-dom";
import Login from "./Login";

const LoginContainer = ({userAuthentication, errorMessage, captchaUrl, isAuth}) => {
    if (isAuth) {
        return <Redirect to='/profile'/>
    }

    const onFinish = (values) => {
        const {email, password, remember, captcha} = values;
        userAuthentication(email, password, remember, captcha);
    };

    return <Login onFinish={onFinish} errorMessage={errorMessage} captchaUrl={captchaUrl}/>
}

const mapStateToProps = (state) => ({
    errorMessage: getAuthErrorMessage(state),
    captchaUrl: getCaptchaUrl(state),
    isAuth: getIsAuth(state)
});

export default connect(mapStateToProps, {userAuthentication})(LoginContainer);