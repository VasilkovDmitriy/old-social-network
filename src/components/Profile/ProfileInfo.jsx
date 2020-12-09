import React from 'react';
import style from "./Profile.module.css";
import {Button, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = ({
                         profileData,
                         activateEditMode,
                         onUploadPhoto,
                         userStatus,
                         updateUserStatus
                     }) => {

    const {fullName, photos, aboutMe, lookingForAJob, lookingForAJobDescription, contacts} = profileData;

    const contactsItems = Object.keys(contacts).map(key => {
        return <div key={key}>
            <b>{key}: </b>{contacts[key]}
        </div>
    })

    return <div>
        <div className={style.fullName}>
            {fullName}
        </div>
        <ProfileStatus userStatus={userStatus} updateUserStatus={updateUserStatus}/>
        <div className={style.userPhoto}>
            <img src={photos.large} alt="user avatar"/>
        </div>
        <Upload beforeUpload={onUploadPhoto}>
            <Button icon={<UploadOutlined/>}>Upload photo</Button>
        </Upload>
        <div>
            <button onClick={activateEditMode}>Edit profile</button>
        </div>
        <div>
            <b>About me: </b>{aboutMe}
        </div>
        <div>
            <b>Looking for a job: </b>{lookingForAJob ? "yes" : "no"}
        </div>
        {
            lookingForAJob &&
            <div>
                <b>Professional skills: </b>{lookingForAJobDescription}
            </div>
        }
        <div>
            <b>Contacts: </b>
            <div className={style.contactsWrapper}>
                {contactsItems}
            </div>
        </div>

    </div>
}

export default ProfileInfo;