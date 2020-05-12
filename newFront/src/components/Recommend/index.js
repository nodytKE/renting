import React, { Component } from 'react';
import styles from './index.less';
import RecommendBox from './recommendBox/index';
import {Link} from 'react-router-dom';

class Recommend extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 
        const allHouse = this.props.allHouse;
        return ( 
            <div className={styles.recommend}>
                <div className={styles.wrapper}>
                    <div className={styles.fl}>
                        <div className={styles.name}>为你推荐</div>
                        <p> 好房源那么多，为你精选，熊熊更懂你
                            <a>更多在售房源</a>
                        </p>
                    </div>
                    <div className={styles.clear} />
                    <div className={styles.content}>
                        {
                            allHouse.length > 0?
                             allHouse.map((item,index) => {
                                 return index < 4 ?
                                 <Link to ={`housedetail/${item.house_id}`} ><RecommendBox item={item} key={item.house_id} /></Link> : ''
                             })
                             : ''
                        }
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Recommend;