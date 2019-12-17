// src\pages\login\index.js
import React from "react";
import { 
  Form,
  Input,
  Button, 
  Modal,
  Icon,
  message } from "antd";
import Footer from "../../components/Footer";
import "./index.less";
import { connect } from "react-redux"; // 连接器
import { switchUsers } from "./../../redux/action"; //事件行为
import $ from 'jquery'
import '../../../src/config/global'
const url = global.constants.url
const FormItem = Form.Item;
@Form.create()
class Login extends React.Component {
  state = {
    totalData:'',
    focusItem: -1,   //保存当前聚焦的input
    code1: '' ,        //验证zzzzzzzzzzzzzzz码
    ny:[]
  };

  componentDidMount() {
    //每次进入登录页清除之前的登录信息

  }
 
  loginReq = params => {
    // 事件派发，自动调用reducer，通过reducer讲用户名保存到store对象中
    
  };

  componentDidMount() {
    //每次进入登录页清除之前的登录信息
    var show_num = [];
    this.draw(show_num)
  }
  change=()=>{
    var show_num = [];
    this.draw(show_num)
  }
  change1=()=>{
    var show_num = [];
    this.draw1(show_num)
  }
  draw=(show_num)=> {
    var canvas_width=$('#canvas').width();
    var canvas_height=$('#canvas').height();
    var canvas = document.getElementById("canvas");//获取到canvas的对象，演员
    var context = canvas.getContext("2d");//获取到canvas画图的环境，演员表演的舞台
    canvas.width = canvas_width;
    canvas.height = canvas_height;
    var sCode = "A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
    var aCode = sCode.split(",");
    var aLength = aCode.length;//获取到数组的长度
    for (var i = 0; i <= 3; i++) {
      var j = Math.floor(Math.random() * aLength);//获取到随机的索引值
      var deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
      var txt = aCode[j];//得到随机的一个内容
      show_num[i] = txt.toLowerCase();
      var x = 10 + i * 20;//文字在canvas上的x坐标
      var y = 20 + Math.random() * 8;//文字在canvas上的y坐标
      context.font = "bold 23px 微软雅黑";
      context.translate(x, y);
      context.rotate(deg);
      context.fillStyle = this.randomColor();
      context.fillText(txt, 0, 0);
      context.rotate(-deg);
      context.translate(-x, -y);
      this.setState({
        ny: show_num
      })
    }
    for (var i = 0; i <= 5; i++) { //验证码上显示线条
      context.strokeStyle =this.randomColor();
      context.beginPath();
      context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
      context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
      context.stroke();
    }
    for (var i = 0; i <= 30; i++) { //验证码上显示小点
      context.strokeStyle = this.randomColor();
      context.beginPath();
      var x = Math.random() * canvas_width;
      var y = Math.random() * canvas_height;
      context.moveTo(x, y);
      context.lineTo(x + 1, y + 1);
      context.stroke();
    }
  }




  draw1=(show_num)=> {
    var canvas_width=$('#canvas1').width();
    var canvas_height=$('#canvas1').height();
    var canvas = document.getElementById("canvas1");//获取到canvas的对象，演员
    var context = canvas.getContext("2d");//获取到canvas画图的环境，演员表演的舞台
    canvas.width = canvas_width;
    canvas.height = canvas_height;
    var sCode = "A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
    var aCode = sCode.split(",");
    var aLength = aCode.length;//获取到数组的长度
    for (var i = 0; i <= 3; i++) {
      var j = Math.floor(Math.random() * aLength);//获取到随机的索引值
      var deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
      var txt = aCode[j];//得到随机的一个内容
      show_num[i] = txt.toLowerCase();
      var x = 10 + i * 20;//文字在canvas上的x坐标
      var y = 20 + Math.random() * 8;//文字在canvas上的y坐标
      context.font = "bold 23px 微软雅黑";
      context.translate(x, y);
      context.rotate(deg);
      context.fillStyle = this.randomColor();
      context.fillText(txt, 0, 0);
      context.rotate(-deg);
      context.translate(-x, -y);
      this.setState({
        ny: show_num
      })
    }
    for (var i = 0; i <= 5; i++) { //验证码上显示线条
      context.strokeStyle =this.randomColor();
      context.beginPath();
      context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
      context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
      context.stroke();
    }
    for (var i = 0; i <= 30; i++) { //验证码上显示小点
      context.strokeStyle = this.randomColor();
      context.beginPath();
      var x = Math.random() * canvas_width;
      var y = Math.random() * canvas_height;
      context.moveTo(x, y);
      context.lineTo(x + 1, y + 1);
      context.stroke();
    }
  }
   randomColor=()=> {//得到随机的颜色值
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
  }





  loginSubmit = e => {
    console.log(123)
    e && e.preventDefault();
    const {ny}=this.state
    const _this = this;
    this.props.form.validateFieldsAndScroll((err, values) => {
      const account = values.account;
      const pwd = values.pwd;
      if (!err) {
        var show_num= []
        var num = ny.join("");
        let val =values.yzm
        console.log(num)
        if(val == undefined){
          message.error('请输入验证码！'); 
        }else{
          if(val.toLowerCase() == num){

            $.ajax({
              url:`${url}`+`/index/login/studentlogin`,
              type:'post',
              dataType:'json',
              data:{account:account,pwd:pwd},
              success:(data)=>{
                 
                if(data.code == 1 ){
                  window.location.href = "/#/information";
                  localStorage.setItem("identity",data.info.userinfo.identity)
                  localStorage.setItem("userinfo",data.info.userinfo.id)
                  var formValue = _this.props.form.getFieldsValue();
                  // _this.props.loginSubmit({
                  //   username: formValue.username,
                  //   password: formValue.password
                  // });
                  message.success(data.info.tishi)
                  // this.props.appStore.toggleLogin(true, {username: values.username,'usertype':'student','userinfo':data.info.userinfo,"test":'学生'})
                  // this.props.history.push({pathname:'./Mindex',state:{baoguang:data.info.baoguang,baoguanginfo:data.info.baoguanginfo,'test':'学生'}});
                  // localStorage.setItem('test', '学生');
                  //  localStorage.setItem('test', data.info.userinfo.id);
                }else{
                  message.error('账号密码错误');
                   this.draw(show_num);
                }
              }
            })

          }else{
            message.error('验证码错误！');
          }
        }


      }
    });
  };



  loginSubmit1 = e => {
    console.log(123)
    e && e.preventDefault();
    const {ny}=this.state
    const _this = this;
    this.props.form.validateFieldsAndScroll((err, values) => {
      const account = values.account;
      const pwd = values.pwd;
      if (!err) {
        var show_num= []
        var num = ny.join("");
        let val =values.yzm
        console.log(num)
        if(val == undefined){
          message.error('请输入验证码！'); 
        }else{
          if(val.toLowerCase() == num){

            $.ajax({
              url:`${url}`+`/index/login/adminlogin`,
              type:'post',
              dataType:'json',
              data:{account:account,pwd:pwd},
              success:(data)=>{
                 
                if(data.code == 1 ){

                  window.location.href = "/#/information";
                  localStorage.setItem("identity",data.info.userinfo.identity)
                  localStorage.setItem("userinfo",data.info.userinfo.id)
                  var formValue = _this.props.form.getFieldsValue();
                  // _this.props.loginSubmit({
                  //   username: formValue.username,
                  //   password: formValue.password
                  // });
                  message.success(data.info.tishi)
                  // this.props.appStore.toggleLogin(true, {username: values.username,'usertype':'student','userinfo':data.info.userinfo,"test":'学生'})
                  // this.props.history.push({pathname:'./Mindex',state:{baoguang:data.info.baoguang,baoguanginfo:data.info.baoguanginfo,'test':'学生'}});
                  // localStorage.setItem('test', '学生');
                  //  localStorage.setItem('test', data.info.userinfo.id);
                }else{
                  message.error('账号密码错误');
                  this.draw1(show_num);
                }
              }
            })

          }else{
            message.error('验证码错误！');
          }
        }


      }
    });
  };


  checkUsername = (rule, value, callback) => {
    var reg = /^\w+$/;
    if (!value) {
      callback("请输入用户名!");
    } else if (!reg.test(value)) {
      callback("用户名只允许输入英文字母");
    } else {
      callback();
    }
  };

  checkPassword = (rule, value, callback) => {
    if (!value) {
      callback("请输入密码!");
    } else {
      callback();
    }
  };
  toadmin=()=>{
    var show_num = [];
    this.draw1(show_num)
    $(".student").css("display","none")
    $(".admin").css("display","block")
  }
  tostudent=()=>{
    $(".student").css("display","block")
    $(".admin").css("display","none")
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-page">
        <div className="login-header">
          <div className="logo">
            <img src="/assets/logo.ico" alt=" 工业X射线探伤模拟教学考试系统" />
           工业X射线探伤模拟教学考试系统
          </div>
        </div>
        <div className="login-content-wrap">
          <div className="login-content">
            <div className="word">
              工业探伤 <br />
              模拟教学考试
            </div>
            <div className="login-box">
              <div className="error-msg-wrap">
                <div className={this.state.errorMsg ? "show" : ""}>
                  {this.state.errorMsg}
                </div>
              </div>
          <div className="student">
          <div className="title">学生登陆</div>
        <Form className="login-form">
        <FormItem>
          {getFieldDecorator("account", {
            initialValue: "",
            rules: [{ validator: this.checkUsername }]
          })(<Input placeholder="用户名" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("pwd", {
            initialValue: "",
            rules: [{ validator: this.checkPassword }]
          })(
            <Input
              type="password"
              placeholder="密码"
              wrappedcomponentref={inst => (this.pwd = inst)}
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('yzm', {
           
               })(
                  <Input
                    style={{width:"65%"}}
                    placeholder="验证码"
                      />
               )}
             <canvas id="canvas" style={{marginLeft:'10px',position:'absolute',border:"1px solid #99CCFF",background:"#fff",width:'100px',height:'30px',marginTop:"5px"}} onClick={this.change}></canvas>
             </FormItem>
        <FormItem style={{marginTop:"-10px"}}>
          <Button
            type="primary"
            onClick={this.loginSubmit}
            className="login-form-button"
            
          >
            登录
          </Button>
        </FormItem>
      </Form>
      <a onClick={this.toadmin} style={{right:"30px",position:"absolute"}}>管理员登陆</a>
      </div>
      <div className="admin" style={{display:"none"}}>
          <div className="title">管理员登陆</div>
        <Form className="login-form">
        <FormItem>
          {getFieldDecorator("account", {
            initialValue: "",
            rules: [{ validator: this.checkUsername }]
          })(<Input placeholder="用户名" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("pwd", {
            initialValue: "",
            rules: [{ validator: this.checkPassword }]
          })(
            <Input
              type="password"
              placeholder="密码"
              wrappedcomponentref={inst => (this.pwd = inst)}
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('yzm', {
               })(
                  <Input
                    style={{width:"65%"}}
                    placeholder="验证码"
                      />
               )}
             <canvas id="canvas1" style={{marginLeft:'10px',position:'absolute',border:"1px solid #99CCFF",background:"#fff",width:'100px',height:'30px',marginTop:"5px"}} onClick={this.change1}></canvas>
             </FormItem>
            <FormItem style={{marginTop:"-10px"}}>
              <Button
                type="primary"
                onClick={this.loginSubmit1}
                className="login-form-button" 
              >
            登录
          </Button>
        </FormItem>
      </Form>
      <a onClick={this.tostudent} style={{right:"30px",position:"absolute"}}>学生登陆</a>
      </div>
              </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default Login



