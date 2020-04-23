import React, { Component } from 'react';
import styles from './HouseInfo.less';
import HouseCard from '@/components/HouseCard';
import { Pagination } from 'antd';
import HeaderFixed from '../../components/HeaderFixed';
import { connect } from 'dva';
import { RANK_RULE } from '../../constant/constant'

const areaArr = [
    { name: '不限', value: 0 },
    { name: '锦江区', value: 1 },
    { name: '青羊区', value: 2 },
    { name: '武侯区', value: 3 },
    { name: '双流区', value: 4 },
    { name: '成华区', value: 5 },
    { name: '金牛区', value: 6 },

]

const rentPrice = [
    { name: '全部', value: 0 },
    { name: '500元以下', value: 1 },
    { name: '500-800元', value: 2 },
    { name: '800-1000元', value: 3 },
    { name: '1000-1500元', value: 4 },
    { name: '1500-2000元', value: 5 },
    { name: '2000-3000元', value: 6 },
    { name: '3000-5000元', value: 7 },
    { name: '5000元以上', value: 8 },
]



const direction = [
    { name: '不限', value: 0 },
    { name: '朝东', value: 1 },
    { name: '朝南', value: 2 },
    { name: '朝西', value: 3 },
    { name: '朝北', value: 4 },
]

const toilet = [
    { name: '不限', value: 9 },
    { name: '有', value: 1 },
    { name: '无', value: 0 },
]

const balcony = [
    { name: '不限', value: 9 },
    { name: '有', value: 1 },
    { name: '无', value: 0 },
]

const subway = [
    { name: '不限', value: 9 },
    { name: '是', value: 1 },
    { name: '否', value: 0 },
]

const sortType = [
    { name: '默认排序', value: '0' },
    { name: '价格升序', value: 'RANK_INCREASE_BY_PRICE' },
    { name: '价格降序', value: 'RANK_DECREASE_BY_PRICE' },
    { name: '面积升序', value: 'RANK_INCREASE_BY_AREA' },
    { name: '面积降序', value: 'RANK_DECREASE_BY_AREA' },
]

class HouseInfo extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        current: 1,
        inputValue: '',
        isLandlord: true,
        isLogin: true,
        // inputValue:this.props.location.state.inputValue ? this.props.location.state.inputValue : '',
        area: '不限',
        rentingPrice: 0,
        direction: '不限',
        toilet: 9,
        subway: 9,
        balcony: 9,
        sort: '0',
        inputInfo:''
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'housecontent/getHouse'
        })
    }

    setInputValue = e => {
        this.setState({
            inputValue: e.target.value,
        })
    }

    // 修改位置
    changeArea = (item) => {
        this.setState({
            area: item.name
        })
    }

    // 租金
    changeRentingPrice = (index) => {
        this.setState({
            rentingPrice: index
        })
    }

    // 朝向
    changeDirection = (value) => {
        this.setState({
            direction: value
        })
    }

    // 独卫
    changeToilet = (index) => {
        this.setState({
            toilet: index
        })
    }

    // 阳台
    changeBalcony = (index) => {
        this.setState({
            balcony: index
        })
    }

    // 地铁
    changeSubway = (index) => {
        this.setState({
            subway: index
        })
    }

    changeSort = (value) => {
        this.setState({
            sort: value
        })
    }

    onChange = page => {
        this.setState({
            current: page,
        })
    };

    render() {
        const { housecontent: { allHouse } } = this.props;

        // 输入框查找
        const filterInputValue = singleHouse => {
            return (singleHouse.house_name.includes(this.state.inputInfo)
                || this.state.inputInfo === ''
                || singleHouse.house_location.includes(this.state.inputInfo)
            )
        }

        // 位置筛选
        const filterArea = singleHouse => {
            return this.state.area !== '不限' ? singleHouse.house_location.includes(this.state.area) : singleHouse
        }

        // 租金筛选

        const filterRentingPrice = singleHouse => {
            switch (this.state.rentingPrice) {
                case 0:
                    return singleHouse;
                case 1:
                    return singleHouse.house_price < 500;
                case 2:
                    return singleHouse.house_price >= 500 && singleHouse.house_price < 800;
                case 3:
                    return singleHouse.house_price >= 800 && singleHouse.house_price < 1000;
                case 4:
                    return singleHouse.house_price >= 1000 && singleHouse.house_price < 1500;
                case 5:
                    return singleHouse.house_price >= 1500 && singleHouse.house_price < 2000;
                case 6:
                    return singleHouse.house_price >= 2000 && singleHouse.house_price < 3000;
                case 7:
                    return singleHouse.house_price >= 3000 && singleHouse.house_price < 5000;
                case 8:
                    return singleHouse >= 5000;
                default:
                    break;
            }
        }

        // 朝向筛选

        const filterPosition = singleHouse => {
            return this.state.direction !== '不限' ? singleHouse.house_position === this.state.direction : singleHouse
        }

        // 有无独卫

        const filterToilet = singleHouse => {
            return this.state.toilet !== 9 ? singleHouse.house_toilet === this.state.toilet : singleHouse
        }

        // 阳台

        const filterBalcony = singleHouse => {
            return this.state.balcony !== 9 ? singleHouse.house_balcony === this.state.balcony : singleHouse
        }

        // 近地铁
        const filterSubway = singleHouse => {
            return this.state.subway !== 9 ? singleHouse.house_subway === this.state.subway : singleHouse
        }

        // 升降序
        const sort = (a,b) => {
            if(this.state.sort === RANK_RULE.RANK_INCREASE_BY_PRICE){
                return a.house_price - b.house_price
            } 
            if (this.state.sort === RANK_RULE.RANK_DECREASE_BY_PRICE){
                return b.house_price - a.house_price
            }
            if (this.state.sort === RANK_RULE.RANK_INCREASE_BY_AREA){
                return a.house_area - b.house_area
            }
            if (this.state.sort === RANK_RULE.RANK_DECREASE_BY_AREA){
                return b.house_area - a.house_area
            }
            return ''
        }

        const goSearch =() => {
            this.setState({
                inputInfo:this.state.inputValue
            })
        }

        let houseAfterScreening = [];

        if (allHouse.length > 0) {

            houseAfterScreening = allHouse
                .filter(filterArea)
                .filter(filterRentingPrice)
                .filter(filterPosition)
                .filter(filterToilet)
                .filter(filterBalcony)
                .filter(filterSubway)
                .filter(filterInputValue)
                .sort(sort)
        }
        return (
            <div>
                <HeaderFixed />
                <div className={styles.container}>
                    <div className={styles.search}>
                        <input type="text" className={styles.search_input} placeholder="请输入小区/商圈/地铁站等..." onChange={this.setInputValue} value={this.state.inputValue} />
                        <a className={styles.search_btn} onClick={goSearch}>开始找房</a>
                    </div>
                    <div className={styles.filter}>
                        <ul className={styles.f_box}>
                            <li className={styles.f_item}>
                                <strong className={styles.title}>位置</strong>
                                <div className={styles.opt}>
                                    {
                                        areaArr.map((item) => {
                                            return <a className={item.name === this.state.area ? styles.active : ''}
                                                onClick={() => this.changeArea(item)}
                                                key={item.name}
                                            >{item.name}</a>
                                        })
                                    }
                                </div>
                            </li>
                            <li className={styles.f_item}>
                                <strong className={styles.title}>租金</strong>
                                <div className={styles.opt}>
                                    {
                                        rentPrice.map((item, index) => {
                                            return <a className={index === this.state.rentingPrice ? styles.active : ''}
                                                onClick={() => this.changeRentingPrice(index)}
                                                key={item.name}
                                            >{item.name}</a>
                                        })
                                    }
                                </div>
                            </li>
                            <li className={styles.f_item}>
                                <strong className={styles.title}>朝向</strong>
                                <div className={styles.opt}>
                                    {
                                        direction.map((item) => {
                                            return <a className={ item.name=== this.state.direction ? styles.active : ''}
                                                key={item.name}
                                                onClick={() => this.changeDirection(item.name)}
                                            >{item.name}</a>
                                        })
                                    }
                                </div>
                            </li>
                            <li className={styles.f_item}>
                                <strong className={styles.title}>独卫</strong>
                                <div className={styles.opt}>
                                    {
                                        toilet.map((item) => {
                                            return <a className={item.value === this.state.toilet ? styles.active : ''}
                                                onClick={() => this.changeToilet(item.value)}
                                                key={item.name}
                                            >{item.name}</a>
                                        })
                                    }
                                </div>
                            </li>
                            <li className={styles.f_item}>
                                <strong className={styles.title}>近地铁</strong>
                                <div className={styles.opt}>
                                    {
                                        subway.map((item) => {
                                            return <a className={item.value === this.state.subway ? styles.active : ''}
                                                onClick={() => this.changeSubway(item.value)}
                                                key={item.name}
                                            >{item.name}</a>
                                        })
                                    }
                                </div>
                            </li>
                            <li className={styles.f_item}>
                                <strong className={styles.title}>阳台</strong>
                                <div className={styles.opt}>
                                    {
                                        balcony.map((item) => {
                                            return <a className={item.value === this.state.balcony ? styles.active : ''}
                                                onClick={() => this.changeBalcony(item.value)}
                                                key={item.name}
                                            >{item.name}</a>
                                        })
                                    }
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.list}>
                        <div className={styles.list_filter}>
                            <div className={styles.option}>
                                {
                                    sortType.map((item) => {
                                        return <a className={item.value === this.state.sort ? styles.active : ''}
                                            key={item.name}
                                            onClick={() => this.changeSort(item.value)} >{item.name}</a>
                                    })
                                }
                            </div>
                        </div>
                        <div className={styles.list_box}>
                            {
                                //   allHouse.length>0 ?
                                houseAfterScreening.length > 0 ?
                                    houseAfterScreening.map((item,index) => {
                                        return index >= 9*(this.state.current-1) && index <= 9*(this.state.current)-1 ?
                                        <HouseCard item={item} key={item.house_id} /> : ''
                                    })
                                    : ''
                            }
                        </div>
                    </div>
                    <Pagination 
                    current={this.state.current} 
                    onChange={this.onChange} 
                    total={houseAfterScreening.length} 
                    pageSize={9} 
                    hideOnSinglePage
                    />
                </div>
            </div>
        );
    }
}
export default connect(({ housecontent }) => ({
    housecontent
}))(HouseInfo);