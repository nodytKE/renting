import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React from 'react';
import { Card, List, Button } from 'antd';
import styles from './index.less';
import { connect } from 'dva';
import { PlusOutlined } from '@ant-design/icons';

class Tag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'housecontent/getHouseByOwnerId',
      payload: {
        id: 1
      }
    })
  }

  render() {
    const { housecontent: { oneOwnerHouse } } = this.props
    console.log(oneOwnerHouse)
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
            dataSource={oneOwnerHouse}
            renderItem={item => {
              return (
                <List.Item key={item.id}>
                  <Card
                    hoverable
                    className={styles.card}
                    actions={[<a key="option1">详情</a>, <a key="option2" >取消收藏</a>]}
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
            <List>
              <Button type="dashed" className={styles.newButton}>
                <PlusOutlined /> 新上架房屋
                </Button>
            </List>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default connect(({ housecontent }) => ({
  housecontent
}))(Tag);