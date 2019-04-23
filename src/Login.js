import React, {Component} from 'react';
import * as PPAxios from './util/PPAxios';

import './App.css';

import {
    Form, Icon, Input, Button, Checkbox,
} from 'antd';

class LoginForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let bodyFormData = new FormData();
                bodyFormData.set('username', values.username);
                bodyFormData.set('password', values.password);

                PPAxios.httpPost("http://localhost:8080/login", bodyFormData)
                    .then(() => {
                        this.props.history.push(`/`);
                    })
                    .catch(() => {
                        console.log("test error")
                    });

                // axios({
                //     method: 'post',
                //     url: 'http://localhost:8080/login',
                //     data: bodyFormData,
                //     config: {headers: {'Content-Type': 'multipart/form-data'}},
                //     withCredentials: true
                // }).then((response) => {
                //     //handle success
                //     if (response.data == "") {
                //         this.props.history.push(`/`);
                //     } else {
                //         // show error
                //     }
                //
                // }).catch((error) => {
                //     //handle error
                //     console.log("error", error.response.data.message);
                // });
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
            }}>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{required: true, message: 'Please input your username!'}],
                        })(
                            <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                   placeholder="Username"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: 'Please input your Password!'}],
                        })(
                            <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                                   placeholder="Password"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const WrappedLoginForm = Form.create({name: 'normal_login'})(LoginForm);

export default WrappedLoginForm;

