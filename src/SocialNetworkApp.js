import React, {useEffect} from 'react';
import './SocialNetworkApp.css';
import 'antd/dist/antd.css';
import {Layout} from 'antd';
import {Switch, Route, Redirect, BrowserRouter} from "react-router-dom";
import SidebarContainer from "./components/Sidebar/SidebarContainer";
import AppHeaderContainer from "./components/Header/AppHeaderContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import UsersContainer from "./components/Users/UsersContainer";
import {connect, Provider} from "react-redux";
import LargePreloader from "./components/common/Preloader/LargePreloader";
import {appInitialization} from "./redux/app-reducer";
import {getInitializingError, getIsInitialized} from "./redux/app-selectors";
import LoginContainer from "./components/Login/LoginContainer";
import store from "./redux/store";
import {AlertError} from "./components/common/Alert/Alert";


const {Content} = Layout;

const App = ({appInitialization, isInitialized, initializingError}) => {

    useEffect(() => appInitialization(), [isInitialized, appInitialization]);

    if (initializingError) {
        return <AlertError message={initializingError}/>
    }

    if (!isInitialized) {
        return <LargePreloader/>
    }

    return <Layout>
        <AppHeaderContainer/>
        <Layout>
            <SidebarContainer/>
            <Content>
                <Switch>
                    <Redirect exact from="/" to="/profile"/>
                    <Route path="/profile/:id?" render={() => <ProfileContainer/>}/>
                    <Route path="/users" render={() => <UsersContainer/>}/>
                    <Route path="/login" render={() => <LoginContainer/>}/>
                    <Route path="*" render={() => <div>Not found 404</div>}/>
                </Switch>
            </Content>
        </Layout>
    </Layout>
}

const mapStateToProps = (state) => ({
    isInitialized: getIsInitialized(state),
    initializingError: getInitializingError(state)
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