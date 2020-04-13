import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React from 'react';
import { Spin, Avatar, Upload, message, Cascader  } from 'antd';
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

 const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

function onChange(value) {
  console.log(value);
}


class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      loading:true,
      picLoading:false,
     };
  }

  componentDidMount(){
    const {dispatch} = this.props
    setTimeout(()=>{
      this.setLoading()
    },3000)

    dispatch({
      type:'logincheck/fetch',
      // payload:{
      //   email:'22822@qq.com',
      //   password:'123456'
      // }
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
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
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
             <input type="text" style={{width:180}} className={styles.ui_inp} />
           </td>
         </tr>
         <tr>
           <td className={styles.tag}>邮箱</td>
           <td colSpan="2" className={styles.name_inp}>
             <input type="text" className={styles.ui_inp} />
           </td>
         </tr>
         <tr>
           <td className={styles.tag}>居住地</td>
           <td colSpan="2" className={styles.name_inp}>
           <Cascader options={options} size="large" onChange={onChange} placeholder="请选择居住地" />
           </td>
         </tr>
         <tr>
           <td className={styles.tag}>密码</td>
           <td colSpan="2" className={styles.name_inp}>
             <a className={styles.changePass}>修改密码</a>
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
 
export default connect(({ userinfo, loading}) => ({
  userinfo,
  loading: loading.models.userinfo
}))(UserInfo);
