import {profileAPI} from "../api/api";

const SET_PROFILE_DATA = 'profile/SET_PROFILE_DATA';
const SET_IS_PROFILE_SAVED_SUCCESS = 'profile/SET_IS_PROFILE_SAVED_SUCCESS';
const SET_PROFILE_SAVE_ERROR_MESSAGE = 'profile/SET_PROFILE_SAVE_ERROR_MESSAGE';
const SET_USER_PHOTO = 'profile/SET_USER_PHOTO';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';

const initialState = {
    profileData: null,
    userStatus: null,
    isProfileSavedSuccess: false,
    profileSaveErrorMessage: null
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
        case SET_PROFILE_SAVE_ERROR_MESSAGE:
            return {
                ...state, profileSaveErrorMessage: action.errorMessage
            }
        case SET_USER_PHOTO:
            return {
                ...state, profileData: { ...state.profileData, photos: {...action.photos}}
            }
        case SET_USER_PROFILE:
            return {
                ...state, userStatus: action.status
            }
        default:
            return state;
    }
}

const setProfileData = (payload) => ({type: SET_PROFILE_DATA, payload});

const setProfileSaveErrorMessage = (errorMessage) => ({type: SET_PROFILE_SAVE_ERROR_MESSAGE, errorMessage});

const setIsProfileSavedSuccess = (isProfileSavedSuccess) => ({
    type: SET_IS_PROFILE_SAVED_SUCCESS, isProfileSavedSuccess
});

const setUserPhoto = (photos) => ({type: SET_USER_PHOTO, photos});

const setUserProfile = (status) => ({type: SET_USER_PROFILE, status});

export const requestUserProfile = (userId) => async (dispatch) => {
    try {
        const response = await profileAPI.getUserProfile(userId);
        dispatch(setProfileData(response));
    } catch (response) {
        console.log(response);
    }
}

export const saveProfile = (profileFormData) => async (dispatch, getState) => {
    try {
        dispatch(setIsProfileSavedSuccess(false));
        const userId = getState().auth.authenticatedUserData.id;

        const response = await profileAPI.saveProfile({userId, ...profileFormData});

        if (response.resultCode === 0) {
            await dispatch(requestUserProfile(userId));
            dispatch(setIsProfileSavedSuccess(true));
        } else {
            const errorMessage = response.messages[0];
            dispatch(setProfileSaveErrorMessage(errorMessage));
        }
    } catch (response) {
        console.log(response);
    }
}

export const savePhoto = (photo) => async (dispatch) => {
    try {
        const response = await profileAPI.savePhoto(photo);

        if (response.resultCode === 0) {
            dispatch(setUserPhoto(response.data.photos));
        }
    } catch (response) {
        console.log(response);
    }
}

export const requestUserStatus = (userId) => async (dispatch) => {
    try {
        const status = await profileAPI.getUserStatus(userId);
        dispatch(setUserProfile(status));
    } catch (response) {
        console.log(response);
    }
}

export const updateUserStatus = (status) => async (dispatch) => {
    try {
        const response = await profileAPI.saveUserStatus(status);
        if (response.resultCode === 0) {
            dispatch(setUserProfile(status));
        }
    } catch (response) {
        console.log(response);
    }
}

export default profileReducer;