import React from 'react';
import {Spin} from 'antd';
import style from './Preloader.module.css'

const SmallPreloader = (props) => {
    return <div className={style.smallPreloaderWrapper}>
        <Spin/>
    </div>
}

export default SmallPreloader;