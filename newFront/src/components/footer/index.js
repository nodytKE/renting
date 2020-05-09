import React, { Component } from 'react';
import styles from './index.less';
import {Table} from 'antd'

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 
        return ( 
            <div className={styles.footer_content}>
                <div className={styles.wrapper}>
                    <div className={styles.left_part}>
                        <ul>
                            <li>关于平台</li>
                            <li>平台介绍</li>
                            <li>公司介绍</li>
                            <li>联系我们</li>
                            <li>友情链接</li>
                        </ul>
                        <ul>
                            <li>房源交易</li>
                            <li>发布房源需求</li>
                            <li>发布房源信息</li>
                            <li>房源价值评估</li>
                        </ul>
                        <ul>
                            <li>服务交易</li>
                            <li>发布服务需求</li>
                            <li>开店赚钱</li>
                        </ul>
                        <ul>
                            <li>交易保障</li>
                            <li>需求方保障</li>
                            <li>信用查询</li>
                            <li>曝光台</li>
                        </ul>
                        <ul>
                            <li>帮助中心</li>
                            <li>住房交易问题</li>
                            <li>服务交易问题</li>
                            <li>意见反馈</li>
                        </ul>

                        
                    </div>
                    <div className={styles.bottom}>
                        <span> Copyright © 2017-2020 熊熊租房 版权所有 </span>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Footer;

