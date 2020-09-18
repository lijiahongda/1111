<template>
    <div class="main">
        <div class="bgview"></div>
        <div class="allbtn" @click="lingqu">全部领取</div>
        <div class="wold">
            <div class="firstline">优惠券使用规则</div>
            <div>1、优惠券为悦淘8月市场大会专属礼包。</div>
            <div>2、礼包每人限领取一次，可转赠。</div>
            <div>3、所有优惠券的有效期自领券之日起7日有效。具体每张券的使用见券内说明。</div>
            <div> 4、仅限广州、杭州、苏州、沈阳、南京、常州、青岛、天津、汝州、绍兴、潮州、荆州、南宁、海口、长春、合肥、赣州、兰州、西安、巴中、衡水、宁波、阜阳</div>
        </div>
    </div>
</template>
<script>
import {lingQuLibao,isGetDaLiBao,sharePage} from "@/services/activity"
import { Toast } from "vant" // 提示框
export default {
    data(){
        return {}
    },
    mounted(){
        this.isGetDaLiBaoFun();
        this.configShare();
    },
    methods:{
         /**
         * 领取按钮
         * */
        lingqu: function (e) {
            let env= this.GetUrlParam("env");
            let codeNumber= this.GetUrlParam("codeNumber");
            // let env= this.$route.query.env;
            if(env==1){//app中打开
                let uid = this.GetUrlParam("uid");
                let token = this.GetUrlParam("token");
                console.log(uid+"-----"+token);
                localStorage.setItem("uid",uid);
                localStorage.setItem("token",token);
                if(uid){
                    lingQuLibao({"uid":uid}).then(res=>{
                        if(res.code==200){
                            Toast("领取成功!");
                            this.$router.push({"path":"/dalibaolist"});
                        }else{
                            Toast(res.msg);
                        }
                    });
                }
            } 
            if(env==2){//移动端打开
                let ua = navigator.userAgent.toLowerCase(); //获取判断用的对象
                if (ua.match(/MicroMessenger/i) == "micromessenger") {//微信中打开
                    let uid= localStorage.getItem("uid");
                    if (uid) {
                        //领取接口
                        lingQuLibao({"uid":uid}).then(res=>{
                            if(res.code==200){
                                Toast("领取成功");
                                this.$router.push({"path":"/dalibaolist"});
                            }else{
                                Toast(res.msg);
                            }
                        });
                    } else {
                        this.$router.push({path:"/login",query:{active:"dalibao",codeNumber:codeNumber}});
                    }
                }
            }
        },
        GetUrlParam(paraName) {
            var url = document.location.toString();
            var arrObj = url.split("?");
            if (arrObj.length > 1) {
                var arrPara = arrObj[1].split("&");
                var arr;
                for (var i = 0; i < arrPara.length; i++) {
                arr = arrPara[i].split("=");
                if (arr != null && arr[0] == paraName) {
                    return arr[1];
                }
                }
                return "";
            } else {
                return "";
            }
        },
        isGetDaLiBaoFun(){
            let env= this.GetUrlParam("env");
            // let env= this.$route.query.env;
            if(env==1){//app中打开
                let uid = this.GetUrlParam("uid");
                let token = this.GetUrlParam("token");
                localStorage.setItem("uid",uid);
                localStorage.setItem("token",token);
                if(uid){
                    isGetDaLiBao({"uid":uid}).then(res=>{
                        if(res.code!=200){//已领取
                            this.$router.replace({path:"/dalibaolist"});
                        }
                    });
                }
            } 
            if(env==2){//移动端打开
                let ua = navigator.userAgent.toLowerCase(); //获取判断用的对象
                if (ua.match(/MicroMessenger/i) == "micromessenger") {//微信中打开
                    let uid= localStorage.getItem("uid");
                    if (uid) {
                        isGetDaLiBao({"uid":uid}).then(res=>{
                            if(res.code!=200){//已领取
                                this.$router.replace({path:"/dalibaolist"});
                            }
                        });
                    }
                }
            }
        },
        configShare(){ // 配置分享
            var ua = navigator.userAgent.toLowerCase();
            let img="https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-08-12/14/yuelvhui5Y5SwwTmIr1597215167.png";
            //var ua = navigator.userAgent.toLowerCase();
            // if (ua.match(/MicroMessenger/i) != "micromessenger") {
            //     return;
            // }
            var ajaxUrl ="https://api2.yuelvhui.com/app/WechatShareH5?share_url=" +encodeURIComponent(window.location.href);
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
                        title: "会场专属大礼包", // 分享标题
                        desc: "会场专属大礼包", // 分享描述
                        link: 'https://web.yuetao.group/dalibao?env=2' + '&codeNumber=' + window.localStorage.getItem('recode'), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl:img, // 分享图标
                    });
                    wx.onMenuShareAppMessage({
                        //分享给朋友
                        title: "会场专属大礼包", // 分享标题
                        desc: "会场专属大礼包", // 分享描述
                        link: 'https://web.yuetao.group/dalibao?env=2' + '&codeNumber=' + window.localStorage.getItem('recode'), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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
    background: #E61128;
}
.bgview{
    width:375px;
    height:428px;
    background:url("https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-08-10/20/yuelvhui7WT1IhdIan1597063720.png") no-repeat ;
    background-size: 100%;
}
.allbtn{
    width:296px;
    height:47px;
    background:url("https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-08-10/20/yuelvhuicAP4M8LaJ01597063911.png") no-repeat ;
    background-size: 100%;
    font-size:17px;
    color:#9B4007;
    text-align: center;
    line-height: 47px;
    margin-top: 25px;
    margin-left: 40px;
}
.wold{
    color:#fff;
    font-size:12px;
    margin-top: 30px;
    width:295px; 
    margin-left: 40px;
    line-height: 25px;
    text-align: left;
    padding-bottom: 30px;
}
.firstline{
    font-size:15px;
    margin-bottom: 20px;
}
</style>