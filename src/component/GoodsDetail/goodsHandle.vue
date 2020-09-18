<template>
    <div class="main">
      <div class="coupon" v-if="goodsInfo.goodsCoupon.length >= 1" @click.stop="openCouponList">
        <div class="lab">领劵</div>
        <div class="val newCouponCss">
          <div class="bgi" v-for="(item,index) in goodsInfo.goodsCoupon.slice(0,3)">{{ item.remind }}</div>
          <!-- <img
              @click="routerLink('/coupon')"
              class="more"
              src="../../assets/images/more-change.png"
          /> -->
          <van-icon name="arrow" class="rightArrow"/>
        </div>
      </div>
        <div class="progress" @click="routerLink('/growCount')">
            <div class="title">
                <span>成长值</span>
                <div class="txt-box">
                    <img class="fy" src="../../assets/images/feng-ye.png" />
                    购买此商品最少可获得{{
                        goodsInfo.newShareScore && goodsInfo.newShareScore.buy
                    }}成长值
                </div>
            </div>
            <img
                class="more"
                src="../../assets/images/more-change.png"
            />
        </div>

        <div class="coupon" @click="$store.commit('changeShowSku',true)">
            <div class="lab">规格</div>
            <div class="val">
                <div>
                    {{
                        goodsInfo.saleList.length &&
                            goodsInfo.saleList[0].buttons.length &&
                            goodsInfo.saleList[0].buttons[$store.state.skuIdx].text
                    }}
                </div>
                <img class="more" src="../../assets/images/more-change.png" />
            </div>
        </div>
        <div class="coupon" @click="routerLink('/addressList')">
            <div class="lab">送至</div>
            <div class="val">
                <div class="special">
                    <div class="address">
                        {{ addressTxt }}
                    </div>
                    <img
                        class="more"
                        src="../../assets/images/more-change.png"
                    />
                </div>
            </div>
        </div>
        <!-- <div class="coupon m20">
            <div class="lab"></div>
            <div class="val">
                <div class="special">
                    <div class="express">
                        现在付款，预计7月7号18:00之前发货
                    </div>
                </div>
            </div>
        </div> -->
        <div class="coupon">
            <div class="lab">运费</div>
            <div class="val">
                <div>{{ goodsInfo.goodFreight }}</div>
                <!-- <img class="more" src="../../assets/images/more-change.png" /> -->
            </div>
        </div>
        <div class="yeah">
            <div class="icon-box">
                <img class="icon" src="../../assets/images/yeah.png" />
                <span class="mr20">商家发货&售后</span>
                <img class="icon" src="../../assets/images/yeah.png" />
                <span>7天无理由退货</span>
            </div>
            <!-- <img class="more" src="../../assets/images/more-change.png" /> -->
        </div>
      <van-action-sheet
          v-model="couponShow"
          title="优惠卷"
          :duration="0.2">
        <div class="couponContent">
          <div class="couponCan">可领取优惠卷</div>
          <div v-for="(val,index) in goodsInfo.goodsCoupon" class="everyCoupon">
            <div class="couponPriceBox">
              <p class="couponPriceBox_amount">￥<span>{{val.amount}}</span></p>
              <p class="couponPriceBox_can">{{val.remindSamount}}</p>
            </div>
            <div class="couponNameBox">
              <p class="van-multi-ellipsis--l2">{{val.name}}</p>
              <p>{{val.usedRemind}}</p>
<!--              -->
              <p class="receiveCoupon"
                 v-if="val.couponState != 2"
                 @click="receiveCoupon(val.cid)">点击领取</p>
              <p class="receiveCoupon_has" v-if="val.couponState == 2">已领取</p>
<!--              -->
            </div>
          </div>
        </div>
      </van-action-sheet>
    </div>
</template>

<script>

import { addressH5List, getCoupon } from "../../services/userApi";

export default {
    props: {
        goodsInfo: {
            // 商品详情数据
            type: Object,
            default: {},
        },
    },
    data() {
        return {
            addressInfo: {}, // 地址信息
            addressTxt: "请选择配送地",// 地址信息
            couponShow:false
        };
    },
    methods: {

      //领取优惠卷
      receiveCoupon(cid){
        console.log(cid);
        let userUid = localStorage.getItem("uid");
        if(!userUid){
          this.$router.push({ path: "/login" });
        }else{
          let couponParams = {
            uid : userUid,
            cid: cid
          }
          getCoupon(couponParams).then(res=>{
            console.log(res);
            this.$emit('getData',{})
          })
        }

      },

        openCouponList(){
          this.couponShow = true;
        },

        routerLink(url) {
            // 路由跳转
            this.$router.push(url);
        },
        getAddressList() { // 先从本地中读取，如果本地没有，去地址列表拿第一条
            if(window.localStorage.getItem('addressItem')){ // 选择地址后的操作
                let data = JSON.parse(window.localStorage.getItem('addressItem'))
                this.addressInfo = data;
                this.addressTxt =
                    data.proviceName +
                    data.cityName +
                    data.zoneName;
                this.$store.commit('handleAddressInfo',data)
                this.$store.commit('changeAddressReady',true)
                window.localStorage.removeItem('addressItem')
                return
            }
            // 获取默认地址
            let data = {
                mid: window.localStorage.getItem('uid')
            }
            if(!data.mid){
                return
            }
            addressH5List(data).then((res) => {
                if (res.status == 200) {
                    res.data = res.data || [];
                    if (res.data.length > 0) {
                        this.addressInfo = res.data[0];
                        this.addressTxt =
                            res.data[0].proviceName +
                            res.data[0].cityName +
                            res.data[0].zoneName;
                        this.$store.commit('handleAddressInfo',res.data[0])
                    }
                }
                this.$store.commit('changeAddressReady',true)
            });
        }
    },
    mounted() {
        this.getAddressList();
    }
};
</script>

<style lang="less" scoped>
.main{
  /deep/ .van-popup{
    background-color: #F6F6F6;
  }
}
.progress {
    width: 100%;
    height: 44px;
    box-sizing: border-box;
    padding: 0 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
        font-size: 13px;
        color: #999;
        display: flex;
        align-items: center;
        span {
            margin-right: 13px;
        }
        .txt-box {
            height: 22px;
            box-sizing: border-box;
            padding: 0 8px;
            background: #1b1716;
            border-radius: 11px;
            display: flex;
            align-items: center;
            font-size: 12px;
            color: #ffffff;
            .fy {
                width: 16px;
                height: 18px;
                margin-right: 8px;
            }
        }
    }
    .more {
        width: 14px;
        height: 4px;
    }
}
.coupon {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .bgi {
        min-width: 65px;
        height: 22px;
        //background: url("../../assets/images/yhj.png") no-repeat;
        //background-size: 100% 100%;
        background-color: #ffe9e9;
        text-align: center;
        line-height: 24px;
        color: #ff001b;
        font-size: 12px;
      border-radius: 5px;
    }
    .lab {
        width: 57px;
        height: 44px;
        line-height: 44px;
        box-sizing: border-box;
        padding-left: 12px;
        font-size: 13px;
        color: #999;
        text-align: left;
    }
    .val {
        width: 318px;
        min-height: 44px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        box-sizing: border-box;
        padding-right: 12px;
        border-bottom: 1px solid #f8f8f8;
        .special {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .address {
            width: 75%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            text-align: left;
        }
        .express {
            width: 75%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: #999;
            font-size: 12px;
            text-align: left;
        }
        .more {
            width: 14px;
            height: 4px;
        }
    }
}
.handle {
    border: none !important;
}
.m20 {
    margin-top: -20px;
}
.yeah {
    width: 100%;
    height: 30px;
    box-sizing: border-box;
    padding: 0 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f3f3f3;
    font-size: 12px;
    color: #999999;
    .icon-box {
        display: flex;
        align-items: center;
        .icon {
            width: 12px;
            height: 12px;
            margin-right: 3px;
        }
        .mr20 {
            margin-right: 20px;
        }
    }
    .more {
        width: 14px;
        height: 4px;
    }
}

.newCouponCss{
  justify-content: left!important;
  align-items: center;
  position: relative;
  .bgi{
    margin-right: 7px;
  }
  .rightArrow{
    font-size: 22px;
    padding: 6px;
    position: absolute;
    right:2px;
    color:rgba(188,188,188,1);
    //background-color: chocolate;
  }
}
.couponContent{
  height: 400px;
  .couponCan{
    text-align: left;
    margin:10px 0 20px 10px;
  }
  .everyCoupon{
    width: calc(100% - 20px);
    height: 70px;
    margin-left: 10px;
    //background-color: white;
    border-radius: 7px;
    margin-bottom: 10px;
    position: relative;
    .couponPriceBox{
      position: absolute;
      //border-right: 1px dashed #ff001b;
      //padding-right: 10px;
      left:0;
      top:0;
      width: 32%;
      height: 100%;
      background-color: #ff001b;
      border-radius: 7px 0 0 7px;
      .couponPriceBox_amount{
        width: 100%;
        text-align: center;
        position: absolute;
        color:#fff;
        font-size: 12px;
        //left:50%;
        //transform: translate(-50%,0);
        top:22%;
        span{
          font-size: 26px;
        }
      }
      .couponPriceBox_can{
        position: absolute;
        color:#fff;
        font-size: 12px;
        //transform: translate(-50%,0);
        //left:50%;
        width: 100%;
        text-align: center;
        bottom:5px;
      }
    }
    .couponNameBox{
      position: absolute;
      //border-right: 1px dashed #ff001b;
      //padding-right: 10px;
      right:0;
      top:0;
      width: 68%;
      height: 100%;
      background-color: #fff;
      border-radius: 0 7px 7px 0;
      p:first-child{
        margin: 10px 0 0 15px;
        text-align: left;
      }
      p:nth-child(2){
        margin-left: 15px;
        position: absolute;
        bottom:5px;
        font-size: 12px;
      }
      .receiveCoupon{
        position: absolute;
        right:15px;
        bottom:5px;
        font-size: 10px;
        background-color:#ff001b;
        color:rgba(255,255,255,1);
        padding: 0 7px;
        height: 16px;
        line-height: 17px;
        border-radius:15px;
      }
      .receiveCoupon_has{
        position: absolute;
        right:15px;
        bottom:5px;
        font-size: 10px;
        background-color:#e6e6e6;
        color:rgba(0,0,0,0.5);
        padding: 0 7px;
        height: 16px;
        line-height: 17px;
        border-radius:15px;
      }
    }
  }
  .everyCoupon:last-child{
    margin-bottom: 30px;
  }
}
</style>
