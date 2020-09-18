<template> 
    <div class="tops" v-show="textReady && showText">
        <div class="les">
            <div class="close" @click="showText = false"></div>
            <img class="logos" :src="textInfo.logo">
            <span>{{(textInfo.title ? textInfo.title + '，' : '') + (textInfo.describe || '')}}</span>
        </div>
        <div class="ris" @click="downLoadApp">{{textInfo.buttonText || ''}}</div>
    </div>
</template>

<script>
import { textData } from "@/services/goods.js";
export default {
    data(){
        return {
            textInfo: {}, // 顶部信息
            textReady: false, // 顶部信息是否请求完成
            showText: true // 是否显示打开App提示
        }
    },
    methods: {
        textData(){ // 获取顶部数据信息
            textData({
                type: 1
            }).then(res => {
                if(res.code == 200){
                    this.textReady = true
                    this.textInfo = res.data && res.data[0]
                }
            })
        },
        downLoadApp() { // 点击下载app
            var u = navigator.userAgent,
                app = navigator.appVersion;
            var isAndroid =
                u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; // Android
            var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios
            if (isIOS) {
                window.location.href =
                    "https://apps.apple.com/cn/app/%E6%82%A6%E6%97%85%E4%BC%9A/id1460325408";
            }
            if (isAndroid) {
                window.location.href =
                    "https://a.app.qq.com/o/simple.jsp?pkgname=com.newHuanQiuYueLv.www&from=singlemessage";
            }
        }
    },
    mounted(){
        this.textData()
    }
};
</script>

<style lang="less" scoped>
.tops {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    .les {
        width: 295px;
        height: 40px;
        background: #000000;
        display: flex;
        align-items: center;
        font-size: 13px;
        color: #fff;
        .close {
            width: 17px;
            height: 17px;
            margin: 0 14px;
            background: url("../../assets/images/close.png") no-repeat;
            background-size: 100% 100%;
        }
        .logos {
            width: 29px;
            height: 29px;
            margin-right: 18px;
        }
    }
    .ris {
        width: 80px;
        height: 40px;
        background: #b83627;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        color: #fff;
    }
}
</style>
