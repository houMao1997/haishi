import React, { Component } from 'react'
import $ from 'jquery'
import {Form,  Button, message,InputNumber,Card } from 'antd'
import '../../../src/config/global'
@Form.create()
class componentName extends Component {
    state={
        data:''
    }

    componentDidMount(){
      
        // const a ={"panduannum":10,"panduanfenshu":"10","lilundannum":5,"lilundanfenshu":"10","lilunduonum":10,"lilunduofenshu":"20","kantunum":10,"kantufenshu":"50"}
        const url =global.constants.url
        $.ajax({
            type:'get',
            url:`${url}`+'/index/Addpaper/paperset',
            datatype:'json',
            success:(abc)=>{
                abc = JSON.parse(abc);       
            this.setState({
                data:abc.info,
            })
            },
            Error:(data)=>{
              // message.Error('新增失败');
            }
          })
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
              url:`${url}`+'/index/Addpaper/paperset',
              datatype:'json',
              data:values,
              success:(data)=>{
                this.setState({
                  data
                })
                data = JSON.parse(data); 
                 if(data.code == 1){
                    message.success(data.info);
                    // this.props.form.resetFields();
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
    render() {
        const { getFieldDecorator } = this.props.form;
        // const {data}= this.state;
        const formItemLayout = {
          labelCol: { span:2},
          wrapperCol: { span:5 },
        };
        return (
            <div>
              <Card>
          <Form  onSubmit={this.handleSubmit}>
         <Form.Item {...formItemLayout} label="判断题数量">
          {getFieldDecorator('panduannum', {
               initialValue:this.state.data.panduannum,
            rules: [{ required: true, message: '请输入判断题数量' }],
          })(
            <InputNumber size="large" precision={0}  style={{width:'400px',marginLeft:'3%'}} min={0}  placeholder="请输入判断题数量" />
          )}
        </Form.Item>
        <Form.Item  {...formItemLayout} label="判断题分数">
          {getFieldDecorator('panduanfenshu', {
              initialValue:this.state.data.panduanfenshu,
            rules: [{ required: true, message: '请输入判断题分数' }],
          })(
            <InputNumber size="large"   style={{width:'400px',marginLeft:'3%'}} min={0}  placeholder="请输入判断题分数" />
          )}
        </Form.Item>
        <Form.Item  {...formItemLayout} label="理论单选题数量">
          {getFieldDecorator('lilundannum', {
                initialValue:this.state.data.lilundannum,
            rules: [{ required: true, message: '请输入理论单选题数量' }],
          })(
            <InputNumber size="large" precision={0}  style={{width:'400px',marginLeft:'3%'}} min={0}  placeholder="请输入理论单选题数量" />
          )}
        </Form.Item>
        <Form.Item  {...formItemLayout} label="理论单选题分数">
          {getFieldDecorator('lilundanfenshu', {
               initialValue:this.state.data.lilundanfenshu,
            rules: [{ required: true, message: '请输入理论单选题分数' }],
          })(
            <InputNumber size="large"   style={{width:'400px',marginLeft:'3%'}} min={0}  placeholder="请输入理论单选题分数" />
          )}
        </Form.Item>
        <Form.Item  {...formItemLayout} label="理论多选题数量">
          {getFieldDecorator('lilunduonum', {
               initialValue:this.state.data.lilunduonum,
            rules: [{ required: true, message: '请输入理论多选题数量' }],
          })(
            <InputNumber size="large" precision={0}  style={{width:'400px',marginLeft:'3%'}} min={0}  placeholder="请输入理论多选题数量" />
          )}
        </Form.Item>
        <Form.Item  {...formItemLayout} label="理论多选题分数">
          {getFieldDecorator('lilunduofenshu', {
               initialValue:this.state.data.lilunduofenshu,
            rules: [{ required: true, message: '请输入理论多选题分数' }],
          })(
            <InputNumber size="large"   style={{width:'400px',marginLeft:'3%'}} min={0}  placeholder="请输入理论多选题分数" />
          )}
        </Form.Item>
        <Form.Item  {...formItemLayout} label="看图选择题数量">
          {getFieldDecorator('kantunum', {
               initialValue:this.state.data.kantunum,
            rules: [{ required: true, message: '请输入看图选择题数量' }],
          })(
            <InputNumber size="large" precision={0}  style={{width:'400px',marginLeft:'3%'}} min={0}  placeholder="请输入看图选择题数量" />
          )}
        </Form.Item>
        <Form.Item  {...formItemLayout} label="看图选择题分数">
          {getFieldDecorator('kantufenshu', {
                initialValue:this.state.data.kantufenshu,
            rules: [{ required: true, message: '请输入看图选择题分数' }],
          })(
             <InputNumber size="large"   style={{width:'400px',marginLeft:'3%'}} min={0}  placeholder="请输入看图选择题分数" />
          )}
        </Form.Item>


        <Form.Item  {...formItemLayout} label="自选题数量">
          {getFieldDecorator('kantujiandanum', {
                initialValue:this.state.data.kantujiandanum,
            rules: [{ required: true, message: '请输入自选题数量' }],
          })(
             <InputNumber size="large" precision={0}  style={{width:'400px',marginLeft:'3%'}} min={0}  placeholder="请输入自选题数量" />
          )}
        </Form.Item>


      
        <Form.Item  {...formItemLayout} label="自选题分数">
          {getFieldDecorator('kantujiandafenshu', {
                initialValue:this.state.data.kantujiandafenshu,
            rules: [{ required: true, message: '请输入自选题分数' }],
          })(
             <InputNumber size="large"   style={{width:'400px',marginLeft:'3%'}} min={0}  placeholder="请输入自选题分数" />
          )}
        </Form.Item>




        <Form.Item  {...formItemLayout} label="简答题数量">
          {getFieldDecorator('jiandanum', {
                initialValue:this.state.data.jiandanum,
            rules: [{ required: true, message: '请输入简答题数量' }],
          })(
             <InputNumber size="large" precision={0}   style={{width:'400px',marginLeft:'3%'}} min={0}  placeholder="请输入简答题数量" />
          )}
        </Form.Item>
        <Form.Item  {...formItemLayout} label="简答题分数">
          {getFieldDecorator('jiandafenshu', {
                initialValue:this.state.data.jiandafenshu,
            rules: [{ required: true, message: '请输入简答题分数' }],
          })(
             <InputNumber size="large"    step={1}  style={{width:'400px',marginLeft:'3%'}} min={0}  placeholder="请输入简答题分数" />
          )}
        </Form.Item>
            <Form.Item  
            style={{marginLeft:'15%'}}
            >
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

export default  componentName