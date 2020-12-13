import React from 'react';
import {Alert, Avatar, Button, Divider} from "antd";
import {UserOutlined} from "@ant-design/icons";
import style from './User.module.css';
import {Link} from "react-router-dom";

const User = ({user, follow, unfollow, isFollowFetching, isAuth, followingError}) => {
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

        <div className={style.userAvatar}>
            <Link to={`/profile/${user.id}`}>
                {
                    user.photos.large
                        ? <img src={user.photos.large} alt=""/>
                        : <Avatar size={120} icon={<UserOutlined/>}/>
                }
            </Link>
        </div>

        <div className={style.nameAndStatusWrapper}>
            <div className={style.userName}>
                {user.name}
            </div>

            <div className={style.userStatus}>
                {user.status && <span><b>Status: </b>{user.status}</span>}
            </div>
        </div>

        {
            followingError && isFollowFetching.some(id => id === user.id) &&
            <Alert message={followingError}
                   type="error"
                   showIcon/>
        }

        <div className={style.followedButton}>
            {
                isAuth && <FollowedButtons user={user}
                                           onFollow={onFollow}
                                           onUnfollow={onUnfollow}
                                           isDisableButton={isDisableButton}
                                           isFollowFetching={isFollowFetching}/>
            }

        </div>
    </div>
}

const FollowedButtons = ({user, onFollow, onUnfollow, isDisableButton, isFollowFetching}) => {
    return <div>
        {
            user.followed
                ? <Button onClick={(e) => onUnfollow(user.id)}
                          disabled={isDisableButton(isFollowFetching, user.id)}>
                    Unfollow
                </Button>
                : <Button onClick={(e) => onFollow(user.id)}
                          disabled={isDisableButton(isFollowFetching, user.id)}>
                    Follow
                </Button>
        }
    </div>
}

export default User;