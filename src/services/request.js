/*
 *  接口请求封装
 * @Author: JQ_Lian
 * @Date: 2020-08-02 12:00:02
 */
import axios from "axios"; // 引入axios
import Qs from "qs"; // 引入qs模块，用来序列化post类型的数据
import store from "../stores/index";
import { autoMatch, checkStatus } from "./utils"; // 处理函数
import { Toast } from "vant"; // 提示框
// 创建axios实例
const instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 20000, // 请求超时时间
    transformRequest: [ // 允许在向服务器发送前，修改请求数据
        function(data) { // 对 data 进行任意转换处理
            return data
        }
    ],
    transformResponse: [ // 在传递给 then/catch 前，允许修改响应数据
        function(data) { // 对 data 进行任意转换处理
            return JSON.parse(data)
        }
    ]
});

// 实例添加请求拦截器
instance.interceptors.request.use(
    function(config) {
        config.headers.hideLoading ? null : store.commit("changeShowLoading", true);
        
        config.headers["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8"; // 数据默认传输格式
        if(config.method === 'get'){ // get请求目前暂不需要单独设置数据传输格式，具体场景具体分析
            // config.headers["Content-Type"] = "application/json;charset=UTF-8"
        }

        config.headers["Authorization"] = "Sys 2001.1528204771000.ee8647b6f5b91531aa26b1b2acb9b458"; // 默认系统签名

        let uid = window.localStorage.getItem("uid");
        let timestamp = Date.parse(new Date()).toString();
        let token = window.localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = "Bearer " + uid + "." + timestamp + "." + token;
        }
        
        const contentType = config.headers["Content-Type"];
        if (contentType) { // 根据Content-Type转换data格式
            if (contentType.includes("multipart")) { // 类型 'multipart/form-data;'
                // config.data = data;
            } else if (contentType.includes("json")) { // 类型 'application/json;'，服务器收到的raw body(原始数据) "{name:"nowThen",age:"18"}"（普通字符串）
                // config.data = JSON.stringify(config.data);
            } else { // 类型 'application/x-www-form-urlencoded;'，服务器收到的raw body(原始数据) name=nowThen&age=18
                config.data = Qs.stringify(config.data);
            }
        }
        return Promise.resolve(config);
    },
    function(error) {
        store.commit("changeShowLoading", false);
        return Promise.reject(error);
    }
);

// 实例添加响应拦截器
instance.interceptors.response.use(
    function(response) {
        store.commit("changeShowLoading", false);
        if (response && response.data.code && response.data.code != 200 && !response.config.headers.hideError) { // 处理失败提示
            Toast(response.data.msg);
        }
        if (response && response.data.status && response.data.status != 200 && !response.config.headers.hideError) { // 处理失败提示
            Toast(response.data.msg);
        }
        return Promise.resolve(response.data);
    },
    function(error) {
        store.commit("changeShowLoading", false);
        if (error.response) {
            return Promise.reject(error.response);
        } else if (error.code == "ECONNABORTED" && error.message.indexOf("timeout") != -1) {
            // return Promise.reject({ msg: "请求超时" });
            Toast('请求超时')
        } else {
            return Promise.reject({});   
        }
    }
);

const request = async function(opt) {
    try {
        // opt.baseURL = autoMatch(opt.prefix)
        const res = await instance(opt);
        return res
    } catch (error) {
        return error
    }
};

export default request;
