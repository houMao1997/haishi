import React, { Component } from 'react'
import $ from 'jquery'
import { Form, Button, message, Card, Input } from 'antd'
import _ from 'lodash'
import '../../../src/config/global'
@Form.create()
class Change extends Component {
  state = {
    data: ''
  }


handleSubmit = e => {
  let userid = JSON.parse(localStorage.getItem('userinfo')).id;
  e.preventDefault();
  this.props.form.validateFields((err, values) => {
    if (!err) {
      const url = global.constants.url
      $.ajax({
        type: 'post',
        url: `${url}` + '/index/login/accountupdata ',
        datatype: 'json',
        data: { ...values, id: userid },
        success: (data) => {
          data = JSON.parse(data)
          if (data.code == 0) {
            message.error(data.info)
            this.props.form.resetFields();
          } else {
              message.success(data.info)
              this.props.form.resetFields();
            }
          },
          Error: (data) => {
            // message.Error('新增失败');
          }
        }
        )
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { data } = this.state;
    const formItemLayout = {
      labelCol: { span: 1 },
      wrapperCol: { span: 5 },
    };
    return (
      <div >
        <Card>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item {...formItemLayout} label="账号" >
              {getFieldDecorator('nickname', {
                rules: [{ required: true, message: '请输入账号' }],
              })(
                <Input
                  autocomplete="off"
                  style={{ width: '400px', marginLeft: '3%' }}
                  type="text"
                  placeholder="请输入账号"
                />
              )}
            </Form.Item>
            
            <Form.Item {...formItemLayout} label="密码">
              {getFieldDecorator('pwd', {
                rules: [{ required: true, message: '请输入密码' }],
              })(
                <Input
                  autocomplete="off"
                  style={{ width: '400px', marginLeft: '3%' }}
                  type="password"
                  placeholder="请输入密码"
                />,
              )}
            </Form.Item>

            <Form.Item style={{ marginLeft: '12%' }}>
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
// const styles = {
//   body:{
//     background:'#fff',
//     height:'53rem',
//     overflowY:'hidden',
//     padding:'20px 20px',
//   }
// }
export default Change