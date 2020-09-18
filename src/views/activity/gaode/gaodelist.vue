<template>
    <div class="main">
        <div class="maincenter">
            <img class="headimg" src="https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-08-16/17/yuelvhuicg1pJVR5eF1597570817.png" >
            <img class="listimg" src="https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-08-16/17/yuelvhuiyJMdBsKwcw1597570876.png">
        </div>
        <div class="bottom">
            <div class="bootomtitle">活动规则</div>
            <div class="bottomitem">1. 活动时间：2020年8月17日-2020年8月31日</div>
            <div class="bottomitem">2. 优惠券可在悦淘app/悦淘小程序内使用。</div>
            <div class="bottomitem">3. 每个优惠券只能使用一次，不兑换、不找零、不退换。</div>
            <div class="bottomitem">4. 每个新用户限领一套优惠券，同一登录账户、同一手机号等其他同理显示同一用户情况默认为同一新用户。</div>
            <div class="bottomitem">5. 为保证活动的公平性，凡不正当手段获取奖励的用户，悦淘将取消活动奖励及资格。</div>
        </div>
    </div>
</template>
<script>
import {sharePage} from "@/services/activity"
export default {
    data(){
        return {

        }
    },
    mounted(){
        this.configShare();
    },
    methods:{
        configShare(){ // 配置分享
            var ua = navigator.userAgent.toLowerCase();
            let img="https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-08-16/20/yuelvhuiK9fcoQMCgR1597579904.png";
            //var ua = navigator.userAgent.toLowerCase();
            // if (ua.match(/MicroMessenger/i) != "micromessenger") {
            //     return;
            // }
            var ajaxUrl ="https://api2.yuelvhui.com/app/WechatShareH5?share_url=https://web.yuetao.group/gaode";
            sharePage(ajaxUrl).then(data=>{
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: data.app_id, // 必填，企业号的唯一标识，此处填写企业号corpid
                    timestamp: data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: data.noncestr, // 必填，生成签名的随机串
                    signature: data.signature, // 必填，签名，见附录1
                    jsApiList: [
                        "onMenuShareTimeline",
                        "onMenuShareAppMessage",
                    ], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                wx.ready(function() {
                    wx.onMenuShareTimeline({
                        //分享到朋友圈
                        title: "七夕心动大礼包", // 分享标题
                        desc: "七夕心动大礼包", // 分享描述
                        link: 'https://web.yuetao.group/gaode', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl:img, // 分享图标
                    });
                    wx.onMenuShareAppMessage({
                        //分享给朋友
                        title: "七夕心动大礼包", // 分享标题
                        desc: "七夕心动大礼包", // 分享描述
                        link: 'https://web.yuetao.group/gaode', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl:img, // 分享图标
                    });
                });
            })
        }
    },
    destroyed(){
        this.configShare();
    }
}
</script>
<style lang="less" scoped>
    .main{
        background:#FFE8D8;
    }
    .maincenter{
        text-align: center;
    }
    .headimg{
        width:375px;
        height:377px;
        display: block;
    }
    .listimg{
        width:351px;
        height:559px;
    }
    .bottom{
        text-align: left;
        width:351px;
        margin-left:12px;
        padding-bottom: 20px;
    }
    .bootomtitle{
        margin-top: 30px;
        margin-bottom: 10px;
        font-size:17px;
        color:#FE565E;
    }
    .bottomitem{
        font-size:13px;
        color:#FE565E;
        line-height: 22px;
    }
</style>