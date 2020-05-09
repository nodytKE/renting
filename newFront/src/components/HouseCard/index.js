import React, { Component } from 'react';
import styles from './index.less';
import picSrc from '../../assets/housePic.jpg'

class HouseCard extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { item } = this.props;
        return (
            <div className={styles.item} >
                <div className={styles.pic_box}>
                    <a className={styles.pic_wrap}>
                        <img src={item.house_img0 ? `http://49.233.131.99/backend/upload/${item.house_img0}` : picSrc}  alt="logo"/>
                    </a>
                </div>
                <div className={styles.info_box}>
                    <h5 className={styles.title}>
                        <a>{item.house_name}</a>
                    </h5>
                    <div className={styles.desc}>
                        <div>{item.house_area}m² | {item.house_floor}层</div>
                    </div>
                    <div className={styles.location}>
                        {item.house_location}
                    </div>
                    <div className={styles.price}>
                        <span className={styles.rmb}>¥</span>
                        <span className={styles.unit}>{item.house_price}/月</span>
                    </div>
                    <div className={styles.tag}>
                        <span className={ item.house_position ? styles.smallTag : ''}>{item.house_position}</span>
                        <span className={ item.house_balcony ? styles.smallTag : ''}>{item.house_balcony ? '有阳台' : ''}</span>
                        <span className={ item.house_toilet ? styles.smallTag : ''}>{item.house_toilet ? '有独卫' : ''}</span>
                        <span className={ item.house_subway ? styles.smallTag : ''}>{item.house_subway ? '近地铁' : ''}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default HouseCard;