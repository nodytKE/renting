import React from 'react';
import styles from './Home.less';
import logoUrlImg from '../../assets/uugai.com_1582427231866.png';
import fangDaJImg from '../../assets/fangdj.png';
import logRegImg from '../../assets/logReg.png';
import HomeBox from '../../components/HomeBox/index';
import Login from './Login';
import Register from './Register'

function Home() {
  return (
    <div>
      
      <div className={styles.Home_head}>
        <a className={styles.logo}>
          <img src={logoUrlImg}></img>
        </a>
        <div className={styles.logReg}>
          <img src={logRegImg}></img>
         <div className={styles.logAndReg}>
         <Login />
         <Register />
         </div>
        </div>
        <ul>
          <li>首页</li>
          <li>租房</li>
          <li>服务</li>
          <li>
            <a className={styles.owner}>成为房东</a>
          </li>
        </ul>

        <p>品质租房选熊熊</p>
        <span>海量省心真房源，开始寻找你的家</span>
        <div className={styles.searchBar}>
          <input placeholder="请输入区域、商圈或小区名开始找房"></input>
          <div className={styles.searchBtn}>
            <img src={fangDaJImg}></img>
          </div>
        </div>
      </div>
      <HomeBox />
    </div>
  );
}

export default Home;
