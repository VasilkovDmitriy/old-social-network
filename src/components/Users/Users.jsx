import React from 'react';
import User from "./User";
import SmallPreloader from "../common/Preloader/SmallPreloader";

const Users = ({usersItems, isUsersFetching}) => {
    if (isUsersFetching) {
        return <SmallPreloader/>
    }

    const users = usersItems.map(user => {
        return <User key={user.id} user={user}/>
    })

    return <div>
        {users}
    </div>
}

export default Users;