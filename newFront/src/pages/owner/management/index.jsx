
import { Button, Card, List, Avatar } from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './style.less';
import Paragraph from 'antd/lib/skeleton/Paragraph';

const { Meta } = Card;

class Management extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'housecontent/getCollectByUserId',
      payload: {
        id: 1
      },
    });
  }

  cancelTag = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'housecontent/cancelTagHouse'
    }).then(() => {
      dispatch({
        type: 'housecontent/getCollectByUserId',
        payload: {
          id: 1
        },
      });
    })
  }

  render() {
    const { housecontent: { userCollection } } = this.props
    console.log(userCollection)
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
                    actions={[<a key="option1">详情</a>, <a key="option2" onClick={this.cancelTag()}>取消收藏</a>]}
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

export default connect(({ housecontent, loading }) => ({
  housecontent,
  loading: loading.models.housecontent,
}))(Management);
