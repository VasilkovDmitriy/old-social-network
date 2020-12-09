import React from 'react';
import AppHeader from "./AppHeader";
import {connect} from "react-redux";
import {getAuthenticatedUserData, getIsAuth} from "../../redux/auth-selectors";
import {userLogout} from "../../redux/auth-reducer";


const AppHeaderContainer = (props) => {
    return <AppHeader {...props}/>
}

const mapStateToProps = (state) => ({
    isAuth: getIsAuth(state),
    authenticatedUserData: getAuthenticatedUserData(state)
})


export default connect(mapStateToProps, {userLogout})(AppHeaderContainer);