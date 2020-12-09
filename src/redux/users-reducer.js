import {usersAPI} from "../api/api";

const SET_USERS_ITEMS = 'users/SET_USERS_ITEMS';
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT';
const SET_PORTION_NUMBER = 'users/SET_PORTION_NUMBER';

const initialState = {
    usersItems: [],
    totalUsersCount: null,
    portionNumberOfItems: 150,
    pageSize: 20,
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
                ...state, portionNumberOfItems: action.portionNumber
            }
        default:
            return state;
    }
}

const setUsersItems = (usersItems) => ({type: SET_USERS_ITEMS, usersItems});

const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount});

export const setPortionNumber = (portionNumber) => ({type: SET_PORTION_NUMBER, portionNumber});

export const requestUsersItems = (pageSize, portionNumber) => async (dispatch) => {
    try {
        const response = await usersAPI.getUsers(pageSize, portionNumber);

        dispatch(setTotalUsersCount(response.totalCount));
        dispatch(setUsersItems(response.items));
    } catch (response) {
        console.log(response);
    }
}

export default usersReducer;