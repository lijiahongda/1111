<template>
    <div class="content">
        <!-- 打开APP提示 -->
        <OpenAppHead/>
        <!-- 需要输入密码的直播间，显示输入密码的弹窗 -->
        <div v-if="ready && codeStatus == 200 && userInfo.isPwd == 1">
            <div class="black_bg"></div>
            <div class="passwordBox">
                <div class="tit" v-if="truePassword">直播间密码</div>
                <input type="text" v-if="truePassword" v-model="password" placeholder="请输入直播间密码" />
                <div class="tit1" v-if="!truePassword">直播间密码错误</div>
                <div class="btn_d" v-if="truePassword">进入直播间</div>
                <div class="btn_d" v-if="!truePassword" @click="truePassword = true">重新输入</div>
            </div>
        </div>
        <!-- 直播插件 -->
        <div v-show="codeStatus == 200" id="id_video" :style="heightbody"></div>
        <!-- 头像昵称 -->
        <div class="live-info" v-if="ready && codeStatus == 200">
            <div class="person">
                <img class="head_img" :src="userInfo.head_url" alt="">
                <div class="head_bg">{{userInfo.nickname}}</div>
                <div class="couponred">
                    <img src="https://yuelvdaren-1300766538.cos.ap-beijing.myqcloud.com/daren/2020/07/12/5f0b070b7fe971594558219.png" alt="">
                    <div>1</div>
                </div>
            </div>
        </div>
        <!-- 优惠券 -->
        <div v-if="ready && codeStatus == 200 && false">
            <div class="black_bg"></div>
            <div class="coupon">
                <img class="coupon_bg" src="https://yuelvdaren-1300766538.cos.ap-beijing.myqcloud.com/daren/2020/07/10/5f0844bd985fc1594377405.png" alt="">
                <img class="coupon_close" src="https://yuelvdaren-1300766538.cos.ap-beijing.myqcloud.com/daren/2020/07/08/5f05afac1ce901594208172.png" alt="">
                <div class="coupon_cont">
                    <div class="tips">恭喜您</div>
                    <div class="title">亲爱的同学</div>
                    <div class="price">
                        <span style="font-size:0.42rem;">¥</span>
                        <span>200</span>
                    </div>
                    <div>满100元可用</div>
                    <div class="use">立即领取</div>
                </div>
            </div>
        </div>
        <!-- 留言信息---IM -->
        <div class="chat" v-if="ready && codeStatus == 200">
            <div class="chatList">
                <span>同学：</span>
                <span>你可真好看</span>
            </div>
            <div class="chatList">
                <span>同学：</span>
                <span>你可真好看</span>
            </div>
            <div class="chatList">
                <span>同学：</span>
                <span>你可真好看</span>
            </div>
            <div class="chatList">
                <span>同学：</span>
                <span>你可真好看</span>
            </div>
            <div class="chatList">
                <span>同学：</span>
                <span>你可真好看</span>
            </div>
            <div class="chatList">
                <span>同学：</span>
                <span>你可真好看</span>
            </div>
            <div class="chatList">
                <span>同学：</span>
                <span>你可真好看</span>
            </div>
            <div class="chatList">
                <span>同学：</span>
                <span>你可真好看</span>
            </div>
            <div class="chatList">
                <span>同学：</span>
                <span>你可真好看</span>
            </div>
            <div class="chatList">
                <span>同学：</span>
                <span>你可真好看</span>
            </div>
            <div class="chatList">
                <span>同学：</span>
                <span>你可真好看</span>
            </div>
            <div class="chatList">
                <span>同学：</span>
                <span>你可真好看</span>
            </div>
            <div class="chatList">
                <span>同学：</span>
                <span>你可真好看</span>
            </div>
            <div class="chatList">
                <span>同学：</span>
                <span>你可真好看</span>
            </div>
            <div class="chatList">
                <span>同学：</span>
                <span>你可真好看</span>
            </div>
        </div>
        <!-- 飘窗，气泡商品 -->
        <div class="shopgood" v-if="ready && codeStatus == 200">
            <img :src="goodsList.length && goodsList[0].cover" alt="">
            <div class="shopgood_right">
                <div class="shopgood_right_title">{{goodsList.length && goodsList[0].name}}</div>
                <div class="shopgood_right_price">
                    <div>¥{{goodsList.length && goodsList[0].price}}</div>
                    <img src="https://yuelvdaren-1300766538.cos.ap-beijing.myqcloud.com/daren/2020/07/12/5f0b0705b9dae1594558213.png" alt="">
                </div>
            </div>
        </div>
        <!-- 购物袋，留言，举报，分享，点赞 -->
        <div class="bottoms" v-if="ready && codeStatus == 200">
            <div class="carts" @click="showGoodsList = true">{{goodsList.length}}</div>
            <template>
                <p @click="download">说点什么...</p>
                <div style="display: flex;align-items: center;" @click="download">
                    <img src="https://yuelvdaren-1300766538.cos.ap-beijing.myqcloud.com/daren/2020/07/12/5f0b284bd31831594566731.png" alt="">
                    <img src="https://yuelvdaren-1300766538.cos.ap-beijing.myqcloud.com/daren/2020/07/12/5f0b28740d8f91594566772.png" alt="">
                    <img src="https://yuelvdaren-1300766538.cos.ap-beijing.myqcloud.com/daren/2020/07/12/5f0b287ec25dc1594566782.png" alt="">
                </div>
            </template>
        </div>
        <!-- 购物袋列表 -->
        <div class="live_shop" v-if="ready && codeStatus == 200 && showGoodsList">
            <div class="pic-box">
                <img src="https://image.yuelvhui.com/pubfile/2019/11/14/line_1573730340_80935.png" alt="" class="pic" @click="showGoodsList = false">
            </div>
            <div class="shop_list" v-for="(item,index) in goodsList" :key="index">
                <div class="img_box">
                    <img :src="item.cover" alt="">
                    <div class="num">{{index + 1}}</div>
                </div>
                <div class="shop_cont">
                    <p class="title">
                        <span class="bg bg_1">{{item.product_fist_name}}</span>
                        <span class="bg bg_2" :style="{background:item.color_type}">{{item.product_type_name}}</span>
                        {{item.name}}
                    </p>
                    <div class="shop_price">
                        <p class="price"> 
                            <span style="font-size:.3rem">¥</span>{{item.price}} 
                            <span class="old_price">原价：{{item.original_price}}</span>
                        </p>
                        <div class="btn">立即购买</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 预约 -->
        <div v-if="ready && codeStatus == 401">
            <div :class="isApp ? 'not not1' : 'not'" v-if="is_pay == 1">
                <div class="banner">
                    <img :src="notDetail.banner[0]" alt="">
                </div>
                <div class="not_cont">
                    <div class="title">{{notDetail.title}}</div>
                    <div class="timeout">
                        倒计时：
                        <div class="time">
                            <span id="day">{{day}}</span>天
                            <span id="hour">{{hour}}</span>时
                            <span id="min">{{min}}</span>分
                            <span id="sec">{{sec}}</span>秒
                        </div>
                    </div>
                </div>
                <div class="introduce">
                    <div class="dis_title">主播介绍</div>
                    <p>{{notDetail.desc}}</p>
                </div>
            </div>
            <div :class="isApp ? 'not not1' : 'not'" v-if="is_pay != 1">
                <div class="banner">
                    <img :src="notDetail.picture1" alt="">
                </div>
                <div class="not_conts">
                    <!-- @click="play" -->
                    <!-- :style='{"z-index":loginShow ? "-1" : "1"}' -->
                    <!-- playsinline -->
                    <video 
                        :src="notDetail.video"
                        loop="loop" 
                        autoplay 
                        oncanplay 
                        playsinline="true" 
                        style="object-fit:fill" 
                        class="videoUrl"
                        webkit-playsinline 
                        id="car_audio" 
                        controls="controls" 
                        x5-video-player-type="h5" 
                        x5-video-player-fullscreen="true"
                        x5-playsinline 
                        x5-video-orientation="portraint" 
                    >
                    </video>
                </div>
                <div class="not_cont_1">
                    <img :src="notDetail.picture2" alt="">
                    <img :src="notDetail.picture3" alt="">
                </div>
            </div>
            <div class="not_btn" v-if="!isApp" style="background: white">
                <div class="not_nths">
                    <div class="not_share" @click="onshare">约朋友</div>
                    <!-- @click="make" -->
                    <div class="not_btns" v-if="notDetail.type == 0"> {{notDetail.amount > 0 ? '立即购买' : '立即预约'}}</div>
                    <div @click="follow" class="not_btns" :style="{color: subscribed == 1 ? '#666' : 'red'}" v-if="notDetail.type == 1"> {{subscribed == 1 ? '已预约' : '立即预约'}}</div>
                </div>
            </div>
            <div class="not_btn" v-if="isApp" style="background: white">
                <div class="not_nths">
                    <!-- <div class="not_share" @click="onshare">约朋友</div> -->
                    <div @click="follow" class="not_btns not_btns-add" :style="{color: subscribed == 1 ? '#666' : 'red'}" v-if="notDetail.type == 1"> {{subscribed == 1 ? '已预约' : '立即预约'}}</div>
                </div>
            </div>
        </div>
        <!-- 预约海报 -->
        <div v-if="showPoster">
            <div class="black_bg"></div>
            <div class="down_cont">
                <div class="down_cont_content">
                    <img @click="showPoster = false" class="icon" src="https://yuelvdaren-1300766538.cos.ap-beijing.myqcloud.com/daren/2020/02/25/5e54e2a67ad5c1582621350.png" alt="">
                    <div class="cont">长按保存图片</div>
                    <img :src="shareImg" alt="">
                </div>
            </div>
        </div>
        <!-- 下播 -->
        <div v-if="ready && codeStatus == 403">
            <div class="close_cont">
                <!-- <p class="zhibo_end">{{endLiveMsg}}</p> -->
                <p class="zhibo_end">直播结束</p>
                <p class="zhibo_num">共{{endLiveInfo.liveNum.live_time}}分钟</p>
                <div class="tou_img">
                    <img class="tou_url" :src="endLiveInfo.userInfo.avatar" alt="">
                </div>
                <p class="name">{{endLiveInfo.userInfo.nickname}}
                    <span class="fans">粉丝{{endLiveInfo.userInfo.fans_num}}</span>
                </p>
                <div class="chang">
                    <div class="postman">
                        <p>{{endLiveInfo.liveNum.income}}</p>
                        <p class="texts">本场人头</p>
                    </div>
                    <div class="watchs">
                        <p>{{endLiveInfo.liveNum.views_num}}</p>
                        <p class="texts">观看</p>
                    </div>
                    <div class="zan">
                        <p>{{endLiveInfo.liveNum.zan_num}}</p>
                        <p class="texts">点赞</p>
                    </div>
                </div>
            </div>
            <div class="close" :style="{backgroundImage:'url(' + endLiveInfo.backGround + ')'}"></div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast)

import { videodetail, liveShopInfo, appointmentPoster, followAct } from "@/services/outsite"
import OpenAppHead from "../../component/GoodsDetail/openApp"

const browser = {
    versions: function () {
    var u = navigator.userAgent,
        app = navigator.appVersion;
    return {
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //ope2ra内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*!/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
        iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
        weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
        qq: u.match(/\sQQ/i) == " qq" //是否QQ
    };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

var timer = null

export default {
    data() {
        return {
            isApp: false, // 是否是App环境
            codeStatus: 0, // 直播状态 200直播中 401预约 403主播离开 405课程
            shareUrl: '', // 分享出去的链接
            heightbody: {}, // 设置直播间高度
            player: null, // TCplayer对象
            ready: false, // 是否请求完直播间信息
            userInfo: {}, // 直播人信息
            goodsList: [], // 购物袋商品
            showGoodsList: false, // 是否展示购物袋
            password: '', // 密码
            truePassword: true, //直播间密码是否输入正确 true 是正确 false是错误
            endLiveInfo: {}, // 结束直播信息
            endLiveMsg: '', // 直播结束后的提示语
            notDetail: {}, // 预约详情
            is_pay: '', // 是否支付 1 已支付 其余数值 未支付
            day: '', // 倒计时 天
            hour: '', // 倒计时 时
            min: '', // 倒计时 分
            sec: '', // 倒计时 秒
            subscribed: 0, // 是否预约过 0 未预约 1 已预约
            showPoster: false, // 显示预约海报
            shareImg: '', // 海报
        };
    },
    components: {
        OpenAppHead
    },
    methods: {
        getRTime(EndTime) {
            var EndTime = EndTime //结束时间
            var NowTime = new Date(); //当前时间
            //后台给我的是10位 精确到秒的  所有下面我就除以了1000，不要小数点后面的
            var t = EndTime - (NowTime.getTime() / 1000).toFixed(0);
            //如果后台给的是毫秒 上面不用除以1000  下面的计算时间也都要除以1000 这里我去掉1000了
            var d = Math.floor(t / 60 / 60 / 24); //天 var d=Math.floor(t/1000/60/60/24)
            var h = Math.floor(t / 60 / 60 % 24); //时 var h=Math.floor(t/1000/60/60%24)
            var m = Math.floor(t / 60 % 60); //分 var m=Math.floor(t/1000/60%60)
            var s = Math.floor(t % 60); //秒 var s=Math.floor(t/1000%60)
            if (parseInt(d) < 10) {
                d = "0" + d;
            }
            if (parseInt(h) < 10) {
                h = "0" + h;
            }
            if (parseInt(m) < 10) {
                m = "0" + m;
            }
            if (parseInt(s) < 10) {
                s = "0" + s;
            }
            this.day = d
            this.hour = h
            this.min = m
            this.sec = s
        },
        openInWebview () {
            var ua = navigator.userAgent.toLowerCase()
            if (ua.match(/MicroMessenger/i) == 'micromessenger') { // 微信浏览器判断
                return false
            } else if (ua.match(/QQ/i) == 'qq') { // QQ浏览器判断
                return false
            } else if (ua.match(/WeiBo/i) == "weibo") {
                return false
            } else {
                if (ua.match(/Android/i) != null) {
                    return ua.match(/browser/i) == null
                } else if (ua.match(/iPhone/i) != null) {
                    return ua.match(/safari/i) == null
                } else {
                    return (ua.match(/macintosh/i) == null && ua.match(/windows/i) == null)
                }
            }
        }, 
        getShareUrl(){ // 处理分享出去的url
            let url = window.location.href.split('?')[0]
            this.$route.query.live_mid ? url += '?live_mid=' + this.$route.query.live_mid : null
            this.$route.query.mid ? url += '&mid=' + this.$route.query.mid : null
            window.localStorage.getItem('recode') ? url += '&codeNumber=' + window.localStorage.getItem('recode') : null
            this.$route.query.version ? url += '&version=' + this.$route.query.version : null
            this.$route.query.order_from ? url += '&order_from=' + this.$route.query.order_from : null
            this.$route.query.live_from ? url += '&live_from=' + this.$route.query.live_from : null
            window.localStorage.getItem('uid') ? url += '&share_mid=' + window.localStorage.getItem('uid') : null
            this.$route.query.type ? url += '&type=' + this.$route.query.type : null
            this.shareUrl = url
        },
        getWxConfig(data){
            this.$store.dispatch('wxConfigInit',data)
        },
        getLiveDetail() { // 获取直播详情
            let data = {
                live_mid: this.$route.query.mid || this.$route.query.live_mid, // 直播人ID
                mid: window.localStorage.getItem("uid") || 0, // 当前登录人ID 
                from: this.$route.query.live_from || this.$route.query.order_from || 1, // 来源
                version: this.$route.query.version || "3.9.6", // 版本号
                appointment: this.$route.query.appointment || 0, // 预约
                channel: 2, // 1 大人 2 悦淘 3 旅悦
            };
            videodetail(data).then((res) => {
                this.codeStatus = res.code
                if (res.code == 200) {
                    let cover = res.data.cover
                    let videoAuto, videoOncan;
                    if (res.data.isPwd == 1) { // 需要输入密码
                        videoAuto = false;
                        videoOncan = false;
                    } else {
                        videoAuto = false;
                        videoOncan = false;
                    }
                    var option = {
                        m3u8: res.data.PlayUrl.HLS, //请替换成实际可用的播放地址
                        flv: res.data.PlayUrl.FLV, //请替换成实际可用的播放地址
                        oncanplay: videoOncan, //两个同时存在 安卓可自动播放
                        autoplay: videoAuto, //
                        x5_fullscreen: "true", //安卓
                        wording: {
                            1002: "即将直播，请稍等",
                            2032: "请求视频失败，请检查网络",
                            2048: "请求m3u8文件失败，可能是网络错误或者跨域问题",
                        },
                        live: true,
                        "poster": {
                            "style": "cover",
                            "src": cover
                        },
                        width: "100%", //视频的显示宽度，请尽量使用视频分辨率宽度
                        height: "100%", //视频的显示高度，请尽量使用视频分辨率高度
                        x5_type: "h5",
                        x5_orientation: 1,
                        "webkit-playsinline": true,
                        playsinline: true,
                        x5_playsinline: true
                    };
                    this.player = new TcPlayer('id_video', option)
                    this.userInfo = res.data
                }else if(res.code == 401) { // 预约
                    this.player = null
                    this.notDetail = res.data
                    this.is_pay = res.is_pay
                    this.subscribed = res.data.subscribed;
                    timer = setInterval(() => {
                        this.getRTime(res.data.start_time)
                    }, 1000)
                    let shareData = { // 配置直播中的分享信息
                        title: res.data && res.data.shareTitle,
                        desc: res.data && res.data.desc,
                        link: this.shareUrl,
                        imgUrl: res.data && res.data.cover
                    }
                    this.getWxConfig(shareData)
                }else if(res.code == 403) { // 直播结束
                    this.player = null
                    this.endLiveInfo = res.LiveInfo
                    this.endLiveMsg = res.msg
                }else if(res.code == 405) { // 课程
                    this.player = null
                    
                }else {
                    Toast(res.msg)
                }
                if(res.code == 200 || res.code == 403){
                    let shareData = { // 配置直播中的分享信息
                        title: res.data.ShareInfo && res.data.ShareInfo.title,
                        desc: res.data.ShareInfo && res.data.ShareInfo.desc,
                        link: this.shareUrl,
                        imgUrl: res.data.ShareInfo && res.data.ShareInfo.logo
                    }
                    this.getWxConfig(shareData)
                }
                this.ready = true
            });
        },
        getLiveShopInfo() {
            let data = {
                id: this.$route.query.mid || this.$route.query.live_mid,
                mid: window.localStorage.getItem('uid'),
                channel: 3, // 1 大人 2 旅悦 3 悦淘
                channel_type: 0 // 0 App 1 小程序
            }
            liveShopInfo(data).then(res => {
                if(res.code == 200){
                    this.goodsList = res.data || []
                }
            })
        },
        download() { // 根据不同系统，去不同的应用商店
            if (browser.versions.ios) { // ios
                window.location.href = "yuelvhui://";
                window.location.href = "https://itunes.apple.com/cn/app/%E6%82%A6%E6%97%85%E4%BC%9A/id1460325408?mt=8";
            } else { // android
                window.location.href = "yuelvhui://";
                window.location = "https://a.app.qq.com/o/simple.jsp?pkgname=com.newHuanQiuYueLv.www";
            }
        },
        onshare() { // 展示预约海报
            if(this.notDetail.type == 1){
                let data = {
                    actId: this.notDetail.actId,
                    live_people_id: this.$route.query.mid || this.$route.query.live_mid,
                    share_mid: window.localStorage.getItem('uid'),
                    channel: 2
                }
                appointmentPoster(data).then(res => {
                    if(res.code == 200){
                        this.shareImg = res.img
                        this.showPoster = true
                    }
                })
            }else if(this.notDetail.type == 2){

            }
        },
        follow(){ // 立即预约
            if(this.subscribed == 1) return
            let data = {
                mid: window.localStorage.getItem('uid') || this.$route.query.share_mid,
                follow_mid: this.notDetail.mid
            }
            followAct(data).then(res => {
                if(res.code == 200 && this.codeStatus == 401){
                    this.subscribed == 1
                    Toast('预约成功')
                }
            })
        }
    },
    created() {
        this.heightbody = {
            width: "100%",
            height: '90vh'
        };
        this.$store.commit('changeInterceptUrl',window.location.href)
        this.$store.dispatch('loginIntercept',this.$route.query)
    },
    mounted() {
        this.isApp = this.openInWebview()
        this.getShareUrl()
        this.getLiveDetail()
        this.getLiveShopInfo()
    },
    destroyed() {
        clearInterval(timer)
        this.$store.dispatch('wxConfigDefault',{})
    }
};
</script>

<style lang="less" scoped>
.content {
    position: relative;
    .black_bg {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9;
    }
    .passwordBox {
        width: 266px;
        height: 189px;
        background: #fff;
        border-radius: 10px;
        padding: 45px 27px;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        z-index: 10;
        .tit,
        .tit1 {
            font-size: 18px;
            color: #333;
        }
        .tit1 {
            text-align: center;
            margin-top: 8px;
        }
        input {
            width: 100%;
            height: 45px;
            line-height: 45px;
            outline: none;
            border: none;
            margin-top: 20px;
            border-bottom: 1px solid #EDEDED;
            font-size: 15px;
        }
        input::-webkit-input-placeholder {
            color: #999;
        }
        .btn_d {
            width: 240px;
            height: 44px;
            line-height: 44px;
            color: #fff;
            background: linear-gradient(264deg, rgba(223, 74, 81, 1), rgba(227, 85, 93, 1));
            border-radius: 22px;
            text-align: center;
            font-size: 16px;
            margin: 0 auto;
            position: absolute;
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
        }
    }
    .live-info {
        width: 100%;
        height: 7vh;
        box-sizing: border-box;
        padding: 0 1vh;
        position: fixed;
        top: 60px;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .person {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            color: #fff;
            position: relative;
            .head_img{
                width: 6.5vh;
                height: 6.5vh;
                border-radius: 50%;
                background-color: #fff;
                margin-right: 0.8vh;
                position: relative;
                z-index: 1;
            }
            .head_bg{
                height: 6.5vh;
                font-size: 20px;
                background: rgba(0, 0, 0, .4);
                border-radius: 3.6vh;
                position: absolute;
                left: 0;
                padding-left: 7.5vh;
                padding-right: 2vh;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .couponred {
                width: 44px;
                height: 55px;
                position: absolute;
                right: 1vh;
                top: 50%;
                transform: translateY(-50%);
                div{
                    width: 16px;
                    height: 16px;
                    font-size: 12px;
                    color: red;
                    background: #FFED88;
                    text-align: center;
                    position: absolute;
                    top: -8px;
                    right: -8px;
                    border-radius: 50%;
                }
            }
        }
    }
    .coupon {
        width: 100%;
        position: fixed;
        top: 130px;
        left: 0;
        z-index: 10;
        text-align: center;
        .coupon_bg {
            width: 100%;
            height: 380px;
        }
        .coupon_close {
            width: 34px;
            height: 34px;
            position: absolute;
            left: 170px;
            bottom: -45px;
        }
        .coupon_cont {
            width: 211px;
            height: 207px;
            text-align: center;
            position: absolute;
            top: 114px;
            left: 82px;
            font-size: 16px;
            color: #F23E6F !important;
            .price {
                font-size: 46px;
                margin-top: 4px;
            }
            .coupon_shop {
                display: flex;
                align-items: center;
                margin-top: 60px;
            }
            .tips {
                font-size: 22px;
                color: #F23E6F;
            }
            .title {
                font-size: 14px;
            }
            .use {
                width: 130px;
                height: 34px;
                background:linear-gradient(0deg,rgba(255,246,193,1),rgba(255,250,176,1));
                border-radius: 17px;
                color: #F23E6F;
                font-size: 16px;
                text-align: center;
                line-height: 34px;
                margin: 0 auto;
                margin-top: 40px;
            }
        }
    }
    .chat {
        position: fixed;
        bottom: 175px;
        left: 10px;
        width: 80%;
        height: 150px;
        font-size: 12px;
        overflow-x: hidden;
        overflow-y: auto;
        z-index: 2;
        background: rgba(255, 255, 255, 0);
        .chatList{
            width: fit-content;
            width: -moz-fit-content;
            width: -webkit-fit-content;
            box-sizing: border-box;
            margin-top: 8px;
            padding: 3px 10px;
            border-radius: 10px;
            background: rgba(0, 0, 0, .3);
            color: #FFE179;
            span:nth-child(2){
                color: #fff;
            }
        }
    }
    .shopgood {
        width: 168px;
        height: 58px;
        background: #fff;
        border-radius: 5px;
        position: fixed;
        bottom: 12vh;
        left: 10px;
        display: flex;
        justify-content: space-between;
        overflow: hidden;
        img {
            width: 58px;
            height: 58px;
        }
        .shopgood_right_title{
            width: 100px;
            font-size: 14px;
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
            margin-top: 10px;
        }
        .shopgood_right_price{
            width: 75px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 3px;
            color:#EB445A;
            font-size: 14px;
            img {
                width: 22px;
                height: 22px;
                margin-right: 5px;
            }
        }
    }
    .bottoms {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 10vh;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 15px;
        color:#fff;
        .carts{
            width: 40px;
            height: 40px;
            background: url('https://yuelvdaren-1300766538.cos.ap-beijing.myqcloud.com/daren/2020/03/30/5e8185b1799551585546673.png') no-repeat;
            background-size: 100% 100%;
            display: flex;
            justify-content: center;
            align-items: flex-end;
            /* position: fixed;
            bottom: 2rem;
            left: .3rem; */
            padding-bottom: 5px;
            color:#fff;
        }
        p {
            width: 160px;
            background: #000;
            opacity: 0.4;
            border-radius: 16px;
            font-size: 16px;
            padding-left: 15px;
        }
        img {
            width: 25px;
            height: 25px;
            margin-left: 15px;
        }
    }
    .live_shop {
        width: 100%;
        height: 400px;
        background-color: #fff;
        border-radius: 10px 10px 0 0;
        padding: 10px 0;
        box-sizing: border-box;
        position: fixed;
        bottom: 0;
        left: 0;
        overflow: scroll;
        .pic-box {
            display: flex; 
            justify-content: flex-end;
            padding: 5px 10px;
            .pic {
                width: 16px;
                height: 16px;
            }
        }
        .shop_list {
            // height: 100px;
            padding: 10px;
            display: flex;
            align-items: center;
            font-size: 15px;
            color: #333333;
            margin: 0 15px;
            border-bottom: 1px solid #E8E8E8;
            .img_box {
                position: relative;
                border-radius: 2px;
                overflow: hidden;
                width: 90px;
                height: 90px;
                margin-right: 10px;
                img {
                    width: 90px;
                    height: 90px;
                    margin-right: 10px;
                }
                .num {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 21px;
                    height: 15px;
                    background-color: rgba(0, 0, 0, 0.54);
                    border-radius: 2px;
                    color: #fff;
                    text-align: center;
                    line-height: 15px;
                    font-size: 12px;
                }
            }
            .shop_cont {
                width: 250px;
                height: 90px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .title{
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                    text-align: justify;
                    .bg {
                        display: inline-block;
                        padding: 0 4px;
                        height: 16px;
                        text-align: center;
                        line-height: 16px;
                        color: #fff;
                        font-size: 12px;
                        display: inline-block;
                        vertical-align: middle;
                    }
                    .bg_1 {
                        background: #FF0D45;
                        border-radius: 2px 0 0 2px;
                        margin-right: 5px;
                        margin-bottom: 3px;
                    }
                    .bg_2 {
                        border-radius: 0 2px 2px 0;
                        margin-right: 5px;
                        margin-bottom: 3px;
                    }
                }
                .shop_price{
                    font-size: 20px;
                    color: #EB374B;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .old_price {
                        color: #999;
                        font-size: 12px;
                        text-decoration: line-through;
                        vertical-align: middle;
                    }
                    .btn{
                        width: 65px;
                        height: 25px;
                        line-height: 25px;
                        text-align: center;
                        background: linear-gradient(264deg,rgba(241,56,75,1),rgba(244,71,88,1));
                        border-radius: 15px;
                        color: #fff;
                        font-size: 10px;
                    }
                }
            }
        }
    }
    .close_cont {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-image: url(https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-02-07/17/yuelvhui7ePACQccga1581066709.png);
        z-index: 10;
        text-align: center;
        font-size: 20px;
        color: #fff;
        padding-top: 100px;
        .zhibo_end {
            font-size: 24px;
        }
        .zhibo_num {
            font-size: 12px;
            margin-top: 10px;
        }
        .tou_img {
            position: relative;
            margin-top: 40px;
            .tou_url {
                width: 12.5vh;
                height: 12.5vh;
                border-radius: 50%;
                object-fit: cover;
            }
            .guan {
                width: 3.5vh;
                height: 3.5vh;
                position: absolute;
                left: 46%;
                bottom: -3px;
            }
        }
        .name {
            font-size: 16px;
            .fans {
                font-size: 14px;
            }
        }
        .chang {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            text-align: center;
            font-size: 16px;
            margin-top: 30px;
            .texts {
                color: #cfcfcf;
                font-size: 12px;
            }
        }
        .img_footer {
            width: 92%;
            height: 100px;
            position: fixed;
            bottom: 50px;
            left: 4%;
            object-fit: cover;
        }
    }
    .close {
        background-position: center;
        position: fixed;
        top: 0;
        width: 100%;
        height: 100%;
        left: 0;
        z-index: 9;
        background-size: cover;
        background-repeat: no-repeat;
    }
    .not {
        position: relative !important;
        background: white;
        overflow: hidden;
        .banner {
            width: 100%;
            margin: 0 auto;
            margin-top: 40px;
            margin-bottom: 1vh;
            overflow: hidden;
            img {
                width: 100%;
                height: 100%;;
            }
        }
        .not_cont {
            width: 92%;
            margin: 0 auto;
            .title {
                font-size: 20px;
                font-weight: 700;
                margin-bottom: 5px;
                text-align: left;
            }
            .timeout {
                display: flex;
                align-items: center;
                color: #F1384B;
            }
            .time span{
                margin-right: 3px;
                border: .2vh solid #F1384B;
                border-radius: 5px;
                width: 20px;
                height: 20px;
                display: inline-block;
                font-size: 16px;
                text-align: center;
                line-height: 20px;
                color: #F1384B;
            }
        }
        .not_conts {
            border-radius: 5px;
            position: relative;
            border: 1px solid rgba(234, 215, 118, 1);
            margin: 0 10px;
            width: 95%;
            box-sizing: border-box;
            overflow: hidden;
            #car_audio {
                width: 98%;
                z-index: 1;
                margin: 1%;
            }
        }
        .not_cont_1 {
            text-align: center;
        }
        .introduce {
            border-top: 2vh solid rgba(242,242,242,1);
            margin: 2vh 0;
            padding: 0 4%;
            color: #333;
            line-height: 20px;
            font-size: 14px;
             .dis_title{
                margin-top: 1vh;
                margin-bottom: 1vh;
                font-size: 20px;
                font-weight: 700;
                text-align: left;
            }
            p {
                text-align: left;
            }
        }
    }
    .not1 {
        top: 70px;
        transform: translate(0, -78px);
    }
    .not_btn {
        position: fixed;
        bottom: 0;
        width: 100%;
        background: #000;
        text-align: center;
        left: 0;
        display: flex;
        box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.2);
        .not_nths {
            display: flex;
            width: 90%;
            margin: 15px auto;
            justify-content: center;
            align-items: center;
            margin-bottom: 25px;
            .not_share {
                flex: 1;
                background: rgba(234, 215, 118, 1);
                border-bottom-left-radius: 21px;
                border-top-left-radius: 21px;
                height: 6vh;
                line-height: 6vh;
                font-size: 16px;
                border: 1px solid black;
                box-sizing: border-box;
                border-right: none;
            }
            .not_btns{
                flex:1;
                background: #fff;
                text-align: center;
                color: #F10000;
                height: 6vh;
                line-height: 6vh;
                font-size: 16px;
                border-bottom-right-radius: 21px;
                border-top-right-radius: 21px;
                border: 1px solid black;
                box-sizing: border-box;
            }
            .not_btns-add {
                border-bottom-left-radius: 21px;
                border-top-left-radius: 21px;
            }
        }
    }
    .down_cont {
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 10;
        left: 0;
        top: 0;
        text-align: center;
        .down_cont_content {
            position: relative;
            width: 250px;
            height: 450px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            .cont {
                width: 100%;
                font-size: 16px;
                color: white;
                position: absolute;
                bottom: -40px;
                left: -3px;
                z-index: 3;
            }
            .icon {
                width: 20px;
                height: 20px;
                position: absolute;
                top: -25px;
                left: 96%;
                z-index: 5;
            }
            img {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                z-index: 1;
            }
        }
    }
}
</style>
