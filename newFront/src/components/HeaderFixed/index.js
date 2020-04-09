import React, { Component } from 'react';
import styles from './index.less';
import logRegImg from '../../assets/logReg.png';
import Login from '../../pages/Home/Login';
import Register from '../../pages/Home/Register';

class HeaderFix extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 
        return ( 
            <div className={styles.header}>
                    <div className={styles.headerBox}>
                        <a className={styles.logo}>
                            <h5>熊熊租房</h5>
                        </a>
                        {
                            this.state.isLogin
                                ? <div className={styles.logReg}>
                                   欢迎你！xxx
                                </div>
                                : (<div className={styles.logReg}>
                                    <img src={logRegImg} />
                                    <div className={styles.logAndReg}>
                                        <Login />
                                        <Register />
                                    </div>
                                </div>)
                        }
                        <ul>
                            <li>首页</li>
                            <li>租房</li>
                            <li>服务</li>
                            <li>
                                {
                                    this.state.isLandlord
                                        ? <a className={styles.owner}>管理房源</a>
                                        : <a className={styles.owner}>成为房东</a>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
         );
    }
}
 
export default HeaderFix;