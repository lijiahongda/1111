<template>
  <div class="placeOder_content">
    <!-- 地址 -->
    <div class="vancard-header" @click="goAddress()">
      <div class="vancard-first">
        <span
          style="margin-right: 20px;"
          v-if="addresslist.receiverName"
        >{{addresslist.receiverName}}</span>
        <span style="margin-right: 20px;" v-if="addresslist.name">{{addresslist.name}}</span>
        <span>{{addresslist.mobile}}</span>
      </div>
      <div class="vancard-second">
        <van-tag plain type="danger">默认</van-tag>
        <span
          style="margin-left:10px;"
        >{{addresslist.proviceName}}{{addresslist.cityName}}{{addresslist.address}}</span>
      </div>
      <div class="vancard-icon">
        <van-icon name="arrow" />
      </div>
    </div>
    <!-- 商品卡片 -->
    <div class="group_xxon">
      <div class="group_box">
        <div class="group_top">
          <div class="group_image">
            <img :src="goodsList.goodsImg" alt />
          </div>
          <div class="group_detail">
            <div class="group_detail_title">{{goodsList.goodsName}}</div>
            <div class="group_detail_txt">{{goodsList.skuText}}</div>
            <div class="group_detail_txt">¥{{goodsList.goodsPrice}}</div>
            <div class="group_detail_lay">¥{{goodsList.goodsVipPrice}}</div>
            <div class="group_detail_buynum">
              <!-- <van-stepper v-model="items.goodNum" /> -->
              x{{goodsList.goodsNum}}
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
        共{{goodsList.goodsNum}}件,小计
        <span
          style="color:red;font-size:18px;font-weight:600;"
        >¥{{blanceInfolist.totalPrice}}</span>元
      </div>
    </div>
    <!-- 菜单选项 -->
    <van-cell-group style="text-align:left;margin:10px auto;">
      <van-cell title="商品金额" :value='"¥"+blanceInfolist.goodsTotalprice' />
      <van-cell title="运费" :value='"¥"+blanceInfolist.goodsFreight' />
      <van-cell title="悦豆" is-link value="无可用" />
      <!-- 优惠券单元格 -->
      <van-coupon-cell
        :coupons="couponList"
        :chosen-coupon="chosenCoupon"
        @click="showList = true"
      />
    </van-cell-group>
    <!-- <van-cell-group style="text-align:left;">
      <van-cell title="商品金额" value="¥89.00" />
      <van-cell title="运费" value="¥0.00" />
      <van-cell title="优惠券" value="-¥40.00" />
    </van-cell-group>-->
    <!-- 优惠券列表 -->

    <!-- 优惠券列表 -->
    <van-popup v-model="showList" round position="bottom" style="height: 90%; padding-top: 4px;">
      <van-coupon-list
        :coupons="couponList"
        :chosen-coupon="chosenCoupon"
        :show-exchange-bar="false"
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
const coupon = {
  available: 1,
  condition: "无使用门槛\n最多优惠12元",
  reason: "",
  value: 150,
  name: "优惠券名称",
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: "1.5",
  unitDesc: "元",
};
import {
  flashBalanceNew,
  createFlashOrderNew,
  newMallPayV4,
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
      codeNumber:"",
      room_id: "",
      live_people_id:"",
      live_id:"",
      productNum: "",
      addressIds: "",
      activityId: "",
      Uid: "",
      openId: "",
      // 下单数据
      blanceInfolist: {
        goodsTotalprice:0,
        goodsFreight:0
      }, //下单集合
      addresslist: "", //收货地址
      goodsList: "", //商品列表
      Cid: "", //优惠券id
      isDisabledSubmitBtn: false,
      ordersn: "",
      banCprice: 0,
      initPrice: 0, //初始价格
      wwwwshow: false,
    };
  },
  created() {
    let _self = this;
    _self.productId = this.$route.query.product_id;
    _self.productSkuId = this.$route.query.product_sku_id;
    _self.room_id = this.$route.query.room_id;
    _self.codeNumber=this.$route.query.codeNumber;
     _self.live_people_id = this.$route.query.live_people_id;
    _self.live_id = this.$route.query.live_id?this.$route.query.live_id:"";
    _self.addressIds = this.$route.query.addressIds;
    _self.productNum = this.$route.query.productNum;
    _self.activityId = this.$route.query.activityId;
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
        goodsId: _self.productId,
        skuId: _self.productSkuId,
        room_id: _self.room_id,
        uid: _self.Uid,
        goodsNum: _self.productNum,
        activityId: _self.activityId,
        areaId: _self.addressIds,
      };
      flashBalanceNew(params).then((res) => {
        if (res.code == 200) {
          if (window.localStorage.getItem("addressItem")) {
            let ads_data = JSON.parse(
              window.localStorage.getItem("addressItem")
            );
            _self.addresslist = ads_data;
          } else {
            _self.addresslist = res.data.areaInfo;
          }
          _self.goodsList = res.data.productInfo;
          _self.blanceInfolist = res.data;
          _self.banCprice = (res.data.totalPrice + res.data.goodsFreight) * 100;
          _self.initPrice = (res.data.totalPrice + res.data.goodsFreight) * 100;
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
        goodsId: _self.productId,
        uid: _self.Uid,
        skuId: _self.productSkuId,
        room_id: _self.room_id,
        codeNumber:_self.codeNumber?self.codeNumber:"",
        live_people_id:_self.live_people_id?_self.live_people_id:"",
        live_id:_self.live_id?_self.live_id:"",
        goodsNum: _self.productNum,
        activityId: _self.activityId,
        areaId: _self.addressIds,
        cid: _self.Cid,
        version: 2,
        type: 1,
        orderFrom: _orderFrom,
        isHadBalance: 1,
        position_from: 0,
      };
      createFlashOrderNew(params).then((res) => {
        console.log(res);
        if (res.code == 200) {
          let _data = {
            ordersn: res.ordersn,
            type: 147,
            openId: _self.openId,
            returnUrl: "https://web.yuetao.group/odersky?odersn=" + res.ordersn,
          };
          newMallPayV4(_data).then((res) => {
            if (res.code == 200) {
              _self.ordersn = res.ordersn;
              let params = res.pay.getwayUrl;
              window.location.replace(params);
              // _self.$router.replace(params);
              // let params = res.pay.getwayBody
              // _self.weixinPay(params)
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

    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
      let couponInfo = this.couponList[index];
      this.banCprice = couponInfo
        ? this.initPrice - couponInfo.value
        : this.initPrice;
      this.Cid = couponInfo ? couponInfo.Cid : "";
    },
    //选地址
    goAddress() {
      this.$router.push({ path: "/addressList" });
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
}
//强改
/deep/ .van-nav-bar {
  .van-icon {
    color: #000;
  }
}
/deep/ .van-cell__value {
  color: red;
}
</style>