import React from 'react';
import {Avatar, Button} from "antd";
import {UserOutlined} from "@ant-design/icons";
import style from './User.module.css';
import {Link} from "react-router-dom";

const User = ({user, follow, unfollow, isFollowFetching}) => {
    const onFollow = (userId) => {
        follow(userId);
    }

    const onUnfollow = (userId) => {
        unfollow(userId);
    }

    const isDisableButton = (isFollowFetching, userId) => {
        return isFollowFetching.some(id => id === userId)
    }

    return <div className={style.usersItem}>
        <div className={style.userName}>{user.name}</div>
        <div>
            <Link to={`/profile/${user.id}`}>
                {
                    user.photos.large
                        ? <img src={user.photos.large} alt=""/>
                        : <Avatar shape="square" size={200} icon={<UserOutlined/>}/>

                }
            </Link>
        </div>
        <div><b>Status: </b>{user.status}</div>
        {
            user.followed
                ? <Button onClick={(e) => onUnfollow(user.id)} disabled={isDisableButton(isFollowFetching, user.id)}>
                    Unfollow
                </Button>
                : <Button onClick={(e) => onFollow(user.id)} disabled={isDisableButton(isFollowFetching, user.id)}>
                    Follow
                </Button>
        }
    </div>
}

export default User;