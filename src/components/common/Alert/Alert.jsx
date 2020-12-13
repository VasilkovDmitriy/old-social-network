import React from 'react';
import { Alert } from 'antd';

export const AlertError = ({message}) => {
    return <Alert type="error" message={message} banner />
}