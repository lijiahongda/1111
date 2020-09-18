<template>
  <div class="user_content">
    <!-- <van-nav-bar title="个人中心" /> -->
    <!-- 个人信息 -->
    <div class="userinfo_box">
      <van-image style="margin:0 0.3rem;" round width="44px" height="44px" :src="userarvr" />
      <div class="userinfo_text_box">
        <div class="userinfo_text_top">
          <span class="userinfo_name" @click="goLogin()">{{username}}</span>
          <span class="userinfo_type">{{levelText}}</span>
          <span>
            <van-icon name="star" />
          </span>
        </div>
        <div class="userinfo_text_bottom">
          <span class="userinfo_ynum">悦淘号:</span>
          <span class="userinfo_ynum" style="margin:0 5px;">{{codeFand}}</span>
          <span class="userinfo_num_btn" @click="copyCode()">复制</span>
        </div>
      </div>
      <div class="userinfo_setting" @click="goSetting()">
        <van-icon name="arrow" />
      </div>
    </div>

    <!-- 优惠券 -->
    <div class="coupon_box" v-if="Couponlists.length>0">
      <div class="coupon_left">
        <span class="coupon_left_q">优惠券</span>
        <span class="coupon_left_g">({{Couponlists.expiringSoonNum}}张即将过期)</span>
      </div>
      <div class="coupon_right" @click="goCoupon">查看更多></div>
    </div>
    <div class="coupon_listbox">
      <div class="coupon_item" v-for="(item,index) in Couponlists.notUsed" :key="index" @click="coumponClick(item)">
        <div class="coupon_item_price">
          <span class="coupon_item_icon">¥</span>
          <span class="coupon_item_icp">{{item.amount}}</span>
        </div>
        <div class="coupon_item_text">
          <div>{{item.name}}</div>
          <div>{{item.entTime}}到期</div>
        </div>
        <div class="coupon_item_btn">立即使用</div>
      </div>
    </div>

    <!-- 统计 -->
    <div class="user_pheader">
      <div class="user_pheader_title">预估收益</div>
      <!-- <div class="user_pheader_go">查看更多></div> -->
    </div>
    <div class="user_view">
      <div class="view_item">
        <div class="view_item_num">¥{{Revenuelist.todayProfit}}</div>
        <div class="view_item_txt">今日收益</div>
      </div>
      <div style="color:#DDDDDD;font-size:.5rem;">｜</div>
      <div class="view_item">
        <div class="view_item_num">¥{{Revenuelist.yesterdayProfit}}</div>
        <div class="view_item_txt">昨日收益</div>
      </div>
    </div>
    <div class="user_pheader">
      <div class="user_pheader_title">订单数量</div>
      <!-- <div class="user_pheader_go">查看更多></div> -->
    </div>
    <div class="user_view">
      <div class="view_item">
        <div class="view_item_num">{{Revenuelist.todayProfit}}</div>
        <div class="view_item_txt">今日数量</div>
      </div>
      <div style="color:#DDDDDD;font-size:.5rem;">｜</div>
      <div class="view_item">
        <div class="view_item_num">{{Revenuelist.yesterdayNum}}</div>
        <div class="view_item_txt">昨日数量</div>
      </div>
    </div>
    <!-- 分割 -->
    <div style="width:100%;height:.5rem;background:#F6F6F6;"></div>
    <!-- top -->
    <div class="user_pheader" v-if="Shoptoplist.length>0">
      <div class="user_pheader_title">商品销量排行榜TOP10</div>
      <div class="user_pheader_go"></div>
    </div>
    <!-- list -->
    <van-dropdown-menu v-if="Shoptoplist.length>0">
      <van-dropdown-item v-model="value1" :options="option1" @change="topFilerlist1" />
      <van-dropdown-item v-model="value2" :options="option2" @change="topFilerlist2" />
      <van-dropdown-item v-model="value3" :options="option3" @change="topFilerlist3" />
    </van-dropdown-menu>
    <div class="top_list_box" v-if="Shoptoplist.length>0">
      <div class="top_item" v-for="item in Shoptoplist" :key="item.goodsId" @click="goTop10(item)">
        <div class="top_image">
          <van-image
            width="100%"
            height="100%"
            fit="cover"
            :src="item.imgPath"
          />
        </div>
        <div class="top_txt_box">
          <div class="top_txt_a">{{item.goodsName}}</div>
          <div class="top_txt_b">预估分佣¥{{item.femalesPrice}}</div>
          <div class="top_txt_c">¥{{item.buyPrice}}</div>
          <div class="top_txt_d">¥{{item.price}}</div>
        </div>
        <div class="top_abs">成交量{{item.count}}万+件</div>
      </div>
    </div>
    <Nav />
  </div>
</template>

<script>
import Vue from "vue";
import {
  NavBar,
  Image as VanImage,
  DropdownMenu,
  DropdownItem,
  Icon,
  Toast,
} from "vant";
Vue.use(NavBar);
Vue.use(VanImage);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Icon);
Vue.use(Toast);
import {
  MemberInfo,
  revenueStatistics,
  getSalesRankingList,
  couponGroupMember,
} from "../../services/userApi";
import Nav from "@/component/Nav";
export default {
  components: {
    Nav,
  },
  data() {
    return {
      // 用户信息
      username: "",
      codeFand: "",
      userarvr: "",
      levelText: "",
      Couponlists: "", //优惠券数据
      Revenuelist: "", //收益数据
      Shoptoplist: [], //商品top10
      value1: 0,
      value2: 0,
      value3: 0,
      option1: [
        { text: "订单数量", value: 0 },
        { text: "由高到低", value: 1 },
        { text: "由低到高", value: 2 },
      ],
      option2: [
        { text: "价格", value: 0 },
        { text: "由高到低", value: 1 },
        { text: "由低到高", value: 2 },
      ],
      option3: [
        { text: "预估分佣", value: 0 },
        { text: "由高到低", value: 1 },
        { text: "由低到高", value: 2 },
      ],
    };
  },
  created() {},
  mounted() {
    this.getMemberInfo();
    this.getCouponlist();
    this.getRevenueStatistics();
    this.getSalesRankin();
  },
  methods: {
    // 排序啊
    topFilerlist1(e){
      let _self = this;
      if(e==1){
        _self.Shoptoplist.sort((a,b)=>{return b.count-a.count});
        _self.value2=0;
        _self.value3=0;
      }else if(e==2){
        _self.Shoptoplist.sort((a,b)=>{return a.count-b.count});
        _self.value2=0;
        _self.value3=0;
      }else{
        _self.Shoptoplist=_self.Shoptoplist;
        _self.value2=0;
        _self.value3=0;
      }
    },
    topFilerlist2(e){
      let _self = this;
      if(e==1){
        _self.Shoptoplist.sort((a,b)=>{return b.buyPrice-a.buyPrice});
        _self.value1=0;
        _self.value3=0;
      }else if(e==2){
        _self.Shoptoplist.sort((a,b)=>{return a.buyPrice-b.buyPrice});
        _self.value1=0;
        _self.value3=0;
      }else{
        _self.Shoptoplist=_self.Shoptoplist;
        _self.value1=0;
        _self.value3=0;
      }
    },
    topFilerlist3(e){
      let _self = this;
      if(e==1){
        _self.Shoptoplist.sort((a,b)=>{return b.femalesPrice-a.femalesPrice});
        _self.value1=0;
        _self.value2=0;
      }else if(e==2){
        _self.Shoptoplist.sort((a,b)=>{return a.femalesPrice-b.femalesPrice});
        _self.value1=0;
        _self.value2=0;
      }else{
        _self.Shoptoplist=_self.Shoptoplist;
        _self.value1=0;
        _self.value2=0;
      }
    },
    //个人信息查询
    getMemberInfo() {
      let _self = this;
      MemberInfo().then((res) => {
        if (res.code == 200) {
          _self.userarvr = res.data.avatar;
          _self.username = res.data.name;
          _self.levelText = res.data.levelText;
          _self.codeFand = res.data.reCode;
        } else {
          Toast(res.msg);
        }
      });
    },
    //优惠券列表查询
    getCouponlist() {
      couponGroupMember({}).then((res) => {
        if (res.code == 200) {
          this.Couponlists = res.data;
        } else {
          Toast(res.msg);
        }
      });
    },
    //个人中心-收益
    getRevenueStatistics() {
      revenueStatistics({}).then((res) => {
        if (res.code == 200) {
          this.Revenuelist = res.data;
        } else {
          Toast(res.msg);
        }
      });
    },
    // top10商品列表
    getSalesRankin() {
      let params = {
        mid: localStorage.getItem("uid"),
      };
      getSalesRankingList(params).then((res) => {
        if (res.code == 200) {
          this.Shoptoplist = res.data;
        } else {
          Toast(res.msg);
        }
      });
    },
    //跳转
    // 去登录
    goLogin: function () {
      this.$router.push({ path: "/login" });
    },
    //设置
    goSetting() {
      this.$router.push({ path: "/setting" });
    },
    // 优惠券
    goCoupon: function () {
      this.$router.push({ path: "/coupon" });
    },
    //详情
    goTop10(e){
      console.log(e)
      this.$router.push({path:"/goodsDetailZY",query:{goodsId:e.goodsId,skuid:e.skuId}})
    },
    //main
    //复制
    copyCode() {
      let _code = localStorage.getItem("recode");
      document.execCommand("Copy");
      Toast("复制成功");
    },
    //优惠卷点击事件
    coumponClick(data){
      //优惠券列表    isShare 0 的跳具体详情    为 1 的跳优惠券详情
      // typeid  = 1 通用券  = 3 单品券  = 4  店铺券   = 5 活动券 
      // 单品券跳商品详情   活动券跳活动列表  通用券和店铺券跳首页
      console.log(data);
      if(data.isShare==0){
        if(data.typeid==1 && data.typeid==4){
          this.$router.push({path:'/'});
        }
        if(data.typeid==3){
          this.$router.push({path:'/goodsDetailZY',query:{goodsId:data.product_id,skuid:data.skuId}});
        }
        if(data.typeid==5){
          this.$router.push({path:'/activity',query:{id:data.product_id}});
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.user_content {
  width: 100%;
  height: auto;
  overflow: auto;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f6f6f6;
  padding-bottom: 80px;
}
// 个人信息
.userinfo_box {
  width: 100%;
  height: 88px;
  background: #1f1a19;
  display: flex;
  align-items: center;
  color: #ffffff;
  position: relative;
  .userinfo_text_box {
    text-align: left;
  }
  .userinfo_text_top {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .userinfo_text_bottom {
    display: flex;
    align-items: center;
  }
  .userinfo_name {
    font-size: 16px;
  }
  .userinfo_type {
    font-size: 12px;
    color: #dcdcdc;
    margin: 0 5px;
  }
  .userinfo_ynum {
    font-size: 0.3rem;
  }
  .userinfo_num_btn {
    font-size: 0.3rem;
    color: #999999;
    border: 1px solid #ffffff;
    border-radius: 5px;
    padding: 3px 6px;
  }
  .userinfo_setting {
    font-size: 25px;
    position: absolute;
    top: 25px;
    right: 25px;
  }
}

//省钱
.user_money_box {
  width: 100%;
  background: #1f1a19;
  color: #ffffff;
  padding-bottom: 0.5rem;
  .user_money_num {
    font-size: 0.5rem;
    font-weight: 600;
    line-height: 0.8rem;
  }
  .user_money_tit {
    color: #999999;
    font-size: 0.3rem;
  }
}

//优惠券
.coupon_box {
  width: 100%;
  height: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  .coupon_left {
    margin-left: 0.3rem;
    .coupon_left_q {
      font-size: 0.4rem;
      color: #141414;
    }
    .coupon_left_g {
      font-size: 0.35rem;
      color: #ed2e2e;
      margin-left: 0.3rem;
    }
  }
  .coupon_right {
    margin-right: 0.2rem;
    color: #bbbbbb;
    font-size: 0.35rem;
  }
}
.coupon_listbox {
  overflow-x: auto;
  box-sizing: border-box;
  white-space: nowrap;
  padding: 0.2rem 0;
  background: #ffffff;
  margin-bottom: 10px;
  .coupon_item {
    position: relative;
    display: inline-block;
    width: 160px;
    height: 85px;
    color: #ffffff;
    background-image: url("https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-07-15/15/yuelvhui0cyE0fkLdv1594797278.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin: 0 0.2rem;
    .coupon_item_price {
      position: absolute;
      left: 0.4rem;
      top: 0.8rem;
      .coupon_item_icon {
        font-size: 0.4rem;
      }
      .coupon_item_icp {
        font-size: 0.8rem;
        font-weight: 600;
      }
    }
    .coupon_item_text {
      position: absolute;
      top: 0.3rem;
      right: 0.5rem;
      font-size: 12px;
      text-align: left;
      width: 65px;
      div{
        overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      }
    }
    .coupon_item_btn {
      color: #462508;
      font-size: 12px;
      text-align: center;
      background: #fffef9;
      border-radius: 15px;
      line-height: 20px;
      padding: 0 10px;
      position: absolute;
      bottom: 0.3rem;
      right: 0.3rem;
    }
  }
}

//统计
.user_pheader {
  width: 100%;
  height: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffff;
  .user_pheader_title {
    margin-left: 10px;
    color: #141414;
    font-size: 15px;
  }
  .user_pheader_go {
    margin-right: 10px;
    color: #bbbbbb;
    font-size: 0.4rem;
  }
}
.user_view {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  .view_item {
    width: 50%;
    text-align: center;
    padding-bottom: 0.7rem;
    .view_item_num {
      font-size: 0.4rem;
      color: #ed2e2e;
      line-height: 1rem;
    }
    .view_item_txt {
      color: #666666;
      font-size: 0.3rem;
    }
  }
}

// toplist
.top_list_box {
  width: 100%;
  height: auto;
  background: #ffffff;
  overflow: auto;
  .top_item {
    width: 100%;
    height: auto;
    display: flex;
    box-sizing: border-box;
    justify-content: space-around;
    align-items: center;
    position: relative;
    padding: 5px 0;
    .top_image {
      width: 110px;
      height: 110px;
      position: relative;
    }
    .top_txt_box {
      width: 60%;
      height: 100px;
      // line-height: 30px;
      text-align: left;
      .top_txt_a {
        color: #333333;
        font-size: 14px;
        font-weight: Medium;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-top: 10px;
      }
      .top_txt_b {
        width: 86px;
        line-height: 22px;
        color: #ed2e2e;
        font-size: 12px;
        text-align: center;
        background: #ffeeee;
        border: 1px solid #ed2e2e;
        border-radius: 10px;
        margin-top: 10px;
      }
      .top_txt_c {
        color: #e91726;
        font-size: 13px;
        margin-top: 10px;
      }
      .top_txt_d {
        color: #999999;
        font-size: 12px;
        text-decoration: line-through;
        margin-top: 10px;
      }
    }
    .top_abs {
      font-size: 12px;
      color: #999999;
      position: absolute;
      bottom: 5px;
      right: 20px;
    }
  }
}

// 修改
.van-nav-bar {
  background: #1f1a19;
}
/deep/ .van-nav-bar__title {
  color: #ffffff;
}
.van-hairline--bottom::after {
  border-bottom-width: 0;
}
</style>