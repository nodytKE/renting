import React, { Component } from 'react';
import styles from './index.less';
import picSrc from '../../assets/housePic.jpg'

class HouseCard extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className={styles.item}>
                <div className={styles.pic_box}>
                    <a className={styles.pic_wrap}>
                        <img src={picSrc}></img>
                    </a>
                </div>
                <div className={styles.info_box}>
                    <h5 className={styles.title}>
                        <a>合租·冰江合成</a>
                    </h5>
                    <div className={styles.desc}>
                        <div>6m² | 4/39层</div>
                    </div>
                    <div className={styles.location}>
                        天府三街
                    </div>
                    <div className={styles.price}>
                        <span className={styles.rmb}>¥</span>
                        <span className={styles.unit}>630/月</span>
                    </div>
                    <div className={styles.tag}>
                        <span>朝南</span>
                        <span>有阳台</span>
                        <span>独卫</span>
                        <span>近地铁</span>
                    </div>
                    <div className={styles.tips}>
                        联系方式:小明
                    </div>
                </div>
            </div>
         );
    }
}
 
export default HouseCard;