
import { Button, Card, Popconfirm, List, Avatar } from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './style.less';
import Paragraph from 'antd/lib/skeleton/Paragraph';
import { Link } from 'react-router-dom'

const { Meta } = Card;

class Management extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const { logincheck: { userinfo } } = this.props;
    dispatch({
      type: 'housecontent/getCollectByUserId',
      payload: {
        id: userinfo.length > 0 ? userinfo[0].user_id : ''
      },
    });
  }

  cancelTag = (value) => {
    const { dispatch } = this.props;
    const { logincheck: { userinfo } } = this.props;
    dispatch({
      type: 'housecontent/cancelTagHouse',
      payload: {
        houseId: value,
        userId: userinfo.length > 0 ? userinfo[0].user_id : ''
      }
    }).then(() => {
      dispatch({
        type: 'housecontent/getCollectByUserId',
        payload: {
          id: userinfo.length > 0 ? userinfo[0].user_id : ''
        },
      });
    })
  }

  render() {
    const { housecontent: { userCollection } } = this.props
    return (
      <PageHeaderWrapper  >
        <div className={styles.cardList}>
          <List
            rowKey="id"
            // loading={loading}
            grid={{
              gutter: 24,
              lg: 3,
              md: 2,
              sm: 1,
              xs: 1,
            }}
            dataSource={userCollection}
            renderItem={item => {
              return (
                <List.Item key={item.id}>
                  <Card
                    hoverable
                    className={styles.card}
                    actions={[<Link to={{ pathname: '/housedetail', state: { houseId: item.house_id } }}><a key="option1">详情</a></Link>, <Popconfirm title="取消收藏?" onConfirm={() => this.cancelTag(item.house_id)}><a >取消收藏</a></Popconfirm>]}
                  >
                    <Card.Meta
                      avatar={<img src='' />}
                      title={<a>{item.house_name}</a>}
                      description={
                        <div>
                          <div>地址：{item.house_location}</div>
                          <div>面积：{item.house_area}m²</div>
                          <div className={styles.description}>描述：{item.house_description}</div>
                        </div>
                      }
                    />
                  </Card>
                </List.Item>
              );
            }}
          />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default connect(({ housecontent, logincheck }) => ({
  housecontent,
  logincheck
}))(Management);
