import {usersAPI} from "../api/api";

const SET_USERS_ITEMS = 'users/SET_USERS_ITEMS';
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT';
const SET_PORTION_NUMBER = 'users/SET_PORTION_NUMBER';
const SET_PAGE_SIZE = 'users/SET_PAGE_SIZE';
const SET_IS_USER_FOLLOWED = 'users/SET_IS_USER_FOLLOWED';
const SET_IS_FOLLOW_FETCHING = 'users/SET_IS_FOLLOW_FETCHING';

const initialState = {
    usersItems: [],
    totalUsersCount: null,
    portionNumber: 1,
    pageSize: 20,
    isFollowFetching: []
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS_ITEMS:
            return {
                ...state, usersItems: action.usersItems
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state, totalUsersCount: action.totalUsersCount
            }
        case SET_PORTION_NUMBER:
            return {
                ...state, portionNumber: action.portionNumber
            }
        case SET_PAGE_SIZE:
            return {
                ...state, pageSize: action.pageSize
            }
        case SET_IS_USER_FOLLOWED:
            return {
                ...state, usersItems: [...state.usersItems.map(user => {
                    return user.id === action.userId ? {...user, followed: action.followed} : user
                })]
            }
        case SET_IS_FOLLOW_FETCHING:
            return {
                ...state, isFollowFetching: action.isFetching
                    ? [...state.isFollowFetching, action.userId]
                    : state.isFollowFetching.filter(userId => userId !== action.userId)
            }
        default:
            return state;
    }
}


const setUsersItems = (usersItems) => ({type: SET_USERS_ITEMS, usersItems});

const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount});

export const setPortionNumber = (portionNumber) => ({type: SET_PORTION_NUMBER, portionNumber});

export const setPageSize = (pageSize) => ({type: SET_PAGE_SIZE, pageSize});

export const setIsUserFollowed = (userId, followed) => ({type: SET_IS_USER_FOLLOWED, userId, followed});

const setIsFollowFetching = (userId, isFetching) => ({type: SET_IS_FOLLOW_FETCHING, userId, isFetching});


export const requestUsersItems = (pageSize, portionNumber) => async (dispatch) => {
    try {
        dispatch(setUsersItems(null));
        const response = await usersAPI.getUsers(pageSize, portionNumber);

        if (!response.error) {
            dispatch(setTotalUsersCount(response.totalCount));
            dispatch(setUsersItems(response.items));
        }
    } catch (response) {
        console.log(response);
    }
}

export const follow = (userId) => async (dispatch) => {
    try {
        dispatch(followUnfollowFlow(userId, usersAPI.follow, true));
    } catch (response) {
        console.log(response);
    }
}

export const unfollow = (userId) => async (dispatch) => {
    try {
        dispatch(followUnfollowFlow(userId, usersAPI.unfollow, false));
    } catch (response) {
        console.log(response);
    }
}

const followUnfollowFlow = (userId, API, followed) => async (dispatch) => {
    dispatch(setIsFollowFetching(userId, true));
    const response = await API(userId);

    if (response.resultCode === 0) {
        dispatch(setIsUserFollowed(userId, followed));
    }
    dispatch(setIsFollowFetching(userId, false));
}

export default usersReducer;