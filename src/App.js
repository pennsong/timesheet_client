import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import {BrowserRouter, Switch, Route} from 'react-router-dom'

import {Layout, Menu, Icon, Table, Divider, Tag} from 'antd';

import HomePage from './HomePage';
import Login from './Login';

const App = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route path='/login' component={Login}/>
        </Switch>
    </BrowserRouter>
)

export default App;
