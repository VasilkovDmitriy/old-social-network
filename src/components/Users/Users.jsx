import React from 'react';
import User from "./User";

const Users = ({usersItems}) => {
    const users = usersItems.map(user => {
        return <User key={user.id} user={user}/>
    })


    return <div>
        {users}
    </div>
}

export default Users;