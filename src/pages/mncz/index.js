import React from 'react'
import { Table, Button, Form,DatePicker,message,Card } from 'antd'
import $ from 'jquery'
import ExportJsonExcel from 'js-export-excel';
import {  withRouter } from 'react-router-dom'
import '../../../src/config/global'
const {  RangePicker } = DatePicker;
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
      xqdata: '',
      recid:'',
      kantujiandaArr: [],
      jiandaArr: [],
    };
  }
  downloadExcel = () => {
    const data = this.state.data ? this.state.data : '';//表格数据
      var option={};
      let dataTable = [];
      if (data) {
        for (let i in data) {
          if(data){
            let obj = {
              '账号': data[i].account,
              // '姓名': data[i].nickname,
              '类型':data[i].type,
              '等级': data[i].fenshu,
              '解析': data[i].jiexi,
               '交卷时间':new Date(parseInt( data[i].addtime) * 1000).toLocaleString().replace(/\//g, "-").substr(0,20)
            }
            dataTable.push(obj);
          }
        }
      }
      option.fileName = '模拟操作成绩'
      option.datas=[
        {
          sheetData:dataTable,
          sheetName:'sheet',
          sheetFilter:['账号','类型','等级','解析', '交卷时间'],
          sheetHeader:['账号','类型','等级','解析', '交卷时间'],
        }
      ];

      var toExcel = new ExportJsonExcel(option);
      toExcel.saveExcel();
    }
  componentDidMount() {
    const url = global.constants.url
    let userid = JSON.parse(localStorage.getItem('userinfo')).id;
    $.ajax({
      url: `${url}` + '/index/Login/userThreeDAchievementlst',
      type: 'get',
      dataType: 'json',
      success: (data) => {
        this.setState({
            data:data.info
            })
      }
    })
  }




  handleSubmit = (e) => {
      e.preventDefault();

      this.props.form.validateFields((err, values) => {
        if(values.date !== undefined){
          const start_time1 = String(values.date[0].valueOf())
          const start_time=start_time1.slice(0,10)
          const end_time1 = String(values.date[1].valueOf())
          const end_time= end_time1.slice(0,10)
          const url2 = global.constants.url
            if (!err) {
              $.ajax({
                url:`${url2}`+'/index/Login/userThreeDAchievementlst',
                data:{start_time:start_time,end_time:end_time},
                type:'post',
                dataType:'json',
                success: (data)=>{
                  this.setState({
                    data:data.info
                  })

                },
                error:(data)=>{

                }
              })
            }

        }else{
          message.error('请选择日期和时间')
        }




    });
  };





del=(record)=>{
  const id = record.id
  const url2 = global.constants.url
    $.ajax({
      url:`${url2}`+'/index/Login/userThreeDAchievementlstdel',
      data:{id:id},
      type:'post',
      dataType:'json',
      success: (data)=>{
       $.ajax({
        url:`${url2}`+'/index/Login/userThreeDAchievementlst',

        type:'post',
        dataType:'json',
        success: (data)=>{
         this.setState({
          data:data.info
         })

        },
        error:(data)=>{

        }
      })
      },
      error:(data)=>{

      }
    })

}




  render() {
    const formItemLayout = {
      labelCol: { span:5},
      wrapperCol: { span: 1 },
    };
    const { getFieldDecorator } = this.props.form;
    const { getFieldError, isFieldTouched } = this.props.form;
    const { data } = this.state;
    const columns = [
      {
        title: '账号',
        dataIndex: 'account',
        key: 'account',
        align: 'center'
      },
      // {
      //   title: '姓名',
      //   key: 'nickname',
      //   dataIndex: 'nickname',
      //   align: 'center'
      // },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        align: 'center',
      },
      {
        title: '等级',
        dataIndex: 'fenshu',
        key: 'fenshu',
        align: 'center',
        render:(text,record)=>{
          if(text === null){
            return <span>---</span>
          }else{
            return <span>{text}</span>
          }
        }
      },
      {
        title: '解析',
        dataIndex: 'jiexi',
        key: 'jiexi',
        align: 'center',
        render:(text,record)=>{
          if(text === null){
            return <span>---</span>
          }else{
            return <span>{text}</span>
          }
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
        key: '',
        dataIndex: '',
        align: 'center',
        render:(text,record)=>{
          return <div>
          <Button type="primary" onClick={() => this.del(record)}>
              删除
          </Button>
          {/* <Button type="primary" onClick={() => this.resetpassword(record)} style={{marginLeft:'10px'}}>修改分数 </Button> */}
      </div>
        }
      },
    ];
    const config = {
      // rules: [{ type: 'object', required: true, message: 'Please select time!' }],
    };
    const rangeConfig = {
      // rules: [{ type: 'array', required: true, message: 'Please select time!' }],
    };
    return (
      <div>
        <Card>
        <Form {...formItemLayout} onSubmit={this.handleSubmit} layout="inline">
            <Form.Item label="选择时间">
          {getFieldDecorator('date', rangeConfig)(
             <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />,
          )}
          </Form.Item>
          <Form.Item>
          <Button type="primary" htmlType="submit" style={{marginLeft:'30px'}}>
            搜索
          </Button>
        </Form.Item>
        <Form.Item>
        <Button onClick={this.downloadExcel}> 导出excel表格 </Button>
        </Form.Item>
         </Form>
        <Table bordered="true" dataSource={data} columns={columns} pagination={{ pageSize: 12 }} rowKey='' style={{marginTop:'30px'}} rowClassName={(record, index) => {
                     let className = 'light';
                    if(index % 2 ===1){
                        return className
                    }
                    }}/>
        </Card>
      
         
      </div>
    )
  }
}
// const styles = {
//   body:{
//     background:'#fff',
//     height:'90vh',
//     overflowY:'hidden',
//     paddingTop:'20px'
//   }
// }

export default DropdownDemo