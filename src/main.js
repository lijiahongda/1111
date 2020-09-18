/**
 * @description: 项目入口文件
 * @author: nowThen
 */

import Vue from "vue";
import App from "./App.vue";
import router from "./routers/";
import "./routers/intercept";
import store from "./stores";
import * as filters from "./filters/";
import "lib-flexible";

import "./styles/main.less";

import FastClick from "fastclick";
import "./utils/rem";
import {
    GetUrlParam
} from "./utils/index";

FastClick.attach(document.body);
// input点击不灵敏
FastClick.prototype.focus = function (targetElement) {
    targetElement.focus();
}
Vue.config.errorHandler = (err, vm, info) => {
    // console.error(err);
};
Vue.config.devtools = process.env.NODE_ENV === "development";
Vue.config.productionTip = process.env.NODE_ENV === "production";

window.EventBus = new Vue();
//存储关系
let _codenumber = GetUrlParam('codeNumber');
if (_codenumber) {
    store.commit('changeCodeNumber', _codenumber)
}
let _roomid = GetUrlParam('room_id');
if (_roomid) {
    store.commit('changeRoomid', _roomid)
}
let _liveid = GetUrlParam('liveid');
if (_liveid) {
    store.commit('changeLiveid', _liveid)
}
let _livepeopleid = GetUrlParam('live_people_id');
if (_livepeopleid) {
    store.commit('changeLivePeopleid', _livepeopleid)
}
// 注册过滤器
Object.keys(filters).forEach((key) => {
    Vue.filter(key, filters[key]);
});

window.myVue = new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");