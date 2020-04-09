import React, { Component } from 'react';
import HeaderFixed from '../../components/HeaderFixed';
import pic1 from '../../assets/pic1.jpg';
import pic2 from '../../assets/pic2.jpg';
import pic3 from '../../assets/pic3.jpg';
import pic4 from '../../assets/pic4.jpg';
import HouseCard from '@/components/HouseCard';
import { Carousel } from 'antd';
import styles from './index.less';


class HouseDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <HeaderFixed />
                <div className={styles.container}>
                    <div className={styles.swiper}>
                        <Carousel 
                        autoplay 
                        effect="fade"
                        >
                            <div className={styles.slick_slide}>
                                <img src={pic1} />
                            </div>
                            <div className={styles.slick_slide}>
                                <img src={pic2} />
                            </div>
                            <div className={styles.slick_slide}>
                                <img src={pic3} />
                            </div>
                            <div className={styles.slick_slide}>
                                <img src={pic4} />
                            </div>
                        </Carousel>
                        <div className={styles.scrollid}>
                            <h2>房源简介</h2>
                            <p className={styles.sourcecode}>编号   dhjkuagshd</p>
                            <div className={styles.desc}>
                                特色房源，精致小窝，视野好，采光好，良好的通风，优美的小区环境，自然清新，舒适私密 ，健全的安保设施，近地铁，生活购物都是非常方便。管家式服务，专业级保洁，享受美好租住生活。                
                            </div>
                        </div>
                        <div className={styles.keeper}>
                            <h2>联系房东</h2>
                                <div className={styles.keeper_img}>
                                <img onerror="this.src='//image.ziroom.com/g2m1/M00/64/78/ChAFBluE_FaATtIRAAAoKZ4EKLY876.png'" src="http://pic.ziroom.com/steward_images/60019473.png" alt="" />
                                </div>
                                <div className={styles.keeper_info}>
                                    <p className={styles.n}>张三</p>
                                    <p className={styles.t}>17748135372</p>
                                </div>
                            </div>
                    </div>
                    <div className={styles.info_aside}>
                        <h1 className={styles.name}>君安卫士花园·三居室-03卧</h1>
                        <div className={styles.price}>
                            <span>￥</span>
                            <span>1130</span>
                            <span>/月</span>
                        </div>
                        <div className={styles.tags}>
                            <span className={styles.tag}>有阳台</span>
                            <span className={styles.tag}>有独卫</span>
                            <span className={styles.tag}>近地铁</span>
                        </div>
                        <div className={styles.home_info}>
                            <div className={styles.home_b}>
                                <dl> 
                                    <dd>13.9m²</dd>
                                    <dt>使用面积</dt>
                                </dl>
                                <dl> 
                                    <dd>朝南</dd>
                                    <dt>朝向</dt>
                                </dl>
                                <dl> 
                                    <dd>3室1厅</dd>
                                    <dt>户型</dt>
                                </dl>
                            </div>
                            <ul className={styles.home_o}>
                                <li>
                                    <span className={styles.la}>位置</span>
                                    <span className={styles.va}>
                                        <span className={styles.ad}>天府五街-中和</span>
                                    </span>
                                </li>
                                <li>
                                    <span className={styles.la}>楼层</span>
                                    <span className={styles.va}>
                                        <span className={styles.ad}>4/16</span>
                                    </span>
                                </li>
                                <li>
                                    <span className={styles.la}>电梯</span>
                                    <span className={styles.va}>
                                        <span className={styles.ad}>有</span>
                                    </span>
                                </li>
                                <li>
                                    <span className={styles.la}>年代</span>
                                    <span className={styles.va}>
                                        <span className={styles.ad}>2009年建成</span>
                                    </span>
                                </li>
                                <li>
                                    <span className={styles.la}>门锁</span>
                                    <span className={styles.va}>
                                        <span className={styles.ad}>智能门锁</span>
                                    </span>
                                </li>
                            </ul>
                            <div className={styles.tag}>
                                <a className={styles.tag_prelook}>
                                    收藏房屋
                                </a>
                            </div>
                            
                        </div>
                    </div>
                    <div className={styles.clearFloat} />
                    <div className={styles.isection}>
                        <h2 className={styles.recommended}>该房东其他房源</h2>
                        <div className={styles.body}>
                                <HouseCard />
                                <HouseCard />
                                <HouseCard />
                        </div>
                    </div>

                </div>
            </div>

        );
    }
}

export default HouseDetail;