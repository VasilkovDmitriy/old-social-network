import React from 'react';
import {Form, Input, Button, Checkbox, Upload} from 'antd';
import TextArea from "antd/es/input/TextArea";
import style from './ProfileEditForm.module.css';

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

const ProfileEditForm = ({profileData, deactivateEditMode, profileSaveErrorMessage}) => {

    const {contacts} = profileData;

    const initialValues = {...contacts, ...profileData};

    const contactsFormsItems = Object.keys(contacts).map(key => {
        return <Form.Item label={key} name={`${key}`} key={key}>
            <Input/>
        </Form.Item>
    })

    const onFinish = (formData) => {
        const {fullName, aboutMe, lookingForAJob, lookingForAJobDescription, ...contacts} = formData;

        deactivateEditMode({contacts: {...contacts}, fullName, aboutMe, lookingForAJob, lookingForAJobDescription});
    };

    return <div>
        <Form
            {...layout}
            name="profile"
            initialValues={{...initialValues}}
            onFinish={onFinish}>

            <Form.Item label="Full name" name="fullName"
                       rules={[{required: true, message: 'Please input your username!'}]}>
                <Input/>
            </Form.Item>

            <Form.Item label="About me" name="aboutMe">
                <TextArea/>
            </Form.Item>

            <Form.Item {...tailLayout} name="lookingForAJob" valuePropName="checked">
                <Checkbox>Looking for a job</Checkbox>
            </Form.Item>

            <Form.Item label="Professional skills" name="lookingForAJobDescription">
                <TextArea/>
            </Form.Item>

            <div>
                <b>Contacts: </b>
                {contactsFormsItems}
            </div>
            {
                profileSaveErrorMessage &&
                <div className={style.errorMessage}>
                    {profileSaveErrorMessage}
                </div>
            }
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">Save</Button>
            </Form.Item>
        </Form>
    </div>

}

export default ProfileEditForm;