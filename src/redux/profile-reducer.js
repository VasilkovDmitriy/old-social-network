import {profileAPI} from "../api/api";

const SET_PROFILE_DATA = 'profile/SET_PROFILE_DATA';
const SET_IS_PROFILE_SAVED_SUCCESS = 'profile/SET_IS_PROFILE_SAVED_SUCCESS';
const SET_USER_PHOTO = 'profile/SET_USER_PHOTO';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_PROFILE_ERROR = 'profile/SET_PROFILE_ERROR';
const SET_EDIT_PROFILE_FORM_ERROR = 'profile/SET_EDIT_PROFILE_FORM_ERROR';

const initialState = {
    profileData: null,
    userStatus: null,
    isProfileSavedSuccess: false,
    profileError: null,
    editProfileFormError: null
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE_DATA:
            return {
                ...state, profileData: action.payload
            }
        case SET_IS_PROFILE_SAVED_SUCCESS:
            return {
                ...state, isProfileSavedSuccess: action.isProfileSavedSuccess
            }
        case SET_PROFILE_ERROR:
            return {
                ...state, profileError: action.errorMessage
            }
        case SET_USER_PHOTO:
            return {
                ...state, profileData: {...state.profileData, photos: {...action.photos}}
            }
        case SET_USER_PROFILE:
            return {
                ...state, userStatus: action.status
            }
        case SET_EDIT_PROFILE_FORM_ERROR:
            return {
                ...state, editProfileFormError: action.error
            }
        default:
            return state;
    }
}

const setProfileData = (payload) => ({type: SET_PROFILE_DATA, payload});

const setProfileError = (errorMessage) => ({type: SET_PROFILE_ERROR, errorMessage});

const setIsProfileSavedSuccess = (isProfileSavedSuccess) => ({
    type: SET_IS_PROFILE_SAVED_SUCCESS, isProfileSavedSuccess
});

const setUserPhoto = (photos) => ({type: SET_USER_PHOTO, photos});

const setUserProfile = (status) => ({type: SET_USER_PROFILE, status});

const setEditProfileFormError = (error) => ({type: SET_EDIT_PROFILE_FORM_ERROR, error})

export const requestUserProfile = (userId) => async (dispatch) => {
    try {
        dispatch(setProfileData(null));
        const response = await profileAPI.getUserProfile(userId);
        dispatch(setProfileData(response));
    } catch (error) {
        dispatch(setProfileError(error.toString()));
    }
}

export const saveProfile = (profileFormData) => async (dispatch, getState) => {
    try {
        dispatch(setIsProfileSavedSuccess(false));
        const userId = getState().authentication.authenticatedUserData.id;

        const response = await profileAPI.saveProfile({userId, ...profileFormData});

        if (response.resultCode === 0) {
            await dispatch(requestUserProfile(userId));
            dispatch(setIsProfileSavedSuccess(true));
        } else {
            const errorMessage = response.messages[0];
            throw new Error(errorMessage);
        }
    } catch (error) {
        dispatch(setEditProfileFormError(error.toString()));
    }
}

export const savePhoto = (photo) => async (dispatch) => {
    try {
        const response = await profileAPI.savePhoto(photo);

        if (response.resultCode === 0) {
            dispatch(setUserPhoto(response.data.photos));
        }
    } catch (error) {
        dispatch(setProfileError(error.toString()));
    }
}

export const requestUserStatus = (userId) => async (dispatch) => {
    try {
        const status = await profileAPI.getUserStatus(userId);
        dispatch(setUserProfile(status));
    } catch (error) {
        dispatch(setProfileError(error.toString()));
    }
}

export const updateUserStatus = (status) => async (dispatch) => {
    try {
        const response = await profileAPI.saveUserStatus(status);
        if (response.resultCode === 0) {
            dispatch(setUserProfile(status));
        }
    } catch (error) {
        dispatch(setProfileError(error.toString()));
    }
}

export default profileReducer;