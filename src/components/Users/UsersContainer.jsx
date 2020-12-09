import React, {useEffect} from 'react';
import Users from "./Users";
import {connect} from "react-redux";
import {getPageSize, getPortionNumber, getTotalUsersCount, getUsersItems} from "../../redux/users-selectors";
import {requestUsersItems, setPortionNumber} from "../../redux/users-reducer";

const UsersContainer = ({requestUsersItems, pageSize, portionNumber,  ...props}) => {
    useEffect(()=> {
        requestUsersItems(pageSize, portionNumber)
    }, [pageSize, portionNumber])

    return <Users pageSize={pageSize} portionNumber={portionNumber} {...props}/>
}

const mapStateToProps = (state) => ({
    usersItems: getUsersItems(state),
    totalCount: getTotalUsersCount(state),
    portionNumber: getPortionNumber(state),
    pageSize: getPageSize(state)
});


export default connect(mapStateToProps, {requestUsersItems, setPortionNumber})(UsersContainer);