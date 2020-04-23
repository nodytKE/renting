import { Form, Input, InputNumber, message, Button, Modal } from 'antd';
import React from 'react';
import styles from './index.less';
import { connect } from 'dva'

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

class Register extends React.Component {
    state = {
        visible: false,
        email: '',
        username: '',
        password: ''
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    setName = e => {
        this.setState({
            username: e.target.value
        })
    }

    setEmail = e => {
        this.setState({
            email: e.target.value
        })
    }

    setPassword = e => {
        this.setState({
            password: e.target.value
        })
    }

    submit = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'logincheck/register',
            payload: {
                email: this.state.email,
                name: this.state.username,
                password: this.state.password
            }
        }).then(() =>{
        const {logincheck:{registerCallBack}} =this.props;
            if(registerCallBack.status){
                message.success('注册成功')
                this.setState({
                    visible: false,
                });
            }else if(registerCallBack.code === 102){
                message.error('用户名和密码不能为空!')
            }else if(registerCallBack.code === 101){
                message.error('注册失败，邮箱格式不正确')
            } else {
                message.error('注册失败,该邮箱已被注册')
            }
        })
    }

    render() {

        return (
            <div>
                <li className={styles.register} type="primary" onClick={this.showModal}>
                    注册
                  </li>
                <Modal
                    title="注册账号"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={
                        []
                    }
                >
                    <div className={styles.container}>
                        <Form
                            {...layout}
                            name="basic"
                            initialValues={{
                                remember: true,
                            }}
                        >
                            <Form.Item
                                label="用户名"
                                name="用户名"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input value={this.state.username} onChange={this.setName} />
                            </Form.Item>

                            <Form.Item
                                label="密码"
                                name="密码"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password value={this.state.password} onChange={this.setPassword} />
                            </Form.Item>
                            <Form.Item
                                label="邮箱"
                                name="邮箱"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input value={this.state.email} onChange={this.setEmail} />
                            </Form.Item>



                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit" onClick={this.submit}>
                                    注册
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default connect(({ logincheck, loading }) => ({
    logincheck,
    loading: loading.models.logincheck
}))(Register);