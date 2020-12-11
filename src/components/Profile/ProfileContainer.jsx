import React, {useEffect} from 'react';
import Profile from "./Profile";
import {compose} from "redux";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getAuthenticatedUserData} from "../../redux/auth-selectors";
import {
    requestUserProfile,
    requestUserStatus,
    savePhoto,
    saveProfile,
    updateUserStatus
} from "../../redux/profile-reducer";
import {
    getIsProfileSavedSuccess,
    getProfileData,
    getProfileSaveErrorMessage,
    getUserProfile
} from "../../redux/profile-selectors";

const ProfileContainer = ({authenticatedUserId, requestUserProfile, requestUserStatus, ...props}) => {
    const userId = props.match.params.id || authenticatedUserId;
    const isOwner = !props.match.params.id || props.match.params.id === authenticatedUserId;

    useEffect(() => {
        requestUserProfile(userId);
        requestUserStatus(userId);
    }, [userId, requestUserProfile]);


    return <Profile isOwner={isOwner} {...props}/>
}

const mapStateToProps = (state) => ({
    authenticatedUserId: getAuthenticatedUserData(state).id,
    profileData: getProfileData(state),
    userStatus: getUserProfile(state),
    isProfileSavedSuccess: getIsProfileSavedSuccess(state),
    profileSaveErrorMessage: getProfileSaveErrorMessage(state),

})

export default compose(
    connect(mapStateToProps,
        {requestUserProfile, saveProfile, savePhoto, requestUserStatus, updateUserStatus}),
    withRouter,
    withAuthRedirect
)(ProfileContainer);