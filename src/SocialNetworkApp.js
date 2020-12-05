import React, {useEffect} from 'react';
import './SocialNetworkApp.css';
import 'antd/dist/antd.css';
import {Layout} from 'antd';
import {Switch, Route, Redirect, BrowserRouter} from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import AppHeaderContainer from "./components/Header/AppHeaderContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import UsersContainer from "./components/Users/UsersContainer";
import {connect, Provider} from "react-redux";
import Preloader from "./components/common/Preloader/Preloader";
import {appInitialization} from "./redux/app-reducer";
import {getIsInitialized} from "./redux/app-selectors";
import LoginContainer from "./components/Login/LoginContainer";
import store from "./redux/store";



const {Content} = Layout;

const App = ({appInitialization, isInitialized}) => {

    useEffect(() => appInitialization(), [isInitialized, appInitialization]);

    if (!isInitialized) {
        return <Preloader/>
    }

    return <Layout>
        <AppHeaderContainer/>
        <Layout>
            <Sidebar/>
            <Content>
                <Switch>
                    <Redirect exact from="/" to="/profile"/>
                    <Route path="/profile" render={() => <ProfileContainer/>}/>
                    <Route path="/users" render={() => <UsersContainer/>}/>
                    <Route path="/login" render={() => <LoginContainer/>}/>
                    <Route path="*" render={() => <div>Not found 404</div>}/>
                </Switch>
            </Content>
        </Layout>
    </Layout>
}

const mapStateToProps = (state) => ({
    isInitialized: getIsInitialized(state)
})

const AppWithConnect = connect(mapStateToProps, {appInitialization})(App);

const SocialNetworkApp = () => {
    return <Provider store={store}>
        <BrowserRouter>
           <AppWithConnect/>
        </BrowserRouter>
    </Provider>
}

export default SocialNetworkApp;