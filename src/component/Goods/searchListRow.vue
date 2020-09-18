<template>
    <div>
        <van-list
                v-model="loadStatus.loading"
                :finished="loadStatus.finished"
                finished-text="已加载完毕"
                offset="300"
                :error.sync="loadStatus.error"
                error-text="请求失败，点击重新加载"
                :immediate-check="false"
                @load="onLoad">
            <div class='boxCell'
                 v-for="(item,index) in searchListData"
                 :key="index">
                <div class="goodsbox" @click="jumpToDetails(item)" style="touch-action: none;">
                    <div class="goodsleft">
                        <img :src="item.productImage" class="goodsimg">
                    </div>
                    <div class="goodsright">
                        <div>
                            <div class="goods_name">
                                <!--<div class="goodsIcon">JD</div>-->
                                {{item.productName}}
                            </div>
                            <div class="goodsyhjdiv">
                                <div class="goodsyhj" v-if="item.couponFee">{{item.couponFee}}元优惠券</div>
                                <div class="goodspl">已售{{item.orderPayCount}}件</div>
                            </div>
                        </div>
                        <div class="goodsright_bottom">
                            <div class="goodspricediv">
                                <div class="goodspicediv">
                                    <div class="goodspricenow">¥{{item.vipPrice}}</div>
                                    <div class="goodspriceold">¥{{item.price}}</div>
                                </div>

                            </div>
                            <!--                            <div class="goodsExtend" @click.prevent="jump_buy(item.coupon.link)">-->
                            <!--                                推广赚¥{{item.commission_info.earn_price.toFixed(2)}}-->
                            <!--                            </div>-->
                        </div>
                        <!-- <div class="buyIt" @click.prevent="jump_buy(item.coupon.link)">抢</div>-->
                    </div>
                </div>
            </div>
        </van-list>
    </div>
</template>
<script>
    import Vue from 'vue';
    import { Toast } from 'vant';

    Vue.use(Toast);
    import {switchTaoBaoAuth} from '@/services/api';
    import  {switchTaoBaoAuth_new} from '@/services/clothes'
    export default {
        name: 'searchListRow',
        props: ['searchListData', 'searchParams', 'loadStatus'],
        data() {
            return {}
        },
        methods: {
            // jump_buy(url) {
            //     location.href = url;
            // },
            onLoad() {
                this.$nextTick(() => {
                    this.$emit('sendPage', {nowPage: this.searchParams.page += 1})
                })
            },


            //跳转产品详情页
            jumpToDetails(obj) {

                // 京东商城", channelid: 3
                // "京东", channelid: 100
                // "京东优选", channelid: 3
                // "拼多多", channelid: 98
                // "淘宝", channelid: 99
                // "唯品会", channelid: 101
                // "悦淘优选", channelid: 5
                // "海购考拉", channelid: 6
                // /goodsDetailCPS?goodsId='商品ID'&status=（3:京东；4:拼多多；5:淘宝；6:唯品会）
                if (obj.channelId == 3 || obj.channelId == 100) {//京东
                    this.$router.push({
                        path: '/goodsDetailCPS',
                        query: {
                            goodsId: obj.productId,
                            status: 3
                        }
                    })
                    // this.$router.push({
                    //     path: '/goodsDetailZY',
                    //     query: {
                    //         goodsId: obj.productId,
                    //         skuid: obj.skuId
                    //     }
                    // })
                } else if (obj.channelId == 98) {//拼多多
                    this.$router.push({
                        path: '/goodsDetailCPS',
                        query: {
                            goodsId: obj.productId,
                            status: 4
                        }
                    })
                } else if (obj.channelId == 99) {//淘宝
                    let midParams = {
                        mid: window.localStorage.getItem('uid')
                    }
                    if (!midParams.mid || midParams.mid == 'undefined') {
                        Toast('该商品需要登录后查看')
                        return
                    } else {
                        //点击淘宝时判断用户授权
                        switchTaoBaoAuth(midParams).then(ele => {
                            if (ele.data.channel_bind && ele.data.auth) {
                                this.$router.push({
                                    path: '/goodsDetailCPS',
                                    query: {
                                        goodsId: obj.productId,
                                        status: 5
                                    }
                                })
                            }else{
                                Toast('该账户未进行淘宝授权')
                            }
                        })
                    }

                  // let loginStatus = localStorage.getItem('uid');
                  // if(loginStatus){
                  //   this.getTbsq(obj.productId);
                  // }else{
                  //   this.$router.push({
                  //     path:'/login',
                  //   })
                  // }




                } else if (obj.channelId == 101) {//唯品会
                    this.$router.push({
                        path: '/goodsDetailCPS',
                        query: {
                            goodsId: obj.productId,
                            status: 6
                        }
                    })
                }
//goodsDetailZY?liveId='直播ID'&liveUserId='直播人ID'&parentTypeId='产品类型'&goodsId='产品ID'&skuid='产品规格ID'
                    //goodsDetailJD?goodsId='商品ID'京东  、/goodsDetailPDD?goodsId='商品ID' 拼多多

                    //*****自营、海购考拉 先用自营 地址***//
                    //*****自营、海购考拉 先用自营 地址***//
                //*****自营、海购考拉 先用自营 地址***//
                else if (obj.channelId == 5) {//自营商品
                    this.$router.push({
                        path: '/goodsDetailZY',
                        query: {
                            goodsId: obj.productId,
                            skuid: obj.skuId
                        }
                    })
                } else if (obj.channelId == 6) {//海购考拉
                    this.$router.push({
                        path: '/goodsDetailZY',
                        query: {
                            goodsId: obj.productId,
                            skuid: obj.skuId
                        }
                    })
                }
            },

          //获取淘宝授权
          // getTbsq(productId){
          //   let that = this;
          //   let params ={};
          //   let mid = localStorage.getItem("uid");
          //   let roomid=this.$route.query.room_id;
          //   let goodsId = productId;
          //
          //   let uidroomid = sessionStorage.getItem("uidroomid");
          //
          //   if(roomid){
          //     let uidroomid2=mid+","+roomid+","+goodsId
          //     sessionStorage.setItem("uidroomid",uidroomid2);
          //     params={
          //       "mid":mid,
          //       "roomId":roomid,
          //       "goodsId":goodsId
          //     }
          //   }else if(uidroomid){
          //     var stringArr= uidroomid.split(",");
          //     if(goodsId==stringArr[2]){
          //       params={
          //         "mid":stringArr[0],
          //         "roomId":stringArr[1],
          //         "goodsId":stringArr[2]
          //       }
          //     }else{
          //       params={
          //         "mid":stringArr[0],
          //         "roomId":0,
          //         "goodsId":goodsId
          //       }
          //     }
          //   }else{
          //     var uidroomid2=mid+",0,"+goodsId;
          //     sessionStorage.setItem("uidroomid",uidroomid2);
          //     params={
          //       "mid":mid,
          //       "roomId":0,
          //       "goodsId":goodsId
          //     }
          //   }
          //   switchTaoBaoAuth_new(params).then(data=>{
          //     if(data.code=="200"){
          //       console.log("已授权");
          //       //that.skiInfo(params);//调取商品详情
          //       this.$router.push({
          //           path: '/goodsDetailCPS',
          //           query: {
          //               goodsId: productId,
          //               status: 5
          //           }
          //       })
          //     }
          //     if(data.code=="201"){
          //       console.log("未授权");
          //       var ua = window.navigator.userAgent.toLowerCase();
          //       if (ua.match(/MicroMessenger/i) == "micromessenger") {
          //         Toast("请复制链接，在浏览器中打开");
          //         //that.go = true
          //       }else{
          //         //toast("访问该页面，需获得淘宝授权");
          //         window.location.href=data.data.url;
          //
          //       }
          //     }
          //   })
          //
          //   // $.ajax({
          //   //   url:"https://single.yuetao.group/outside/tbkAuthCheck",
          //   //   type: "POST",
          //   //   data:params,
          //   //   dataType: "json",
          //   //   success: function (data) {
          //   //     if(data.code=="200"){
          //   //       console.log("已授权");
          //   //       that.skiInfo(params);//调取商品详情
          //   //     }
          //   //     if(data.code=="201"){
          //   //       console.log("未授权");
          //   //       var ua = window.navigator.userAgent.toLowerCase();
          //   //       if (ua.match(/MicroMessenger/i) == "micromessenger") {
          //   //         //toast("请复制链接，在浏览器中打开");
          //   //         that.go = true
          //   //       }else{
          //   //         //toast("访问该页面，需获得淘宝授权");
          //   //         window.location.href=data.data.url;
          //   //
          //   //       }
          //   //     }
          //   //   }
          //   // })
          // },


        },
        mounted() {

        }
    }
</script>
<style lang="less" scoped>

    .boxCell {
        margin-bottom: 8px;
        border-radius: 8px;
        background: #ffffff;
        padding: 12px 14px;
    }

    .boxCell::after {
        border-bottom: none;
    }

    .goodsbox {
        background: #ffffff;
        /*width: 375px;*/
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        position: relative;
        width: inherit;
    }

    .goodsleft {
        width: 140px;
        height: 140px;
        /*border:1px solid red;*/
    }

    .goodsimg {
        width: 100%;
    }

    .goodsright {
        width: 195px;
        display: flex;
        flex-wrap: wrap;
        /*background-color: red;*/
        overflow: hidden;
        // flex-direction: column;
        align-content: space-between;
    }

    .goodsIcon {
        display: inline-block;
        /*width: 20px;*/
        height: 20px;
        line-height: 20px;
        padding: 0 2px;
        margin-right: 3px;
        border-radius: 1px;
        background: rgba(221, 39, 39, 1);
        color: #fff;
        font-weight: bold;
    }

    .goods_name {
        color: #141414;
        font-size: 15px;
        margin-top: 4px;
        height: 38px;
        line-height: 20px;
        /*font-weight: bold;*/
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }

    .goodsyhjdiv {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        margin-top: 4px;
    }

    .goodsyhj {
        background: url("../../assets/images/yhj.png") no-repeat;
        background-size: 82px 22px;
        width: 82px;
        height: 22px;
        text-align: center;
        line-height: 22px;
        font-size: 12px;
        color: #ED2E2E;
    }

    .goodspl {
        font-size: 12px;
        color: #999999;
        margin-left: 5px;
    }


    .goodsright_bottom {
        width: 100%;
    }

    .goodspricediv {
        /*margin-top: 5px;*/
        margin-bottom: 2px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .goodspicediv {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .goodspricenow {
        color: #ED2E2E;
        font-weight: bold;
        font-size: 18px;
    }

    .goodspriceold {
        font-size: 12px;
        color: #999999;
        text-decoration: line-through;
        margin-left: 2px;
    }

    .goodsExtend {
        width: 89px;
        text-align: center;
        height: 22px;
        line-height: 22px;
        border-radius: 11px;
        border: 1px solid rgba(237, 46, 46, 1);

        /*width:73px;*/
        /*height:17px;*/
        font-size: 12px;
        /*font-family:PingFangSC-Regular,PingFang SC;*/
        font-weight: 400;
        color: rgba(237, 46, 46, 1);
    }

    .buyIt {
        width: 40px;
        height: 40px;
        background-color: #ED2E2E;
        border-radius: 50%;
        text-align: center;
        line-height: 40px;
        color: #fff;
        font-size: 18px;
        position: absolute;
        right: 0;
        bottom: 0;
    }
</style>