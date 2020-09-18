<template>
  <div class="main">
    <div class="bannerBox">
      <div class="bannerBack"></div>
      <div class="bannerMain">
        <van-swipe
          class="my-swipe"
          :show-indicators="false"
          :autoplay="5000"
          indicator-color="white"
        >
          <van-swipe-item v-for="(item,index) in couponAll.headerBannerList" :key="index">
            <div
              class="topBannerBox"
              :style="{backgroundImage:'url('+ (item.backgroundImg ? item.backgroundImg : testImgUrl[0]) +')',backgroundSize:'100% 100%' }"
            >
              <!-- couponAll.headerBannerList.couponList -->
              <div v-for="(val,idx) in item.couponList" class="bannerCoupon" :key="idx">
                <img src="../../assets/images/gl0.png" alt />
                <div class="couponDetail">
                  <!-- 金额 -->
                  <p class="couponDetail_count">{{ val.amount }}</p>
                  <!-- 满300可用 -->
                  <p class="couponDetail_can van-ellipsis">满{{ val.samount }}元可用</p>
                  <!-- 限购 -->
                  <p class="couponUseText van-ellipsis">{{ val.desc }}</p>
                  <p class="line_color"></p>
                  <p
                    v-if="val.isReceived > 0"
                    class="controlCss use_cc2"
                    @click="gotoDetail(val.redirectType,val.productId,val.skuId,val.activityId)"
                  >去使用</p>
                  <p
                    v-else
                    class="controlCss use_cc1"
                    @click="getSingleCoupon(val.couponId,idx)"
                  >领 取</p>
                  <img
                    class="hasGetIcon"
                    v-if="val.isReceived > 0"
                    src="../../assets/images/hasGetCouponIcon.png"
                    alt
                  />
                </div>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>

    <div class="twoCouponBox">
      <div
        class="_act _actBackImg"
        :style="{backgroundImage:'url('+ couponAll.centerBannerList[0].backgroundImg +')'}"
        @click="openCouponList(couponAll.centerBannerList[0].couponsId)"
      >
        <div class="act_text">
          <!-- <p>生活卷包</p>
          <p>一键领取</p>-->
        </div>
        <div class="act_img">
          <!-- <img src="../../assets/images/rob_coupon_gif.gif" alt /> -->
          <!-- <img :src="couponAll.centerBannerList[0].backgroundImg" alt=""> -->
        </div>
      </div>
      <div
        class="_act _actBackImg"
        :style="{backgroundImage:'url('+ couponAll.centerBannerList[1].backgroundImg +')'}"
        @click="RNHandle(couponAll.centerBannerList[1])"
      >
        <div class="act_text">
          <!-- <p>拼手气</p>
          <p>抢无门槛优惠卷</p>-->
        </div>
        <div class="act_img">
          <img src="../../assets/images/new_coupon.png" alt />
        </div>
      </div>
    </div>

    <div class="timeBox">
      <div class="timeTop">
        <img src="../../assets/images/time_coupon.png" alt />
        <div class="timeMain">
          <van-tabs
            v-model="active_time"
            title-active-color="#E33F44"
            title-inactive-color="#333333"
            :ellipsis="false"
            line-width="50px"
            background="F8F8F7"
            @change="changeTab_time"
            @disabled="onClickDisabled"
          >
            <!-- todayTimeAxisList :disabled="item.state" -->
            <van-tab v-for="(item,index) in couponAll.todayTimeAxisList" :key="index" :name="index">
              <template #title>
                <p>{{ item.startHour }}</p>
                <p>{{ item.stateRemind }}</p>
              </template>
            </van-tab>
          </van-tabs>
        </div>
      </div>
    </div>

    <div class="outBox">
      <div class="contentCouponBox" :style="{'width':(timeCouponList.length ) * 164 + 'px'}">
        <div v-for="(val,num) in timeCouponList" :key="num" class="everyTimeCoupon">
          <div v-if="val.state == 0">
            <img src="../../assets/images/coupon_canGet.png" alt />
            <div class="couponDetail">
              <p
                class="couponDetail_count"
                :style="{'color':val.surplusNum == 0 ? '#999999':'#333333'}"
              >{{ val.amount }}</p>
              <p
                class="couponDetail_can van-ellipsis"
                :style="{'color':val.surplusNum == 0 ? '#999999':'#333333'}"
              >满{{ val.mamount }}元可用</p>

              <p class="couponUseText van-ellipsis">{{ val.desc }}</p>

              <p
                v-if="val.surplusNum == 0"
                style=" border-right: 1px dashed #e7e7e7"
                class="line_color"
              ></p>

              <p
                v-if="val.surplusNum >= 1"
                style=" border-right: 1px dashed #fadfbe"
                class="line_color"
              ></p>

              <p v-if="val.surplusNum <= 0" style="color: #999999" class="controlCss">抢光了</p>

              <p v-else-if="val.isReceived > 0" style="color: #fd8d03" class="controlCss">去使用</p>

              <p v-else style="color: #fd8d03" class="controlCss">{{val.stateRemind}}</p>
            </div>
          </div>
          <div v-else>
            <img v-if="val.surplusNum > 0" src="../../assets/images/coupon_canGet.png" alt />
            <img v-if="val.surplusNum == 0" src="../../assets/images/gray_noCoupon.png" alt />
            <div class="couponDetail">
              <img
                class="gotouse"
                v-if="val.isReceived > 0"
                src="../../assets/images/hasGetCouponIcon.png"
                style="width:43px;height:30px; position: relative; left:18px"
              />
              <p
                class="couponDetail_count"
                :style="{'color':val.surplusNum == 0 ? '#999999':'#333333'}"
              >{{ val.amount }}</p>
              <p
                class="couponDetail_can van-ellipsis"
                :style="{'color':val.surplusNum == 0 ? '#999999':'#333333'}"
              >满{{ val.mamount }}元可用</p>

              <p class="couponUseText van-ellipsis">{{ val.desc }}</p>

              <p
                v-if="val.surplusNum == 0"
                style=" border-right: 1px dashed #e7e7e7"
                class="line_color"
              ></p>

              <p
                v-if="val.surplusNum >= 1"
                style=" border-right: 1px dashed #fadfbe"
                class="line_color"
              ></p>

              <p v-if="val.surplusNum <= 0" style="color: #999999" class="controlCss">抢光了</p>

              <p
                v-else-if="val.isReceived > 0"
                style="color: #fd8d03"
                class="controlCss"
                @click="gotoDetail(val.redirectType,val.productId,val.skuId,val.activityId)"
              >去使用</p>

              <p
                v-else
                style="color: #fd8d03"
                class="controlCss"
                @click="getSingleCoupon(val.couponId)"
              >领 &ensp;取</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tabTitleBox">
      <div class="tabTop">
        <van-tabs
          v-model="active"
          title-active-color="#333333"
          title-inactive-color="#333333"
          :ellipsis="false"
          line-width="38px"
          background="#ffffff"
          @change="changeTab_big"
        >
          <van-tab
            v-for="(item,index) in couponAll.channelTypeList"
            :title="item.title"
            :key="index"
          ></van-tab>
        </van-tabs>
      </div>
    </div>

    <div class="productCouponList">
      <div v-for="(content,index) in bigCouponList" :key="index" class="everyBigCoupon">
        <div class="typeBox" v-if="content.redirectType == 3">
          <img class="noUseBackImg" src="../../assets/images/single_product_back_noGet.png" alt />
          <p class="line_left"></p>
          <img
            class="one_img"
            :src="content.goodsInfo.couponImg"
            alt
            v-if="content.couponState != 2"
          />
          <img
            class="one_img"
            :src="content.goodsInfo.couponImg"
            alt
            v-if="content.couponState == 2"
            @click="gotoDetail(content.redirectType,content.goodsInfo.ProductId,content.goodsInfo.skuId)"
          />
          <p class="oneProduct_name van-ellipsis">{{ content.couponName }}</p>
          <p
            class="oneProduct_remind van-ellipsis"
          >{{ content.remind }}&ensp;{{ content.usedRemind }}</p>
          <p class="line_row"></p>
          <p class="priceBox onePrice">
            <span
              :style="{'color':(content.couponState == 1) || (content.couponState == 3) ?
              'rgba(0, 0, 0, 0.2)' : ''  }"
            >￥</span>
            <span
              :style="{'color':(content.couponState == 1) || (content.couponState == 3) ?
              'rgba(0, 0, 0, 0.2)' : ''  }"
            >{{ content.amount }}</span>
          </p>
          <img
            class="coupon_img_hasGet one_HasGet"
            v-if="content.couponState == 2"
            src="../../assets/images/hasGetCouponIcon.png"
            alt
          />
          <p
            class="controlBox_0 oneControl"
            v-if="content.couponState == 0"
            @click="getSingleCoupon(content.cid)"
          >立即领取</p>
          <p
            class="controlBox_2 oneControl"
            v-if="content.couponState == 2"
            @click="gotoDetail(content.redirectType,content.goodsInfo.ProductId,content.goodsInfo.skuId)"
          >去使用</p>
          <p
            class="controlBox_1 oneControl"
            v-if="content.couponState == 1"
            @click="toastTips('优惠卷已过期')"
          >已过期</p>
          <p
            class="controlBox_1 oneControl"
            v-if="content.couponState == 3"
            @click="toastTips('优惠卷已使用')"
          >已使用</p>
        </div>

        <div class="typeBox" v-if="content.redirectType == 39">
          <img
            v-if="content.couponState == 0"
            class="noUseBackImg"
            src="../../assets/images/ziying_back_coupon.png"
            alt
          />
          <img
            v-if="(content.couponState == 1) || (content.couponState == 2)|| (content.couponState == 3)"
            class="noUseBackImg"
            src="../../assets/images/ziying_back_coupon_has.png"
            alt
          />
          <p class="couponName van-ellipsis">{{ content.couponName }}</p>
          <div class="threeImg">
            <div
              class="threeImg_box"
              v-for="(url,newIndex) in content.goodsInfo"
              :key="newIndex"
              @click="gotoDetail(content.redirectType,url.ProductId,url.skuId)"
            >
              <img class="goodsImg" :src="url.couponImg" alt />
              <p class="goodsName van-ellipsis">{{ url.goodsName }}</p>
            </div>
          </div>
          <p class="priceBox">
            <span
              :style="{'color':(content.couponState == 1) || (content.couponState == 3) ?
              'rgba(0, 0, 0, 0.2)' : ''  }"
            >￥</span>
            <span
              :style="{'color':(content.couponState == 1) || (content.couponState == 3) ?
              'rgba(0, 0, 0, 0.2)' : ''  }"
            >{{ content.amount }}</span>
          </p>
          <p
            class="remainBox"
            :style="{'color':(content.couponState == 1) || (content.couponState == 3) ?
              'rgba(0, 0, 0, 0.2)' : ''  }"
          >{{ content.remind }}</p>
          <img
            class="coupon_img_hasGet"
            v-if="content.couponState == 2"
            src="../../assets/images/hasGetCouponIcon.png"
            alt
          />
          <p
            class="controlBox_0"
            v-if="content.couponState == 0"
            @click="getSingleCoupon(content.cid)"
          >立即领取</p>
          <p
            class="controlBox_2"
            v-if="content.couponState == 2"
            @click="gotoDetail(content.redirectType,null,null,content.activityId)"
          >去使用</p>
          <p class="controlBox_1" v-if="content.couponState == 1" @click="toastTips('优惠卷已过期')">已过期</p>
          <p class="controlBox_1" v-if="content.couponState == 3" @click="toastTips('优惠卷已使用')">已使用</p>
        </div>

        <div class="typeBox" v-if="content.redirectType == 95">
          <div class="pddBox" @click="gotoDetail(content.redirectType,content.goodsId)">
            <img class="pddImg" :src="content.goodsImg" alt />
            <p class="pddGoodsName van-multi-ellipsis--l2">{{ content.goodsName }}</p>
            <p class="pddGoodsCoupon" v-if="content.couponPrice">{{ content.couponPrice }} 元优惠券</p>
            <p class="getPddCoupon">点击领取</p>
          </div>
        </div>
      </div>
    </div>

    <van-overlay :show="showOverlay" :lock-scroll="true" style="z-index: 200">
      <div class="wrapper">
        <div class="wrapperBox">
          <div class="couponListBoxOut">
            <div v-for="(val,num) in couponBag" class="couponListBox" :key="num">
              <img class="backImg" src="../../assets/images/couponListBack.png" alt />
              <img
                class="proImg"
                :src="val.couponImg ?
              val.couponImg :
              'https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-08-21/00/yuelvhuigklIQKQALl1597940069.jpg' "
                alt
              />
              <p class="line_middle"></p>
              <p class="couponName van-ellipsis">{{ val.couponName }}</p>
              <p class="couponRemain van-ellipsis">{{ val.remind }}{{ val.usedRemind }}</p>
              <p class="line_last"></p>
              <p class="coupon_price">
                <span>￥</span>
                <span>{{ val.usedMoney }}</span>
              </p>
              <img class="coupon_img" src="../../assets/images/hasGetCouponIcon.png" alt />
            </div>
          </div>
          <img
            src="../../assets/images/closeCouponBtn.png"
            alt
            class="closeBtn"
            @click="showOverlay = false"
          />
        </div>
      </div>
    </van-overlay>
  </div>
  <!--      <div class="tabBottom">-->
  <!--        <div class="typeEvery">-->
  <!--          <p class="typeName">金额</p>-->
  <!--          <img class="upImg" src="../../assets/images/gray_up_arrow.png" alt=""/>-->
  <!--          <img class="upImg" src="../../assets/images/red_up_arrow.png" alt=""/>-->
  <!--          <img class="downImg" src="../../assets/images/gray_down_arrow.png" alt=""/>-->
  <!--          <img class="downImg" src="../../assets/images/red_down_arrow.png" alt=""/>-->
  <!--        </div>-->
  <!--        <div class="typeEvery">-->
  <!--          <p class="typeName">折扣</p>-->
  <!--          <img class="upImg" src="../../assets/images/gray_up_arrow.png" alt=""/>-->
  <!--          &lt;!&ndash;          <img class="upImg" src="../../assets/images/red_up_arrow.png" alt=""/>&ndash;&gt;-->
  <!--          <img class="downImg" src="../../assets/images/gray_down_arrow.png" alt=""/>-->
  <!--          &lt;!&ndash;          <img class="downImg" src="../../assets/images/red_down_arrow.png" alt=""/>&ndash;&gt;-->
  <!--        </div>-->
  <!--        <div class="typeEvery">-->
  <!--          <p class="typeName">品类</p>-->
  <!--          <img class="upImg" src="../../assets/images/gray_up_arrow.png" alt=""/>-->
  <!--          &lt;!&ndash;          <img class="upImg" src="../../assets/images/red_up_arrow.png" alt=""/>&ndash;&gt;-->
  <!--          <img class="downImg" src="../../assets/images/gray_down_arrow.png" alt=""/>-->
  <!--          &lt;!&ndash;          <img class="downImg" src="../../assets/images/red_down_arrow.png" alt=""/>&ndash;&gt;-->
  <!--        </div>-->
  <!--      </div>-->
</template>
<script>
import Vue from "vue";
import {} from "vant";

import {
  getNewCoupon,
  getHasCoupon,
  getYTCoupon,
  getCPSCoupon,
  getNowDateCoupon,
  getCouponBag,
  getSingleCoupon,
} from "@/services/activity";
import { Swipe, SwipeItem, Toast, Tab, Tabs, Overlay } from "vant";

Vue.use(Swipe).use(SwipeItem).use(Toast).use(Tab).use(Tabs).use(Overlay);
import axios from "axios"; // 引入axios
export default {
  name: "newCoupon",
  data() {
    return {
      active: 0,
      active_time: 0,
      couponAll: {},
      showOverlay: false,
      couponBag: [], //卷包
      bigCouponList: [], //两个品牌优惠卷
      timeCouponList: [], //限时秒杀的list
      env_rn: 0, //RN 判断
      //
      testTimeCoupon: [
        {
          activityId: 0,
          amount: 28,
          couponId: 2394,
          desc: "欧扎克水果坚果麦片优惠券",
          isReceived: 2,
          productId: "363815",
          redirectType: 3,
          samount: 60,
          skuId: 376295,
          state: 1,
          stateRemind: "热抢中",
          stock: 9988,
          surplusNum: 0,
        },
        {
          activityId: 0,
          amount: 28,
          couponId: 2394,
          desc: "欧扎克水果坚果麦片优惠券",
          isReceived: 2,
          productId: "363815",
          redirectType: 3,
          samount: 60,
          skuId: 376295,
          state: 1,
          stateRemind: "热抢中",
          stock: 9988,
          surplusNum: 9976,
        },
        {
          activityId: 0,
          amount: 28,
          couponId: 2394,
          desc: "欧扎克水果坚果麦片优惠券",
          isReceived: 2,
          productId: "363815",
          redirectType: 3,
          samount: 60,
          skuId: 376295,
          state: 1,
          stateRemind: "热抢中",
          stock: 9988,
          surplusNum: 9976,
        },
      ],
      testImgUrl: [
        "https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-07-09/21/yuelvhuiDALrZLCKYW1594302137.png",
      ],
      queryObj: {},
    };
  },
  created() {
    this.URLHandle();
    this.getCouponList(); //领劵中心头部
  },
  beforeMount() {
    this.returnTerminal(); //判断访问终端
  },

  methods: {
    toastTips(tips) {
      Toast(tips);
    },

    //自营优惠卷领劵
    getSingleCoupon(couponId, index) {
      console.log("couponId", couponId, "点击领取按钮", index);
      let userID = this.queryObj.uid;
      let _params = {
        cid: couponId,
        uid: userID ? userID : null,
      };
      _params.uid &&
        getSingleCoupon(_params).then((res) => {
          console.log("领取成功");
          Toast(res.msg);
          this.getListTabData(this.active); // 获取两个品牌的优惠卷，初始获取第一个tab的
          this.getCouponList();
          this.getNowDateCouponData(this.active_time);
        });
    },

    //跳转详情或RN 活动列表
    gotoDetail(type = 0, productID = 0, skuID = 0, actID = 0) {
      console.log(this.env_rn, type, productID, skuID, actID);
      if (this.env_rn == 99) {
        //跳转RN
        if (type == 3) {
          //跳RN 商品详情
          let _Router = {
            redirectType: 3,
            id: productID.toString(),
            skuId: skuID.toString(),
          };
          console.log("RN++++++", JSON.stringify(_Router));
          window.ReactNativeWebView.postMessage(JSON.stringify(_Router));
        } else if (type == 39) {
          if (actID) {
            //跳转RN活动列表
            let _Router = {
              redirectType: 39,
              id: actID.toString(),
            };
            console.log("RN++++++活动列表", JSON.stringify(_Router));
            window.ReactNativeWebView.postMessage(JSON.stringify(_Router));
          } else {
            //跳转RN 商品详情
            let _Router = {
              redirectType: 3,
              id: productID.toString(),
              skuId: skuID.toString(),
            };
            console.log("RN++++++", JSON.stringify(_Router));
            window.ReactNativeWebView.postMessage(JSON.stringify(_Router));
          }
        } else if (type == 95) {
          //跳转RN 拼多多详情
          let _Router = {
            redirectType: 95,
            id: productID.toString(),
          };
          console.log("RN++++++拼多多详情", JSON.stringify(_Router));
          window.ReactNativeWebView.postMessage(JSON.stringify(_Router));
        }
      } else {
        //跳转H5 ,【 新领劵中心暂不跳转H5】
      }
    },

    //获取领劵中心头部
    getCouponList() {
      let that = this;
      console.log("进入getcouponlist-->");
      let _params = {
        uid: this.queryObj.uid,
      };
      if (_params.uid) {
        getNewCoupon(_params).then((res) => {
          console.log(res);
          this.couponAll = res.code == 200 ? res.data : {};
          document.title = this.couponAll.title;
          this.getListTabData(this.active); //获取三个品牌的优惠卷，初始获取第一个tab的
          console.log("active_time:", this.active_time);
          this.getNowDateCouponData(this.active_time); //限时秒杀 1
          this.couponAll.todayTimeAxisList.map((item,index)=> {
            if(item.state === 1) that.active_time = index;
          })
        });
      } else {
        this.getListTabData(this.active); //获取三个品牌的优惠卷，初始获取第一个tab的
        this.$router.push({
          path: "/login",
        });
      }
    },

    //获取已领取的优惠卷
    getHasCoupon(id) {
      let _params = {
        couponActivityId: id,
      };
      getHasCoupon(_params).then((res) => {
        // console.log(res);
        this.couponBag = res.code == 200 ? res.data.list : [];
      });
    },

    //获取限时秒杀数据 2
    getNowDateCouponData(position) {
      console.log("position", position);
      let _params = {
        uid: this.queryObj.uid,
        seckillId: this.couponAll.todayTimeAxisList[position].id,
      };
      getNowDateCoupon(_params).then((res) => {
        this.timeCouponList = res.code = 200 ? res.data : [];
      });
    },

    changeTab_time(index) {
      console.log("changeTab_time", index);
      this.getNowDateCouponData(index); // 3
    },

    //切换tab 自营\拼多多
    changeTab_big(name, title) {
      // console.log(name, title);
      this.getListTabData(name); //获取两个品牌的优惠卷，初始获取第一个tab的
    },

    //获取自营\拼多多 优惠卷
    getListTabData(every) {
      console.log("优惠券");
      // this.bigCouponList = [];
      let _params;
      if (every == 0) {
        _params = {
          channelId: this.couponAll.channelTypeList[every].channelId,
          mid: this.queryObj.uid ? this.queryObj.uid : 0, // 默认为0
        };
        getYTCoupon(_params).then((res) => {
          this.bigCouponList = res.code == 200 ? res.data : [];
          // this.bigCouponList[0].couponState = 2;
          // this.bigCouponList[1].couponState = 2;
        });
      } else {
        _params = {
          channelId: this.couponAll.channelTypeList[every].channelId,
        };
        getCPSCoupon(_params).then((res) => {
          this.bigCouponList = res.code == 200 ? res.data : [];
        });
      }
    },

    //打开卷包
    openCouponList(couponId) {
      console.log("调用了");
      let _params = {
        couponActivityId: couponId,
        uid: this.queryObj.uid,
      };
      getCouponBag(_params).then((res) => {
        // console.log(res);
        Toast(res.msg);
        if (res.code == 200) {
          this.showOverlay = true;
          this.getHasCoupon(_params.couponActivityId); //打开卷包
        }
      });
    },

    //判断访问终端
    returnTerminal() {
      let env = this.GetUrlParam("env");
      this.env_rn = env == 99 ? 99 : 0;
    },

    // 获取url后缀
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

    // 获取 URL
    URLHandle() {
      var url = document.location.toString();
      console.log(url);
      if (url.indexOf("uid") !== -1) {
        var arrObj = url.split("?");
        if (arrObj.length > 1) {
          var arrPara = arrObj[1].split("&");
          console.log(arrPara);
          var queryObj = {};
          for (var i = 0; i < arrPara.length; i++) {
            let temp = arrPara[i].split("=");
            queryObj[temp[0]] = temp[1];
          }
          this.queryObj = queryObj;
          console.log("从url中获取", this.queryObj);
        }
      } else {
        this.queryObj = {
          uid: localStorage.getItem("uid"),
        };
        console.log("从本地获取:", this.queryObj);
      }
    },
    onClickDisabled(name, title) {
      Toast("活动已结束");
    },
    // 生活券包
    RNHandle(val) {
      console.log("---->", val);
      axios({
        url: "https://web.yuetao.group/app/third/authOperateForMobileWeb",
        method: "post",
        data: {
          uid: this.queryObj.uid,
          dbredirect: val.jumpLink,
        },
      }).then((res) => {
        if (res.data.code == 200) {
          window.location.href = res.data.data.url;
        } else {
          Toast(res.data.msg);
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  padding-bottom: 20px;
  background-color: #f3f3f3;
}

.bannerBox {
  width: 375px;
  height: 155px;
  //background-color: black;
  position: relative;

  .bannerBack {
    width: 100%;
    height: 110px;
    background-color: #e33f44;
  }

  .bannerMain {
    width: 355px;
    height: 130px;
    //background-color: beige;
    border-radius: 7px;
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translate(-50%, 0);

    /deep/ .van-swipe {
      height: 100%;
      width: 355px;
    }
  }
}

.topBannerBox {
  width: 355px;
  height: 130px;
  background-size: 106% 100%;
  background-repeat: no-repeat;
  background-position: center;
  //background-color:black;
  border-radius: 7px;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;

  .bannerCoupon {
    width: 110px;
    height: 50px;
    //background-color: black;
    margin-bottom: 7px;
    position: relative;

    img {
      width: 110px;
      height: 50px;
    }

    .couponDetail {
      width: 110px;
      height: 50px;
      position: absolute;
      top: 0;
      left: 0;
      //background-color: chartreuse;
      .hasGetIcon {
        width: 32.5px;
        height: 22.5px;
        position: absolute;
        top: 0;
        left: 50px;
        z-index: 10;
      }
      p {
        position: absolute;
        text-align: center;
        font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      }

      .couponDetail_count {
        width: 86px;
        font-size: 14px;
        font-weight: 900;
        top: 2px;
        min-height: 18px;
        color: #e33f44;
        //background-color: black;
        position: relative;
        z-index: 100;
        font-family: Avenir, Helvetica, Arial, sans-serif;
      }

      .couponDetail_can {
        width: 86px;
        top: 18px;
        min-height: 13px;
        font-size: 11px;
        font-weight: 700;
        padding: 0 5px;
        text-align: center;
        color: #e33f44;
        position: relative;
        z-index: 100;
        top: 0px;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        //background-color: black;
      }

      .couponUseText {
        width: 86px;
        top: 33px;
        min-height: 13px;
        font-size: 9px;
        font-weight: 500;
        color: #999;
        padding-left: 5px;
        text-align: left;
        //background-color: red;
      }

      .line_color {
        width: 1px;
        height: 44px;
        position: absolute;
        border-right: 1px dashed #e33f44;
        top: 3px;
        left: 87.5px;
      }

      .controlCss {
        position: absolute;
        left: 89px;
        top: 0px;
        font-size: 10px;
        font-weight: 600;
        color: #e33f44;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 22px;
        height: 51px;
        writing-mode: tb-rl;
      }
      .use_cc2 {
        background: url(../../assets/images/gl2.png);
        background-repeat: no-repeat;
        background-position-y: 0px;
        background-size: 100%;
      }
      .use_cc1 {
        background: url(../../assets/images/gl1.png);
        background-repeat: no-repeat;
        background-position-y: 0px;
        background-size: 100%;
      }
    }
  }
}

.twoCouponBox {
  margin: 0 10px 10px 10px;
  width: 355px;
  height: 60px;
  //background-color: darkgoldenrod;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;

  ._act {
    //background-color: black;
    width: 174px;
    height: 60px;
    border-radius: 7px;
    position: relative;
    background: linear-gradient(to right, #f2872a, #fae293);

    .act_text {
      color: #fff;
      position: absolute;
      top: 12px;
      left: 20px;
      text-align: left;

      p:first-child {
        font-size: 15px;
        font-weight: 500;
      }

      p:last-child {
        font-size: 11px;
        margin-top: 7px;
      }
    }

    .act_img {
      width: 45px;
      height: 45px;
      position: absolute;
      top: 8px;
      right: 14px;

      img {
        width: 45px;
        height: 45px;
      }
    }
  }

  ._act:last-child {
    //background: linear-gradient(to right, #F43F3B, #F1A5AB);
  }

  ._actBackImg {
    //background-image: url("../../assets/images/newCouponOpenBack.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 174px;
    height: 60px;
  }
}

.timeBox {
  width: 355px;
  height: 44px;
  //background-color: darkgoldenrod;
  margin: 0 10px;

  .timeTop {
    width: 355px;
    height: 44px;
    background-color: #f8f8f7;
    border-radius: 7px 7px 0 0;
    position: relative;

    img {
      width: 33px;
      height: 32px;
      //margin: 5px 11px 0 10px;
      position: absolute;
      top: 5px;
      left: 10px;
    }

    .timeMain {
      position: absolute;
      right: 0;
      top: 0;
      width: 301px;
      height: 44px;
      background-color: #f8f8f7;
      border-radius: 7px 7px 0 0;

      /deep/ .van-tabs__line {
        display: none;
      }

      /deep/ .van-tabs__nav {
        padding: 0;
        border-radius: 7px 7px 0 0;
        background-color: #f8f8f7;
      }

      /deep/ .van-tab {
        width: 77px;
        padding: 0;
        border-radius: 7px 7px 0 0;
        background-color: #f8f8f7;
      }

      /deep/ .van-tab--active {
        border-radius: 7px 7px 0 0;
        background-color: #ffffff;
      }

      ///deep/ .van-tab__pane{
      //  overflow-x: auto;
      //}

      ///deep/ .van-tabs__content {
      //  position: absolute;
      //  left: -54px;
      //  width: 355px;
      //  height: 106px;
      //  overflow: scroll;
      //}
      //
      ///deep/ .van-tab__pane {
      //  width: 355px;
      //  padding-left: 8px;
      //  height: 106px;
      //  overflow-x: auto;
      //  display: flex;
      //  flex-direction: row;
      //  flex-wrap: nowrap;
      //  align-items: center;
      //  background-color: white;
      //
      //  .everyTimeCoupon:first-child {
      //    margin-left: 7px;
      //  }
      //}
    }
  }
}

.tabTitleBox {
  width: 100%;
  height: 39px;
  background-color: #fff;
  margin: 10px 0;

  .tabTop {
    width: 100%;
    height: 34px;

    /deep/ .van-tabs {
      height: 34px;
    }

    /deep/ .van-tabs__wrap {
      height: 34px;
    }
  }

  .tabBottom {
    width: 100%;
    height: 41px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .typeEvery {
      width: 65px;
      height: 21px;
      line-height: 21px;
      background-color: #f9eeee;
      border-radius: 11px;
      font-size: 11px;
      color: #666666;
      position: relative;

      .typeName {
        position: absolute;
        top: 1.5px;
        left: 15px;
      }

      img {
        width: 7px;
        height: 5px;
      }

      .upImg {
        position: absolute;
        top: 5px;
        right: 13px;
      }

      .downImg {
        position: absolute;
        bottom: 3px;
        right: 13px;
        height: 6px;
      }
    }
  }
}

.productCouponList {
  width: 355px;
  min-height: 250px;
  //background-color: coral;
  margin: 0 auto 10px auto;

  .everyBigCoupon {
    width: 355px;
    height: 125px;
    margin-bottom: 6px;

    .typeBox {
      width: 355px;
      height: 125px;
      position: relative;

      .noUseBackImg {
        width: 355px;
        height: 125px;
      }

      .couponName {
        width: 225px;
        //height: 20px;
        //background-color: black;
        font-size: 14px;
        font-family: PingFang SC Semibold, PingFang SC Semibold-Semibold;
        font-weight: 600;
        text-align: left;
        color: #333333;
        position: absolute;
        left: 15px;
        top: 12px;
      }

      .coupon_img_hasGet {
        position: absolute;
        top: 3px;
        right: 3px;
        width: 52px;
        height: 36px;
        z-index: 0;
      }

      .threeImg {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 245px;
        height: 93px;
        //background-color: black;
        display: flex;
        justify-content: space-around;
        align-items: flex-start;

        .threeImg_box {
          width: 60px;
          height: 60px;

          .goodsImg {
            width: 60px;
            height: 60px;
          }

          .goodsName {
            width: 65px;
            margin-top: 3px;
            font-size: 10px;
            font-family: PingFang SC Regular, PingFang SC Regular-Regular;
            font-weight: 400;
            text-align: left;
            color: #333333;
          }
        }
      }

      .priceBox {
        position: absolute;
        top: 22px;
        left: 256px;
        width: 98px;
        //background-color: black;
        text-align: center;
        z-index: 1;

        span:first-child {
          font-size: 15px;
          font-family: PingFang SC Medium, PingFang SC Medium-Medium;
          font-weight: 500;
          color: #e33f44;
        }

        span:last-child {
          font-size: 24px;
          font-family: PingFang SC Semibold, PingFang SC Semibold-Semibold;
          font-weight: 600;
          color: #e33f44;
        }
      }

      .remainBox {
        position: absolute;
        top: 52px;
        left: 256px;
        width: 98px;
        //background-color: black;
        text-align: center;
        font-size: 16px;
        font-family: PingFang SC Regular, PingFang SC Regular-Regular;
        font-weight: 400;
        color: #e33f44;
      }

      .controlBox_0 {
        //立即领取
        position: absolute;
        bottom: 15px;
        right: 15px;
        width: 70px;
        height: 26px;
        line-height: 25px;
        font-size: 12px;
        color: #fff;
        background-color: #e33f44;
        border-radius: 20px;
      }

      .controlBox_1 {
        //已过期、已使用
        position: absolute;
        bottom: 15px;
        right: 15px;
        width: 70px;
        height: 26px;
        line-height: 28px;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.2);
        //border: 1px solid #e33f44;
        //background-color: #e33f44;
        //border-radius: 20px;
      }

      .controlBox_2 {
        //去使用
        position: absolute;
        bottom: 15px;
        right: 15px;
        width: 70px;
        height: 26px;
        line-height: 25px;
        font-size: 12px;
        color: #e33f44;
        border: 1px solid #e33f44;
        //background-color: #e33f44;
        border-radius: 20px;
      }

      //单品类

      .line_left {
        width: 1px;
        height: 98px;
        position: absolute;
        left: 124px;
        top: 50%;
        transform: translate(0, -50%);
        border-right: 1px dashed #e7e7e7;
      }

      .one_img {
        width: 85px;
        height: 85px;
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translate(0, -50%);
      }

      .oneProduct_name {
        position: absolute;
        top: 20px;
        left: 140px;
        width: 202px;
        //background-color: red;
        font-size: 14px;
        font-family: PingFang SC Semibold, PingFang SC Semibold-Semibold;
        font-weight: 600;
        text-align: left;
        color: #333333;
        z-index: 1;
      }

      .oneProduct_remind {
        position: absolute;
        top: 42px;
        left: 140px;
        width: 202px;
        //background-color: red;
        font-size: 12px;
        font-family: PingFang SC Regular, PingFang SC Regular-Regular;
        font-weight: 400;
        text-align: left;
        color: #666666;
      }

      .line_row {
        position: absolute;
        top: 62px;
        left: 140px;
        width: 213px;
        height: 1px;
        border-bottom: 1px solid #e7e7e7;
      }

      .onePrice {
        top: 82px;
        left: 140px;
        width: 98px;
        text-align: left;
        //span:first-child {
        //  font-size: 15px;
        //  font-family: PingFang SC Medium, PingFang SC Medium-Medium;
        //  font-weight: 500;
        //  color: #e33f44;
        //}
        //span:last-child {
        //  font-size: 24px;
        //  font-family: PingFang SC Semibold, PingFang SC Semibold-Semibold;
        //  font-weight: 600;
        //  color: #e33f44;
        //}
      }

      .oneControl {
        position: absolute;
        bottom: 16px;
        right: 15px;
        //z-index: 10;
      }

      .one_HasGet {
        top: 0px;
        right: 3px;
        //z-index: 9;
      }

      .pddBox {
        width: 100%;
        height: 100%;
        background-color: white;
        border-radius: 6px;
        text-align: left;
        position: relative;

        .pddImg {
          width: 101px;
          height: 101px;
          margin: 12px 0 0 12px;
        }

        .pddGoodsName {
          position: absolute;
          top: 12px;
          left: 125px;
          width: 218px;
          //background-color: darkgoldenrod;
          font-size: 14px;
          font-family: PingFang SC Semibold, PingFang SC Semibold-Semibold;
          font-weight: 600;
          text-align: left;
          color: #333333;
        }

        .pddGoodsCoupon {
          position: absolute;
          top: 53px;
          left: 125px;
          background: url("../../assets/images/yhj.png") no-repeat;
          background-size: 88px 22px;
          min-width: 88px;
          height: 22px;
          text-align: center;
          line-height: 22px;
          font-size: 12px;
          color: #ed2e2e;
        }

        .getPddCoupon {
          position: absolute;
          bottom: 12px;
          left: 125px;
          width: 75px;
          height: 26px;
          line-height: 28px;
          font-size: 12px;
          color: #fff;
          text-align: center;
          background-color: #e33f44;
          border-radius: 20px;
        }
      }
    }
  }
}

.outBox {
  margin: 0 10px;
  width: 355px;
  height: 106px;
  overflow-x: scroll;
  background-color: white;

  .contentCouponBox {
    min-width: 355px;
    display: flex;
    flex-wrap: nowrap;

    .everyTimeCoupon {
      width: 144px;
      height: 84px;
      //background-color: violet;
      margin: 11px 0 0 6px;
      position: relative;

      img {
        width: 144px;
        height: 84px;
      }

      .couponDetail {
        position: absolute;
        width: 144px;
        height: 84px;
        top: 0;
        left: 0;

        p {
          position: absolute;
          //width: 90px;
          text-align: center;
          //background-color: darkmagenta;
          font-family: PingFang SC Medium, PingFang SC Medium-Medium;
        }

        .couponDetail_count {
          width: 113px;
          font-size: 20px;
          font-weight: 900;
          top: 12px;
          min-height: 18px;
          font-family: Avenir, Helvetica, Arial, sans-serif;
          //background-color: darkmagenta;
        }

        .couponDetail_can {
          width: 113px;
          top: 38px;
          min-height: 13px;
          font-size: 10px;
          //background-color: black;
          font-weight: 500;
          padding: 0 5px;
          color: #999999;
        }

        .couponUseText {
          width: 113px;
          top: 55px;
          min-height: 18px;
          font-size: 9px;
          font-weight: 500;
          color: #999999;
          padding: 0 2px;
          //background-color: red;
        }

        .line_color {
          width: 1px;
          height: 64px;
          position: absolute;
          top: 10px;
          margin-left: 113.5px;
        }

        .controlCss {
          width: 15px !important;
          text-align: center;
          position: absolute;
          //right: 12px;
          margin-left: 120px;
          top: 50%;
          transform: translate(0, -50%);
          font-size: 13px;
          font-weight: 400;
          //background-color: black;
        }
      }
    }
  }
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  //width: 289px;
  //height: 376px;
}

.wrapperBox {
  background-image: url("../../assets/images/newCouponOpenBack.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 289px;
  height: 418px;

  //background-color: #fff;
  position: relative;

  .closeBtn {
    width: 36px;
    height: 36px;
    position: absolute;
    bottom: -55px;
    left: 50%;
    transform: translate(-50%, 0);
  }

  .couponListBoxOut {
    width: 289px;
    height: 303px;
    //background-color: black;
    overflow-y: auto;
    margin-top: 115px;
  }

  .couponListBox {
    width: 272px;
    height: 95px;
    margin: 0 auto 6px auto;
    position: relative;

    .backImg {
      width: 272px;
      height: 95px;
    }

    .proImg {
      width: 65px;
      height: 65px;
      position: absolute;
      top: 15px;
      left: 15px;
    }

    .line_middle {
      width: 1px;
      height: 80px;
      border-right: 1px dashed #e7e7e7;
      position: absolute;
      top: 50%;
      left: 94.5px;
      transform: translate(0, -50%);
    }

    .couponName {
      width: 156px;
      //background-color: black;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
      text-align: left;
      color: #333333;
      position: absolute;
      top: 10px;
      left: 105px;
    }

    .couponRemain {
      width: 156px;
      //background-color: darkmagenta;
      font-size: 11px;
      font-family: PingFang SC Regular, PingFang SC Regular-Regular;
      font-weight: 400;
      text-align: left;
      color: #666666;
      position: absolute;
      top: 33px;
      left: 105px;
    }

    .line_last {
      width: 166px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      position: absolute;
      top: 50px;
      left: 105px;
    }

    .coupon_price {
      position: absolute;
      top: 65px;
      left: 105px;

      span:first-child {
        font-size: 12px;
        color: #e33f44;
        font-family: PingFang SC Semibold, PingFang SC Semibold-Semibold;
      }

      span:last-child {
        color: #e33f44;
        font-size: 19px;
        font-family: PingFang SC Semibold, PingFang SC Semibold-Semibold;
        font-weight: 600;
      }
    }

    .coupon_img {
      width: 52px;
      height: 36px;
      position: absolute;
      top: 51px;
      left: 207px;
    }
  }
}
</style>