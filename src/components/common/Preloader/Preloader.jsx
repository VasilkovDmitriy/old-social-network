import React from 'react';
import {Spin, Alert} from 'antd';
import style from './Preloader.module.css';

const Preloader = (props) => {
    return <Spin tip="Loading...">
        <Alert className={style.alert}/>
    </Spin>
}

export default Preloader;