import axios from 'axios';
import {message} from "antd";
import PubSub from "pubsub-js";

export function httpPost(url, data) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: 'http://localhost:8080/login',
            data,
            config: {headers: {'Content-Type': 'multipart/form-data'}},
            withCredentials: true
        }).then((response) => {
            // 如果response.data.code不存在, 需要提示程序改进
            if (!(response.data && response.data.code)) {
                console.error(response);
                message.error("未处理的异常, 请看console!", 5);
                // 把未处理的response类型当错误抛出
                reject(response);
            } else {
                if (response.data.code != 1) {
                    message.error(response.data.message, 5);
                    // 把未处理的response类型当错误抛出
                    reject(response);
                } else {
                    // 返回成功的response
                    resolve(response);
                }
            }
        }).catch((error) => {
            if (!(error.response && error.response.data && error.response.data.code)) {
                console.error(error);
                message.error("未处理的异常, 请看console!", 5);
                // 只需要抛出异常, 不要抛出信息了, 错误信息在这里已经处理了
                reject();
            } else {
                message.error(error.response.data.message, 5);
                if (error.response.data.code == '401') {
                    PubSub.publish("NEED_LOGIN");
                }
                // 只需要抛出异常, 不要抛出信息了, 错误信息在这里已经处理了
                reject();
            }
        });
    });
}

export function httpGet(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params,
            withCredentials: true
        }).then((response) => {
            // 如果response.data.code不存在, 需要提示程序改进
            if (!(response.data && response.data.code)) {
                console.error(response);
                message.error("未处理的异常, 请看console!", 5);
                // 把未处理的response类型当错误抛出
                reject(response);
            } else {
                if (response.data.code != 1) {
                    message.error(response.data.message, 5);
                    // 把未处理的response类型当错误抛出
                    reject(response);
                } else {
                    // 返回成功的response
                    resolve(response);
                }
            }
        }).catch((error) => {
            if (!(error.response && error.response.data && error.response.data.code)) {
                console.error(error);
                message.error("未处理的异常, 请看console!", 5);
                // 只需要抛出异常, 不要抛出信息了, 错误信息在这里已经处理了
                reject();
            } else {
                if (error.response.data.code == '401') {
                    PubSub.publish("NEED_LOGIN");
                } else {
                    message.error(error.response.data.message, 5);
                }
                // 只需要抛出异常, 不要抛出信息了, 错误信息在这里已经处理了
                reject();
            }
        });
    });
}

export function httpDelete() {

}
