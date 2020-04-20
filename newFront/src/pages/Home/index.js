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
      inputValue: '',
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
            <img src={logoUrlImg} alt="pic" />
          </a>
        {
          userinfo.length>0 
          ? <div className={styles.userInfo} >
            <Link className={styles.link}  to={`/admin/home/${userinfo[0].user_id}`}>欢迎你！{userinfo[0].user_name }</Link>
            <Link className={styles.link}  to={`/admin/home/${userinfo[0].user_id}`}><img src={`http://localhost:3000${userinfo[0].user_img}`}  alt="logo"/></Link>
          </div>
          :  
          <div className={styles.logReg}>
          <img src={logRegImg} alt="pic" />
          <div className={styles.logAndReg}>
            <Login />
            <Register />
          </div>
        </div>
        }
          <ul>
            <li><Link className={styles.link} to="/home">首页</Link></li>
            <li><Link className={styles.link} to="/houseinfo">租房</Link></li>
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
            <input placeholder="请输入区域、商圈或小区名开始找房" onChange={this.inputChange} />
            <div className={styles.searchBtn} >
              <Link to={{ pathname: '/houseinfo', state: { inputValue: this.state.inputValue } }}>  <img src={fangDaJImg} alt="logo"/></Link>
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