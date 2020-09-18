<template>
    <div class="main">
        <div class="bgview"></div>
        <div class="quandiv">
            <img src="https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-08-12/13/yuelvhui75W7osR36y1597209952.png" class="quanimg">
        </div>
        <!-- <div class="content">
            <div>
                <img src="../../../assets/images/title.png" class="titleimg"/>
            </div>
            <div class="title">优惠券可在悦淘APP里“我的优惠券”中查看</div>
            <div class="juan">
                <div class="list">
                    <img src="../../../assets/images/juan1.png" class="juanimg"></img>
                    <div class="juanleft">
                        <div class="juantype">专场券</div>
                        <div class="juanjm">满199减140元</div>
                    </div>
                    <div class="juanright">
                        <div class="x">X</div>
                        <div class="number">15</div>
                        <div class="zhang">张</div>
                    </div>
                </div>
                <div class="list">
                    <img src="../../../assets/images/juan2.png" class="juanimg"></img>
                    <div class="juanleft">
                        <div class="juantype">专场券</div>
                        <div class="juanjm">满199减140元</div>
                    </div>
                    <div class="juanright">
                        <div class="x">X</div>
                        <div class="number">15</div>
                        <div class="zhang">张</div>
                    </div>
                </div>
                <div class="list">
                    <img src="../../../assets/images/juan3.png" class="juanimg"></img>
                    <div class="juanleft">
                        <div class="juantype">专场券</div>
                        <div class="juanjm">满199减140元</div>
                    </div>
                    <div class="juanright">
                        <div class="x">X</div>
                        <div class="number">15</div>
                        <div class="zhang">张</div>
                    </div>
                </div>
                <div class="list">
                    <img src="../../../assets/images/juan4.png" class="juanimg"></img>
                    <div class="juanleft">
                        <div class="juantype">专场券</div>
                        <div class="juanjm">满199减140元</div>
                    </div>
                    <div class="juanright">
                        <div class="x">X</div>
                        <div class="number">15</div>
                        <div class="zhang">张</div>
                    </div>
                </div>
                <div class="list">
                    <img src="../../../assets/images/juan5.png" class="juanimg"></img>
                    <div class="juanleft">
                        <div class="juantype">专场券</div>
                        <div class="juanjm">满199减140元</div>
                    </div>
                    <div class="juanright">
                        <div class="x">X</div>
                        <div class="number">15</div>
                        <div class="zhang">张</div>
                    </div>
                </div>
            </div>
            <div class="allbtn" @click="gohome">返回悦淘首页</div>
        </div> -->
    </div>
</template>
<script>
import { sharePage} from "@/services/activity";
export default {
    mounted(){
        this.configShare();
    },
    methods:{
        configShare(){ // 配置分享
            var ua = navigator.userAgent.toLowerCase();
            let img="https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-08-12/14/yuelvhui5Y5SwwTmIr1597215167.png";
            //var ua = navigator.userAgent.toLowerCase();
            // if (ua.match(/MicroMessenger/i) != "micromessenger") {
            //     return;
            // }
            var ajaxUrl ="https://api2.yuelvhui.com/app/WechatShareH5?share_url=https://web.yuetao.group/dalibao?env=2";
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
                        link: 'https://web.yuetao.group/dalibao?env=2', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl:img, // 分享图标
                    });
                    wx.onMenuShareAppMessage({
                        //分享给朋友
                        title: "会场专属大礼包", // 分享标题
                        desc: "会场专属大礼包", // 分享描述
                        link: 'https://web.yuetao.group/dalibao?env=2', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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
    // position: relative;
    position: fixed;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
}
.bgview{
    width:375px;
    height:428px;
    background:url("https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-08-10/20/yuelvhui7WT1IhdIan1597063720.png") no-repeat ;
    background-size:100%;
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
    margin-left: 25px;
    margin-top: 15px;
    margin-bottom: 10px;
}
.content{
    width: 351px;
    background: #fff;
    border-radius: 10px;
    position: absolute;
    left:12px;
    top: 280px; 
    margin-bottom: 19px;
    text-align: center;
}
.titleimg{
    width: 212px;
    height: 17px;
    margin-top: 20px;
}
.title{
    color:#666666;
    font-size:12px;
    margin-top: 10px;
    margin-bottom: 30px;
}
.list{
    position: relative;
    margin-bottom: 8px;
    width: 351px;
    height: 80px;
}
.juanimg{
    width: 335px;
    height: 80px;
}
.juanleft{
    position: absolute;
    top: 0;
    left: 90px;
    text-align: left;
}
.juanright{
    position: absolute;
    top: 0;
    right: 17px;
    width: 85px;
    height:80px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.juantype{
    color:#FFFFFF;
    font-size:16px;
    margin-top: 16px;
}
.juanjm{
    color:#FFFFFF;
    font-size:13px;
    margin-top: 5px;
}
.x{
    font-size: 15px;
    color:#FFFFFF;
    font-weight: bold;
}
.number{
    font-size:40px;
    font-weight: bold;
    color:#ffffff;
}
.zhang{
    font-size: 16px;
    color:#FFFFFF;
    font-weight: bold;
}
.quandiv{
    width: 351px;
    position: absolute;
    left:12px;
    top: 280px; 
    margin-bottom: 19px;
    text-align: center;
}
.quanimg{
    width: 351px;
    height:731px;
}
</style>