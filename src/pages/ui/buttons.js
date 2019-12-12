import React from 'react'
import { Table, Button, Form, Card, message } from 'antd'
import $ from 'jquery'
import '../../../src/config/global'
@Form.create()
class DropdownDemo extends React.Component {
    constructor() {
        super();
        this.state = {
            scorce: '',
            totaWl: 20,
            pageSize: 10,
            visible: false,
            text: ''
        };
    }
    set = (text) => {
        const id = text.id
        const url = global.constants.url
        $.ajax({
            url: `${url}` + '/index/login/resetpassword',
            type: 'get',
            dataType: 'JSON',
            data: {
                id: id
            },
            success: (data) => {
                if (data.code == 0) {
                    message.error(data.info)
                } else if (data.code == 1) {
                    message.success(data.info)
                }
            }
        })
    }

    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) { }
        });
    }
    componentWillMount() { }
    componentDidMount() {
        const url = global.constants.url
        $.ajax({
            url: `${url}` + '/index/login/accountList',
            type: 'post',
            dataType: 'JSON',
            success: (data) => {
                this.setState({
                    data: data.info
                })
            }
        })
    }
    render() {
        const {
            getFieldDecorator,
            getFieldsError,
            getFieldError,
            isFieldTouched
        } = this.props.form;
        const usernameError = isFieldTouched('username') && getFieldError('username');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        const {
            data
        } = this.state;
        const columns = [{
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            align: 'center'
        },
        {
            title: '用户名',
            dataIndex: 'account',
            key: 'account',
            align: 'center'
        },
        {
            title: '身份',
            dataIndex: 'identity',
            key: 'identity',
            align: 'center',
            render: (record, text) => {
                if (record == 0) {
                    return <span > 学生 </span>
                } else if (record == 1) {
                    return <span> 管理员 </span>
                }
            }
        },
        {
            title: '添加时间',
            dataIndex: 'addtime',
            key: 'addtime',
            align: 'center',
            render: (record, text) => {
                return new Date(parseInt(record) * 1000).toLocaleString().replace(/\//g, "-").substr(0, 10);
            }
        },
        {
            title: '操作',
            key: '操作',
            dataIndex: '操作',
            align: 'center',
            render: (record, text) => {
                return <Button type="primary"
                    onClick={
                        () => this.set(text)
                    } > 重置密码 </Button>
            }
        },
        ];
        return (
            <div>

                <Card>
                    <Table id="table" bordered={true} dataSource={data} columns={columns} pagination={{ pageSize: 12 }} rowKey=''
                        rowClassName={
                            (record, index) => {
                                let className = 'light';
                                if (index % 2 === 1) {
                                    return className
                                }
                            }
                        }
                    />
                </Card>


            </div>
        )
    }
}
const style = {
    light: {
        background: 'red'
    },

}

export default DropdownDemo