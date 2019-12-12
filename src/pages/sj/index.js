import React from 'react'
import {Button,  Card, Radio, message,Form,Input,Modal,Checkbox} from 'antd'
import '../../../src/config/global'

const RadioGroup = Radio.Group;
const { TextArea } = Input;
@Form.create()
class ButtonDemo extends React.Component {
  constructor(props) {
    super(props)
    let userid = JSON.parse(localStorage.getItem('userinfo')).id;
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
      show:1,
      visible: false ,
      url2:'',
      p_id:'',
      value:'',
      dxva:[]
    }
  }
  tochouti  =()=>{
    this.props.history.push("./kaoshi");
    // const {baoguang}=this.state
    // if(baoguang==0){
    //   this.props.history.push("./icon");
    // }else{
    //   message.error('您已经考过试了')
    // }

  }
  componentDidMount(){
    let userdata = this.props.location.state||localStorage.getItem('baoguang');
    this.setState({
      baoguang:userdata
    })
  }
  componentWillMount(){

  }
  render() {
    let { getFieldDecorator } = this.props.form;
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

    return (
        <div>
          {/* <Card>
        <h1 style={{textAlign:'center',fontSize:'20px',}}>2016年第一次考试</h1>
      </Card> */}
         
          <div onClick={this.tochouti}><span style={{background:'#fff'}} className={styles.chouti} onClick={this.chouti} style={styles.chouti} ><span style={styles.choutiwz}>抽题</span></span></div>


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
    width:'250px',
    height:'250px',
    fontSize:'40px',
    background:'rgb(64, 169, 255)',
    color:'#fff',
    borderRadius:'15%',
    // marginLeft:'38%',
    // marginTop:'15%'
    margin:'15% auto',
  },
  choutiwz:{
    display:'block',
    fontSize:'50px',
    marginLeft:'35%',
    paddingTop:'35%'
  },

}
export default ButtonDemo