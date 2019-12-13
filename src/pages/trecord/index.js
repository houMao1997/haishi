import React from 'react'
import { Table, Button, Form,Card, message,Modal,InputNumber,DatePicker } from 'antd'
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
              'id': data[i].id,
              '试卷名称': data[i].name,
              '看图填空分数': data[i].kantufenshu,
              '理论单选分数': data[i].lilundanfenshu,
              '理论多选分数': data[i].lilunduofenshu,
              '判断题分数': data[i].panduanfenshu,
              '自选题': data[i].kantujiandafenshu,
              '简答分数': data[i].jiandafenshu,
               '总分': data[i].jiandafenshu, 
               // '模拟操作': data[i].baoguang,
               '交卷时间':new Date(parseInt( data[i].addtime) * 1000).toLocaleString().replace(/\//g, "-").substr(0,20)
            }
            dataTable.push(obj);
          }
        }
      }
      option.fileName = '考试记录'
      option.datas=[
        {
          sheetData:dataTable,
          sheetName:'sheet',
          sheetFilter:['id','试卷名称','看图填空分数','理论单选分数','理论多选分数', '判断题分数', '自选题', '简答分数', '总分', '交卷时间'],
          sheetHeader:['id','试卷名称','看图填空分数','理论单选分数','理论多选分数', '判断题分数', '自选题', '简答分数', '总分', '交卷时间'],
        }
      ];
    
      var toExcel = new ExportJsonExcel(option); 
      toExcel.saveExcel();        
    }
  componentDidMount() {
    const url = global.constants.url
    let userid = JSON.parse(localStorage.getItem('userinfo'));
    // let userid = localStorage.getItem('id')
    $.ajax({
      url: `${url}` + '/index/addpaper/kaoshijilu',
      type: 'get',
      dataType: 'json',
      success: (data) => {
        this.setState({
            data:data.info
            })
      }
    })
  }
  del=(record)=>{
    const url = global.constants.url
    const id =record.id
    $.ajax({
      url: `${url}` + '/index/addpaper/extractpaperdel',
      type: 'post',
      data:{id:id},
      dataType: 'json',
      success: (data) => {
        $.ajax({
          url: `${url}` + '/index/addpaper/kaoshijilu',
          type: 'get',
          dataType: 'json',
          success: (data) => {
            this.setState({
                data:data.info
                })
          }
        })
      }
    })
  }
  xiangqing = (record) => {
    if(record.jiandafenshu==null&&record.kantufenshu==null&&record.kantujiandafenshu==null&&record.lilundanfenshu==null&&record.lilunduofenshu==null &&record.panduanfenshu==null){
      message.error("学生未提交试卷")
    }else{
      const id = record.id;
      const url = global.constants.url
      localStorage.setItem('tksid', record.id);
      this.props.history.push({
        pathname: `${this.props.match.url}/txiangqing`,
        state: { tksid: id }
      });
    }
 
  }
  resetpassword=(record)=>{
      this.setState({
        visible: true,
      });
  }

  kantujianda=(record)=>{
 
    const {kantujiandaArr}=this.state
    const {recid}=this.state
    const url2 = global.constants.url 
    $.ajax({
      url:`${url2}`+'/index/addpaper/jiandalst',
      data:{id:record.id,type:1},
      type:'post',
      dataType:'json',
      success: (data)=>{
       this.setState({
        kantujiandaArr:data.info
       }, ()=> {
        this.ktjd()
   
      })
      },
      error:(data)=>{
      
      }
    })
  }


  ktjd=()=>{
    const {kantujiandaArr}=this.state
    if(kantujiandaArr.length==0){
      message.error("考生未答题或未设置此题型")
      this.setState({
        visible:false
      })
    }else{
      this.setState({
        visible:true
      })
    }
  }


  jd=()=>{
   
    const {jiandaArr}=this.state
    if(jiandaArr.length==0){
      message.error("考生未答题或未设置此题型")
      this.setState({
        visible2:false
      })
    }else{
      
    
      this.setState({
        visible2:true
      })

    }
  }
  jianda=(record)=>{
    const {jiandaArr} = this.state
    const url2 = global.constants.url 
    $.ajax({
      url:`${url2}`+'/index/addpaper/jiandalst',
      data:{id:record.id,type:2},
      type:'post',
      dataType:'json',
      success: (data)=>{
 
       this.setState({
        jiandaArr:data.info
       }, ()=> {
        this.jd()
     
      })
      },
      error:(data)=>{
      
      }
    })
  }
  handleOk = e => {
    this.setState({
      visible: false,
      visible2:false
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
      visible2:false
    });
  };



  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const start_time1 = String(values.date[0].valueOf())
      const start_time=start_time1.slice(0,10) 
      const end_time1 = String(values.date[1].valueOf())
      const end_time= end_time1.slice(0,10)
      const url2 = global.constants.url 
      if (!err) {
        $.ajax({
          url:`${url2}`+'/index/addpaper/kaoshijilu',
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
    });
  };








  handleSubmit3 = (e) => {
    const {recid,kantujiandaArr}=this.state
  
    this.props.form.validateFields((err, values) => {
      let arr=[];
      for (let i in values) {
        arr.push(values[i]); //属性
        //arr.push(obj[i]); //值
    }
    let arr1=[];
    for (let i in kantujiandaArr) {
      arr1.push(kantujiandaArr[i].id); //属性
      //arr.push(obj[i]); //值
  }
const arrfenshu=[]
arr =  arr.slice(1)
for(let j =0;j<arr1.length;j++ ){
  arrfenshu.push({id: arr1[j],fenshu: arr[j]});
}
      const url2 = global.constants.url 
      if (!err) {
        $.ajax({
          url:`${url2}`+'/index/addpaper/xiugaifenshu',
          data:{arrfenshu:arrfenshu},
          type:'post',
          dataType:'json',
          success: (data)=>{
            if(data.code ==0){
              message.error(data.info)
            }
            if(data.code ==1){
             
              this.setState({
                visible:false
                })
              message.success(data.info)
              const url = global.constants.url
              let userid = JSON.parse(localStorage.getItem('userinfo'));
              $.ajax({
                url: `${url}` + '/index/addpaper/kaoshijilu',
                type: 'get',
                dataType: 'json',
                success: (data) => {
                  this.setState({
                      data:data.info
                      })
                }
              })
            }
           this.setState({
            // data:data.info,
           })
          },
          error:(data)=>{
          
          }
        })
      }
    });
  };







  handleSubmit4 = (e) => {
    const {recid,jiandaArr}=this.state
  
    this.props.form.validateFields((err, values) => {
      let arr=[];
      for (let i in values) {
        arr.push(values[i]); //属性
        //arr.push(obj[i]); //值
    }
    let arr1=[];
    for (let i in jiandaArr) {
      arr1.push(jiandaArr[i].id); //属性
      //arr.push(obj[i]); //值
  }
const arrfenshu=[]
arr =  arr.slice(1)
for(let j =0;j<arr1.length;j++ ){
  arrfenshu.push({id: arr1[j],fenshu: arr[j]});
}
      const url2 = global.constants.url 
      if (!err) {
        $.ajax({
          url:`${url2}`+'/index/addpaper/xiugaifenshu',
          data:{arrfenshu:arrfenshu},
          type:'post',
          dataType:'json',
          success: (data)=>{
            if(data.code ==0){
              message.error(data.info)
            }
            if(data.code ==1){
              this.setState({
                visible2:false
                })
              message.success(data.info)
              const url = global.constants.url
              let userid = JSON.parse(localStorage.getItem('userinfo'));
              $.ajax({
                url: `${url}` + '/index/addpaper/kaoshijilu',
                type: 'get',
                dataType: 'json',
                success: (data) => {
                
                  this.setState({
                      data:data.info
                      })
                }
              })
            }
           this.setState({
            // data:data.info,
           })
          },
          error:(data)=>{
          
          }
        })
      }
    });
  };


  kantujiandaList(){
    let { getFieldDecorator } = this.props.form; 
    const {kantujiandaArr} = this.state;
    const url2 = global.constants.url 
    const that = this;
    return kantujiandaArr.map(function(item, index){
      return (
        <Card >
           <Form onSubmit={that.handleSubmit3}>
           <Form.Item  layout="inline">
             {getFieldDecorator(` ${item.id}`,{ initialValue: ''})(
                 <div>
             <p>问题：{item.wenti}</p>
             <div style={{width:'200%',height:'200%'}}>
                    <img src={`${url2}/`+item.urlli} style={{width:'30%'}}  /> 
                </div>
             <p>答案：{item.s_daan}</p>
             <span>分数:</span><InputNumber
          style={{width:"200px",marginLeft:'20px'}}
          placeholder='请输入分数'
          min={0}/>
           <p>参考答案：{item.cankaodaan}</p>
                   <p>总分：{item.fenshu}</p>
             <div>
             </div>
           </div>
             )}
           </Form.Item>
          
        </Form>
        </Card>
        
        );
        
    })
  }



  jiandaList(){
    let { getFieldDecorator } = this.props.form; 
    const {jiandaArr} = this.state;
    const url2 = global.constants.url 
    const that = this;
    return jiandaArr.map(function(item, index){
      return (
        <Card >
           <Form onSubmit={that.handleSubmit3}>
           <Form.Item  layout="inline">
             {getFieldDecorator(` ${item.id}`,{ initialValue: ''})(
                 <div>
             <p>问题：{item.wenti}</p>
             <p>学生答案：{item.s_daan}</p>
             <span>分数:</span><InputNumber
          style={{width:"200px",marginLeft:'20px'}}
          placeholder='请输入分数'
          min={0}/>
          <p>参考答案：{item.cankaodaan}</p>
                   <p>总分：{item.fenshu}</p>
             <div>
             </div>
           </div>
             )}
           </Form.Item>
          
        </Form>
        </Card>
        
        );
        
    })
  }

  render() {
    let kantujiandaList = this.kantujiandaList();
    let jiandaList = this.jiandaList();
    const {jiandalst}=this.state
    const formItemLayout = {
      labelCol: { span:5},
      wrapperCol: { span: 1 },
    };
    const { getFieldDecorator } = this.props.form;
    const { getFieldError, isFieldTouched } = this.props.form;
    const { data } = this.state;
    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
        align: 'center'
      },
      {
        title: '试卷名称',
        key: 'name',
        dataIndex: 'name',
        align: 'center'
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
            return <span>{Math.round(text)}</span>
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
        title: '自选题分数',
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
      // {
      //   title: '模拟操作',
      //   key: 'baoguang',
      //   dataIndex: 'baoguang',
      //   align: 'center',
      //   render:(text,record)=>{
      //     console.log(text)
      //     if(text == '未操作'){
      //       return <span style={{color:'red'}}>{text}</span>
      //     }else{
      //       return <span>{text}</span>
      //     }
      //   }
      // },
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
        title: '状态',
        key: 'status',
        dataIndex: 'status',
        align: 'center',
        render:(text,record)=>{
            if(text==1){
              return <span style={{color:'green'}}>正常</span>
            }else if(text==0){
              return <span style={{color:'red'}}>未完成</span>
            }
        }
      },
      {
        title: '操作',
        key: '查看详情',
        dataIndex: '查看详情',
        align: 'center',
        render: (text, record) => {
          return <div>
              <Button  type="primary"  onClick={() => this.xiangqing(record)} style={{marginRight:'5px'}}>查看详情</Button>
              <Button   onClick={() => this.kantujianda(record)} style={{marginRight:'5px',backgroundColor:'#FFAD86'}}>自选题</Button>
              <Button   type="primary" onClick={() => this.jianda(record)}style={{marginRight:'5px',backgroundColor:'#82D900'}}>简答</Button>
              <Button   type="danger" onClick={() => this.del(record)}style={{marginRight:'5px'}}>删除</Button>
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
       


        <Modal
          title="自选题"
          visible={this.state.visible}
          onOk={this.handleSubmit3}
          onCancel={this.handleCancel}
          
          width='80%'
        >
       {kantujiandaList}
        </Modal>



        <Modal
          title="简答"
          visible={this.state.visible2}
          onOk={this.handleSubmit4}
          onCancel={this.handleCancel}
          width='80%'
        >
       {jiandaList}
        </Modal>
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