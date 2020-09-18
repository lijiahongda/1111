<template>
  <div class="placeOder_content">
    <!-- 地址 -->
    <div class="vancard-header" @click="goAddress()">
      <div class="vancard-first">
        <span style="margin-right: 20px;" v-if="addresslist.receiver_name">{{addresslist.receiver_name}}</span>
        <span style="margin-right: 20px;" v-if="addresslist.name">{{addresslist.name}}</span>
        <span>{{addresslist.mobile}}</span>
      </div>
      <div class="vancard-second">
        <van-tag plain type="danger">默认</van-tag>
        <span
          style="margin-left:10px;"
        >{{addresslist.province_name}}{{addresslist.city_name}}{{addresslist.address}}</span>
      </div>
      <div class="vancard-icon">
        <van-icon name="arrow" />
      </div>
    </div>
    <!-- 商品卡片 -->
    <div class="group_xxon" v-for="item in goodsList" :key="item.supplierId">
      <div class="group_xxon_title">
        <p class="img">
          <img :src="item.imgIcon" alt />
        </p>
        <p class="name">{{item.name}}</p>
      </div>
      <div class="group_box" v-for="items in item.data" :key="items.goodId">
        <div class="group_top">
          <div class="group_image">
            <img :src="items.goodCover" alt />
          </div>
          <div class="group_detail">
            <div class="group_detail_title">{{items.goodName}}</div>
            <div class="group_detail_txt">{{items.goodSpec}}</div>
            <div class="group_detail_lay">¥{{items.goodPrice}}</div>
            <div class="group_detail_buynum">
              <!-- <van-stepper v-model="items.goodNum" /> -->
              x{{items.goodNum}}
            </div>
          </div>
        </div>
        <div class="group_bottom">
          <span>赠品</span>
          <span>成长值*10</span>
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="group_total">
        共{{item.allCount}}件,小计
        <span
          style="color:red;font-size:18px;font-weight:600;"
        >¥{{item.allMoney}}</span>元
      </div>
    </div>
    <!-- 菜单选项 -->
    <van-cell-group style="text-align:left;margin:10px auto;">
      <van-cell title="商品金额" :value='"¥"+blanceInfolist.totelPrice' />
      <van-cell title="运费" :value='"¥"+blanceInfolist.totalFreight' />
      <van-cell title="悦豆" is-link value="无可用" />
      <van-cell
        v-if="blanceInfolist.isFreeGoods==1"
        :title="blanceInfolist.freightMsg"
        is-link
        url="/couoderlist"
        value="去凑单"
      />
      <!-- 优惠券单元格 -->
      <van-coupon-cell
        :coupons="couponList"
        :chosen-coupon="chosenCoupon"
        @click="showList = true"
      />
    </van-cell-group>

    <!-- 优惠券列表 -->
    <van-popup v-model="showList" round position="bottom" style="height: 90%; padding-top: 4px;">
      <van-coupon-list
        :coupons="couponList"
        :chosen-coupon="chosenCoupon"
        :show-exchange-bar="false"
        :disabled-coupons="disabledCoupons"
        @change="onChange"
      />
    </van-popup>

    <!-- 支付方式 -->
    <div class="pay_boxtype">
      <p class="pay_title">支付方式</p>
      <van-radio-group v-model="radio">
        <van-cell-group>
          <van-cell title="微信支付">
            <template #right-icon>
              <van-radio checked-color="#07c160" name="1" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
    <!-- 白拿红包弹窗 -->
    <van-popup v-model="wwwwshow">
      <div class="popRedbg">
        <div class="popRedbg_btn" @click="goCounalist()"></div>
      </div>
    </van-popup>
    <!-- 提交拦 -->
    <van-submit-bar
      :price="banCprice"
      :loading="isDisabledSubmitBtn"
      button-text="提交订单"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import Vue from "vue";
import {
  SubmitBar,
  Toast,
  CellGroup,
  Cell,
  Tag,
  Icon,
  Stepper,
  Radio,
  RadioGroup,
  CouponCell,
  CouponList,
  Popup,
} from "vant";
Vue.use(SubmitBar);
Vue.use(Toast);
Vue.use(CellGroup);
Vue.use(Cell);
Vue.use(Tag);
Vue.use(Icon);
Vue.use(Stepper);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(CouponCell);
Vue.use(CouponList);
Vue.use(Popup);

import {
  getProuctBlanceInfoV4,
  createOrderByProductV4,
  newMallPayV4,
  ShopcreateV4,
} from "../../services/userApi";
export default {
  data() {
    return {
      radio: "1",
      chosenContactId: 0,
      value: 1,

      chosenCoupon: -1,
      showList: false,
      couponList: [], //优惠券列表
      disabledCoupons: [], //不可用优惠卷
      Cid: "", //优惠券id

      //订单数据
      productId: "",
      productSkuId: "",
      room_id: "",
      codeNumber:"",
      live_people_id:"",
      live_id:"",
      productType: "",
      productNum: "",
      addressType: "",
      addressIds: "",
      areaId: "",
      Uid: "",
      openId: "",
      freightType: "",
      // 下单数据
      blanceInfolist: {
        totelPrice:0,
        totalFreight:0
      }, //下单集合
      addresslist: "", //收货地址
      goodsList: "", //商品列表
      isDisabledSubmitBtn: false,
      ordersn: "",
      banCprice: 0,
      initPrice: 0, //初始价格
      wwwwshow: false,
    };
  },
  created() {
    let _self = this;
    _self.productId = this.$route.query.productId;
    _self.productSkuId = this.$route.query.product_sku_id;
    _self.room_id = this.$route.query.roomId;
    _self.codeNumber=this.$route.query.codeNumber
    _self.live_people_id = this.$route.query.live_people_id;
    _self.live_id = this.$route.query.live_id?this.$route.query.live_id:"";
    _self.productType = this.$route.query.productType;
    _self.addressIds = this.$route.query.addressIds;
    _self.addressType = this.$route.query.addressType;
    _self.productNum = this.$route.query.productNum;
    _self.areaId = this.$route.query.areaId;
    _self.freightType = this.$route.query.freightType;
    _self.Uid = localStorage.getItem("uid");
    _self.openId = localStorage.getItem("openid");
  },
  computed: {
    cardType() {
      return this.chosenContactId !== null ? "edit" : "add";
    },
    currentContact() {
      const id = this.chosenContactId;
      return id !== null ? this.list.filter((item) => item.id === id)[0] : {};
    },
  },
  mounted() {
    this.getProuctBlanceInfo();
  },
  methods: {
    // 普通商品下单
    getProuctBlanceInfo() {
      let _self = this;
      let params = {
        product_id: _self.productId,
        product_sku_id: _self.productSkuId,
        room_id:_self.room_id,
        uid: _self.Uid,
        productType: _self.productType,
        product_num: _self.productNum,
        addressIds: _self.areaId,
        addressType: _self.addressType,
        areaId: _self.addressIds,
        freightType: 1,
      };
      getProuctBlanceInfoV4(params).then((res) => {
        if (res.code == 200) {
          if(window.localStorage.getItem('addressItem')){
          let ads_data = JSON.parse(window.localStorage.getItem('addressItem'));
          _self.addresslist = ads_data;
          }else{
          _self.addresslist = res.data.address;
          }
          _self.goodsList = res.data.newGoodsList;
          _self.blanceInfolist = res.data;
          _self.wwwwshow = res.data.isFreeGoods == 1 ? true : false;
          _self.banCprice = (res.data.totelPrice + res.data.totalFreight) * 100;
          _self.initPrice = (res.data.totelPrice + res.data.totalFreight) * 100;
          _self.couponList = [];
          res.data.coupon &&
            res.data.coupon.forEach((ele, index) => {
              _self.couponList.push({
                available: index,
                condition: "无使用门槛\n最多优惠" + ele.amount + "元",
                reason: "",
                value: ele.amount * 100,
                name: ele.couponName,
                startAt: new Date() / 1000,
                endAt:
                  new Date(ele.endtime.replace(/-/g, "/")).getTime() / 1000,
                valueDesc: ele.amount,
                unitDesc: "元",
                Cid: ele.couponId,
              });
            });
        } else {
          Toast(res.msg);
          _self.$router.go(-1);
        }
      });
    },
    // 普通商品下单
    createOrderByProduct() {
      let _self = this;
      let _orderFrom = 1;
      if(_self.live_id!=""){
         _orderFrom = 12;
      }
      let params = {
        position_from: 1,
        product_id: _self.productId,
        uid: _self.Uid,
        product_sku_id: _self.productSkuId,
        room_id:_self.room_id?_self.room_id:"",
        codeNumber:_self.codeNumber?self.codeNumber:"",
        live_people_id:_self.live_people_id?_self.live_people_id:"",
        live_id:_self.live_id?_self.live_id:"",
        productType: _self.productType,
        product_num: _self.productNum,
        addressIds: _self.areaId,
        addressType: _self.addressType,
        areaId: _self.addressIds,
        cid: _self.Cid,
        type: 1,
        orderFrom: _orderFrom,
        isHadBalance: 1,
        freightType: 1,
      };
      createOrderByProductV4(params).then((res) => {
        if (res.code == 200) {
          let _data = {
            ordersn: res.ordersn,
            type: 147,
            openId: _self.openId,
            returnUrl: "https://web.yuetao.group/odersky?odersn=" + res.ordersn,
          };
          newMallPayV4(_data).then((res) => {
            if (res.code == 200) {
              let params = res.pay.getwayUrl;
              window.location.replace(params);
            } else {
              Toast(res.msg);
            }
          });
        } else {
          Toast(res.msg);
        }
      });
    },
    //提交订单
    onSubmit() {
      let _self = this;
      _self.isDisabledSubmitBtn = true;
      _self.createOrderByProduct();
    },
    // 白拿凑单红包
    goCounalist() {
      let _self = this;
      let params = {
        uid: _self.Uid,
        position_from: 0,
        product_id: _self.productId,
        product_sku_id: _self.productSkuId,
        product_num: 1,
        isCollage: 0,
      };
      ShopcreateV4(params).then((res) => {
        if (res.status == 200) {
          _self.$router.push({ path: "/couoderlist" });
        } else {
          Toast(res.msg);
          _self.wwwwshow = false;
        }
      });
    },
    // 优惠券选择
    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
      let couponInfo = this.couponList[index];
      this.banCprice = couponInfo
        ? this.initPrice - couponInfo.value
        : this.initPrice;
      this.Cid = couponInfo ? couponInfo.Cid : "";
    },

    // 返回上一级
    onClickLeft: function () {
      this.$router.back(-1);
    },
    //选地址
    goAddress() {
      this.$router.push({ path: "/addressList" });
    },
    locationReplace(url) {
      if (history.replaceState) {
        history.replaceState(null, document.title, url);
        history.go(0);
      } else {
        location.replace(url);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.placeOder_content {
  width: 100%;
  height: auto;
  overflow: auto;
  background: #f6f6f6;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .vancard-header {
    width: 100%;
    overflow: auto;
    position: relative;
    line-height: 35px;
    background: #ffffff;
    padding-top: 20px;
    .vancard-first {
      color: #000;
      font-size: 14px;
      font-weight: 600;
      text-align: left;
      margin-left: 35px;
    }
    .vancard-second {
      text-align: left;
      margin-left: 30px;
      margin-bottom: 10px;
      width: 70%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .vancard-icon {
      position: absolute;
      right: 20px;
      top: 30px;
      font-size: 18px;
    }
  }
  .vancard-header::before {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 0.05333rem;
    background: -webkit-repeating-linear-gradient(
      135deg,
      #ff6c6c 0,
      #ff6c6c 20%,
      transparent 0,
      transparent 25%,
      #1989fa 0,
      #1989fa 45%,
      transparent 0,
      transparent 50%
    );
    background: repeating-linear-gradient(
      -45deg,
      #ff6c6c 0,
      #ff6c6c 20%,
      transparent 0,
      transparent 25%,
      #1989fa 0,
      #1989fa 45%,
      transparent 0,
      transparent 50%
    );
    background-size: 2.13333rem;
    content: "";
  }
  .group_xxon {
    width: 100%;
    height: auto;
    background: #fff;
    padding: 10px 0;
    .group_xxon_title {
      display: flex;
      justify-content: start;
      align-items: center;
      padding-left: 15px;
      padding-top: 10px;
      .img {
        width: 20px;
        height: 20px;
      }
      .name {
        font-size: 18px;
        font-weight: 600;
        color: #000;
        margin-left: 10px;
      }
    }
    .group_box {
      width: 100%;
      height: auto;
      overflow: auto;
      background: #fff;
      .group_top {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 135px;
        overflow: auto;
        .group_image {
          width: 100px;
          height: 100px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .group_detail {
          width: 225px;
          text-align: left;
          font-size: 12px;
          padding-left: 15px;
          position: relative;
          line-height: 20px;
          overflow: auto;
          .group_detail_title {
            color: #333333;
            font-weight: 600;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            font-size: 13px;
            padding: 0 5px;
          }
          .group_detail_txt {
            color: #999999;
            line-height: 20px;
             overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .group_detail_lay {
            color: #ff001b;
            font-size: 13px;
            font-weight: 600;
            // margin-top: 30px;
          }
          .group_detail_buynum {
            position: absolute;
            bottom: 5px;
            right: 0;
          }
        }
      }
      .group_bottom {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 90%;
        margin: 10px auto;
        background: #e6e6e6;
        font-size: 13px;
        color: #999999;
        padding: 5px 10px;
        border-radius: 5px;
      }
    }
    .group_total {
      text-align: right;
      padding-right: 25px;
      font-size: 15px;
      color: #000;
      line-height: 30px;
    }
  }

  .pay_boxtype {
    text-align: left;
    background: #fff;
    border-bottom: 100px solid #f6f6f6;
    margin-top: 20px;
    .pay_title {
      line-height: 40px;
      padding-left: 15px;
      font-size: 15px;
      font-weight: 600;
    }
  }
  .popRedbg {
    width: 260px;
    height: 350px;
    background: url("https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-07-28/22/yuelvhuiIyhyIQy5qv1595946694.png")
      no-repeat;
    background-size: 100% 100%;
    position: relative;
    .popRedbg_btn {
      width: 150px;
      height: 50px;
      background: url("https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-07-28/22/yuelvhuiyH5Fv3slDO1595946945.png")
        no-repeat;
      background-size: 100% 100%;
      transform: translate(-50%, -50%);
      position: absolute;
      bottom: 5px;
      left: 50%;
    }
  }
}
//强改
/deep/ .van-nav-bar {
  .van-icon {
    color: #000;
  }
}
/deep/ .van-cell__value{
  color: red;
}
</style>