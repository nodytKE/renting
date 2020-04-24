import React, { Component } from 'react';
import styles from './HomeBox.less';
import HomeModule from './HomeModule/index';
import rentImg from '../../assets/zufang.jpg';
import serviceImg from '../../assets/fuwu.jpg';
import yezhuImg from '../../assets/yezhu.jpg'
import {Link} from 'react-router-dom'

function HomeBar(){
    return(
        <div className={styles.contentBar}>
            <Link><HomeModule src={rentImg} name='租房' detail="合租/整租" /></Link>
            <Link><HomeModule src={serviceImg} name='服务' detail="保洁/搬家/维修" /></Link>
            <Link><HomeModule src={yezhuImg} name='房东' detail='业主委托/整栋合作/发布房源' /></Link>
        </div>
    )
}
export default HomeBar;
