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
    current: 0
  }
  componentDidMount() {

  }
  componentWillUnmount() {

  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const counlist = Object.values(values)
      const wenti = values.wenti;
      const daan = values.daan;
      //  const daan1 = daan[5];
      const count = counlist.slice(1, 9);
      if (!err) {
        const url = global.constants.url
        $.ajax({
          type: 'post',
          url: `${url}` + '/index/addpaper/theoryduo ',
          datatype: 'json',
          data: {
            wenti: wenti,
            daan: daan,
            count: count
          },
          success: (data) => {

            data = JSON.parse(data)

            if (data.code == 1) {
              message.success('新增成功');
              this.props.form.resetFields();
            } else {
              message.error(data.info)
              this.props.form.resetFields();
            }

          },
          Error: (data) => {
            message.Error('新增失败');
          }
        })
      }
    });
  };

  render() {
    const {
      getFieldDecorator
    } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 2
        },
        sm: {
          span: 1
        },
      },
      wrapperCol: {
        xs: {
          span: 15
        },
        sm: {
          span: 8
        },
      },
    };
    return ( 
      <div>
      
      <Card >
      <Form onSubmit = {this.handleSubmit}>
      <Form.Item {...formItemLayout}label = "问题"> {
        getFieldDecorator('wenti', {
          rules: [{
            required: true,
            message: '请输入你的问题'
          }],
        })(
          <Input autoComplete = "off" style = {
            {
              width: '400px',
              marginLeft: '3%'
            }
          }
          type = "textarea"
          placeholder = "请输入问题" /> ,
        )
      } 
      </Form.Item>
      <Form.Item {...formItemLayout} label = "选项A" > {
        getFieldDecorator('countA', {
          rules: [{
            required: true,
            message: '请输入选项A'
          }],
        })( 
          <Input autoComplete = "off"
          style = {
            {
              width: '400px',
              marginLeft: '3%'
            }
          }
          type = "text"
          placeholder = "请输入选项A" /> ,
        )
      } 
      </Form.Item>
      <Form.Item {...formItemLayout} label = "选项B" > {
        getFieldDecorator('countB', {
          rules: [{
            required: true,
            message: '请输入选项B'
          }],
        })( 
          <Input autoComplete = "off" style = {
            {
              width: '400px',
              marginLeft: '3%'
            }
          }
          type = "text"
          placeholder = "请输入选项B"/> ,
        )
      } 
      </Form.Item>
      <Form.Item {...formItemLayout}label = "选项C" > {
        getFieldDecorator('countC', {
          rules: [{
            required: true,
            message: '请输入选项C'
          }],
        })( 
          <Input autoComplete = "off"
          style = {
            {
              width: '400px',
              marginLeft: '3%'
            }
          }
          type = "text"
          placeholder = "请输入选项C" /> ,
        )
      } 
      </Form.Item> 
      <Form.Item {...formItemLayout}label = "选项D" > {
        getFieldDecorator('countD', {
          rules: [{
            required: true,
            message: '请输入选项D'
          }],
        })( 
          <Input autoComplete = "off"
          style = {
            {
              width: '400px',
              marginLeft: '3%'
            }
          }
          type = "text"
          placeholder = "请输入选项D" /> ,
        )
      } 
      </Form.Item> 
      <Form.Item {...formItemLayout} label = "选项E" > {
        getFieldDecorator('countE')( 
          <Input autoComplete = "off"
          style = {
            {
              width: '400px',
              marginLeft: '3%'
            }
          }
          type = "text"
          placeholder = "请输入选项E" /> ,
        )
      } 
      </Form.Item> 
      <Form.Item {...formItemLayout }label = "选项F" > {
        getFieldDecorator('countF')( 
          <Input autoComplete = "off"
          style = {
            {
              width: '400px',
              marginLeft: '3%'
            }
          }
          type = "text"
          placeholder = "请输入选项F" /> ,
        )
      } 
      </Form.Item> 
      <Form.Item {...formItemLayout
      }
      label = "选项G" > {
        getFieldDecorator('countG')( 
          <Input autoComplete = "off"
          style = {
            {
              width: '400px',
              marginLeft: '3%'
            }
          }
          type = "text"
          placeholder = "请输入选项G" /> ,
        )
      } 
      </Form.Item> 
      <Form.Item {...formItemLayout}label = "选项H" > {
        getFieldDecorator('countH', )(
           <Input autoComplete = "off"
          style = {
            {
              width: '400px',
              marginLeft: '3%'
            }
          }
          type = "text"
          placeholder = "请输入选项H" /> ,
        )
      } 
      </Form.Item> 
      <Form.Item {...formItemLayout} label = "答案" > {getFieldDecorator('daan', {
          rules: [{
            required: true,
            message: '请输入正确答案'
          }],
        })( 
          <
          Input autoComplete = "off"
          style = {
            {
              width: '400px',
              marginLeft: '3%'
            }
          }
          type = "text"
          placeholder = "请输入正确答案，用英文的,|隔开" /
          > ,
        )
      } 
      </Form.Item> 
      <Form.Item style = {
        {
          marginLeft: '15%'
        }
      } >
      <Button type = "primary" htmlType = "submit" >提交 </Button> 
      </Form.Item>
      </Form> 
      </Card>
      </div>
    )
  }
}

export default CarouselDemo