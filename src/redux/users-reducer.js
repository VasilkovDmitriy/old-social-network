import {usersAPI} from "../api/api";

const SET_USERS_ITEMS = 'users/SET_USERS_ITEMS';
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT';
const SET_PORTION_NUMBER = 'users/SET_PORTION_NUMBER';
const SET_PAGE_SIZE = 'users/SET_PAGE_SIZE';
const SET_IS_USERS_FETCHING = 'users/SET_IS_USERS_FETCHING';

const initialState = {
    usersItems: [],
    totalUsersCount: null,
    portionNumber: 1,
    pageSize: 20,
    isUsersFetching: false
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
        case SET_IS_USERS_FETCHING:
            return {
                ...state, isUsersFetching: action.isFetching
            }
        default:
            return state;
    }
}

const setUsersItems = (usersItems) => ({type: SET_USERS_ITEMS, usersItems});

const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount});

export const setPortionNumber = (portionNumber) => ({type: SET_PORTION_NUMBER, portionNumber});

export const setPageSize = (pageSize) => ({type: SET_PAGE_SIZE, pageSize});

const setIsUsersFetching = (isFetching) => ({type: SET_IS_USERS_FETCHING, isFetching})

export const requestUsersItems = (pageSize, portionNumber) => async (dispatch) => {
    try {
        dispatch(setIsUsersFetching(true));
        const response = await usersAPI.getUsers(pageSize, portionNumber);

        if (!response.error) {
            dispatch(setTotalUsersCount(response.totalCount));
            dispatch(setUsersItems(response.items));
            dispatch(setIsUsersFetching(false));
        }
    } catch (response) {
        console.log(response);
    }
}

export default usersReducer;