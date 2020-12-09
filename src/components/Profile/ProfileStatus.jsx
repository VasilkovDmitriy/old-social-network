import React, {useState, useEffect} from 'react';
import {Input} from 'antd';

const ProfileStatus = ({userStatus, updateUserStatus}) => {
    const [status, setStatus] = useState(userStatus);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        setStatus(userStatus);
    }, [userStatus])

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        updateUserStatus(status);
        setEditMode(false);
    }

    const onStatusChange = (event) => {
        //debugger;
        console.log(event.target.value);
        setStatus(event.target.value);
    }

    return <div>
        {
            editMode
                ? <Input onBlur={deactivateEditMode} onChange={onStatusChange} value={status}
                         placeholder="Your status"/>
                : <span onClick={activateEditMode}>{status || "------"}</span>
        }
    </div>
}

export default ProfileStatus;