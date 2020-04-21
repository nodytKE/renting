import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React from 'react';
import { Card, List, Popconfirm, Button } from 'antd';
import styles from './index.less';
import { connect } from 'dva';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'

class Tag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

    this.getHouse()
  }

  getHouse = () => {
    const { dispatch } = this.props;
    const { logincheck: { userinfo } } = this.props;
    dispatch({
      type: 'housecontent/getHouseByOwnerId',
      payload: {
        id: userinfo.length > 0 ? userinfo[0].user_id : ''
      }
    })
  }

  stopSell = (value) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'housecontent/cancelSellingHouse',
      payload: {
        houseId: value
      }
    }).then(
      () => this.getHouse()
    )
  }

  render() {
    const { housecontent: { oneOwnerHouse } } = this.props
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
              console.log(item)
              return (
                <List.Item key={item.house_id}>
                  <Card
                    hoverable
                    className={styles.card}
                    actions={[<a key="option1"><Link to={`/admin/edithouseinfo/${item.house_id}`}>编辑</Link></a>, <Popconfirm title="确认下架?" onConfirm={() => this.stopSell(item.house_id)}>
                      <a>下架</a>
                    </Popconfirm>]}
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
            <Link to="/admin/addhouse">
               <Button type="dashed" className={styles.newButton} >
                <PlusOutlined /> 新上架房屋
                </Button>
            </Link>
          </List>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default connect(({ logincheck, housecontent }) => ({
  logincheck, housecontent
}))(Tag);