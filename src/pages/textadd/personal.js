import React from 'react'
import {Form,  Input, Button,message,Upload,Card,Icon } from 'antd'
import $ from 'jquery'
import '../../../src/config/global'
import _ from 'lodash'
const Dragger = Upload.Dragger;
@Form.create()

 class About extends React.Component{
    state={
        previewVisible: false,
        previewImage: '',
        imgList: [],
        url: '',
        urlli:'',
        show:false
    }
    componentDidMount(){
      
    }
    componentWillUnmount(){
     
    }
  handleSubmit = e => {
    let {urlli} = this.state;
    const url1 =global.constants.url
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
        const counlist = Object.values(values) 
        const wenti = values.wenti ;
        const daan = values.daan;
        const count =counlist.slice(2,10); 
      if (!err) {
        $.ajax({
          type:'post',
          url:`${url1}`+'/index/addpaper/kantujianda',
          //  url:'http://192.168.1.155/index/addpaper/kantujianda',
          dataType:'json',
          data:{wenti:wenti,daan:daan,urlli:urlli},
          success:(data)=>{
            // data = JSON.parse(data)
            if(data.code == 1){
              message.success(data.info)
              this.props.form.resetFields();
              const {fileList} = this.state;
              const list  =fileList.splice(0,fileList.length)
              this.setState({
                urlli:'',
                show:false,
                fileList:list
              })
            }else{
              message.error(data.info)
              this.props.form.resetFields();  
            }
          },
          Error:(data)=>{
             message.error('新增失败');
          }
        }
        )
      }
    });
  };
  handleChange = ({ file, fileList }) => {
    console.log(file)
   if(file.response){
    this.setState({
        urlli:file.response.info,
        show:true,
        fileList
      })
   }
  };
  handleCancel = () => this.setState({ previewVisible: false });
  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };
  checkImageWH(file) {
    return new Promise(function(resolve, reject) {
      let filereader = new FileReader();
      filereader.onload = e => {
        let src = e.target.result;
        const image = new Image();
        image.onload = function() {
          // 获取图片的宽高，并存放到file对象中
          file.width = this.width;
          file.height = this.height;
          resolve();
        };
        image.onerror = reject;
        image.src = src;
      };
      filereader.readAsDataURL(file);
    });
  };

  render(){
    const { TextArea } = Input;
    const that = this;   
    const { getFieldDecorator } = this.props.form;
    const url =global.constants.url;
    const {show} = this.state
    const formItemLayout = {
      labelCol: { span:1 },
      wrapperCol: { span: 8 },
    };
    const formItemLayout1 = {
      labelCol: { span:2 },
      wrapperCol: { span: 8 },
    };
    return (
      <div>
        <Card>
       
      <Form  onSubmit={this.handleSubmit}>
      <Form.Item {...formItemLayout1}  label="请上传图片">
          {getFieldDecorator('img',{
          })(
 
     <Upload
     name="img"
     listType="picture"
     className="upload-list-inline"
     showUploadList={this.state.show}
     action="http://haishiteacher.chinadingao.com/index/addpaper/img"
     onChange={this.handleChange}
   >
   <Button>
     <Icon type="upload" /> 上传图片
   </Button>
   </Upload>



          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="问题">
          {getFieldDecorator('wenti',{
            rules: [{ required: true, message: '请输入问题' }],
          })(
            <TextArea autoComplete="off"
            style={{width:"600px",height:'200px',marginLeft:'3%'}}
            placeholder='请输入问题'/>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="参考答案">
          {getFieldDecorator('daan',{
            rules: [{ required: true, message: '请输入参考答案' }],
          })(
            <TextArea autoComplete="off"
            style={{width:"600px",height:'200px',marginLeft:'3%'}}
            placeholder='请输入参考答案'/>
          )}
        </Form.Item>
            <Form.Item style={{marginLeft:'15%'}}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
        </Card>
       
      </div>
    )
  }
}
const styles = {
  body:{
    background:'#fff',
    height:'53rem',
    overflowY:'hidden',
    padding:'20px 20px',
  }
}
export default About