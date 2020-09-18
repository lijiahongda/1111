<template>
    <div class="main">
        <div class="head">
            <img :src="banner.url" alt="" class="headimg">
        </div>
        <div class="content">
            <van-tabs v-model="type" title-active-color="#E04B53" title-inactive-color="#333333" @click="changetype">
                <!-- <van-tab title="预告" >
                    <div class="videolist">
                        <ul class="videoul">
                            <li v-for="(item,index) in list" :key="index">
                                <div class="fmdiv">
                                    <img :src="item.cover" class="fengmian">
                                </div>
                                <div class="bottom">
                                    <div class="littleimg">
                                        <img src="" class="littleicon">
                                    </div>
                                    <div class="shopinfo">
                                        <div class="name">巧克力一包，超级美味情人节</div>
                                        <div class="price">￥99</div>
                                    </div>
                                </div>
                            </li>
                            <div class="no-goods" v-if="list.length == 0">
                                <img src="../../assets/images/no-goods.png">
                                <div class="att">暂无列表</div>
                            </div>
                        </ul>
                    </div>    
                </van-tab> -->
                <van-tab title="直播中" >
                    <div class="videolist">
                        <ul class="videoul">
                            <li v-for="(item,index) in list" :key="index" @click="lookZb(item)">
                                <div class="fmdiv">
                                    <div class="usernumber">
                                        
                                    </div>
                                    <img :src="item.cover" class="fengmian">
                                    <div class="userdiv">
                                        <img :src="item.head_url" class="userhead">
                                        <span class="username">{{item.nickname}}</span>
                                    </div>
                                </div>
                                <div class="bottom">
                                    <div class="littleimg">
                                        <img :src="item.goodsList.carousel" class="littleicon">
                                    </div>
                                    <div class="shopinfo">
                                        <div class="name">{{item.goodsList.name}}</div>
                                        <div class="price">￥{{item.goodsList.price}}</div>
                                    </div>
                                </div>
                            </li>
                            <div class="no-goods" v-if="list.length == 0">
                                <img src="../../assets/images/no-goods.png">
                                <div class="att">暂无列表</div>
                            </div>
                        </ul>
                    </div> 
                </van-tab>
                <van-tab title="直播回放" >
                    <div class="videolist">
                        <ul class="videoul">
                            <li v-for="(item,index) in list" :key="index">
                                <div class="fmdiv">
                                    <img :src="item.cover" class="fengmian">
                                </div>
                                <div class="bottom">
                                    <div class="littleimg">
                                        <img src="" class="littleicon">
                                    </div>
                                    <div class="shopinfo">
                                        <div class="name">巧克力一包，超级美味情人节</div>
                                        <div class="price">￥99</div>
                                    </div>
                                </div>
                            </li>
                            <div class="no-goods" v-if="list.length == 0">
                                <img src="../../assets/images/no-goods.png">
                                <div class="att">暂无列表</div>
                            </div>
                        </ul>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
        <Nav></Nav>
    </div>
</template>

<script>
import Vue from 'vue';
import Nav from '@/component/Nav';
import { Tab, Tabs } from 'vant';
import {videobanner , videolist} from "@/services/api"

Vue.use(Tab);
Vue.use(Tabs);
export default {
    data() {
        return {
            type:0, // 0直播中--1  1回放---3
            banner:"",
            list:""
        };
    },
    components: {
        Nav
    },
    mounted(){
        this.getVideoBanner();
        this.getVideoList();
    },
    methods:{
        getVideoBanner(){
            let params={
                "mid": "0",
                "channel": 0
            }
            videobanner(params).then((res)=>{
                if(res.code==200){
                    this.banner =res.data[0];
                }
            })
        },
        getVideoList(){
            //类型  1直播中 3直播回放
            let type = this.type;
            type=type==0?1:3;
            let params={
                "mid": localStorage.getItem("uid"),
                "type": type,
                "page": 1,
                "pageSize": 10,
                "channel": 0
            }
            videolist(params).then((res)=>{
                if(res.code==200){
                    this.list =res.data;
                }
            })
        },
        changetype(){
            this.getVideoList();
        },
        lookZb(e){
            this.$router.push({path:'videodetail',query:{live_mid:e.mid}})
        }
    }
}
</script>
<style lang="less" scoped>
    .main{
        background: #FAF7F8;
    }
    .head{
        width:375px;
        height:192px;
    }
    .headimg{
        width:375px;
        height:192px;
        display: block;
    }
    .content{

    }
    /deep/ div[class*="van-hairline"]::after {
        border:none;
    }
    /deep/ .van-tabs__nav{
        background:#FAF7F8;
    }
    .videolist{
        padding: 0 10px;
        box-sizing:border-box;
        margin-top: 20px;
    }
    .videoul{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .videoul li{
        border-radius: 10px;
        width:173px;
        background:#fff;
        padding-bottom: 10px;
        margin-bottom: 10px;
    }
    .fmdiv{
        border-radius: 10px;
        position: relative;
    }
    .usernumber{
        position: absolute;
        left: 10px;
        top: 10px;
    }
    .fengmian{
        display: block;
        width:173px;
        height:173px;
        border-radius: 10px;
    }
    .userdiv{
        position: absolute;
        left: 10px;
        bottom: 10px;
        height: 33px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .username{
        font-size:12px;
        color:#ffffff;
        padding-left: 5px;
        display: inline-block;
    }
    .userhead{
        display: inline-block;
        width:33px;
        height:33px;
        border-radius: 50%;
    }
    .littleimg{
        width:45px;
        height:45px;
        margin:0 0 0 10px;
    }
    .littleicon{
        width:45px;
        height:45px;
        display: block;
    }
    .name{
        color:#333333;
        font-size:12px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }
    .price{
        color:#DF4A52;
        font-size:15px;
        font-weight: bold;
    }
    .bottom{
        display: flex;
        flex-direction: row;
        margin-top: 10px;
    }
    .shopinfo{
        text-align:left;
        padding:0 10px 0 10px;
    }
    .no-goods {
        padding-bottom: 15px;
        img {
            width: 400px;
            height: 400px;
            margin: 10px auto;
        }
        .att {
            font-size: 16px;
            color: #999;
        }
    }
</style>