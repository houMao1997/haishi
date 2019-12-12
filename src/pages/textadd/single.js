import React from 'react'
import {
  Form,
  Input,
  Button,
  message,
  Card
} from 'antd'
import $ from 'jquery'
import '../../../src/config/global'
@Form.create()

class CarouselDemo extends React.Component {
  state = {
    current:0
  }
  componentDidMount(){

  }
  componentWillUnmount(){

  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const counlist = Object.values(values)
      const wenti = values.wenti ;
      const daan = values.daan;
      const count =counlist.slice(1,5);
      if (!err) {
        const url =global.constants.url
        $.ajax({
              type:'post',
              url:`${url}`+'/index/addpaper/theorydan',
              datatype:'json',
              data:{wenti:wenti,daan:daan,count:count},
              success:(data)=>{
                message.success('新增成功');
                this.props.form.resetFields();
              },
              Error:(data)=>{
                message.Error('新增失败');
                this.props.form.resetFields();
              }
            }
        )
      }
    });
  };

  render(){
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span:1 },
      wrapperCol: { span: 8 },
    };
    return (
        <div >
        
          <Card>
          <Form   onSubmit={this.handleSubmit}>
            <Form.Item {...formItemLayout} label="问题" >
              {getFieldDecorator('wenti', {
                rules: [{ required: true, message: '请输入你的问题' }],
              })(
                  <Input
                      autoComplete="off"
                      style={{width:"400px",marginLeft:'3%'}}
                      type="textarea"
                      placeholder="请输入问题"
                  />,
              )}
            </Form.Item>

            <Form.Item {...formItemLayout} label="选项A">
              {getFieldDecorator('countA', {
                rules: [{ required: true, message: '请输入选项A' }],
              })(
                  <Input
                      autoComplete="off"
                      style={{width:'400px',marginLeft:'3%'}}
                      type="text"
                      placeholder="请输入选项A"
                  />,
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="选项B">
              {getFieldDecorator('countB', {
                rules: [{ required: true, message: '请输入选项B' }],
              })(
                  <Input
                      autoComplete="off"
                      style={{width:'400px',marginLeft:'3%'}}
                      type="text"
                      placeholder="请输入选项B"
                  />,
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="选项C">
              {getFieldDecorator('countC', {
                rules: [{ required: true, message: '请输入选项C' }],
              })(
                  <Input
                      autoComplete="off"
                      style={{width:'400px',marginLeft:'3%'}}
                      type="text"
                      placeholder="请输入选项C"
                  />,
              )}
            </Form.Item>
            <Form.Item {...formItemLayout}  label="选项D">
              {getFieldDecorator('countD', {
                rules: [{ required: true, message: '请输入选项D' }],
              })(
                  <Input
                      autoComplete="off"
                      style={{width:'400px',marginLeft:'3%'}}
                      type="text"
                      placeholder="请输入选项D"
                  />,
              )}
            </Form.Item>
            <Form.Item {...formItemLayout}  label="答案">
              {getFieldDecorator('daan', {
                rules: [{ required: true, message: '请输入正确答案' }],
              })(
                  <Input
                      autoComplete="off"
                      style={{width:'400px',marginLeft:'3%'}}
                      type="text"
                      placeholder="请输入正确答案"
                  />,
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

export default CarouselDemo