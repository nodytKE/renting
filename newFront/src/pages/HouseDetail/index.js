import React, { Component } from 'react';
import HeaderFixed from '../../components/HeaderFixed';
import HouseCard from '@/components/HouseCard';
import { Carousel, message } from 'antd';
import { connect } from 'dva';
import Footer from '@/components/footer';
import { Link } from 'react-router-dom';
import styles from './index.less';



class HouseDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            house_id: props.match.params.id,
        }
    }

    componentDidMount() {
        this.getHouseDetail()
        this.getSomeHouse()
        this.getOwnerInfo()
    }

    getHouseDetail = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "housecontent/getHouseDetail",
            payload: {
                id: this.state.house_id
            }
        })
    }

    getSomeHouse = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'housecontent/getSomeHouse',
            payload: {
                id: this.state.house_id
            }
        })
    }

    getOwnerInfo = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'housecontent/getOwnerInfoByHouseId',
            payload: {
                id: this.state.house_id
            }
        })
    }

    onTag = () => {
        const { dispatch } = this.props;
        const { housecontent: { houseinfo } } = this.props;
        const { logincheck: { userinfo } } = this.props;
        dispatch({
            type: 'housecontent/collectHouse',
            payload: {
                houseId: houseinfo[0].house_id,
                userId: userinfo[0].user_id,
            }
        }).then(() => {
            const { housecontent: { houseCollectCallback } } = this.props;
            if (houseCollectCallback.status) {
                message.success('收藏成功！')
            } else if (houseCollectCallback.code === 7) {
                message.error('已在收藏列表中，请勿重复收藏')
            } else {
                message.error('收藏失败!')
            }
        })
    }

    render() {
        const { housecontent: { houseinfo, ownerInfo, someHouse } } = this.props;
        const { logincheck: { userinfo } } = this.props;

        return (
            <div>
                <HeaderFixed />
                <div className={styles.container}>
                    <div className={styles.swiper}>
                        <Carousel
                            autoplay
                            effect="fade"
                        >
                            {
                                houseinfo.length > 0 && houseinfo[0].house_img0 ?
                                    <div className={styles.slick_slide}>
                                        <img src={`http://49.233.131.99/backend/upload/${houseinfo[0].house_img0}`} alt='图片' />
                                    </div>
                                    : ''
                            }
                            {
                                houseinfo.length > 0 && houseinfo[0].house_img1 ?
                                    <div className={styles.slick_slide}>
                                        <img src={`http://49.233.131.99/backend/upload/${houseinfo[0].house_img0}`} alt='图片' />
                                    </div>
                                    : ''
                            }
                            {
                                houseinfo.length > 0 && houseinfo[0].house_img2 ?
                                    <div className={styles.slick_slide}>
                                        <img src={`http://49.233.131.99/backend/upload/${houseinfo[0].house_img0}`} alt='图片' />
                                    </div>
                                    : ''
                            }
                            {
                                houseinfo.length > 0 && houseinfo[0].house_img3 ?
                                    <div className={styles.slick_slide}>
                                        <img src={`http://49.233.131.99/backend/upload/${houseinfo[0].house_img0}`} alt='图片' />
                                    </div>
                                    : ''
                            }
                        </Carousel>
                        <div className={styles.scrollid}>
                            <h2>房源简介</h2>
                            <p className={styles.sourcecode}>编号   {houseinfo.length > 0 ? houseinfo[0].house_id : ''}</p>
                            <div className={styles.desc}>
                                {houseinfo.length > 0 ? houseinfo[0].house_description : ''}
                            </div>
                        </div>
                        <div className={styles.keeper}>
                            <h2>联系房东</h2>
                            <div className={styles.keeper_img}>
                                <img src={ownerInfo.length > 0 ? `http://49.233.131.99/backend/upload/${ownerInfo[0].user_img}` : ''} alt="" />
                            </div>
                            <div className={styles.keeper_info}>
                                <p className={styles.n}>{ownerInfo.length > 0 ? ownerInfo[0].user_name : ''}</p>
                                <p className={styles.t}>{ownerInfo.length > 0 ? ownerInfo[0].user_tel : ''}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.info_aside}>
                        <h1 className={styles.name}>{houseinfo.length > 0 ? houseinfo[0].house_name : ''}</h1>
                        <div className={styles.price}>
                            <span>￥</span>
                            <span>{houseinfo.length > 0 ? houseinfo[0].house_price : ''}</span>
                            <span>/月</span>
                        </div>
                        <div className={styles.tags}>
                            <span className={styles.tag}>{houseinfo.length > 0 && houseinfo[0].house_balcony ? '有阳台' : ''}</span>
                            <span className={styles.tag}>{houseinfo.length > 0 && houseinfo[0].house_toilet ? '有独卫' : ''}</span>
                            <span className={styles.tag}>{houseinfo.length > 0 && houseinfo[0].house_subway ? '近地铁' : ''}</span>
                        </div>
                        <div className={styles.home_info}>
                            <div className={styles.home_b}>
                                <dl>
                                    <dd>{houseinfo.length > 0 ? houseinfo[0].house_area : ''}m²</dd>
                                    <dt>使用面积</dt>
                                </dl>
                                <dl>
                                    <dd>{houseinfo.length > 0 ? houseinfo[0].house_position : ''}</dd>
                                    <dt>朝向</dt>
                                </dl>
                                <dl>
                                    <dd>{houseinfo.length > 0 ? houseinfo[0].house_type : ''}</dd>
                                    <dt>户型</dt>
                                </dl>
                            </div>
                            <ul className={styles.home_o}>
                                <li>
                                    <span className={styles.la}>位置</span>
                                    <span className={styles.va}>
                                        <span className={styles.ad}>{houseinfo.length > 0 ? houseinfo[0].house_location : ''}</span>
                                    </span>
                                </li>
                                <li>
                                    <span className={styles.la}>楼层</span>
                                    <span className={styles.va}>
                                        <span className={styles.ad}>{houseinfo.length > 0 ? houseinfo[0].house_floor : ''}</span>
                                    </span>
                                </li>
                                <li>
                                    <span className={styles.la}>电梯</span>
                                    <span className={styles.va}>
                                        <span className={styles.ad}>{houseinfo.length > 0 && houseinfo[0].house_balcony ? '有' : '无'}</span>
                                    </span>
                                </li>
                                <li>
                                    <span className={styles.la}>年代</span>
                                    <span className={styles.va}>
                                        <span className={styles.ad}>{houseinfo.length > 0 ? houseinfo[0].house_buildYear : ''}</span>
                                    </span>
                                </li>
                                <li>
                                    <span className={styles.la}>门锁</span>
                                    <span className={styles.va}>
                                        <span className={styles.ad}>{houseinfo.length > 0 ? houseinfo[0].house_lock : ''}</span>
                                    </span>
                                </li>
                            </ul>
                            <div className={styles.tag} style={{ background: userinfo.length > 0 ? '#ff961e' : 'rgb(243, 243, 243)' }}>
                                <a
                                    className={styles.tag_prelook}
                                    onClick={userinfo.length > 0 ? this.onTag : ''}
                                >
                                    收藏房屋
                                </a>
                            </div>

                        </div>
                    </div>
                    <div className={styles.clearFloat} />
                    <div className={styles.isection}>
                        <h2 className={styles.recommended}>该房东所有房源</h2>
                        <div className={styles.body}>
                            {

                                someHouse.map(item => {
                                    return  <Link to ={`${item.house_id}` } onClick={()=>{
                                            this.setState({
                                                house_id: item.house_id
                                            },()=>{
                                                this.getHouseDetail()
                                            })
                                        }}><HouseCard item={item} key={item.house_id}  /></Link>
                                })
                            }
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

        );
    }
}

export default connect(({ housecontent, logincheck }) => ({
    housecontent,
    logincheck
}))(HouseDetail);