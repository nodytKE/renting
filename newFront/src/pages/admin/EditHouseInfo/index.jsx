import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React from 'react';
import { Select, Button, Upload, Modal } from 'antd';
import styles from './index.less';
import { PlusOutlined } from '@ant-design/icons';
import {connect} from 'dva'

const { Option } = Select;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class EditHouseInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      previewVisible: false,
      previewImage: '',
      houseName:'',
      price:'',
      balcony:0,
      toilet:0,
      subway:0,
      area:'',
      position:'',
      type:'',
      location:'',
      floor:'',
      elevator:0,
      buildYear:'',
      lock:0,
      description:'',
      fileList: [
      ],
    };
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

  componentDidMount(){
    this.getHouseInfoByHouseId()
  }

  getHouseInfoByHouseId = () => {
    const {dispatch} = this.props;
    

    dispatch({
      type:'housecontent/getHouseDetail',
      payload:{
        id:this.props.match.params.id
    }
    }).then(() => {
      const {housecontent: {houseinfo}} = this.props
      houseinfo.length >0 ?
      this.setState({
        houseName:houseinfo[0].house_name,
        price:houseinfo[0].house_price,
        balcony:houseinfo[0].house_balcony,
        toilet:houseinfo[0].house_toilet,
        subway:houseinfo[0].house_subway,
        area:houseinfo[0].house_area,
        position:houseinfo[0].house_position,
        type:houseinfo[0].house_type,
        location:houseinfo[0].house_location,
        floor:houseinfo[0].house_floor,
        elevator:houseinfo[0].house_elevator,
        buildYear:houseinfo[0].house_buildYear,
        lock:houseinfo[0].house_lock,
        description:houseinfo[0].house_description,
        fileList:[
          {
            uid:'-1',
            url:houseinfo[0].house_img0,
          },
          {
            uid:'-2',
            url:houseinfo[0].house_img1,
          },
          {
            uid:'-3',
            url:houseinfo[0].house_img2,
          },
          {
            uid:'-4',
            url:houseinfo[0].house_img3,
          }
        ]
      }):''
    })
  }

  handleChangeUpload = ({ fileList }) => this.setState({ fileList });

  onChangeHouseName = e => {
    this.setState({
      houseName:e.target.value
    })
  }

  onChangePrice = e => {
    this.setState({
      price:e.target.value
    })
  }

  onChangeBalcony = value => {
    this.setState({
      balcony:value
    })
  }

  onChangeToilet = value => {
    this.setState({
      toilet:value
    })
  }

  onChangeSubway = value => {
    this.setState({
      subway:value
    })
  }

  onChangeArea= e => {
    this.setState({
      area:e.target.value
    })
  }

  onChangePosition = value => {
    this.setState({
      position:value
    })
  }

  onChangeType = e => {
    this.setState({
      type:e.target.value
    })
  }

  onChangeLocation= e => {
    this.setState({
      location:e.target.value
    })
  }

  onChangefloor = e => {
    this.setState({
      floor:e.target.value
    })
  }

  onChangeElevator = value => {
    console.log(value)
    this.setState({
      elevator:value
    })
  }

  onChangebuildYear = e => {
    this.setState({
      buildYear:e.target.value
    })
  }

  onChangeLock = value => {
    this.setState({
      lock:value
    })
  }

  onChangeDescription = value=> {
    this.setState({
      description:value
    })
  }

  handleReset=()=>{
    const {dispatch} = this.props;
    dispatch({
      type:'housecontent/resetHouseInfo',
      payload:{
        id:this.state.id,
        houseName:this.state.houseName,
        price:this.state.price,
        balcony:this.state.balcony,
        toilet:this.state.toilet,
        subway:this.state.subway,
        area:this.state.area,
        position:this.state.position,
        type:this.state.type,
        location:this.state.location,
        floor:this.state.floor,
        elevator:this.state.elevator,
        buildYear:this.state.buildYear,
        lock:this.state.lock,
        description:this.state.description,
        img0:this.state.fileList[0].url,
        img1:this.state.fileList[1].url,
        img2:this.state.fileList[2].url,
        img3:this.state.fileList[3].url,
      }
    })
}

  render() { 
    const { previewVisible, previewImage,description, fileList,lock, houseName, price,balcony,toilet,subway,area,position,type,location,floor,elevator,buildYear } = this.state;
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
                 <Select defaultValue={`${balcony}`} value={`${balcony}`} style={{ width: 120 }} size="large" >
                   <Option onClick={()=>this.onChangeBalcony(1)} value="1">有</Option>
                   <Option  onClick={()=>this.onChangeBalcony(0)} value="0">无</Option>
                 </Select>
               </td>
             </tr>
             <tr>
               <td className={styles.tag}>朝向</td>
               <td colSpan="2" className={styles.name_inp}>
                 <Select defaultValue={`${position}`} value={`${position}`} style={{ width: 120 }} size="large" >
                   <Option onClick={()=>this.onChangePosition("朝南")} value="朝南">朝南</Option>
                   <Option onClick={()=>this.onChangePosition("朝北")} value="朝北">朝北</Option>
                   <Option onClick={()=>this.onChangePosition("朝东")} value="朝东">朝东</Option>
                   <Option onClick={()=>this.onChangePosition("朝西")} value="朝西">朝西</Option>
                 </Select>
               </td>
             </tr>
             <tr>
               <td className={styles.tag}>独卫</td>
               <td colSpan="2" className={styles.name_inp}>
                 <Select defaultValue={`${toilet}`} value={`${toilet}`} style={{ width: 120 }} size="large" >
                   <Option onClick={()=>this.onChangeToilet(1)} value="1">有</Option>
                   <Option onClick={()=>this.onChangeToilet(0)} value="0">无</Option>
                 </Select>
               </td>
             </tr>
             <tr>
               <td className={styles.tag}>近地铁</td>
               <td colSpan="2" className={styles.name_inp}>
                 <Select  defaultValue={`${subway}`} value={`${subway}`}  style={{ width: 120 }} size="large" >
                   <Option onClick={()=>this.onChangeSubway(1)} value="1">是</Option>
                   <Option onClick={()=>this.onChangeSubway(0)} value="0">否</Option>
                 </Select>
               </td>
             </tr>
             <tr>
               <td className={styles.tag}>电梯</td>
               <td colSpan="2" className={styles.name_inp}>
                 <Select defaultValue={`${elevator}`} value={`${elevator}`}  style={{ width: 120 }} size="large" >
                   <Option onClick={()=>this.onChangeElevator(1)} value="1">有</Option>
                   <Option onClick={()=>this.onChangeElevator(0)} value="0">无</Option>
                 </Select>
               </td>
             </tr>
             <tr>
               <td className={styles.tag}>门锁</td>
               <td colSpan="2" className={styles.name_inp}>
                 <Select  defaultValue={`${lock}`} value={`${lock}`} style={{ width: 120 }} size="large" onChange={this.handleChange}>
                   <Option onClick={()=>this.onChangeLock(1)} value="1">智能门锁</Option>
                   <Option onClick={()=>this.onChangeLock(0)} value="0">普通门锁</Option>
                 </Select>
               </td>
             </tr>
             <tr>
               <td className={styles.tag}>描述</td>
               <td colSpan="2" className={styles.name_inp}>
               <input
                   type="text"
                   style={{ width: 180}}
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
       {/* <td className={styles.tag}>上传图片</td> */}
       {/* <Upload
         action="https://localhost:3000/changeimg"
         listType="picture-card"
         fileList={this.state.fileList}
         onPreview={this.handlePreviewUpload}
         onChange={this.handleChangeUpload}
         className={styles.uploadPic}
       >
         {this.state.fileList.length >= 4 ? null : uploadButton}
       </Upload> */}
       <Modal visible={previewVisible} footer={null} onCancel={this.handleCancelUpload}>
         <img alt="example" style={{ width: '100%' }} src={previewImage} />
       </Modal>
     </div>
      </div>
       <div className={styles.submit}><Button type="primary" onClick={this.handleReset}>修改</Button></div>
     </PageHeaderWrapper>
    );
  }
}

export default connect(({housecontent})=> ({
  housecontent
}))(EditHouseInfo);