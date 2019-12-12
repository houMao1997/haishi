import React from 'react'
import { Table, Button, Form, message,Card } from 'antd'
import $ from 'jquery'
import { Link, withRouter } from 'react-router-dom'
import '../../../src/config/global'
@withRouter
@Form.create()
class DropdownDemo extends React.Component {
  constructor() {
    super();
    this.state = {
      scorce: '',
      totaWl: 20,
      pageSize: 10,
      visible: false,
      text: '',
      xqdata: ''
    };
  }
  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
    
      }
    });
  }
  componentWillMount(){

  }
  componentDidMount() {
    const url = global.constants.url
    let userid = JSON.parse(localStorage.getItem('userinfo')).id;
    let userdata = this.props.location.state||localStorage.getItem('baoguang');
    $.ajax({
      url: `${url}` + '/index/addpaper/xueshengkaoshijilu',
      type: 'get',
      dataType: 'JSON',
      data: { u_id: userid },
      success: (data) => {
        this.setState({
          data: data.info
        })
      }
    })
  }
  xiangqing = (record) => {
    if(record.jiandafenshu==null && record.kantufenshu==null && record.kantujiandafenshu==null  &&record.lilundanfenshu==null && record.lilunduofenshu==null && record.panduanfenshu==null){
      message.error("您没有交卷哦！")
    }else{
      const id = record.id;
    const url = global.constants.url
      localStorage.setItem('ksid', record.id);
      this.props.history.push({
        pathname: "./xiangqing",
        state: { ksid: id }
      });
    }
 
  }
  render() {
    const { getFieldError, isFieldTouched } = this.props.form;
    const usernameError = isFieldTouched('username') && getFieldError('username');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    const { data } = this.state;
    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
      },
      {
        title: '试卷名称',
        key: 'name',
        dataIndex: 'name',
        align: 'center',
      },
      {
        title: '看图填空分数',
        dataIndex: 'kantufenshu',
        key: 'kantufenshu',
        align: 'center',
        render:(text,record)=>{
          if(text === null){
            return <span>---</span>
          }else{
            return <span>{ Math.round(text)}</span>
          }
        }
      },
      {
        title: '理论单选分数',
        dataIndex: 'lilundanfenshu',
        key: 'lilundanfenshu',
        align: 'center',
        render:(text,record)=>{
          if(text === null){
            return <span>---</span>
          }else{
            return <span>{Math.round(text)}</span>
          }
        }
      },
      {
        title: '理论多选分数',
        dataIndex: 'lilunduofenshu',
        key: 'lilunduofenshu',
        align: 'center',
        render:(text,record)=>{
          if(text === null){
            return <span>---</span>
          }else{
            return <span>{Math.round(text)}</span>
          }
        }
      },
      {
        title: '判断题分数',
        key: 'panduanfenshu',
        dataIndex: 'panduanfenshu',
        align: 'center',
        render:(text,record)=>{
          if(text === null){
            return <span>---</span>
          }else{
            return <span>{Math.round(text)}</span>
          }
        }
      },
      {
        title: '看图简答分数',
        key: 'kantujiandafenshu',
        dataIndex: 'kantujiandafenshu',
        align: 'center',
        render:(text,record)=>{
          if(text === null){
            return <span>---</span>
          }else{
            return <span>{Math.round(text)}</span>
          }
        }
      },
      {
        title: '简答分数',
        key: 'jiandafenshu',
        dataIndex: 'jiandafenshu',
        align: 'center',
        render:(text,record)=>{
          if(text === null){
            return <span>---</span>
          }else{
            return <span>{Math.round(text)}</span>
          }
        }
      },
      {
        title: '总分',
        key: '总分',
        dataIndex: '总分',
        align: 'center',
        render: (text, record) => {
          return Math.round(Number(record.kantufenshu) + Number(record.lilundanfenshu) + Number(record.lilunduofenshu) + Number(record.panduanfenshu)+ Number(record.kantujiandafenshu)+ Number(record.jiandafenshu))
        }
      },
      {
        title: '交卷时间',
        key: 'addtime',
        dataIndex: 'addtime',
        align: 'center',
        render:(text,record)=>{
          return  new Date(parseInt(record.addtime) * 1000).toLocaleString().replace(/\//g, "-").substr(0,20); 
        }
      },
      {
        title: '操作',
        key: '查看详情',
        dataIndex: '查看详情',
        align: 'center',
        render: (text, record) => {
          return <Button type="primary" onClick={() => this.xiangqing(record)}>查看详情</Button>
        }
      },
    ];
    return (
      <div>
        <Card> <Table bordered="true" dataSource={data} columns={columns} pagination={{ pageSize: 12 }}  rowKey='123'   align="right"/></Card>
      </div>
    )
  }
}
export default DropdownDemo