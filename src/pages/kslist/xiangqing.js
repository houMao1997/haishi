import React from 'react'
import { Button, Card, Radio, message, Form, Input, Modal, Checkbox } from 'antd'
import $ from 'jquery'
import { Link, withRouter } from 'react-router-dom'
const RadioGroup = Radio.Group;
const { TextArea } = Input;

@withRouter
@Form.create()
class ButtonDemo extends React.Component {
  constructor(props) {
    super(props)
    let userdata = this.props.location.state||localStorage.getItem('ksid');
    this.state = {
      panduanArr: [],
      lilundanArr:[],
      lilunxuanArr:[],
      lilunduoArr:[],
      kantuArr:[],
      jiandaArr:[],
      kantujiandaArr:[],
      baoguangArr:[]
    }
  }
  componentDidMount() {
    const url = global.constants.url
    let userdata = this.props.location.state||localStorage.getItem('ksid');
    $.ajax({
      url: `${url}` + '/index/addpaper/xiangqing',
      type: 'get',
      dataType: 'JSON',
      data: { id: userdata.ksid },
      success: (data) => {
        const panduan = data.info.panduan
        const lilundan = data.info .danxuan
        const lilunduo = data.info.duoxuan
        const kantu = data.info.kantu
        const jianda = data.info.jianda
        const kantujianda = data.info.kantujianda
        const baoguang = data.info.baoguang
        this.setState({
          panduanArr: panduan,
          lilundanArr:lilundan,
          lilunduoArr:lilunduo,
          kantuArr:kantu,
          jiandaArr:jianda,
          baoguangArr:baoguang,
          kantujiandaArr:kantujianda,Arr:kantujianda,
          p_id:data.info.p_id,
          u_id:data.info.u_id
        })
      }
    })
  }
  getPanduanListHtml () {
    let {panduanArr,lilundanArr} = this.state;
    let { getFieldDecorator } = this.props.form; 
    const that = this;
    return panduanArr.map(function(item, index){
     return ( 
     <Card>
    <Form.Item  layout="inline">
          {getFieldDecorator(`pd_${item.id}`,{ initialValue: null})(
              <div>
              <span >{item.wenti}</span> 
              <div>
          {/* <span style={{color:"red"}}>{item.yn}</span> */}
          {item.yn == '正确'?<span style={{color:"yellowgreen"}}>{item.yn}</span>:<span style={{color:"red"}}>{item.yn}</span>}
          </div>
          <div>
          <span>你的分数：</span><span>{item.fenshu}</span>
          </div>
          <div>
          {item.daan == '1'?<div><span>答案：</span><span style={{color:"yellowgreen"}}>正确</span></div>:<div><span>答案：</span><span style={{color:"red"}}>错误</span></div>}
          </div>
          <div>
          {item.s_daan == '1'?<div><span>你的答案：</span><span style={{color:"yellowgreen"}}>正确</span></div>:<div><span>你的答案：</span><span style={{color:"red"}}>错误</span></div>}
          </div>
                </div>
          )}
        </Form.Item>
     </Card>
     );
    }); 
  }







  getbaoguangHtml () {
    let {panduanArr,lilundanArr,baoguangArr} = this.state;
    let { getFieldDecorator } = this.props.form; 
    const that = this;
    return baoguangArr.map(function(item, index){
     return ( 
     <Card>
    <Form.Item  layout="inline">
          {getFieldDecorator(`pd_${item.id}`,{ initialValue: null})(
              <div>
              
              <div>
          {/* <span style={{color:"red"}}>{item.yn}</span> */}
         
          </div>
          <div>
          <span>你的分数：</span><span>{item.fenshu}</span>
          </div>
          <div>
         
          </div>
          <div>
          <span>解析:</span><span>{item.jiexi}</span>
          </div>
                </div>
          )}
        </Form.Item>
     </Card>
     );
    }); 
  }
  lilundanListHtml () {
    let { getFieldDecorator } = this.props.form; 
    let {lilundanArr} = this.state;
    const that = this;
    const xuanxiang = []
    return lilundanArr.map(function(item, index){
     return (
     <Card >
        <Form.Item  layout="inline">
          {getFieldDecorator(`lilundanxuan_${item.id}`,{ initialValue: null})(
               <div>
              <div>
          </div>
          <p>{item.wenti}</p>
          <div>
          {/* <span style={{color:"red"}}>{item.yn}</span> */}
          {item.yn == '正确'?<span style={{color:"yellowgreen"}}>{item.yn}</span>:<span style={{color:"red"}}>{item.yn}</span>}
          </div>
          <div>
          <span>你的分数：</span><span>{item.fenshu}</span>
          </div>
          <div>
          <span>正确答案：</span><span>{item.daan}</span>
          </div>
          <div>
           {item.s_daan == ""? <div><span>你的答案：</span><span style={{color:"red"}}>未作答</span></div> :  <div><span>你的答案：</span><span>{item.s_daan}</span></div>} 
          {/* <div><span>你的答案：</span><span>{item.s_daan}</span></div> */}

          </div>
        </div>
          )}
        </Form.Item>
     </Card>);
    });  
  }
  lilunduoListHtml () {
    let { getFieldDecorator } = this.props.form; 
    let {lilunduoArr} = this.state;
    const that = this;
    const xuanxiang = []
    return lilunduoArr.map(function(item, index){
     return ( 

     <Card >
       <div>
        <div>
          </div>
          <p>{item.wenti}</p>
          <div>
          {/* <span style={{color:"red"}}>{item.yn}</span> */}
          {item.yn == '正确'?<span style={{color:"yellowgreen"}}>{item.yn}</span>:<span style={{color:"red"}}>{item.yn}</span>}
          </div>
          <div>
          <span>你的分数：</span><span>{item.fenshu}</span>
          </div>
          <div>
          <span>正确答案：</span><span>{item.daan}</span>
          </div>
          <div>
          {item.s_daan == ""? <div><span>你的答案：</span><span style={{color:"red"}}>未作答</span></div> :  <div><span>你的答案：</span><span>{item.s_daan}</span></div>} 
          </div>
        </div>
     </Card>);
    }); 
  }
  kantuHtmlList(){
    let { getFieldDecorator } = this.props.form; 
    let {kantuArr,url2} = this.state;
    const that = this;
    const url = global.constants.url
  
    const xuanxiang = []
    return kantuArr.map(function(item, index){
     return (
     <Card>
        <Form.Item  layout="inline">
          {getFieldDecorator(`kantuxuanze_${item.id}`,{ initialValue: null})(
              <div>
          <p>{item.wenti}</p>
              <div style={{width:'100%',height:'100%'}}>
                <img src={`${url}/${item.url}`}  /> 
              </div>
          <div>
          <div>
          {item.yn == '正确'?<span style={{color:"yellowgreen"}}>{item.yn}</span>:<span style={{color:"red"}}>{item.yn}</span>}
          </div>
          <div>
          <span>你的分数：</span><span>{item.fenshu}</span>
          </div>
          <div>
          <span>正确答案：</span><span>{item.daan}</span>
          </div>
          <div>
          {item.s_daan == ""? <div><span>你的答案：</span><span style={{color:"red"}}>未作答</span></div> :  <div><span>你的答案：</span><span>{item.s_daan}</span></div>} 
          </div>
          </div>
        </div>
          )}
        </Form.Item>
     </Card>);
    }); 
  }

  kantujiandaHtmlList(){
    let { getFieldDecorator } = this.props.form; 
    let {kantujiandaArr,url2} = this.state;
    const that = this;
    const url = global.constants.url
  
    const xuanxiang = []
    return kantujiandaArr.map(function(item, index){
     return (
     <Card>
        <Form.Item  layout="inline">
          {getFieldDecorator(`kantuxuanze_${item.id}`,{ initialValue: null})(
              <div>
          <p>{item.wenti}</p>
              <div style={{width:'100%',height:'100%'}}>
                <img src={`${url}/${item.url}`}  /> 
              </div>
          <div>
          <div>
          {item.yn == '正确'?<span style={{color:"yellowgreen"}}>{item.yn}</span>:<span style={{color:"red"}}>{item.yn}</span>}
          </div>
          <div>
          <span>你的分数：</span><span>{item.fenshu}</span>
          </div>
          <div>
          <span>正确答案：</span><span>{item.daan}</span>
          </div>
          <div>
          {item.s_daan == ""? <div><span>你的答案：</span><span style={{color:"red"}}>未作答</span></div> :  <div><span>你的答案：</span><span>{item.s_daan}</span></div>} 
          </div>
          </div>
        </div>
          )}
        </Form.Item>
     </Card>);
    }); 
  }






  jiandaHtmlList(){
    let { getFieldDecorator } = this.props.form; 
    let {jiandaArr} = this.state;
    const that = this;
    const url = global.constants.url
    const xuanxiang = []
  
    return jiandaArr.map(function(item, index){
     return (
     <Card>
        <Form.Item  layout="inline">
          {getFieldDecorator(`kantuxuanze_${item.id}`,{ initialValue: null})(
              <div>
          <p>{item.wenti}</p>
            
          <div>
          <div>
          {item.yn == '正确'?<span style={{color:"yellowgreen"}}>{item.yn}</span>:<span style={{color:"red"}}>{item.yn}</span>}
          </div>
          <div>
          <span>你的分数：</span><span>{item.fenshu}</span>
          </div>
          <div>
          <span>正确答案：</span><span>{item.daan}</span>
          </div>
          <div>
          {item.s_daan == ""? <div><span>你的答案：</span><span style={{color:"red"}}>未作答</span></div> :  <div><span>你的答案：</span><span>{item.s_daan}</span></div>} 
          </div>
          </div>
        </div>
          )}
        </Form.Item>
     </Card>);
    }); 
  }
  render() {
    let panduanHtml = this.getPanduanListHtml();
    let lilundanListHtml=this.lilundanListHtml();
    let lilunduoListHtml = this.lilunduoListHtml();
    let kantuHtmlList = this.kantuHtmlList();
    let jiandaList = this.jiandaHtmlList();
    let kantujiandaHtmlList = this.kantujiandaHtmlList();
    let getbaoguangHtml = this.getbaoguangHtml()
    return (
      <div>
   <Form layout="inline" onSubmit={this.handleSubmit}>
     {this.state.panduanArr.length==0 ?'': <h1 style={styles.title}>判断题</h1>}
      
      {panduanHtml}
      {this.state. lilundanArr.length==0?'': <h1 style={styles.title}>理论单选题</h1>}
       {lilundanListHtml}
       {this.state. lilunduoArr.length==0?'': <h1 style={styles.title}>理论多选题</h1>}
        {lilunduoListHtml}
        {this.state. kantuArr.length==0?'': <h1 style={styles.title}>看图选择</h1>}
        {kantuHtmlList}
        {this.state. jiandaArr.length==0?'': <h1 style={styles.title}>简答题</h1>}
        {jiandaList}
        {this.state. kantujiandaArr.length==0?'': <h1 style={styles.title}>看图简答题</h1>}
        {kantujiandaHtmlList}
        {this.state. baoguangArr.length==0?'': <h1 style={styles.title}>模拟操作题</h1>}
        {getbaoguangHtml}
      </Form>
      </div>
    )
  }
}

const styles = {
  login: {
    margin: '16px 700px',
    width: '150px',
    height: '100px',
    fontSize: '30px'
  },
  title: {
    background: '#40a9ff',
    fontSize: '18px',
    marginTop: '20px',
    width: '120px',
    textAlign: 'center',
    borderRadius: '50%',
    color: '#fff'
  },
  chouti: {
    display: 'block',
    width: '400px',
    height: '400px',
    fontSize: '40px',
    background: 'rgb(64, 169, 255)',
    color: '#fff',
    borderRadius: '15%',
    marginLeft: '35%',
  },
  choutiwz: {
    display: 'block',
    fontSize: '50px',
    marginLeft: '35%',
    paddingTop: '35%'
  }
}
export default ButtonDemo