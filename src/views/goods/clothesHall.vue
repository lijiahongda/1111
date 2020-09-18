<!--created by ChuYang 2020.08.19-->
<template>
    <div class="main">
        <!-- <van-nav-bar
                v-if="env_rn == 99"
                title=" "
                left-text="返回"
                right-text=" "
                fixed
                :placeholder="true"
                left-arrow
                @click-left="onClickLeft"/> -->
        <div class="top_banner" :style="{backgroundImage:'url('+ topBannerData.backgroundImg +')'}">
<!--            <img src="../../assets/images/clothesTopShare.png" alt="" class="sharebtn">-->
            <img src="../../assets/images/backFilter.png" alt="" class="backFilterImg">
            <p class="logoImg" :style="{backgroundImage:'url('+ topBannerData.brandLogo +')'}"></p>
            <p class="bannerTitle">{{topBannerData.brandName}}</p>
            <p class="van-multi-ellipsis--l2 bannerDesc">{{topBannerData.introduction}}</p>
        </div>
        <div class="overTime">
            <van-count-down :time="topBannerData.endSurplusTime * 1000">
                <template v-slot="timeData">
                    <span>距结束仅剩</span>
                    <span class="timeOverDay" v-show="timeData.days >= 0"><span
                            class="dayCss">{{timeData.days}}</span>天</span>
                    <span class="numberCss hoursCss">{{ timeData.hours }}</span>
                    <span class="iconCss">:</span>
                    <span class="numberCss">{{ timeData.minutes }}</span>
                    <span class="iconCss">:</span>
                    <span class="numberCss">{{ timeData.seconds }}</span>
                </template>
            </van-count-down>
        </div>
        <clothesList :dataList="mainList"
                     :dataParams="proParams"
                     :env="env_rn"
                     @sendPage="changePage"
                     v-if="mainList && proParams"></clothesList>
    </div>
</template>
<script>
    import Vue from 'vue';
    import {Tab, Tabs, List, Cell, Search, Toast, CountDown, NavBar} from 'vant';
    import clothesList from '@/component/Goods/clothesList';
    import {getClothesHallTop, getClothesHallMain} from '@/services/clothes';
    import {sharePage} from "@/services/activity"
    Vue.use(Tab).use(Tabs).use(List).use(Cell).use(Search).use(Toast).use(CountDown).use(NavBar);

    export default {
        name: 'clothesHall',
        data() {
            return {
                topBannerData: null,//banner 数据
                mainList: [],
                env_rn:'',//访问终端
                proParams: {
                    epId: '',
                    page: 1,
                    pageSize: 10,
                    loading: false,
                    finished: false,
                    error: false,
                },
            }
        },
        components: {
            clothesList
        },
        methods: {
            onClickLeft() {
                // Toast('返回');
                window.history.go(-1);
            },

            changePage(e) {
                this.proParams.page = e.nowPage;
                this.getMainContent();
            },

            getTop() {
                let _params = {
                    epId: this.proParams.epId,
                }
                getClothesHallTop(_params).then(res => {
                    // console.log(res);
                    this.topBannerData = res.code === 200 ? res.data : null;
                })
            },

            getMainContent() {
                this.proParams.loading = true;
                console.log(this.proParams.page);
                // console.log(this.testData);
                let _params = {
                    epId: this.proParams.epId,
                    page:this.proParams.page,
                    pageSize:this.proParams.pageSize
                }
                getClothesHallMain(_params).then(res=>{
                    // console.log(res);
                    // this.mainList = res.code === 200 ? res.data : [];
                    // this.proParams.loading = false;
                    // this.proParams.finished = true;
                  if((res.code == 200) && (res.data.length >= 1)){
                    this.proParams.loading = false;
                    this.mainList = this.mainList.concat(res.data);
                  }else{
                    this.proParams.finished = true;
                  }
                }).catch(error=>{
                  console.log(error);
                  this.proParams.error = true;
                })
            },

            configShare(){ // 配置分享
                var ua = navigator.userAgent.toLowerCase();
                // let img="https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-08-16/20/yuelvhuiK9fcoQMCgR1597579904.png";
                let _img = this.topBannerData.brandLogo;
                //var ua = navigator.userAgent.toLowerCase();
                // if (ua.match(/MicroMessenger/i) != "micromessenger") {
                //     return;
                // }
                var ajaxUrl ="https://api2.yuelvhui.com/app/WechatShareH5?share_url=" + decodeURIComponent(window.location.href);

                //https://web.yuetao.group/gaode";
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
                        // console.log(this.$route.fullPath,window.location.href);
                        wx.onMenuShareTimeline({
                            //分享到朋友圈
                            title: this.topBannerData.brandName, // 分享标题
                            desc: this.topBannerData.introduction, // 分享描述
                            link: decodeURIComponent(window.location.href), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl:_img, // 分享图标
                        });
                        wx.onMenuShareAppMessage({
                            //分享给朋友
                            title: this.topBannerData.brandName, // 分享标题
                            desc: this.topBannerData.introduction, // 分享描述
                            link: decodeURIComponent(window.location.href), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl:_img, // 分享图标
                        });
                    });
                })
            },


        },

        created() {

        },
        beforeMount() {
            // console.log(decodeURIComponent(window.location.href),window.location.href,'-------------');
            this.proParams.epId = this.$route.query.epId || '100';
            this.env_rn = this.$route.query.env;
            let newTitle = this.$route.query.channelName;
            document.title = newTitle ? newTitle : '会场';
        },
        mounted() {
            this.getTop();
            this.getMainContent();
            this.configShare();
        },
        destroyed(){
            this.configShare();
        }
    }
</script>
<style lang="less" scoped>
    .main {
        /*background: #F6F6F6;*/
        /*width: 100%;*/
        /*height: 100%;*/
        /deep/ .van-nav-bar__placeholder{
            height: 43px;
        }
        /deep/ .van-nav-bar{
            height: 43px;
        }
        /deep/ .van-nav-bar__left{
            .van-icon,.van-nav-bar__text{
                color:#333333;
            }
        }
    }

    .top_banner {
        width: 375px;
        height: 179px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        position: relative;

        .backFilterImg {
            width: 100%;
            height: 179px;
            position: absolute;
            top: 0;
            left: 0;
        }
        .sharebtn {
            position: absolute;
            top: 9px;
            right: 14px;
            width: 26px;
            height: 26px;
        }

        .logoImg {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            position: absolute;
            left: 50%;
            top: 25px;
            border: 1px solid #F6F6F6;
            transform: translateX(-50%);
            background-size: 100% 60%;
            background-repeat: no-repeat;
            background-position: center;
            background-color: #fff;
        }

        .bannerTitle {
            width: 375px;
            text-align: center;
            position: absolute;
            top: 93px;
            font-size: 16px;
            font-weight: bolder;
        }

        .bannerDesc {
            margin: 0 14px;
            font-size: 13px;
            line-height: 20px;
            /*background-color: chocolate;*/
            position: absolute;
            bottom: 6px;
            text-align: justify;
        }
    }

    .overTime {
        height: 55px;
        line-height: 55px;
        text-align: center;
        width: 100%;
        background-color: #F6F6F6;
        /*background-color: gray;*/

        /deep/ .van-count-down {
            height: 20px;
            line-height: 20px;
            padding-top: 21px;

            span {
                display: inline-block;
            }
        }
    }

    .iconCss {
        margin: 0 6px;
        color: #000000;
    }

    .timeOverDay {
        margin-left: 3px;
    }

    .dayCss {
        color: red;
        margin-right: 3px;
    }


    .numberCss {
        width: 19px;
        height: 19px;
        text-align: center;
        line-height: 21px;
        color: #fff;
        background: #333333;
        border-radius: 2px;
    }

    .hoursCss {
        margin-left: 8px;
    }
</style>