import React from 'react';
import {Avatar, Button} from "antd";
import {UserOutlined} from "@ant-design/icons";
import style from './User.module.css';

const User = ({user}) => {
    return <div className={style.usersItem}>
        <div className={style.userName}>{user.name}</div>
        <div>
            {
                user.photos.large
                    ? <img src={user.photos.large} alt=""/>
                    : <Avatar shape="square" size={200} icon={<UserOutlined/>}/>

            }
        </div>
        <div><b>Status: </b>{user.status}</div>
        {
            user.followed
            ? <Button>Unfollow</Button>
            : <Button>Follow</Button>
        }
    </div>
}

export default User;