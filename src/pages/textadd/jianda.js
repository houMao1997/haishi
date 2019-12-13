import React from 'react'
import {Form, Input, Button,message,Card } from 'antd'
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
      const wenti = values.wenti;
      const daan = values.daan ;
      //const daan1 = daan[5];
      const count =counlist.slice(1,5); 
      if (!err) {
        const url =global.constants.url
        $.ajax({
          type:'post',
          url:`${url}`+'/index/addpaper/jianda ',
          datatype:'json',
          data:{...values},
          success:(data)=>{
            data = JSON.parse(data)
            if(data.code == 1){
              message.success('新增成功');
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
    const { getFieldDecorator } = this.props.form;
    const { TextArea } = Input;
    const formItemLayout = {
      labelCol: {
        xs: { span:2 },
        sm: { span: 1},
      },
      wrapperCol: {
        xs: { span:15 },
        sm: { span: 8 },
      },
    };

    return (
      <div >
     <Card>
         <Form onSubmit={this.handleSubmit}>
         <Form.Item {...formItemLayout} label="问题">
          {getFieldDecorator('wenti', {
            rules: [{ required: true, message: '请输入你的问题' }],
          })(
            <Input
              autoComplete="off"
              style={{width:'400px',marginLeft:'3%'}}
              type="textarea"
              placeholder="请输入问题"
            />,
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="答案">
          {getFieldDecorator('daan', {
             initialValue: null,
            rules: [{ required: true, message: '请输入答案' }],
          })(
            
            <TextArea autoComplete="off"
            style={{width:"600px",height:'200px',marginLeft:'3%'}}
            placeholder='请输入答案'/>
    //         <TextArea
    //   placeholder="Autosize height with minimum and maximum number of lines"
    //   autosize={{ minRows: 2, maxRows: 6 }}
    // />
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

export default CarouselDemo