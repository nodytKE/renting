import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React from 'react';
import { Select, Button, Upload, Modal } from 'antd';
import styles from './index.less';
import { PlusOutlined } from '@ant-design/icons';

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
      fileList: [
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          uid: '-2',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          uid: '-3',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          uid: '-4',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          uid: '-5',
          name: 'image.png',
          status: 'error',
        },
      ],
    };
  }

  handleChange=()=> {

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

  handleChangeUpload = ({ fileList }) => this.setState({ fileList });

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
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
                    defaultValue={this.state.house_name}
                    onChange={this.onChangeName}
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
                    defaultValue={this.state}
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
                    defaultValue={this.state}
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
                    defaultValue={this.state}
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
                  <Select defaultValue="lucy" style={{ width: 120 }} size="large" onChange={this.handleChange}>
                    <Option value="jack">有</Option>
                    <Option value="lucy">无</Option>
                  </Select>
                </td>
              </tr>
              <tr>
                <td className={styles.tag}>朝向</td>
                <td colSpan="2" className={styles.name_inp}>
                  <Select defaultValue="lucy" style={{ width: 120 }} size="large" onChange={this.handleChange}>
                    <Option value="jack">朝南</Option>
                    <Option value="lucy">朝北</Option>
                    <Option value="">朝东</Option>
                    <Option value="">朝西</Option>
                  </Select>
                </td>
              </tr>
              <tr>
                <td className={styles.tag}>独卫</td>
                <td colSpan="2" className={styles.name_inp}>
                  <Select defaultValue="lucy" style={{ width: 120 }} size="large" onChange={this.handleChange}>
                    <Option value="jack">有</Option>
                    <Option value="lucy">无</Option>
                  </Select>
                </td>
              </tr>
              <tr>
                <td className={styles.tag}>近地铁</td>
                <td colSpan="2" className={styles.name_inp}>
                  <Select defaultValue="lucy" style={{ width: 120 }} size="large" onChange={this.handleChange}>
                    <Option value="jack">是</Option>
                    <Option value="lucy">否</Option>
                  </Select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="clearfix">
        <td className={styles.tag}>上传图片</td>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={this.state.fileList}
          onPreview={this.handlePreviewUpload}
          onChange={this.handleChangeUpload}
          className={styles.uploadPic}
        >
          {this.state.fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancelUpload}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
       </div>
        <div className={styles.submit}><Button>1111</Button></div>
      </PageHeaderWrapper>
    );
  }
}
 
export default AddHouse;