import React from 'react';
import {Layout, Button, Row, Col, Avatar} from 'antd';
import {LogoutOutlined, LoginOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import style from "./AppHeader.module.css";

const {Header} = Layout;

const AppHeader = ({isAuth, authenticatedUserData, userLogout}) => {

    const onLogoutButtonClick = () => {
        userLogout();
    }

    return <Header className="header">
        <Row className={style.headerContentWrapper}>
            <Col>
                {
                    isAuth
                        ? <Button type="primary" onClick={onLogoutButtonClick}
                                  icon={<LogoutOutlined/>}>Logout</Button>
                        : <Link to="login"><Button type="primary" icon={<LoginOutlined/>}>Login</Button></Link>
                }
            </Col>
            <Col>
                {
                    isAuth &&
                    <div>
                        <span className={style.login}>{authenticatedUserData.login}</span>
                        <Avatar style={{backgroundColor: '#87d068'}}>
                            {authenticatedUserData.login[0].toUpperCase()}
                        </Avatar>
                    </div>
                }
            </Col>
        </Row>
    </Header>
}

export default AppHeader;