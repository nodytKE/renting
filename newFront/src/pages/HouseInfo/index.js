import React, { Component } from 'react';
import styles from './HouseInfo.less';
import HouseCard from '@/components/HouseCard';
import { Pagination } from 'antd';
import HeaderFixed from '../../components/HeaderFixed';

const typeArr = [
    { name: '不限', value: 0 },
    { name: '合租', value: 1 },
    { name: '整租', value: 1 },
]

const positionArr = [
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
    { name: '东', value: 1 },
    { name: '南', value: 2 },
    { name: '西', value: 3 },
    { name: '北', value: 4 },
]

const toilet = [
    { name: '不限', value: 0 },
    { name: '有', value: 1 },
    { name: '无', value: 2 },
]

const balcony = [
    { name: '不限', value: 0 },
    { name: '有', value: 1 },
    { name: '无', value: 2 },
]

const sortType = [
    {name:'默认排序',value:0},
    {name:'价格升序',value:0},
    {name:'价格降序',value:0},
    {name:'面积升序',value:0},
    {name:'面积降序',value:0},
]

class HouseInfo extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        current: 3,
        isLandlord: true,
        isLogin: true,
        // inputValue:this.props.location.state.inputValue ? this.props.location.state.inputValue : '',
        inputValue: '',
        type: 0,
        position: 0,
        rentingPrice: 0,
        direction: 0,
        toilet: 0,
        balcony: 0,
        sort: 0,


    };

    componentDidMount() {
    }

    // 类型
    changeType = (index) => {
        this.setState({
            type:index,
        })
    }

    // 修改位置
    changePosition = (index) => {
        this.setState({
            position:index
        })
    }

    // 租金
    changeRentingPrice = (index) => {
        this.setState({
            rentingPrice:index
        })
    }

    // 朝向
    changeDirection = (index) => {
        this.setState({
            direction:index
        })
    }

    // 独卫
    changeToilet = (index) =>{
        this.setState({
            toilet:index
        })
    }

    // 阳台
    changeBalcony = (index) => {
        this.setState({
            balcony:index
        })
    }

    changeSort =(index) => {
        this.setState({
            sort:index
        })
    }

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
                                    {
                                        typeArr.map((item, index) => {
                                            return <a 
                                            className={index === this.state.type ? styles.active : ''}
                                            onClick={()=>this.changeType(index)}
                                            >{item.name}</a>
                                        })
                                    }
                                </div>
                            </li>
                            <li className={styles.f_item}>
                                <strong className={styles.title}>位置</strong>
                                <div className={styles.opt}>
                                    {
                                        positionArr.map((item, index) => {
                                            return <a className={index === this.state.position ? styles.active : ''}
                                            onClick={()=>this.changePosition(index)}
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
                                            onClick={()=>this.changeRentingPrice(index)}
                                            >{item.name}</a>
                                        })
                                    }
                                </div>
                            </li>
                            <li className={styles.f_item}>
                                <strong className={styles.title}>朝向</strong>
                                <div className={styles.opt}>
                                {
                                        direction.map((item, index) => {
                                            return <a className={index === this.state.direction ? styles.active : ''}
                                            onClick={()=>this.changeDirection(index)}
                                            >{item.name}</a>
                                        })
                                    }
                                </div>
                            </li>
                            <li className={styles.f_item}>
                                <strong className={styles.title}>独卫</strong>
                                <div className={styles.opt}>
                                {
                                        toilet.map((item, index) => {
                                            return <a className={index === this.state.toilet ? styles.active : ''}
                                            onClick={()=>this.changeToilet(index)}
                                            >{item.name}</a>
                                        })
                                    }
                                </div>
                            </li>
                            <li className={styles.f_item}>
                                <strong className={styles.title}>阳台</strong>
                                <div className={styles.opt}>
                                {
                                        balcony.map((item, index) => {
                                            return <a className={index === this.state.balcony ? styles.active : ''}
                                            onClick={()=>this.changeBalcony(index)}
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
                                  sortType.map((item,index)=>{
                                  return <a className={index === this.state.sort ? styles.active : ''} onClick={()=>this.changeSort(index)}>{item.name}</a>
                                  })
                              }
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