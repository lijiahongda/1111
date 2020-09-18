<template>
  <!--食品生鲜-->
  <div class="sc_box">
    <!--    <div class="headdiv">-->
    <!---->
    <!--      <Head></Head>-->
    <!--    </div>-->
    <!--banner-->
    <div class="bannerCss" style="height: 0">
      <!--        :style="{'height':Banner[0].redirectUrl ? '':'1px'}"-->
      <van-swipe :autoplay="3000" indicator-color="white">
        <!--          v-if="Banner[0].redirectUrl"-->
        <van-swipe-item
          v-for="(item,index) in Banner"
          v-if="false"
          @click="goAcitivy(item)"
          :key="index"
        >
          <img v-lazy="item.redirectUrl" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!--    <fresh-banner :swiper="Banner"></fresh-banner>-->
    <!--grid list-->
    <fresh-grid :categoryGrip="category" :goodStore="isgoodStore" :env="env_rn"></fresh-grid>
    <h1 class="title">
      <em>品牌清仓</em>
      <span>每日0点上新</span>
    </h1>
    <!--    <ul class="tab_title">-->
    <!--      <li class="hov"-->
    <!--          v-for="(item,index) in tab_title"-->
    <!--          :key="index"-->
    <!--          @click="getGoodlist(item.typeId)">{{item.title}}</li>-->
    <!--    </ul>-->

    <!--    <div class="tabBox">-->
    <!--      <van-tabs-->
    <!--        v-model="hallId"-->
    <!--        title-active-color="#F7263C"-->
    <!--        title-inactive-color="#333333"-->
    <!--        line-width="38px"-->
    <!--        background="#f8f8f8"-->
    <!--        @change="changeTab"-->
    <!--      >-->
    <!--        <van-tab v-for="item in hallList" :title="item.title"></van-tab>-->
    <!--      </van-tabs>-->
    <!--    </div>-->
    <van-list
      v-model="hallParams.loading"
      :finished="hallParams.finished"
      finished-text="已加载完毕"
      offset="300"
      :error.sync="hallParams.error"
      error-text="请求失败，点击重新加载"
      :immediate-check="false"
      @load="onLoad"
    >
      <div class="venue_box">
        <div
          class="venue_item"
          v-for="(item,index) in onlyList"
          :key="index"
          @click="goVenue(item)"
        >
          <div class="itemTop">
            <!--          <img :src="item.brandLogo"-->
            <!--               alt="">-->
            <p class="logoImgItem" :style="{backgroundImage:'url('+ item.brandLogo +')'}"></p>
            <div class="title_info">
              <h1>{{item.brandName}}</h1>
              <!-- <p><span v-if="item.floorPrice > 0 ">低调{{item.floorPrice}}元</span><span v-if="item.isAllFreeShipping == 1">全场包邮</span></p> -->
              <p>
                <span>低至{{item.floorPrice}}元</span>
                <span>全场包邮</span>
              </p>
            </div>
            <div class="time">
              距结束
              <van-count-down
                :time="item.endSurplusTime * 1000"
                format="DD天HH时mm分"
                style="font-size: 13px;display: inline-block!important;"
              />
            </div>
          </div>
          <div class="listBox">
            <div
              class="itemox"
              v-for="(just,key) in item.productList"
              :key="key"
              @click.stop="goVenueDetail(just)"
            >
              <img :src="just.productCover" alt />
              <p class="discount">
                <span>{{just.discount}}折</span>
              </p>
              <p class="clearance">
                {{just.vipPriceName}}
                <span style="display: inline-block;font-weight: 500">¥</span>
                <span>{{just.vipPrice}}</span>
              </p>
              <p class="del">{{just.originPriceName}}¥{{just.originPrice}}</p>
            </div>
          </div>
          <p class="line"></p>
          <p class="all" @click="goVenue()">{{item.productCount}}件商品 ></p>
        </div>
      </div>
    </van-list>
    <!--底部tab-->
    <!--    <Nav></Nav>-->
  </div>
</template>

<script>
import { Tab, Tabs, CountDown, Swipe, SwipeItem, Lazyload } from "vant";
Vue.use(Tab).use(Tabs).use(CountDown).use(Swipe).use(SwipeItem).use(Lazyload);
import FreshScroll from "@/component/fresh_scroll";
import FreshList from "@/component/fresh_scroll/List";
// import FreshBanner from '@/component/fresh_scroll/banner'
import FreshGrid from "@/component/fresh_scroll/grid";
import FreshBuy from "@/component/fresh_scroll/buy";
import FreshNav from "@/component/fresh_scroll/nav";
import Head from "@/component/head/head";
import Nav from "@/component/Nav";
import Vue from "vue";
import { getGoodStore, getGoodlist } from "../../services/fresh";

export default {
  name: "fresh",
  components: {
    FreshNav,
    // FreshBanner,
    FreshGrid,
    FreshBuy,
    FreshScroll,
    FreshList,
    Nav,
    Head,
  },
  data() {
    return {
      uid: "",
      Banner: "", //banner
      isgoodStore: "goodStore", //是否是好衣库
      category: "", //icon
      page: 1,
      pageSize: 10,
      commendList: "",
      class: "",
      freshNav: "fresh",
      tab_title: [],
      onlyList: [],
      hallParams: {
        hallId: 1, //0永久会场，1正式会场，2预告会场
        page: 1,
        pageSize: 10,
        loading: false,
        finished: false,
        error: false,
      },
      hallList: [], //会场列表
      env_rn: 0, //RN 判断
    };
  },
  beforeMount() {
    document.title = "大牌清仓"; //res.data.title;
  },
  mounted() {
    this.uid = window.localStorage.getItem("uid") || "";
    this.getNav();
    this.getGoodlist(this.hallParams.hallId); //获取主页会场商品列表
    this.returnTerminal(); //判断访问终端
  },
  beforeDestroy() {
    //离开时销毁动态加载的 微信1.3.2 jssdk
    // if(this.wx_script){
    //   document.querySelector("#wx_js_script").remove();
    // }
  },
  methods: {
    goAcitivy(data) {
      // console.log(data);
      this.$router.push({ path: "/activity", query: { id: data.actId } });
    },

    // //切换tab
    // changeTab(index, name, title) {
    //   // console.log(index,name,title)
    //   this.hallParams.hallId = index;
    //   this.getGoodlist(this.hallParams.hallId); //获取主页会场商品列表
    // },

    getNav() {
      getGoodStore().then((res) => {
        this.Banner = res.data.banner;
        this.category = res.data.iconList;
        // this.tab_title = res.data.branType
        this.hallList = res.data.conferenceHallType;
        // document.title = '大牌清仓'; //res.data.title;
      });
    },

    getGoodlist(hallId) {
      this.hallParams.loading = true;
      let newParams = {
        typeId: hallId,
        page: this.hallParams.page,
        pageSize: this.hallParams.pageSize,
      };
      getGoodlist(newParams)
        .then((res) => {
          // console.log(res);
          if (res.code == 200 && res.data.length > 0) {
            this.hallParams.loading = false;
            this.onlyList = this.onlyList.concat(res.data);
          } else {
            this.hallParams.finished = true;
          }
        })
        .catch((error) => {
          console.log(error);
          this.hallParams.error = true;
        });
    },

    //下滑翻页
    onLoad() {
      this.hallParams.page += 1;
      this.getGoodlist(this.hallParams.hallId); //获取主页会场商品列表
    },

    //去会场
    goVenue(item) {
      console.log(item);
      if (this.env_rn == 99) {
        let _url =
          "http://web.yuetao.group/clothesHall?epId=" +
          item.conferenceHallId +
          "&channelName=" +
          item.brandName +
          "&env=" +
          99;
        let _Router = {
          redirectType: 111,
          redirectUrl: _url,
          name: item.brandName
        };
        window.ReactNativeWebView.postMessage(JSON.stringify(_Router));
      } else {
        this.$router.push({
          path: "/clothesHall",
          query: {
            epId: item.conferenceHallId,
            channelName: item.brandName,
            env: this.env_rn,
          },
        });
      }
    },

    //去详情
    goVenueDetail(item) {
      // 自营商品跳转详情：/goodsDetailZY?liveId='直播ID'&liveUserId='直播人ID'&parentTypeId='产品类型'&goodsId='产品ID'&skuid='产品规格ID'
      // console.log(item);
      // return;
      let _Router = {
        redirectType: 3,
        id: item.productId.toString(),
        skuId: item.productSkuId.toString(),
      };
      if (this.env_rn == 99) {
        console.log("RN++++++", JSON.stringify(_Router));
        window.ReactNativeWebView.postMessage(JSON.stringify(_Router));
        // (function() {
        //     const newData = JSON.stringify(_Router)
        //     console.log(newData,'aaaa');
        //     window.postMessage = function() {
        //         console.log('bbbbb');
        //         window.ReactNativeWebView.postMessage(newData);
        //     }
        // })()
      } else if (this.env_rn == 98) {
        //跳转小程序商品详情
        let goodsId_wx = item.productId;
        let goodsSkuId_wx = item.productSkuId;
        let wxUrl =
          `/page/shopDetails/shopDetails?parentTypeId=&goodsId=` +
          goodsId_wx +
          "&skuid=" +
          goodsSkuId_wx;
        wx.miniProgram.navigateTo({
          url: wxUrl,
        });
      } else {
        // window.location.href = _url;
        console.log("H5详情");
        this.$router.push({
          path: "/goodsDetailZY",
          query: {
            goodsId: item.productId,
            skuid: item.productSkuId,
          },
        });
      }
    },

    //判断访问终端
    returnTerminal() {
      let env = this.GetUrlParam("env");
      this.env_rn = env == 99 ? 99 : env == 98 ? 98 : 0;
    },

    // url
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
  },
};
</script>
<style lang="less" scoped>
.sc_box {
  background: #f8f8f8;
  padding-bottom: 50px;
}

/*.headdiv {*/
/*  padding: 0 12px;*/
//}
.bannerCss {
  height: 148px;
  /*margin-top:12px;*/
  /deep/ .van-swipe {
    height: 100%;
    background-color: #f8f8f8;
    /*height: calc(100%-10px);*/
  }
  /deep/ .van-swipe__track {
    /*height: calc(100%-10px);*/
    height: 100%;
    margin-top: 10px;
  }
  /deep/ .van-swipe-item img {
    height: 138px;
  }
}
.title {
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: inherit;
  justify-content: center;
  margin: 20px 0;
}
.title em {
  text-align: center;
  font-size: 16px;
  color: #333;
  height: 16px;
  display: block;
  float: left;
  font-style: normal;
  font-weight: bold;
}
.title span {
  padding: 0 6px;
  height: 16px;
  line-height: 18px;
  margin-left: 10px;
  display: block;
  float: left;
  background: linear-gradient(#ff4545 0%, #e33f44 100%);
  border-top-left-radius: 7px;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  font-size: 10px;
  color: #fff;
}
/*.tab_title {*/
/*  width: 348px;*/
/*  margin: 0 auto;*/
/*  display: flex;*/
/*  li {*/
/*    flex: 1;*/
/*    text-align: center;*/
/*  }*/
/*  li.hov {*/
/*    font-weight: bold;*/
/*    position: relative;*/
/*    color: #f7263c;*/
/*  }*/
/*  li.hov::before {*/
/*    content: " ";*/
/*    width: 23px;*/
/*    height: 3px;*/
/*    background: #f7263c;*/
/*    border-radius: 5px;*/
/*    position: absolute;*/
/*    bottom: -7px;*/
/*    left: 0;*/
/*    right: 0;*/
/*    margin: auto;*/
/*  }*/
/*}*/
.tabBox {
  width: 86%;
  height: 45px;
  margin: -6px auto 0 auto;
  /deep/ .van-tab--active {
    font-weight: bolder;
    font-size: 14px;
  }
  /deep/ .van-hairline--top-bottom::after,
  /deep/ .van-hairline-unset--top-bottom::after {
    border: none !important;
  }
  /deep/ .van-tabs__line {
    background-color: #f7263c;
    height: 2px;
    margin: 0 auto 4px auto;
  }

  /deep/ .van-tab {
    font-size: 13px !important;
    flex-basis: 30% !important;
  }
}
.venue_item {
  width: 350px;
  padding: 17px 10px;
  background: #fff;
  border-radius: 7px;
  margin: 10px auto;
  .itemTop {
    display: flex;
    flex-direction: row;
    position: relative;
    /*img {*/
    /*  width: 59px;*/
    /*  height: 59px;*/
    /*  border-radius: 100%;*/
    /*  margin-right: 14px;*/
    /*}*/
    .logoImgItem {
      width: 59px;
      height: 59px;
      border-radius: 50%;
      /*position: absolute;*/
      /*left: 50%;*/
      /*top: 25px;*/
      margin-right: 14px;
      border: 1px solid #f6f6f6;
      /*transform: translateX(-50%);*/
      background-size: 100% 60%;
      background-repeat: no-repeat;
      background-position: center;
      background-color: #fff;
    }
    .title_info {
      display: flex;
      flex-direction: column;
      h1 {
        font-size: 14px;
        color: #000;
        margin-bottom: 11px;
        text-align: left;
      }
      p {
        span {
          padding: 1px 3px;
          background: #f7263c;
          border-radius: 2px;
          font-size: 10px;
          color: #fff;
          margin-right: 8px;
          //background-color: black;
          height: 20px;
          line-height: 22px;
        }
        span:first-child {
          padding: 1px 5.5px;
        }
      }
    }
    .time {
      position: absolute;
      font-size: 13px;
      color: #333;
      top: 8px;
      right: 0;
      /*padding-top: 8px;*/
      /*height: 25px;*/
      width: 140px !important;
      text-align: right;
    }
  }
  .listBox {
    display: flex;
    /*flex-direction: row;*/
    justify-content: space-between;
    text-align: left;
    margin-top: 10px;
    .itemox {
      width: 105px;
      /*margin-right: 7px;*/
      display: flex;
      flex-direction: column;

      img {
        width: 105px;
        height: 105px;
        border-radius: 7px;
      }
      .discount {
        margin-top: 10px;
        span {
          display: inline-block;
          background: url("../../assets/images/yhj_red.png") no-repeat;
          background-size: 40px 14.5px;
          width: 40px;
          height: 14.5px;
          text-align: center;
          /*line-height: 18px;*/
          /*font-size: 10px;*/
          /*color:#fff;*/

          /*background: #f7263c;*/
          /*height: 15px;*/
          line-height: 16.5px;
          font-size: 12px;
          color: #fff;
          /*border-radius: 3px;*/
          /*padding: 0 10px;*/
        }
      }
      .clearance {
        color: #f7263c;
        font-size: 13px;
        margin: 10px 0;
        //font-weight: 500;

        span {
          font-size: 16px;
          font-weight: 500;
        }
      }
      .del {
        color: #999;
        font-size: 12px;
        text-decoration: line-through;
      }
    }
  }
  .line {
    width: 100%;
    margin: 17px auto;
    height: 1px;
    border-bottom: 1px dashed #f2f2f2;
  }
  .all {
    padding: 0 14px;
    height: 27px;
    line-height: 27px;
    font-size: 14px;
    color: #000;
    background: #f1f1f1;
    border-radius: 13px;
    display: -webkit-inline-box;
  }
}
</style>