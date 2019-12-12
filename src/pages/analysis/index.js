import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';
import {Button, Form, DatePicker, message,Card,Result, Icon,} from 'antd'
import $ from 'jquery'
import '../../../src/config/global'
const {  RangePicker } = DatePicker;
@Form.create()
 class componentName extends Component {
    constructor() {
        super();
        this.state = {
            sjmc:[],
            zf:[],
            sjmc1:[],
            zf1:[],
            account:[],
            nickname:[],
            baoguang:[],
            chartdata:""
        }}
        handleSubmit = (e) => {
            const {sjmc1,zf1}=this.state
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
                            url:`${url2}`+'/index/addpaper/kaoshijilu',
                            data:{start_time:start_time,end_time:end_time},
                            type:'post',
                            dataType:'json',
                            success: (data)=>{
                                this.setState({
                                    chartdata:data.info
                                },()=>{console.log(this.state.chartdata)})
                                if(data.info.length>0){
                                    data.info.forEach((item,index)=>{
                                        sjmc1.push(item.name)
                                        zf1.push(Number(item.jiandafenshu)+Number(item.kantufenshu)+Number(item.kantujiandafenshu)+Number(item.lilundanfenshu)+Number(item.lilunduofenshu)+Number(item.panduanfenshu))
                                        this.setState({
                                            sjmc:sjmc1,
                                            zf:zf1
                                        })
                                    })
                                }else{
                                    this.setState({
                                        sjmc:'',
                                        zf:''
                                    })
                                }
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
        
    componentDidMount(){
        const {sjmc,zf,baoguang,chartdata}=this.state
        const url = global.constants.url
        let userid = JSON.parse(localStorage.getItem('userinfo')).id;
        $.ajax({
          url: `${url}` + '/index/addpaper/kaoshijilu',
          type: 'get',
          dataType: 'json',
          success: (data) => {
                data.info.forEach((item,index)=>{
                sjmc.push(item.name)
                baoguang.push(item.baoguang)
                // zf.push(item.baoguang +`(${item.jiandafenshu})`)
                zf.push(Number(item.jiandafenshu)+Number(item.kantufenshu)+Number(item.kantujiandafenshu)+Number(item.lilundanfenshu)+Number(item.lilunduofenshu)+Number(item.panduanfenshu))
            })
            this.setState({
                sjmc:sjmc,
                zf:zf,
                baoguang:baoguang,
                chartdata:data.info
            })
          }
        })
    }
    render() {
        const config = {
            // rules: [{ type: 'object', required: true, message: 'Please select time!' }],
          };
          const rangeConfig = {
            // rules: [{ type: 'array', required: true, message: 'Please select time!' }],
          };
        const formItemLayout = {
            labelCol: { span:5},
            wrapperCol: { span: 1 },
          };
          const { getFieldDecorator } = this.props.form;
          const { getFieldError, isFieldTouched } = this.props.form;
          const { data } = this.state;
          const {sjmc,zf,baoguang}=this.state
        const option = {
            grid: {
                bottom: '155px',
            },
           
            dataZoom: [
                {
                    show: true,
                    realtime: true,
                    start: 65,
                    end: 85
                },
                {
                    type: 'inside',
                    realtime: true,
                    start: 65,
                    end: 85
                },
               
            ],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            xAxis: [
                {
                  type: 'category',
                  data: this.state.sjmc,
                  axisPointer: {
                    type: 'line'
                  },
                  itemStyle: {
                      
                  },

                  axisLabel: {    
                      
                    interval: 0,
                                                  formatter:function(value)
                                                  {
                                                      var ret = "";//拼接加\n返回的类目项
                                                      var maxLength = 8;//每项显示文字个数
                                                      var valLength = value.length;//X轴类目项的文字个数
                                                      var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
                                                      if (rowN > 1)//如果类目项的文字大于3,
                                                      {
                                                          for (var i = 0; i < rowN; i++) {
                                                              var temp = "";//每次截取的字符串
                                                              var start = i * maxLength;//开始截取的位置
                                                              var end = start + maxLength;//结束截取的位置
                                                              //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                                                              temp = value.substring(start, end) + "\n";
                                                              ret += temp; //凭借最终的字符串
                                                          }
                                                          return ret;
                                                      }
                                                      else {
                                                          return value;
                                                      }
                                                  }
      
                        },
                        axisLine:{
                 lineStyle:{
                      // x坐标轴的轴线颜色
                   
                 }
             }
                }
              ],

            yAxis: {
                type: 'value',
                name: '分数'
            },
            series: [ 
                {
                    name: '总分',
                    data: this.state.zf,
                    type: 'bar',
                    itemStyle:{ normal:{ color:'#1890ff' } },
                    barWidth:40,
              
                }, 
                // {
                //     name: '曝光分数',
                //     data: this.state.baoguang,
                //     type: 'bar',
                //     itemStyle:{ normal:{ color:'#00AEAE' } },
                //     barWidth:40
                // },
            ],


            toolbox: {
                show: true,
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    dataView: {readOnly: false},
                    magicType: {type: ['line', 'bar']},
                    restore: {},
                    saveAsImage: {}
                }
            },

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
          </Form>
               
                {this.state.chartdata.length>0? 
                　<ReactEcharts  option={option} style={{height:'700px',width:'100%'}}/>
                :
                <Result
                status="error"
                title="按您搜索的条件没有找到数据"
              />
                }
                </Card>
                
                {/*<span style={{color:'red',marginLeft:'100px'}}>不及格：50分&nbsp;&nbsp;&nbsp;&nbsp;差：70分&nbsp;&nbsp;&nbsp;&nbsp;良好：85分&nbsp;&nbsp;&nbsp;&nbsp;优秀：100分</span>*/}
            </div>
        )
    }
}
export default  componentName