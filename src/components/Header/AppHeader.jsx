import React from 'react';
import { Layout, Button } from 'antd';
import { LogoutOutlined,  LoginOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";

const {Header} = Layout;

const AppHeader = ({isAuth, userLogout}) => {

    const onLogoutButtonClick = () => {
        userLogout();
    }


    return <Header className="header">
        <div>
            {
                isAuth
                    ? <Button type="primary" onClick={onLogoutButtonClick} icon={<LogoutOutlined />}>Logout</Button>
                    : <Link to="login"><Button type="primary" icon={<LoginOutlined />}>Login</Button></Link>
            }
        </div>
    </Header>
}

export default AppHeader;