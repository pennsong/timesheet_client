import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import {Layout, Menu, Icon, Table, Divider, Tag, message} from 'antd';
import * as PPAxios from './util/PPAxios';
import PubSub from 'pubsub-js'

const {
    Header, Content, Footer, Sider,
} = Layout;

const columns = [{
    title: 'id',
    dataIndex: 'id',
    key: 'id'
}, {
    title: '公司',
    dataIndex: 'gongSi_mingCheng',
    key: 'gongSi_mingCheng',
}, {
    title: '项目',
    dataIndex: 'xiangMu_mingCheng',
    key: 'xiangMu_mingCheng',
}, {
    title: '人员',
    dataIndex: 'yongHu_yongHuMing',
    key: 'yongHu_yongHuMing',
}, {
    title: '开始',
    key: 'kaiShi',
    dataIndex: 'kaiShi'
}, {
    title: '结束',
    key: 'jieShu',
    dataIndex: 'jieShu'
},, {
    title: '备注',
    key: 'beiZhu',
    dataIndex: 'beiZhu'
}];

class HomePage extends Component {
    state = {
        data: [],
        size: 10,
        page: 1
    }

    needLoginSub;

    logout = () => {
        // todo logout
        this.props.history.push(`/login`);
    }

    needLogin = () => {
        message.error('请登录!', 5);
        this.props.history.push(`/login`);
    }

    componentDidMount() {
        this.needLoginSub = PubSub.subscribe("NEED_LOGIN", this.needLogin);
        this.gainData();

    }

    gainData() {
        PPAxios.httpGet('http://localhost:8080/admin/queryGongZuoJiLu',
            {
                size: this.state.size,
                page: this.state.page - 1
            }
        )
            .then((response) => {
                const {content} = response.data.data;
                const {totalElements} = response.data.data;
                const {empty} = response.data.data;
                const {totalPages} = response.data.data;

                if (empty == true && totalPages > 0) {
                    // 由于每页数量增加了, 页面减少导致目前是在最后一页显示空的数据, 需要重新抓取下
                    console.log("current page:" + this.state.page);
                    this.setState({
                        page: totalPages
                    }, this.gainData())
                    return;
                }

                this.setState({
                    data: content,
                    totalElements
                });
            })
            .catch(() => {
            })
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.needLoginSub)
    }

    paginationOnChange = (page, pageSize) => {
        this.setState({
            page,
            size: pageSize
        }, () => {
            this.gainData();
        })

    }

    paginationOnShowSizeChange = (current, size) => {
        this.setState({
            size
        }, () => {
            this.gainData();
        })
    }

    render() {
        return (
            <Layout>
                <Sider style={{
                    overflow: 'auto', height: '100vh', position: 'fixed', left: 0
                }}
                >
                    <div style={{height: '100vh', width: "200px", display: "flex", flexDirection: "column"}}>
                        <div className="logo">
                        </div>
                        <div style={{flex: 1}}>
                            <Menu theme="dark" mode="inline" selectable={false}>
                                <Menu.Item key="1">
                                    <Icon type="file-text"/>
                                    <span className="nav-text">工作记录</span>
                                </Menu.Item>
                            </Menu>
                        </div>
                        <div style={{height: "50px", marginBottom: "100px", marginLeft: "40px"}}>
                            <Menu theme="dark" mode="inline" selectable={false}>
                                <Menu.Item key="0" onClick={this.logout}>
                                    <Icon type="logout"/>
                                    <span className="nav-text">登出</span>
                                </Menu.Item>
                            </Menu>
                        </div>
                    </div>
                </Sider>
                <Layout style={{
                    marginLeft: 200,
                    display: "flex",
                    flexDirection: "column",
                    height: '100vh',
                    background: "#fff"
                }}>
                    <Header style={{background: '#fff', padding: 0, height: "50px"}}/>
                    <Content style={{margin: '24px 16px 0', flex: 1, overflow: "auto"}}>
                        <Table columns={columns} rowKey="id" dataSource={this.state.data}
                               pagination={{
                                   onChange: this.paginationOnChange,
                                   onShowSizeChange: this.paginationOnShowSizeChange,
                                   total: this.state.totalElements,
                                   pageSize: this.state.size,
                                   showSizeChanger: true,
                                   pageSizeOptions: ['10', '50', '200'],
                               }}
                        />
                    </Content>
                    <Footer style={{textAlign: 'center', height: "50px"}}>
                        ©2019 Created by Ugeez
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default HomePage;
