<template>
    <div class="mainArea">
        <van-list
                v-model="dataParams.loading"
                :finished="dataParams.finished"
                offset="300"
                :error.sync="dataParams.error"
                error-text="请求失败，点击重新加载"
                :immediate-check="false"
                @load="onLoad">
                <!-- finished-text="已加载完毕" -->
            <div class="vanBox">
                <div class="boxCell" v-for="(item,index) in dataList" :key="index" @click="gotoBuy(item)">
                    <img :src="item.productCover" alt="">
                    <p class="everyTitle van-multi-ellipsis--l2">{{item.productName}}</p>
                    <div class="saleBox">
                        <div class="saleIcon">{{item.discount}}折</div>
                        <div class="saleValue">
                            <img src="../../assets/images/feng-ye.png" alt="">
                            <span class="saleValue_text">成长值 {{item.growthValue}}</span>
                        </div>
                    </div>
                    <div class="priceBox">
                        <div class="newPrice">
                            <span>￥</span>{{item.vipPrice}}
                        </div>
                        <div class="oldPrice">￥{{item.originPrice}}</div>
                    </div>

                    <div class="buyBtn">立即抢购</div>
                </div>
                <van-empty v-if="dataList.length==0" description="暂无数据" />
            </div>

        </van-list>
        <van-empty v-if="dataList.length>0" description="已加载完毕" />
    </div>
</template>

<script>
import Vue from 'vue';
import { Empty } from 'vant';
Vue.use(Empty);
    export default {
        name: "clothesList",
        props: ['dataList', 'dataParams', 'env'],
        data() {
            return {}
        },
        methods: {
            onLoad() {
                this.$nextTick(() => {
                    this.$emit('sendPage', {nowPage: this.dataParams.page + 1})
                })
            },

            gotoBuy(obj) {
                // console.log(obj);
                //goodsDetailZY?liveId='直播ID'&liveUserId='直播人ID'&parentTypeId='产品类型'
                // &goodsId='产品ID'&skuid='产品规格ID'
                let _Router = {
                    redirectType: 3,
                    id: obj.productId,
                    skuId: obj.productSkuId
                }
                if (this.env == 99) {//跳转RN
                    console.log('RN');
                    window.ReactNativeWebView.postMessage(JSON.stringify(_Router));
                } else if(this.env == 98){//跳转微信小程序详情
                    let goodsId_wx =obj.productId;
                    let goodsSkuId_wx = obj.productSkuId;
                    let wxUrl = `/page/shopDetails/shopDetails?parentTypeId=&goodsId=` + goodsId_wx + '&skuid=' + goodsSkuId_wx ;
                    wx.miniProgram.navigateTo({
                      url: wxUrl
                    });

                } else {
                  let loginStatus = localStorage.getItem("uid");
                  let newRoomId = this.$route.query.room_id;
                  let newCodeNumber = this.$route.query.codeNumber;

                  console.log(newRoomId,newCodeNumber);
                  if(loginStatus){
                    this.$router.push({
                      path: '/goodsDetailZY',
                      query: {
                        goodsId: obj.productId,
                        skuid: obj.productSkuId,
                        room_id:newRoomId
                      }
                    })
                  }else{
                    this.$router.push({
                      path: '/login',
                      query: {
                        codeNumber:newCodeNumber
                      }
                    })
                  }

                }
            },


        },
      beforeMount() {
        // 动态加载js脚本文件 h5跳转小程序 加载一个微信的jssdk
        // this.wx_script = document.createElement("script");
        // this.wx_script.type = "text/javascript";
        // this.wx_script.src = 'https://res.wx.qq.com/open/js/jweixin-1.3.2.js';
        // this.wx_script.id = 'wx_js_script'
        // document.body.appendChild(this.wx_script);
        //_______
        // console.log(this.wx_script);
        // setTimeout(()=>{
        //    document.querySelector("#wx_js_script").remove();
        // },5000)
      },
      mounted() {

          // console.log(this.wx_script,'childdddddddd');
        // if(this.env == 98){
        //   this.old_wx_js = document.querySelector("#old_wx_js");
        //   this.old_wx_js.remove(); //删除1.2.0 的微信jssdk
        //   // console.log(this.old_wx_js);
        // }
        },
      beforeDestroy() {
        //离开时销毁动态加载的 微信1.3.2 jssdk
        // if(this.wx_script){
        //   document.querySelector("#wx_js_script").remove();
        // }

      },
    }
</script>

<style scoped lang="less">
    .mainArea {
        width: 375px;
        min-height: 420px;
        background: #f8f8f8;
        /*padding:7px 14px 0 14px;*/

    }

    .vanBox {
        width: 375px;
        min-height: 420px;
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-content: flex-start;
    }

    .boxCell {
        width: 170px;
        height: 320px;
        background: #ffffff;
        border-radius: 7px 0px 0px 7px;
        margin-bottom: 7px;

        img {
          //width: 100%;
          //height:0;
          //padding-bottom:100%;
          //height: 100%;
          //height: auto;
          width: 170px;
            height: 170px;
        }
    }

    .boxCell:nth-child(2n+1) {
        margin-left: 14px;
    }

    .boxCell:nth-child(2n) {
        margin-right: 14px;
    }

    .everyTitle {
        width: 151px;
        height: 33px;
        margin: 6px 13px 0 6px;
        font-size: 13px;
        font-family: PingFang SC Regular, PingFang SC Regular-Regular;
        font-weight: 400;
        text-align: left;
        color: #333333;
        line-height: 17px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }

    .saleBox {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        margin: 9px 13px 0 6px;

        .saleIcon {
            background: url("../../assets/images/yhj_red.png") no-repeat;
            background-size: 50px 17px;
            width: 50px;
            height: 17px;
            text-align: center;
            line-height: 19px;
            font-size: 12px;
            color: #fff;
            /*color: #fefefe;*/



        }

        .saleValue {
            background: #333333;
            border-radius: 0px 6px 6px 3px;
            color: #fff;
            min-width: 75px;
            height: 17px;
            margin-left: 7px;
            line-height: 18px;
            font-size: 12px;
            position: relative;

            img {
                width: 12px;
                height: 13.5px;
                position: absolute;
                top: 2px;
                left: 5px;
            }

            .saleValue_text {
                /*position: absolute;*/
                /*top: 1px;*/
                /*left: 21px;*/
                margin-left: 21px;
                padding-right: 5px;
                /*background-color: chocolate;*/
            }
        }
    }

    .priceBox {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        margin: 11px 13px 0 6px;
        font-size: 16px;
        /*background-color: darkcyan;*/

        .newPrice {
            color: #f7253b;
            font-weight: 500;
            span {
                font-size: 12px;
                display: inline-block;
                font-family: PingFang SC Medium, PingFang SC Medium-Medium;
                font-weight: 500;
                text-align: left;
                margin-right: 2px;
            }
        }

        .oldPrice {
            margin-left: 6px;
            color: #999999;
            text-decoration: line-through
        }
    }

    .buyBtn {
        width: 157px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-color: #f7263c;
        border-radius: 15px;
        color: white;
        margin: 10px 13px 0 6px;
    }
    /deep/ .van-empty{
        margin: 10px auto;
    }

</style>