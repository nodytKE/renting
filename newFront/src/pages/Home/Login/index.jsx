import { Modal, Button, Form, Input, message, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React from 'react';
import { connect } from 'dva'
import styles from './index.less';

class Login extends React.Component {
  state = {
    visible: false,
    email: '',
    password: '',
    tel: ''
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {

    const { dispatch } = this.props;
    dispatch({
      type: 'logincheck/fetch',
      payload: {
        email: this.state.email,
        password: this.state.password
      }
    }).then(() => {
      const { logincheck: { userinfo } } = this.props;
      if (userinfo.code === 103) {
        message.error('账号或密码错误！')
      } else {
        message.success('登录成功')
      }
    })
  };

  inputEmail = (e) => {
    this.setState({
      email: e.target.value
    })
  }

  inputPassword = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  // 忘记密码之后


  inputTel = e => {
    this.setState({
      tel: e.target.value,
    })
  }


  handleSend = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'logincheck/sendEmail',
      payload: {
        email: this.state.email,
        tel: this.state.tel
      }
    }).then(() => {
      const { logincheck: { sendCallback } } = this.props;
      if (sendCallback.code === 1101) {
        message.success('密码发送成功')
      }
      if (sendCallback.code === 1012) {
        message.error('手机号或邮箱不存在')
      }
    })
  }

  render() {
    return (
      <div className={styles.global}>
        <li className={styles.login} type="primary" onClick={this.showModal}>
          登录
        </li>
        {/* 登录啥的 */}
        <Modal
          title="登录账号"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={
            []
          }
        >
          <Form
            name="normal_login"
            className="login-form"
            initialvalues={{
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
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入邮箱" onChange={this.inputEmail} />
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
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.handleOk}>
                    登录
        </Button>
                </Form.Item>
              </Form.Item>
              <a className="login-form-forgot" href="" >
                忘记密码？
        </a>
              <div>
                <input
                  type="text"
                  className={styles.ui_inp}
                  onChange={this.inputTel}
                  placeholder='输入注册时候的手机号'
                />
                <Button
                  className={styles.submit}
                  type="primary"
                  onClick={this.handleSend}
                >将密码发送至邮箱</Button>
              </div>
            </Form.Item>

          </Form>
        </Modal>
      </div>
    );
  }
}

export default connect(({ logincheck, loading }) => ({
  logincheck,
  loading: loading.models.logincheck
}))(Login);