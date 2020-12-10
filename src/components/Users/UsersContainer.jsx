import React, {useEffect} from 'react';
import Users from "./Users";
import {connect} from "react-redux";
import {
    getIsUsersFetching,
    getPageSize,
    getPortionNumber,
    getTotalUsersCount,
    getUsersItems
} from "../../redux/users-selectors";
import {requestUsersItems, setPageSize, setPortionNumber} from "../../redux/users-reducer";
import {Pagination} from "antd";

const UsersContainer = ({
                            requestUsersItems,
                            usersItems,
                            pageSize,
                            portionNumber,
                            setPageSize,
                            setPortionNumber,
                            totalCount,
                            isUsersFetching
                        }) => {
    useEffect(() => {
        requestUsersItems(pageSize, portionNumber)
    }, [pageSize, portionNumber, requestUsersItems])

    const onPaginatorChange = (newPortionNumber, newPageSize) => {
        if (newPortionNumber !== portionNumber) {
            setPortionNumber(newPortionNumber);
        }
        if (newPageSize !== pageSize) {
            setPageSize(newPageSize);
        }
    }

    return <div>
        <Pagination showQuickJumper onChange={onPaginatorChange} current={portionNumber}
                    pageSize={pageSize}
                    total={totalCount}/>
        <Users usersItems={usersItems} isUsersFetching={isUsersFetching}/>
    </div>

}

const mapStateToProps = (state) => ({
    usersItems: getUsersItems(state),
    totalCount: getTotalUsersCount(state),
    portionNumber: getPortionNumber(state),
    pageSize: getPageSize(state),
    isUsersFetching: getIsUsersFetching(state)
});


export default connect(mapStateToProps,
    {requestUsersItems, setPortionNumber, setPageSize})(UsersContainer);