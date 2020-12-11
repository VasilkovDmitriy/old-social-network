import React, {useState, useEffect} from 'react';
import {Input} from 'antd';

const ProfileStatus = ({userStatus, updateUserStatus, isOwner}) => {
    const [status, setStatus] = useState(userStatus);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        setStatus(userStatus);
    }, [userStatus])

    const activateEditMode = () => {
        if (isOwner) {
            setEditMode(true);
        }
    }

    const deactivateEditMode = () => {
        updateUserStatus(status);
        setEditMode(false);
    }

    const onStatusChange = (event) => {
        setStatus(event.target.value);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            deactivateEditMode();
        }
    }

    return <div>
        {
            editMode
                ? <Input onBlur={deactivateEditMode}
                         onChange={onStatusChange}
                         onKeyPress={handleKeyPress}
                         value={status}
                         placeholder="Your status"/>
                : <span onClick={activateEditMode}><b>Status: </b>{status || "------"}</span>
        }
    </div>
}

export default ProfileStatus;