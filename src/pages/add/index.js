import React from 'react'
import { Form, Input, Button, message, InputNumber, Card } from 'antd'
import $ from 'jquery'
import '../../../src/config/global'
import { Editor } from "react-draft-wysiwyg";
import draftjs from "draftjs-to-html";
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
@Form.create()
class Add extends React.Component {
    state = {
        showRichText: false,
        editorContent: "",
        editorState: ""
    };
    componentDidMount() {

    }
    componentWillUnmount() {

    }
    handleClearContent = () => {
        //清空文本
        this.setState({
            editorState: "",
            editorContent: ""
        });
    };
    handleGetText = () => {
        //获取文本内容
        this.setState({
            showRichText: true
        });
    };
    onEditorStateChange = editorState => {
        //编辑器的状态
        this.setState({
            editorState
        });
    };
    onEditorChange = editorContent => {
        console.log(editorContent.blocks)
        console.log(editorContent.block)
        //编辑器内容的状态
        this.setState({
            editorContent
        });
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const url = global.constants.url
                $.ajax({
                    type: 'post',
                    url: `${url}` + '/index/login/accountAdd',
                    datatype: 'json',
                    data: values,
                    success: (data) => {
                        data = JSON.parse(data)
                        if (data.code == 1) {
                            message.success(`${data.info.info}${data.info.account}个账号`);
                            this.props.form.resetFields();
                        } else {
                            message.error(data.info)
                            this.props.form.resetFields();
                        }

                    },
                    Error: (data) => {
                        // message.Error('新增失败');
                    }
                })
            }
        });
    };

    render() {
        const { editorState, editorContent } = this.state;
        const { TextArea } = Input;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 1 },
            wrapperCol: { span: 8 },
        };
        return (
            <div >
                <Card >
                    <Form onSubmit={this.handleSubmit} >
                        <Form.Item {...formItemLayout} label="账号" > {
                            getFieldDecorator('account', {
                                initialValue: null,
                                rules: [{
                                    required: true,
                                    message: '请输入账号'
                                }],
                            })(
                                <Editor
                                    editorState={editorState}
                                    onEditorStateChange={this.onEditorStateChange}
                                    onContentStateChange={this.onEditorChange}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                />
                            )
                        }
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="账号数量:" > {
                            getFieldDecorator('accountnum', {
                                rules: [{
                                    required: true,
                                    message: '请输入账号数量'
                                }],
                            })(<InputNumber size="large" min={1} max={100000}
                                style={
                                    {
                                        width: '540px',
                                        marginLeft: '3%'
                                    }
                                }

                                placeholder="请输入账号数量" />
                            )
                        }
                        </Form.Item>
                        <Form.Item >
                            <Button type="primary" htmlType="submit" >提交 </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }
}
const styles = {
    body: {
        display: 'block',
        background: '#fff',
        height: '53rem',
        overflow: 'hidden',
        paddingTop: '30px',
        position: 'relative',
    }
}
export default Add