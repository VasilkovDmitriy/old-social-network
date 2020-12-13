import React from 'react';
import AppHeader from "./AppHeader";
import {connect} from "react-redux";
import {getAuthenticatedUserData, getIsAuth} from "../../redux/authentication-selectors";
import {userLogout} from "../../redux/authentication-reducer";


const AppHeaderContainer = (props) => {
    return <AppHeader {...props}/>
}

const mapStateToProps = (state) => ({
    isAuth: getIsAuth(state),
    authenticatedUserData: getAuthenticatedUserData(state)
})


export default connect(mapStateToProps, {userLogout})(AppHeaderContainer);