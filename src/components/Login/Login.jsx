import React from 'react';
import {Form, Input, Button, Checkbox} from 'antd';
import {MailOutlined, LockOutlined, SafetyOutlined} from '@ant-design/icons';
import style from './Login.module.css';
import {connect} from "react-redux";
import {userAuthentication} from "../../redux/auth-reducer";
import {getAuthErrorMessage, getCaptchaUrl, getIsAuth} from "../../redux/auth-selectors";
import {Redirect} from "react-router-dom";

const Login = ({userAuthentication, errorMessage, captchaUrl, isAuth}) => {
    if(isAuth) {
        return <Redirect to='/profile'/>
    }

    const onFinish = (values) => {
        const {email, password, remember, captcha} = values;
        userAuthentication(email, password, remember, captcha);
    };

    return <Form name="login" initialValues={{remember: true,}} onFinish={onFinish}>

        <div className={style.formItemsWrapper}>
            <Form.Item name="email"
                       rules={[
                           {required: true, message: 'Please input your email!',},
                       ]}>
                <Input prefix={<MailOutlined className="site-form-item-icon"/>}
                       placeholder="Email"/>
            </Form.Item>

            <Form.Item name="password"
                       rules={[
                           {required: true, message: 'Please input your password!',},
                       ]}>
                <Input prefix={<LockOutlined className="site-form-item-icon"/>}
                       type="password" placeholder="Password"/>
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            {
                captchaUrl &&
                <div>
                    <img src={captchaUrl}/>
                    <Form.Item name="captcha"
                               rules={[
                                   {required: true, message: 'Please input captcha symbols!',},
                               ]}>
                        <Input prefix={<SafetyOutlined  className="site-form-item-icon"/>}
                               placeholder="Captcha symbols"/>
                    </Form.Item>
                </div>

            }

            <Form.Item>
                <Button className="login-form-button" type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </div>
        {
            errorMessage &&
            <div className={style.errorMessage}>
                {errorMessage}
            </div>
        }


    </Form>
}

const mapStateToProps = (state) => ({
    errorMessage: getAuthErrorMessage(state),
    captchaUrl: getCaptchaUrl(state),
    isAuth: getIsAuth(state)
})


export default connect(mapStateToProps, {userAuthentication})(Login);