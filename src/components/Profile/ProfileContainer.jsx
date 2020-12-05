import React from 'react';
import Profile from "./Profile";
import {compose} from "redux";
import withAuthRedirect from "../../hoc/withAuthRedirect";

const ProfileContainer = (props) => {
    return <Profile/>
}

export default compose(
    withAuthRedirect
)(ProfileContainer);