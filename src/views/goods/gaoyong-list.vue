<template>
    <div class="main">
        <!-- <div class="searchmain">
            <div class="searchdiv">
                <img src="../../assets/images/search.png" class="fangdajing">
                <input type="text" placeholder="搜索品牌优惠卷 优惠下单" class="searchinput">
            </div>
        </div> -->

        <!-- <div class="pxdiv">
            <ul class="pxul">
                <li :class="{pxworldselect:index==0}" @click="changeType(0)">
                    <div class="pxworld">优惠力度</div>
                </li>
                <li :class="{pxworldselect:index==1}" @click="changeType(1)">
                    <div class="pxworld">价格区间</div>
                    <div class="pxarrow">
                        <img src="../../assets/images/sxbottom.png" class="arrow">
                    </div>
                </li>
                <li :class="{pxworldselect:index==2}" @click="changeType(2)">
                    <div class="pxworld">佣金排序</div>
                    <div class="pxarrow">
                        <img src="../../assets/images/sxup.png" class="arrow">
                    </div>
                </li>
            </ul>
        </div> -->
        <div class="goodsList">
            <ul class="goodsul">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="gaoyongFun"
                    :immediate-check="false"
                    >
                <li v-for="(item,index) in list" :key="index" @click="goDetail(item)">
                    <div class="goodsleft">
                        <img :src="item.path" class="goodsimg">
                    </div>
                    <div class="goodsright">
                        <div class="goods_name">{{item.name}}</div>
                        <div class="goodsyhjdiv">
                            <div class="goodsyhj">{{item.coupon}}元优惠券</div>
                            <div class="goodspl">已出售{{item.num}}件</div>
                        </div>
                        <!-- <div class="logodiv">
                            <img src="" class="logo" alt="">
                            <span class="compony">金河果品</span>
                        </div> -->
                        <div class="goodspricediv">
                            <div class="goodspicediv">
                                <div class="goodspricenow">¥{{item.vip_price}}</div>
                                <div class="goodspriceold">¥{{item.price}}</div>
                                <!-- <div class="goodsell">已出售1120件</div> -->
                            </div>
                        </div>
                        
                    </div>
                </li>
                </van-list>

            </ul>
        </div>


        <!-- 筛选 -->
        <transition name="fade">
        <div v-show="showSx">
            <div class="grey" @click.prevent="closesx"></div>
            <div class="shuaixuandiv">
                <div class="sxmain">
                    <div style="height:200px">1</div>
                    <div style="height:50px">2</div>
                    <div style="height:50px">3</div>
                    <div style="height:50px">4</div>
                    <div style="height:50px">5</div>
                    <div style="height:50px">6</div>
                    <div style="height:50px">7</div>
                    <div style="height:50px">8</div>
                    <div style="height:50px">9</div>
                    <div style="height:50px">0</div>
                    <div style="height:50px">11</div>
                </div>
                <div class="bottombtn">
                    <div class="sxreset">重置</div>
                    <div class="sxenter" >确定</div>
                </div>
            </div>
        </div>
        </transition>
    </div>
</template>
<script>
import {highShare} from "@/services/api"
import Vue from 'vue';
import { Tab, Tabs ,List} from 'vant';

Vue.use(Tab);
Vue.use(Tabs);
Vue.use(List);
export default {
    data(){
        return {
            showSx:false,
            list:[],
            index:0,//当前选择项
            loading: false,
            finished: false,
            page:1,
        }
    },
    mounted(){
        this.gaoyongFun();
    },
    methods:{
        gaoyongFun(){
            let param={
                page:this.page,
                pageNum:20
            }
            highShare(param).then((res)=>{
                if(res.code==200){
                    if(res.data!=""){
                        this.page+=1;
                        res.data.map((value,index,array)=>{
                            this.list.push(value);
                        })
                    }
                    // 加载状态结束
                    this.loading = false;
                }
            })
        },
        changeType(index){
            this.index=index;
        },
        //跳转详情
        goDetail(data){
            console.log(data)
            this.$router.push({path:'/goodsDetailZY',query:{goodsId:data.product_id,skuid:data.product_sku_id}});
        },
    }
}
</script>
<style lang="less" scoped>
    .main{
        background: #F6F6F6;
    }
    .searchmain{
        background:#ffffff;
        padding:10px 14px;
    }
    .searchdiv{
        width: 350px;
        height: 34px;
        border-radius:17px;
        background: #F0F2F5;
    }
    .fangdajing{
        float:left;
        width:20px;
        height: 20px;
        margin-top:7px;
        margin-left: 5px;
    }
    .searchinput{
        float:left;
        font-size:13px;
        color:#999999;
        height: 34px;
        line-height: 34px;
        width:300px;
        background: #F0F2F5;
    }
    .pxdiv{
        background:#ffffff;
        padding-top:15px;
    }
    .pxul{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        padding-bottom: 10px;
        margin-bottom: 1px;
    }
    .pxul li{
        position: relative;
        width:100%;
        font-size:16px;
        color:#141414;
        font-weight: bold;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .pxul li.pxworldselect{
        color:#FF001C;
    }
    .pxul li.pxworldselect::after{
        position: absolute;
        content: "";
        height:2px;
        background:#FF001C;
        width:100%;
        left:0;
        bottom:-10px;
    }
    .pxarrow{
        width:12px;
        height:16px;
        margin-left:2px;
    }



    .goodsList{
        margin-top: 10px;
        width:375px;
    }
    .goodsul li{
        background: #ffffff;
        border-radius: 8px;
        padding:14px;
        width:375px;
        display: flex;
        flex-direction: row;
        justify-content:space-between;
        margin-bottom: 10px;
        position: relative;
    }
    .goodsleft{
        width:140px;
        height:140px;
    }
    .goodsimg{
        width:100%;
    }
    .goodsright{
        width:195px;
    }
    .goods_name{
        color:#141414;
        font-size:15px;
        line-height: 30px;
        font-weight: bold;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    .goodsyhjdiv{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        margin-top: 4px;
    }
    .goodsyhj{
        background: url("../../assets/images/yhj.png") no-repeat;
        background-size:82px 22px;
        width:82px;
        height:22px;
        text-align: center;
        line-height:22px;
        font-size:12px;
        color:#ED2E2E;
    }
    .goodspl{
        font-size:12px;
        color:#999999;
        margin-left: 5px;
    }
    .goodspricediv{
        margin-top:5px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-top: 50px;
    }
    .goodspicediv{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .goodspricenow{
        color:#ED2E2E;
        font-weight: bold;
        font-size:18px;
    }
    .goodspriceold{
        font-size:12px;
        color:#999999;
        text-decoration:line-through;
        margin-left:2px;
    }
    .goodsell{
        font-size:12px;
        color:#999999;
        margin-left:2px;
    }
    .logodiv{
        margin-top:5px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
    .compony{
        font-size:12px;
        color:#999999;
    }
    .logo{
        width:20px;
        height:20px;
        margin-right:5px;
    }
</style>