import React from 'react';
import style from "./Profile.module.css";
import {Avatar, Button, Upload, Divider} from "antd";
import {UploadOutlined, UserOutlined} from "@ant-design/icons";
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = ({
                         profileData,
                         activateEditMode,
                         onUploadPhoto,
                         userStatus,
                         updateUserStatus,
                         isOwner,
                     }) => {

    const {fullName, photos, aboutMe, lookingForAJob, lookingForAJobDescription, contacts} = profileData;

    const contactsItems = Object.keys(contacts).map(key => {
        const contact = contacts[key];
        let contactHref = "#";

        if (contact) {
            contactHref = contact.substr(0, 4) === 'http' ? contact : `https://${contact}`;
        }

        return <div key={key}>
            <b>{key}: </b><a href={contactHref}>{contact}</a>
        </div>
    })

    return <div className={style.profileWrapper}>

        <div className={style.avatarAndButtonsWrapper}>
            <div className={style.userPhoto}>
                {
                    photos.large
                        ? <img src={photos.large} alt="user avatar"/>
                        : <Avatar shape="square" size={280} icon={<UserOutlined/>}/>
                }
            </div>
            {
                isOwner && <div className={style.profileButtons}>
                    <Upload beforeUpload={onUploadPhoto}>
                        <Button icon={<UploadOutlined/>}>Upload photo</Button>
                    </Upload>
                    <div>
                        <Button onClick={activateEditMode}>Edit profile</Button>
                    </div>
                </div>
            }
        </div>

        <div className={style.profileInformationWrapper}>
            <div className={style.fullName}>
                {fullName}
            </div>

            <ProfileStatus userStatus={userStatus} updateUserStatus={updateUserStatus} isOwner={isOwner}/>

            <Divider/>

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
    </div>
}

export default ProfileInfo;