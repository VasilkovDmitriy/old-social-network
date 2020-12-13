import React from 'react';
import {Form, Input, Button, Checkbox, Divider, Alert} from 'antd';
import TextArea from "antd/es/input/TextArea";
import style from './ProfileEditForm.module.css';


const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

const ProfileEditForm = ({profileData, deactivateEditMode, editProfileFormError, exitWithoutSaving}) => {

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

            <Divider>Main</Divider>
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
                <Divider>Contacts</Divider>
                {contactsFormsItems}
            </div>

            <div className={style.alertWrapper}>
                {
                    editProfileFormError &&
                    <Alert message={editProfileFormError}
                           type="error"
                           showIcon/>
                }
            </div>

            <div className={style.formButtonsWrapper}>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">Save</Button>
                </Form.Item>
                <Button onClick={exitWithoutSaving}>Back</Button>
            </div>
        </Form>

    </div>
}

export default ProfileEditForm;