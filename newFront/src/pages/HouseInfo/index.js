import React, { Component } from 'react';
import styles from './HouseInfo.less';
import HouseCard from '@/components/HouseCard';
import { Pagination } from 'antd';
import HeaderFixed from '../../components/HeaderFixed';

class HouseInfo extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        current: 3,
        isLandlord: true,
        isLogin: true,
    };

    onChange = page => {
        this.setState({
            current: page,
        })
    };

    render() {
        return (
            <div>
                <HeaderFixed />
                <div className={styles.container}>
                    <div className={styles.search}>
                        <input type="text" className={styles.search_input} placeholder="请输入小区/商圈/地铁站等..." vlaue></input>
                        <a className={styles.search_btn}>开始找房</a>
                    </div>
                    <div className={styles.filter}>
                        <ul className={styles.f_box}>
                            <li className={styles.f_item}>
                                <strong className={styles.title}>类型</strong>
                                <div className={styles.opt}>
                                    <a className={styles.active}>不限</a>
                                    <a>合租</a>
                                    <a>整租</a>
                                </div>
                            </li>
                            <li className={styles.f_item}>
                                <strong className={styles.title}>位置</strong>
                                <div className={styles.opt}>
                                    <a className={styles.active}>不限</a>
                                    <a>锦江区</a>
                                    <a>青羊区</a>
                                    <a>武侯区</a>
                                    <a>高新区</a>
                                    <a>双流区</a>
                                    <a>成华区</a>
                                    <a>金牛区</a>
                                </div>
                            </li>
                            <li className={styles.f_item}>
                                <strong className={styles.title}>租金</strong>
                                <div className={styles.opt}>
                                    <a className={styles.active}>全部</a>
                                    <a>500元以下</a>
                                    <a>500-800元</a>
                                    <a>800-1000元</a>
                                    <a>1000-1500元</a>
                                    <a>1500-2000元</a>
                                    <a>2000-3000元</a>
                                    <a>3000-5000元</a>
                                    <a>5000元以上</a>
                                </div>
                            </li>
                            <li className={styles.f_item}>
                                <strong className={styles.title}>朝向</strong>
                                <div className={styles.opt}>
                                    <a className={styles.active}>不限</a>
                                    <a>东</a>
                                    <a>南</a>
                                    <a>西</a>
                                    <a>北</a>
                                </div>
                            </li>
                            <li className={styles.f_item}>
                                <strong className={styles.title}>独卫</strong>
                                <div className={styles.opt}>
                                    <a className={styles.active}>不限</a>
                                    <a>有</a>
                                    <a>无</a>
                                </div>
                            </li>
                            <li className={styles.f_item}>
                                <strong className={styles.title}>阳台</strong>
                                <div className={styles.opt}>
                                    <a className={styles.active}>不限</a>
                                    <a>有</a>
                                    <a>无</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.list}>
                        <div className={styles.list_filter}>
                            <div className={styles.option}>
                                <a className={styles.active}>默认排序</a>
                                <a className={styles.sort}>价格升序</a>
                                <a className={styles.sort}>价格降序</a>
                                <a className={styles.sort}>面积升序</a>
                                <a className={styles.sort}>面积降序</a>
                            </div>
                        </div>
                        <div className={styles.list_box}>
                            <HouseCard />
                            <HouseCard />
                            <HouseCard />
                            <HouseCard />
                            <HouseCard />
                            <HouseCard />
                        </div>
                    </div>
                    <Pagination current={this.state.current} onChange={this.onChange} total={50} defaultPageSize={3} />
                </div>
            </div>
        );
    }
}
export default HouseInfo;