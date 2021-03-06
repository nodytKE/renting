import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React from 'react';
import { Select, Button, Upload, Modal, message } from 'antd';
import styles from './index.less';
import { PlusOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import reqwest from 'reqwest';

const { Option } = Select;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class AddHouse extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      previewVisible: false,
      previewImage: '',
      houseName: '',
      price: '',
      balcony: 0,
      toilet: 0,
      subway: 0,
      area: '',
      position: '',
      type: '',
      location: '',
      floor: '',
      elevator: 0,
      description: '',
      buildYear: '',
      lock: 0,
      fileList: [],
    };
  }

  onChangeHouseName = e => {
    this.setState({
      houseName: e.target.value
    })
  }

  onChangePrice = e => {
    this.setState({
      price: e.target.value
    })
  }

  onChangeBalcony = value => {
    this.setState({
      balcony: value
    })
  }

  onChangeToilet = value => {
    this.setState({
      toilet: value
    })
  }

  onChangeSubway = value => {
    this.setState({
      subway: value
    })
  }

  onChangeArea = e => {
    this.setState({
      area: e.target.value
    })
  }

  onChangePosition = value => {
    this.setState({
      position: value
    })
  }

  onChangeType = e => {
    this.setState({
      type: e.target.value
    })
  }

  onChangeLocation = e => {
    this.setState({
      location: e.target.value
    })
  }

  onChangefloor = e => {
    this.setState({
      floor: e.target.value
    })
  }

  onChangeElevator = value => {
    this.setState({
      elevator: value
    })
  }


  onChangebuildYear = e => {
    this.setState({
      buildYear: e.target.value
    })
  }

  onChangeLock = value => {
    this.setState({
      lock: value
    })
  }

  handleCancelUpload = () => this.setState({ previewVisible: false });

  handlePreviewUpload = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  customRequest = () => {
    const { description, fileList, lock, houseName, price, balcony, toilet, subway, area, position, type, location, floor, elevator, buildYear } = this.state;

    const formData = new FormData();
    formData.append('pic1', fileList[0]);
    formData.append('pic2', fileList[1]);
    formData.append('pic3', fileList[2]);
    formData.append('pic4', fileList[3]);
    formData.append('userId', 1)
    formData.append('houseName', houseName);
    formData.append('price', price);
    formData.append('balcony', balcony);
    formData.append('toilet', toilet);
    formData.append('subway', subway);
    formData.append('area', area);
    formData.append('position', position);
    formData.append('location', location);
    formData.append('floor', floor);
    formData.append('type', type);
    formData.append('elevator', elevator);
    formData.append('description', description);
    formData.append('lock', lock);
    formData.append('buildYear', buildYear);

    reqwest({
      name: "files",
      url:'http://49.233.131.99/backend/setimg',
      // url: 'http://localhost:3000/setimg',
      method: 'post',
      processData: false,
      data: formData,
      dataType: 'JSON',
      // contentType: 'multipart/form-data',
      success: () => {
        message.success('上架成功');
        this.props.history.push('/admin/tag')
      }
    })
  }


  handleAdd = () => {
    this.customRequest()
  }

  render() {
    const { previewVisible, previewImage, description, fileList, lock, houseName, price, balcony, toilet, subway, area, position, type, location, floor, elevator, buildYear } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
  

    return (
      <PageHeaderWrapper className={styles.main}>
        <div className={styles.allcontainer}>
          <div className={styles.tableArea}>
            <table>
              <tbody>
                <tr>
                  <td className={styles.tag}>房源名称</td>
                  <td colSpan="2" className={styles.name_inp}>
                    <input
                      type="text"
                      style={{ width: 180 }}
                      className={styles.ui_inp}
                      defaultValue={houseName}
                      onChange={this.onChangeHouseName}
                    />
                  </td>
                </tr>
                <tr>
                  <td className={styles.tag}>定价</td>
                  <td colSpan="2" className={styles.name_inp}>
                    <input
                      type="text"
                      style={{ width: 80 }}
                      className={styles.ui_inp}
                      defaultValue={price}
                      onChange={this.onChangePrice}
                    />  /月
           </td>
                </tr>
                <tr>
                  <td className={styles.tag}>房屋面积</td>
                  <td colSpan="2" className={styles.name_inp}>
                    <input
                      type="text"
                      style={{ width: 80 }}
                      className={styles.ui_inp}
                      defaultValue={area}
                      onChange={this.onChangeArea}
                    />  m²
           </td>
                </tr>
                <tr>
                  <td className={styles.tag}>楼层</td>
                  <td colSpan="2" className={styles.name_inp}>
                    <input
                      type="text"
                      placeholder="建议以xx/xx形式显示"
                      style={{ width: 180 }}
                      className={styles.ui_inp}
                      defaultValue={floor}
                      onChange={this.onChangefloor}
                    />
                  </td>
                </tr>
                <tr>
                  <td className={styles.tag}>房屋类型</td>
                  <td colSpan="2" className={styles.name_inp}>
                    <input
                      type="text"
                      style={{ width: 180 }}
                      className={styles.ui_inp}
                      defaultValue={type}
                      onChange={this.onChangeType}
                      placeholder="（一室一厅、两室一厅等）"
                    />
                  </td>
                </tr>
                <tr>
                  <td className={styles.tag}>位置</td>
                  <td colSpan="2" className={styles.name_inp}>
                    <input
                      type="text"
                      style={{ width: 180 }}
                      className={styles.ui_inp}
                      defaultValue={location}
                      onChange={this.onChangeLocation}
                    />
                  </td>
                </tr>
                <tr>
                  <td className={styles.tag}>修建年代</td>
                  <td colSpan="2" className={styles.name_inp}>
                    <input
                      type="text"
                      style={{ width: 180 }}
                      className={styles.ui_inp}
                      defaultValue={buildYear}
                      onChange={this.onChangebuildYear}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <table>
              <tbody>
                <tr>
                  <td className={styles.tag}>阳台</td>
                  <td colSpan="2" className={styles.name_inp}>
                    <Select onChange={this.onChangeBalcony} defaultValue={`${balcony}`} style={{ width: 120 }} size="large" >
                      <Option value="1">有</Option>
                      <Option value="0">无</Option>
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td className={styles.tag}>朝向</td>
                  <td colSpan="2" className={styles.name_inp}>
                    <Select onChange={this.onChangePosition} defaultValue={`${position}`} style={{ width: 120 }} size="large" >
                      <Option value="朝南">朝南</Option>
                      <Option value="朝北">朝北</Option>
                      <Option value="朝东">朝东</Option>
                      <Option value="朝西">朝西</Option>
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td className={styles.tag}>独卫</td>
                  <td colSpan="2" className={styles.name_inp}>
                    <Select onChange={this.onChangeToilet} defaultValue={`${toilet}`} style={{ width: 120 }} size="large" >
                      <Option value="1">有</Option>
                      <Option value="0">无</Option>
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td className={styles.tag}>近地铁</td>
                  <td colSpan="2" className={styles.name_inp}>
                    <Select onChange={this.onChangeSubway} defaultValue={`${subway}`} style={{ width: 120 }} size="large" >
                      <Option value="1">是</Option>
                      <Option value="0">否</Option>
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td className={styles.tag}>电梯</td>
                  <td colSpan="2" className={styles.name_inp}>
                    <Select onChange={this.onChangeElevator} defaultValue={`${elevator}`} style={{ width: 120 }} size="large" >
                      <Option value="1">有</Option>
                      <Option value="0">无</Option>
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td className={styles.tag}>门锁</td>
                  <td colSpan="2" className={styles.name_inp}>
                    <Select onChange={this.onChangeLock} defaultValue={`${lock}`} style={{ width: 120 }} size="large" >
                      <Option value="1">智能门锁</Option>
                      <Option value="0">普通门锁</Option>
                    </Select>
                  </td>
                </tr>
                <tr>
                  <td className={styles.tag}>描述</td>
                  <td colSpan="2" className={styles.name_inp}>
                    <input
                      type="text"
                      style={{ width: 180 }}
                      className={styles.ui_inp}
                      defaultValue={description}
                      onChange={this.onChangeDescription}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="clearfix">
            <td className={styles.tag}>上传图片</td>
            <Upload

              // action="http://localhost:3000/setimg"
              // method="POST"
              listType="picture-card"
              // fileList={this.state.fileList}
              onPreview={this.handlePreviewUpload}
              className={styles.uploadPic}
              onRemove ={(file) => {
                this.setState((state) => {
                  const index = state.fileList.indexOf(file);
                  const newFileList = state.fileList.slice();
                  newFileList.splice(index, 1);
                  return {
                    fileList: newFileList,
                  };
                });}
              }
              beforeUpload ={
                (file) => {
                  this.setState(state => ({
                    fileList: [...state.fileList, file],
                  }));
                  return false;
                }
              }
            >
              {this.state.fileList.length >= 4 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancelUpload}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </div>
        </div>
        <div className={styles.submit}><Button type="primary" onClick={this.handleAdd}>添加</Button></div>
      </PageHeaderWrapper>
    );
  }
}

export default connect(({ housecontent, logincheck }) => ({
  housecontent, logincheck
}))(AddHouse);