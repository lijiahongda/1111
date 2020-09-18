<template>
  <div class="coupon_content">
    <van-tabs v-model="active" :border="false">
      <van-tab title="未使用"></van-tab>
      <van-tab title="已使用"></van-tab>
      <van-tab title="已过期"></van-tab>
    </van-tabs>
    <div class="strategy_a" v-if="active===0">
      <div class="strategy_a_list" v-for="(item,index) in Couponlists.notUsed" :key="item.cid" @click="jump(item)">
        <div class="coupon_item">
          <div class="coupon-left">
            <img
              class="couder"
              src="https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-07-17/10/yuelvhuiJ9lTR9nnSR1594952306.png"
              alt
            />
            <img
              class="con_bg"
              src="https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-08-03/19/yuelvhuiF55iirkSl91596452492.png"
              alt
            />
            <div class="cw1">
              <span style="font-size:20px;">¥</span>
              <span style="font-size:30px;">{{item.amount}}</span>
            </div>
            <div class="cw2">{{item.desc}}</div>
          </div>
          <div class="coupon-right">
            <div class="coupon-right-name">{{item.name}}</div>
            <div class="coupon-right-day">{{item.entTime}}</div>
            <div class="coupon-right-btn">立即使用</div>
          </div>
        </div>
        <div class="coupon_xxbox">
          <p class="coupon_xxbox_btn" @click="changeContent(index)">
            <span class="coupon_d">{{item.couponDes}}</span>
            <van-icon name="arrow-down" v-if="!item.showContent" />
            <van-icon name="arrow-up" v-else />
          </p>
          <!-- <div class="box_sizew" v-show="item.showContent">
            <p>23423423423</p>
            <p>23423423423</p>
            <p>23423423423</p>
          </div>-->
        </div>
      </div>
      <van-empty description="暂无数据" v-if="Couponlists.notUsed.length==0" />
    </div>
    <div class="strategy_a" v-if="active===1">
      <div class="strategy_a_list" v-for="(item,index) in Couponlists.use" :key="item.cid">
        <div class="coupon_item">
          <div class="coupon-left-a">
            <img
              class="couder"
              src="https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-07-17/10/yuelvhuiJ9lTR9nnSR1594952306.png"
              alt
            />
            <div style="margin-top:18px;">
              <span style="font-size:20px;">¥</span>
              <span style="font-size:30px;">{{item.amount}}</span>
            </div>
            <div style="font-size:14px;">{{item.desc}}</div>
          </div>
          <div class="coupon-right">
            <div class="coupon-right-name">{{item.name}}</div>
            <div class="coupon-right-day">{{item.entTime}}</div>
          </div>
        </div>
     
      </div>
      <van-empty description="暂无数据" v-if="Couponlists.use.length==0" />
    </div>
    <div class="strategy_a" v-if="active===2">
      <div class="strategy_a_list" v-for="(item,index) in Couponlists.overdue" :key="index">
        <div class="coupon_item">
          <div class="coupon-left-a">
            <img
              class="couder"
              src="https://yuetao-1300766538.cos.ap-beijing.myqcloud.com/yuetao/image/2020-07-17/10/yuelvhuiJ9lTR9nnSR1594952306.png"
              alt
            />
            <div style="margin-top:18px;">
              <span style="font-size:20px;">¥</span>
              <span style="font-size:30px;">{{item.amount}}</span>
            </div>
            <div style="font-size:14px;">{{item.desc}}</div>
          </div>
          <div class="coupon-right">
            <div class="coupon-right-name">{{item.name}}</div>
            <div class="coupon-right-day">{{item.entTime}}</div>
          </div>
        </div>
      </div>
      <van-empty description="暂无数据" v-if="Couponlists.overdue.length==0" />
    </div>
    <div class="bottom_switch" v-if="active===0">
      <van-switch v-model="checked" active-color="#07c160" inactive-color="#ee0a24" />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Tab, Tabs, Empty, Switch, Icon, Toast } from "vant";
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Empty);
Vue.use(Switch);
Vue.use(Icon);
Vue.use(Toast);
import { couponGroupMember } from "../../services/userApi";
export default {
  data() {
    return {
      active: 0,
      activeNames: ["1"],
      checked: true,
      Couponlists: "",
      list: [
        {
          price: 5,
          tou: "满50使用",
          title: "我是段落部分的内容",
          showContent: false,
        },
        {
          price: 5,
          tou: "满50使用",
          title: "我是段落部分的内容",
          showContent: false,
        },
      ],
    };
  },
  mounted() {
    this.getCouponlist();
  },
  methods: {
    //优惠券下拉
    changeContent(index) {
      console.log(index);
      this.Couponlists.notUsed[index].showContent = !this.Couponlists.notUsed[
        index
      ].showContent;
    },
    //优惠券请求
    getCouponlist() {
      couponGroupMember().then((res) => {
        if (res.code == 200) {
          res.data.notUsed.map((val) => {
            val.showContent = false;
          });
          this.Couponlists = res.data;
          this.checked = res.data.is_pop ? true : false;
        } else {
          Toast("接口报错");
        }
      });
    },
    jump(data){
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
    }
  },
};
</script>

<style lang="less" scoped>
.coupon_content {
  width: 100%;
  height: auto;
  overflow: auto;
  background: #f7f5f6;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding-top: 50px;
  .strategy_a {
    width: 100%;
    height: auto;
    overflow: auto;
    position: relative;
    .strategy_a_list {
      width: 95%;
      height: auto;
      background: #fff;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2),
        0 0 10px rgba(0, 0, 0, 0.1) inset;
      margin: 10px auto;
      .coupon_item {
        width: 100%;
        height: 110px;
        display: flex;
        position: relative;
        justify-content: space-between;
        align-items: center;
        border-radius: 10px;
        background: #fff;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2),
          0 0 10px rgba(0, 0, 0, 0.1) inset;
        .coupon-left {
          width: 180px;
          height: 100%;
          position: relative;
          .con_bg {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
          }
          .cw1 {
            position: absolute;
            top: 25px;
            left: 40px;
            color: #fff;
            font-weight: 600;
          }
          .cw2 {
            font-size: 14px;
            position: absolute;
            top: 70px;
            left: 30px;
            color: #fff;
          }
        }
        .coupon-left-a {
          width: 180px;
          height: 100%;
          position: relative;
          background: linear-gradient(90deg, #c3b3b4, #b7aca9);
          color: #fff;
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
        }
        .coupon-left-b {
          width: 140px;
          height: 100%;
          position: relative;
          background: linear-gradient(90deg, #807c7c, #5f5451);
          color: #fff;
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
        }
        .couder {
          width: 59px;
          height: 43px;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
        }
      }
      .coupon_xxbox {
        width: 100%;
        color: #999999;
        font-size: 12px;
        .coupon_xxbox_btn {
          line-height: 30px;
          text-align: left;
          margin-left: 12px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .coupon_d {
            margin-right: 10px;
          }
        }
        .box_sizew {
          line-height: 20px;
          text-align: left;
          margin-left: 20px;
          padding-bottom: 5px;
        }
      }
      // .coupon-left:after {
      //   content: "";
      //   display: block;
      //   width: 20px;
      //   height: 100%;
      //   background-size: 20px 20px; /* 一个repeat的大小 */
      //   background-repeat: repeat-y;
      //   background-image: radial-gradient(#fff 5px, transparent 5px);
      //   position: absolute;
      //   top: 0;
      //   right: -10px;
      // }
      .coupon-left-a:after {
        content: "";
        display: block;
        width: 20px;
        height: 100%;
        background-size: 20px 20px; /* 一个repeat的大小 */
        background-repeat: repeat-y;
        background-image: radial-gradient(#fff 5px, transparent 5px);
        position: absolute;
        top: 0;
        right: -10px;
      }
      .coupon-left-b:after {
        content: "";
        display: block;
        width: 20px;
        height: 100%;
        background-size: 20px 20px; /* 一个repeat的大小 */
        background-repeat: repeat-y;
        background-image: radial-gradient(#fff 5px, transparent 5px);
        position: absolute;
        top: 0;
        right: -10px;
      }
      .coupon-right {
        width: 100%;
        padding-left: 30px;
        line-height: 30px;
        text-align: left;
        .coupon-right-name {
          width: 187px;
          font-size: 14px;
          color: #141414;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .coupon-right-day {
          font-size: 12px;
          color: #666666;
        }
        .coupon-right-btn {
          position: absolute;
          bottom: 15px;
          right: 10px;
          font-size: 12px;
          color: #cb2519;
          border: 1px solid #cb2519;
          border-radius: 12px;
          line-height: 25px;
          padding: 0 10px;
        }
      }
      .coupon_off {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-top: 20px;
        margin-right: 15px;
      }
      .coupon_offtxt {
        color: #999999;
        font-size: 14px;
        margin-right: 10px;
      }
    }
  }
  .bottom_switch {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 20px;
  }
}
//强改
/deep/ .van-nav-bar {
  .van-icon {
    color: #000;
  }
}
/deep/ .van-tabs {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
</style>