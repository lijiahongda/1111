<template>
  <div>
    <OpenAppHead />
    <div class="btm">
      <div class="le">
        <!-- <div class="icon-box">
                    <img class="icon" src="../../assets/images/go-right.png" />
                    进店
                </div>
                <div class="icon-box">
                    <img class="icon" src="../../assets/images/write.png" />
                    反馈
                </div>
                <div class="icon-box">
                    <img class="icon" src="../../assets/images/share.png" />
                    小程序
        </div>-->
        <div class="icon-box" @click="scrollT">
          <img
            class="icon"
            src="https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-08-28/21/yuelvhuijGFmyj0rRn1598622592.png"
          />
          回到首页
        </div>
        <div
          class="icon-box"
          v-if="goodsStatus == 1 || goodsStatus == 2"
          @click="routerLink('/shopCar')"
        >
          <span class="counts" v-if="goodsInfo.cartTotal > 0">{{goodsInfo.cartTotal}}</span>
          <img class="icon" src="../../assets/images/shop-car.png" />
          购物车
        </div>
      </div>
      <!-- <div class="mi">分享海报</div> -->
      <div class="ri" @click="willBuy" v-if="isSale==1">去购买</div>
      <div class="ri2" v-if="isSale==0">已售罄</div>
    </div>
    <div
      class="mask"
      v-if="$store.state.showSku"
      @click.stop="$store.commit('changeShowSku',false)"
    >
      <div class="sku" @click.stop="$store.commit('changeShowSku',true)">
        <div class="tp">
          <img class="goods-cover" :src="goodsInfo.banner[0]" />
          <div class="goods-price">
            <div class="pris">
              <span class="hjy">会员价</span>
              <span class="spe-icon">¥</span>
              <span class="hjy-count">{{ goodsInfo.goodVipPrice }}</span>
              <span class="gwj">官网价¥{{ goodsInfo.goodPrice }}</span>
            </div>
            <div class="guige">已选：{{txt}}</div>
            <!-- <div class="close" @click="$store.commit('changeShowSku',false)"></div> -->
          </div>
        </div>
        <div class="out">
          <div class="inner">
            <div class="status-box" v-for="(item,index) in goodsInfo.saleList" :key="index">
              <div class="tits">{{item.title}}</div>
              <div class="status">
                <span v-for="(ele,idx) in item.buttons" :key="idx">
                  <span
                    :class="skuids[index][idx] ? 'box act' : 'box'"
                    @click="choseSku(index,idx)"
                  >{{ele.text}}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="num-box">
          <div>数量</div>
          <div class="handles">
            <div class="edge" @click="handleCount(false)">-</div>
            <div class="cou">{{goodsCount}}</div>
            <div class="add" @click="handleCount(true)">+</div>
          </div>
        </div>
        <div class="code-txt">商品编号{{goodsCode}}</div>
        <div class="btn-box" v-if="!this.$store.state.room_id">
          <div class="btn1" @click="addShopCar">加入购物车</div>
          <div class="btn1 btn2" @click="orderPay">立即购买</div>
        </div>
        <div class="btn-box" v-else>
          <div class="btn3" @click="orderPay">立即购买</div>
        </div>
      </div>
    </div>
    <!-- 暂时不需要 -->
    <div class="mask" v-if="false">
      <div class="picture-box">
        <img class="picture" src />
        <div class="btn">保存到手机相册</div>
        <div class="btn" style="background:#FF7800">预览海报长安分享</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Toast } from "vant"; // 提示框

Vue.use(Toast);

import { addShopCar, textData, skuChangeInfo } from "@/services/goods.js";
import OpenAppHead from "../../component/GoodsDetail/openApp";
var timer = null;
export default {
  props: {
    goodsInfo: {
      // 商品详情数据
      type: Object,
      default: {},
    },
    goodsStatus: {
      // 1:自营详情；2:秒杀详情；3:京东详情；4:拼多多详情；5:淘宝详情；6:唯品会详情
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      skuids: [], // 规格选中样式处理
      sign: [], // 选中索引标记
      txt: "", // 选中的文案
      goodsCount: 1, // 选择的数量
      goodsCode: "", // 商品编号
      isSale:1,
    };
  },
  components: {
    OpenAppHead,
  },
  methods: {
    initData() {
      if (this._props.goodsStatus == 1 || this._props.goodsStatus == 2) {
        // 自营和秒杀才会初始化规格数据
        let mk = [];
        this._props.goodsInfo.saleList.forEach((item, index) => {
          mk[index] = [];
          item.buttons.forEach((ele, idx) => {
            idx === 0 ? mk[index].push(true) : mk[index].push(false);
          });
        });
        this.skuids = mk;
        this.handleChose(0);
      }
    },
    scrollT() {
      // // 滑动到顶部
      // timer = setInterval(function() {
      //     let osTop =
      //         document.documentElement.scrollTop ||
      //         document.body.scrollTop;
      //     let ispeed = Math.floor(-osTop / 5);
      //     document.documentElement.scrollTop = document.body.scrollTop =
      //         osTop + ispeed;
      //     // this.isTop = true;
      //     if (osTop === 0) {
      //         clearInterval(timer);
      //     }
      // }, 30);
      this.$router.replace({ path: "/" });
    },
    routerLink(url) {
      // 路由跳转
      this.$router.push(url);
    },
    willBuy() {
      
      // 点击去购买
      if (window.localStorage.getItem("uid")) {
        if (this._props.goodsStatus == 1 || this._props.goodsStatus == 2) {
          // 只有自营详情和秒杀详情，才会显示规格弹窗
          this.$store.commit("changeShowSku", true);
          return;
        }
        window.location.href = this._props.goodsInfo.buy_url;
      } else {
        this.$store.dispatch("loginIntercept", this.$route.query);
      }
    },
    choseSku(index, idxs) {
      // 选择规格
      var mk = [];
      this._props.goodsInfo.saleList[index].buttons.forEach((ele, idx) => {
        idx === idxs ? mk.push(true) : mk.push(false);
      });
      this.$set(this.skuids, index, mk);
      this.handleChose(idxs);
    },
    handleChose(idxs) {
      // 处理选中的规格，显示在‘已选’文案上
      let sign = [];
      this.skuids.forEach((item, index) => {
        item.forEach((ele, idx) => {
          ele ? sign.push(idx) : null;
        });
      });
      this.sign = sign;
      let txt = "";
      sign.forEach((item, index) => {
        txt =
          txt + " " + this._props.goodsInfo.saleList[index].buttons[item].text;
      });
      this.txt = txt;
      // this.goodsCode = this.goodsInfo.saleList[0].buttons[idxs].skuList[this.sign[this.sign.length - 1]] || this.goodsInfo.saleList[0].buttons[idxs].skuList[0]
      this.handleSkuId(); // 处理规格ID
      if (this.$store.state.addressReady) {
        this.skuChangeGoodsInfo(idxs);
      } else {
        setTimeout(() => {
          this.skuChangeGoodsInfo(idxs);
        }, 1000);
      }
    },
    handleSkuId() {
      // 处理规格ID
      let goodsInfo = this._props.goodsInfo;
      let mk1 = [];
      let mk2 = [];
      let mkArr = [];
      for (var i = 0; i < goodsInfo.saleList.length; i++) {
        mkArr = mkArr.concat(
          goodsInfo.saleList[i].buttons[this.sign[i]].skuList
        );
      }
      if (mkArr.length <= 1) {
        mk2 = mkArr;
      } else {
        mkArr.forEach((item, index) => {
          if (mk1.indexOf(item) === -1) {
            mk1.push(item);
          } else {
            mk2.push(item);
          }
        });
      }

      this.goodsCode = mk2[0];
      // console.log(mk2,mk1)
    },
    skuChangeGoodsInfo(idxs) {
      let data = {
        uid: window.localStorage.getItem("uid") || "",
        product_sku_id: this.goodsCode,
        productType: 0,
        liveId: 0,
        addressCode: this.$store.state.addressInfo.areaIds || 0,
        lon: 0,
        lat: 0,
      };
      skuChangeInfo(data).then((res) => {
        if (res.code == 200) {
          this._props.goodsInfo.banner[0] = res.data.img;
          this._props.goodsInfo.goodVipPrice = res.data.vipPrice;
          this._props.goodsInfo.goodPrice = res.data.nowPrice;
          this.isSale = res.data.isSale.saleState;
          console.log(res.data.isSale.saleState)
          this.$store.commit("changeSkuIdx", idxs);
        }
      });
    },
    handleCount(bol) {
      // 减：false 加：true
      if (bol) {
        this.goodsCount++;
      } else {
        if (this.goodsCount == 1) {
          Toast("不能再少了呦");
          return;
        }
        this.goodsCount--;
      }
    },
    addShopCar() {
      // 加入购物车
      if (
        this._props.goodsStatus == 1 &&
        this._props.goodsInfo.levelCantBuy > 0
      ) {
        Toast(this._props.goodsInfo.levelTips);
        return;
      }
      let data = {
        position_from: 0,
        product_id: this._props.goodsInfo.product_id,
        product_sku_id: this.goodsCode,
        uid: window.localStorage.getItem("uid") || "",
        product_num: this.goodsCount,
        joinLocation: "collage",
      };
      addShopCar(data).then((res) => {
        if (res.status == 200) {
          Toast("加入购物车成功");
          if (this._props.goodsStatus == 1 || this._props.goodsStatus == 2) {
            // 刷新购物车数量
            this.$parent.getGoodsDetail();
          }
          this.$store.commit("changeShowSku", false);
          this.goodsCount = 1;
          this.initData();
        }
      });
    },
    orderPay() {
      // 立即购买
      let data = this._props.goodsInfo;
      let addressInfo = this.$store.state.addressInfo;
      if (!addressInfo.addressId) {
        Toast("请先选择收货地址");
        return;
      }
      if (this._props.goodsStatus == 1 && data.levelCantBuy > 0) {
        Toast(data.levelTips);
        return;
      }
      if (
        this._props.goodsStatus == 1 &&
        data.isFree == 1 &&
        data.canSend == 0 &&
        data.isNeedUpgrade == 1
      ) {
        // 白拿商品，等级不够时的提示
        Toast("会员等级不满足，请去升级会员");
        return;
      }
      if (this._props.goodsStatus == 1) {
        // 自营订单
        this.$router.push(
          "/placeOder?productId=" +
            data.product_id +
            "&product_sku_id=" +
            this.goodsCode +
            "&addressIds=" +
            addressInfo.addressId +
            "&areaId=" +
            addressInfo.areaIds +
            "&addressType=0&productType=0&productNum=" +
            this.goodsCount +
            "&goodsId=" +
            data.product_id +
            "&codeNumber=" +
            this.$store.state.codeNumber +
            "&roomId=" +
            this.$store.state.room_id +
            "&live_id=" +
            this.$store.state.live_id +
            "&live_people_id=" +
            this.$store.state.live_people_id
        );
      }
      if (this._props.goodsStatus == 2) {
        // 秒杀订单
        this.$router.push(
          "/placeModer?product_id=" +
            data.product_id +
            "&product_sku_id=" +
            this.goodsCode +
            "&activityId=" +
            this.$route.query.activityId +
            "&productType=0&addressIds=" +
            addressInfo.addressId +
            "&areaId=" +
            addressInfo.areaIds +
            "&productNum=" +
            this.goodsCount +
            "&codeNumber=" +
            this.$store.state.codeNumber +
            "&roomId=" +
            this.$store.state.room_id +
            "&live_id=" +
            this.$store.state.live_id +
            "&live_people_id=" +
            this.$store.state.live_people_id
        );
      }
    },
    configShare() {
      // 配置分享
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) != "micromessenger") {
        return;
      }
      let data = this._props.goodsInfo;
      wx.ready(function () {
        wx.onMenuShareTimeline({
          //分享到朋友圈
          title: data.goodName, // 分享标题
          desc: data.goodsInfo, // 分享描述
          link:
            window.location.href +
            "&codeNumber=" +
            window.localStorage.getItem("recode"), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: data.banner[0], // 分享图标
        });
        wx.onMenuShareAppMessage({
          //分享给朋友
          title: data.goodName, // 分享标题
          desc: data.goodsInfo, // 分享描述
          link:
            window.location.href +
            "&codeNumber=" +
            window.localStorage.getItem("recode"), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: data.banner[0], // 分享图标
        });
      });
    },
  },
  created() {
    // let vm = this;
    // window.onscroll = function() {
    //     if (document.documentElement.scrollTop > 60) {
    //         vm.isActive = true;
    //     } else {
    //         vm.isActive = false;
    //     }
    // };
  },
  mounted() {
    // if(this.$route.query.codeNumber){
    //     this.$store.commit('changeCodeNumber',this.$route.query.codeNumber)
    // }
    this.$store.commit("changeShowSku", false);
    this.initData();
    this.configShare();
  },
  destroyed() {
    clearInterval(timer);
    this.$store.commit("changeSkuIdx", 0); // 初始化规格索引
    this.$store.dispatch("wxConfigDefault", {});
  },
};
</script>

<style lang="less" scoped>
.btm {
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  border-top: 1px solid #f8f8f8;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #fff;
  .le {
    width: 163px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 12px;
    color: #999999;
    background: #fff;
    .icon-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      .icon {
        display: block;
        width: 18px;
        height: 18px;
        margin-bottom: 3px;
      }
      .counts {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        text-align: center;
        line-height: 15px;
        background: #ff001b;
        position: absolute;
        right: 0;
        top: -5px;
        color: #fff;
      }
    }
  }
  .mi {
    // width: 106px;
    // width: 50%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-size: 15px;
    color: #fff;
    background: #201e1d;
    border-radius: 53px;
  }
  .ri {
    width: 212px;
    // width: 50%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-size: 15px;
    color: #fff;
    background: #ff001b;
    border-radius: 53px;
  }
    .ri2 {
    width: 212px;
    // width: 50%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-size: 15px;
    color: #fff;
    background: #444343;
    border-radius: 53px;
  }
}
.mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  z-index: 99;
  .picture-box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .picture {
      display: block;
      width: 280px;
      height: 426px;
      background: rebeccapurple;
      margin: 0 auto;
    }
    .btn {
      width: 290px;
      height: 44px;
      border-radius: 22px;
      background: #ed2e2e;
      text-align: center;
      line-height: 44px;
      font-size: 16px;
      color: #fff;
      margin-top: 15px;
    }
  }
  .sku {
    width: 100%;
    min-height: 500px;
    border-radius: 8px 8px 0 0;
    background: #fff;
    position: absolute;
    left: 0;
    bottom: 0;
    box-sizing: border-box;
    padding: 14px;
    .tp {
      display: flex;
      width: 100%;
      position: relative;
      margin-bottom: 20px;
      .goods-cover {
        width: 78px;
        height: 78px;
        border-radius: 4px;
        background: #e0e0e0;
      }
      .goods-price {
        width: 250px;
        height: 78px;
        display: flex;
        // align-items: center;
        flex-direction: column;
        justify-content: space-around;
        box-sizing: border-box;
        padding-left: 12px;
        .pris {
          text-align: left;
          .hjy {
            color: #ed2e2e;
            font-size: 13px;
          }
          .hjy-count {
            color: #ed2e2e;
            font-size: 18px;
            font-weight: bold;
            margin-right: 12px;
          }
          .spe-icon {
            font-size: 14px;
            color: #ed2e2e;
            font-weight: bold;
            margin-left: 4px;
          }
          .gwj {
            color: #141f33;
            font-size: 13px;
          }
        }
        .guige {
          text-align: left;
          font-size: 13px;
          color: #99a0ad;
        }
        .close {
          width: 16px;
          height: 16px;
          background: url("../../assets/images/closesku.png") no-repeat;
          background-size: 100% 100%;
          position: absolute;
          right: 4px;
          top: 4px;
        }
      }
    }
    .out {
      height: 200px;
      overflow: hidden;
      margin-bottom: 50px;
      .inner {
        height: 200px;
        overflow: auto;
      }
    }
    .status-box {
      width: 100%;
      margin-bottom: 8px;
      .tits {
        font-size: 16px;
        color: #141f33;
        margin-bottom: 12px;
        text-align: left;
      }
      .status {
        width: 100%;
        overflow: hidden;
        .box {
          width: auto;
          padding: 6px 20px;
          background: #f0f2f5;
          border-radius: 4px;
          font-size: 14px;
          color: #141414;
          display: inline-box;
          margin-right: 12px;
          margin-bottom: 12px;
          float: left;
        }
        .act {
          background: #fae9e8;
          color: #ed2e2e;
        }
      }
    }
  }
  .num-box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    color: #141f33;
    margin-bottom: 23px;
    .handles {
      .edge,
      .add {
        display: inline-block;
        width: 28px;
        height: 28px;
        background: #f0f2f5;
        border-radius: 4px;
        color: #616b80;
        font-size: 12px;
        line-height: 28px;
      }
      .cou {
        display: inline-block;
        width: 45px;
        height: 28px;
        background: #f0f2f5;
        border-radius: 4px;
        color: #616b80;
        font-size: 12px;
        line-height: 28px;
        margin: 0 4px;
      }
    }
  }
  .code-txt {
    width: 100%;
    text-align: center;
    font-size: 12px;
    color: #99a0ad;
    margin-bottom: 4px;
  }
  .btn-box {
    width: 100%;
    height: 44px;
    border-radius: 22px;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    .btn1 {
      width: 50%;
      height: 100%;
      line-height: 44px;
      background: #201e1d;
      color: #fff;
      font-size: 16px;
    }
    .btn2 {
      background: #ff001c;
    }
    .btn3 {
      width: 100%;
      height: 100%;
      line-height: 44px;
      color: #fff;
      font-size: 16px;
      background: #ff001c;
    }
  }
}
</style>
