<template>
  <div class="couorderlist_contant" :style='"background:"+activityInfo.backColor'>
    <div class="banner">
      <img :src="backGround.url" alt />
    </div>
    <div class="ulike">
      <div class="li-box">
        <div
          class="li"
          v-for="(item,index) in shopinfoList"
          :key="index"
          @click="goShopdetail(item)"
        >
          <img class="cover" :src="item.goodCover" />
          <div class="in">
            <div class="in-tit">{{item.goodName}}</div>
            <div class="pri-box">
              <div class="new-pri">
                <span class="spe">¥</span>
                <span>{{item.goodVipPrice}}</span>
              </div>
              <div class="old-pri">¥{{item.goodPrice}}</div>
              <div class="addshopcarbtn" @click.stop="skudetailShopcar(item)">+</div>
            </div>
          </div>
        </div>
      </div>
      <div class="btm" style="color:#fff;">我也是有底线的~</div>
    </div>
    <!-- 规格 -->
    <div class="dialog" v-show="showTimeShopcar">
      <div class="dialogs">
        <span class="xdel" @click="delxscar">x</span>
        <div class="good_sku">
          <dl>
            <dt>
              <img :src="Specificationsimg" alt />
            </dt>
            <dd>
              <p>
                <span v-if="zhiboDetail.goodsType==1" class="goodsku_text">直播价¥</span>
                <span
                  v-if="zhiboDetail.goodsType!=1"
                  class="goodsku_text"
                >{{FlashGoodsInfo.showRemind}}¥</span>
                <span class="goodsku_price">{{FlashGoodsInfo.showPrice}}</span>
                <span class="oldsku_text">{{FlashGoodsInfo.hiddenRemind}}</span>
                <span class="oldsku_price">{{FlashGoodsInfo.hiddenPrice}}</span>
              </p>
              <p>已选：{{num}}件</p>
            </dd>
          </dl>
        </div>
        <div class="skus" v-for="(option,idx) in colorSize" :key="idx">
          <p class="skus_text">{{option.title}}</p>
          <div class="channelContent">
            <div
              v-for="(item,index) in option.buttons"
              :key="index"
              :class="[ statusArr[idx]==index?'active':'' ]"
              @click='item.isEnable?swichLabel(idx,index):""'
            >
              <span :class="[ item.isEnable?'':'NotOptional' ]">{{item.text}}</span>
            </div>
          </div>
        </div>
        <div class="skuNum">
          <span class="nums">购买数量</span>
          <div>
            <span class="delnum" @click="delnum">-</span>
            <span class="numbers">{{num}}</span>
            <span class="addnum" @click="addnum">+</span>
          </div>
        </div>
        <p class="shop_num">商品编号：{{last_sku}}</p>
        <div @click="addShopcar" class="buyNows">加入购物车</div>
      </div>
    </div>
    <!--    底部-->
    <van-goods-action>
      <van-goods-action-icon icon="cart-o" @click="goShopcar" text="购物车" :badge="shopList" />
      <van-goods-action-button type="danger" @click="goShopcar" text="去结算" />
    </van-goods-action>
  </div>
</template>

<script>
import Vue from "vue";
import {
  Toast,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Sku,
} from "vant";
Vue.use(Toast);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Sku);

import {
  ShoplistV4,
  ShopcreateV4,
  newActivityList,
  getProductSkuDatail,
  getProductBuyDatailV4,
  getActivityCategoryInfo,
} from "../../services/userApi";
export default {
  data() {
    return {
      activityInfo: "",
      backGround: "",
      shopinfoList: "",
      shopList: "",
      // 规格
      showTimeShopcar: false,
      colorSize: "",
      Specificationsimg: "",
      zhiboDetail: {},
      FlashGoodsInfo: {},
      num: 1,
      last_sku: "",
      statusArr: [],
      couListshopdetail: "",
    };
  },
  mounted() {
    this.getActivityCategoryInfodetail();
    this.ActivityList();
    this.ShoplistV4List();
  },
  methods: {
    //获取白拿详情
    getActivityCategoryInfodetail() {
      let _self = this;
      let params = {
        id: 521,
      };
      getActivityCategoryInfo(params).then((res) => {
        if (res.code == 200) {
          _self.activityInfo = res.data.activityInfo;
          _self.backGround = res.data.activityInfo.backGround;
        } else {
          Toast(res.msg);
        }
      });
    },
    //获取白拿商品列表
    ActivityList() {
      let _self = this;
      let params = {
        id: 521,
        categoryId: 0,
        page: 1,
        pageSize: 100,
      };
      newActivityList(params).then((res) => {
        if (res.code == 200) {
          _self.shopinfoList = res.data[0].goodsInfo;
        } else {
          Toast(res.msg);
        }
      });
    },
    // 购物车查询
    ShoplistV4List() {
      let _self = this;
      let _uid = localStorage.getItem("uid");
      let params = {
        uid: _uid,
      };
      ShoplistV4(params).then((res) => {
        if (res.code == 200) {
          _self.shopList = res.data.length;
        } else {
          Toast(res.msg);
        }
      });
    },
    //商品规格
    getProductSkuDataildetail(e) {
      let _self = this;
      let _uid = localStorage.getItem("uid");
      let params = {
        uid: _uid,
        addressCode: 0,
        product_sku_id: e.productSkuId,
        productType: 0,
        liveId: 0,
        live_id: 0,
      };
      getProductSkuDatail(params).then((res) => {
        if (res.code == 200) {
          _self.zhiboDetail = res.data;
        } else {
          Toast(res.msg);
        }
      });
    },
    //商品详情
    getProductBuyDatailV4detail(e) {
      let _self = this;
      let _uid = localStorage.getItem("uid");
      let params = {
        uid: _uid,
        product_id: e.goodId,
        live_id: 0,
        liveId: 0,
        live_people_id: 0,
        product_sku_id: e.productSkuId,
        productType: 0,
        room_id: 0,
        share_from: 0,
      };
      getProductBuyDatailV4(params).then((res) => {
        if (res.code == 200) {
          _self.FlashGoodsInfo = res.data;
          _self.colorSize = res.data.saleList;
          _self.Specificationsimg = res.data.banner[0];
          if (res.data.saleList != "") {
            _self.initSelected(res.data.saleList, e.productSkuId);
          } else {
            _self.skuid = e.productSkuId;
          }
        } else {
          Toast(res.msg);
        }
      });
    },
    // 点击加入购物车
    skudetailShopcar(e) {
      let _self = this;
      _self.couListshopdetail = e;
      _self.showTimeShopcar = true;
      _self.getProductSkuDataildetail(e);
      _self.getProductBuyDatailV4detail(e);
    },
    // 加入购物车
    addShopcreateV4(e) {
      let _self = this;
      let _uid = localStorage.getItem("uid");
      let params = {
        uid: _uid,
        position_from: 0,
        product_id: e.goodId,
        product_sku_id: e.productSkuId,
        product_num: 1,
        isCollage: 0,
      };
      ShopcreateV4(params).then((res) => {
        if (res.status == 200) {
          Toast("成功加入购物车,点击去结算免运费");
          _self.showTimeShopcar = false;
          _self.shopList = res.data.cartTotalNum;
        } else {
          Toast(res.msg);
        }
      });
    },
    // 商品详情
    goShopdetail(e) {
      this.$router.push({
        path: "/goodsDetailZY",
        query: { goodsId: e.goodId, skuid: e.productSkuId },
      });
    },
    // 选规格加入购物车
    addShopcar() {
      let _self = this;
      let _eve = _self.couListshopdetail;
      _self.addShopcreateV4(_eve);
    },
    delxscar() {
      let _self = this;
      _self.showTimeShopcar = false;
    },
    delnum() {
      if (this.num == 1) {
        this.num = 1;
      } else {
        this.num--;
      }
    },
    addnum() {
      this.num++;
    },
    initSelected: function (colorsize, skuid) {
      let arr = new Array(colorsize.length);
      for (let i = 0; i < colorsize.length; i++) {
        for (let j = 0; j < colorsize[i].buttons.length; j++) {
          if (colorsize[i].buttons[j].skuList.indexOf(Number(skuid)) > -1) {
            this.selectLabel(i, j);
          }
        }
      }
    },
    selectLabel(index, data_index) {
      let that = this;
      let colorSize = that.colorSize;
      var idx = index;
      //选中sku
      var sku = colorSize[index].buttons[data_index]["skuList"];
      //选中第几行第几个
      that.statusArr[index] = data_index;
      //取出其他sku
      let m = [];

      this.sizeSelectText = [];

      var is_selected_skus = {};
      this.statusArr.map((b, a) => {
        if (a != idx && typeof this.statusArr[a] != "undefined") {
          is_selected_skus[a] = colorSize[a].buttons[this.statusArr[a]].skuList;
        }
        that.sizeSelectText.push(colorSize[a].buttons[this.statusArr[a]].text);
      });
      for (let i = 0; i < colorSize.length; i++) {
        var channel_data = colorSize[i].buttons;

        for (let j = 0; j < channel_data.length; j++) {
          if (i != idx) {
            var sku_isists = Array.intersect(sku, channel_data[j].skuList);
            for (let [c, d] in is_selected_skus) {
              if (c != i) {
                sku_isists = Array.intersect(sku_isists, is_selected_skus[c]); //is_selected_skus非当前行其他行选中的元素
              }
            }
            if (sku_isists.length) {
              colorSize[i].buttons[j].isEnable = true;
            } else {
              colorSize[i].buttons[j].isEnable = false;
            }
          } else {
            if (j == data_index) {
              colorSize[i].buttons[j].isEnable = true;
            } else if (colorSize.length == 1) {
              colorSize[i].buttons[j].isEnable = true;
            }
          }
        }
      }
      let last_sku = sku;
      for (let [c, d] in is_selected_skus) {
        last_sku = Array.intersect(last_sku, is_selected_skus[c]);
      }
      this.statusArr = this.statusArr;
      this.colorSize = colorSize;
      this.last_sku = last_sku[0];
      this.skuid = last_sku[0];
      this.product_sku_id = last_sku[0];
      this.sizeSelectText = that.sizeSelectText;
      if (this.colorSize[index]["title"] == "颜色") {
        this.Specificationsimg = colorSize[index].buttons[data_index]["img"];
      }
      // this.skuidDetil()
    },

    // 去购物车
    goShopcar() {
      this.$router.push({
        path: "/shopCar",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.couorderlist_contant {
  background: #f6f6f6;
  padding-bottom: 83px;
  .banner {
    width: 100%;
    height: auto;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      border: none;
      font-size: 0;
      display: block;
    }
  }
  .dialog {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 100;
    top: 0;
    font-size: 0.2rem;
    .dialogs {
      background: #fff;
      position: fixed;
      bottom: 0;
      width: 100%;
      padding: 2vh 2%;
      box-sizing: border-box;
      .xdel {
        position: absolute;
        right: 10px;
        font-size: 20px;
      }
      .good_sku {
        height: 2.2rem;
      }

      .good_sku dl {
        display: flex;
        dd {
          position: absolute;
          left: 110px;
          top: 30px;
          color: #141414;
          line-height: 25px;
          text-align: left;
          .goodsku_text,
          .goodsku_price {
            color: #ca2519;
          }

          .goodsku_price {
            font-size: 20px;
          }
        }
        dt {
          img {
            width: 80px;
            height: 80px;
            background: #ccc;
            margin: 10px;
            border-radius: 5px;
          }
        }
      }
      .skuNum {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 25px;
        margin-top: 13px;
        padding-left: 10px;
        div {
          display: flex;
          align-items: center;
          margin-right: 20px;
          .delnum,
          .addnum,
          .numbers {
            width: 25px;
            height: 25px;
            background: #f6f6f6;
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 0.2rem;
            color: #141414;
          }
        }
      }
    }
    .skus {
      margin-top: 15px;
      text-align: left;
      padding-left: 10px;
      .channelContent {
        div {
          padding-left: 1vh;
          padding-right: 1vh;
          height: 3vh;
          align-items: center;
          background-color: #f8f8f8;
          margin-right: 1vh;
          color: #333;
          font-size: 0.2rem;
          margin-top: 1vh;
          border-radius: 0.1rem;
          line-height: 3vh;
          display: inline-block;
          border-radius: 0.4vh;
        }
        .active {
          color: #ca2519;
          height: 3vh;
          background: #fae9e8;
          border: 1px solid #ca2519;
        }
      }
    }
    .shop_num {
      text-align: center;
      padding-top: 40px;
      margin-bottom: 1vh;
      color: #999999;
      font-size: 0.2rem;
    }
    select {
      display: inline-block;
      background: #fff;
      width: 3.6rem;
      margin-top: 0.3rem;
      height: 0.66rem;
      border-radius: 0.1rem;
      padding-left: 0.2rem;
      margin-left: 0.8rem;
    }
    .buyNows {
      display: inline-block;
      border-radius: 20px;
      font-weight: 600;
      width: 100%;
      height:40px;
      color: #fff;
      background-color: #ca2519;
      font-size: 15px;
      text-align: center;
      line-height: 40px;
    }
  }
}
.ulike {
  width: 100%;
  box-sizing: border-box;
  padding: 20px 12px 35px 12px;
  .ulike-tit {
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .ulike-icon {
      width: 21px;
      height: 21px;
      margin-right: 10px;
      background: red;
    }
    .f1 {
      font-size: 17px;
      color: #141414;
      margin-right: 5px;
    }
    .f2 {
      color: #999999;
      font-size: 14px;
    }
  }
  .li-box {
    margin-bottom: 20px;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    .li {
      width: 48%;
      height: 265px;
      border-radius: 9px;
      overflow: hidden;
      margin-bottom: 7px;
      background: #ffffff;
      .cover {
        width: 100%;
        height: 172px;
      }
      .in {
        width: 100%;
        height: 93px;
        box-sizing: border-box;
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
        .in-tit {
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          font-size: 14px;
          color: #141414;
        }
        .addshopcarbtn {
          width: 25px;
          height: 25px;
          text-align: center;
          line-height: 25px;
          color: #fff;
          background: red;
          font-weight: 600;
          border-radius: 50%;
          font-size: 20px;
          position: absolute;
          right: 15px;
          bottom: 15px;
        }
      }
      .pri-box {
        display: flex;
        align-items: center;
        .new-pri {
          font-size: 17px;
          color: #bb3627;
          margin-right: 5px;
          .spe {
            font-size: 13px;
          }
        }
        .old-pri {
          font-size: 13px;
          color: #999999;
          text-decoration: line-through;
        }
      }
    }
  }
  .btm {
    font-size: 13px;
    color: #999;
  }
}
/deep/ .van-goods-action-icon {
  width: 50%;
}
</style>