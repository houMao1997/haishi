import React from 'react'
import {Button,  Card, Radio, message,Form,Input,Checkbox,Result} from 'antd'
import $ from 'jquery'
import '../../../src/config/global'

const RadioGroup = Radio.Group;
const { TextArea } = Input;
@Form.create()
class ButtonDemo extends React.Component {
  constructor(props) {
    super(props)
    let userid = JSON.parse(localStorage.getItem('userinfo'));
    this.state = {
      size: 'default',

      data:'',
      pd1:'',
      pdwenti:'',
      // 判断题
      panduanArr: [],
      lilundanArr:[],
      lilunxuanArr:[],
      lilunduoArr:[],
      kantuArr:[],
      kantujiandaArr:[],
      jiandaArr:[],
      show:1,
      visible: false ,
      url2:'',
      p_id:'',
      value:'',
      dxva:[],
      height:  window.document.body.clientHeight,
      code:1
    }
  }

  reloadHeight = () => {
    this.setState({height: window.document.body.clientHeight})
  };
  chouti =()=>{
    this.setState ({
      show:0
    });

  }
  back=()=>{
    this.props.history.push("./sj");
  }
  handleOk = e => {


    this.setState({
      visible: false,
    });

  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };
  componentWillUnmount(){

  }
  componentDidMount(){
    let userid = JSON.parse(localStorage.getItem('userinfo'));
    const url2 =global.constants.url
    this.setState({
      url2:url2
    })
    $.ajax({
      url: `${url2}`+'/index/addpaper/extractpaper',
      data:{id:userid},
      dataType:'json',
      type:'get',
      success:(data)=>{
        if(data.code ==0){
          this.setState({
            code:0
          })
          message.error("本场考试你已经考过不可以重复考试")
        }else{
          this.setState({
            code:1
          })
          const panduan = data.info.panduan
          const lilundan = data.info .lilundan
          const lilunduo = data.info.lilunduo
          const kantu = data.info.kantu
          const kantujianda = data.info.kantujianda
          const jianda   = data.info.jianda
          this.setState({
            panduanArr: panduan,
            lilundanArr:lilundan,
            lilunduoArr:lilunduo,
            kantuArr:kantu,
            kantujiandaArr:kantujianda,
            jiandaArr:jianda,
            p_id:data.info.p_id,
          })
        }

      }
    })
  }
  onChange = (value) => {
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let userid = JSON.parse(localStorage.getItem('userinfo'));
    const {p_id} = this.state
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const url =global.constants.url
        $.ajax({
          url:`${url}`+'/index/addpaper/addpaper',
          data:{...values,p_id:p_id, u_id:userid},
          type:'post',
          dataType:'json',
          success: (data)=>{
            if(data.code == 1){
              message.success(data.info)
              this.props.history.push({pathname:'../../home/general/button'})
            }else {
              message.error(data.info)
            }
          },
          error:(data)=>{

          }
        })
      }
    });
  };



  jiandaHtmlList(){
    let { getFieldDecorator } = this.props.form;
    let {jiandaArr,url2} = this.state;

    const that = this;
    return jiandaArr.map(function(item, index){
      return (
          <Card style={{height:'10px;'}}>
            <Form.Item  layout="inline">
              {getFieldDecorator(` jianda_${item.id}`,{ initialValue: null})(
                  <div>
                    <p>{item.wenti}</p>
                    <TextArea autoComplete="off"
                              style={{width:"600px",height:'200px',marginLeft:'3%',marginTop:'30px'}}
                              placeholder='请输入答案'/>
                    <div>
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
    return kantujiandaArr.map(function(item, index){

      return (
          <Card style={{height:'10px;'}}>
            <Form.Item  layout="inline">
              {getFieldDecorator(` kantujianda_${item.id}`,{ initialValue: null})(
                  <div>
                    <p>{item.wenti}</p>
                    <div style={{width:'200%',height:'200%'}}>
                      <img src={`${url2}/`+item.urlli}  />
                    </div>
                    <TextArea autoComplete="off"
                              style={{width:"600px",height:'200px',marginLeft:'3%',marginTop:'30px'}}
                              placeholder='请输入答案'/>
                    <div>
                    </div>
                  </div>
              )}
            </Form.Item>
          </Card>);
    });
  }
  getPanduanListHtml () {
    let {panduanArr,lilundanArr} = this.state;
    let { getFieldDecorator } = this.props.form;
    const that = this;
    return panduanArr.map(function(item, index){
      return (
          <Card>
            <Form.Item  layout="horizontal">
              {getFieldDecorator(`pd_${item.id}`,{ initialValue: null})(
                  <div>
                    <span >{item.wenti}</span>
                    <RadioGroup onChange={that.onChange} style={{marginTop:'20px',display:'block'}}>
                      <Radio value={1} >对</Radio>
                      <Radio value={0}>错</Radio>
                    </RadioGroup>
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
          <Card style={{height:'10px;'}}>
            <Form.Item  layout="inline"   >
              {getFieldDecorator(`lilundanxuan_${item.id}`,{ initialValue: null})(
                  <div>
                    <div>
                    </div>
                    <p>{item.wenti}</p>
                    <div>
                      <Radio.Group>
                        <Radio style={{display: 'block',height: '30px',lineHeight: '30px'}} value={item.count[0]} name='lld1'>
                          {item.count[0]}
                        </Radio>
                        <Radio  style={{display: 'block',height: '30px',lineHeight: '30px'}}   value={item.count[1]} name='lld2'>
                          {item.count[1]}
                        </Radio>
                        <Radio  style={{display: 'block',height: '30px',lineHeight: '30px'}}  value={item.count[2]} name='lld3'>
                          {item.count[2]}
                        </Radio>
                        <Radio  style={{display: 'block',height: '30px',lineHeight: '30px'}}  value={item.count[3]} name='lld4'>
                          {item.count[3]}

                        </Radio>
                      </Radio.Group>


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

      if(item.count.length == 4){
        return (

            <Card style={{height:'10px;'}}>
              <p>{item.wenti}</p>
              <Form.Item  layout="inline">
                {getFieldDecorator(`lilunduoxuan_${item.id}`,{ initialValue: null})(
                    <Checkbox.Group style={{ width: '100%' }} onChange={that.onChange}>
                      <Checkbox  style={{display: 'block',height: '30px',lineHeight: '30px',marginLeft:'8px'}} value={item.count[0]}>{item.count[0]}</Checkbox>
                      <Checkbox  style={{display: 'block',height: '30px',lineHeight: '30px'}} value={item.count[1]}>{item.count[1]}</Checkbox>
                      <Checkbox  style={{display: 'block',height: '30px',lineHeight: '30px'}} value={item.count[2]}>{item.count[2]}</Checkbox>
                      <Checkbox  style={{display: 'block',height: '30px',lineHeight: '30px'}} value={item.count[3]}>{item.count[3]}</Checkbox>
                    </Checkbox.Group>,
                )}
              </Form.Item>
            </Card>);
      }else if(item.count.length == 5){
        return (

            <Card style={{height:'10px;'}}>
              <p>{item.wenti}</p>
              <Form.Item  layout="inline">
                {getFieldDecorator(`lilunduoxuan_${item.id}`,{ initialValue: null})(
                    <Checkbox.Group style={{ width: '100%' }} onChange={that.onChange}>
                      <Checkbox  style={{display: 'block',height: '30px',lineHeight: '30px',marginLeft:'8px'}} value={item.count[0]}>{item.count[0]}</Checkbox>
                      <Checkbox  style={{display: 'block',height: '30px',lineHeight: '30px'}} value={item.count[1]}>{item.count[1]}</Checkbox>
                      <Checkbox  style={{display: 'block',height: '30px',lineHeight: '30px'}} value={item.count[2]}>{item.count[2]}</Checkbox>
                      <Checkbox  style={{display: 'block',height: '30px',lineHeight: '30px'}} value={item.count[3]}>{item.count[3]}</Checkbox>
                      <Checkbox  style={{display: 'block',height: '30px',lineHeight: '30px'}} value={item.count[4]}>{item.count[4]}</Checkbox>

                    </Checkbox.Group>,
                )}
              </Form.Item>
            </Card>);
      }else if(item.count.length == 6){
        return (

            <Card style={{height:'10px;'}}>
              <p>{item.wenti}</p>
              <Form.Item  layout="inline">
                {getFieldDecorator(`lilunduoxuan_${item.id}`,{ initialValue: null})(
                    <Checkbox.Group style={{ width: '100%' }} onChange={that.onChange}>
                      <Checkbox  style={{display: 'block',height: '30px',lineHeight: '30px',marginLeft:'8px'}} value={item.count[0]}>{item.count[0]}</Checkbox>
                      <Checkbox  style={{display: 'block',height: '30px',lineHeight: '30px'}} value={item.count[1]}>{item.count[1]}</Checkbox>
                      <Checkbox  style={{display: 'block',height: '30px',lineHeight: '30px'}} value={item.count[2]}>{item.count[2]}</Checkbox>
                      <Checkbox  style={{display: 'block',height: '30px',lineHeight: '30px'}} value={item.count[3]}>{item.count[3]}</Checkbox>
                      <Checkbox  style={{display: 'block',height: '30px',lineHeight: '30px'}} value={item.count[4]}>{item.count[4]}</Checkbox>
                      <Checkbox  style={{display: 'block',height: '30px',lineHeight: '30px'}} value={item.count[5]}>{item.count[5]}</Checkbox>
                    </Checkbox.Group>,
                )}
              </Form.Item>
            </Card>);
      }else if(item.count.length == 7){
        return (

            <Card style={{height:'10px;'}}>
              <p>{item.wenti}</p>
              <Form.Item  layout="inline">
                {getFieldDecorator(`lilunduoxuan_${item.id}`,{ initialValue: null})(
                    <Checkbox.Group style={{ width: '100%' }} onChange={that.onChange}>
                      <Checkbox  style={{display: 'block',height: '30px',lineHeight: '30px',marginLeft:'8px'}} value={item.count[0]}>{item.count[0]}</Checkbox>
                      <Checkbox  style={{display: 'block',height: '30px',lineHeight: '30px'}} value={item.count[1]}>{item.count[1]}</Checkbox>
                      <Checkbox  style={{display: 'block',height: '30px',lineHeight: '30px'}} value={item.count[2]}>{item.count[2]}</Checkbox>
                      <Checkbox  style={{display: 'block',height: '30px',lineHeight: '30px'}} value={item.count[3]}>{item.count[3]}</Checkbox>
                      <Checkbox  style={{display: 'block',height: '30px',lineHeight: '30px'}} value={item.count[4]}>{item.count[4]}</Checkbox>
                      <Checkbox  style={{display: 'block',height: '30px',lineHeight: '30px'}} value={item.count[5]}>{item.count[5]}</Checkbox>
                      <Checkbox  style={{display: 'block',height: '30px',lineHeight: '30px'}} value={item.count[6]}>{item.count[6]}</Checkbox>
                    </Checkbox.Group>,
                )}
              </Form.Item>
            </Card>);
      }else if(item.count.length == 8){
        return (

            <Card style={{height:'10px;'}}>
              <p>{item.wenti}</p>
              <Form.Item  layout="inline">
                {getFieldDecorator(`lilunduoxuan_${item.id}`,{ initialValue: null})(
                    <Checkbox.Group style={{ width: '100%' }} onChange={that.onChange}>
                      <Checkbox  style={{display: 'block',height: '30px',lineHeight: '30px',marginLeft:'8px'}} value={item.count[0]}>{item.count[0]}</Checkbox>
                      <Checkbox  style={{display: 'block',height: '30px',lineHeight: '30px'}} value={item.count[1]}>{item.count[1]}</Checkbox>
                      <Checkbox  style={{display: 'block',height: '30px',lineHeight: '30px'}} value={item.count[2]}>{item.count[2]}</Checkbox>
                      <Checkbox  style={{display: 'block',height: '30px',lineHeight: '30px'}} value={item.count[3]}>{item.count[3]}</Checkbox>
                      <Checkbox  style={{display: 'block',height: '30px',lineHeight: '30px'}} value={item.count[4]}>{item.count[4]}</Checkbox>
                      <Checkbox  style={{display: 'block',height: '30px',lineHeight: '30px'}} value={item.count[5]}>{item.count[5]}</Checkbox>
                      <Checkbox  style={{display: 'block',height: '30px',lineHeight: '30px'}} value={item.count[6]}>{item.count[6]}</Checkbox>
                      <Checkbox  style={{display: 'block',height: '30px',lineHeight: '30px'}} value={item.count[7]}>{item.count[7]}</Checkbox>
                    </Checkbox.Group>,
                )}
              </Form.Item>
            </Card>);
      }













    });
  }
  kantuHtmlList(){
    let { getFieldDecorator } = this.props.form;
    let {kantuArr,url2} = this.state;
    const that = this;
    const xuanxiang = []
    return kantuArr.map(function(item, index){
      if(item.count.length == 4){
        return (
            <Card style={{height:'10px;'}}>
              <Form.Item  layout="inline">
                {getFieldDecorator(`kantuxuanze_${item.id}`,{ initialValue: null})(
                    <div>
                      <p>{item.wenti}</p>
                      <div style={{width:'200%',height:'200%'}}>
                        <img src={`${url2}/`+item.url} alt="" style={{width:'100%',height:'100%',display:'block',position:'absolute'}} />
                      </div>
                      <div>
                        <Radio.Group>
                          <Radio style={{display: 'block',height: '30px',lineHeight: '30px'}} value={item.count[0]} name='kt1'>
                            {item.count[0]}
                          </Radio>
                          <Radio  style={{display: 'block',height: '30px',lineHeight: '30px'}}   value={item.count[1]} name='kt2'>
                            {item.count[1]}
                          </Radio>
                          <Radio  style={{display: 'block',height: '30px',lineHeight: '30px'}}  value={item.count[2]} name='kt3'>
                            {item.count[2]}
                          </Radio>
                          <Radio  style={{display: 'block',height: '30px',lineHeight: '30px'}}  value={item.count[3]} name='kt4'>
                            {item.count[3]}
                          </Radio>

                        </Radio.Group>

                      </div>
                    </div>
                )}
              </Form.Item>
            </Card>);
      }else if(item.count.length == 5){
        return (
            <Card style={{height:'10px;'}}>
              <Form.Item  layout="inline">
                {getFieldDecorator(`kantuxuanze_${item.id}`,{ initialValue: null})(
                    <div>
                      <p>{item.wenti}</p>
                      <div style={{width:'100%',height:'100%'}}>
                        <img src={`${url2}/`+item.url} alt="" style={{width:'100%',height:'100%'}} />
                      </div>
                      <div>
                        <Radio.Group>
                          <Radio style={{display: 'block',height: '30px',lineHeight: '30px'}} value={item.count[0]} name='kt1'>
                            {item.count[0]}
                          </Radio>
                          <Radio  style={{display: 'block',height: '30px',lineHeight: '30px'}}   value={item.count[1]} name='kt2'>
                            {item.count[1]}
                          </Radio>
                          <Radio  style={{display: 'block',height: '30px',lineHeight: '30px'}}  value={item.count[2]} name='kt3'>
                            {item.count[2]}
                          </Radio>
                          <Radio  style={{display: 'block',height: '30px',lineHeight: '30px'}}  value={item.count[3]} name='kt4'>
                            {item.count[3]}
                          </Radio>
                          <Radio  style={{display: 'block',height: '30px',lineHeight: '30px'}}  value={item.count[4]} name='kt5'>
                            {item.count[4]}
                          </Radio>

                        </Radio.Group>

                      </div>
                    </div>
                )}
              </Form.Item>
            </Card>);
      }else if(item.count.length == 6){
        return (
            <Card style={{height:'10px;'}}>
              <Form.Item  layout="inline">
                {getFieldDecorator(`kantuxuanze_${item.id}`,{ initialValue: null})(
                    <div>
                      <p>{item.wenti}</p>
                      <div style={{width:'100%',height:'100%'}}>
                        <img src={`${url2}/`+item.url} alt="" style={{width:'100%',height:'100%'}} />
                      </div>
                      <div>
                        <Radio.Group>
                          <Radio style={{display: 'block',height: '30px',lineHeight: '30px'}} value={item.count[0]} name='kt1'>
                            {item.count[0]}
                          </Radio>
                          <Radio  style={{display: 'block',height: '30px',lineHeight: '30px'}}   value={item.count[1]} name='kt2'>
                            {item.count[1]}
                          </Radio>
                          <Radio  style={{display: 'block',height: '30px',lineHeight: '30px'}}  value={item.count[2]} name='kt3'>
                            {item.count[2]}
                          </Radio>
                          <Radio  style={{display: 'block',height: '30px',lineHeight: '30px'}}  value={item.count[3]} name='kt4'>
                            {item.count[3]}
                          </Radio>
                          <Radio  style={{display: 'block',height: '30px',lineHeight: '30px'}}  value={item.count[4]} name='kt5'>
                            {item.count[4]}
                          </Radio>

                          <Radio  style={{display: 'block',height: '30px',lineHeight: '30px'}}  value={item.count[5]} name='kt6'>
                            {item.count[5]}
                          </Radio>
                        </Radio.Group>

                      </div>
                    </div>
                )}
              </Form.Item>
            </Card>);
      }else if(item.count.length == 7){
        return (
            <Card style={{height:'10px;'}}>
              <Form.Item  layout="inline">
                {getFieldDecorator(`kantuxuanze_${item.id}`,{ initialValue: null})(
                    <div>
                      <p>{item.wenti}</p>
                      <div style={{width:'100%',height:'100%'}}>
                        <img src={`${url2}/`+item.url} alt="" style={{width:'100%',height:'100%'}} />
                      </div>
                      <div>
                        <Radio.Group>
                          <Radio style={{display: 'block',height: '30px',lineHeight: '30px'}} value={item.count[0]} name='kt1'>
                            {item.count[0]}
                          </Radio>
                          <Radio  style={{display: 'block',height: '30px',lineHeight: '30px'}}   value={item.count[1]} name='kt2'>
                            {item.count[1]}
                          </Radio>
                          <Radio  style={{display: 'block',height: '30px',lineHeight: '30px'}}  value={item.count[2]} name='kt3'>
                            {item.count[2]}
                          </Radio>
                          <Radio  style={{display: 'block',height: '30px',lineHeight: '30px'}}  value={item.count[3]} name='kt4'>
                            {item.count[3]}
                          </Radio>
                          <Radio  style={{display: 'block',height: '30px',lineHeight: '30px'}}  value={item.count[4]} name='kt5'>
                            {item.count[4]}
                          </Radio>

                          <Radio  style={{display: 'block',height: '30px',lineHeight: '30px'}}  value={item.count[5]} name='kt6'>
                            {item.count[5]}
                          </Radio>
                          <Radio  style={{display: 'block',height: '30px',lineHeight: '30px'}}  value={item.count[6]} name='kt7'>
                            {item.count[6]}
                          </Radio>
                        </Radio.Group>

                      </div>
                    </div>
                )}
              </Form.Item>
            </Card>);
      }else if(item.count.length == 8){
        return (
            <Card style={{height:'10px;'}}>
              <Form.Item  layout="inline">
                {getFieldDecorator(`kantuxuanze_${item.id}`,{ initialValue: null})(
                    <div>
                      <p>{item.wenti}</p>
                      <div style={{width:'100%',height:'100%'}}>
                        <img src={`${url2}/`+item.url} alt="" style={{width:'100%',height:'100%'}} />
                      </div>
                      <div>
                        <Radio.Group>
                          <Radio style={{display: 'block',height: '30px',lineHeight: '30px'}} value={item.count[0]} name='kt1'>
                            {item.count[0]}
                          </Radio>
                          <Radio  style={{display: 'block',height: '30px',lineHeight: '30px'}}   value={item.count[1]} name='kt2'>
                            {item.count[1]}
                          </Radio>
                          <Radio  style={{display: 'block',height: '30px',lineHeight: '30px'}}  value={item.count[2]} name='kt3'>
                            {item.count[2]}
                          </Radio>
                          <Radio  style={{display: 'block',height: '30px',lineHeight: '30px'}}  value={item.count[3]} name='kt4'>
                            {item.count[3]}
                          </Radio>
                          <Radio  style={{display: 'block',height: '30px',lineHeight: '30px'}}  value={item.count[4]} name='kt5'>
                            {item.count[4]}
                          </Radio>

                          <Radio  style={{display: 'block',height: '30px',lineHeight: '30px'}}  value={item.count[5]} name='kt6'>
                            {item.count[5]}
                          </Radio>
                          <Radio  style={{display: 'block',height: '30px',lineHeight: '30px'}}  value={item.count[6]} name='kt7'>
                            {item.count[6]}
                          </Radio>
                          <Radio  style={{display: 'block',height: '30px',lineHeight: '30px'}}  value={item.count[7]} name='kt8'>
                            {item.count[7]}
                          </Radio>
                        </Radio.Group>

                      </div>
                    </div>
                )}
              </Form.Item>
            </Card>);
      }










    });
  }
  render() {

    let { getFieldDecorator } = this.props.form;
    const {jiandaArr,kantujiandaArr,kantuArr,lilunduoArr,lilundanArr, panduanArr,code
    }=this.state
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    const checkboxstyle ={
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    }
    const {data,pd1,pdwenti} = this.state
    let panduanHtml = this.getPanduanListHtml();
    let lilundanListHtml=this.lilundanListHtml();
    let lilunduoListHtml = this.lilunduoListHtml();
    let kantuHtmlList = this.kantuHtmlList();
    let getlantujiandaListHtml = this.kantujiandaHtmlList()
    let jiandaHtmlList =this.jiandaHtmlList()
    return (
        <div>
          {/* <Card>
        <h1 style={{textAlign:'center',fontSize:'20px',}}>2016年第一次考试</h1>
      </Card> */}
          {this.state.code == 0 ? 
           <Card>
              <Result
                status="warning"
                title="你已经考过试了，请联系管理员重新考试"
                extra={
                  <Button onClick={this.back} type="primary" key="console">
                    返回
                  </Button>
                }
            />
           </Card>
          :
          <Form layout="inline" onSubmit={this.handleSubmit}>
            {this.state.panduanArr.length == 0? "" :<h1 style={styles.title}>判断题</h1> }
            {panduanHtml}
            {this.state.lilundanArr.length == 0? "" :<h1  style={styles.title}>理论单选题</h1> }
            {lilundanListHtml}
            {this.state.lilunduoArr.length == 0? "" : <h1  style={styles.title}>理论多选题</h1>}
            {lilunduoListHtml}
            {this.state.kantuArr.length == 0? "" :  <h1 style={styles.title}>看图选择</h1>}
            {kantuHtmlList}
            {this.state.kantujiandaArr.length == 0? "" :<h1 style={styles.title}>看图简答</h1> }

            { getlantujiandaListHtml}
            {/* (this.state.) ? (expr2) : (expr3) */}
            {this.state.jiandaArr.length == 0? "" :<h1 style={styles.title}>简答题</h1> }
            {/* <h1 style={styles.title}>简答题</h1> */}
            {jiandaHtmlList}
            <Form.Item>

              {(panduanArr.length == 0)  && (lilundanArr.length == 0)&&(lilunduoArr.length == 0)
              &&(kantuArr.length ==0)&&(kantujiandaArr.length == 0)&&(jiandaArr.length ==0)
                  ?
                  ""
                  :
                  <Button size="large" type="primary" htmlType="submit" style={styles.login} >
                    交卷
                  </Button> }


            </Form.Item>
          </Form>

        }

          


        </div>
    )
  }
}

const styles = {
  login: {
    margin: '16px 450%',
    width:'150px',
    height:'100px',
    fontSize:'30px'
  },
  title:{
    background:'#40a9ff',
    fontSize:'18px',
    marginTop:'20px',
    width:'120px',
    textAlign:'center',
    borderRadius:'50%',
    color:'#fff'
  },
  chouti:{
    display:'block',
    width:'400px',
    height:'400px',
    fontSize:'40px',
    background:'rgb(64, 169, 255)',
    color:'#fff',
    borderRadius:'15%',
    marginLeft:'35%',
    marginTop:'10%',

  },
  choutiwz:{
    display:'block',
    fontSize:'50px',
    marginLeft:'35%',
    paddingTop:'35%'
  },
  body:{
    background:'#fff',
    // height:'990vh',
    height:'5rem',
    overflow:'scroll',
    overflowX: 'auto',
    overflowY: 'hidden'
  }
}
export default ButtonDemo