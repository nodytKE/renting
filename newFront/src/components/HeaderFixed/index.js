import React, { Component } from 'react';
import styles from './index.less';
import logRegImg from '../../assets/logReg.png';
import Login from '../../pages/Home/Login';
import Register from '../../pages/Home/Register';
import { Link } from 'react-router-dom';
import { connect } from 'dva';

class HeaderFix extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { logincheck: { userinfo } } = this.props;
        return (
            <div className={styles.header}>
                <div className={styles.headerBox}>
                    <a className={styles.logo}>
                        <h5>熊熊租房</h5>
                    </a>
                    {
                       userinfo.length>0
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
                        <li><Link to="/home">首页</Link></li>
                        <li><Link to="/houseinfo">租房</Link></li>
                        <li><Link to="/service">服务</Link></li>
                        <li>
                            {
                                userinfo.length > 0 && userinfo[0].isOwner ?
                                    <a className={styles.owner}>管理房源</a>
                                    :
                                    <a className={styles.owner}>成为房东</a>
                            }
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default connect(({ logincheck, loading }) => ({
    logincheck,
    loading: loading.models.logincheck
}))(HeaderFix);