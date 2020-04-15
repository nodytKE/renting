import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'dva';
import styles from './Home.less';
import logoUrlImg from '../../assets/uugai.com_1582427231866.png';
import fangDaJImg from '../../assets/fangdj.png';
import logRegImg from '../../assets/logReg.png';
import HomeBox from '../../components/HomeBox/index';
import Login from './Login';
import Register from './Register';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    }
  }

  inputChange = (e) => {

    this.setState({
      inputValue: e.target.value
    })
  }

  render() {
    const { logincheck: { userinfo } } = this.props;
    return (
      <div>

        <div className={styles.Home_head}>
          <a className={styles.logo}>
            <img src={logoUrlImg}></img>
          </a>
        {
          userinfo.length>0 
          ? <div>
            <Link to={`/admin/home/${userinfo[0].user_id}`}>11111</Link>
          </div>
          :  
          <div className={styles.logReg}>
          <img src={logRegImg} />
          <div className={styles.logAndReg}>
            <Login />
            <Register />
          </div>
        </div>
        }
          <ul>
            <li>首页</li>
            <li>租房</li>
            <li>服务</li>
            <li>
              {
                userinfo.length > 0 && userinfo[0].isOwner ?
                  <a className={styles.owner}>管理房源</a>
                  :
                  <a className={styles.owner}>成为房东</a>
              }
            </li>
          </ul>
          <p>品质租房选熊熊</p>
          <span>海量省心真房源，开始寻找你的家</span>
          <div className={styles.searchBar}>
            <input placeholder="请输入区域、商圈或小区名开始找房" onChange={this.inputChange} ></input>
            <div className={styles.searchBtn} >
              <Link to={{ pathname: '/houseinfo', state: { inputValue: this.state.inputValue } }}>  <img src={fangDaJImg}></img></Link>
            </div>
          </div>
        </div>
        <HomeBox />
      </div>
    );
  }
}

export default connect(({ logincheck, loading }) => ({
  logincheck,
  loading: loading.models.logincheck
}))(Home);