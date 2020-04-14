import { Modal, Button, Form, Input, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './index.less';
import React from 'react';
import {connect} from 'dva'

class Login extends React.Component {
  state = { 
    visible: false,
    email:'',
    password:''
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });

    const {dispatch} = this.props;
    dispatch({
      type:'logincheck/fetch',
      payload:{
        email:this.state.email,
        password:this.state.password
      }
    })
  };

  inputEmail = (e) => {
    this.setState({
      email:e.target.value
    })
  }

  inputPassword =(e) => {
    this.setState({
      password:e.target.value
    })
  }
  
    onFinish = values => {
      console.log('Received values of form: ', values);
    };
  
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div className={styles.global}>
        <li className={styles.login} type="primary" onClick={this.showModal}>
          登录
        </li>
        <Modal
          title="登录账号"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={
            []
          }
        >
            <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={this.onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: '请输入你的邮箱!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入邮箱" onChange={this.inputEmail}/>
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: '请输入密码!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="请输入密码"
          onChange={this.inputPassword}
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.handleOk}>
          登录
        </Button>
        没有账号？<a href="">立即注册!</a>
      </Form.Item>
    </Form>
        </Modal>
      </div>
    );
  }
}

export default connect(({logincheck,loading})=>({
  logincheck,
  loading:loading.models.logincheck
}))(Login);