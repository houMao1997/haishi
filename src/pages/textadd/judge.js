import React from 'react'
import {Form,Input, Button, Radio,message,Card } from 'antd'
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
      if (!err) {
        const url =global.constants.url
        $.ajax({
              type:'post',
              url:`${url}`+'/index/addpaper/addjudge',
              datatype:'json',
              data:values,
              success:(data)=>{
                data= JSON.parse(data)
                if(data.code == 1){
                  message.success(data.info);
                  this.props.form.resetFields();
                }else{
                  message.error(data.info)
                  this.props.form.resetFields();
                }

              },
              Error:(data)=>{
                message.Error('新增失败');
              }
            }
        )
      }
    });
  };

  render(){
    const formItemLayout = {
      labelCol: { span:1 },
      wrapperCol: { span: 8 },
    };
    const { getFieldDecorator } = this.props.form;
    return (
        <div>
          <Card>
          <Form  onSubmit={this.handleSubmit}>
            <Form.Item  {...formItemLayout}  label="问题">
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
            <Form.Item style={{marginLeft:'2%'}} >
              {getFieldDecorator('daan')(
                  <Radio.Group>
                    <Radio value="1">对</Radio>
                    <Radio value="0">错</Radio>
                  </Radio.Group>,
              )}
            </Form.Item>
            <Form.Item style={{marginLeft:'2%'}} >
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

export default CarouselDemo