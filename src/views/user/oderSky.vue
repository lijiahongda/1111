<template>
  <div>
    <!-- 下载提示 -->
    <div class="downloadAppTip" v-if="isSHow3">
      <div class="downloadAppTip_left">
        <img src="../../assets/images/tipclose.png" class="downloadAppTip_close" @click="closehead" />
        <img src="../../assets/images/headlogo.png" class="downloadAppTip_logo" />
        <span class="downloadAppTip_word">下载悦淘APP,轻松购物赚返利</span>
      </div>
      <div class="downloadAppTip_right">
        <span class="downloadAppTip_btn" @click="downLoadApp">立即下载</span>
      </div>
    </div>

    <!-- 支付提示 -->
    <div class="payarea">
      <div class="payareahead clear">
        <div class="payareaheadLeft">
          <div v-if="payStatus=='TRADE_SUCCESS'" class="paysuccesswold">支付成功</div>
          <div v-if="payStatus=='WAIT_BUYER_PAY'" class="paysuccesswold">等待买家付款</div>
          <div v-if="payStatus=='UNKNOWN'" class="paysuccesswold">支付失败</div>
          <div class="payprice">{{orderPrice}}</div>
          <div class="paytype">微信支付</div>
        </div>
        <div class="payareaheadRight">
          <img
            v-if="payStatus=='TRADE_SUCCESS'"
            src="../../assets/images/successtip.png"
            class="paysuccessicon"
          />
          <img v-else src="../../assets/images/fail.png" class="paysuccessicon" />
        </div>
      </div>
      <div class="payareaBtn">
        <template v-if="orderInfo.payStatus==1">
          <div class="payareaBtnA" @click="getGzh">
            关注公众号
            <div class="payareaBtntip">瓜分1亿现金</div>
          </div>
          <div class="payareaBtnB" @click="goCopnlist">查看订单</div>
        </template>
        <template v-if="orderInfo.payStatus==0">
          <div class="payareaBtnB" @click="goCopnlist2">查看订单</div>
          <!-- <div class="payareaBtnB">继续支付</div> -->
        </template>
      </div>
    </div>

    <!-- 推荐商品 -->
    <div class="tuijianarea">
      <div class="tjhead">
        <div class="tjhead2">
          <img src="../../assets/images/tuijian.png" class="tjicon" />
          <span class="tjtitle1">推荐商品</span>
          <span class="tjtitle2">猜你喜欢</span>
        </div>
      </div>
      <div class="tjbody">
        <ul class="tjul">
          <li v-for="(item,index) in tjGoddsList" :key="index">
            <a :href="item.url" target="_blank">
              <div class="tjgoolddiv">
                <img :src="item.goodCover" alt class="tjgoodsimg" />
                <div class="tjgoodsname">
                  <!-- <span class="tjshop">自营</span> -->
                  <img :src="item.icon" class="shopicon" />
                  <span class="goodsname" v-text="item.goodName"></span>
                </div>
                <!-- <div class="tjgoodsyh clear">
                            <div class="goodsyhj">
                                <img src="../../assets/images/juanleft.png" class="juanlefticon" alt="">
                                <span class="juannumber">10元卷</span>
                                <img src="../../assets/images/juanright.png" class="juanrighticon" alt="">
                            </div>
                            <div class="chengzhangdiv">
                                <img src="../../assets/images/chengzhang.png" class="czicon" alt="">
                                <span class="cznumber">成长值8000</span>
                            </div>
                </div>-->
                <div class="tjpricediv">
                  <span class="goodsnewprive">￥{{item.goodVipPrice}}</span>
                  <span class="goodsoldprive">￥{{item.goodPrice}}</span>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <!-- 红包未打开 -->
    <template v-if="isShow">
      <div class="shade"></div>
      <div class="redbagdiv">
        <div class="closeredbag clear">
          <img src="../../assets/images/closehb.png" class="closehbimg" @click="closeHb" />
        </div>
        <div class="redbag">
          <img src="../../assets/images/hongbao1.png" class="redbagimg" @click="openHb" />
        </div>
      </div>
    </template>
    <!-- 红包已打开 -->
    <template v-if="isShow2">
      <div class="shade"></div>
      <div class="redbagdiv">
        <div class="closeredbag clear">
          <img src="../../assets/images/closehb.png" class="closehbimg" @click="closeHb" />
        </div>
        <div class="redbag">
          <img src="../../assets/images/hongbao2.png" class="redbagimg" />
          <div class="redbagcontent">
            <div class="hbprice">
              {{orderInfo.couponInfo.amount}}
              <span class="danwei">元</span>
            </div>
            <div class="hbtime">{{orderInfo.couponInfo.usedRemind}}</div>
            <div class="gethb" @click="getHbFun">开心收下</div>
          </div>
        </div>
      </div>
    </template>
    <!-- 物流/公从号 -->
    <template v-if="isShow4">
      <div class="shade"></div>
      <div class="redbagdiv">
        <div class="closeredbag clear">
          <img src="../../assets/images/closehb.png" class="closehbimg2" @click="closeHb" />
        </div>
        <div class>
          <div class="gzhhead">
            <div class="gzhthree">
              关注悦淘公众号
              <span class="gzhtip">瓜分1亿现金</span>
            </div>
          </div>
          <div class="gzhbottom">
            <img
              src="https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-07-11/22/yuelvhui20wf4V6S4s1594479328.jpeg"
              alt
              class="ewmicon"
            />
            <div class="downapp">截图保存识别二维码，关注公众号</div>
          </div>
        </div>
      </div>
    </template>
    <!-- 白拿红包 -->
    <template v-if="isShow5">
      <div class="shade"></div>
      <div class="bainadiv">
        <div class="closeredbag clear">
          <img src="../../assets/images/closehb.png" class="closehbimg" @click="closeHb" />
        </div>
        <div class="bainabag">
          <img src="../../assets/images/huangbao.png" class="bainaimg" />
          <div class="bainabtndiv" @click="copy">
            <img src="../../assets/images/huangbaoshare.png" class="bainabtn" />
          </div>
        </div>
      </div>
    </template>
    <!-- 样式同app红包 -->
    <template v-if="isShow6">
      <div class="shade"></div>
      <div class="apphbdiv">
        <div class="closeredbag clear">
          <img src="../../assets/images/closehb.png" class="closehbimg" @click="closeHb" />
        </div>
        <div class="appbag">
          <img src="../../assets/images/yhj_bg.png" class="apphbimg" />
          <div class="yhjparent">
            <div class="yhjdiv">
              <div class="yhjname">{{hbInfo[0].name}}</div>
              <div class="yhjprice2">满{{hbInfo[0].samount}}元使用</div>
            </div>
            <div class="yhjaddress">{{hbInfo[0].label_name}}</div>
            <div class="yhjprice">￥{{hbInfo[0].amount}}</div>
          </div>
          <div class="appbtndiv" @click="getHbFun">
            <div class="appbtn">立即领取</div>
          </div>
        </div>
      </div>
    </template>
    <div id="biao1">{{shareContent}}</div>
  </div>
</template>
<script>
import { Toast } from "vant"; // 提示框
import {
  getRecommendGoods,
  getPayResult,
  getHb,
  getShareContent,
  getHbDetail,
} from "@/services/payresult";
export default {
  data() {
    return {
      tjGoddsList: "", //推荐商品列表
      orderInfo: "", //订单信息
      hbInfo: "", //红包信息
      isShow: false, //红包打开前
      isShow2: false, //红包打开后
      isSHow3: true, //app下载提示
      isShow4: false, //物流/公众号
      isShow5: false, //白拿红包
      isShow6: false, //样式同app红包
      shareContent: "", //分享内容
      ordersn: "",
      payStatus: "", //支付状态
      orderPrice: "", //
    };
  },
  mounted() {
    this.payStatus = this.GetUrlParam("status");
    this.orderPrice = this.GetUrlParam("billFundsDesc");
    // console.log(this.payStatus);
    this.getPayResult();
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.goBack, false);
    }
  },

  destroyed() {
    window.removeEventListener("popstate", this.goBack, false);
  },
  methods: {
    //关闭红包
    closeHb() {
      this.isShow = false;
      this.isShow2 = false;
      this.isShow4 = false;
      this.isShow5 = false;
      this.isShow6 = false;
    },
    //获取推荐商品
    getPayResult() {
      this.ordersn = this.GetUrlParam("odersn");
      let data = { ordersn: this.ordersn };
      getPayResult(data).then((res) => {
        if (res.status == 200) {
          this.orderInfo = res;
          if (res.displayType == 2) {
            this.isShow5 = true;
            this.getShareContent(res.shareData);
          }
          if (res.displayType == 0 && res.mechanismId != "") {
            this.isShow6 = true;
            this.getHbDetailFun(res.mechanismId);
          }
          let data = { orderNo: res.ordersnSon }; //11715944581231786
          getRecommendGoods(data).then((res) => {
            if (res.code == 200) {
              this.tjGoddsList = res.data;
            }
          });
        }
      });
    },
    //红包详情
    getHbDetailFun(data) {
      let hbDetail = data;
      let params = {
        mechanismId: hbDetail,
      };
      getHbDetail(params).then((res) => {
        if (res.code == 200) {
          this.hbInfo = res.data;
        }
      });
    },
    //领取红包
    getHbFun() {
      let hbDetail = this.orderInfo.mechanismId;
      let params = {
        mechanismId: hbDetail,
      };
      getHb(params).then((res) => {
        if (res.code == 200) {
          this.isShow6 = false;
          Toast("领取成功");
        }
        if (res.code == 400) {
          this.isShow6 = false;
        }
      });
    },
    //打开红包
    openHb() {
      // this.isShow=false
      // this.isShow2=true
    },
    closehead() {
      this.isSHow3 = false;
    },
    getGzh() {
      // this.isShow4 = true;
      window.location.href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzIxOTAzNDI0MA==&scene=124#wechat_redirect"
    },
    //订单详情
    goCopnlist() {
      let _oderno = this.orderInfo.ordersnSon; //取子订单号
      this.$router.push({ path: "/oderdetail", query: { orderNo: _oderno } });
    },
    goCopnlist2(){
      Toast("请下载悦淘app查看订单");
    },
    downLoadApp() {
      if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
        window.open("CnSellersApp://"); //ios app协议
        window.setTimeout(function () {
          window.location.href =
            "https://apps.apple.com/cn/app/%E6%82%A6%E6%97%85%E4%BC%9A/id1460325408";
        }, 3000);
      }
      if (navigator.userAgent.match(/android/i)) {
        window.open("sellingworldapp://"); //android app协议
        window.setTimeout(function () {
          window.location.href =
            "https://a.app.qq.com/o/simple.jsp?pkgname=com.newHuanQiuYueLv.www&from=singlemessage"; // 下载地址
        }, 3000);
      }
    },
    //复制
    copy() {
      var Url2 = document.getElementById("biao1").innerHTML;
      var oInput = document.createElement("textarea");
      oInput.value = Url2;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      oInput.className = "oInput";
      oInput.style.display = "none";
      this.isShow5 = false;
      Toast("复制成功，请在微信中分享");
    },
    //获取分享红包
    getShareContent(data) {
      let uid = localStorage.getItem("uid");
      let params = {
        product_sku_id: data.productSkuId,
        mid: uid,
        product_id: data.productId,
      };
      getShareContent(params).then((res) => {
        if (res.code == 200) {
          let data = res.data;
          this.shareContent = `${data.tips} ${data.goodsName}
————————————
官网价：${data.nowPrice}元  
会员价 ${data.vipPrice}元
入口 ${data.redirectUrl}`;
        }
      });
    },
    // 截取微信url中code
    GetUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = encodeURI(window.location.search).substr(1).match(reg);
      if (r != null) return decodeURI(unescape(r[2]));
      return null;
    },
    goBack() {
      this.$router.go(-3);
      //replace替换原路由，作用是避免回退死循环
    },
  },
};
</script>
<style lang="less" scoped>
.clear:after,
.clear:before {
  content: "";
  display: block;
  clear: both;
}
// 下载提示
.downloadAppTip {
  width: 375px;
  height: 40px;
  background: #d90d09;
}
.downloadAppTip_left {
  float: left;
  width: 285.5px;
  height: 40px;
  background: rgba(0, 0, 0, 0.8);
}
.downloadAppTip_right {
  float: right;
  width: 89.5px;
  background: #d90d09;
  line-height: 40px;
  text-align: center;
}
.downloadAppTip_word {
  font-size: 13.5px;
  color: #ffffff;
  margin-left: 10px;
  line-height: 40px;
}
.downloadAppTip_btn {
  font-size: 13.5px;
  color: #f8f8f8;
}
.downloadAppTip_close {
  width: 17.5px;
  height: 17.5px;
  margin-left: 12px;
  float: left;
  margin-top: 12px;
}
.downloadAppTip_logo {
  width: 28.5px;
  height: 28.5px;
  margin-left: 21px;
  float: left;
  margin-top: 5.5px;
}
// 页面主体
.payarea {
  background: linear-gradient(90deg, #ff6f29, #f7263c, #ff5c57);
  padding-top: 37.5px;
  padding-bottom: 25px;
}
.paysuccesswold {
  font-size: 20px;
  color: #fff;
}
.payprice {
  font-size: 13.5px;
  color: #fff;
  margin-top: 15px;
}
.paytype {
  font-size: 13.5px;
  color: #fff;
  margin-top: 5px;
}
.paysuccessicon {
  width: 46.5px;
  height: 46.5px;
}
.payareaBtnA {
  width: 136.5px;
  height: 38.5px;
  background: rgba(255, 255, 255, 0);
  border: 1px solid #ffffff;
  border-radius: 19.5px;
  display: inline-block;
  text-align: center;
  line-height: 38.5px;
  color: #fff;
  position: relative;
}
.payareaBtntip {
  position: absolute;
  top: -15px;
  left: 55px;
  background: #fbe344;
  border-radius: 15px 15px 15px 0px;
  text-align: center;
  color: #e90921;
  font-size: 10.5px;
  width: 79px;
  height: 20px;
  line-height: 20px;
}
.payareaBtnB {
  width: 136.5px;
  height: 38.5px;
  background: rgba(255, 255, 255, 0);
  border: 1px solid #ffffff;
  border-radius: 19.5px;
  display: inline-block;
  text-align: center;
  line-height: 38.5px;
  color: #fff;
}
.payareaheadLeft {
  float: left;
  margin-left: 39.5px;
}
.payareaheadRight {
  float: right;
  margin-right: 40px;
  margin-top: 10px;
}
.payareaBtn {
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 0 25px;
}
.tjhead {
  width: 375px;
  height: 40px;
  background: linear-gradient(45deg, #ff6f29, #f7263c, #ff5c57);
}
.tjhead2 {
  background: #f8f8f8;
  border-radius: 13.5px 13.5px 0px 0px;
  height: 40px;
  line-height: 40px;
}
.tjicon {
  float: left;
  margin-left: 14.5px;
}
.tjicon {
  width: 16.5px;
  height: 16.5px;
  margin-top: 10px;
  margin-right: 10px;
}
.tjtitle1 {
  font-size: 14px;
  color: #333333;
}
.tjtitle2 {
  color: #999999;
  font-size: 12px;
  padding-left: 10px;
}
.tjgoolddiv {
  width: 170px;
  border-radius: 6.5px;
  background: #fff;
}
.tjgoodsimg {
  width: 170px;
  height: 170px;
  display: block;
  border-radius: 6.5px 6.5px 0 0;
}
.tjgoodsname {
  padding: 10px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  height: 50px;
}
.shopicon {
  width: 20px;
  height: 15px;
}
.tjshop {
  font-size: 12px;
  color: #fff;
  background: #f7263c;
  border-radius: 3px;
  line-height: 20px;
}
.goodsname {
  font-size: 14.5px;
  color: #333333;
  line-height: 20px;
}
.goodsyhj {
  float: left;
  margin-left: 10.5px;
  padding: 0 5px;
}
.juanlefticon {
  float: left;
  height: 15px;
  width: 4.5px;
}
.juannumber {
  font-size: 10px;
  color: #ffffff;
  float: left;
  background: #f7263c;
  line-height: 15px;
}
.juanrighticon {
  float: left;
  height: 15px;
  width: 4.5px;
}
.chengzhangdiv {
  float: left;
  margin-left: 10px;
  border-radius: 0 6px 6px 3.5px;
  background: #333333;
  padding: 0 5px;
}
.czicon {
  width: 10.5px;
  height: 10.5px;
  float: left;
  margin-top: 2.5px;
  margin-right: 2.5px;
}
.cznumber {
  color: #fff;
  font-size: 8.5px;
}
.tjpricediv {
  padding: 10px;
}
.goodsnewprive {
  font-size: 16px;
  color: #f7263c;
  font-weight: 500;
}
.goodsoldprive {
  font-size: 12px;
  color: #999999;
  padding-left: 5px;
}
.tjbody {
  background: #f8f8f8;
  padding: 0 13.5px;
}
.tjul {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
}
.tjul li {
  margin-bottom: 10px;
}

// 红包
.shade {
  width: 100%;
  height: 100%;
  opacity: 0.6;
  background: #000000;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
}
.redbagdiv {
  position: fixed;
  left: 50px;
  top: 180px;
  z-index: 10000;
  width: 273.5px;
}
.bainadiv {
  position: fixed;
  left: 37.5px;
  top: 180px;
  z-index: 10000;
  width: 296.5px;
}
.apphbdiv {
  position: fixed;
  left: 35px;
  top: 100px;
  z-index: 10000;
  width: 290px;
}
.closehbimg {
  width: 28.5px;
  height: 28.5px;
  float: right;
  margin-right: 15px;
}
.redbagimg {
  width: 273.5px;
  height: 313.5px;
}
.bainaimg {
  width: 296.5px;
  height: 286.5px;
}
.apphbimg {
  width: 290px;
  height: 445px;
}
.bainabtndiv {
  position: absolute;
  left: 25px;
  top: 220px;
}
.appbtndiv {
  position: absolute;
  left: 45px;
  top: 345px;
}
.yhjparent {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  position: fixed;
  left: 70px;
  top: 365px;
  width: 225px;
}
.yhjdiv {
  width: 125px;
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.yhjname {
  color: rgb(182, 79, 76);
  font-size: 10px;
  overflow: hidden;
}
.yhjprice2 {
  color: rgb(182, 79, 76);
  font-size: 10px;
  margin-top: 10px;
}
.yhjaddress {
  width: 45px;
  height: 25px;
  border-radius: 15px;
  text-align: center;
  background: rgb(229, 69, 66);
  font-size: 13px;
  color: #fff;
  font-weight: bold;
  line-height: 25px;
}
.yhjprice {
  width: 45px;
  font-size: 20px;
  color: rgb(183, 86, 73);
  font-weight: bold;
  margin-top: 10px;
}
.appbtn {
  width: 200px;
  height: 42.5px;
  text-align: center;
  line-height: 42.5px;
  color: red;
  font-size: 15px;
  font-weight: bold;
  border-radius: 20px;
  background: rgb(240, 207, 166);
}
.bainabtn {
  width: 245.5px;
  height: 42.5px;
}
.redbag {
  position: relative;
}
.bainabag {
  position: relative;
}
.appbag {
  position: relative;
}
.redbagcontent {
  position: absolute;
  left: 0;
  top: 0;
  width: 237.5px;
  text-align: center;
}
.hbprice {
  font-size: 44px;
  color: #ec1a17;
  font-weight: bold;
  margin-top: 100px;
  padding-left: 30px;
}
.hbtime {
  color: #e7353c;
  font-size: 12px;
  width: 130.5px;
  height: 22.5px;
  border: 1px solid #eb323a;
  border-radius: 10.5px;
  text-align: center;
  line-height: 22.5px;
  margin-left: 80px;
}
.gethb {
  width: 152px;
  height: 39.5px;
  background: #fff4cc;
  border-radius: 19.5px;
  margin-left: 75px;
  margin-top: 60px;
  font-size: 14.5px;
  color: #cb0000;
  font-weight: bold;
  line-height: 39.5px;
  text-align: center;
}
.hbprice .danwei {
  font-size: 18px;
  color: #ec1a17;
}
// 公众号/app下载 弹窗
.gzhhead {
  width: 100%;
  height: 103.5px;
  background: linear-gradient(90deg, #ff6f29, #f7263c, #ff5c57);
  border-radius: 10px 10px 0 0;
  font-size: 20px;
  color: #ffffff;
  text-align: center;
  font-weight: bold;
}
.gzhfirst {
  padding-top: 30px;
}
.gzhsecond {
  margin-top: 15px;
}
.gzhbottom {
  background: #fff;
  height: 100%;
  text-align: center;
  padding-top: 40px;
  border-radius: 0 0 10px 10px;
}
.ewmicon {
  width: 123.5px;
  height: 123.5px;
  display: block;
  margin-left: 75px;
  border-radius: 10px;
}
.downapp {
  font-size: 12.5px;
  color: #333333;
  padding-top: 20px;
  padding-bottom: 20px;
}
.closehbimg2 {
  width: 28.5px;
  height: 28.5px;
  float: right;
  margin-right: 5px;
  margin-bottom: 15px;
}
.gzhthree {
  font-size: 18px;
  color: #fff;
  text-align: center;
  padding-top: 40px;
  position: relative;
}
.gzhtip {
  position: absolute;
  top: 15px;
  left: 175px;
  background: #fbe344;
  border-radius: 15px 15px 15px 0px;
  text-align: center;
  color: #e90921;
  font-size: 9px;
  width: 79px;
  height: 20px;
  line-height: 20px;
}
#biao1 {
  position: fixed;
  left: 0;
  top: 0;
  z-index: -10000;
}
</style>