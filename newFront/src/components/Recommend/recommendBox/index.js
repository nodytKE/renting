import React, { Component } from 'react';
import styles from './index.less'

class recommendBox extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 
        const item = this.props.item;
        return ( 
            <div className={styles.content}>
               <img src={item.house_img0 && item.house_img0 !== 'null' ? `http://49.233.131.99/backend/upload/${item.house_img0}` : "https://image1.ljcdn.com/510100-inspection/pc1_nGR5y0R66_1.jpg.280x210.jpg"} alt="棠湖春天标准清水套三，户型方正，对中庭" />
            <span className={styles.good_icon}>
            <img src="https://img.ljcdn.com/beike/haofanglogo/1578296306747.png" />
            </span>
            <div className={styles.bottom}>
                <p className={styles.position}>
                   {item.house_location}
                </p>
                <p className={styles.position}>
                    {item.house_name}
                </p>
                <p className={styles.tips}>
        <span>{item.house_type}  {item.house_area}m²</span>
        <span className={styles.tips_price}>¥{item.house_price}/月</span>
                </p>
            </div>
            </div>
         );
    }
}
 
export default recommendBox;