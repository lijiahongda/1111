/**
 * @Author: nowThen
 * @Date: 2019-08-22 14:30:51
 */

import Vue from "vue";
import Vuex from "vuex";

import router from "../routers/index";
import { getWxConfig } from "@/services/goods.js";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        showLoading: false,
        showSku: false,
        codeNumber: '', // 分享码
        room_id:"",//关系id
        live_id:"",//直播间id
        live_people_id:"",//主播id
        addressInfo: {}, // 详情页面地址信息中转处理
        addressReady: false,
        skuIdx: 0, // 规格信息索引
        interceptUrl: ''
    },
    mutations: {
        changeShowLoading: (state, status) => {
            state.showLoading = status;
        },
        changeShowSku: (state, status) => {
            state.showSku = status;
        },
        changeCodeNumber: (state,status) => {
            state.codeNumber = status;
        },
        changeRoomid: (state,status) => {
            state.room_id = status;
        },
        changeLiveid: (state,status) => {
            state.live_id = status;
        },
        changeLivePeopleid: (state,status) => {
            state.live_people_id = status;
        },
        handleAddressInfo: (state,status) => {
            state.addressInfo = status;
        },
        changeAddressReady: (state,status) => {
            state.addressReady = status;
        },
        changeSkuIdx: (state,status) => {
            state.skuIdx = status;
        },
        changeInterceptUrl: (state,status) => { // 缓存登录拦截的地址
            state.interceptUrl = status
            window.sessionStorage.setItem('detailUrl',status)
        }
    },
    actions: {
        loginIntercept({commit,state},obj){ // 登录逻辑
            if(!window.localStorage.getItem('uid')){
                if(obj.codeNumber){
                    router.replace('/login?codeNumber=' + obj.codeNumber + '&intercept=1')
                }else{
                    router.replace('/login?intercept=1')
                }
            }
        },
        wxConfigInit({commit,state},data){ // 微信配置
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) != "micromessenger") {
                return
            }
            getWxConfig({
                share_url: encodeURIComponent(window.location.href)
            }).then(res => {
                if(res.code == 200){
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: res.data.app_id, // 必填，企业号的唯一标识，此处填写企业号corpid
                        timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                        nonceStr: res.data.noncestr, // 必填，生成签名的随机串
                        signature: res.data.signature, // 必填，签名，见附录1
                        jsApiList: [
                            "onMenuShareTimeline",
                            "onMenuShareAppMessage",
                        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                    wx.ready(function() {
                        wx.onMenuShareTimeline({
                            //分享到朋友圈
                            title: data.title, // 分享标题
                            desc: data.desc, // 分享描述
                            link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: data.imgUrl // 分享图标
                        });
                        wx.onMenuShareAppMessage({
                            //分享给朋友
                            title: data.title, // 分享标题
                            desc: data.desc, // 分享描述
                            link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: data.imgUrl // 分享图标
                        });
                    });
                }
            })
        },
        wxConfigDefault({commit,state},data){ // 悦淘商城默认分享
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) != "micromessenger") {
                return
            }
            wx.ready(function() {
                wx.onMenuShareTimeline({ //分享到朋友圈
                    title: "悦淘商城", // 分享标题
                    desc: "精致生活的美好体验", // 分享描述
                    link: 'https://web.yuetao.group/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: "https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-02-17/13/yuelvhuiQJwXComJ821581918103.jpg", // 分享图标
                });
                wx.onMenuShareAppMessage({ //分享给朋友
                    title: "悦淘商城", // 分享标题
                    desc: "精致生活的美好体验", // 分享描述
                    link: 'https://web.yuetao.group/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: "https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-02-17/13/yuelvhuiQJwXComJ821581918103.jpg", // 分享图标
                });
            });
        }
    }
});

export default store;
