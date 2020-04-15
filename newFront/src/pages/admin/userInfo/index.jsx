import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React from 'react';
import { Spin, Avatar, Upload, message, Cascader, Button  } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './index.less';
import { connect } from 'dva';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

 // 级联选择器

 

class UserInfo extends React.Component {
  constructor(props) {
  
    super(props);
    this.state = { 
      loading:true,
      picLoading:false,
      name:'',
      email:'',
      location:'',
      password:'',
      isOn:0
     };
  }

// 获取用户信息
  componentDidMount(){
    setTimeout(()=>{
      this.setLoading()
    },3000)

    this.getInfo()
  
  }
  

  // 临时用
  getInfo=() => {
    const {dispatch} = this.props

    dispatch({
      type:'logincheck/fetch',
      payload:{
        email:'2222@qq.com',
        password:'123456'
      }
    }).then(()=>{
        const { logincheck: { userinfo } } = this.props;
    userinfo.length>0 ?
    this.setState({
      name:userinfo[0].user_name,
      email:userinfo[0].user_email,
      location:userinfo[0].user_location,
      password:userinfo[0].user_password,
    }): ''
  console.log(userinfo)
    })
  
  }
 
  // 上传头像
  handleChange = info => {
    if(info.file.status === 'uploading') {
      this.setState({ picLoading: true });
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          picLoading: false,
        }),
      );
    }
  }

  setLoading = () => {
    this.setState({
      loading:false,
    })
  }

  onChangeName =e => {
    this.setState({
      name:e.target.value
    })
  }

  onChangeEmail = e => {
    this.setState({
      email:e.target.value
    })
  }

  onChangeLocation = e => {
    this.setState({
      location:e.target.location
    })
  }

  changePassOk=() => {
    this.setState({
      isOn:1,
    })
  }

  changePassNo= () => {
    this.setState({
      isOn:0
    })
  }

  onChangePassword = e => {
    this.setState({
      password:e.target.value
    })
  }

  // 提交更改
  submitChange =() => {
    const {dispatch} = this.props;
    dispatch({
      type:'logincheck/setuserInfo',
      payload:{
        email:this.state.email,
        name:this.state.name,
        location:this.state.location,
        password:this.state.password,
        id:1
      }
    })
  }

  render() { 
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
  

    return ( 
      <PageHeaderWrapper className={styles.main}>
      <div className={styles.avatar}>
      
        <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        method="POST"
        action="http://localhost:3000/admin/uploadhome"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
      <span className={styles.info}>上传头像</span>
      </div>
     <table>
       <tbody>
         <tr>
           <td className={styles.tag}>昵称</td>
           <td colSpan="2" className={styles.name_inp}>
             <input 
             type="text" 
             style={{width:180}} 
             className={styles.ui_inp} 
            defaultValue={this.state.name} 
            onChange={this.onChangeName}
             />
           </td>
         </tr>
         <tr>
           <td className={styles.tag}>邮箱</td>
           <td colSpan="2" className={styles.name_inp}>
             <input 
             type="text" 
             className={styles.ui_inp} 
             defaultValue={this.state.email}
             onChange={this.onChangeEmail}
             />
           </td>
         </tr>
         <tr>
           <td className={styles.tag}>居住地</td>
           <td colSpan="2" className={styles.name_inp}>
           <input 
             type="text" 
             className={styles.ui_inp} 
             defaultValue={this.state.location}
             onChange={this.onChangeLocation}
             />
           </td>
         </tr>
         <tr>
           <td className={styles.tag}>密码</td>
           <td colSpan="2" className={styles.name_inp}>
             <a className={styles.changePass} style={{display: this.state.isOn ? 'none' :'block'}} onClick={this.changePassOk}>修改密码</a>
             <input
              type="password"
              className={styles.ui_inp} 
              style={{display: this.state.isOn? 'block' : 'none'}}
              defaultValue={this.state.password}
              onChange={this.onChangePassword}
              onBlur={this.changePassNo}
             />
           </td>
         </tr>
         <tr>
           <td/>
          <td>
          <Button 
            className={styles.submit}
            onClick={this.submitChange}
           >保存更改</Button>
          </td>
         </tr>
       </tbody>
     </table>
      <div
        style={{
          paddingTop: 100,
          textAlign: 'center',
        }}
      >
        <Spin spinning={this.state.loading} size="large" />
      </div>

    </PageHeaderWrapper>
     );
  }
}
 
export default connect(({ logincheck, loading}) => ({
  logincheck,
  loading: loading.models.userinfo
}))(UserInfo);
