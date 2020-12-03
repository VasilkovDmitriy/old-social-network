import React, {useEffect} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {Layout} from 'antd';
import {Switch, Route, Redirect} from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import ProfileContainer from "./components/Profile/ProfileContainer";
import UsersContainer from "./components/Users/UsersContainer";
import {connect} from "react-redux";
import Preloader from "./components/common/Preloader/Preloader";
import {appInitialization} from "./redux/app-reducer";
import {getIsInitialized} from "./redux/app-selectors";

const {Content} = Layout;

const App = ({appInitialization, isInitialized}) => {

    useEffect(() => appInitialization(), [isInitialized, appInitialization]);

    if(!isInitialized) {
      return <Preloader/>
    }

    return <Layout>
        <Header/>
        <Layout>
            <Sidebar/>
            <Content>
                <Switch>
                    <Redirect exact from="/" to="/profile"/>
                    <Route path="/profile" render={() => <ProfileContainer/>}/>
                    <Route path="/users" render={() => <UsersContainer/>}/>
                    <Route path="*" render={() => <div>Not found 404</div>}/>
                </Switch>
            </Content>
        </Layout>
    </Layout>
}

const mapStateToProps = (state) => ({
    isInitialized: getIsInitialized(state)
})

export default connect(mapStateToProps, {appInitialization})(App);
