import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import {Switch, Route, BrowserRouter, Redirect} from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import ProfileContainer from "./components/Profile/ProfileContainer";
import UsersContainer from "./components/Users/UsersContainer";

const {Content} = Layout;

function App() {
    return <Layout>
        <Header/>
        <Layout>
            <Sidebar/>
            <Content>
                <Switch>
                    <Redirect exact from="/" to="/profile"/>
                    <Route path="/profile" render={() => <ProfileContainer/>} />
                    <Route path="/users" render={() => <UsersContainer/>} />
                    <Route path="*" render={() => <div>Not found 404</div>}/>
                </Switch>
            </Content>
        </Layout>
    </Layout>
}

function AppWithRouter() {
    return <BrowserRouter>
        <App/>
    </BrowserRouter>
}

export default AppWithRouter;
